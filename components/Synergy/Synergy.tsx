'use client';

import { useEffect, useRef, useState } from 'react';
import { synergyNodes, synergyContent } from '@/content/synergy';
import { prefersReducedMotion } from '@/lib/motion';

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
            start: 'top 70%',
            end: 'bottom 30%',
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
    <section ref={sectionRef} className="relative py-32 px-6 bg-obsidian">
      <div className="max-w-6xl mx-auto">
        <div className="font-display text-[0.65rem] tracking-[0.45em] uppercase text-rose font-medium mb-6">
          {synergyContent.eyebrow}
        </div>
        <h2 className="font-display font-extralight text-4xl md:text-6xl leading-[0.98] tracking-tight text-ivory mb-16 max-w-3xl">
          {synergyContent.heading.pre}
          <em className="font-serif italic font-light text-rose">{synergyContent.heading.accent}</em>
          {synergyContent.heading.post}
        </h2>

        {/* Desktop SVG diagram */}
        <div className="hidden md:block relative aspect-[12/7] max-w-5xl mx-auto">
          <svg
            viewBox="0 0 1200 700"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            {/* Lines from center to each node */}
            {synergyNodes.map((node, i) => (
              <line
                key={node.id}
                ref={el => { lineRefs.current[i] = el; }}
                x1={600}
                y1={350}
                x2={(node.x / 100) * 1200}
                y2={(node.y / 100) * 700}
                stroke="var(--house-rose)"
                strokeWidth="1"
                strokeOpacity="0.6"
              />
            ))}
            {/* Center node */}
            <circle cx={600} cy={350} r={70} fill="var(--house-rose)" />
            <text
              x={600}
              y={345}
              textAnchor="middle"
              className="fill-obsidian font-display font-medium"
              style={{ fontSize: '14px', letterSpacing: '0.15em', textTransform: 'uppercase' }}
            >
              Gaze
            </text>
            <text
              x={600}
              y={365}
              textAnchor="middle"
              className="fill-obsidian font-display font-medium"
              style={{ fontSize: '14px', letterSpacing: '0.15em', textTransform: 'uppercase' }}
            >
              Holdings
            </text>
            {/* Division nodes */}
            {synergyNodes.map(node => {
              const cx = (node.x / 100) * 1200;
              const cy = (node.y / 100) * 700;
              const isHovered = hovered === node.id;
              return (
                <g
                  key={node.id}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    cx={cx}
                    cy={cy}
                    r={50}
                    fill={isHovered ? 'var(--house-rose)' : 'var(--ink)'}
                    stroke="var(--rose-deep)"
                    strokeWidth="1"
                    style={{ transition: 'fill 0.3s' }}
                  />
                  <text
                    x={cx}
                    y={cy + 5}
                    textAnchor="middle"
                    fill={isHovered ? 'var(--obsidian)' : 'var(--house-rose)'}
                    className="font-display"
                    style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', pointerEvents: 'none', transition: 'fill 0.3s' }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Mobile: stacked relationship list */}
        <div className="md:hidden space-y-6">
          {synergyNodes.map(node => (
            <div key={node.id} className="border-l-2 border-rose-deep pl-4">
              <div className="font-display text-[0.6rem] tracking-[0.3em] uppercase text-rose mb-1">{node.label}</div>
              <p className="text-ivory/70 text-sm leading-relaxed">{node.caption}</p>
            </div>
          ))}
        </div>

        {/* Caption (desktop hover) */}
        <div className="hidden md:block text-center mt-12 min-h-[3rem]">
          <p className="text-ivory/70 max-w-xl mx-auto font-light italic transition-opacity duration-300">
            {activeCaption}
          </p>
        </div>
      </div>
    </section>
  );
}
