'use client';

import { useEffect, useRef, useState } from 'react';
import { divisions } from '@/content/divisions';
import { synergyNodes, synergyContent } from '@/content/synergy';
import { prefersReducedMotion } from '@/lib/motion';
import { ScrollFloat } from '@/components/ui/ScrollFloat';

export function Synergy() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    if (prefersReducedMotion()) {
      lineRefs.current.forEach(l => { if (l) l.style.strokeDashoffset = '0'; });
      return;
    }

    let cleanup: (() => void) | undefined;
    (async () => {
      const { gsap, ScrollTrigger } = await import('@/lib/gsap');
      const ctx = gsap.context(() => {
        lineRefs.current.forEach(line => {
          if (!line) return;
          const length = line.getTotalLength();
          line.style.strokeDasharray = `${length}`;
          line.style.strokeDashoffset = `${length}`;

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 72%',
            end: 'bottom 24%',
            scrub: 1,
            animation: gsap.to(line, { strokeDashoffset: 0, duration: 1 }),
          });
        });
      }, sectionRef);
      cleanup = () => ctx.revert();
    })();

    return () => { cleanup?.(); };
  }, []);

  const activeCaption = hovered
    ? synergyNodes.find(n => n.id === hovered)?.caption
    : synergyContent.sub;

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-32 px-6 bg-obsidian">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-obsidian via-obsidian/80 to-transparent" />
        <div className="absolute left-[10%] top-[8%] h-72 w-72 rounded-full bg-rose/5 blur-3xl" />
        <div className="absolute right-[6%] bottom-[10%] h-80 w-80 rounded-full bg-champagne/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="font-display text-[0.65rem] tracking-[0.45em] uppercase text-rose font-medium mb-6">
            {synergyContent.eyebrow}
          </div>
          <ScrollFloat
            containerClassName="mb-6"
            textClassName="font-display font-extralight text-4xl md:text-6xl leading-[0.98] tracking-tight text-ivory"
          >
            Five companies. One system.
          </ScrollFloat>
          <p className="text-ivory/60 max-w-xl font-light text-base md:text-lg leading-relaxed">
            Each division feeds the others. Capital, audience, and discipline move freely across the house.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-[0.95fr_1.05fr] items-center">
          <div className="space-y-4">
            {synergyNodes.map(node => {
              const division = divisions.find(d => d.id === node.id);
              if (!division) return null;
              return (
                <a
                  key={node.id}
                  href={division.href}
                  target={division.external ? '_blank' : undefined}
                  rel={division.external ? 'noopener noreferrer' : undefined}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="group flex items-center gap-4 border border-hairline/80 px-4 py-4 transition-colors duration-500 hover:border-rose/80 hover:bg-white/5"
                >
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-rose/50 bg-ink text-[0.55rem] tracking-[0.25em] uppercase text-ivory motion-safe:animate-[branch-float_6s_ease-in-out_infinite]">
                    {division.number}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[0.6rem] tracking-[0.3em] uppercase text-rose mb-1">
                      {division.category}
                    </span>
                    <span className="block font-display text-base text-ivory group-hover:text-champagne transition-colors">
                      {division.name}
                    </span>
                  </span>
                </a>
              );
            })}
          </div>

          <div className="relative flex items-center justify-center min-h-[620px] md:min-h-[700px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[26rem] w-[26rem] rounded-full border border-hairline/70" />
              <div className="absolute h-[18rem] w-[18rem] rounded-full border border-rose/20" />
              <div className="absolute h-[10rem] w-[10rem] rounded-full bg-rose/10 blur-2xl" />
            </div>

            <svg
              viewBox="0 0 1200 700"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              {synergyNodes.map((node, i) => (
                <line
                  key={node.id}
                  ref={el => { lineRefs.current[i] = el; }}
                  x1={600}
                  y1={350}
                  x2={(node.x / 100) * 1200}
                  y2={(node.y / 100) * 700}
                  stroke="var(--house-rose)"
                  strokeWidth="1.25"
                  strokeOpacity="0.55"
                />
              ))}
            </svg>

            <div className="relative z-10 h-[26rem] w-[26rem] rounded-full border border-rose/30 bg-obsidian/95 shadow-[0_0_0_1px_rgba(201,155,175,0.12),0_0_120px_rgba(201,155,175,0.10)]">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10">
                <div className="font-display text-[0.7rem] tracking-[0.45em] uppercase text-rose mb-4">
                  Gaze Holdings
                </div>
                <div className="font-serif italic font-light text-3xl text-ivory leading-tight">
                  One signature
                </div>
                <div className="mt-3 text-ivory/60 text-sm leading-relaxed max-w-xs">
                  Every branch is connected to the house, but each keeps its own voice.
                </div>
              </div>

              {synergyNodes.map((node, index) => {
                const division = divisions.find(d => d.id === node.id);
                if (!division) return null;
                const left = `${node.x}%`;
                const top = `${node.y}%`;
                return (
                  <a
                    key={node.id}
                    href={division.href}
                    target={division.external ? '_blank' : undefined}
                    rel={division.external ? 'noopener noreferrer' : undefined}
                    onMouseEnter={() => setHovered(node.id)}
                    onMouseLeave={() => setHovered(null)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-rose/70 bg-ink/90 px-5 py-3 text-center shadow-[0_14px_30px_-20px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:scale-105 motion-safe:animate-[branch-float_7s_ease-in-out_infinite]"
                    style={{
                      left,
                      top,
                      animationDelay: `${index * 0.55}s`,
                    }}
                  >
                    <span className="block font-display text-[0.55rem] tracking-[0.35em] uppercase text-rose mb-1">
                      {division.number}
                    </span>
                    <span className="block font-display text-[0.68rem] tracking-[0.18em] uppercase text-ivory">
                      {division.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center min-h-[3rem]">
          <p className="text-ivory/70 max-w-xl mx-auto font-light italic transition-opacity duration-300">
            {activeCaption}
          </p>
        </div>
      </div>
    </section>
  );
}
