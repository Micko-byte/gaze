'use client';

import { divisions } from '@/content/divisions';
import { DivisionCard } from './DivisionCard';
import { Reveal } from '@/components/Reveal/Reveal';
import { ScrollFloat } from '@/components/ui/ScrollFloat';

export function Divisions() {
  const reel = [...divisions, ...divisions];

  return (
    <section id="divisions" className="relative overflow-hidden bg-obsidian px-6 py-24 md:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ivory/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,155,175,0.08),transparent_58%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full grid gap-12 md:grid-cols-[0.84fr_1.16fr] items-start">
        <Reveal className="max-w-xl">
          <div className="font-display text-[0.62rem] tracking-[0.45em] uppercase text-rose font-medium mb-6">
            03 · The Group
          </div>
          <ScrollFloat
            containerClassName="mb-6"
            textClassName="font-display font-extralight text-3xl md:text-5xl leading-[0.98] tracking-[0.03em] text-ivory"
          >
            A house of five divisions.
          </ScrollFloat>
          <p className="text-ivory/60 max-w-lg font-light text-sm md:text-base leading-relaxed">
            Parent: Gaze Holdings Ltd. Five disciplines, one signature.
          </p>
          <div className="mt-10 h-px w-24 bg-rose/30" />
        </Reveal>

        <div className="relative">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-obsidian via-obsidian/95 to-transparent z-10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-obsidian via-obsidian/95 to-transparent z-10"
            aria-hidden="true"
          />
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max gap-4 md:gap-5 motion-safe:animate-[division-marquee_44s_linear_infinite] hover:[animation-play-state:paused] will-change-transform">
              {reel.map((division, index) => (
                <DivisionCard
                  key={`${division.id}-${index}`}
                  division={division}
                  index={index % divisions.length}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
