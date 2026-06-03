'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

type Props = {
  value: string;
  className?: string;
};

export function DivisionNumber({ value, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState('00');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      setDisplay(value);
      return;
    }

    const target = Number.parseInt(value, 10);
    if (Number.isNaN(target)) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      const start = performance.now();
      const duration = 950;

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);
        setDisplay(String(current).padStart(2, '0'));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.4 });

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
