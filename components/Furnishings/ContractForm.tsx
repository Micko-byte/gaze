'use client';

import { useState } from 'react';
import { contract } from '@/content/projects';
import { furnContact } from '@/content/furnishings';

const field = 'w-full border-b border-[rgba(238,231,223,0.35)] bg-transparent py-2.5 text-base text-furn-linen outline-none transition-colors placeholder:text-[rgba(238,231,223,0.4)] focus:border-furn-linen';
const label = 'text-[12px] text-[rgba(238,231,223,0.6)]';

/**
 * The contract desk's enquiry. With no inbox wired yet, sending opens WhatsApp to the sales line with the enquiry
 * written out (email is offered too), as the checkout does.
 */
export function ContractForm() {
  const [kind, setKind] = useState<string>(contract.requests[0]);
  const [sent, setSent] = useState<string | null>(null);

  if (sent) {
    return (
      <div role="status" className="border-t border-[rgba(238,231,223,0.25)] pt-8">
        <p className="font-furn text-[clamp(32px,3vw,48px)] leading-tight">Thank you. Our contract desk will reply within one working day.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`https://wa.me/${furnContact.whatsapp}?text=${encodeURIComponent(sent)}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-furn-linen px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.24em] text-furn-ink transition-colors hover:bg-white">
            Send on WhatsApp
          </a>
          <a href={`mailto:${furnContact.email}?subject=${encodeURIComponent('Projects & Contract enquiry')}&body=${encodeURIComponent(sent)}`} className="rounded-full px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.24em] ring-1 ring-[rgba(238,231,223,0.5)] transition-colors hover:bg-furn-linen hover:text-furn-ink">
            Or by email
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      className="grid gap-7 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        const d = new FormData(e.currentTarget);
        const get = (k: string) => String(d.get(k) ?? '').trim();
        const text = [
          `Hello Gaze Furnishings, a Projects & Contract enquiry: ${kind.toLowerCase()}.`,
          `Name: ${get('name')}`,
          ...(get('company') ? [`Company: ${get('company')}`] : []),
          `Email: ${get('email')}`,
          `Phone: ${get('phone')}`,
          `The project: ${get('brief')}`,
        ].join('\n');
        setSent(text);
        window.open(`https://wa.me/${furnContact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
      }}
    >
      <div role="group" aria-label="I would like" className="flex flex-wrap gap-2 sm:col-span-2">
        {contract.requests.map((r) => (
          <button
            key={r}
            type="button"
            aria-pressed={kind === r}
            onClick={() => setKind(r)}
            className={`rounded-full px-5 py-2.5 text-[13px] ring-1 transition-colors ${kind === r ? 'bg-furn-linen text-furn-ink ring-furn-linen' : 'ring-[rgba(238,231,223,0.35)] hover:ring-furn-linen'}`}
          >
            {r}
          </button>
        ))}
      </div>
      <label className="flex flex-col gap-1">
        <span className={label}>full name*</span>
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="flex flex-col gap-1">
        <span className={label}>company or practice</span>
        <input name="company" autoComplete="organization" className={field} />
      </label>
      <label className="flex flex-col gap-1">
        <span className={label}>email*</span>
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className="flex flex-col gap-1">
        <span className={label}>phone or WhatsApp*</span>
        <input name="phone" type="tel" required autoComplete="tel" className={field} />
      </label>
      <label className="flex flex-col gap-1 sm:col-span-2">
        <span className={label}>the project*</span>
        <textarea name="brief" required rows={3} placeholder="e.g. 40 hotel rooms and a restaurant, opening in June" className={`${field} resize-y`} />
      </label>
      <div className="sm:col-span-2">
        <button type="submit" className="rounded-full bg-furn-linen px-9 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-furn-ink transition-colors hover:bg-white">
          Send the enquiry
        </button>
      </div>
    </form>
  );
}
