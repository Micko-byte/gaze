import Image from 'next/image';
import { leadershipContent } from '@/content/leadership';
import { StatCountUp } from './StatCountUp';
import { Reveal } from '@/components/Reveal/Reveal';
import { ScrollFloat } from '@/components/ui/ScrollFloat';
import { ScrollPattern } from '@/components/Patterns/ScrollPattern';

export function Leadership() {
  return (
    <section id="vision" className="relative isolate overflow-hidden py-32 px-6 bg-ivory text-obsidian">
      <ScrollPattern variant="leadership" />
      <Reveal className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="relative aspect-[4/5] overflow-hidden border border-[rgba(6,18,42,0.1)]">
          <Image
            src="/images/founder/muthoni-ngugi-new.webp"
            alt={`${leadershipContent.name.first} ${leadershipContent.name.last}`}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover object-top"
            priority={false}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, rgba(174,132,72,0.05), rgba(6,18,42,0.10))', mixBlendMode: 'multiply' }}
          />
        </div>

        <div>
          <ScrollFloat
            containerClassName="mb-6"
            textClassName="font-display text-[12px] tracking-[0.4em] uppercase text-rose-ink font-medium"
          >
            {leadershipContent.eyebrow}
          </ScrollFloat>
          <ScrollFloat
            containerClassName="mb-3"
            textClassName="font-headline text-[clamp(44px,5vw,80px)] leading-none text-obsidian"
          >
            Muthoni Ngugi
          </ScrollFloat>
          <p className="font-serif italic text-rose-ink text-lg md:text-xl mb-10 font-light">
            {leadershipContent.role}
          </p>
          <div className="space-y-4 text-[rgba(6,18,42,0.82)] font-light text-base md:text-[1.05rem] leading-relaxed max-w-xl">
            {leadershipContent.bio.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 max-w-2xl">
            {leadershipContent.stats.map(stat => (
              <StatCountUp
                key={stat.label}
                value={stat.value}
                suffix={'suffix' in stat ? stat.suffix : ''}
                label={stat.label}
                tone="light"
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
