'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ethosContent } from '@/content/ethos';
import { houses } from '@/content/houses';
import { prefersReducedMotion } from '@/lib/motion';
import { MARK_PATHS } from '@/components/Intro/gazeLogo';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { DotWord } from './DotWord';
import { ScrollPattern } from '@/components/Patterns/ScrollPattern';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Style = (typeof ethosContent.statement)[number][number]['style'];

/* Pensatori Irrazionali's mix of voices, in the Holdings kit: Metropolis capitals, Thegralke serif, a script. */
const VOICE: Record<Style, string> = {
  big: 'font-text font-semibold uppercase tracking-[-0.055em] text-[clamp(52px,10.4vw,196px)] leading-[0.86]',
  italic: 'font-headline italic uppercase tracking-[-0.03em] text-[clamp(36px,6vw,108px)] leading-none',
  script: 'font-press-script lowercase text-[clamp(44px,6.6vw,120px)] leading-none',
  serif: 'font-headline lowercase text-[clamp(40px,5.6vw,100px)] leading-none',
  bold: 'font-text font-semibold lowercase tracking-[-0.05em] text-[clamp(22px,3.2vw,54px)] leading-none',
  mark: '',
};
/* Each line starts at its own indent, as the reference staggers them. */
const INDENT = ['md:pl-[9%]', 'md:pl-[2%]', 'md:pl-[16%]'];

/** A big word, split into letters that rise out of a mask. */
function Letters({ text }: { text: string }) {
  return (
    <span className="inline-flex overflow-hidden pb-[0.04em]" aria-hidden="true">
      {Array.from(text).map((ch, i) => (
        <span key={i} data-rise className="inline-block whitespace-pre">
          {ch}
        </span>
      ))}
    </span>
  );
}

function RevealedSentence({ text }: { text: string }) {
  return (
    <ScrollReveal
      containerClassName="max-w-xl"
      textClassName="text-[17px] md:text-lg leading-relaxed font-light text-[rgba(6,18,42,0.86)]"
      baseOpacity={0.15}
      baseRotation={0}
      blurStrength={6}
      rotationEnd="bottom bottom-=5%"
      wordAnimationEnd="bottom bottom-=5%"
    >
      {text}
    </ScrollReveal>
  );
}

/**
 * The Holdings philosophy. First her line, set after Pensatori Irrazionali in mixed voices: the capitals rise letter
 * by letter, the small words come into focus and the script writes itself in. Then, after hobro.digital, the four
 * houses: an outlined word beside a typed one, a scatter of gold points gathering into GAZE, and a numbered index.
 */
export function Ethos() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const statement = root.current!.querySelector('[data-statement]');
      const tl = gsap.timeline({ scrollTrigger: { trigger: statement, start: 'top 78%', once: true } });
      tl.from('[data-rise]', { yPercent: 115, duration: 0.9, ease: 'power4.out', stagger: 0.022 })
        .from('[data-focus]', { opacity: 0, filter: 'blur(14px)', duration: 0.9, ease: 'power2.out', stagger: 0.12 }, 0.35)
        .from('[data-write]', { clipPath: 'inset(0 100% 0 0)', duration: 1.1, ease: 'power2.inOut' }, 0.55)
        .from('[data-mark]', { scale: 0.4, rotate: -25, opacity: 0, duration: 1, ease: 'back.out(1.6)' }, 0.5);

      // the typed word, a letter at a time behind a cursor
      gsap.from('[data-type]', {
        opacity: 0,
        duration: 0.01,
        stagger: 0.09,
        scrollTrigger: { trigger: '[data-houses]', start: 'top 80%', once: true },
      });
      gsap.from('[data-houses] li', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '[data-houses] ol', start: 'top 85%', once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="ethos" data-nav-theme="light" className="relative isolate overflow-hidden bg-[#F3EFE6] py-28 text-[#06122A] md:py-40">
      <ScrollPattern variant="ethos" />
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <p className="text-[14px] tracking-[-0.01em]">[ {ethosContent.eyebrow} ]</p>

        {/* ── her line, in mixed voices ── */}
        <h2 data-statement aria-label={ethosContent.manifesto[1]} className="mt-14 flex flex-col gap-[0.6vw]">
          {ethosContent.statement.map((line, l) => (
            <span key={l} className={`flex flex-wrap items-baseline gap-x-[0.28em] ${INDENT[l]}`}>
              {line.map((part, i) =>
                part.style === 'big' ? (
                  <span key={i} className={VOICE.big}>
                    <Letters text={part.text} />
                  </span>
                ) : part.style === 'mark' ? (
                  <span key={i} data-mark aria-hidden="true" className="inline-block self-center">
                    <svg viewBox="40 40 590 720" className="h-[clamp(48px,8vw,148px)] w-auto" fill="#AE8448">
                      {MARK_PATHS.map((d) => (
                        <path key={d} d={d} />
                      ))}
                    </svg>
                  </span>
                ) : (
                  <span
                    key={i}
                    aria-hidden="true"
                    {...(part.style === 'script' ? { 'data-write': '' } : { 'data-focus': '' })}
                    className={`${VOICE[part.style]} ${part.style === 'script' ? 'text-[#AE8448]' : ''}`}
                  >
                    {part.text}
                  </span>
                ),
              )}
            </span>
          ))}
        </h2>

        {/* ── the profile, word by word into focus ── */}
        <div className="mt-24 grid gap-12 md:mt-32 md:grid-cols-[1fr_1.4fr]">
          <p className="font-text text-[15px] italic">(The ecosystem)</p>
          <ol className="grid gap-10">
            {ethosContent.manifesto.map((sentence, i) => (
              <li key={i} className="grid grid-cols-[3.5rem_1fr] gap-x-4">
                <span className="pt-1 font-text text-[15px] italic">({String(i + 1).padStart(2, '0')})</span>
                <RevealedSentence text={sentence} />
              </li>
            ))}
          </ol>
        </div>

        {/* ── the four houses, after hobro.digital ── */}
        <div data-houses className="mt-32 md:mt-44">
          <h3 className="relative flex flex-wrap items-end gap-x-[0.2em]" aria-label="Four houses">
            <span
              aria-hidden="true"
              className="font-headline text-[clamp(84px,14vw,264px)] italic leading-[0.85] text-transparent [-webkit-text-stroke:1.5px_#06122A]"
            >
              Four
            </span>
            <span aria-hidden="true" className="translate-y-[0.32em] font-text text-[clamp(56px,9.6vw,180px)] font-semibold uppercase leading-[0.85] tracking-[-0.055em]">
              {Array.from('houses').map((ch, i) => (
                <span key={i} data-type className="inline-block">
                  {ch}
                </span>
              ))}
              <span className="ml-[0.04em] inline-block h-[0.12em] w-[0.5em] animate-pulse bg-[#AE8448] align-baseline" />
            </span>
          </h3>

          <div className="mt-16">
            <DotWord word="GAZE" color="#AE8448" />
          </div>

          <ol className="mt-12 border-t border-[rgba(6,18,42,0.2)]">
            {houses.map((h, i) => (
              <li key={h.id}>
                <Link
                  href={h.href}
                  className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 border-b border-[rgba(6,18,42,0.2)] px-2 py-6 transition-colors duration-500 hover:bg-[#06122A] hover:text-[#F3EFE6] md:grid-cols-[4rem_1fr_1.2fr_auto] md:px-4"
                >
                  <span className="font-text text-[13px] italic">({String(i + 1).padStart(2, '0')})</span>
                  <span className="font-text text-[clamp(26px,3vw,48px)] font-semibold leading-none tracking-[-0.045em]">{h.name}</span>
                  <span className="col-start-2 mt-2 max-w-md font-text text-[15px] font-light leading-snug md:col-start-auto md:mt-0">{h.line}</span>
                  <span aria-hidden="true" className="row-start-1 text-2xl transition-transform duration-500 group-hover:translate-x-2 md:col-start-4">→</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        {/* ── the closing line ── */}
        <p className="mx-auto mt-32 max-w-4xl text-center font-headline text-[clamp(32px,4vw,64px)] leading-[1.08]">
          {ethosContent.pullquote.pre}
          <span className="font-press-script text-[1.25em] text-[#AE8448]">{ethosContent.pullquote.accent}</span>
          {ethosContent.pullquote.post}
        </p>
      </div>
    </section>
  );
}
