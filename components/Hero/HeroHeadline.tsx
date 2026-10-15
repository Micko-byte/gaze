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
      gsap.set(ref.current.querySelectorAll('.h-char, .h-acc'), { opacity: 1, y: 0 });
      return;
    }

    // letters flip up from below in 3D; the gold accent word arrives whole so its shimmer stays unbroken
    const split = new SplitType(ref.current.querySelectorAll('[data-split]') as unknown as HTMLElement[], {
      types: 'chars',
      charClass: 'h-char',
    });

    const el = ref.current;
    // a context, so a re-run (React's dev double effect) reverts the first tween instead of freezing the accent mid-flip
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.h-char, .h-acc'), {
        rotateX: -100,
        yPercent: 45,
        opacity: 0,
        transformOrigin: '50% 100%',
        duration: 1.3,
        stagger: 0.035,
        ease: 'expo.out',
        delay: 0.2,
      });
    }, el);

    return () => {
      ctx.revert();
      split.revert();
    };
  }, []);

  return (
    <h1
      ref={ref}
      className="type-strong font-display text-[clamp(84px,15vw,260px)] leading-[0.84] tracking-[-0.01em] text-ivory"
      style={{ perspective: '1000px' }}
    >
      {lines.map((line, i) => (
        <span key={i} className="h-line block overflow-hidden">
          {line.parts.map((p, j) =>
            p.accent ? (
              <em key={j} className="h-acc gold-sheen ml-[0.22em] inline-block font-serif">{p.text}</em>
            ) : (
              <span key={j} data-split>{p.text}</span>
            )
          )}
        </span>
      ))}
    </h1>
  );
}
