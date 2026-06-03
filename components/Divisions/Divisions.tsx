'use client';

import { divisions } from '@/content/divisions';
import { DivisionCard } from './DivisionCard';
import { Reveal } from '@/components/Reveal/Reveal';
import { ScrollFloat } from '@/components/ui/ScrollFloat';

export function Divisions() {
  return (
    <section id="divisions" className="relative min-h-[100svh] overflow-hidden bg-obsidian px-6 py-24 md:py-28 flex items-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ivory/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,155,175,0.08),transparent_58%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full grid gap-16 md:grid-cols-[0.88fr_1.12fr] items-center">
        <Reveal className="max-w-xl">
          <div className="font-display text-[0.62rem] tracking-[0.45em] uppercase text-rose font-medium mb-6">
            03 · The Group
          </div>
          <ScrollFloat
            containerClassName="mb-6"
            textClassName="font-display font-extralight text-3xl md:text-5xl leading-[0.98] tracking-tight text-ivory"
          >
            A house of five divisions.
          </ScrollFloat>
          <p className="text-ivory/60 max-w-lg font-light text-sm md:text-base leading-relaxed">
            Parent: Gaze Holdings Ltd. Five disciplines, one signature.
          </p>
        </Reveal>

        <div className="relative flex h-[540px] items-center justify-center">
          <div className="absolute inset-0 motion-safe:animate-[division-ring_42s_linear_infinite] will-change-transform">
            {divisions.map((division, index) => {
              const angle = (360 / divisions.length) * index - 90;
              const radius = 165 + (index % 2) * 18;

              return (
                <div
                  key={division.id}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${radius}px) rotate(${-angle}deg)`,
                  }}
                >
                  <DivisionCard division={division} index={index} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
