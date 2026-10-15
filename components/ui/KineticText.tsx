'use client';

import { useRef, type ElementType } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Part = { text: string; className?: string };

/**
 * A large heading that arrives letter by letter when it scrolls into view. `rise` lifts each letter out of a mask;
 * `flip` turns each letter up in 3D from below. Words stay whole so the heading wraps as normal text, and the full
 * text is given to screen readers once.
 */
export function KineticText({
  parts,
  as: Tag = 'h2',
  className = '',
  mode = 'rise',
  start = 'top 85%',
  delay = 0,
}: {
  parts: ReadonlyArray<Part>;
  as?: ElementType;
  className?: string;
  mode?: 'rise' | 'flip';
  start?: string;
  delay?: number;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const chars = root.current!.querySelectorAll('[data-k]');
      const from =
        mode === 'flip'
          ? { rotateX: -100, yPercent: 40, opacity: 0, transformOrigin: '50% 100%' }
          : { yPercent: 115 };
      gsap.from(chars, {
        ...from,
        duration: mode === 'flip' ? 1.1 : 0.9,
        ease: mode === 'flip' ? 'expo.out' : 'power4.out',
        stagger: 0.028,
        delay,
        scrollTrigger: { trigger: root.current, start, once: true },
      });
    },
    { scope: root },
  );

  const label = parts.map((p) => p.text).join('');
  return (
    <Tag ref={root} className={className} aria-label={label} style={mode === 'flip' ? { perspective: '900px' } : undefined}>
      {parts.map((p, i) => (
        <span key={i} className={p.className} aria-hidden="true">
          {p.text.split(/(\s+)/).map((word, w) =>
            /^\s+$/.test(word) ? (
              word
            ) : (
              <span key={w} className={`inline-flex whitespace-nowrap ${mode === 'rise' ? 'overflow-hidden pb-[0.06em]' : ''}`}>
                {Array.from(word).map((ch, c) => (
                  <span key={c} data-k className="inline-block will-change-transform">
                    {ch}
                  </span>
                ))}
              </span>
            ),
          )}
        </span>
      ))}
    </Tag>
  );
}
