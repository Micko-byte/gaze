'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { divisions } from '@/content/divisions';
import { Reveal } from '@/components/Reveal/Reveal';

/**
 * Fan geometry, symmetric about the centre card. `lift` is a fraction of the
 * card width so the arc scales with the card rather than drifting at small
 * viewports. Only the outer and centre cards carry a tag, to keep the arc clear.
 */
const FAN = [
  { deg: -12, lift: 0.115, tag: true },
  { deg: -6, lift: 0.04, tag: false },
  { deg: 0, lift: 0, tag: true },
  { deg: 6, lift: 0.04, tag: false },
  { deg: 12, lift: 0.115, tag: true },
];

export function Divisions() {
  return (
    // overflow-clip, not overflow-hidden: hidden would trap descendant sticky
    // positioning and clips identically here.
    <section id="divisions" className="relative overflow-clip bg-obsidian px-6 py-24 md:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ivory/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,155,175,0.08),transparent_58%)]" />
      </div>

      <Reveal className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <div className="font-display text-[0.62rem] tracking-[0.45em] uppercase text-rose font-medium mb-8">
          03 · The Group
        </div>

        <h2 className="font-display font-semibold text-ivory tracking-[-0.025em] leading-[1.2] text-[clamp(1.75rem,5vw,3.35rem)]">
          <span className="block">A house of</span>
          <span className="block mt-[0.18em]">
            {/* The comma lives inside the box so a narrow viewport never breaks
                the line onto an orphaned punctuation mark. */}
            <span className="inline-block rounded-xl bg-ivory px-[0.34em] pb-[0.1em] pt-[0.04em] text-obsidian">
              five divisions,
            </span>{' '}
            one signature.
          </span>
        </h2>
      </Reveal>

      <div
        className="relative z-10 mt-16 flex justify-center md:mt-24"
        style={{ '--card': 'clamp(116px, 18vw, 296px)' } as CSSProperties}
      >
        {divisions.map((division, i) => {
          const { deg, lift, tag } = FAN[i];
          return (
            <Link
              key={division.id}
              href={division.href}
              aria-label={division.name}
              data-cursor="hover"
              className="group relative block shrink-0"
              style={{
                width: 'var(--card)',
                marginLeft: i === 0 ? 0 : 'calc(var(--card) * -0.26)',
                transform: `rotate(${deg}deg) translateY(calc(var(--card) * ${-lift}))`,
                zIndex: i + 1,
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] border border-hairline bg-ink shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-reveal group-hover:scale-[1.04]">
                <Image
                  src={division.image}
                  alt={division.name}
                  fill
                  sizes="(max-width: 768px) 30vw, 296px"
                  className="object-cover grayscale-[0.12] contrast-[1.04] transition-transform duration-700 ease-reveal group-hover:scale-[1.06]"
                />
                {/* Two layers: a light wash for grade, then a deeper foot so the
                    name stays legible over whatever the photograph is doing. */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/45 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-obsidian via-obsidian/72 to-transparent" />
                {/* Each card is overlapped on its right by the next one, so the
                    name is held to the strip that stays visible. */}
                <div className="absolute inset-x-0 bottom-0 p-[7%] pr-[28%]">
                  <div className="font-display font-light leading-tight tracking-[0.01em] text-ivory text-[clamp(0.5rem,1.05vw,0.86rem)]">
                    {division.name}
                  </div>
                </div>
              </div>

              {tag && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ivory px-[0.85em] py-[0.3em] font-display font-semibold text-obsidian text-[clamp(0.44rem,0.95vw,0.8rem)]">
                  @{division.category}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <Reveal className="relative z-10 mx-auto mt-16 max-w-xl text-center md:mt-20" delay={0.15}>
        <p className="font-light leading-relaxed text-ivory/60 text-sm md:text-base">
          Parent: Gaze Holdings Ltd.
        </p>
        <p className="mt-1 font-light leading-relaxed text-ivory/60 text-sm md:text-base">
          Lifestyle, publishing, leadership, broadcast and transformation — held to one standard.
        </p>
        <div className="mt-10 flex justify-center">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ivory/50"
          >
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
              <path d="M6 0v12M1 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </span>
        </div>
      </Reveal>
    </section>
  );
}
