'use client';

import { useEffect, type ReactNode } from 'react';
import { createLenis, setActiveLenis } from '@/lib/lenis';
import { prefersReducedMotion } from '@/lib/motion';

/**
 * Lenis smooth scroll, integrated with GSAP so ScrollTrigger stays in sync.
 *
 * Desktop: Lenis drives scroll, GSAP ticker syncs it — one RAF loop.
 * Mobile / touch: native scroll (Lenis skipped). ScrollTrigger is refreshed
 * and updated on every native scroll event so animations stay accurate.
 *
 * This eliminates jitter on both surfaces:
 * — Desktop: GSAP ticker + lenis.raf = single loop, no double-RAF.
 * — Mobile: native momentum scroll, ScrollTrigger.update keeps triggers live.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (prefersReducedMotion()) return;

    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap, ScrollTrigger } = await import('@/lib/gsap');

      if (isTouchDevice) {
        // ── Mobile path ────────────────────────────────────────────
        // Use native scroll. ScrollTrigger must be told to use the
        // window as its scroller explicitly (it defaults to this but
        // re-asserting after async import avoids race conditions).
        ScrollTrigger.defaults({ scroller: window });
        ScrollTrigger.config({ ignoreMobileResize: true });

        const onScroll = () => ScrollTrigger.update();
        window.addEventListener('scroll', onScroll, { passive: true });

        // Wait for layout before calculating trigger positions.
        requestAnimationFrame(() => {
          setTimeout(() => ScrollTrigger.refresh(), 300);
        });

        cleanup = () => window.removeEventListener('scroll', onScroll);
        return;
      }

      // ── Desktop path ────────────────────────────────────────────
      const lenis = createLenis();
      setActiveLenis(lenis);

      // Keep ScrollTrigger's virtual scroll position synced to Lenis.
      lenis.on('scroll', ScrollTrigger.update);

      // Drive Lenis from GSAP's ticker — one RAF loop for everything.
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Recalculate trigger positions once layout is stable.
      requestAnimationFrame(() => {
        setTimeout(() => ScrollTrigger.refresh(), 250);
      });

      cleanup = () => {
        lenis.off('scroll', ScrollTrigger.update);
        gsap.ticker.remove(tick);
        lenis.destroy();
        setActiveLenis(null);
      };
    })();

    return () => { cleanup?.(); };
  }, []);

  return <>{children}</>;
}
