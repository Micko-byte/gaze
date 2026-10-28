'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { bag, useBag } from '@/lib/bag';

const cap = 'text-[10px] font-medium uppercase tracking-[0.28em]';

/** The bag, sliding in from the right: what is in it, how many, and one button to checkout. */
export function BagDrawer() {
  const [open, setOpen] = useState(false);
  const items = useBag();
  const close = useRef<HTMLButtonElement>(null);
  const count = items.reduce((n, i) => n + i.qty, 0);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener('gaze:bag', show);
    return () => window.removeEventListener('gaze:bag', show);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    close.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Your bag, ${count} item${count === 1 ? '' : 's'}`}
        className="relative p-1 transition-colors hover:text-furn-walnut"
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <path d="M5 8h14l-1.2 12.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8Zm4 0V6.5a3 3 0 0 1 6 0V8" />
        </svg>
        {count > 0 && (
          <span className="absolute -right-1.5 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-furn-ink px-1 text-[10px] font-medium text-furn-linen">
            {count}
          </span>
        )}
      </button>

      <div
        className={`fixed inset-0 z-[60] bg-[rgba(30,30,34,0.4)] transition-opacity duration-500 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-[61] flex w-full max-w-[440px] flex-col bg-furn-linen text-furn-ink shadow-[-30px_0_60px_-30px_rgba(30,30,34,0.35)] transition-[transform,visibility] duration-500 ease-reveal ${open ? 'translate-x-0' : 'invisible translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-[rgba(30,30,34,0.12)] px-6 py-5">
          <p className="font-furn text-3xl leading-none">your bag</p>
          <button ref={close} type="button" onClick={() => setOpen(false)} aria-label="Close the bag" className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-[rgba(30,30,34,0.25)] transition-colors hover:bg-furn-ink hover:text-furn-linen">
            <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <line x1="2" y1="2" x2="12" y2="12" />
              <line x1="12" y1="2" x2="2" y2="12" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-6 px-6">
            <p className="max-w-[26ch] font-furn text-[28px] leading-tight">Nothing in your bag yet.</p>
            <Link href="/furnishings#collection" data-no-transition onClick={() => setOpen(false)} className="rounded-full bg-furn-ink px-7 py-3.5 text-[13px] text-furn-linen transition-colors hover:bg-furn-walnut">
              explore the collection
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6">
              {items.map((i) => (
                <li key={i.key} className="grid grid-cols-[88px_1fr] gap-4 border-b border-[rgba(30,30,34,0.12)] py-5">
                  <Link href={`/furnishings/${i.slug}`} data-no-transition onClick={() => setOpen(false)} className="block aspect-square overflow-hidden bg-[#F3EDE4]">
                    {i.photo && <img src={i.photo} alt="" className="h-full w-full object-cover" />}
                  </Link>
                  <div className="min-w-0">
                    <p className="font-furn text-[22px] leading-tight">{i.name}</p>
                    <p className="mt-1 text-[13px] text-[#6F6A62]">{i.described}</p>
                    <p className="text-[13px] text-[#6F6A62]">{i.size === 'standard' ? 'our standard size' : 'made to your measurements'}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="flex items-center rounded-full ring-1 ring-[rgba(30,30,34,0.25)]">
                        <button type="button" onClick={() => bag.setQty(i.key, i.qty - 1)} aria-label={`One fewer ${i.name}`} className="h-8 w-8 text-lg leading-none">−</button>
                        <span className="w-6 text-center text-[14px] tabular-nums" aria-live="polite">{i.qty}</span>
                        <button type="button" onClick={() => bag.setQty(i.key, i.qty + 1)} aria-label={`One more ${i.name}`} className="h-8 w-8 text-lg leading-none">+</button>
                      </span>
                      <button type="button" onClick={() => bag.remove(i.key)} className="text-[12px] text-[#6F6A62] underline underline-offset-4 hover:text-furn-ink">
                        remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-[rgba(30,30,34,0.12)] px-6 py-6">
              <div className="flex justify-between text-[14px]">
                <span className="text-[#6F6A62]">price</span>
                <span>on request · 75% deposit</span>
              </div>
              <Link
                href="/furnishings/checkout"
                data-no-transition
                onClick={() => setOpen(false)}
                className="mt-5 block rounded-full bg-furn-ink px-7 py-4 text-center text-[11px] font-medium uppercase tracking-[0.24em] text-furn-linen transition-colors hover:bg-furn-walnut"
              >
                Checkout
              </Link>
              <p className={`mt-4 text-center ${cap} text-[#8A847A]`}>Nothing is charged until we confirm your invoice</p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
