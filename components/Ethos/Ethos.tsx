'use client';

import { ethosContent } from '@/content/ethos';
import ScrollReveal from '@/components/ui/ScrollReveal';

function RevealedSentence({ text }: { text: string }) {
  return (
    <ScrollReveal
      containerClassName="max-w-2xl"
      textClassName="text-base md:text-lg leading-relaxed font-light text-ivory/82 tracking-[0.01em]"
      baseOpacity={0.18}
      baseRotation={0}
      blurStrength={2}
      rotationEnd="bottom bottom-=5%"
      wordAnimationEnd="bottom bottom-=5%"
    >
      {text}
    </ScrollReveal>
  );
}

export function Ethos() {
  return (
    <section
      id="ethos"
      className="relative flex items-center justify-center overflow-hidden bg-obsidian py-32 md:py-44"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 ethos-drift opacity-40" />
      </div>

      {/* Decorative vertical rule */}
      <div className="absolute left-1/2 top-0 w-px h-20 bg-gradient-to-b from-transparent to-rose/25 hidden md:block" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px w-8 bg-rose/40" />
            <div className="font-display text-[0.48rem] md:text-[0.55rem] tracking-[0.5em] uppercase text-champagne font-medium">
              {ethosContent.eyebrow}
            </div>
          </div>
          <div className="space-y-6">
            {ethosContent.manifesto.map((sentence, i) => (
              <div key={i}>
                <RevealedSentence text={sentence} />
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Subtle border accent */}
          <div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-rose/20 to-transparent hidden md:block" />

          <p className="font-serif italic font-light text-xl md:text-3xl leading-tight text-ivory opacity-90 pl-0 md:pl-8">
            {ethosContent.pullquote.pre}
            <span className="text-rose">{ethosContent.pullquote.accent}</span>
            {ethosContent.pullquote.post}
          </p>

          {/* Closing mark */}
          <div className="mt-8 pl-0 md:pl-8 flex items-center gap-3">
            <div className="h-px w-6 bg-rose/30" />
            <span className="font-display text-[0.48rem] tracking-[0.35em] uppercase text-ivory/25">
              Gaze Holdings
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
