'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HouseLogo } from '@/components/Logo/HouseLogo';
import { SoundToggle } from '@/components/Sound/SoundToggle';

const links = [
  { label: 'The Maison', href: '#maison' },
  { label: 'Convocations', href: '#convocations' },
  { label: 'Partners', href: '#partners' },
  { label: 'Take part', href: '#take-part' },
];

/**
 * Her Gaze bar, after Very Work In Progress: it sits under the hero film, a thin strip of where and what above the
 * logo, the links spread across the width and one pill to book. It sticks to the top once the film scrolls away.
 */
export function HerGazeBar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="sticky top-0 z-40 bg-her-blush text-her-noir">
        <div className="flex items-center justify-between border-b border-[rgba(26,26,26,0.12)] px-5 py-3 text-[11px] uppercase tracking-[0.24em] md:px-8">
          <span>Nairobi · Kenya</span>
          <span className="hidden sm:inline">Summits · Retreats · Convocations</span>
        </div>
        <nav aria-label="Her Gaze Global" className="flex items-center justify-between gap-6 px-5 py-3 md:px-8">
          <Link href="/hergaze" aria-label="Her Gaze Global home" className="shrink-0">
            <HouseLogo id="hergaze" className="h-9 w-auto md:h-10" />
          </Link>
          <ul className="hidden flex-1 items-center justify-around text-[12px] uppercase tracking-[0.22em] lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} data-no-transition className="relative transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-500 hover:text-her-magenta hover:after:w-full">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <SoundToggle light />
            <a href="#take-part" data-no-transition className="rounded-full bg-her-magenta px-6 py-2.5 text-[11px] uppercase tracking-[0.24em] text-white transition-colors hover:bg-her-noir">
              Book a seat
            </a>
            <button type="button" className="p-1 lg:hidden" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-her-blush px-6 py-6 text-her-noir" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex items-center justify-between">
            <HouseLogo id="hergaze" className="h-9 w-auto" />
            <button type="button" className="p-2" aria-label="Close menu" onClick={() => setOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>
          <ul className="mt-14 flex flex-col gap-5 text-[40px] leading-none tracking-[-0.03em]">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} data-no-transition onClick={() => setOpen(false)}>{l.label}</a>
              </li>
            ))}
          </ul>
          <Link href="/" className="mt-auto flex items-center gap-3 text-sm uppercase tracking-[0.24em]">
            <HouseLogo id="holdings" tone="mono" className="h-6 w-auto" /> Gaze Holdings
          </Link>
        </div>
      )}
    </>
  );
}
