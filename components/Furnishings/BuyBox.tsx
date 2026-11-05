'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  colours,
  defaultConfiguration,
  describeConfiguration,
  finishes,
  furnContact,
  madeAsShown,
  offersFinish,
  soldInSeaters,
  studioForm,
  textureColours,
  textures,
  timbers,
  withMaterial,
  type Configuration,
  type Piece,
  type TextureId,
  type TimberId,
} from '@/content/furnishings';
import { pieceSpec, priceSettings, SEATER_SHARE } from '@/content/pricing';
import { bag, openBag } from '@/lib/bag';
import { kes, lengthCharge } from '@/lib/pricing';
import { clothStyle, setSwatch } from '@/lib/swatch';
import { baseHex, materialStyle } from './AtelierRender';

const cap = 'text-[10px] font-medium uppercase tracking-[0.28em] text-[#8A847A]';
const chip = (on: boolean) =>
  `rounded-full px-4 py-2 text-[13px] ring-1 transition-colors ${on ? 'bg-furn-ink text-furn-linen ring-furn-ink' : 'ring-[rgba(30,30,34,0.25)] hover:ring-furn-ink'}`;
const stepper = 'flex items-center rounded-full ring-1 ring-[rgba(30,30,34,0.25)]';

const wa = (text: string) => `https://wa.me/${furnContact.whatsapp}?text=${encodeURIComponent(text)}`;

function Stepper({ value, min, onChange, label }: { value: number; min: number; onChange: (n: number) => void; label: string }) {
  return (
    <span className={stepper}>
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} aria-label={`One fewer: ${label}`} className="h-9 w-9 text-lg leading-none">−</button>
      <span className="w-6 text-center tabular-nums" aria-live="polite">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} aria-label={`One more: ${label}`} className="h-9 w-9 text-lg leading-none">+</button>
    </span>
  );
}

/**
 * Buying a piece in one place, on the pattern of Lujo Living's product page: the price first, then the fabric as tabs
 * with a photographed swatch for every colour, a way to ask for a real sample, the size, and a price that answers every
 * choice at once. A design of the client's own goes to the bespoke page or the commission below.
 */
export function BuyBox({ piece }: { piece: Piece }) {
  const router = useRouter();
  const form = studioForm(piece);
  const spec = pieceSpec(piece);
  const fixed = madeAsShown(piece);
  const showFinish = !fixed && offersFinish(piece);
  const seaters = soldInSeaters(piece);

  // a piece named for its cloth opens in that cloth
  const [config, setConfig] = useState<Configuration>(() => {
    const start = defaultConfiguration(form);
    return form !== 'case' && /velvet/i.test(`${piece.name} ${piece.kind}`) ? withMaterial(start, 'velvet') : start;
  });
  const [size, setSize] = useState<'standard' | 'custom'>('standard');
  const [length, setLength] = useState('');
  const [qty, setQty] = useState(1);
  const [parts, setParts] = useState<Record<number, number>>({ 3: 1, 2: 0, 1: 0 });
  const [added, setAdded] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  const actions = useRef<HTMLDivElement>(null);

  const texture = textures.find((t) => t.id === config.material);
  const materials: ReadonlyArray<{ id: TextureId | TimberId; label: string }> =
    form === 'case' ? timbers.map((t) => ({ id: t.id, label: t.name })) : textures.map((t) => ({ id: t.id, label: t.short }));
  const allowed =
    config.material === 'lacquer'
      ? colours
      : texture
        ? colours.filter((c) => textureColours[config.material as TextureId].includes(c.name))
        : [];
  const hex = colours.find((c) => c.name === config.colour)?.hex;
  const swatchFor = (colourHex: string) => (texture ? clothStyle(texture.grain, colourHex) : materialStyle(config.material, colourHex));
  const described = fixed ? 'As shown' : describeConfiguration(config, showFinish);

  // the fabric chosen here shows as a circle on the piece's photograph
  useEffect(() => {
    setSwatch(fixed ? null : { label: described, style: swatchFor(baseHex(config, hex)) });
    return () => setSwatch(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, described, fixed, hex]);

  // the buy bar slides up once the main buttons have scrolled away
  useEffect(() => {
    if (!actions.current) return;
    const io = new IntersectionObserver(([e]) => setOffscreen(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(actions.current);
    return () => io.disconnect();
  }, []);

  const feet = parseFloat(length);
  const extra = size === 'custom' && spec.ft !== null ? lengthCharge(spec.ft, feet, priceSettings.extraStepFt, priceSettings.extraStepKes) : 0;
  const partsChosen = SEATER_SHARE.filter((s) => parts[s.seats] > 0);
  const unit = seaters
    ? SEATER_SHARE.reduce((sum, s) => sum + parts[s.seats] * Math.round((spec.price * s.share) / 100) * 100, 0) + extra * (parts[3] ?? 0)
    : spec.price + extra;
  const count = seaters ? 1 : qty;
  const canBuy = (!seaters || partsChosen.length > 0) && (size === 'standard' || feet > 0);
  const sizeWords = size === 'custom' && feet > 0 ? `made to ${feet} ft` : `standard: ${spec.size}`;
  const partsWords = seaters ? partsChosen.map((s) => `${parts[s.seats]} × ${s.label}`).join(', ') : '';

  const put = () => {
    bag.add({
      slug: piece.slug,
      name: piece.name,
      photo: piece.photos?.[0],
      config,
      described: [partsWords, described].filter(Boolean).join(' · '),
      spec: sizeWords,
      unit,
      qty: count,
      imported: piece.imported,
    });
  };
  const addToCart = () => {
    put();
    setAdded(true);
    openBag();
  };
  const buyNow = () => {
    put();
    router.push('/furnishings/checkout');
  };

  return (
    <div className="mt-8 grid max-w-md gap-7">
      <div>
        <p className="font-furn text-[34px] leading-none tabular-nums">{kes(unit * count)}</p>
        <p className="mt-2 text-[13px] text-[#6F6A62]">
          Excl. 16% VAT{spec.confirmed ? '' : ' · indicative price'}
          {extra > 0 && ` · includes ${kes(extra)} for the added length`}
        </p>
      </div>

      {!fixed && (
        <fieldset className="border-t border-[rgba(30,30,34,0.15)] pt-6">
          <legend className="sr-only">{form === 'case' ? 'Timber' : 'Fabric'}</legend>
          <p className={cap}>{form === 'case' ? 'Timber' : 'Fabric'}</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 border-b border-[rgba(30,30,34,0.15)]">
            {materials.map((m) => (
              <button
                key={m.id}
                type="button"
                aria-pressed={config.material === m.id}
                onClick={() => setConfig(withMaterial(config, m.id))}
                className={`-mb-px border-b-2 pb-2 text-[14px] transition-colors ${config.material === m.id ? 'border-furn-ink text-furn-ink' : 'border-transparent text-[#6F6A62] hover:text-furn-ink'}`}
              >
                {m.label}
              </button>
            ))}
          </div>
          {texture && <p className="mt-3 text-[14px] font-light leading-relaxed text-[#4A4640]">{texture.line}</p>}

          {allowed.length > 0 && (
            <div className="mt-4 grid grid-cols-6 gap-2.5 sm:grid-cols-7">
              {allowed.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  title={c.name}
                  aria-label={c.name}
                  aria-pressed={config.colour === c.name}
                  onClick={() => setConfig({ ...config, colour: c.name })}
                  className={`aspect-square overflow-hidden ring-offset-2 ring-offset-furn-linen transition-shadow ${config.colour === c.name ? 'ring-1 ring-furn-ink' : 'hover:ring-1 hover:ring-[rgba(30,30,34,0.35)]'}`}
                  style={swatchFor(c.hex)}
                />
              ))}
            </div>
          )}
          <div className="mt-3 flex items-baseline justify-between gap-4">
            <p className="text-[14px]">{allowed.length > 0 ? config.colour : described}</p>
            <a href={wa(`Hello Gaze Furnishings, may I have a fabric sample of ${described} for the ${piece.name}?`)} target="_blank" rel="noopener noreferrer" className="shrink-0 text-[13px] underline underline-offset-4 hover:text-furn-walnut">
              Request a sample
            </a>
          </div>
        </fieldset>
      )}

      {showFinish && (
        <fieldset>
          <legend className={cap}>Finish</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {finishes.map((f) => (
              <button key={f.id} type="button" aria-pressed={config.finish === f.id} onClick={() => setConfig({ ...config, finish: f.id })} className={chip(config.finish === f.id)}>
                {f.name}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset className="border-t border-[rgba(30,30,34,0.15)] pt-6">
        <legend className="sr-only">Size</legend>
        <p className={cap}>Size</p>
        {spec.ft !== null && (
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" aria-pressed={size === 'standard'} onClick={() => setSize('standard')} className={chip(size === 'standard')}>standard</button>
            <button type="button" aria-pressed={size === 'custom'} onClick={() => setSize('custom')} className={chip(size === 'custom')}>made to measure</button>
          </div>
        )}
        {size === 'standard' ? (
          <p className="mt-3 text-[14px] text-[#4A4640]">{spec.size}</p>
        ) : (
          <div className="mt-4">
            <label htmlFor="piece-length" className="text-[12px] text-[#6F6A62]">the length you need, in feet</label>
            <div className="mt-1 flex items-end gap-3 border-b border-[rgba(30,30,34,0.35)] focus-within:border-furn-ink">
              <input
                id="piece-length"
                type="number"
                inputMode="decimal"
                min={1}
                step={0.5}
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder={String(spec.ft)}
                className="w-full bg-transparent py-2 text-base outline-none placeholder:text-[#9A948A]"
              />
              <span className="pb-2 text-[14px] text-[#6F6A62]">ft</span>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-[#6F6A62]">
              Standard is {spec.ft} ft. Every {priceSettings.extraStepFt} ft added is {kes(priceSettings.extraStepKes)}, and the price above changes as you type.
            </p>
          </div>
        )}
      </fieldset>

      {seaters ? (
        <fieldset>
          <legend className={cap}>Your set</legend>
          <ul className="mt-3 grid gap-3">
            {SEATER_SHARE.map((s) => (
              <li key={s.seats} className="flex items-center justify-between gap-4">
                <span className="text-[14px]">
                  {s.label} <span className="text-[#6F6A62]">· {kes(Math.round((spec.price * s.share) / 100) * 100)}</span>
                </span>
                <Stepper value={parts[s.seats]} min={0} onChange={(n) => setParts({ ...parts, [s.seats]: n })} label={s.label} />
              </li>
            ))}
          </ul>
        </fieldset>
      ) : (
        <div className="flex items-center justify-between gap-4">
          <p className={cap}>Quantity</p>
          <Stepper value={qty} min={1} onChange={setQty} label={piece.name} />
        </div>
      )}

      <div ref={actions} className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          disabled={!canBuy}
          onClick={addToCart}
          className="rounded-full bg-furn-ink px-7 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-furn-linen transition-colors hover:bg-furn-walnut disabled:cursor-not-allowed disabled:opacity-40"
        >
          {added ? 'Add another' : 'Add to cart'}
        </button>
        <button
          type="button"
          disabled={!canBuy}
          onClick={buyNow}
          className="rounded-full px-7 py-4 text-[11px] font-medium uppercase tracking-[0.24em] ring-1 ring-furn-ink transition-colors hover:bg-furn-ink hover:text-furn-linen disabled:cursor-not-allowed disabled:opacity-40"
        >
          Buy now
        </button>
      </div>
      <p className="-mt-3 text-[13px] leading-relaxed text-[#6F6A62]">
        Price includes complimentary white-glove delivery and installation within Nairobi. 16% VAT is itemised at checkout.
      </p>

      <div className="grid gap-2 border-t border-[rgba(30,30,34,0.15)] pt-5 text-[14px]">
        <a href={wa(`Hello Gaze Furnishings, I would like to speak with a representative about the ${piece.name}.`)} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-furn-walnut">
          Speak with a representative
        </a>
        <Link href="/furnishings/bespoke" data-no-transition className="underline underline-offset-4 hover:text-furn-walnut">
          Have a picture of your own? Send us your design
        </Link>
      </div>

      {/* the buy bar, once the buttons above have scrolled away */}
      <div
        aria-hidden={!offscreen}
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-[rgba(30,30,34,0.15)] bg-furn-linen px-5 py-3 transition-transform duration-500 ease-reveal md:px-8 ${offscreen ? 'translate-y-0' : 'pointer-events-none translate-y-full'}`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
          <p className="min-w-0 truncate text-[14px]">
            {piece.name} <span className="hidden text-[#6F6A62] sm:inline">· {described}</span>
          </p>
          <button
            type="button"
            tabIndex={offscreen ? 0 : -1}
            disabled={!canBuy}
            onClick={addToCart}
            className="shrink-0 rounded-full bg-furn-ink px-5 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-furn-linen transition-colors hover:bg-furn-walnut disabled:opacity-40"
          >
            Add to cart · {kes(unit * count)}
          </button>
        </div>
      </div>
    </div>
  );
}
