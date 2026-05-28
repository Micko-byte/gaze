'use client';

import { useEffect, useRef } from 'react';
import { ethosContent } from '@/content/ethos';
import { prefersReducedMotion } from '@/lib/motion';

export function Ethos() {
  const sectionRef = useRef<HTMLElement>(null);
  const sentenceRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    if (prefersReducedMotion()) {
      sentenceRefs.current.forEach(s => { if (s) s.style.opacity = '1'; });
      if (quoteRef.current) quoteRef.current.style.opacity = '1';
      return;
    }

    let cleanup: (() => void) | undefined;
    (async () => {
      const { gsap, ScrollTrigger } = await import('@/lib/gsap');
      const ctx = gsap.context(() => {
        gsap.set([...sentenceRefs.current, quoteRef.current], { opacity: 0, y: 20 });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
          animation: gsap.timeline()
            .to(sentenceRefs.current[0], { opacity: 1, y: 0, duration: 1 }, 0)
            .to(sentenceRefs.current[1], { opacity: 1, y: 0, duration: 1 }, 0.6)
            .to(sentenceRefs.current[2], { opacity: 1, y: 0, duration: 1 }, 1.2)
            .to(quoteRef.current, { opacity: 1, y: 0, duration: 1.2 }, 1.5),
        });
      }, sectionRef);
      cleanup = () => ctx.revert();
    })();

    return () => { cleanup?.(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ethos"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 ethos-drift opacity-40" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="font-display text-[0.65rem] tracking-[0.45em] uppercase text-rose font-medium mb-10">
            02 · {ethosContent.eyebrow}
          </div>
          <div className="space-y-6">
            {ethosContent.manifesto.map((sentence, i) => (
              <p
                key={i}
                ref={el => { sentenceRefs.current[i] = el; }}
                className="text-ivory/85 text-lg md:text-xl leading-relaxed font-light"
              >
                {sentence}
              </p>
            ))}
          </div>
        </div>
        <div>
          <p
            ref={quoteRef}
            className="font-serif italic font-light text-3xl md:text-5xl leading-tight text-ivory"
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
