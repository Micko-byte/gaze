'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

/**
 * The Press title: "Gaze" and "Press" rise letter by letter while the picture between them opens from its centre,
 * like a book falling open.
 */
export function PressTitle({ image, alt }: { image: string; alt: string }) {
  const root = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-l]', { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.05, delay: 0.25 });
      gsap.from('[data-open]', { clipPath: 'inset(0 50% 0 50%)', scale: 1.15, duration: 1.3, ease: 'expo.inOut', delay: 0.15 });
    }, el);
    return () => ctx.revert();
  }, []);

  const word = (w: string) => (
    <span className="inline-flex overflow-hidden pb-[0.05em] align-bottom" aria-hidden="true">
      {Array.from(w).map((ch, i) => (
        <span key={i} data-l className="inline-block">
          {ch}
        </span>
      ))}
    </span>
  );

  return (
    <h1 ref={root} aria-label="Gaze Press" className="font-press-head text-[clamp(72px,13.5vw,232px)] font-normal leading-[0.9] tracking-[-0.02em]">
      {word('Gaze')}{' '}
      <img
        data-open
        src={image}
        alt={alt}
        className="inline-block h-[0.74em] w-[1.15em] rounded-[6px] object-cover object-[50%_40%] align-[-0.02em]"
      />{' '}
      {word('Press')}
    </h1>
  );
}

/**
 * Scroll-led text motion for the Press pages, keyed by data attributes in the markup:
 * - `data-rise`: the heading's words rise out of their lines when it comes into view;
 * - `data-mark`: a highlight sweeps in behind the word, like a marker across a proof;
 * - `data-count="500"`: the figure counts up from zero (any prefix or suffix in the text stays);
 * - `data-ink`: a paragraph's words go from faint to full ink as it is read down the page.
 */
export function PressMotion() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const splits: SplitType[] = [];
    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>('[data-rise]').forEach((el) => {
        const split = new SplitType(el, { types: 'lines,words', lineClass: 'pm-line', wordClass: 'pm-word' });
        splits.push(split);
        el.querySelectorAll<HTMLElement>('.pm-line').forEach((l) => (l.style.overflow = 'hidden'));
        gsap.from(split.words, {
          yPercent: 115,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      document.querySelectorAll<HTMLElement>('[data-mark]').forEach((el) => {
        gsap.fromTo(
          el,
          { backgroundSize: '0% 100%' },
          { backgroundSize: '100% 100%', duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: el, start: 'top 80%', once: true } },
        );
      });

      document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        const to = Number(el.dataset.count);
        // keep the original text: a second run (React's dev double effect) must not read back our placeholder
        el.dataset.countText ??= el.textContent ?? '';
        const [pre, post] = el.dataset.countText.split(String(to));
        const n = { v: 0 };
        el.textContent = `${pre ?? ''}0${post ?? ''}`;
        gsap.to(n, {
          v: to,
          duration: 1.6,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = `${pre ?? ''}${Math.round(n.v).toLocaleString()}${post ?? ''}`;
          },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });

      document.querySelectorAll<HTMLElement>('[data-ink]').forEach((el) => {
        const split = new SplitType(el, { types: 'words', wordClass: 'pm-ink' });
        splits.push(split);
        gsap.fromTo(
          split.words,
          { opacity: 0.14 },
          { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true } },
        );
      });
    });
    ScrollTrigger.refresh();
    return () => {
      ctx.revert();
      splits.forEach((s) => s.revert());
    };
  }, []);

  return null;
}
