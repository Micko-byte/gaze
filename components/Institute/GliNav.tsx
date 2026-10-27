'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gliContact, gliNav } from '@/content/institute';
import { SoundToggle } from '@/components/Sound/SoundToggle';
import { GliCrest } from './GliBits';

/**
 * The Institute's bar: a navy strip carrying the parent group and the inboxes, then the white bar with the crest and
 * the name set as on the brand book cover. The strip slides away once the page moves.
 */
export function GliNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-40 font-gli-text transition-transform duration-500 ${scrolled ? '-translate-y-9' : ''}`}>
        <div className="flex h-9 items-center justify-between bg-gli-navy px-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgba(255,255,255,0.8)] md:px-10">
          <Link href="/" className="transition-colors hover:text-white">← Gaze Holdings</Link>
          <div className="flex items-center gap-6">
            <a href={`mailto:${gliContact.admissions}`} className="hidden normal-case tracking-[0.04em] transition-colors hover:text-white md:block">
              {gliContact.admissions}
            </a>
            <SoundToggle />
          </div>
        </div>
        <div className={`flex h-[76px] items-center justify-between gap-6 bg-white px-5 transition-shadow duration-500 md:px-10 ${scrolled ? 'shadow-[0_10px_30px_-18px_rgba(0,11,61,0.45)]' : ''}`}>
          <Link href="/institute" className="flex items-center gap-3" aria-label="Gaze Leadership Institute, home">
            <GliCrest className="h-[58px] w-[56px]" />
            <span className="font-gli-serif text-[15px] font-black uppercase leading-[1.05] text-gli-navy md:text-[17px]">
              Gaze Leadership
              <br />
              Institute
            </span>
          </Link>
          <nav aria-label="Gaze Leadership Institute" className="hidden xl:block">
            <ul className="flex items-center gap-8 text-[13px] font-bold uppercase tracking-[0.14em] text-gli-navy">
              {gliNav.map((l) => {
                const active = pathname === l.href;
                return (
                  <li key={l.href}>
                    <Link href={l.href} aria-current={active ? 'page' : undefined} className={`group relative py-2 transition-colors hover:text-gli-red ${active ? 'text-gli-red' : ''}`}>
                      {l.label}
                      <span className={`absolute inset-x-0 -bottom-0.5 h-[3px] origin-left bg-gli-red transition-transform duration-300 ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/institute/admissions#apply" className="hidden bg-gli-red px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-gli-navy sm:block">
              Enroll now
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              className="bg-gli-navy px-4 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-white xl:hidden"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="gli-speckle fixed inset-0 z-50 flex flex-col overflow-y-auto px-5 pb-8 pt-5 font-gli-text text-white" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex items-center justify-between">
            <GliCrest plate className="h-16 w-16" />
            <button type="button" onClick={() => setOpen(false)} className="bg-gli-red px-4 py-3 text-[12px] font-bold uppercase tracking-[0.16em]">
              Close
            </button>
          </div>
          <ul className="mt-12 flex flex-col gap-1 font-gli-head text-[54px] uppercase leading-[1.08]">
            <li>
              <Link href="/institute" className={pathname === '/institute' ? 'text-gli-red' : ''}>Home</Link>
            </li>
            {gliNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={pathname === l.href ? 'text-gli-red' : ''}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <Link href="/institute/admissions#apply" className="mt-10 self-start bg-gli-red px-7 py-4 text-[13px] font-bold uppercase tracking-[0.16em]">
            Enroll now
          </Link>
          <p className="mt-auto pt-10 text-[13px] text-[rgba(255,255,255,0.7)]">{gliContact.parent}</p>
        </div>
      )}
    </>
  );
}
