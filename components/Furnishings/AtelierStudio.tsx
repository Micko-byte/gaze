'use client';

/* eslint-disable @next/next/no-img-element */
import { useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { defaultConfiguration, describeConfiguration, pieces, studioForm, textures, withMaterial, type Configuration } from '@/content/furnishings';
import { BespokeAtelier } from './BespokeAtelier';

/* the studio opens on the upholstered pieces she has photographed: the ones a fabric changes */
const choices = pieces.filter((p) => p.photos && studioForm(p) !== 'case');

const field = 'w-full border-b border-[rgba(238,231,223,0.35)] bg-transparent py-2 text-base text-furn-linen outline-none placeholder:text-[rgba(238,231,223,0.45)] focus:border-furn-linen';

/**
 * The Bespoke Atelier wing: her five fabrics as a wall of photographs to choose from, then a piece to dress in the one
 * chosen, then the configuration taken into a commission for a quote, or a request for physical swatches of it.
 */
export function AtelierStudio() {
  const [slug, setSlug] = useState(choices[0].slug);
  const piece = choices.find((p) => p.slug === slug)!;
  const [config, setConfig] = useState<Configuration>(defaultConfiguration(studioForm(piece)));
  const [samples, setSamples] = useState<'closed' | 'open' | 'sent'>('closed');
  const studio = useRef<HTMLDivElement>(null);

  // the wall shows each fabric in one colour, so choosing it there dresses the piece in that colour too
  const chooseFabric = (t: (typeof textures)[number]) => {
    setConfig({ ...withMaterial(config, t.id), colour: t.shown });
    studio.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const quoteHref = `/furnishings/${piece.slug}?material=${config.material}&colour=${encodeURIComponent(config.colour)}&finish=${config.finish}#commission`;

  const onSamples = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log('[Gaze Furnishings] swatch samples:', { piece: piece.name, ...config, ...Object.fromEntries(new FormData(e.currentTarget).entries()) });
    setSamples('sent');
  };

  return (
    <div>
      {/* ── the fabric wall: her photographs, each one a choice ── */}
      <div role="radiogroup" aria-label="Choose a fabric" className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 pt-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
        {textures.map((t) => {
          const on = config.material === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => chooseFabric(t)}
              className="group w-[68vw] shrink-0 snap-start self-start text-left outline-offset-4 sm:w-[40vw] md:w-auto"
            >
              <span className={`relative block aspect-[720/819] overflow-hidden transition-shadow duration-500 ${on ? 'ring-2 ring-furn-ink ring-offset-4 ring-offset-furn-linen' : ''}`}>
                <img src={t.photo} alt={`${t.name}: the cloth, and an armchair made in it`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-reveal group-hover:scale-[1.04]" />
                <span
                  className={`absolute left-3 top-3 rounded-full px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.24em] transition-colors ${on ? 'bg-furn-ink text-furn-linen' : 'bg-[rgba(238,231,223,0.88)] text-furn-ink opacity-0 group-hover:opacity-100'}`}
                >
                  {on ? 'Chosen' : 'Choose'}
                </span>
              </span>
              <span className="mt-4 block font-furn text-[26px] leading-none">{t.short}</span>
              <span className="mt-1.5 block text-[13px] font-light text-[#6F6A62]">{t.line}</span>
            </button>
          );
        })}
      </div>

      <div ref={studio} className="scroll-mt-[96px] pt-16">
        <p className="text-[12px] text-[#6F6A62]">now choose a piece to dress in it</p>
      </div>
      <div role="radiogroup" aria-label="Choose a piece" className="-mx-5 mt-4 flex snap-x gap-3 overflow-x-auto px-5 pb-4 [scrollbar-width:thin] md:mx-0 md:px-0">
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
