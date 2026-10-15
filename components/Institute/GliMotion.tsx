'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import SplitType from 'split-type';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

/**
 * Scroll motion for the Institute pages, keyed by data attributes in the markup. Runs again on every Institute page.
 * - `data-gli-rise`: an Anton heading's words rise out of their lines;
 * - `data-gli-wipe`: a red or navy panel wipes in from the left, as the brand book's gradient bands run;
 * - `data-gli-circle`: a circular photograph opens from its centre;
 * - `data-gli-bars`: the three red bars slide out one after another;
 * - `data-gli-contours`: the gold lines draw themselves on;
 * - `data-gli-ink`: a paragraph's words go from faint to full as it is read.
 */
export function GliMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const splits: SplitType[] = [];
    const once = (el: Element, start = 'top 86%') => ({ trigger: el, start, once: true });

    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>('[data-gli-rise]').forEach((el) => {
        const split = new SplitType(el, { types: 'lines,words', lineClass: 'gli-line', wordClass: 'gli-word' });
        splits.push(split);
        el.querySelectorAll<HTMLElement>('.gli-line').forEach((l) => (l.style.overflow = 'hidden'));
        gsap.from(split.words, { yPercent: 110, duration: 1, ease: 'power4.out', stagger: 0.04, scrollTrigger: once(el, 'top 90%') });
      });

      document.querySelectorAll<HTMLElement>('[data-gli-wipe]').forEach((el) => {
        gsap.fromTo(el, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.3, ease: 'expo.inOut', scrollTrigger: once(el) });
      });

      document.querySelectorAll<HTMLElement>('[data-gli-circle]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'circle(0% at 50% 50%)' },
          { clipPath: 'circle(50% at 50% 50%)', duration: 1.4, ease: 'expo.out', clearProps: 'clipPath', scrollTrigger: once(el) },
        );
        const img = el.querySelector('img');
        if (img) gsap.from(img, { scale: 1.35, duration: 1.8, ease: 'expo.out', scrollTrigger: once(el) });
      });

      document.querySelectorAll<HTMLElement>('[data-gli-bars]').forEach((el) => {
        gsap.from(el.children, { scaleX: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12, scrollTrigger: once(el, 'top 92%') });
      });

      document.querySelectorAll<SVGElement>('[data-gli-contours]').forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll('path'),
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut', stagger: 0.035, scrollTrigger: once(el, 'top 95%') },
        );
      });

      document.querySelectorAll<HTMLElement>('[data-gli-ink]').forEach((el) => {
        const split = new SplitType(el, { types: 'words', wordClass: 'gli-ink' });
        splits.push(split);
        gsap.fromTo(
          split.words,
          { opacity: 0.16 },
          { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 50%', scrub: true } },
        );
      });
    });
    ScrollTrigger.refresh();
    return () => {
      ctx.revert();
      splits.forEach((s) => s.revert());
    };
  }, [pathname]);

  return null;
}
