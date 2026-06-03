'use client';

import { divisions } from '@/content/divisions';
import { DivisionCard } from './DivisionCard';
import { Reveal } from '@/components/Reveal/Reveal';
import { ScrollFloat } from '@/components/ui/ScrollFloat';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';

export function Divisions() {
  return (
    <section id="divisions" className="relative overflow-hidden bg-obsidian px-6 py-18 md:py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ivory/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,155,175,0.08),transparent_58%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl grid gap-10 md:grid-cols-[0.76fr_1.24fr] items-center">
        <Reveal className="max-w-xl self-center md:sticky md:top-1/2 md:-translate-y-1/2">
          <div className="font-display text-[0.62rem] tracking-[0.45em] uppercase text-rose font-medium mb-6">
            03 · The Group
          </div>
          <div className="space-y-5">
            <ScrollFloat
              containerClassName="mb-0"
              textClassName="font-display font-extralight text-[2.15rem] md:text-[3.15rem] leading-[0.98] tracking-[0.03em] text-ivory"
            >
              A house of five divisions.
            </ScrollFloat>
            <p className="text-ivory/60 max-w-md font-light text-sm md:text-base leading-relaxed">
              Parent: Gaze Holdings Ltd. Five disciplines, one signature.
            </p>
          </div>
          <div className="mt-8 h-px w-20 bg-rose/30" />
        </Reveal>

        <ScrollStack
          useWindowScroll
          className="overflow-visible"
          itemDistance={84}
          itemScale={0.018}
          itemStackDistance={42}
          stackPosition="28%"
          scaleEndPosition="10%"
          baseScale={0.94}
          rotationAmount={0}
          blurAmount={0}
        >
          {divisions.map((division, index) => (
            <ScrollStackItem
              key={division.id}
              itemClassName="!my-8 !p-0 !rounded-[30px] !h-[27rem] md:!h-[31rem] overflow-hidden bg-ink border border-hairline"
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
