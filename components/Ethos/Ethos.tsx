'use client';

import { useEffect, useRef } from 'react';
import { ethosContent } from '@/content/ethos';
import { prefersReducedMotion } from '@/lib/motion';
import { ScrollFloat } from '@/components/ui/ScrollFloat';

export function Ethos() {
  const sectionRef = useRef<HTMLElement>(null);
  const sentenceRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const sentences = sentenceRefs.current.filter(Boolean) as HTMLElement[];
    const targets = [...sentences, quoteRef.current].filter(Boolean) as HTMLElement[];

    if (prefersReducedMotion()) {
      targets.forEach(t => { t.style.opacity = '1'; });
      return;
    }

    let cleanup: (() => void) | undefined;
    (async () => {
      const { gsap } = await import('@/lib/gsap');
      const ctx = gsap.context(() => {
        gsap.set(targets, { opacity: 0, y: 24 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true },
        });
        tl.to(sentences, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.22,
          ease: 'expo.out',
        }).to(
          quoteRef.current,
          { opacity: 1, y: 0, duration: 1.3, ease: 'expo.out' },
          '-=0.4',
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
              <p
                key={i}
                ref={el => { sentenceRefs.current[i] = el; }}
                className="text-ivory/82 text-base md:text-lg leading-relaxed font-light"
              >
                {sentence}
              </p>
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
