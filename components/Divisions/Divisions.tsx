import { divisions } from '@/content/divisions';
import { DivisionCard } from './DivisionCard';

export function Divisions() {
  return (
    <section id="divisions" className="relative py-32 px-6 bg-obsidian">
      <div className="max-w-6xl mx-auto mb-12">
        <div className="font-display text-[0.65rem] tracking-[0.45em] uppercase text-rose font-medium mb-6">
          03 · The Group
        </div>
        <h2 className="font-display font-extralight text-4xl md:text-6xl leading-[0.98] tracking-tight text-ivory mb-6">
          A house of <em className="font-serif italic font-light text-rose">five</em> divisions.
        </h2>
        <p className="text-ivory/60 max-w-xl font-light text-base md:text-lg">
          Parent: Gaze Holdings Ltd. Each division operates with its own discipline, its own catalogue, its own audience &mdash; under one signature.
        </p>
      </div>

      <div className="px-6 -mx-6">
        <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pl-[max(1.5rem,calc((100vw-72rem)/2))] pr-6 scrollbar-none">
          {divisions.map(d => (
            <DivisionCard key={d.id} division={d} />
          ))}
        </div>
      </div>
    </section>
  );
}
