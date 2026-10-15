'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

/* Each figure sits on a colour from the brand kit, so the group's houses show on the Holdings page. */
const stats = [
  { value: 12, suffix: '+', label: 'Years Experience', bg: '#06122A', ink: '#DEBA78' },
  { value: 5000, suffix: '+', label: 'Furnitures Delivered', bg: '#7B5232', ink: '#EEE7DF' },
  { value: 3, suffix: '', label: 'Countries Served', bg: '#C8186F', ink: '#FFFFFF' },
  { value: 500, suffix: '+', label: 'Leaders Trained', bg: '#4C88F0', ink: '#06122A' },
];

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

  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

/**
 * Full-width stats strip, between Leadership and Recognition: four blocks in the colours of the brand kit (Holdings navy,
 * Furnishings earth, Her Gaze magenta, Institute cobalt), each figure counting up as it scrolls in.
 */
export function StatsStrip() {
  return (
    <div className="grid w-full grid-cols-2 md:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex min-h-[220px] flex-col justify-between px-6 py-8 md:min-h-[280px] md:px-8 md:py-10"
          style={{ background: stat.bg, color: stat.ink }}
        >
          <div className="font-display text-[11px] uppercase leading-relaxed tracking-[0.32em]">{stat.label}</div>
          <div className="font-headline text-[clamp(56px,7vw,112px)] leading-none tabular-nums">
            <CountUp value={stat.value} suffix={stat.suffix} />
          </div>
        </div>
      ))}
    </div>
  );
}
