'use client';

import { useEffect, useRef } from 'react';
import { heroContent } from '@/content/hero';
import { HeroVideo } from './HeroVideo';
import { HeroHeadline } from './HeroHeadline';
import { ScrollCue } from '@/components/ui/ScrollCue';
import { prefersReducedMotion } from '@/lib/motion';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const videoWrap = videoWrapRef.current;
    if (!section || !videoWrap || prefersReducedMotion()) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const apply = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      videoWrap.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(1.06)`;
      raf = requestAnimationFrame(apply);
    };

    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 14;
      targetY = y * 10;
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    section.addEventListener('pointermove', onMove);
    section.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(apply);

    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="group relative h-[100svh] min-h-[600px] w-full overflow-hidden flex items-center justify-center text-center"
    >
      <div ref={videoWrapRef} className="absolute inset-0 will-change-transform">
        <HeroVideo />
      </div>

      <div className="absolute inset-0 bg-obsidian/35 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/45 via-obsidian/32 to-obsidian pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.16] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")",
          backgroundSize: '180px 180px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 72% 56% at 50% 44%, rgba(10,10,10,0.58), transparent 76%)' }}
      />

      <div
        className="relative z-10 px-6 max-w-3xl"
        style={{ textShadow: '0 2px 28px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.5)' }}
      >
        <div className="font-display text-[0.7rem] tracking-[0.5em] uppercase text-rose mb-8 font-medium">
          {heroContent.eyebrow}
        </div>
        <HeroHeadline lines={heroContent.headline.lines} />
        <p className="mt-6 text-ivory/80 max-w-xl mx-auto font-light text-base md:text-lg">
          {heroContent.sub}
        </p>
      </div>
      <ScrollCue label={heroContent.scrollCue} />
    </section>
  );
}
