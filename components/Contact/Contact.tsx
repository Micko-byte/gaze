'use client';

import { useEffect, useRef, useState } from 'react';
import { contactContent } from '@/content/contact';
import { furnContact } from '@/content/furnishings';
import { ContactForm } from './ContactForm';
import { Reveal } from '@/components/Reveal/Reveal';
import VariableProximity from '@/components/ui/VariableProximity';

const label = 'font-text text-[11px] font-semibold uppercase tracking-[0.24em] text-rose';
const line = 'text-ivory transition-colors hover:text-rose';

/** The time at home, set after load because this page is pre-built. */
function NairobiClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const format = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Nairobi', hour: 'numeric', minute: '2-digit', hour12: true });
    const tick = () => setTime(format.format(new Date()).toUpperCase());
    tick();
    const t = window.setInterval(tick, 20000);
    return () => window.clearInterval(t);
  }, []);
  return (
    <p className="flex items-center gap-3 font-text text-[12px] font-medium uppercase tracking-[0.22em] text-ivory/70">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-rose motion-safe:animate-pulse" />
      Nairobi{time && <span className="tabular-nums">{time}</span>}
    </p>
  );
}

/**
 * One large sentence with the direct lines beneath it, and a short form beside them, after the calm of Tengile
 * MalaMala's contact page and the plain lines and live clock in Odyssée's footer.
 */
export function Contact() {
  const headingRef = useRef<HTMLDivElement>(null);

  return (
    <section id="contact" className="relative overflow-hidden bg-obsidian px-6 py-24 md:px-10 md:py-36">
      <Reveal className="mx-auto grid max-w-[1280px] items-start gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-24">
        <div ref={headingRef}>
          <p className={label}>{contactContent.eyebrow}</p>
          <h2 className="mt-8 font-display text-[clamp(44px,6.2vw,96px)] font-extralight leading-[0.98] tracking-tight text-ivory">
            {contactContent.heading.pre}
            <em className="inline-block whitespace-nowrap not-italic">
              <VariableProximity label={contactContent.heading.accent} containerRef={headingRef} radius={100} className="font-serif italic text-rose" />
            </em>
            {contactContent.heading.post}
          </h2>
          <p className="mt-8 max-w-md text-base font-light leading-relaxed text-ivory/70 md:text-lg">{contactContent.sub}</p>

          <dl className="mt-14 grid max-w-md gap-5 border-t border-hairline pt-8 text-[17px] font-light">
            <div className="grid grid-cols-[6rem_minmax(0,1fr)] items-baseline gap-4">
              <dt className={label}>WhatsApp</dt>
              <dd><a href={`https://wa.me/${furnContact.whatsapp}`} target="_blank" rel="noopener noreferrer" className={line}>{furnContact.phones[0].label}</a></dd>
            </div>
            <div className="grid grid-cols-[6rem_minmax(0,1fr)] items-baseline gap-4">
              <dt className={label}>Call</dt>
              <dd><a href={`tel:${furnContact.phones[1].tel}`} className={line}>{furnContact.phones[1].label}</a></dd>
            </div>
            <div className="grid grid-cols-[6rem_minmax(0,1fr)] items-baseline gap-4">
              <dt className={label}>Email</dt>
              <dd className="min-w-0 break-words"><a href={`mailto:${furnContact.email}`} className={line}>{furnContact.email}</a></dd>
            </div>
          </dl>
          <div className="mt-8">
            <NairobiClock />
          </div>
        </div>

        <ContactForm />
      </Reveal>
    </section>
  );
}
