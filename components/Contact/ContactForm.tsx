'use client';

import { useState } from 'react';
import { contactContent } from '@/content/contact';

const fieldClass =
  'w-full bg-transparent border-0 border-b border-hairline focus:border-rose focus:outline-none py-3 font-display text-[0.75rem] tracking-[0.2em] uppercase text-ivory placeholder:text-ivory/40 transition-colors';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    // Real Resend / CRM webhook wired in a follow-up session.
    // eslint-disable-next-line no-console
    console.log('[Gaze Holdings] enquiry received:', data);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-ivory/80 font-serif italic text-xl md:text-2xl leading-relaxed">
        {contactContent.thanks}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <input name="name" required placeholder={contactContent.fields.name} className={fieldClass} />
      <input name="email" type="email" required placeholder={contactContent.fields.email} className={fieldClass} />
      <input name="phone" type="tel" placeholder={contactContent.fields.phone} className={fieldClass} />
      <select name="division" required defaultValue="" className={fieldClass}>
        <option value="" disabled className="bg-obsidian">{contactContent.fields.division}</option>
        {contactContent.divisions.map(d => (
          <option key={d} value={d} className="bg-obsidian">{d}</option>
        ))}
      </select>
      <textarea name="message" required rows={3} placeholder={contactContent.fields.message} className={`${fieldClass} resize-none`} />
      <button
        type="submit"
        className="mt-4 px-8 py-3 border border-rose font-display text-[0.7rem] tracking-[0.35em] uppercase text-ivory hover:bg-rose hover:text-obsidian transition-colors duration-500 ease-reveal"
      >
        {contactContent.submit}
      </button>
    </form>
  );
}
