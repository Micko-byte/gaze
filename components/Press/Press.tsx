import { pressContent } from '@/content/press';
import { Reveal } from '@/components/Reveal/Reveal';
import ScrollReveal from '@/components/ui/ScrollReveal';

export function Press() {
  const { award, media, coverage } = pressContent;

  return (
    <section id="press" className="relative py-32 px-6 bg-obsidian overflow-hidden">
      <Reveal className="max-w-4xl mx-auto text-center">
        <div className="font-display text-[0.65rem] tracking-[0.45em] uppercase text-rose font-medium mb-6">
          {pressContent.eyebrow}
        </div>
        <ScrollReveal
          containerClassName="mb-6"
          textClassName="font-display font-extralight text-3xl md:text-5xl leading-[0.98] tracking-tight text-ivory"
          baseRotation={4}
          blurStrength={6}
        >
          The work, noticed.
        </ScrollReveal>
        <p className="text-ivory/75 max-w-md mx-auto font-light text-base md:text-lg mb-16">
          {pressContent.sub}
        </p>

        {/* The award — one true thing, framed */}
        <div className="relative max-w-xl mx-auto border border-champagne/60 px-8 py-12 md:px-14 md:py-14">
          {/* corner ticks */}
          <span aria-hidden="true" className="absolute top-3 left-3 w-3 h-3 border-t border-l border-champagne" />
          <span aria-hidden="true" className="absolute top-3 right-3 w-3 h-3 border-t border-r border-champagne" />
          <span aria-hidden="true" className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-champagne" />
          <span aria-hidden="true" className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-champagne" />

          <div className="font-display text-[0.55rem] tracking-[0.4em] uppercase text-champagne mb-6">
            {award.tag}
          </div>
          <div className="font-serif italic font-light text-3xl md:text-4xl text-ivory leading-tight mb-5">
            {award.title}
          </div>
          <div className="text-ivory/80 font-light text-sm md:text-base mb-2">{award.detail}</div>
          <div className="font-display text-[0.6rem] tracking-[0.3em] uppercase text-rose mt-5">
            {award.holder}
          </div>
        </div>

        {/* Optional real coverage row (renders only when populated) */}
        {coverage.length > 0 && (
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {coverage.map(c => (
              <span key={c.id} className="font-display text-[0.7rem] tracking-[0.3em] uppercase text-ivory/65">
                {c.name}
              </span>
            ))}
          </div>
        )}

        <div className="mt-14">
          <a
            href={media.href}
            className="font-display text-[0.6rem] tracking-[0.35em] uppercase text-ivory/75 hover:text-rose transition-colors"
          >
            {media.label} · {media.cta} →
          </a>
        </div>
      </Reveal>
    </section>
  );
}
