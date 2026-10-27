'use client';

/* eslint-disable @next/next/no-img-element */
import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { defaultConfiguration, describeConfiguration, pieces, studioForm, type Configuration } from '@/content/furnishings';
import { BespokeAtelier } from './BespokeAtelier';

/* the studio opens on the upholstered pieces she has photographed: the ones a fabric changes */
const choices = pieces.filter((p) => p.photos && studioForm(p) !== 'case');

const field = 'w-full border-b border-[rgba(238,231,223,0.35)] bg-transparent py-2 text-base text-furn-linen outline-none placeholder:text-[rgba(238,231,223,0.45)] focus:border-furn-linen';

/**
 * The Bespoke Atelier on the Furnishings page: choose a piece, dress it, then take the configuration into a commission
 * for a quote, or ask for physical swatches of it.
 */
export function AtelierStudio() {
  const [slug, setSlug] = useState(choices[0].slug);
  const piece = choices.find((p) => p.slug === slug)!;
  const [config, setConfig] = useState<Configuration>(defaultConfiguration(studioForm(piece)));
  const [samples, setSamples] = useState<'closed' | 'open' | 'sent'>('closed');

  const quoteHref = `/furnishings/${piece.slug}?material=${config.material}&colour=${encodeURIComponent(config.colour)}&finish=${config.finish}#commission`;

  const onSamples = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log('[Gaze Furnishings] swatch samples:', { piece: piece.name, ...config, ...Object.fromEntries(new FormData(e.currentTarget).entries()) });
    setSamples('sent');
  };

  return (
    <div>
      <div role="radiogroup" aria-label="Choose a piece" className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-4 [scrollbar-width:thin] md:mx-0 md:px-0">
        {choices.map((p) => {
          const on = p.slug === slug;
          return (
            <button
              key={p.slug}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setSlug(p.slug)}
              className={`flex shrink-0 snap-start items-center gap-3 rounded-full py-1.5 pl-1.5 pr-5 text-[13px] transition-colors ${on ? 'bg-furn-ink text-furn-linen' : 'bg-white ring-1 ring-[rgba(30,30,34,0.15)] hover:ring-furn-ink'}`}
            >
              <img src={p.photos![0]} alt="" className="h-9 w-9 rounded-full object-cover" />
              {p.name}
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        <BespokeAtelier piece={piece} value={config} onChange={setConfig} />
      </div>

      <div className="mt-10 flex flex-col gap-4 border-t border-furn-ink pt-8 sm:flex-row sm:items-center">
        <Link href={quoteHref} data-no-transition className="rounded-full bg-furn-ink px-8 py-4 text-center text-[11px] font-medium uppercase tracking-[0.24em] text-furn-linen transition-colors hover:bg-furn-walnut">
          Submit configuration for quote
        </Link>
        <button
          type="button"
          onClick={() => setSamples(samples === 'open' ? 'closed' : 'open')}
          aria-expanded={samples !== 'closed'}
          className="rounded-full px-8 py-4 text-[11px] font-medium uppercase tracking-[0.24em] ring-1 ring-furn-ink transition-colors hover:bg-furn-ink hover:text-furn-linen"
        >
          Request custom swatch samples
        </button>
      </div>

      {samples === 'open' && (
        <form onSubmit={onSamples} className="mt-6 grid gap-6 bg-furn-ink p-6 text-furn-linen md:grid-cols-4 md:p-8">
          <p className="font-furn text-[22px] leading-snug md:col-span-4">Swatches of {describeConfiguration(config)}, posted to you.</p>
          <input name="name" required placeholder="Full name" autoComplete="name" className={field} />
          <input name="email" type="email" required placeholder="Email" autoComplete="email" className={field} />
          <input name="phone" type="tel" placeholder="Phone or WhatsApp" autoComplete="tel" className={field} />
          <input name="address" required placeholder="Delivery address" autoComplete="street-address" className={field} />
          <button type="submit" className="self-start rounded-full bg-furn-linen px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.24em] text-furn-ink transition-colors hover:bg-furn-lilac md:col-span-4">
            Send my swatches
          </button>
        </form>
      )}
      {samples === 'sent' && (
        <p role="status" className="mt-6 border-l-2 border-furn-walnut pl-5 text-[15px] font-light leading-relaxed text-[#4A4640]">
          Thank you. The atelier will prepare your swatches of {describeConfiguration(config)} and write to confirm delivery.
        </p>
      )}
    </div>
  );
}
