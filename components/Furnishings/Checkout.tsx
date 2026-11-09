'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { furnContact } from '@/content/furnishings';
import { priceIsSet } from '@/content/pricing';
import { bag, bagSubtotal, useBag, type BagItem } from '@/lib/bag';
import { invoiceFor, kes, type Invoice } from '@/lib/pricing';

const field = 'w-full border-b border-[rgba(30,30,34,0.35)] bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-[#9A948A] focus:border-furn-ink';
const label = 'text-[12px] text-[#6F6A62]';
const PAY = [
  { id: 'mpesa', name: 'M-Pesa', note: 'Paybill details come with your invoice' },
  { id: 'card', name: 'Visa or Mastercard', note: 'A secure card link comes with your invoice' },
  { id: 'bank', name: 'Bank transfer', note: 'Account details come with your invoice' },
] as const;
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

type Placed = { no: string; items: BagItem[]; invoice: Invoice; text: string; name: string };

const orderNumber = () => {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  return `GF-${ymd}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
};

const line = (i: BagItem) => `• ${i.qty} × ${i.name}: ${i.described}, ${i.spec}. ${kes(i.unit * i.qty)}`;
const wa = (text: string) => `https://wa.me/${furnContact.whatsapp}?text=${encodeURIComponent(text)}`;

/** Subtotal, VAT, total, deposit and balance, set out as the invoice will be. */
function Totals({ invoice }: { invoice: Invoice }) {
  const rows: ReadonlyArray<[string, number]> = [
    ['Subtotal', invoice.subtotal],
    ['VAT at 16%', invoice.vat],
  ];
  return (
    <dl className="grid gap-2 text-[14px] tabular-nums">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-4">
          <dt className="text-[#6F6A62]">{k}</dt>
          <dd>{kes(v)}</dd>
        </div>
      ))}
      <div className="flex justify-between gap-4 border-t border-[rgba(30,30,34,0.2)] pt-2">
        <dt>Total</dt>
        <dd>{kes(invoice.total)}</dd>
      </div>
      <div className="flex items-baseline justify-between gap-4 pt-2">
        <dt className="font-medium">75% deposit, due now</dt>
        <dd className="font-furn text-[24px] leading-none">{kes(invoice.deposit)}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt className="text-[#6F6A62]">25% balance, on completion</dt>
        <dd className="text-[#6F6A62]">{kes(invoice.balance)}</dd>
      </div>
    </dl>
  );
}

/**
 * The whole checkout on one page, to her rule: nothing gated, only the essentials required, everything else optional.
 * There is no payment gateway or order database yet, so placing the order opens WhatsApp with the order written out for
 * the sales line, and her team sends the invoice. Wire `place` to an order backend when there is one.
 */
export function Checkout() {
  const items = useBag();
  const [pay, setPay] = useState<(typeof PAY)[number]['id']>('mpesa');
  const [placed, setPlaced] = useState<Placed | null>(null);
  // the cart is read from this browser, so wait for it rather than flash "empty" first
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const count = items.reduce((n, i) => n + i.qty, 0);
  const invoice = invoiceFor(bagSubtotal(items));

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl py-6 text-center" role="status">
        <p className="text-[12px] text-[#6F6A62]">order {placed.no}</p>
        <h1 className="mt-4 font-furn text-[clamp(44px,6vw,96px)] leading-[0.96]">Thank you, {placed.name.split(' ')[0]}.</h1>
        <p className="mx-auto mt-6 max-w-lg text-lg font-light leading-relaxed text-[#4A4640]">
          Send the order on WhatsApp, if it has not opened already, and our team will reply with your invoice for the 75% deposit and a
          date for production.
        </p>
        <ul className="mx-auto mt-8 max-w-md text-left text-[14px] text-[#4A4640]">
          {placed.items.map((i) => (
            <li key={i.key} className="border-b border-[rgba(30,30,34,0.12)] py-2">{line(i).slice(2)}</li>
          ))}
        </ul>
        <div className="mx-auto mt-6 max-w-md text-left">
          <Totals invoice={placed.invoice} />
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={wa(placed.text)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-furn-ink px-8 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-furn-linen transition-colors hover:bg-furn-walnut">
            Send the order on WhatsApp
          </a>
          <a href={`mailto:${furnContact.email}?subject=${encodeURIComponent(`Order ${placed.no}`)}&body=${encodeURIComponent(placed.text)}`} className="rounded-full px-8 py-4 text-[11px] font-medium uppercase tracking-[0.24em] ring-1 ring-furn-ink transition-colors hover:bg-furn-ink hover:text-furn-linen">
            Or by email
          </a>
        </div>
        <p className="mt-8 text-[13px] text-[#6F6A62]">
          Or call {furnContact.phones.map((p, i) => (
            <span key={p.tel}>
              {i > 0 && ' or '}
              <a href={`tel:${p.tel}`} className="whitespace-nowrap underline underline-offset-4">{p.label}</a>
            </span>
          ))}
          .
        </p>
      </div>
    );
  }

  if (!ready) return <div className="min-h-[60svh]" />;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <h1 className="font-furn text-[clamp(44px,6vw,88px)] leading-[0.96]">Your cart is empty.</h1>
        <Link href="/furnishings#collection" data-no-transition className="mt-10 inline-block rounded-full bg-furn-ink px-8 py-4 text-[13px] text-furn-linen transition-colors hover:bg-furn-walnut">
          explore the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-14 lg:grid-cols-[1fr_420px]">
      <form
        className="grid content-start gap-10"
        onSubmit={(e) => {
          e.preventDefault();
          const d = new FormData(e.currentTarget);
          const no = orderNumber();
          const get = (k: string) => String(d.get(k) ?? '').trim();
          const birthday = [get('birth-day'), get('birth-month')].filter(Boolean).join(' ');
          const text = [
            `Hello Gaze Furnishings, I would like to place order ${no}:`,
            ...items.map(line),
            '',
            `Subtotal: ${kes(invoice.subtotal)}`,
            `VAT at 16%: ${kes(invoice.vat)}`,
            `Total: ${kes(invoice.total)}`,
            `75% deposit: ${kes(invoice.deposit)}`,
            '',
            `Name: ${get('name')}`,
            `Phone: ${get('phone')}`,
            `Email: ${get('email')}`,
            `Deliver to: ${get('address')}`,
            ...(birthday ? [`Birthday: ${birthday}`] : []),
            `Paying by: ${PAY.find((p) => p.id === pay)!.name}`,
          ].join('\n');
          setPlaced({ no, items, invoice, text, name: get('name') });
          bag.clear();
          window.open(wa(text), '_blank', 'noopener,noreferrer');
          window.scrollTo({ top: 0 });
        }}
      >
        <div>
          <h1 className="font-furn text-[clamp(48px,6vw,104px)] leading-[0.94]">Checkout</h1>
          <p className="mt-4 max-w-lg text-base font-light leading-relaxed text-[#4A4640]">
            Just the essentials. We send your invoice for the 75% deposit, and production begins once it is paid.{' '}
            <a href={wa('Hello Gaze Furnishings, I would rather place my order with you on WhatsApp.')} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap underline underline-offset-4">
              Prefer WhatsApp?
            </a>
          </p>
        </div>

        <fieldset className="grid gap-6 border-t border-furn-ink pt-6 sm:grid-cols-2">
          <legend className="sr-only">Your details</legend>
          <label className="flex flex-col gap-1 sm:col-span-2">
            <span className={label}>full name*</span>
            <input name="name" required autoComplete="name" className={field} />
          </label>
          <label className="flex flex-col gap-1">
            <span className={label}>phone number, for M-Pesa and delivery*</span>
            <input name="phone" type="tel" required autoComplete="tel" className={field} />
          </label>
          <label className="flex flex-col gap-1">
            <span className={label}>email*</span>
            <input name="email" type="email" required autoComplete="email" className={field} />
          </label>
          <label className="flex flex-col gap-1 sm:col-span-2">
            <span className={label}>delivery address*</span>
            <input name="address" required autoComplete="street-address" placeholder="Building, street and town" className={field} />
          </label>
          <div className="sm:col-span-2">
            <p className={label}>your birthday (day and month), optional, for a special annual gift</p>
            <div className="mt-1 grid max-w-sm grid-cols-[6rem_1fr] gap-4">
              <select name="birth-day" aria-label="Birthday: day" defaultValue="" className={field}>
                <option value="">day</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select name="birth-month" aria-label="Birthday: month" defaultValue="" className={field}>
                <option value="">month</option>
                {MONTHS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset className="border-t border-furn-ink pt-6">
          <legend className="sr-only">Payment</legend>
          <p className={label}>how you would like to pay</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {PAY.map((p) => (
              <label key={p.id} className={`flex cursor-pointer flex-col gap-1 rounded-[4px] p-4 ring-1 transition-colors ${pay === p.id ? 'bg-white ring-furn-ink' : 'ring-[rgba(30,30,34,0.2)] hover:ring-furn-ink'}`}>
                <input type="radio" name="pay" value={p.id} checked={pay === p.id} onChange={() => setPay(p.id)} className="sr-only" />
                <span className="text-[15px]">{p.name}</span>
                <span className="text-[12px] leading-snug text-[#6F6A62]">{p.note}</span>
              </label>
            ))}
          </div>
          <label className="mt-8 flex cursor-pointer items-start gap-3 text-[14px]">
            <input type="checkbox" required className="mt-1 accent-[#1E1E22]" />
            <span>
              I agree to the{' '}
              <Link href="/furnishings/terms" target="_blank" className="underline underline-offset-4">terms &amp; conditions</Link>, and understand that my 75% deposit confirms the order.
            </span>
          </label>
        </fieldset>

        <div>
          <button type="submit" className="w-full rounded-full bg-furn-ink px-9 py-5 text-[12px] font-medium uppercase tracking-[0.24em] text-furn-linen transition-colors hover:bg-furn-walnut sm:w-auto">
            Place order · {kes(invoice.deposit)} deposit
          </button>
          <p className="mt-4 max-w-md text-[12px] leading-relaxed text-[#6F6A62]">
            Nothing is charged now. Your order opens in WhatsApp, written out for our sales team; send it and we reply with your invoice.
          </p>
          <p className="mt-2 max-w-md text-[12px] leading-relaxed text-[#6F6A62]">
            Ordering from abroad?{' '}
            <Link href="/furnishings/international" data-no-transition className="underline underline-offset-4">The Worldwide Atelier</Link>.
          </p>
        </div>
      </form>

      <aside className="lg:sticky lg:top-[96px] lg:self-start">
        <div className="bg-[#F6F1EA] p-7">
          <p className="flex justify-between text-[12px] text-[#6F6A62]">
            <span>your order</span>
            <span>{count} piece{count === 1 ? '' : 's'}</span>
          </p>
          <ul className="mt-4">
            {items.map((i) => (
              <li key={i.key} className="grid grid-cols-[64px_1fr] gap-4 border-b border-[rgba(30,30,34,0.12)] py-4">
                <span className="block aspect-square overflow-hidden bg-white">{i.photo && <img src={i.photo} alt="" className="h-full w-full object-contain" />}</span>
                <span className="min-w-0">
                  <span className="block font-furn text-[20px] leading-tight">{i.qty > 1 ? `${i.qty} × ` : ''}{i.name}</span>
                  <span className="mt-1 block text-[12px] text-[#6F6A62]">{i.described}</span>
                  <span className="block text-[12px] text-[#6F6A62]">{i.spec}</span>
                  <span className="block text-[12px] text-[#6F6A62]">{i.readyMade ? 'ready-made, delivery confirmed with you' : i.imported ? 'imported in 3 months' : 'made in 14–21 days'}</span>
                  <span className="mt-1 block text-[14px] tabular-nums">{kes(i.unit * i.qty)}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <Totals invoice={invoice} />
          </div>
          <p className="mt-4 text-[12px] leading-relaxed text-[#6F6A62]">
            Includes white-glove delivery and installation within Nairobi.{items.every((i) => i.readyMade || priceIsSet(i.slug)) ? '' : ' Indicative prices, confirmed on your invoice.'}
          </p>
        </div>
      </aside>
    </div>
  );
}
