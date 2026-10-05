'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { furnHero } from '@/content/furnishings';
import { prefersReducedMotion } from '@/lib/motion';

const SLIDE_MS = 7000;

/**
 * Full-bleed hero after Natuzzi Italia: slow crossfading interiors under a gentle push-in, one large light line,
 * and slide indicators that fill as each slide plays (click one to jump to it).
 */
export function FurnHero() {
  const [active, setActive] = useState(0);
  const [run, setRun] = useState(0);
  const n = furnHero.slides.length;

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % n), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [active, run, n]);

  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-furn-ink text-furn-linen">
      <div className="absolute inset-0" aria-hidden="true">
        {furnHero.slides.map((s, i) => (
          <div
            key={s.src}
            className="absolute inset-0 transition-opacity duration-[1600ms] ease-in-out"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <img
              src={s.src}
              alt=""
              className="h-full w-full object-cover transition-transform ease-out"
              style={{ transform: i === active ? 'scale(1)' : 'scale(1.1)', transitionDuration: i === active ? `${SLIDE_MS + 1600}ms` : '0ms' }}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,30,34,0.55)_0%,rgba(30,30,34,0.15)_55%,rgba(30,30,34,0)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,rgba(30,30,34,0.5),transparent)]" />

      <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-center px-5 pt-[72px] md:px-[6vw]">
        <div data-loader-target className="max-w-[1100px]">
          <p className="font-text text-[12px] font-medium uppercase tracking-[0.36em] text-furn-lilac">{furnHero.eyebrow}</p>
          <h1 className="mt-5 max-w-[14ch] font-furn text-[clamp(56px,8.6vw,160px)] font-normal leading-[0.96] tracking-[-0.015em]">
            {furnHero.headline.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </h1>
          <p className="mt-7 max-w-md font-text text-base font-light leading-relaxed text-[rgba(238,231,223,0.88)] md:text-lg">{furnHero.sub}</p>
          <div className="mt-9 flex flex-wrap gap-3 whitespace-nowrap font-text text-[13px]">
            <a href="#collection" className="rounded-full bg-furn-linen px-7 py-3.5 text-furn-ink transition-colors hover:bg-furn-lilac">discover the collection</a>
            <a href="#consultation" className="rounded-full border border-[rgba(238,231,223,0.7)] px-7 py-3.5 transition-colors hover:border-furn-lilac hover:text-furn-lilac">book a consultation</a>
          </div>
        </div>
      </div>

      {/* slide indicators */}
      <div className="absolute bottom-8 right-5 hidden items-end gap-6 sm:flex md:right-[6vw]">
        {furnHero.slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => {
              setActive(i);
              setRun((r) => r + 1);
            }}
            aria-label={`Show ${s.label}`}
            aria-current={i === active}
            className="group flex w-28 flex-col gap-2 text-left font-text text-[11px] uppercase tracking-[0.22em] text-[rgba(238,231,223,0.75)]"
          >
            <span className="transition-colors group-hover:text-furn-linen">{s.label}</span>
            <span className="relative block h-px w-full bg-[rgba(238,231,223,0.3)]">
              {i === active && (
                <span
                  key={`${active}-${run}`}
                  className="absolute inset-y-0 left-0 w-0 bg-furn-linen"
                  style={{ animation: `furnfill ${SLIDE_MS}ms linear forwards` }}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
