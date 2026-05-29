import { divisions } from '@/content/divisions';
import { DivisionCard } from './DivisionCard';
import { Reveal } from '@/components/Reveal/Reveal';

export function Divisions() {
  return (
    <section id="divisions" className="relative py-32 px-6 bg-obsidian">
      <Reveal className="max-w-6xl mx-auto mb-8">
        <div className="font-display text-[0.65rem] tracking-[0.45em] uppercase text-rose font-medium mb-6">
          03 · The Group
        </div>
        <h2 className="font-display font-extralight text-4xl md:text-6xl leading-[0.98] tracking-tight text-ivory mb-6">
          A house of <em className="font-serif italic font-light text-rose">five</em> divisions.
        </h2>
        <p className="text-ivory/60 max-w-xl font-light text-base md:text-lg">
          Parent: Gaze Holdings Ltd. Each division operates with its own discipline, its own catalogue, its own audience &mdash; under one signature.
        </p>
      </Reveal>

      {/* Scroll affordance */}
      <div className="max-w-6xl mx-auto mb-6 flex items-center gap-3 text-champagne/60">
        <span className="font-display text-[0.55rem] tracking-[0.35em] uppercase">Drag to explore</span>
        <span aria-hidden="true" className="h-px w-10 bg-champagne/40" />
        <span aria-hidden="true" className="text-sm">→</span>
      </div>

      <div className="relative px-6 -mx-6">
        <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pl-[max(1.5rem,calc((100vw-72rem)/2))] pr-6 scrollbar-none">
          {divisions.map(d => (
            <DivisionCard key={d.id} division={d} />
          ))}
        </div>
        {/* Right-edge fade hinting more cards */}
        <div className="pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-obsidian to-transparent hidden md:block" />
      </div>
    </section>
  );
}
