'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

type Props = { value: number; suffix?: string; label: string };

export function StatCountUp({ value, suffix = '', label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(prefersReducedMotion() ? value : 0);

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
            duration: 1.4,
            ease: 'power2.out',
            onUpdate: () => setDisplay(Math.round(counter.n)),
          });
        },
      });
      cleanup = () => trigger.kill();
    })();

    return () => { cleanup?.(); };
  }, [value]);

  return (
    <div ref={ref} className="border-t border-hairline pt-3">
      <div className="font-serif italic font-light text-3xl md:text-4xl text-rose leading-none">
        {display}{suffix}
      </div>
      <div className="font-display text-[0.55rem] tracking-[0.35em] uppercase text-ivory/50 mt-2">
        {label}
      </div>
    </div>
  );
}
