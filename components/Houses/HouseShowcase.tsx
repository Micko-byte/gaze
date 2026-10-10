'use client';

import { Fragment, useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { houses } from '@/content/houses';
import { ScrollPattern } from '@/components/Patterns/ScrollPattern';
import { HouseLogo } from '@/components/Logo/HouseLogo';
import { LOGOS } from '@/components/Logo/logos';
import { prefersReducedMotion } from '@/lib/motion';

/** The sentence; a house logo sits after each index in LOGO_AFTER. */
const WORDS = ['A', 'house', 'of', 'four', 'brands,', 'one', 'standard.'];
const LOGO_AFTER = [1, 3, 4, 5];

const aspect = (id: (typeof houses)[number]['logo']) => {
  const [, , w, h] = LOGOS[id].viewBox.split(/\s+/).map(Number);
  return w / h;
};

type Box = { x: number; y: number; w: number; h: number };

/** Position inside `root` from layout offsets, so transforms never skew the measurement. */
function boxIn(el: HTMLElement, root: HTMLElement): Box {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

/** The logo's resting box inside its card: contained, centred, with breathing room. */
function fitIn(well: Box, ratio: number): Box {
  const w = Math.min(well.w * 0.74, well.h * 0.62 * ratio);
  const h = w / ratio;
  return { x: well.x + (well.w - w) / 2, y: well.y + (well.h - h) / 2, w, h };
}

/**
 * The four houses, after Butter. Two screens: the sentence, with the house logos set in its words, and below it
 * the navy dock. Nothing is pinned and the dock never moves on its own: the page scrolls, the sentence leaves
 * upwards, and the logos drop out of the words and travel down the page into the dock's cards as it arrives.
 * Scrolling back up sends them back into the sentence.
 */
export function HouseShowcase() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const q = gsap.utils.selector(section);
      const slots = q('[data-slot]') as HTMLElement[];
      const wells = q('[data-well]') as HTMLElement[];
      const flyers = q('[data-flyer]') as HTMLElement[];
      const grounds = q('[data-ground]');
      const metas = q('[data-meta]');
      const dock = q('[data-dock]')[0] as HTMLElement;
      const ratios = houses.map((h) => aspect(h.logo));
      const from = (i: number) => boxIn(slots[i], section);
      const to = (i: number) => fitIn(boxIn(wells[i], section), ratios[i]);

      const reduce = prefersReducedMotion();
      // from the sentence sitting centred on screen to the dock sitting centred on screen; scrubbed, so it runs
      // backwards just as smoothly when scrolling up
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: reduce
          ? undefined
          : {
              trigger: section,
              start: 'top top',
              endTrigger: dock,
              end: 'center center',
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
      });

      flyers.forEach((el, i) => {
        const start = i * 0.06;
        const sign = i % 2 ? -1 : 1;
        tl.fromTo(
          el,
          { x: () => from(i).x, y: () => from(i).y, width: () => from(i).w, height: () => from(i).h, rotationX: 0, rotationY: 0, rotationZ: 0, scale: 1 },
          {
            keyframes: [
              // lift out of the word
              { y: () => from(i).y - window.innerHeight * 0.04, scale: 1.1, rotationZ: -6 * sign, duration: 0.1, ease: 'sine.out' },
              // fall down the page, turning through the air
              {
                x: () => (from(i).x + to(i).x) / 2 + sign * window.innerWidth * 0.04,
                y: () => (from(i).y + to(i).y) / 2,
                width: () => (from(i).w + to(i).w) / 2,
                height: () => (from(i).h + to(i).h) / 2,
                rotationX: 32 * sign,
                rotationY: -24 * sign,
                rotationZ: 12 * sign,
                scale: 1,
                duration: 0.38,
                ease: 'sine.inOut',
              },
              // settle into the card
              { x: () => to(i).x, y: () => to(i).y, width: () => to(i).w, height: () => to(i).h, rotationX: 0, rotationY: 0, rotationZ: 0, duration: 0.34, ease: 'power3.out' },
            ],
          },
          start,
        );
        tl.fromTo(grounds[i], { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.16, ease: 'power2.out' }, start + 0.66);
      });
      tl.fromTo(metas, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.14, stagger: 0.04, ease: 'power2.out' }, 0.82);

      if (reduce) tl.progress(1);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="houses"
      data-nav-theme="light"
      aria-label="The four houses of Gaze Holdings"
      className="relative isolate w-full overflow-x-clip bg-gaze-parchment text-gaze-deep"
      style={{ perspective: '1600px' }}
    >
      <ScrollPattern variant="showcase" />
      {/* screen one: the sentence, alone */}
      <div className="flex min-h-[100svh] flex-col items-center justify-center px-4 text-center">
        <p className="font-text text-[11px] font-medium uppercase tracking-[0.42em] text-gaze-antique">Gaze Holdings Ltd. · Nairobi</p>
        <h2 className="mx-auto mt-6 max-w-[20ch] font-headline text-[clamp(40px,6vw,104px)] leading-[1.14] [text-wrap:balance]">
          {WORDS.map((word, i) => {
            const at = LOGO_AFTER.indexOf(i);
            const house = houses[at];
            return (
              <Fragment key={word}>
                {word}{' '}
                {at >= 0 && (
                  <>
                    <span
                      data-slot
                      aria-hidden="true"
                      className="inline-block h-[0.74em] align-[-0.06em]"
                      style={{ aspectRatio: `${aspect(house.logo)}` }}
                    />{' '}
                  </>
                )}
              </Fragment>
            );
          })}
        </h2>
      </div>

      {/* the space between the two screens, which the logos travel through */}
      <div aria-hidden="true" className="h-[30svh]" />

      {/* screen two: the dock */}
      <div className="flex min-h-[100svh] items-center px-4 pb-[8svh] md:px-10">
        <div
          data-dock
          className="relative mx-auto w-full max-w-[1240px] rounded-[6px] bg-gaze-navy shadow-[0_50px_100px_-40px_rgba(6,18,42,0.7)]"
        >
          <div className="flex justify-between border-b border-[#1E2B48] px-6 py-4 font-text text-[11px] uppercase tracking-[0.3em] text-[#8F9AB4]">
            <span className="text-gaze-champagne">The four houses</span>
            <span className="hidden sm:inline">One standard</span>
          </div>
          <div className="grid grid-cols-2 gap-3 p-4 md:grid-cols-4 md:gap-5 md:p-6">
            {houses.map((house, i) => (
              <article key={house.id} className="flex min-w-0 flex-col">
                <div data-well className="relative aspect-[1/0.78] w-full">
                  <div data-ground className="absolute inset-0 rounded-[4px] opacity-0" style={{ background: house.ground }} />
                </div>
                <Link href={house.href} data-meta className="group block pt-4 text-[#E8E1D0] opacity-0">
                  <span className="font-text text-[11px] tracking-[0.3em]" style={{ color: house.accent }}>0{i + 1}</span>
                  <h3 className="mt-1 font-headline text-[clamp(20px,2vw,32px)] leading-tight">{house.name}</h3>
                  <p className="mt-1 hidden font-text text-[13px] leading-relaxed text-[#9AA3BA] md:block">{house.line}</p>
                  <span className="mt-2 inline-block font-text text-[11px] uppercase tracking-[0.26em] text-gaze-champagne transition-transform duration-500 ease-reveal group-hover:translate-x-1">
                    Enter the house →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>

      {houses.map((house) => (
        <Link
          key={house.id}
          data-flyer
          href={house.href}
          aria-label={`Enter ${house.name}`}
          className="absolute left-0 top-0 z-20 block h-12 w-12 [transform-style:preserve-3d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gaze-champagne"
        >
          <HouseLogo id={house.logo} className="h-full w-full" />
        </Link>
      ))}
    </section>
  );
}
