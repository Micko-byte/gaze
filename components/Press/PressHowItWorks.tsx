'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/*
 * Ink drawings for the four steps, after the Aardvark Book Club cards: one hairline weight, a few solid fills. Every
 * stroke carries pathLength 1 so it can draw itself on as its card is dealt.
 */
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

function Manuscript() {
  return (
    <svg viewBox="0 0 240 180" aria-hidden="true" className="w-full">
      <path {...S} pathLength={1} d="M40 95 h160 v78 h-160 Z" />
      <path {...S} pathLength={1} d="M40 95 L120 58 L200 95" />
      <path {...S} pathLength={1} d="M40 173 L104 128 M200 173 L136 128" />
      <path {...S} pathLength={1} fill="var(--card)" d="M72 112 L84 38 L168 50 L156 124 Z" />
      <path {...S} pathLength={1} d="M94 58 L150 66 M92 72 L148 80 M90 86 L132 92 M88 100 L140 108" />
      <path {...S} pathLength={1} d="M126 44 c-9 -11 -20 -3 -8 4 M126 44 c9 -10 20 -1 7 5" />
      <path {...S} pathLength={1} d="M150 30 q22 -16 46 -6" />
      <path {...S} pathLength={1} fill="currentColor" d="M198 26 L234 14 L214 44 L208 32 Z" />
    </svg>
  );
}

function Editing() {
  return (
    <svg viewBox="0 0 240 180" aria-hidden="true" className="w-full">
      <path {...S} pathLength={1} d="M58 26 h112 v140 h-112 Z" />
      <path {...S} pathLength={1} d="M74 48 h80 M74 62 h70 M74 76 h80 M74 90 h50 M74 104 h78 M74 118 h62 M74 132 h74" />
      <path {...S} pathLength={1} d="M96 104 c-26 -12 -4 -26 22 -14 c18 9 4 22 -24 12" />
      <path {...S} pathLength={1} d="M128 118 h20" />
      <path {...S} pathLength={1} fill="currentColor" d="M198 46 L216 58 L172 134 L156 142 L158 124 Z" />
      <path {...S} pathLength={1} d="M156 142 L150 156 L163 147" />
      <path {...S} pathLength={1} d="M24 140 L70 168 M32 145 l-4 6 M42 151 l-4 6 M52 157 l-4 6 M62 163 l-4 6" />
      <path {...S} pathLength={1} d="M196 112 l4 9 l9 4 l-9 4 l-4 9 l-4 -9 l-9 -4 l9 -4 Z" fill="currentColor" />
    </svg>
  );
}

function Printing() {
  return (
    <svg viewBox="0 0 240 180" aria-hidden="true" className="w-full">
      <path {...S} pathLength={1} d="M48 142 h124 v22 h-124 Z M64 142 v22" />
      <path {...S} pathLength={1} fill="currentColor" d="M58 120 h112 v22 h-112 Z" />
      <path {...S} pathLength={1} d="M44 98 h118 v22 h-118 Z M150 98 v22" />
      <path {...S} pathLength={1} d="M40 76 h112 v22 h-112 Z M56 76 v22" />
      <path {...S} pathLength={1} d="M172 34 h52 v40 h-52 Z" />
      <path {...S} pathLength={1} d="M180 44 v22 M185 44 v22 M188 44 v22 M194 44 v22 M199 44 v22 M202 44 v22 M208 44 v22 M213 44 v22 M216 44 v22" strokeWidth={1.6} />
      <path {...S} pathLength={1} d="M178 38 c-24 6 -34 22 -40 38" />
      <path {...S} pathLength={1} d="M28 46 l4 9 l9 4 l-9 4 l-4 9 l-4 -9 l-9 -4 l9 -4 Z" fill="currentColor" />
    </svg>
  );
}

function Launch() {
  return (
    <svg viewBox="0 0 240 180" aria-hidden="true" className="w-full">
      <circle {...S} pathLength={1} cx="120" cy="60" r="34" />
      <path {...S} pathLength={1} d="M120 26 c-18 18 -18 50 0 68 M120 26 c18 18 18 50 0 68 M86 60 h68 M92 42 c18 6 38 6 56 0 M92 78 c18 -6 38 -6 56 0" />
      <path {...S} pathLength={1} fill="var(--card)" d="M120 158 Q88 140 46 146 V94 Q88 88 120 106 Q152 88 194 94 V146 Q152 140 120 158 Z" />
      <path {...S} pathLength={1} d="M120 106 V158 M60 108 q24 -4 46 6 M60 122 q24 -4 46 6 M134 114 q24 -10 46 -6 M134 128 q24 -10 46 -6" />
      <path {...S} pathLength={1} d="M40 40 l4 9 l9 4 l-9 4 l-4 9 l-4 -9 l-9 -4 l9 -4 Z" fill="currentColor" />
      <path {...S} pathLength={1} d="M200 30 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 Z" fill="currentColor" />
      <path {...S} pathLength={1} d="M28 92 l-12 -4 M212 92 l12 -4 M30 112 l-12 2 M210 112 l12 2" />
    </svg>
  );
}

/* Her process, from the Authoring & Publishing Commission. */
const steps = [
  { title: 'Submit your manuscript', body: 'Send us your manuscript and sign the commission agreement. Every work is reviewed for depth, truth, and excellence.', art: Manuscript, card: '#B5776F', ink: '#111111', r: -4 },
  { title: 'The architectural phase', body: 'Our editors, designers, and layout specialists edit, proofread, and style your text, inside and out.', art: Editing, card: '#ECE7DF', ink: '#111111', r: 3, ring: true },
  { title: 'Registered & printed', body: 'Your ISBN is secured in the global registry, and copies are printed for you at Ksh 500 to 1,000 each.', art: Printing, card: '#DDB9B1', ink: '#111111', r: -2 },
  { title: 'The global reveal', body: 'Your book launches across the Gaze Press Global and Gaze Holdings networks: an author, and an authority.', art: Launch, card: '#111111', ink: '#ECE7DF', r: 4 },
];

/**
 * How it works, after the Aardvark Book Club: four overlapping cards, each a step with its own ink drawing. As the
 * section scrolls in, the cards are dealt from a stack into a fan and each drawing draws itself.
 */
export function PressHowItWorks() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = gsap.utils.toArray<HTMLElement>('[data-step]', root.current);
      const wide = window.matchMedia('(min-width: 1024px)').matches;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'center 55%', scrub: 1 },
      });
      cards.forEach((card, i) => {
        // stacked under the first card, then dealt out to its place in the fan
        const fromX = wide ? (cards.length / 2 - i - 0.5) * card.offsetWidth * 0.9 : 0;
        tl.from(card, { x: fromX, y: wide ? 60 : 80, rotation: 0, opacity: wide ? 1 : 0, duration: 1, ease: 'power3.out' }, i * 0.18);
        tl.from(card.querySelectorAll('path, circle'), { strokeDashoffset: 1, duration: 1.2, stagger: 0.05, ease: 'none' }, i * 0.18 + 0.3);
      });
    },
    { scope: root },
  );

  return (
    <section id="how" ref={root} className="scroll-mt-[72px] overflow-hidden px-5 py-24 md:px-9 md:py-32">
      <div className="relative mx-auto max-w-[1440px] rounded-[40px] bg-[#E9D9D2] px-5 py-16 md:px-14 md:py-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-press-head text-[clamp(52px,7vw,120px)] font-normal leading-[0.92]">How it works</h2>
          <p className="max-w-xs font-press-script text-[clamp(28px,2.4vw,40px)] leading-[1.05]">from your manuscript to a book in the world</p>
        </div>
        <ol className="mt-14 flex flex-col items-center gap-6 lg:flex-row lg:items-stretch lg:justify-center lg:gap-0">
          {steps.map((s, i) => {
            const Art = s.art;
            return (
              <li
                key={s.title}
                data-step
                className={`relative w-full max-w-[330px] rounded-[26px] p-7 shadow-[0_30px_50px_-30px_rgba(17,17,17,0.55)] lg:-mx-3 lg:w-[25%] ${s.ring ? 'ring-2 ring-inset ring-press-ink' : ''}`}
                style={{ background: s.card, color: s.ink, rotate: `${s.r}deg`, zIndex: i + 1, ['--card' as string]: s.card }}
              >
                <p className="text-center font-press-script text-[34px] leading-none">Step {i + 1}</p>
                <div className="mx-auto mt-4 w-[88%] [&_circle]:[stroke-dasharray:1] [&_path]:[stroke-dasharray:1]">
                  <Art />
                </div>
                <h3 className="mt-5 font-text text-[26px] font-semibold leading-[1.02] tracking-[-0.03em]">{s.title}</h3>
                <p className="mt-3 text-[14px] leading-snug">{s.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
