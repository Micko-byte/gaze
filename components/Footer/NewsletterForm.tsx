'use client';

import { useState } from 'react';
import { footerContent } from '@/content/footer';

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get('newsletter_email');
    // Real Klaviyo webhook wired in a follow-up session.
    // eslint-disable-next-line no-console
    console.log('[Gaze Holdings] newsletter subscribe:', email);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="font-serif italic text-rose text-sm">{footerContent.newsletter.thanks}</p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-3 border-b border-hairline pb-2 focus-within:border-rose transition-colors">
      <input
        name="newsletter_email"
        type="email"
        required
        placeholder={footerContent.newsletter.placeholder}
        className="flex-1 bg-transparent border-0 focus:outline-none py-2 font-display text-[0.75rem] tracking-[0.2em] uppercase text-ivory placeholder:text-ivory/40"
      />
      <button type="submit" aria-label="Subscribe" className="text-rose hover:text-champagne transition-colors text-lg">→</button>
    </form>
  );
}
