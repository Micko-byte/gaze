'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { furnContact } from '@/content/furnishings';

const field = 'w-full border-b border-[rgba(30,30,34,0.35)] bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-[#9A948A] focus:border-furn-ink';
const label = 'text-[12px] text-[#6F6A62]';
const wa = (text: string) => `https://wa.me/${furnContact.whatsapp}?text=${encodeURIComponent(text)}`;
const REPRESENTATIVE = wa('Hello Gaze Furnishings, I would like to speak with a representative about a custom piece.');

/**
 * A piece that isn't in the catalogue: a reference picture, the specifications, and a representative one tap away. There
 * is nowhere to store an upload yet, so the request opens in WhatsApp with the words written out, and the buyer attaches
 * the picture there. The preview here lets them check they have the right one.
 */
export function BespokeRequest() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [sent, setSent] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  if (sent) {
    return (
      <div role="status" className="border-t border-furn-ink pt-8">
        <p className="font-furn text-[clamp(32px,3vw,48px)] leading-tight">Thank you. One last step.</p>
        <p className="mt-4 max-w-lg text-base font-light leading-relaxed text-[#4A4640]">
          Send your request in WhatsApp{file ? ' and attach your picture there' : ''}, and a representative will reply with a price and a date.
        </p>
        <a href={wa(sent)} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-full bg-furn-ink px-8 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-furn-linen transition-colors hover:bg-furn-walnut">
          Open WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      className="grid gap-8"
      onSubmit={(e) => {
        e.preventDefault();
        const d = new FormData(e.currentTarget);
        const get = (k: string) => String(d.get(k) ?? '').trim();
        const text = [
          'Hello Gaze Furnishings, I would like a custom piece.',
          `What I have in mind: ${get('specs')}`,
          ...(get('size') ? [`Size: ${get('size')}`] : []),
          ...(file ? ['I will attach my reference picture here.'] : []),
          '',
          `Name: ${get('name')}`,
          `Phone: ${get('phone')}`,
          `Email: ${get('email')}`,
        ].join('\n');
        setSent(text);
        window.open(wa(text), '_blank', 'noopener,noreferrer');
      }}
    >
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-[rgba(30,30,34,0.35)] px-6 py-10 text-center transition-colors hover:border-furn-ink hover:bg-[#F6F1EA]">
        {preview ? (
          <img src={preview} alt="Your reference" className="max-h-64 object-contain" />
        ) : (
          <span className="text-[15px]">Choose a reference picture</span>
        )}
        <span className="text-[12px] text-[#6F6A62]">{file ? `${file.name} · choose another` : 'a photo, a sketch or a screenshot'}</span>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="sr-only" />
      </label>
      <label className="flex flex-col gap-1">
        <span className={label}>what you have in mind*</span>
        <textarea name="specs" required rows={4} placeholder="The piece, the fabric and colour, the room it is for" className={`${field} resize-y`} />
      </label>
      <label className="flex flex-col gap-1">
        <span className={label}>the size, if you know it</span>
        <input name="size" placeholder="e.g. 12 ft long, 3 ft deep" className={field} />
      </label>
      <div className="grid gap-6 sm:grid-cols-3">
        <label className="flex flex-col gap-1">
          <span className={label}>full name*</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="flex flex-col gap-1">
          <span className={label}>phone number*</span>
          <input name="phone" type="tel" required autoComplete="tel" className={field} />
        </label>
        <label className="flex flex-col gap-1">
          <span className={label}>email*</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="rounded-full bg-furn-ink px-8 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-furn-linen transition-colors hover:bg-furn-walnut">
          Send my request
        </button>
        <a href={REPRESENTATIVE} target="_blank" rel="noopener noreferrer" className="rounded-full px-8 py-4 text-[11px] font-medium uppercase tracking-[0.24em] ring-1 ring-furn-ink transition-colors hover:bg-furn-ink hover:text-furn-linen">
          Speak with a Representative
        </a>
      </div>
    </form>
  );
}
