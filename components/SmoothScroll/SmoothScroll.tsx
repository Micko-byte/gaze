'use client';

import { useEffect, type ReactNode } from 'react';
import { createLenis } from '@/lib/lenis';

/**
 * Lenis smooth scroll, integrated with GSAP so ScrollTrigger stays in sync.
 *
 * The critical part: Lenis is driven by GSAP's single ticker (not its own RAF
 * loop), and ScrollTrigger.update fires on every Lenis scroll event. Without
 * this, pinned / scrubbed sections jitter because ScrollTrigger reads native
 * scroll while Lenis animates it independently.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap, ScrollTrigger } = await import('@/lib/gsap');
      const lenis = createLenis();

      // Keep ScrollTrigger's notion of scroll position synced to Lenis.
      lenis.on('scroll', ScrollTrigger.update);

      // Drive Lenis from GSAP's ticker — one RAF loop for everything.
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Recalculate trigger positions once everything has mounted.
      ScrollTrigger.refresh();

      cleanup = () => {
        lenis.off('scroll', ScrollTrigger.update);
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    })();

    return () => { cleanup?.(); };
  }, []);

  return <>{children}</>;
}
