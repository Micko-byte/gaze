import Image from 'next/image';
import type { Division } from '@/content/divisions';

export function DivisionCard({ division }: { division: Division }) {
  const linkProps = division.external
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  return (
    <div
      className="group relative flex flex-col snap-center shrink-0 w-[280px] md:w-[340px] aspect-[3/4] border border-hairline hover:border-rose transition-colors duration-500 ease-reveal overflow-hidden bg-ink"
    >
      {/* Primary 'Step inside' link covers the full card */}
      <a
        href={division.href}
        {...linkProps}
        aria-label={`Step inside ${division.name}`}
        className="absolute inset-0 z-10"
      >
        <span className="sr-only">Step inside {division.name}</span>
      </a>

      <div className="relative flex-1 overflow-hidden pointer-events-none">
        <Image
          src={division.image}
          alt={division.name}
          fill
          sizes="(max-width: 768px) 280px, 340px"
          className="object-cover transition-transform duration-700 ease-reveal group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/20 via-obsidian/30 to-obsidian/85" />
        <div className="absolute top-4 left-4 font-display text-[0.55rem] tracking-[0.35em] uppercase text-rose">
          {division.number} / {division.category}
        </div>
        <div className="absolute top-0 left-0 h-px bg-rose w-0 group-hover:w-full transition-[width] duration-700 ease-reveal" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
        <div className="font-display font-light text-base md:text-lg text-ivory leading-tight mb-2">
          {division.name}
        </div>
        <div className="font-sans text-xs text-ivory/60 leading-snug mb-3 line-clamp-2">
          {division.tagline}
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="font-display text-[0.55rem] tracking-[0.3em] uppercase text-champagne group-hover:text-rose transition-colors">
            Step inside →
          </div>
          {division.shopHref && (
            <a
              href={division.shopHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Shop ${division.name} on Shopify`}
              className="relative z-20 pointer-events-auto font-display text-[0.55rem] tracking-[0.3em] uppercase text-obsidian bg-rose hover:bg-champagne px-3 py-1.5 transition-colors duration-300"
            >
              ▲ Shop
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
