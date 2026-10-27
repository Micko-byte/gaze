'use client';

import { useEffect } from 'react';
import SplitType from 'split-type';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

/**
 * Motion for The Gaze Manor, keyed by data attributes in the markup:
 * - `data-manor-arch`: the arched window opens upwards on arrival, and its film settles as the page moves;
 * - `data-manor-rise`: a heading's words rise out of their lines;
 * - `data-manor-reveal`: a photograph is uncovered from the floor up, like a curtain lifting;
 * - `data-manor-ink`: a paragraph comes into full ink as it is read;
 * - `data-manor-acts`: the four movements of an episode slide past sideways while the section holds (wide screens);
 * - `data-manor-credits`: the closing credits roll up the screen.
 */
export function ManorMotion() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const splits: SplitType[] = [];
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>('[data-manor-arch]').forEach((el) => {
        gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'expo.inOut', delay: 0.3 });
        const media = el.querySelector('video, img');
        if (media) {
          gsap.fromTo(media, { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
        }
      });

      document.querySelectorAll<HTMLElement>('[data-manor-rise]').forEach((el) => {
        const split = new SplitType(el, { types: 'lines,words', lineClass: 'manor-line', wordClass: 'manor-word' });
        splits.push(split);
        el.querySelectorAll<HTMLElement>('.manor-line').forEach((l) => (l.style.overflow = 'hidden'));
        gsap.from(split.words, { yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.045, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });

      document.querySelectorAll<HTMLElement>('[data-manor-reveal]').forEach((el) => {
        gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
        const img = el.querySelector('img, video');
        if (img) gsap.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      });

      document.querySelectorAll<HTMLElement>('[data-manor-ink]').forEach((el) => {
        const split = new SplitType(el, { types: 'words', wordClass: 'manor-ink' });
        splits.push(split);
        gsap.fromTo(split.words, { opacity: 0.15 }, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true } });
      });

      document.querySelectorAll<HTMLElement>('[data-manor-credits]').forEach((el) => {
        gsap.fromTo(el.children, { y: 120, opacity: 0 }, { y: 0, opacity: 1, ease: 'none', stagger: 0.25, scrollTrigger: { trigger: el, start: 'top 95%', end: 'bottom 55%', scrub: true } });
      });
    });

    // the movements hold the screen and pass sideways, wide screens only (on phones they simply stack)
    mm.add('(min-width: 1024px)', () => {
      const section = document.querySelector<HTMLElement>('[data-manor-acts]');
      const track = section?.querySelector<HTMLElement>('[data-manor-track]');
      if (!section || !track) return;
      const distance = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: () => `+=${distance()}`, scrub: 1, pin: true, invalidateOnRefresh: true },
      });
    });

    ScrollTrigger.refresh();
    return () => {
      ctx.revert();
      mm.revert();
      splits.forEach((s) => s.revert());
    };
  }, []);

  return null;
}
