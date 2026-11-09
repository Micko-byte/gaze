'use client';

import { useState } from 'react';
import { chairImage, chairTitle, type Chair } from '@/content/executiveSeating';
import { bag, openBag } from '@/lib/bag';
import { invoiceFor, kes } from '@/lib/pricing';

/** The price with its VAT set out, and the way into the bag. */
export function ChairBuy({ chair }: { chair: Chair }) {
  const [qty, setQty] = useState(1);
  const invoice = invoiceFor(chair.rrp * qty);

  const add = () => {
    bag.add({
      // the bag links back to /furnishings/<slug>
      slug: `executive-seating/${chair.slug}`,
      name: chair.name,
      photo: chairImage(chair.slug, 'hero'),
      described: chair.finish ?? 'As shown',
      spec: chair.kind,
      unit: chair.rrp,
      qty,
      readyMade: true,
    });
    openBag();
  };

  return (
    <div className="mt-8 max-w-md">
      <p className="font-furn text-[clamp(36px,3.4vw,52px)] leading-none tabular-nums">{kes(chair.rrp)}</p>
      <dl className="mt-4 grid gap-1 text-[14px] text-[#4A4640]">
        <div className="flex justify-between gap-6">
          <dt>VAT at 16%{qty > 1 ? `, ${qty} chairs` : ''}</dt>
          <dd className="tabular-nums">{kes(invoice.vat)}</dd>
        </div>
        <div className="flex justify-between gap-6 border-t border-[rgba(30,30,34,0.15)] pt-2 font-medium text-furn-ink">
          <dt>Total with VAT</dt>
          <dd className="tabular-nums">{kes(invoice.total)}</dd>
        </div>
      </dl>
      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <button type="button" aria-label="One fewer chair" onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-11 w-11 rounded-full ring-1 ring-[rgba(30,30,34,0.3)]">−</button>
          <span className="w-6 text-center text-[17px] tabular-nums" aria-live="polite">{qty}</span>
          <button type="button" aria-label="One more chair" onClick={() => setQty((q) => Math.min(200, q + 1))} className="h-11 w-11 rounded-full ring-1 ring-[rgba(30,30,34,0.3)]">+</button>
        </div>
        <button type="button" onClick={add} aria-label={`Add ${chairTitle(chair)} to the bag`} className="flex-1 rounded-full bg-furn-ink px-7 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-furn-linen transition-colors hover:bg-furn-walnut">
          Add to bag
        </button>
      </div>
    </div>
  );
}
