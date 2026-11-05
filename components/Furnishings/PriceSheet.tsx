'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from 'react';
import { collections, pieces, soldInSeaters } from '@/content/furnishings';
import { priceSheet, testSpec } from '@/content/pricing';
import { invoiceFor, kes } from '@/lib/pricing';
import { cleanSheet, type PriceSheet as Sheet, type PriceSettings } from '@/lib/priceSheet';

const DRAFT_KEY = 'gaze.price-sheet.draft.v1';
const slugs = new Set(pieces.map((p) => p.slug));
const cap = 'text-[10px] font-medium uppercase tracking-[0.2em] text-[#6F6A62]';
const line = 'border-b border-[rgba(30,30,34,0.35)] bg-transparent py-2 text-base outline-none transition-colors placeholder:text-[#9A948A] focus:border-furn-ink';
const field = `w-full ${line}`;

type Row = { price: string; size: string; ft: string };
type Rows = Record<string, Row>;
type Settings = Record<keyof PriceSettings, string>;
type Status = { kind: 'idle' | 'busy' | 'done' | 'error' | 'setup'; message?: string };

const digits = (s: string) => s.replace(/[^\d]/g, '');
const group = (s: string) => (s ? Number(s).toLocaleString('en-KE') : '');

const toRows = (s: Sheet): Rows =>
  Object.fromEntries(
    pieces.map((p) => {
      const set = s.pieces[p.slug];
      return [p.slug, { price: set?.price?.toString() ?? '', size: set?.size ?? '', ft: set?.ft?.toString() ?? '' }];
    }),
  );
const toSettings = (s: PriceSettings): Settings => ({
  extraStepFt: String(s.extraStepFt),
  extraStepKes: String(s.extraStepKes),
  twoSeaterPct: String(s.twoSeaterPct),
  oneSeaterPct: String(s.oneSeaterPct),
});

function build(rows: Rows, settings: Settings) {
  const out: Record<string, unknown> = {};
  for (const [slug, r] of Object.entries(rows)) {
    const row: Record<string, unknown> = {};
    if (r.price) row.price = Number(r.price);
    if (r.size.trim()) row.size = r.size;
    if (r.ft.trim()) row.ft = Number(r.ft);
    if (Object.keys(row).length) out[slug] = row;
  }
  return cleanSheet(
    {
      settings: {
        extraStepFt: Number(settings.extraStepFt),
        extraStepKes: Number(settings.extraStepKes),
        twoSeaterPct: Number(settings.twoSeaterPct),
        oneSeaterPct: Number(settings.oneSeaterPct),
      },
      pieces: out,
    },
    slugs,
  );
}

/**
 * The price list the client fills in, as agreed on the review call: every piece with its photograph, so nobody has to
 * send screenshots. Her draft stays in this browser until she publishes. Empty boxes keep the test figure, which the
 * site labels indicative. Costs and margins must never be entered here: they belong in QuickBooks.
 */
export function PriceSheet() {
  const [rows, setRows] = useState<Rows>(() => toRows(priceSheet));
  const [settings, setSettings] = useState<Settings>(() => toSettings(priceSheet.settings));
  const [query, setQuery] = useState('');
  const [onlyUnpriced, setOnlyUnpriced] = useState(false);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [loaded, setLoaded] = useState(false);

  // the draft is read after load, because this page is pre-built
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) ?? 'null');
      if (saved?.rows) setRows((r) => ({ ...r, ...saved.rows }));
      if (saved?.settings) setSettings((s) => ({ ...s, ...saved.settings }));
    } catch {
      /* a private window, or nothing saved */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ rows, settings }));
    } catch {
      /* storage unavailable: she can still publish or download */
    }
  }, [rows, settings, loaded]);

  const priced = pieces.filter((p) => rows[p.slug]?.price).length;
  const result = useMemo(() => build(rows, settings), [rows, settings]);
  const unpublished = useMemo(() => {
    if (!result.ok) return true;
    return JSON.stringify(result.sheet) !== JSON.stringify(cleanOrSelf(priceSheet));
  }, [result]);

  const set = (slug: string, patch: Partial<Row>) => {
    setRows((r) => ({ ...r, [slug]: { ...r[slug], ...patch } }));
    setStatus({ kind: 'idle' });
  };
  const setSetting = (k: keyof PriceSettings, v: string) => {
    setSettings((s) => ({ ...s, [k]: v }));
    setStatus({ kind: 'idle' });
  };

  const download = () => {
    if (!result.ok) return setStatus({ kind: 'error', message: result.error });
    const url = URL.createObjectURL(new Blob([`${JSON.stringify(result.sheet, null, 2)}\n`], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gaze-prices.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const publish = async () => {
    if (!result.ok) return setStatus({ kind: 'error', message: result.error });
    setStatus({ kind: 'busy' });
    try {
      const res = await fetch('/api/price-sheet', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password, sheet: result.sheet }) });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        setPassword('');
        setStatus({ kind: 'done', message: `Published. Your prices will be live on the site in about two minutes.` });
      } else if (body.error === 'not-configured') {
        setStatus({ kind: 'setup' });
      } else if (body.error === 'wrong-password') {
        setStatus({ kind: 'error', message: 'That password is not right. Nothing was changed.' });
      } else {
        setStatus({ kind: 'error', message: body.error ?? 'Publishing failed. Nothing was changed. Please try again.' });
      }
    } catch {
      setStatus({ kind: 'error', message: 'The connection dropped. Nothing was changed. Please try again.' });
    }
  };

  const q = query.trim().toLowerCase();
  const matches = (slug: string, name: string, kind: string) => (!onlyUnpriced || !rows[slug]?.price) && (!q || `${name} ${kind}`.toLowerCase().includes(q));

  return (
    <div className="pb-48">
      <header className="max-w-3xl">
        <p className="text-[12px] text-[#6F6A62]">Gaze Furnishings · for the team only</p>
        <h1 className="mt-3 font-furn text-[clamp(44px,6vw,96px)] font-normal leading-[0.96]">Price list</h1>
        <p className="mt-5 text-lg font-light leading-relaxed text-[#4A4640]">
          Type the selling price for each piece, excluding VAT. Your work saves on this device as you go, so you can do a few at a time. Nothing changes on the site until you publish.
        </p>
        <p className="mt-4 border-l-2 border-furn-walnut pl-4 text-[15px] leading-relaxed">
          <strong className="font-medium">Selling prices only.</strong> Everything here appears on the public website, so never enter what a piece costs to make or your margin. Those stay in QuickBooks.
        </p>
      </header>

      <section aria-label="Rules for every piece" className="mt-12 border-t border-furn-ink pt-6">
        <h2 className="font-furn text-[28px] leading-none">Rules for every piece</h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <fieldset>
            <legend className={cap}>Made to measure</legend>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-[15px]">
              Every
              <input aria-label="Length of each step, in feet" inputMode="decimal" value={settings.extraStepFt} onChange={(e) => setSetting('extraStepFt', e.target.value)} className={`${line} w-14 text-center`} />
              ft added costs KES
              <input aria-label="Charge for each step, in shillings" inputMode="numeric" value={group(settings.extraStepKes)} onChange={(e) => setSetting('extraStepKes', digits(e.target.value))} className={`${line} w-24 text-center`} />
            </p>
          </fieldset>
          <fieldset>
            <legend className={cap}>Couches sold as a 3-2-1 set</legend>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-[15px]">
              A 2-seater is
              <input aria-label="2-seater, as a percentage of the 3-seater" inputMode="numeric" value={settings.twoSeaterPct} onChange={(e) => setSetting('twoSeaterPct', digits(e.target.value))} className={`${line} w-14 text-center`} />
              % of the 3-seater, a 1-seater is
              <input aria-label="1-seater, as a percentage of the 3-seater" inputMode="numeric" value={settings.oneSeaterPct} onChange={(e) => setSetting('oneSeaterPct', digits(e.target.value))} className={`${line} w-14 text-center`} />
              %
            </p>
          </fieldset>
        </div>
      </section>

      <div className="mt-12 flex flex-wrap items-end gap-6 border-t border-furn-ink pt-6">
        <label className="flex min-w-[220px] flex-1 flex-col gap-1">
          <span className={cap}>Find a piece</span>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. sofa, Duma, bunk" className={field} />
        </label>
        <label className="flex cursor-pointer items-center gap-2 pb-2 text-[14px]">
          <input type="checkbox" checked={onlyUnpriced} onChange={(e) => setOnlyUnpriced(e.target.checked)} className="accent-[#1E1E22]" />
          Show only pieces without a price
        </label>
      </div>

      {collections.map((room) => {
        const inRoom = pieces.filter((p) => p.room === room.id);
        const shown = inRoom.filter((p) => matches(p.slug, p.name, p.kind));
        if (!shown.length) return null;
        return (
          <section key={room.id} className="mt-14">
            <h2 className="flex items-baseline justify-between gap-4 border-b border-furn-ink pb-3 font-furn text-[32px] leading-none">
              {room.name}
              <span className="font-text text-[13px] text-[#6F6A62]">{inRoom.filter((p) => rows[p.slug]?.price).length} of {inRoom.length} priced</span>
            </h2>
            <ul>
              {shown.map((p) => {
                const row = rows[p.slug] ?? { price: '', size: '', ft: '' };
                const test = testSpec(p);
                const price = Number(row.price);
                const inv = row.price ? invoiceFor(price) : null;
                return (
                  <li key={p.slug} className="grid grid-cols-[72px_minmax(0,1fr)] gap-x-4 gap-y-4 border-b border-[rgba(30,30,34,0.12)] py-5 md:grid-cols-[72px_minmax(0,1.3fr)_minmax(0,0.9fr)_minmax(0,1.3fr)_5rem] md:items-start md:gap-x-6">
                    <span className="block aspect-square overflow-hidden bg-[#F3EDE4]">
                      {p.photos?.[0] && <img src={p.photos[0]} alt="" loading="lazy" className="h-full w-full object-contain" />}
                    </span>
                    <div className="min-w-0">
                      <a href={`/furnishings/${p.slug}`} target="_blank" rel="noopener noreferrer" className="font-furn text-[21px] leading-tight underline-offset-4 hover:underline">{p.name}</a>
                      <p className="text-[13px] leading-snug text-[#6F6A62]">{p.kind}</p>
                      {soldInSeaters(p) && <p className="mt-1 text-[12px] text-furn-walnut">Sold as a set: price the 3-seater</p>}
                    </div>
                    <label className="col-span-2 flex flex-col gap-1 md:col-span-1">
                      <span className={cap}>Price, KES, excl. VAT</span>
                      <input
                        inputMode="numeric"
                        value={group(row.price)}
                        onChange={(e) => set(p.slug, { price: digits(e.target.value) })}
                        placeholder={`${test.price.toLocaleString('en-KE')} test`}
                        className={`${field} tabular-nums`}
                      />
                      {inv && <span className="text-[12px] leading-snug text-[#6F6A62]">With VAT {kes(inv.total)} · deposit {kes(inv.deposit)}</span>}
                      {inv && price < 1000 && <span role="alert" className="text-[12px] text-[#9B2C2C]">That looks low. Is a digit missing?</span>}
                    </label>
                    <label className="col-span-2 flex flex-col gap-1 md:col-span-1">
                      <span className={cap}>Standard size shown</span>
                      <input value={row.size} onChange={(e) => set(p.slug, { size: e.target.value })} placeholder={test.size} maxLength={120} className={field} />
                    </label>
                    <label className="col-span-2 flex flex-col gap-1 md:col-span-1">
                      <span className={cap}>Length, ft</span>
                      <input inputMode="decimal" value={row.ft} onChange={(e) => set(p.slug, { ft: e.target.value.replace(/[^\d.]/g, '') })} placeholder={test.ft === null ? 'n/a' : String(test.ft)} className={`${field} tabular-nums`} />
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      {/* always in reach */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-furn-ink bg-furn-linen px-5 py-4 md:px-[6vw]">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <div className="min-w-0">
            <p className="text-[15px] tabular-nums">
              <strong className="font-medium">{priced} of {pieces.length}</strong> pieces priced
              {unpublished && status.kind !== 'done' && <span className="text-[#6F6A62]"> · changes not published yet</span>}
            </p>
            {!result.ok && <p role="alert" className="text-[13px] text-[#9B2C2C]">{result.error}</p>}
            {status.kind === 'error' && <p role="alert" className="text-[13px] text-[#9B2C2C]">{status.message}</p>}
            {status.kind === 'done' && <p role="status" className="text-[13px] text-[#2F6B45]">{status.message}</p>}
            {status.kind === 'setup' && (
              <p role="status" className="max-w-xl text-[13px] text-[#9B2C2C]">
                Publishing isn&apos;t switched on yet. Download your prices and send the file to the web team on WhatsApp.
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={download} className="text-[13px] underline underline-offset-4 hover:text-furn-walnut">Download a copy</button>
            <label className="sr-only" htmlFor="sheet-password">Publishing password</label>
            <input id="sheet-password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={`${line} w-36`} />
            <button
              type="button"
              disabled={!result.ok || !password || status.kind === 'busy'}
              onClick={publish}
              className="rounded-full bg-furn-ink px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-furn-linen transition-colors hover:bg-furn-walnut disabled:cursor-not-allowed disabled:opacity-40"
            >
              {status.kind === 'busy' ? 'Publishing…' : 'Publish to the site'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* what is live now, in the same shape as a freshly built sheet, for comparing */
function cleanOrSelf(s: Sheet): Sheet {
  const r = cleanSheet(s, slugs);
  return r.ok ? r.sheet : s;
}
