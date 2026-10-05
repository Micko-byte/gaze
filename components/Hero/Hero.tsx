'use client';

import { useEffect, useRef } from 'react';
import { heroContent } from '@/content/hero';
import { HeroVideo } from './HeroVideo';
import { HeroHeadline } from './HeroHeadline';
import { ScrollCue } from '@/components/ui/ScrollCue';
import { hasFinePointer } from '@/lib/motion';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !hasFinePointer()) return;

    let raf = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;

    const update = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      section.style.setProperty('--hero-x', `${x}`);
      section.style.setProperty('--hero-y', `${y}`);
      raf = requestAnimationFrame(update);
    };

    const onMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = Math.max(-1, Math.min(1, nx * 2));
      targetY = Math.max(-1, Math.min(1, ny * 2));
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
      section.style.removeProperty('--hero-x');
      section.style.removeProperty('--hero-y');
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden flex items-center justify-center text-center"
    >
      <HeroVideo />
      <div className="absolute inset-0 hero-grain opacity-[0.08] pointer-events-none" />
      {/* Readability scrims - flat darken + bottom gradient + centered vignette */}
      <div className="absolute inset-0 bg-obsidian/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-obsidian/35 to-obsidian pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 72% 56% at 50% 44%, rgba(6,18,42,0.62), transparent 76%)' }}
      />
      <div
        data-loader-target
        className="relative z-10 px-6"
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
