'use client';

import { useEffect, useRef, useState } from 'react';
import { turnOrder } from '@/content/executiveSeating';
import { prefersReducedMotion } from '@/lib/motion';
import { ChairTurn } from './ChairTurn';

/** The wing's opening chair, coming round slowly by itself while it is on screen. */
export function HeroChair({ slug, title }: { slug: string; title: string }) {
  const [angle, setAngle] = useState(0);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !box.current) return;
    let timer: number | undefined;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer);
      timer = e.isIntersecting ? window.setInterval(() => setAngle((a) => (a + 1) % turnOrder.length), 2200) : undefined;
    });
    io.observe(box.current);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div ref={box} className="absolute inset-0">
      <ChairTurn slug={slug} title={title} angle={angle} eager />
    </div>
  );
}
