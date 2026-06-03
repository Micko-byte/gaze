'use client';

import { divisions } from '@/content/divisions';
import { DivisionCard } from './DivisionCard';
import { Reveal } from '@/components/Reveal/Reveal';
import { ScrollFloat } from '@/components/ui/ScrollFloat';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';

export function Divisions() {
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

        <ScrollStack
          useWindowScroll
          className="overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          itemDistance={120}
          itemScale={0.05}
          itemStackDistance={60}
          stackPosition="24%"
          scaleEndPosition="8%"
          baseScale={0.9}
          rotationAmount={0.35}
          blurAmount={0.45}
        >
          {divisions.map((division, index) => (
            <ScrollStackItem
              key={division.id}
              itemClassName="!my-10 !p-0 !rounded-[32px] !h-[34rem] md:!h-[38rem] overflow-hidden bg-ink border border-hairline"
            >
              <DivisionCard
                division={division}
                index={index}
                className="!w-full !max-w-none !h-full !aspect-auto"
              />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
