'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { House } from '@/content/houses';
import { HouseLogo } from '@/components/Logo/HouseLogo';
import { SoundToggle } from '@/components/Sound/SoundToggle';

type Props = {
  house: House;
  links: ReadonlyArray<{ label: string; href: string }>;
  /** Colour of the bar while it sits over the hero; it turns to the house ground once the page scrolls. */
  overHero: 'light' | 'dark';
  /** Typeface class for the links (the house's text face). */
  textFont?: string;
};

/** Division navigation: the house's own logo and links, with a way back to Gaze Holdings. */
export function HouseHeader({ house, links, overHero, textFont = 'font-text' }: Props) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const ink = solid || overHero === 'dark' ? house.ink : '#FFFFFF';
  const logoMono = !solid && overHero === 'light';

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,padding] duration-500 ease-reveal"
        style={{
          background: solid ? house.ground : 'transparent',
          boxShadow: solid ? '0 1px 0 rgba(0,0,0,0.08)' : 'none',
          paddingBlock: solid ? '10px' : '22px',
          color: ink,
        }}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 md:px-10">
          <Link href={house.href} aria-label={`${house.name} home`} className="shrink-0">
            <HouseLogo id={house.logo} tone={logoMono ? 'mono' : 'original'} className="h-9 w-auto md:h-11" />
          </Link>
          <nav aria-label={`${house.name}`} className="hidden lg:block">
            <ul className={`flex items-center gap-8 ${textFont} text-[12px] uppercase tracking-[0.22em]`}>
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} data-no-transition className="opacity-80 transition-opacity hover:opacity-100">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            <SoundToggle light={solid || overHero === 'dark'} />
            <Link href="/" className={`hidden items-center gap-2 ${textFont} text-[11px] uppercase tracking-[0.24em] opacity-80 transition-opacity hover:opacity-100 md:flex`}>
              <HouseLogo id="holdings" tone="mono" className="h-5 w-auto" />
              <span>Gaze Holdings</span>
            </Link>
            <button
              type="button"
              className="p-2 lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col px-6 py-6" style={{ background: house.ground, color: house.ink }} role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex items-center justify-between">
            <HouseLogo id={house.logo} className="h-9 w-auto" />
            <button type="button" className="p-2" aria-label="Close menu" onClick={() => setOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>
          <ul className={`mt-14 flex flex-col gap-6 ${textFont} text-2xl`}>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} data-no-transition onClick={() => setOpen(false)}>{l.label}</a>
              </li>
            ))}
          </ul>
          <Link href="/" className={`mt-auto flex items-center gap-3 ${textFont} text-sm uppercase tracking-[0.24em]`}>
            <HouseLogo id="holdings" tone="mono" className="h-6 w-auto" /> Gaze Holdings
          </Link>
        </div>
      )}
    </>
  );
}
