'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { furnRooms, pieces } from '@/content/furnishings';
import { HouseLogo } from '@/components/Logo/HouseLogo';
import { SoundToggle } from '@/components/Sound/SoundToggle';

const Icon = ({ d }: { d: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d={d} />
  </svg>
);

/**
 * Furnishings bar, after Natuzzi Italia: a solid linen bar, round menu button, lowercase room links, icons.
 * On desktop, hovering or focusing a room drops a white panel under the bar with that room's two columns.
 */
export function FurnHeader() {
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState<string | null>(null);
  const [navLeft, setNavLeft] = useState(0);
  const navList = useRef<HTMLUListElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!room) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setRoom(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [room]);

  const show = (label: string) => {
    if (navList.current) setNavLeft(navList.current.getBoundingClientRect().left);
    setRoom(label);
  };

  return (
    <>
      <header
        onMouseLeave={() => setRoom(null)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setRoom(null);
        }}
        className="fixed inset-x-0 top-0 z-40 border-b border-[rgba(30,30,34,0.12)] bg-furn-linen text-furn-ink"
      >
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center gap-6 px-5 md:px-8">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-furn-ink text-furn-linen transition-colors hover:bg-furn-walnut"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <line x1="3" y1="5" x2="13" y2="5" />
              <line x1="3" y1="8" x2="13" y2="8" />
              <line x1="3" y1="11" x2="10" y2="11" />
            </svg>
          </button>
          <Link href="/furnishings" aria-label="Gaze Furnishings home" className="shrink-0">
            <HouseLogo id="furnishings" className="h-9 w-auto" />
          </Link>
          <nav aria-label="Rooms" className="hidden flex-1 xl:block">
            <ul ref={navList} className="flex items-center gap-6 font-text text-[14px]">
              {furnRooms.map((r) => (
                <li key={r.label} onMouseEnter={() => show(r.label)}>
                  <Link
                    href={r.href}
                    data-no-transition
                    onFocus={() => show(r.label)}
                    onClick={() => setRoom(null)}
                    aria-expanded={room === r.label}
                    aria-controls="furn-rooms-panel"
                    className={`relative py-[26px] transition-colors after:absolute after:bottom-[20px] after:left-0 after:h-px after:bg-current after:transition-all after:duration-500 ${
                      room === r.label ? 'after:w-full' : 'after:w-0'
                    }`}
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <a href="#search" data-no-transition aria-label="Search the collection" className="hidden p-1 transition-colors hover:text-furn-walnut sm:block">
              <Icon d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm5.3-2.2L21 21" />
            </a>
            <Link href="/furnishings#showroom" data-no-transition aria-label="Visit the showroom" className="hidden p-1 transition-colors hover:text-furn-walnut sm:block">
              <Icon d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            </Link>
            <Link href="/furnishings#consultation" data-no-transition aria-label="Your account" className="hidden p-1 transition-colors hover:text-furn-walnut sm:block">
              <Icon d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm-8 9a8 8 0 0 1 16 0" />
            </Link>
            <SoundToggle light />
            <Link href="/" className="hidden items-center gap-2 border-l border-[rgba(30,30,34,0.15)] pl-4 font-text text-[11px] uppercase tracking-[0.22em] md:flex">
              <HouseLogo id="holdings" tone="mono" className="h-4 w-auto" /> Gaze Holdings
            </Link>
          </div>
        </div>

        {/* room panel: drops under the bar, and cross-fades between rooms while it stays open */}
        <div
          id="furn-rooms-panel"
          className={`absolute inset-x-0 top-full hidden h-[300px] border-b border-[rgba(30,30,34,0.12)] bg-white transition-[opacity,transform,visibility] duration-300 ease-out xl:block ${
            room ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
          }`}
        >
          {furnRooms.map((r) => (
            <div
              key={r.label}
              aria-hidden={room !== r.label}
              className={`absolute inset-0 flex gap-24 pt-12 transition-opacity duration-300 ${room === r.label ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
              style={{ paddingLeft: navLeft }}
            >
              {r.columns.map((col, i) => (
                <ul key={i} className="grid content-start gap-3 font-text text-[15px] text-[#8A847A]">
                  {col.map((item) => (
                    <li key={item}>
                      <Link href={r.href} data-no-transition tabIndex={room === r.label ? 0 : -1} onClick={() => setRoom(null)} className="transition-colors hover:text-furn-ink">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
              {r.feature && (
                <Link
                  href={`/furnishings/${pieces.find((p) => p.name === r.feature)?.slug ?? ''}`}
                  data-no-transition
                  tabIndex={room === r.label ? 0 : -1}
                  onClick={() => setRoom(null)}
                  className="self-start font-text text-[13px] text-furn-ink"
                >
                  <span className="block text-[11px] uppercase tracking-[0.22em] text-[#8A847A]">signature</span>
                  <span className="mt-2 inline-block rounded-full bg-furn-lilac px-4 py-1.5 transition-colors hover:bg-furn-ink hover:text-furn-linen">{r.feature}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-furn-ink px-6 py-6 text-furn-linen md:px-10" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex items-center justify-between">
            <HouseLogo id="furnishings" tone="mono" knock="#1E1E22" className="h-9 w-auto" />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full border border-[rgba(238,231,223,0.4)] transition-colors hover:bg-furn-lilac hover:text-furn-ink">
              <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <line x1="2" y1="2" x2="12" y2="12" />
                <line x1="12" y1="2" x2="2" y2="12" />
              </svg>
            </button>
          </div>
          <ul className="mt-16 grid gap-x-16 gap-y-4 font-furn text-[clamp(36px,5vw,72px)] leading-[1.05] md:grid-cols-2">
            {furnRooms.map((r) => (
              <li key={r.label}>
                <Link href={r.href} data-no-transition onClick={() => setOpen(false)} className="transition-colors hover:text-furn-lilac">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/" className="mt-auto flex items-center gap-3 font-text text-sm uppercase tracking-[0.24em] text-[rgba(238,231,223,0.75)]">
            <HouseLogo id="holdings" tone="mono" className="h-6 w-auto" /> Gaze Holdings
          </Link>
        </div>
      )}
    </>
  );
}
