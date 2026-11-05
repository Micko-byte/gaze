'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Must not depend on a media query: the server cannot read one, so seeding
  // from it renders 0 on the server and `value` on a reduced-motion client,
  // which is a hydration mismatch. The effect below settles the real value.
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    if (prefersReducedMotion()) { setDisplay(value); return; }

    let cleanup: (() => void) | undefined;
    (async () => {
      const { gsap, ScrollTrigger } = await import('@/lib/gsap');
      const counter = { n: 0 };
      const trigger = ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            n: value,
            duration: 2.0,
            ease: 'power3.out',
            onUpdate: () => setDisplay(Math.round(counter.n)),
          });
        },
      });
      cleanup = () => trigger.kill();
    })();
    return () => { cleanup?.(); };
  }, [value]);

  return <span ref={ref} className="tabular-nums text-gaze-champagne">{display.toLocaleString('en-KE')}{suffix}</span>;
}

/**
 * The group's record, told as one sentence rather than a row of tiles, as ESR Bespoke tells its figures. Set in the
 * "anchor institutions" capitals, with each figure counting up as it scrolls in.
 */
export function StatsStrip() {
  return (
    <section aria-label="The record of Gaze Holdings" className="bg-gaze-navy px-6 py-24 text-[#F3EFE6] md:px-10 md:py-36">
      <div className="mx-auto max-w-[1280px]">
        <p className="font-text text-[11px] font-semibold uppercase tracking-[0.36em] text-gaze-champagne">The record</p>
        <p
          role="img"
          aria-label="More than 9 years. More than 5,000 pieces delivered. More than 5,500 leaders trained. Kenya, Uganda, Tanzania and the DRC."
          className="mt-8 font-text text-[clamp(32px,5.8vw,92px)] font-semibold uppercase leading-[1.02] tracking-[-0.05em]"
        >
          <CountUp value={9} suffix="+" /> years. <CountUp value={5000} suffix="+" /> pieces delivered. <CountUp value={5500} suffix="+" /> leaders trained.{' '}
          <span className="text-[rgba(243,239,230,0.55)]">Kenya, Uganda, Tanzania and the DRC.</span>
        </p>
      </div>
    </section>
  );
}
