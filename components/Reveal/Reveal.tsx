'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

type Props = {
  children: ReactNode;
  className?: string;
  /** Animation delay in seconds. */
  delay?: number;
  /** Distance in px the element rises from. */
  y?: number;
};

/**
 * Fade-and-rise reveal on scroll into view. SSR-safe: content renders visible
 * by default; the animation only runs client-side when motion is allowed, so
 * no-JS and reduced-motion users always see the content.
 */
export function Reveal({ children, className, delay = 0, y = 28 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let cleanup: (() => void) | undefined;
    (async () => {
      const { gsap } = await import('@/lib/gsap');
      const ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'expo.out',
            delay,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        );
      }, el);
      cleanup = () => ctx.revert();
    })();

    return () => cleanup?.();
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
