'use client';

import { useEffect, useState } from 'react';
import type { Book } from '@/content/library';
import { activeLenis } from '@/lib/lenis';

const field = 'w-full border-b border-[rgba(17,17,17,0.35)] bg-transparent py-2 text-[17px] tracking-[-0.02em] outline-none placeholder:text-[#8A847A] focus:border-press-ink';
const label = 'text-[15px] tracking-[-0.02em] text-[#5A5550]';

/**
 * Buying a book: an order for delivery in Kenya, or Amazon everywhere else. Prices and the Amazon links are set by the
 * client; until then each reads "to follow". There is no order backend yet: an order is thanked, not sent.
 */
export function BookOrder({ book }: { book: Book }) {
  const [qty, setQty] = useState(1);
  const [done, setDone] = useState<string | null>(null);

  // the page arrives from an opened section: start at the top, whatever the smooth scroller remembers
  useEffect(() => {
    activeLenis?.scrollTo(0, { immediate: true, force: true });
  }, []);

  if (done) {
    return (
      <div className="py-10" role="status">
        <p className="font-press-script text-[clamp(40px,4vw,64px)] leading-none text-press-rose">Thank you</p>
        <p className="mt-6 max-w-[24ch] text-[clamp(28px,3vw,44px)] leading-[1.1] tracking-[-0.04em]">
          {done}, your order for {qty} {qty > 1 ? 'copies' : 'copy'} of {book.title} is in.
        </p>
        <p className="mt-6 max-w-md text-[17px] leading-relaxed">Our team will contact you to confirm payment and delivery.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-16 md:grid-cols-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setDone(String(new FormData(e.currentTarget).get('name') || '').split(' ')[0]);
        }}
        className="flex flex-col gap-7"
      >
        <p className="text-[17px] tracking-[-0.02em]">[ In Kenya ]</p>
        <div className="flex items-end justify-between gap-6 border-b border-[rgba(17,17,17,0.15)] pb-6">
          <div>
            <p className={label}>price</p>
            <p className="mt-1 min-w-[120px] border-b border-dashed border-[rgba(17,17,17,0.35)] font-press-head text-3xl">to follow</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={label}>copies</span>
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="One fewer copy" className="h-9 w-9 rounded-full ring-1 ring-press-ink">−</button>
            <span className="w-6 text-center text-[20px]" aria-live="polite">{qty}</span>
            <button type="button" onClick={() => setQty((q) => Math.min(50, q + 1))} aria-label="One more copy" className="h-9 w-9 rounded-full ring-1 ring-press-ink">+</button>
          </div>
        </div>
        <label className="flex flex-col gap-1">
          <span className={label}>Full name*</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="flex flex-col gap-1">
          <span className={label}>Phone or WhatsApp*</span>
          <input name="phone" type="tel" required autoComplete="tel" className={field} />
        </label>
        <label className="flex flex-col gap-1">
          <span className={label}>Email</span>
          <input name="email" type="email" autoComplete="email" className={field} />
        </label>
        <label className="flex flex-col gap-1">
          <span className={label}>Delivery address*</span>
          <input name="address" required autoComplete="street-address" className={field} />
        </label>
        <button type="submit" className="self-start rounded-[3px] bg-press-ink px-[14px] py-[8px] text-[17px] tracking-[-0.02em] text-press-paper transition-colors hover:bg-press-rose hover:text-press-ink">
          Place my order
        </button>
        <p className="max-w-sm text-[13px] leading-relaxed text-[#5A5550]">Pay by M-Pesa, Visa, Mastercard or bank transfer once we confirm. Nothing is charged now.</p>
      </form>
      <div>
        <p className="text-[17px] tracking-[-0.02em]">[ Everywhere else ]</p>
        <p className="mt-7 max-w-[18ch] text-[clamp(28px,3vw,44px)] leading-[1.1] tracking-[-0.04em]">{book.title} is available on Amazon.</p>
        <p className="mt-6 inline-block rounded-[3px] px-[14px] py-[8px] text-[17px] tracking-[-0.02em] ring-1 ring-[rgba(17,17,17,0.3)]">Amazon link to follow</p>
      </div>
    </div>
  );
}
