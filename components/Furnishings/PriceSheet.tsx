'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from 'react';
import { collections, pieces, soldInSeaters, type Piece } from '@/content/furnishings';
import { priceSheet, testSpec } from '@/content/pricing';
import { invoiceFor, kes, lengthCharge } from '@/lib/pricing';
import { cleanSheet, type PriceSheet as Sheet, type PriceSettings } from '@/lib/priceSheet';
import { encodePriceSheet } from '@/lib/priceCode';

const DRAFT_KEY = 'gaze.price-sheet.draft.v1';
const slugs = new Set(pieces.map((p) => p.slug));
const muted = 'text-[#6F6A62]';
const cap = 'text-[11px] font-medium uppercase tracking-[0.18em] text-[#6F6A62]';
// 17px and up, so a phone doesn't zoom in when a box is tapped
const underline = 'border-b border-[rgba(30,30,34,0.3)] bg-transparent outline-none transition-colors placeholder:text-[#A39D93] focus:border-furn-ink';
const box = `w-full ${underline} py-2.5 text-[17px]`;
const small = `${underline} py-1 text-center text-[17px] font-medium tabular-nums`;
const red = 'text-[#9B2C2C]';

type Row = { price: string; size: string; ft: string };
type Rows = Record<string, Row>;
type Settings = Record<keyof PriceSettings, string>;
type Status = { kind: 'idle' | 'busy' | 'done' | 'error' | 'sent' | 'copied'; message?: string };

const digits = (s: string) => s.replace(/[^\d]/g, '');
const decimal = (s: string) => s.replace(/[^\d.]/g, '');
const group = (s: string) => (s ? Number(s).toLocaleString('en-KE') : '');
const share = (price: number, pct: number) => Math.round((price * pct) / 100 / 100) * 100;
// a tap selects the whole number, so typing replaces it rather than adding to it
const selectAll = (e: React.FocusEvent<HTMLInputElement>) => {
  const el = e.currentTarget;
  const before = el.value;
  // a frame later, as phones reset a selection made during focus; skipped if she has already started typing
  requestAnimationFrame(() => {
    if (document.activeElement === el && el.value === before) el.select();
  });
};

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
 * The price list the client fills in on her phone, as agreed on the review call: every piece with a large photograph,
 * so nobody has to send screenshots. Her work stays on her phone until she saves it to the site. Empty boxes keep the
 * sample figure, which the site labels indicative. Costs and margins must never be entered here: they belong in
 * QuickBooks, and this repository is public.
 */
export function PriceSheet() {
  const [rows, setRows] = useState<Rows>(() => toRows(priceSheet));
  const [settings, setSettings] = useState<Settings>(() => toSettings(priceSheet.settings));
  const [query, setQuery] = useState('');
  const [onlyUnpriced, setOnlyUnpriced] = useState(false);
  const [password, setPassword] = useState('');
  // 'save' straight to the site when it is switched on, otherwise 'send' her prices to the web team on WhatsApp
  const [panel, setPanel] = useState<null | 'save' | 'send'>(null);
  const [canSave, setCanSave] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/price-sheet', { cache: 'no-store' })
      .then((r) => r.json())
      .then((b) => setCanSave(Boolean(b.configured)))
      .catch(() => setCanSave(false));
  }, []);

  // her draft is read after load, because this page is pre-built
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) ?? 'null');
      if (saved?.rows) setRows((r) => ({ ...r, ...saved.rows }));
      if (saved?.settings) setSettings((s) => ({ ...s, ...saved.settings }));
    } catch {
      /* a private window, or nothing kept yet */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ rows, settings }));
    } catch {
      /* storage unavailable: she can still save to the site or download */
    }
  }, [rows, settings, loaded]);

  const priced = pieces.filter((p) => rows[p.slug]?.price).length;
  const result = useMemo(() => build(rows, settings), [rows, settings]);
  const changed = useMemo(() => !result.ok || JSON.stringify(result.sheet) !== JSON.stringify(cleanOrSelf(priceSheet)), [result]);

  const set = (slug: string, patch: Partial<Row>) => {
    setRows((r) => ({ ...r, [slug]: { ...r[slug], ...patch } }));
    setStatus({ kind: 'idle' });
  };
  const setSetting = (k: keyof PriceSettings, v: string) => {
    setSettings((s) => ({ ...s, [k]: v }));
    setStatus({ kind: 'idle' });
  };

  // the message is ready before she taps, because phones only open the share menu straight from a tap
  useEffect(() => {
    if (panel !== 'send' || !result.ok) return setMessage(null);
    let live = true;
    encodePriceSheet(result.sheet).then((code) => {
      if (live) setMessage(`Hello, here are my Gaze Furnishings prices: ${priced} of ${pieces.length} pieces priced.\n\nFor the web team: ${code}`);
    });
    return () => {
      live = false;
    };
  }, [panel, result, priced]);

  const send = async () => {
    if (!message) return;
    if (navigator.share) {
      try {
        await navigator.share({ text: message });
        return setStatus({ kind: 'sent' });
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') return; // she closed the share menu
      }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setStatus({ kind: 'sent' });
  };

  const copy = async () => {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
      setStatus({ kind: 'copied' });
    } catch {
      setStatus({ kind: 'error', message: 'Copying didn’t work here. Tap “Send on WhatsApp” instead.' });
    }
  };

  const save = async () => {
    if (!result.ok) return setStatus({ kind: 'error', message: result.error });
    setStatus({ kind: 'busy' });
    try {
      const res = await fetch('/api/price-sheet', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password, sheet: result.sheet }) });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        setPassword('');
        setPanel(null);
        setStatus({ kind: 'done', message: 'Saved. Clients will see your prices on the website in a few minutes.' });
      } else if (body.error === 'not-configured') {
        setCanSave(false);
        setPanel('send');
        setStatus({ kind: 'idle' });
      } else if (body.error === 'wrong-password') {
        setStatus({ kind: 'error', message: 'That password isn’t right. Nothing was changed.' });
      } else {
        setStatus({ kind: 'error', message: body.error ?? 'Saving didn’t work. Nothing was changed, so please try again.' });
      }
    } catch {
      setStatus({ kind: 'error', message: 'The connection dropped. Nothing was changed, so please try again.' });
    }
  };

  const q = query.trim().toLowerCase();
  const shows = (p: Piece) => (!onlyUnpriced || !rows[p.slug]?.price) && (!q || `${p.name} ${p.kind}`.toLowerCase().includes(q));
  const rooms = collections.map((room) => {
    const all = pieces.filter((p) => p.room === room.id);
    return { room, all, shown: all.filter(shows), done: all.filter((p) => rows[p.slug]?.price).length };
  });

  // worked examples, so each rule reads in shillings
  const stepFt = Number(settings.extraStepFt);
  const stepKes = Number(settings.extraStepKes);
  const madeExample = stepFt > 0 ? lengthCharge(10, 14, stepFt, stepKes) : null;
  const two = Number(settings.twoSeaterPct);
  const one = Number(settings.oneSeaterPct);

  return (
    <div className="pb-56">
      <header className="max-w-2xl">
        <p className={cap}>Gaze Furnishings · private page</p>
        <h1 className="mt-4 font-furn text-[clamp(48px,9vw,104px)] font-normal leading-[0.92]">Your price list</h1>
        <p className="mt-5 text-[18px] font-light leading-relaxed">Set the price clients see for each piece. It takes three steps:</p>
        <ol className="mt-5 grid gap-3 text-[17px] leading-snug">
          {[
            'Type the price for each piece, before VAT. The site adds the 16% VAT for the client.',
            'Leave a box empty to keep the sample price for now. Your work is kept on this phone as you go.',
            'When you’re ready, tap the dark button at the bottom of the screen. You can do a few pieces at a time.',
          ].map((t, i) => (
            <li key={t} className="grid grid-cols-[2rem_minmax(0,1fr)] items-baseline">
              <span className="font-furn text-[22px] text-furn-walnut">{i + 1}</span>
              {t}
            </li>
          ))}
        </ol>
        <p className="mt-6 border-l-2 border-furn-walnut pl-4 text-[15px] leading-relaxed">
          <strong className="font-medium">Selling prices only.</strong> Everything here appears on the website, so never type what a piece costs to make. That stays in QuickBooks.
        </p>
      </header>

      <section aria-labelledby="rules-title" className="mt-14 bg-[#F7F2EA] p-6 md:p-10">
        <h2 id="rules-title" className="font-furn text-[32px] leading-none">Two rules for every piece</h2>
        <p className={`mt-3 text-[15px] ${muted}`}>These already work on the website. Change a number only if your pricing changes.</p>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className={cap}>Made to measure</h3>
            <p className="mt-3 text-[18px] leading-[2.1]">
              When a client wants a piece longer than standard, add KES{' '}
              <input aria-label="Amount to add, in shillings" inputMode="numeric" value={group(settings.extraStepKes)} onChange={(e) => setSetting('extraStepKes', digits(e.target.value))} onFocus={selectAll} className={`${small} w-24`} />{' '}
              for every{' '}
              <input aria-label="Extra length that adds that amount, in feet" inputMode="decimal" value={settings.extraStepFt} onChange={(e) => setSetting('extraStepFt', decimal(e.target.value))} onFocus={selectAll} className={`${small} w-12`} /> ft extra.
            </p>
            {madeExample !== null && (
              <p className={`mt-3 text-[15px] leading-relaxed ${muted}`}>
                For example, a 10 ft sofa made 14 ft costs <strong className="font-medium text-furn-ink">{kes(madeExample)}</strong> more. The client sees this as they type their size.
              </p>
            )}
            {stepKes > 50000 && <p role="alert" className={`mt-2 text-[14px] ${red}`}>That looks high for each {settings.extraStepFt} ft. Please check the amount.</p>}
          </div>
          <div>
            <h3 className={cap}>Couches sold as 3-2-1</h3>
            <p className="mt-3 text-[18px] leading-[2.1]">
              You price the 3-seater. A 2-seater costs{' '}
              <input aria-label="2-seater, as a percentage of the 3-seater" inputMode="numeric" value={settings.twoSeaterPct} onChange={(e) => setSetting('twoSeaterPct', digits(e.target.value))} onFocus={selectAll} className={`${small} w-12`} />% of it, and a 1-seater{' '}
              <input aria-label="1-seater, as a percentage of the 3-seater" inputMode="numeric" value={settings.oneSeaterPct} onChange={(e) => setSetting('oneSeaterPct', digits(e.target.value))} onFocus={selectAll} className={`${small} w-12`} />%.
            </p>
            {two > 0 && one > 0 && (
              <p className={`mt-3 text-[15px] leading-relaxed ${muted}`}>
                For example, a 3-seater at {kes(200000)} makes the 2-seater <strong className="font-medium text-furn-ink">{kes(share(200000, two))}</strong> and the 1-seater <strong className="font-medium text-furn-ink">{kes(share(200000, one))}</strong>.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* find a piece, and jump between rooms */}
      <div className="sticky top-0 z-20 -mx-5 mt-14 border-b border-[rgba(30,30,34,0.12)] bg-furn-linen/95 px-5 pb-3 pt-4 backdrop-blur md:-mx-[6vw] md:px-[6vw]">
        <div className="flex items-center gap-3">
          <input type="search" aria-label="Find a piece" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a piece, e.g. sofa or Duma" className={`${box} min-w-0 flex-1`} />
          <button
            type="button"
            aria-pressed={onlyUnpriced}
            onClick={() => setOnlyUnpriced((v) => !v)}
            className={`shrink-0 rounded-full border px-4 py-2 text-[14px] transition-colors ${onlyUnpriced ? 'border-furn-ink bg-furn-ink text-furn-linen' : 'border-[rgba(30,30,34,0.3)]'}`}
          >
            Not priced yet
          </button>
        </div>
        <nav aria-label="Rooms" className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0">
          {rooms.map(({ room, all, done }) => (
            <a key={room.id} href={`#price-${room.id}`} className="shrink-0 rounded-full bg-[#F7F2EA] px-4 py-2 text-[14px] transition-colors hover:bg-[#EDE5D8]">
              {room.name} <span className={`tabular-nums ${muted}`}>{done}/{all.length}</span>
            </a>
          ))}
        </nav>
      </div>

      {rooms.map(({ room, all, shown, done }) =>
        shown.length ? (
          <section key={room.id} id={`price-${room.id}`} aria-labelledby={`price-${room.id}-title`} className="scroll-mt-36 pt-14">
            <h2 id={`price-${room.id}-title`} className="flex items-baseline justify-between gap-4 font-furn text-[clamp(34px,5vw,48px)] leading-none">
              {room.name}
              <span className={`font-text text-[14px] tabular-nums ${muted}`}>{done} of {all.length} priced</span>
            </h2>
            <ul className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {shown.map((p) => (
                <PieceCard key={p.slug} piece={p} row={rows[p.slug] ?? { price: '', size: '', ft: '' }} onChange={(patch) => set(p.slug, patch)} />
              ))}
            </ul>
          </section>
        ) : null,
      )}
      {rooms.every((r) => !r.shown.length) && <p className={`pt-14 text-[17px] ${muted}`}>{onlyUnpriced && !q ? 'Every piece has a price.' : 'No piece matches that search.'}</p>}

      {/* always in reach, with room for the phone's home bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[rgba(30,30,34,0.15)] bg-furn-linen px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_30px_-20px_rgba(30,30,34,0.4)] md:px-[6vw]">
        <div className="mx-auto max-w-[1500px]">
          <div aria-hidden="true" className="h-[3px] w-full bg-[rgba(30,30,34,0.08)]">
            <div className="h-full bg-furn-walnut transition-[width] duration-500" style={{ width: `${(priced / pieces.length) * 100}%` }} />
          </div>

          {panel === 'send' ? (
            <div className="mt-3 grid gap-3">
              <p className="text-[16px] leading-snug">
                Send <strong className="font-medium">{priced} {priced === 1 ? 'price' : 'prices'}</strong> to the web team. They’ll put them on the website, usually the same day.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button type="button" disabled={!message} onClick={send} className="rounded-full bg-furn-ink px-6 py-3.5 text-[13px] font-medium uppercase tracking-[0.16em] text-furn-linen transition-colors hover:bg-furn-walnut disabled:opacity-40">
                  Send on WhatsApp
                </button>
                <button type="button" disabled={!message} onClick={copy} className="rounded-full border border-furn-ink px-5 py-3 text-[13px] font-medium uppercase tracking-[0.16em] disabled:opacity-40">
                  Copy instead
                </button>
              </div>
              <Message status={status} />
              <button type="button" onClick={() => { setPanel(null); setStatus({ kind: 'idle' }); }} className="justify-self-start text-[14px] underline underline-offset-4">Not yet</button>
            </div>
          ) : panel === 'save' ? (
            <form
              className="mt-3 grid gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                save();
              }}
            >
              <p className="text-[16px]">
                Save <strong className="font-medium">{priced} {priced === 1 ? 'price' : 'prices'}</strong> to the website?
              </p>
              <div className="flex items-center gap-3">
                <label htmlFor="sheet-password" className="sr-only">Your saving password</label>
                <input id="sheet-password" type="password" autoComplete="current-password" autoFocus value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your saving password" className={`${box} min-w-0 flex-1`} />
                <button type="submit" disabled={!password || status.kind === 'busy'} className="shrink-0 rounded-full bg-furn-ink px-6 py-3.5 text-[13px] font-medium uppercase tracking-[0.16em] text-furn-linen transition-colors hover:bg-furn-walnut disabled:opacity-40">
                  {status.kind === 'busy' ? 'Saving…' : 'Save'}
                </button>
              </div>
              <Message status={status} />
              <div className="flex gap-5 text-[14px]">
                <button type="button" onClick={() => { setPanel(null); setStatus({ kind: 'idle' }); }} className="underline underline-offset-4">Not yet</button>
                <button type="button" onClick={() => { setPanel('send'); setStatus({ kind: 'idle' }); }} className={`underline underline-offset-4 ${muted}`}>Send on WhatsApp instead</button>
              </div>
            </form>
          ) : (
            <div className="mt-3 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[16px] tabular-nums">
                  <strong className="font-medium">{priced}</strong> of {pieces.length} priced
                </p>
                <p className={`text-[13px] ${status.kind === 'done' ? 'text-[#2F6B45]' : muted}`} role="status">
                  {status.kind === 'done' ? status.message : changed ? 'Kept on this phone. Not on the website yet.' : 'Everything here is on the website.'}
                </p>
                {!result.ok && <p role="alert" className={`text-[13px] ${red}`}>{result.error}</p>}
              </div>
              <button
                type="button"
                disabled={!result.ok || !changed || canSave === null}
                onClick={() => { setPanel(canSave ? 'save' : 'send'); setStatus({ kind: 'idle' }); }}
                className="shrink-0 rounded-full bg-furn-ink px-6 py-3.5 text-[13px] font-medium uppercase tracking-[0.16em] text-furn-linen transition-colors hover:bg-furn-walnut disabled:opacity-40"
              >
                {canSave ? 'Save to the website' : 'Send my prices'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Message({ status }: { status: Status }) {
  if (status.kind === 'error') return <p role="alert" className={`text-[14px] ${red}`}>{status.message}</p>;
  if (status.kind === 'sent' || status.kind === 'copied')
    return (
      <p role="status" className="text-[14px] leading-snug text-[#2F6B45]">
        {status.kind === 'sent'
          ? 'If you haven’t yet, send that message to the web team. They’ll put your prices on the website and tell you when they’re live.'
          : 'Copied. Paste it into a WhatsApp message to the web team.'}
      </p>
    );
  return null;
}

/** One piece: a large photograph, the price box, and what the client will pay. */
function PieceCard({ piece: p, row, onChange }: { piece: Piece; row: Row; onChange: (patch: Partial<Row>) => void }) {
  const test = testSpec(p);
  const price = Number(row.price);
  const inv = row.price ? invoiceFor(price) : null;
  const sizeShown = row.size.trim() || test.size;
  const id = `price-${p.slug}`;

  return (
    <li className="flex flex-col bg-[#FBF8F3] shadow-[0_1px_0_rgba(30,30,34,0.06),0_18px_40px_-30px_rgba(30,30,34,0.35)]">
      <a href={`/furnishings/${p.slug}`} target="_blank" rel="noopener noreferrer" aria-label={`See ${p.name} on the website`} className="relative block aspect-[4/3] overflow-hidden bg-[#F1EBE1]">
        {p.photos?.[0] && <img src={p.photos[0]} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain p-4" />}
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[12px] font-medium ${inv ? 'bg-furn-ink text-furn-linen' : 'bg-[rgba(251,248,243,0.92)] text-[#6F6A62]'}`}>
          {inv ? '✓ Your price' : 'Sample price'}
        </span>
      </a>

      <div className="flex flex-1 flex-col gap-5 p-5 md:p-6">
        <div>
          <h3 className="font-furn text-[26px] leading-tight">{p.name}</h3>
          <p className={`mt-1 text-[15px] ${muted}`}>{p.kind}</p>
          {soldInSeaters(p) && <p className="mt-2 text-[14px] text-furn-walnut">Sold as 3-2-1: type the 3-seater price.</p>}
        </div>

        <div>
          <label htmlFor={id} className={cap}>Price before VAT</label>
          <div className="mt-1 flex items-baseline gap-2 border-b-2 border-furn-ink">
            <span className="text-[20px] font-light">KES</span>
            <input
              id={id}
              inputMode="numeric"
              enterKeyHint="next"
              value={group(row.price)}
              onChange={(e) => onChange({ price: digits(e.target.value) })}
              onFocus={selectAll}
              placeholder={test.price.toLocaleString('en-KE')}
              className="w-0 min-w-0 flex-1 bg-transparent py-2 font-furn text-[30px] tabular-nums outline-none placeholder:text-[#B8B1A6]"
            />
          </div>
          <p className={`mt-2 text-[14px] leading-snug ${muted}`} aria-live="polite">
            {inv ? (
              <>
                The client pays <strong className="font-medium text-furn-ink">{kes(inv.total)}</strong> with VAT: a deposit of {kes(inv.deposit)}, then {kes(inv.balance)}.
              </>
            ) : (
              <>Empty, so the site shows the sample price of {kes(test.price)}.</>
            )}
          </p>
          {inv && price < 1000 && <p role="alert" className={`mt-1 text-[14px] ${red}`}>That looks low. Is a digit missing?</p>}
        </div>

        <details className="group mt-auto border-t border-[rgba(30,30,34,0.1)] pt-4">
          <summary className="flex cursor-pointer list-none items-baseline justify-between gap-3 text-[15px] [&::-webkit-details-marker]:hidden">
            <span className="min-w-0">
              <span className={cap}>Size</span>
              <span className="mt-1 block">{sizeShown}{row.size.trim() ? '' : ' (sample)'}</span>
            </span>
            <span className="shrink-0 text-[14px] underline underline-offset-4 group-open:hidden">Change</span>
          </summary>
          <div className="mt-4 grid gap-4">
            <label className="grid gap-1">
              <span className={cap}>Size shown to clients</span>
              <input value={row.size} onChange={(e) => onChange({ size: e.target.value })} placeholder={test.size} maxLength={120} className={box} />
            </label>
            {test.ft !== null && (
              <label className="grid gap-1">
                <span className={cap}>Standard length in feet</span>
                <input inputMode="decimal" value={row.ft} onChange={(e) => onChange({ ft: decimal(e.target.value) })} placeholder={`${test.ft}`} className={`${box} tabular-nums`} />
                <span className={`text-[13px] ${muted}`}>Made to measure adds to the price from this length.</span>
              </label>
            )}
          </div>
        </details>
      </div>
    </li>
  );
}

/* what is live now, in the same shape as a freshly built sheet, for comparing */
function cleanOrSelf(s: Sheet): Sheet {
  const r = cleanSheet(s, slugs);
  return r.ok ? r.sheet : s;
}
