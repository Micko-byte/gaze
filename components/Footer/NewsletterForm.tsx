'use client';

import { useState } from 'react';
import { footerContent } from '@/content/footer';
import { furnContact } from '@/content/furnishings';

const whatsapp = (text: string) => `https://wa.me/${furnContact.whatsapp}?text=${encodeURIComponent(text)}`;

/** One underlined line. With no mailing service yet, the request goes out on WhatsApp rather than being lost. */
export function NewsletterForm() {
  const [request, setRequest] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get('newsletter_email') ?? '').trim();
    const text = `Hello Gaze Holdings, please add ${email} to The Quarterly.`;
    setRequest(text);
    window.open(whatsapp(text), '_blank', 'noopener,noreferrer');
  }

  if (request) {
    return (
      <p role="status" className="font-text text-[15px] font-light leading-relaxed">
        One last step:{' '}
        <a href={whatsapp(request)} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-rose-ink">send your request on WhatsApp</a>{' '}
        and we will add you.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-3 border-b border-gaze-deep pb-1 transition-colors focus-within:border-rose-ink">
      <input
        name="newsletter_email"
        type="email"
        required
        autoComplete="email"
        aria-label={footerContent.newsletter.placeholder}
        placeholder={footerContent.newsletter.placeholder}
        className="min-w-0 flex-1 border-0 bg-transparent py-3 font-text text-base font-light placeholder:text-[rgba(10,22,49,0.6)] focus:outline-none"
      />
      <button type="submit" className="shrink-0 font-text text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors hover:text-rose-ink">
        Subscribe
      </button>
    </form>
  );
}
