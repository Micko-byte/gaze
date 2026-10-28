'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  colours,
  defaultConfiguration,
  describeConfiguration,
  finishes,
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
import { bag, openBag } from '@/lib/bag';

const cap = 'text-[10px] font-medium uppercase tracking-[0.28em] text-[#8A847A]';
const chip = (on: boolean) =>
  `rounded-full px-4 py-2 text-[13px] ring-1 transition-colors ${on ? 'bg-furn-ink text-furn-linen ring-furn-ink' : 'ring-[rgba(30,30,34,0.25)] hover:ring-furn-ink'}`;

/**
 * Buying a piece in one place, the way her clients asked for it: fabric (or timber), colour, finish, size, how many;
 * then "add to bag" or "buy now", which goes straight to the one-page checkout. A design of their own still goes
 * through the full commission below.
 */
export function BuyBox({ piece }: { piece: Piece }) {
  const router = useRouter();
  const form = studioForm(piece);
  const [config, setConfig] = useState<Configuration>(defaultConfiguration(form));
  const [size, setSize] = useState<'standard' | 'custom'>('standard');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const materials: ReadonlyArray<{ id: TextureId | TimberId; label: string }> =
    form === 'case' ? timbers.map((t) => ({ id: t.id, label: t.name })) : textures.map((t) => ({ id: t.id, label: t.short }));
  const allowed =
    config.material === 'lacquer'
      ? colours
      : textures.some((t) => t.id === config.material)
        ? colours.filter((c) => textureColours[config.material as TextureId].includes(c.name))
        : [];

  const put = () => {
    bag.add({
      slug: piece.slug,
      name: piece.name,
      photo: piece.photos?.[0],
      config,
      described: describeConfiguration(config),
      size,
      qty,
      imported: piece.imported,
    });
  };

  return (
    <div className="mt-10 grid max-w-md gap-7 border-t border-[rgba(30,30,34,0.15)] pt-7">
      <fieldset>
        <legend className={cap}>{form === 'case' ? 'Timber' : 'Fabric'}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {materials.map((m) => (
            <button key={m.id} type="button" aria-pressed={config.material === m.id} onClick={() => setConfig(withMaterial(config, m.id))} className={chip(config.material === m.id)}>
              {m.label}
            </button>
          ))}
        </div>
      </fieldset>

      {allowed.length > 0 && (
        <fieldset>
          <legend className={cap}>
            Colour <span className="normal-case tracking-normal text-furn-ink">· {config.colour}</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {allowed.map((c) => (
              <button
                key={c.name}
                type="button"
                title={c.name}
                aria-label={c.name}
                aria-pressed={config.colour === c.name}
                onClick={() => setConfig({ ...config, colour: c.name })}
                className={`h-8 w-8 rounded-full ring-1 ring-inset ring-[rgba(30,30,34,0.15)] outline-offset-2 transition-[outline-color] ${config.colour === c.name ? 'outline outline-2 outline-furn-ink' : 'outline outline-2 outline-transparent hover:outline-[rgba(30,30,34,0.3)]'}`}
                style={{ background: c.hex }}
              />
            ))}
          </div>
        </fieldset>
      )}

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

      <div className="grid grid-cols-[1fr_auto] items-end gap-6">
        <fieldset>
          <legend className={cap}>Size</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" aria-pressed={size === 'standard'} onClick={() => setSize('standard')} className={chip(size === 'standard')}>standard</button>
            <button type="button" aria-pressed={size === 'custom'} onClick={() => setSize('custom')} className={chip(size === 'custom')}>made to measure</button>
          </div>
        </fieldset>
        <div>
          <p className={cap}>Qty</p>
          <span className="mt-3 flex items-center rounded-full ring-1 ring-[rgba(30,30,34,0.25)]">
            <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="One fewer" className="h-9 w-9 text-lg leading-none">−</button>
            <span className="w-6 text-center tabular-nums" aria-live="polite">{qty}</span>
            <button type="button" onClick={() => setQty(qty + 1)} aria-label="One more" className="h-9 w-9 text-lg leading-none">+</button>
          </span>
        </div>
      </div>
      {size === 'custom' && <p className="-mt-3 text-[13px] text-[#6F6A62]">We take your measurements on WhatsApp or a call once you order.</p>}

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => {
            put();
            setAdded(true);
            openBag();
          }}
          className="rounded-full bg-furn-ink px-7 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-furn-linen transition-colors hover:bg-furn-walnut"
        >
          {added ? 'Add another' : 'Add to bag'}
        </button>
        <button
          type="button"
          onClick={() => {
            put();
            router.push('/furnishings/checkout');
          }}
          className="rounded-full px-7 py-4 text-[11px] font-medium uppercase tracking-[0.24em] ring-1 ring-furn-ink transition-colors hover:bg-furn-ink hover:text-furn-linen"
        >
          Buy now
        </button>
      </div>
      <p className="-mt-2 text-[13px] leading-relaxed text-[#6F6A62]">
        {describeConfiguration(config)} · a 75% deposit secures it, nothing is charged until we confirm your invoice.
      </p>
    </div>
  );
}
