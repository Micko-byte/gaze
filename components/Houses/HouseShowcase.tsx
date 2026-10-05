'use client';

import { Fragment, useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { houses } from '@/content/houses';
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

/** Position inside `root` from layout offsets, so transforms mid-animation never skew the measurement. */
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
 * Homepage showcase of the four houses (after Butter's hero). The logos sit in the sentence as part of the line;
 * scrolling pins the section and only the logos move: they lift out of the text, tumble on an arc and settle
 * into four equal cards, each card's colour arriving as its logo lands.
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
      const ratios = houses.map((h) => aspect(h.logo));
      const from = (i: number) => boxIn(slots[i], section);
      const to = (i: number) => fitIn(boxIn(wells[i], section), ratios[i]);

      const reduce = prefersReducedMotion();
      // scrubbed and reversible: scrolling back up plays every move backwards, smoothed so it flows both ways
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: reduce
          ? undefined
          : { trigger: section, start: 'top top', end: '+=300%', pin: true, scrub: 1.4, invalidateOnRefresh: true },
      });

      flyers.forEach((el, i) => {
        const start = i * 0.045; // they leave the line as soon as the scroll begins
        const sign = i % 2 ? -1 : 1;
        tl.fromTo(
          el,
          { x: () => from(i).x, y: () => from(i).y, width: () => from(i).w, height: () => from(i).h, rotationX: 0, rotationY: 0, rotationZ: 0, scale: 1 },
          {
            keyframes: [
              // lift out of the line
              { y: () => from(i).y - window.innerHeight * 0.06, scale: 1.12, rotationZ: -5 * sign, duration: 0.06, ease: 'sine.out' },
              // drift on an arc, turning through the air
              {
                x: () => (from(i).x + to(i).x) / 2 + sign * window.innerWidth * 0.025,
                y: () => (from(i).y + to(i).y) / 2 - window.innerHeight * 0.03,
                width: () => (from(i).w + to(i).w) / 2,
                height: () => (from(i).h + to(i).h) / 2,
                rotationX: 30 * sign,
                rotationY: -22 * sign,
                rotationZ: 8 * sign,
                scale: 1,
                duration: 0.13,
                ease: 'sine.inOut',
              },
              // settle into the card
              { x: () => to(i).x, y: () => to(i).y, width: () => to(i).w, height: () => to(i).h, rotationX: 0, rotationY: 0, rotationZ: 0, duration: 0.16, ease: 'power3.out' },
            ],
          },
          start,
        );
        tl.fromTo(grounds[i], { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.12, ease: 'power2.out' }, start + 0.24);
      });

      tl.fromTo(metas, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.14, stagger: 0.04, ease: 'power2.out' }, 0.48);
      tl.to({}, { duration: 0.22 });

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
      className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-gaze-parchment text-gaze-deep"
      style={{ perspective: '1600px' }}
    >
      <div data-headline className="absolute inset-x-0 top-[13vh] origin-top px-4 text-center">
        <p className="font-text text-[11px] font-medium uppercase tracking-[0.42em] text-gaze-antique">Gaze Holdings Ltd. · Nairobi</p>
        <h2 className="mx-auto mt-5 max-w-[22ch] font-headline text-[clamp(36px,5.2vw,92px)] leading-[1.14] [text-wrap:balance]">
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

      <div
        data-dock
        className="absolute inset-x-4 bottom-[4vh] mx-auto h-[50svh] max-w-[1180px] origin-bottom rounded-[6px] bg-gaze-navy shadow-[0_50px_100px_-40px_rgba(6,18,42,0.7)] md:h-[40svh]"
      >
        <div className="flex justify-between border-b border-[#1E2B48] px-6 py-4 font-text text-[11px] uppercase tracking-[0.3em] text-[#8F9AB4]">
          <span className="text-gaze-champagne">The four houses</span>
          <span className="hidden sm:inline">One standard</span>
        </div>
        <div className="absolute inset-x-4 bottom-5 top-16 grid grid-cols-2 gap-3 md:inset-x-6 md:grid-cols-4 md:gap-5">
          {houses.map((house, i) => (
            <article key={house.id} className="flex min-w-0 flex-col">
              <div data-well className="relative aspect-[1/0.7] w-full md:aspect-[1/0.55]">
                <div data-ground className="absolute inset-0 rounded-[4px] opacity-0" style={{ background: house.ground }} />
              </div>
              <Link href={house.href} data-meta className="group block pt-3 text-[#E8E1D0] opacity-0">
                <span className="font-text text-[11px] tracking-[0.3em]" style={{ color: house.accent }}>0{i + 1}</span>
                <h3 className="mt-1 font-headline text-[clamp(20px,2vw,30px)] leading-tight">{house.name}</h3>
                <p className="mt-1 hidden font-text text-[13px] leading-relaxed text-[#9AA3BA] xl:block">{house.line}</p>
                <span className="mt-2 inline-block font-text text-[11px] uppercase tracking-[0.26em] text-gaze-champagne transition-transform duration-500 ease-reveal group-hover:translate-x-1">
                  Enter the house →
                </span>
              </Link>
            </article>
          ))}
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
