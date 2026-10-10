'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

const stats = [
  { value: 12, suffix: '+', label: 'Years Experience' },
  { value: 5000, suffix: '+', label: 'Furnitures Delivered' },
  { value: 3, suffix: '', label: 'Countries Served' },
  { value: 500, suffix: '+', label: 'Leaders Trained' },
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
 * Full-width stats strip — sits between Leadership and Press.
 * 2×2 on mobile, 4-column on desktop, counting effect on scroll.
 */
export function StatsStrip() {
  return (
    <div className="relative w-full bg-ink border-y border-hairline overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/4 top-0 h-48 w-72 rounded-full bg-rose/6 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-48 w-72 rounded-full bg-champagne/5 blur-3xl" />
      </div>

      {/* Decorative top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne/20 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={[
                'flex flex-col items-center justify-center text-center px-4 py-8 md:py-6',
                'relative',
                /* vertical divider on desktop */
                i < 3 ? 'md:after:absolute md:after:right-0 md:after:top-1/4 md:after:h-1/2 md:after:w-px md:after:bg-hairline' : '',
                /* horizontal divider on mobile for bottom row */
                i >= 2 ? 'border-t border-hairline md:border-t-0' : '',
                /* vertical divider on mobile between cols */
                i % 2 === 0 ? 'border-r border-hairline md:border-r-0' : '',
              ].join(' ')}
            >
              <div className="font-serif italic font-light text-[2.6rem] md:text-[3.2rem] leading-none text-rose tabular-nums">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-display text-[0.48rem] md:text-[0.52rem] tracking-[0.4em] uppercase text-ivory/65 mt-3 leading-relaxed">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
