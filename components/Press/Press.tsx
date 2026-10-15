import { pressContent } from '@/content/press';
import { Reveal } from '@/components/Reveal/Reveal';
import ScrollReveal from '@/components/ui/ScrollReveal';

export function Press() {
  const { award, media, coverage } = pressContent;

  return (
    <section id="press" data-nav-theme="light" className="relative overflow-hidden bg-[#AE8448] px-6 py-32 text-[#06122A]">
      <Reveal className="max-w-4xl mx-auto text-center">
        <div className="font-display text-[11px] tracking-[0.45em] uppercase font-medium mb-6">
          {pressContent.eyebrow}
        </div>
        <ScrollReveal
          containerClassName="mb-6"
          textClassName="font-headline text-[clamp(48px,7vw,112px)] leading-[0.95] text-[#06122A]"
          baseRotation={4}
          blurStrength={6}
        >
          The work, noticed.
        </ScrollReveal>
        <p className="max-w-md mx-auto font-light text-base md:text-lg mb-16 text-[rgba(6,18,42,0.85)]">
          {pressContent.sub}
        </p>

        {/* The award — one true thing, framed */}
        <div className="relative max-w-xl mx-auto border border-[rgba(6,18,42,0.45)] bg-[rgba(243,239,230,0.12)] px-8 py-12 md:px-14 md:py-14">
          {/* corner ticks */}
          <span aria-hidden="true" className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#06122A]" />
          <span aria-hidden="true" className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#06122A]" />
          <span aria-hidden="true" className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#06122A]" />
          <span aria-hidden="true" className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#06122A]" />

          <div className="font-display text-[11px] tracking-[0.4em] uppercase mb-6">
            {award.tag}
          </div>
          <div className="font-headline text-4xl md:text-6xl text-[#F3EFE6] leading-tight mb-5">
            {award.title}
          </div>
          <div className="font-light text-sm md:text-base mb-2 text-[rgba(6,18,42,0.85)]">{award.detail}</div>
          <div className="font-display text-[11px] tracking-[0.3em] uppercase mt-5">
            {award.holder}
          </div>
        </div>

        {/* Optional real coverage row (renders only when populated) */}
        {coverage.length > 0 && (
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {coverage.map(c => (
              <span key={c.id} className="font-display text-[0.7rem] tracking-[0.3em] uppercase text-[rgba(6,18,42,0.7)]">
                {c.name}
              </span>
            ))}
          </div>
        )}

        <div className="mt-14">
          <a
            href={media.href}
            className="font-display text-[11px] tracking-[0.35em] uppercase underline-offset-4 transition-colors hover:text-[#F3EFE6] hover:underline"
          >
            {media.label} · {media.cta} →
          </a>
        </div>
      </Reveal>
    </section>
  );
}
