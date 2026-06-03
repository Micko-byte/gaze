'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { contactContent } from '@/content/contact';
import { ContactForm } from './ContactForm';
import { Reveal } from '@/components/Reveal/Reveal';
import VariableProximity from '@/components/ui/VariableProximity';

export function Contact() {
  const headingRef = useRef<HTMLDivElement>(null);

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={contactContent.backdrop}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/85 via-obsidian/90 to-obsidian" />
      </div>

      <Reveal className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div ref={headingRef}>
          <div className="font-display text-[0.65rem] tracking-[0.45em] uppercase text-rose font-medium mb-6">
            {contactContent.eyebrow}
          </div>
          <h2 className="font-display font-extralight text-4xl md:text-6xl leading-[0.98] tracking-tight text-ivory mb-6">
            {contactContent.heading.pre}
            <em className="font-serif italic font-light not-italic">
              <VariableProximity
                label={contactContent.heading.accent}
                containerRef={headingRef}
                radius={100}
                className="font-serif italic text-rose"
              />
            </em>
            {contactContent.heading.post}
          </h2>
          <p className="text-ivory/65 max-w-md font-light text-base md:text-lg leading-relaxed">
            {contactContent.sub}
          </p>

          {/* Premium detail strip */}
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px flex-1 max-w-[3rem] bg-rose/30" />
            <span className="font-display text-[0.5rem] tracking-[0.35em] uppercase text-ivory/30">
              Nairobi · Kenya
            </span>
            <div className="h-px flex-1 max-w-[3rem] bg-rose/30" />
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </Reveal>
    </section>
  );
}
