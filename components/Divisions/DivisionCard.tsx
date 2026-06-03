import Link from 'next/link';
import Image from 'next/image';
import type { Division } from '@/content/divisions';
import { DivisionNumber } from './DivisionNumber';

type Props = {
  division: Division;
  index: number;
  className?: string;
};

const LABELS: Record<string, string> = {
  furnishings: 'Private commissions',
  press: 'Editorial house',
  institute: 'Cohort-led formation',
  manor: 'Broadcast estate',
  hergaze: 'Women\'s transformation',
};

export function DivisionCard({ division, index, className = '' }: Props) {
  return (
    <Link
      href={division.href}
      aria-label={division.name}
      data-cursor="hover"
      className={`group relative block shrink-0 w-[76vw] max-w-[312px] md:w-[300px] aspect-[4/5] border border-hairline overflow-hidden bg-ink shadow-[0_18px_45px_-28px_rgba(0,0,0,0.65)] transition-all duration-700 ease-reveal hover:border-rose/70 hover:-translate-y-1 ${className}`.trim()}
    >
      <div className="absolute inset-0">
        <Image
          src={division.image}
          alt={division.name}
          fill
          sizes="(max-width: 768px) 76vw, 300px"
          className="object-cover grayscale-[0.16] contrast-[1.02] brightness-[0.9] transition-transform duration-700 ease-reveal group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/8 via-obsidian/28 to-obsidian/88" />
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-deep/12 via-transparent to-transparent mix-blend-screen" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-display text-[0.52rem] tracking-[0.34em] uppercase text-rose mb-2">
              <DivisionNumber value={division.number} className="inline-block min-w-[1.5ch]" /> / {division.category}
            </div>
            <div className="font-display text-[0.56rem] tracking-[0.34em] uppercase text-champagne/70">
              {LABELS[division.id] ?? division.category}
            </div>
          </div>
          <div className="rounded-full border border-rose/60 px-3 py-1 text-[0.52rem] tracking-[0.28em] uppercase text-ivory/80">
            {index + 1}
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-px w-16 bg-rose/35" />
          <div className="font-display font-light text-lg md:text-xl leading-tight tracking-[0.01em] text-ivory">
            {division.name}
          </div>
          <p className="text-[0.85rem] leading-relaxed text-ivory/76">
            {division.tagline}
          </p>
          <p className="text-[0.72rem] leading-relaxed text-ivory/52">
            {division.detail}
          </p>
        </div>
      </div>
    </Link>
  );
}
