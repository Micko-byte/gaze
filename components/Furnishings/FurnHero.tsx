/* eslint-disable @next/next/no-img-element */
import { furnHero } from '@/content/furnishings';
import styles from './FurnHero.module.css';

/** Full-bleed hero after Natuzzi Italia: slow crossfading interiors and a single, light, very large line. */
export function FurnHero() {
  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-furn-ink text-furn-linen">
      <div className="absolute inset-0" aria-hidden="true">
        {furnHero.images.map((src, i) => (
          <div key={src} className={styles.slide} style={{ '--d': `${i * 7 - 0.01}s` } as React.CSSProperties}>
            <img src={src} alt="" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,30,34,0.35)_0%,rgba(30,30,34,0)_28%,rgba(30,30,34,0.1)_55%,rgba(30,30,34,0.72)_100%)]" />

      <div data-loader-target className="absolute inset-x-0 bottom-0 mx-auto max-w-[1440px] px-5 pb-[10vh] md:px-10">
        <p className="font-text text-[11px] font-medium uppercase tracking-[0.42em] text-furn-lilac">{furnHero.eyebrow}</p>
        <h1 className="mt-5 font-furn text-[clamp(52px,8.4vw,150px)] font-normal leading-[0.98] tracking-[-0.01em]">
          {furnHero.headline.map((line) => (
            <span key={line} className="block">{line}</span>
          ))}
        </h1>
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md font-text text-base font-light leading-relaxed text-[rgba(238,231,223,0.85)] md:text-lg">{furnHero.sub}</p>
          <div className="flex flex-wrap gap-3 font-text text-[12px] font-semibold uppercase tracking-[0.22em]">
            <a href="#collection" className="bg-furn-linen px-7 py-4 text-furn-ink transition-colors hover:bg-furn-lilac">Explore the collection</a>
            <a href="#consultation" className="border border-[rgba(238,231,223,0.7)] px-7 py-4 transition-colors hover:border-furn-lilac hover:text-furn-lilac">Book a consultation</a>
          </div>
        </div>
      </div>
    </section>
  );
}
