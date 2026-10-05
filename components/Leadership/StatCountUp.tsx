'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

type Props = {
  value: number;
  suffix?: string;
  label: string;
  /** 'dark' for obsidian backgrounds, 'light' for ivory backgrounds. */
  tone?: 'dark' | 'light';
};

export function StatCountUp({ value, suffix = '', label, tone = 'dark' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
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
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            n: value,
            duration: 1.8,
            ease: 'power3.out',
            onUpdate: () => setDisplay(Math.round(counter.n)),
          });
        },
      });
      cleanup = () => trigger.kill();
    })();

    return () => { cleanup?.(); };
  }, [value]);

  const isLight = tone === 'light';

  return (
    <div ref={ref} className={`border-t pt-3 ${isLight ? 'border-obsidian/15' : 'border-hairline'}`}>
      <div className={`font-serif italic font-light text-3xl md:text-4xl leading-none ${isLight ? 'text-rose-ink' : 'text-rose'}`}>
        {display.toLocaleString()}{suffix}
      </div>
      <div className={`font-display text-[0.55rem] tracking-[0.35em] uppercase mt-2 ${isLight ? 'text-obsidian/65' : 'text-ivory/50'}`}>
        {label}
      </div>
    </div>
  );
}
