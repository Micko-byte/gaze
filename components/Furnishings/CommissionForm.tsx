'use client';

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Link from 'next/link';
import { colours, commissionTerms, fabrics, type FabricId, type Piece } from '@/content/furnishings';
import { SignaturePad } from '@/components/SignaturePad/SignaturePad';

/* Each fabric drawn as a texture over the chosen colour, so the swatch shows the two together. */
const TEXTURES: Record<FabricId, string> = {
  boucle:
    'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.28) 0 1.4px, transparent 2px) 0 0/7px 7px, radial-gradient(circle at 70% 70%, rgba(0,0,0,0.2) 0 1.4px, transparent 2px) 0 0/7px 7px',
  linen: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.14) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0 1px, transparent 1px 4px)',
  velvet: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(0,0,0,0.24) 55%, rgba(255,255,255,0.12))',
  leather: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.28), transparent 60%), radial-gradient(rgba(0,0,0,0.14) 1px, transparent 1.5px) 0 0/5px 5px',
  chenille: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.16) 0 2px, rgba(0,0,0,0.12) 2px 4px)',
  performance: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.12) 0 1px, transparent 1px 5px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.1) 0 1px, transparent 1px 5px)',
};
const swatch = (fabric: FabricId, hex: string): CSSProperties => ({ background: `${TEXTURES[fabric]}, ${hex}` });

const field = 'w-full border-b border-[rgba(30,30,34,0.35)] bg-transparent py-2 text-base outline-none transition-colors placeholder:text-[#9A948A] focus:border-furn-ink';
const label = 'text-[12px] text-[#6F6A62]';

function Step({ n, title, note, children }: { n: number; title: string; note?: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-furn-ink pt-8">
      <legend className="sr-only">{title}</legend>
      <div className="grid gap-8 md:grid-cols-[12rem_1fr]">
        <div>
          <span className="font-furn text-4xl text-furn-walnut">{n}</span>
          <h3 className="mt-2 font-furn text-[26px] leading-tight" aria-hidden="true">{title}</h3>
          {note && <p className="mt-2 text-[13px] font-light leading-relaxed text-[#6F6A62]">{note}</p>}
        </div>
        <div>{children}</div>
      </div>
    </fieldset>
  );
}

/**
 * The commission: the client's checklist for a made-to-order piece, in order. Measurements, fabric and texture,
 * colour, her own design (or a call with a representative), a note to the production team, contact details, then
 * the terms, which she accepts and signs.
 *
 * There is no order backend yet: a submitted commission is shown back and thanked, not sent. Wire `submit` to the
 * production inbox (and file storage for uploads) once the client chooses one.
 */
export function CommissionForm({ piece }: { piece: Piece }) {
  const [size, setSize] = useState<'standard' | 'custom'>('standard');
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [fabric, setFabric] = useState<FabricId>('boucle');
  const [colour, setColour] = useState<{ name: string; hex: string }>(colours[0]);
  const [files, setFiles] = useState<File[]>([]);
  const [explain, setExplain] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [signError, setSignError] = useState(false);
  const [done, setDone] = useState<{ name: string } | null>(null);
  const top = useRef<HTMLDivElement>(null);
  // stable, so the pad does not reset while the rest of the form changes
  const onSign = useCallback((png: string | null) => {
    setSignature(png);
    if (png) setSignError(false);
  }, []);

  const previews = useMemo(() => files.map((f) => ({ f, url: f.type.startsWith('image/') ? URL.createObjectURL(f) : null })), [files]);
  useEffect(() => () => previews.forEach((p) => p.url && URL.revokeObjectURL(p.url)), [previews]);

  const fabricName = fabrics.find((f) => f.id === fabric)!.name;
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  if (done) {
    return (
      <div ref={top} className="mx-auto max-w-3xl py-10 text-center" role="status">
        <div className="mx-auto h-28 w-28 rounded-full ring-1 ring-[rgba(30,30,34,0.2)]" style={swatch(fabric, colour.hex)} aria-hidden="true" />
        <h2 className="mt-10 font-furn text-[clamp(44px,5.6vw,96px)] leading-[0.96]">Thank you for your purchase.</h2>
        <p className="mx-auto mt-6 max-w-lg text-lg font-light leading-relaxed text-[#4A4640]">
          {done.name.split(' ')[0]}, our team will contact you shortly: a Gaze Furnishings representative will confirm your order
          of the {piece.name} in {colour.name.toLowerCase()} {fabricName.toLowerCase()} with you before production begins.
        </p>
        <Link href="/furnishings#catalogue" data-no-transition className="mt-10 inline-block rounded-full bg-furn-ink px-7 py-3.5 text-[13px] text-furn-linen transition-colors hover:bg-furn-walnut">
          back to the catalogue
        </Link>
      </div>
    );
  }

  return (
    <div ref={top} className="grid gap-14 lg:grid-cols-[1fr_340px]">
      <form
        className="flex flex-col gap-16"
        onSubmit={(e) => {
          e.preventDefault();
          if (!signature) {
            setSignError(true);
            document.getElementById('signature')?.scrollIntoView({ block: 'center' });
            return;
          }
          const data = new FormData(e.currentTarget);
          setDone({ name: String(data.get('signed-name') || data.get('name') || '') });
          top.current?.scrollIntoView({ block: 'start' });
        }}
      >
        <Step n={1} title="your measurements" note="Every piece can be made to the size of your room.">
          <div className="flex flex-wrap gap-3">
            {(['standard', 'custom'] as const).map((s) => (
              <label key={s} className={`cursor-pointer rounded-full px-6 py-3 text-[13px] ring-1 transition-colors ${size === s ? 'bg-furn-ink text-furn-linen ring-furn-ink' : 'ring-[rgba(30,30,34,0.3)] hover:ring-furn-ink'}`}>
                <input type="radio" name="size" value={s} checked={size === s} onChange={() => setSize(s)} className="sr-only" />
                {s === 'standard' ? 'our standard size' : 'made to my measurements'}
              </label>
            ))}
          </div>
          {size === 'custom' && (
            <div className="mt-8 grid gap-6 sm:grid-cols-4">
              {['width', 'depth', 'height'].map((d) => (
                <label key={d} className="flex flex-col gap-1">
                  <span className={label}>{d} ({unit})</span>
                  <input name={d} type="number" min={1} inputMode="decimal" required className={field} />
                </label>
              ))}
              <label className="flex flex-col gap-1">
                <span className={label}>units</span>
                <select value={unit} onChange={(e) => setUnit(e.target.value as 'cm' | 'in')} className={field}>
                  <option value="cm">centimetres</option>
                  <option value="in">inches</option>
                </select>
              </label>
            </div>
          )}
          <label className="mt-8 flex flex-col gap-1">
            <span className={label}>the room it will live in (optional)</span>
            <input name="room" placeholder="e.g. a 5 × 4 m living room with a window wall" className={field} />
          </label>
        </Step>

        <Step n={2} title="fabric & texture" note="Swatches are drawn in your chosen colour. We send physical samples on request.">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {fabrics.map((f) => (
              <label key={f.id} className="group cursor-pointer">
                <input type="radio" name="fabric" value={f.id} checked={fabric === f.id} onChange={() => setFabric(f.id)} className="peer sr-only" />
                <span
                  className="block aspect-[4/3] ring-1 ring-[rgba(30,30,34,0.15)] transition-shadow group-hover:ring-furn-ink peer-checked:ring-2 peer-checked:ring-furn-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2"
                  style={swatch(f.id, colour.hex)}
                />
                <span className="mt-2 block text-[14px]">{f.name}</span>
                <span className="block text-[12px] text-[#6F6A62]">{f.note}</span>
              </label>
            ))}
          </div>
        </Step>

        <Step n={3} title="colour" note="Choose from the house palette, or match a colour of your own.">
          <div className="flex flex-wrap gap-3">
            {colours.map((c) => (
              <label key={c.name} className="cursor-pointer text-center">
                <input type="radio" name="colour" value={c.name} checked={colour.hex === c.hex} onChange={() => setColour(c)} className="peer sr-only" />
                <span
                  className="mx-auto block h-12 w-12 rounded-full ring-1 ring-[rgba(30,30,34,0.2)] ring-offset-2 ring-offset-white transition-shadow peer-checked:ring-2 peer-checked:ring-furn-ink peer-focus-visible:outline peer-focus-visible:outline-2"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="mt-2 block text-[11px]">{c.name.toLowerCase()}</span>
              </label>
            ))}
            <label className="cursor-pointer text-center">
              <input
                type="color"
                value={colour.hex}
                onChange={(e) => setColour({ name: `Custom ${e.target.value.toUpperCase()}`, hex: e.target.value })}
                className="mx-auto block h-12 w-12 cursor-pointer appearance-none rounded-full border-0 bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border [&::-webkit-color-swatch]:border-dashed [&::-webkit-color-swatch]:border-furn-ink"
                aria-label="Pick a custom colour"
              />
              <span className="mt-2 block text-[11px]">your own</span>
            </label>
          </div>
          <p className="mt-5 text-[13px] text-[#6F6A62]">selected: {colour.name.toLowerCase()} · {colour.hex.toUpperCase()}</p>
        </Step>

        <Step n={4} title="your design" note="Share a sketch, a photo or a reference, or tell us you would rather explain it in person.">
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-[rgba(30,30,34,0.35)] px-6 py-10 text-center transition-colors hover:border-furn-ink hover:bg-[#F6F1EA]">
            <span className="text-[15px]">upload your desired design</span>
            <span className="text-[12px] text-[#6F6A62]">images or PDF · as many as you like</span>
            <input
              type="file"
              name="design"
              multiple
              accept="image/*,application/pdf"
              onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
              className="sr-only"
            />
          </label>
          {previews.length > 0 && (
            <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
              {previews.map(({ f, url }) => (
                <li key={f.name + f.size} className="text-[11px] text-[#6F6A62]">
                  {url ? <img src={url} alt="" className="aspect-square w-full object-cover" /> : <span className="grid aspect-square place-items-center bg-[#F6F1EA]">PDF</span>}
                  <span className="mt-1 block truncate">{f.name}</span>
                </li>
              ))}
            </ul>
          )}
          <label className="mt-8 flex cursor-pointer items-start gap-3 text-[14px]">
            <input type="checkbox" checked={explain} onChange={(e) => setExplain(e.target.checked)} className="mt-1 accent-[#1E1E22]" />
            I would rather explain my design directly to a representative at the production atelier.
          </label>
          {explain && (
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-1">
                <span className={label}>how should we reach you?</span>
                <select name="explain-by" className={field} defaultValue="call">
                  <option value="call">a phone call</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="video">a video call</option>
                  <option value="visit">a visit to the showroom</option>
                </select>
              </label>
              <label className="flex flex-col gap-1">
                <span className={label}>a good time</span>
                <input name="explain-when" placeholder="e.g. weekday mornings" className={field} />
              </label>
            </div>
          )}
        </Step>

        <Step n={5} title="a note to the production team" note="Anything our artisans should know: the use, the light, the people.">
          <textarea name="message" rows={5} placeholder="Write to the atelier…" className={`${field} resize-y border px-4 py-3`} />
        </Step>

        <Step n={6} title="your details">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className={label}>full name*</span>
              <input name="name" required autoComplete="name" className={field} />
            </label>
            <label className="flex flex-col gap-1">
              <span className={label}>email*</span>
              <input name="email" type="email" required autoComplete="email" className={field} />
            </label>
            <label className="flex flex-col gap-1">
              <span className={label}>phone or WhatsApp*</span>
              <input name="phone" type="tel" required autoComplete="tel" className={field} />
            </label>
            <label className="flex flex-col gap-1">
              <span className={label}>country*</span>
              <input name="country" required autoComplete="country-name" className={field} />
            </label>
            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className={label}>delivery address</span>
              <input name="address" autoComplete="street-address" className={field} />
            </label>
          </div>
        </Step>

        <Step n={7} title="terms & signature" note="Please read the terms of your commission, then sign.">
          <div className="max-h-72 overflow-y-auto border border-[rgba(30,30,34,0.2)] bg-white p-6" tabIndex={0} aria-label="Terms of commission">
            <p className="font-furn text-xl">Terms of commission</p>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-[13px] leading-relaxed text-[#4A4640]">
              {commissionTerms.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ol>
          </div>
          <label className="mt-6 flex cursor-pointer items-start gap-3 text-[14px]">
            <input type="checkbox" name="agree" required className="mt-1 accent-[#1E1E22]" />
            I have read and understood the terms of this commission, and agree that they are legally binding once my order is
            confirmed.
          </label>
          <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_12rem]">
            <div>
              <span className={label} id="signature-label">your signature*</span>
              <div className="mt-2">
                <SignaturePad id="signature" onChange={onSign} />
              </div>
              {signError && <p className="mt-2 text-[13px] text-[#9B2C2C]" role="alert">Please sign in the box above to complete your commission.</p>}
            </div>
            <div className="flex flex-col gap-6">
              <label className="flex flex-col gap-1">
                <span className={label}>print your name*</span>
                <input name="signed-name" required className={field} />
              </label>
              <p className="flex flex-col gap-1">
                <span className={label}>date</span>
                <span className="border-b border-[rgba(30,30,34,0.35)] py-2">{today}</span>
              </p>
            </div>
          </div>
        </Step>

        <div className="border-t border-furn-ink pt-8">
          <button type="submit" className="rounded-full bg-furn-ink px-9 py-4 text-[14px] text-furn-linen transition-colors hover:bg-furn-walnut">
            place my commission
          </button>
          <p className="mt-4 max-w-md text-[12px] leading-relaxed text-[#6F6A62]">
            Nothing is charged now. Your representative confirms the price and specifications with you before production begins.
          </p>
        </div>
      </form>

      {/* the order, as it stands */}
      <aside className="lg:sticky lg:top-[96px] lg:self-start">
        <div className="bg-[#F6F1EA] p-7">
          <p className="text-[12px] text-[#6F6A62]">your commission</p>
          <p className="mt-2 font-furn text-3xl leading-none">{piece.name}</p>
          <div className="mt-6 aspect-[4/3] ring-1 ring-[rgba(30,30,34,0.12)]" style={swatch(fabric, colour.hex)} aria-hidden="true" />
          <dl className="mt-6 grid gap-3 text-[13px]">
            {[
              ['size', size === 'standard' ? 'standard' : `made to measure (${unit})`],
              ['fabric', fabricName.toLowerCase()],
              ['colour', colour.name.toLowerCase()],
              ['your design', files.length ? `${files.length} file${files.length > 1 ? 's' : ''}` : explain ? 'explained in person' : '—'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-[rgba(30,30,34,0.12)] pb-2">
                <dt className="text-[#6F6A62]">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
            <div className="flex justify-between gap-4 pt-2">
              <dt className="text-[#6F6A62]">price</dt>
              <dd className="min-w-[96px] border-b border-dashed border-[rgba(30,30,34,0.35)] text-right">{piece.price ?? 'to follow'}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#6F6A62]">deposit</dt>
              <dd className="min-w-[96px] border-b border-dashed border-[rgba(30,30,34,0.35)] text-right">to follow</dd>
            </div>
          </dl>
          <p className="mt-6 text-[12px] leading-relaxed text-[#6F6A62]">made to order in 14–21 days · delivered worldwide</p>
        </div>
      </aside>
    </div>
  );
}
