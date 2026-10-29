'use client';

import { useEffect, useRef } from 'react';
import { heroContent } from '@/content/hero';
import { HeroVideo } from './HeroVideo';
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
      {/* Light scrims, as on Natuzzi's landing: the films stay bright; a soft shade sits only under the nav, behind
          the headline and at the foot for the caption */}
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[rgba(6,18,42,0.7)] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[rgba(6,18,42,0.65)] to-transparent pointer-events-none" />
      {/* the shade behind the words follows the films: HeroVideo measures how bright the frames behind the text are
          and sets --hero-shade, so bright skies and pools get a deeper shade than the city at night */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-[1600ms] ease-in-out"
        style={{ background: 'radial-gradient(ellipse 44% 30% at 50% 52%, rgba(6,18,42,0.78), rgba(6,18,42,0.3) 60%, transparent 100%)', opacity: 'var(--hero-shade, 0.55)' }}
      />
      {/* the words sit quietly over the films, as Natuzzi's do: a light headline of moderate size, a small line, a
          small pill */}
      <div
        data-loader-target
        className="relative z-10 px-6"
        style={{ textShadow: '0 2px 24px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.5)' }}
      >
        <p className="font-text text-[11px] font-semibold uppercase tracking-[0.42em] text-ivory">{heroContent.eyebrow}</p>
        {/* set like "anchor institutions" in the Ethos statement: Metropolis semibold capitals, drawn tight */}
        <h1 className="mt-5 font-text text-[clamp(34px,4.6vw,72px)] font-semibold uppercase leading-[0.9] tracking-[-0.055em] text-ivory">
          {heroContent.headline}
        </h1>
        <p className="mx-auto mt-5 max-w-md font-text text-[13px] font-normal uppercase tracking-[0.24em] text-ivory">
          {heroContent.sub}
        </p>
        <a
          href={heroContent.cta.href}
          className="mt-8 inline-block rounded-full bg-[rgba(6,18,42,0.88)] px-7 py-3 font-text text-[11px] font-medium uppercase tracking-[0.24em] text-ivory transition-colors [text-shadow:none] hover:bg-ivory hover:text-obsidian"
        >
          {heroContent.cta.label}
        </a>
      </div>
      <ScrollCue label={heroContent.scrollCue} />
    </section>
  );
}
