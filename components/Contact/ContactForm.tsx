'use client';

import { useState } from 'react';
import { contactContent } from '@/content/contact';
import { furnContact } from '@/content/furnishings';

const fieldClass =
  'w-full bg-transparent border-0 border-b border-[rgba(243,239,230,0.3)] focus:border-rose focus:outline-none py-3 font-text text-base font-light text-ivory placeholder:text-ivory/60 transition-colors';

const whatsapp = (text: string) => `https://wa.me/${furnContact.whatsapp}?text=${encodeURIComponent(text)}`;

/** With no inbox wired yet, an enquiry goes out on WhatsApp, written out for the team, with email as the other way. */
export function ContactForm() {
  const [enquiry, setEnquiry] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const get = (k: string) => String(d.get(k) ?? '').trim();
    const text = [
      `Hello Gaze Holdings, a website enquiry. For: ${get('division')}.`,
      `Name: ${get('name')}`,
      `Email: ${get('email')}`,
      ...(get('phone') ? [`Phone: ${get('phone')}`] : []),
      `Message: ${get('message')}`,
    ].join('\n');
    setEnquiry(text);
    window.open(whatsapp(text), '_blank', 'noopener,noreferrer');
  }

  if (enquiry) {
    return (
      <div role="status">
        <p className="text-ivory/80 font-serif italic text-xl md:text-2xl leading-relaxed">One last step: send your enquiry to our team, and we will respond within two working days.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href={whatsapp(enquiry)} target="_blank" rel="noopener noreferrer" className="border border-rose px-6 py-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-ivory transition-colors hover:bg-rose hover:text-obsidian">
            Send on WhatsApp
          </a>
          <a href={`mailto:${furnContact.email}?subject=${encodeURIComponent('Enquiry from the website')}&body=${encodeURIComponent(enquiry)}`} className="border border-hairline px-6 py-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-ivory transition-colors hover:border-rose">
            Or by email
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <fieldset>
        <legend className="font-text text-[11px] font-semibold uppercase tracking-[0.24em] text-rose">{contactContent.fields.division}</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {contactContent.divisions.map((d) => (
            <label key={d} className="cursor-pointer">
              <input type="radio" name="division" value={d} required className="peer sr-only" />
              <span className="block border border-[rgba(243,239,230,0.3)] px-4 py-2.5 font-text text-[13px] text-ivory transition-colors hover:border-rose peer-checked:border-rose peer-checked:bg-rose peer-checked:text-obsidian peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rose">
                {d}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <input name="name" required autoComplete="name" aria-label={contactContent.fields.name} placeholder={contactContent.fields.name} className={fieldClass} />
      <input name="email" type="email" required autoComplete="email" aria-label={contactContent.fields.email} placeholder={contactContent.fields.email} className={fieldClass} />
      <input name="phone" type="tel" autoComplete="tel" aria-label={contactContent.fields.phone} placeholder={contactContent.fields.phone} className={fieldClass} />
      <textarea aria-label={contactContent.fields.message} name="message" required rows={3} placeholder={contactContent.fields.message} className={`${fieldClass} resize-none`} />
      <button
        type="submit"
        className="mt-4 px-8 py-3 border border-rose font-display text-[0.7rem] tracking-[0.35em] uppercase text-ivory hover:bg-rose hover:text-obsidian transition-colors duration-500 ease-reveal"
      >
        {contactContent.submit}
      </button>
    </form>
  );
}
