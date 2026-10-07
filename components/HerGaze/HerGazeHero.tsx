'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

/**
 * The opening film, after Very Work In Progress: her own convenings, full width and silent, filling the screen
 * down to the bar beneath it. With reduced motion it holds on the opening still.
 */
export function HerGazeHero() {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current;
    if (!v || prefersReducedMotion()) return;
    v.play().catch(() => {
      /* autoplay refused: the still stays */
    });
  }, []);

  return (
    <section id="top" data-loader-target className="relative h-[calc(100svh-118px)] min-h-[380px] overflow-hidden bg-her-noir">
      <video
        ref={video}
        src="/video/hergaze-hero.mp4"
        poster="/images/hergaze/hero-poster.jpg"
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Her Gaze Global convenings: panels, speakers and audiences"
        className="h-full w-full object-cover"
      />
      <p aria-hidden="true" className="absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 text-[11px] uppercase tracking-[0.4em] text-white md:block">
        Scroll ↓
      </p>
    </section>
  );
}
