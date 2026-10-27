'use client';

import { useState, type FormEvent } from 'react';
import { concierge } from '@/content/director';

const field =
  'w-full border-0 border-b border-[rgba(6,18,42,0.3)] bg-transparent px-0 py-3 font-text text-[16px] text-gaze-deep placeholder:text-[rgba(6,18,42,0.45)] focus:border-[#AE8448] focus:outline-none focus:ring-0 transition-colors';
const label = 'font-text text-[11px] uppercase tracking-[0.26em] text-[rgba(6,18,42,0.7)]';

/**
 * A booking request to the executive desk. Like the other Gaze forms it confirms on the page for now; delivery to
 * the Chairperson's inbox is wired in with the back end.
 */
export function BookingForm() {
  const [sent, setSent] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    // eslint-disable-next-line no-console
    console.log('[Gaze Holdings] director booking:', data);
    setSent(String(data.name).split(' ')[0]);
  };

  if (sent)
    return (
      <div role="status" className="border-l-2 border-[#AE8448] pl-6">
        <p className="font-headline text-[clamp(28px,3vw,44px)] leading-tight text-gaze-deep">Received with thanks, {sent}.</p>
        <p className="mt-3 max-w-[48ch] font-text text-[16px] font-light leading-relaxed text-[rgba(6,18,42,0.8)]">
          The executive desk will respond to confirm availability, format and terms for the engagement.
        </p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="grid gap-8 md:grid-cols-2">
      <label className="flex flex-col gap-1">
        <span className={label}>Full name</span>
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="flex flex-col gap-1">
        <span className={label}>Organisation</span>
        <input name="organisation" required autoComplete="organization" className={field} />
      </label>
      <label className="flex flex-col gap-1">
        <span className={label}>Email</span>
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className="flex flex-col gap-1">
        <span className={label}>Phone</span>
        <input name="phone" type="tel" autoComplete="tel" className={field} />
      </label>
      <label className="flex flex-col gap-1">
        <span className={label}>Engagement</span>
        <select name="engagement" required defaultValue="" className={field}>
          <option value="" disabled>Choose one</option>
          {concierge.kinds.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1">
        <span className={label}>Date &amp; city</span>
        <input name="when" placeholder="e.g. 14 March 2027, Accra" className={field} />
      </label>
      <label className="flex flex-col gap-1 md:col-span-2">
        <span className={label}>The dialogue</span>
        <textarea name="message" required rows={4} placeholder="The forum, the audience and the theme" className={`${field} resize-none`} />
      </label>
      <div className="md:col-span-2">
        <button type="submit" className="bg-gaze-navy px-8 py-4 font-text text-[12px] uppercase tracking-[0.26em] text-gaze-parchment transition-colors duration-500 hover:bg-[#AE8448]">
          Request the Director
        </button>
      </div>
    </form>
  );
}
