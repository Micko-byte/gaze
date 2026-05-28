import { pressItems, pressContent } from '@/content/press';

function PressTile({ item }: { item: typeof pressItems[number] }) {
  if (item.type === 'award') {
    return (
      <div className="shrink-0 px-6 py-4 border border-champagne flex flex-col justify-center min-w-[260px]">
        <div className="font-display text-[0.6rem] tracking-[0.3em] uppercase text-champagne mb-1">
          {item.primary}
        </div>
        <div className="font-serif italic text-ivory/70 text-sm">{item.secondary}</div>
      </div>
    );
  }
  return (
    <div className="shrink-0 px-6 py-4 min-w-[160px] flex items-center justify-center border border-hairline text-ivory/40 hover:text-rose hover:border-rose transition-colors duration-500">
      <span className="font-display text-[0.7rem] tracking-[0.3em] uppercase">{item.primary}</span>
    </div>
  );
}

export function Press() {
  // Duplicate the array so the marquee loops seamlessly
  const loop = [...pressItems, ...pressItems];

  return (
    <section id="press" className="relative py-24 px-6 bg-obsidian overflow-hidden">
      <div className="max-w-6xl mx-auto mb-10">
        <div className="font-display text-[0.65rem] tracking-[0.45em] uppercase text-rose font-medium mb-4">
          {pressContent.eyebrow}
        </div>
        <h2 className="font-display font-extralight text-2xl md:text-3xl text-ivory">
          {pressContent.heading}
        </h2>
      </div>

      <div
        className="press-marquee relative w-full border-y border-hairline py-6"
        onMouseEnter={undefined}
      >
        <div className="press-marquee-track flex gap-4 hover:[animation-play-state:paused]">
          {loop.map((item, i) => (
            <PressTile key={`${item.id}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
