'use client';

import { useRef } from 'react';
import { collections } from '@/content/furnishings';
import { FurnitureDrawing } from './FurnitureDrawing';

/** "Explore the collection", after Natuzzi: a sliding row of rooms with round arrow buttons; swipe or drag on touch. */
export function CollectionCarousel() {
  const track = useRef<HTMLUListElement>(null);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <ul
        ref={track}
        className="flex snap-x snap-mandatory scroll-px-5 gap-6 overflow-x-auto scroll-smooth px-5 pb-6 md:scroll-px-[6vw] [scrollbar-width:none] md:px-[6vw] [&::-webkit-scrollbar]:hidden"
      >
        {collections.map((c) => (
          <li key={c.name} className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[27vw] xl:w-[22vw]">
            <a href="#consultation" data-no-transition className="group block">
              <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#F6F1EA] transition-colors duration-700 group-hover:bg-[#EADFD2]">
                <FurnitureDrawing
                  kind={c.drawing}
                  className="w-[72%] text-furn-ink transition-transform duration-[900ms] ease-reveal group-hover:scale-[1.06]"
                />
                {c.piece && (
                  <span className="absolute left-4 top-4 rounded-full bg-furn-lilac px-3 py-1 font-text text-[11px] text-furn-ink">{c.piece}</span>
                )}
              </div>
              <p className="mt-4 font-text text-[15px]">{c.name}</p>
            </a>
          </li>
        ))}
      </ul>
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-[2vw] md:flex">
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => go(dir)}
            aria-label={dir < 0 ? 'Previous rooms' : 'Next rooms'}
            className="pointer-events-auto -mt-10 grid h-12 w-12 place-items-center rounded-full bg-white text-furn-ink shadow-[0_8px_24px_-10px_rgba(30,30,34,0.35)] transition-colors hover:bg-furn-ink hover:text-furn-linen"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <path d={dir < 0 ? 'M19 12H5m6-6-6 6 6 6' : 'M5 12h14m-6-6 6 6-6 6'} />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
