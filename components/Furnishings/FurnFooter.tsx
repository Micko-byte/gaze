'use client';

import { useState } from 'react';
import Link from 'next/link';
import { furnRooms } from '@/content/furnishings';
import { houses } from '@/content/houses';
import { HouseLogo } from '@/components/Logo/HouseLogo';

/** Furnishings footer, after Natuzzi: newsletter sign-up, back to top, and three columns of links. */
export function FurnFooter() {
  const [sent, setSent] = useState(false);
  return (
    <footer className="bg-[#F6F1EA] px-5 pb-10 pt-20 font-text text-furn-ink md:px-[6vw]">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-12 md:grid-cols-[auto_1fr_auto] md:items-start">
          <HouseLogo id="furnishings" className="h-12 w-auto" />
          <div className="max-w-xl">
            <p className="text-[clamp(22px,2vw,30px)] leading-snug">
              <strong className="font-medium">sign up</strong> <span className="text-[#6F6A62]">for the latest Gaze Furnishings collections and inspirations.</span>
            </p>
            {sent ? (
              <p className="mt-8 text-sm" role="status">Thank you. You will hear from us with the first collection.</p>
            ) : (
              <form
                className="mt-8 flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <label htmlFor="furn-email" className="text-sm font-medium">email*</label>
                <div className="flex items-end gap-4 border-b border-furn-ink pb-2">
                  <input id="furn-email" type="email" required placeholder="you@example.com" className="w-full bg-transparent text-base outline-none placeholder:text-[#9A948A]" />
                  <button type="submit" className="shrink-0 rounded-full bg-furn-ink px-6 py-2.5 text-[13px] text-furn-linen transition-colors hover:bg-furn-walnut">
                    subscribe
                  </button>
                </div>
                <label className="flex items-start gap-3 text-[12px] text-[#6F6A62]">
                  <input type="checkbox" required className="mt-0.5 accent-[#1E1E22]" />
                  I have read the privacy policy and agree to receive news from Gaze Furnishings.
                </label>
              </form>
            )}
          </div>
          <a href="#top" data-no-transition className="group flex items-center gap-4 text-sm">
            back to top
            <span className="grid h-14 w-14 place-items-center rounded-full border border-[rgba(30,30,34,0.25)] transition-colors group-hover:bg-furn-ink group-hover:text-furn-linen">↑</span>
          </a>
        </div>

        <div className="mt-20 grid gap-10 border-t border-[rgba(30,30,34,0.15)] pt-10 sm:grid-cols-3">
          <div>
            <p className="text-sm font-medium">Gaze Furnishings</p>
            <ul className="mt-4 grid gap-2 text-[13px] text-[#4A4640]">
              {furnRooms.map((r) => (
                <li key={r.label}><Link href={r.href} data-no-transition className="hover:text-furn-walnut">{r.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium">The group</p>
            <ul className="mt-4 grid gap-2 text-[13px] text-[#4A4640]">
              <li><Link href="/" className="hover:text-furn-walnut">Gaze Holdings</Link></li>
              {houses.filter((h) => h.id !== 'furnishings').map((h) => (
                <li key={h.id}><Link href={h.href} className="hover:text-furn-walnut">{h.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium">Service</p>
            <ul className="mt-4 grid gap-2 text-[13px] text-[#4A4640]">
              <li><Link href="/furnishings#ordering" data-no-transition className="hover:text-furn-walnut">ordering &amp; delivery</Link></li>
              <li><Link href="/furnishings#consultation" data-no-transition className="hover:text-furn-walnut">consultations</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-furn-walnut">privacy policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-furn-walnut">terms &amp; conditions</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-14 text-[11px] uppercase tracking-[0.22em] text-[#8A847A]">© {new Date().getFullYear()} Gaze Furnishings · A Gaze Holdings house · Nairobi · Worldwide</p>
      </div>
    </footer>
  );
}
