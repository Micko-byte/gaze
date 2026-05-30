'use client';

import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import gsap from 'gsap';
import { prefersReducedMotion } from '@/lib/motion';

type Line = { parts: ReadonlyArray<{ text: string; accent?: boolean }> };

export function HeroHeadline({ lines }: { lines: ReadonlyArray<Line> }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (prefersReducedMotion()) {
      gsap.set(ref.current.querySelectorAll('.h-word'), { opacity: 1, y: 0 });
      return;
    }

    const split = new SplitType(ref.current.querySelectorAll('.h-line') as unknown as HTMLElement[], {
      types: 'words',
      wordClass: 'h-word',
    });

    gsap.from('.h-word', {
      yPercent: 110,
      opacity: 0,
      duration: 1.2,
      stagger: 0.04,
      ease: 'expo.out',
      delay: 0.2,
    });

    return () => { split.revert(); };
  }, []);

  return (
    <h1
      ref={ref}
      className="font-display font-extralight text-5xl md:text-7xl leading-[0.95] tracking-tight text-ivory"
    >
      {lines.map((line, i) => (
        <span key={i} className="h-line block overflow-hidden">
          {line.parts.map((p, j) =>
            p.accent ? (
              <em key={j} className="font-serif italic font-light text-rose ml-[0.25em]">{p.text}</em>
            ) : (
              <span key={j}>{p.text}</span>
            )
          )}
        </span>
      ))}
    </h1>
  );
}
