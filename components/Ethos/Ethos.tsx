'use client';

import { useEffect, useRef } from 'react';
import { ethosContent } from '@/content/ethos';
import { prefersReducedMotion } from '@/lib/motion';
import { ScrollFloat } from '@/components/ui/ScrollFloat';
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
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const targets = Array.from(sectionRef.current.querySelectorAll('[data-ethos-animated]')) as HTMLElement[];
    const quote = quoteRef.current;

    if (prefersReducedMotion()) {
      targets.forEach(t => { t.style.opacity = '1'; });
      if (quote) quote.style.opacity = '1';
      return;
    }

    let cleanup: (() => void) | undefined;
    (async () => {
      const { gsap } = await import('@/lib/gsap');
      const ctx = gsap.context(() => {
        gsap.set(targets, { opacity: 0, y: 18 });
        if (quote) gsap.set(quote, { opacity: 0, y: 18 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: 'top 62%', once: true },
        });

        tl.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power2.out',
        }).to(
          quote,
          { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' },
          '-=0.35',
        );
      }, sectionRef);
      cleanup = () => ctx.revert();
    })();

    return () => { cleanup?.(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ethos"
      className="relative flex items-center justify-center overflow-hidden bg-obsidian py-32 md:py-44"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 ethos-drift opacity-40" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <ScrollFloat
            containerClassName="mb-8"
            textClassName="font-display text-[0.48rem] md:text-[0.55rem] tracking-[0.5em] uppercase text-champagne font-medium"
          >
            {ethosContent.eyebrow}
          </ScrollFloat>
          <div className="space-y-6">
            {ethosContent.manifesto.map((sentence, i) => (
              <div key={i} data-ethos-animated>
                <RevealedSentence text={sentence} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <p
            ref={quoteRef}
            className="font-serif italic font-light text-xl md:text-3xl leading-tight text-ivory"
          >
            {ethosContent.pullquote.pre}
            <span className="text-rose">{ethosContent.pullquote.accent}</span>
            {ethosContent.pullquote.post}
          </p>
        </div>
      </div>
    </section>
  );
}
