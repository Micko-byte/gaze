'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { books } from '@/content/library';
import { SoundToggle } from '@/components/Sound/SoundToggle';

const links = [
  { label: 'Library', href: '/press#library', count: books.length },
  { label: 'How it works', href: '/press#how' },
  { label: 'Publish', href: '/press#publish' },
  { label: 'Archive', href: '/press#archive' },
];

const pill = 'rounded-[3px] px-[10px] py-[4px] transition-colors duration-300';

/**
 * The Press bar, after Matthieu Givelet: the name on the left, the links in the middle with the library's count set
 * small and raised, one action on the right. Each part sits on a paper tag once the page moves under it.
 */
export function PressNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const tag = scrolled ? 'bg-press-paper' : 'bg-transparent';
  const stagger = (i: number) => ({ animationDelay: `${0.08 + i * 0.05}s` });

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-5 pt-5 font-text text-[17px] tracking-[-0.02em] text-press-ink md:px-9 md:pt-6">
        <nav aria-label="Gaze Press Global" className="flex items-center justify-between gap-4">
          <Link href="/press" className={`pointer-events-auto animate-[pressnav_0.7s_cubic-bezier(0.22,1,0.36,1)_both] bg-press-paper ${pill}`} style={stagger(0)}>
            ©Gaze Press Global
          </Link>
          <ul className={`pointer-events-auto hidden items-center gap-4 lg:flex ${pill} ${tag}`}>
            {links.map((l, i) => (
              <li key={l.label} className="animate-[pressnav_0.7s_cubic-bezier(0.22,1,0.36,1)_both]" style={stagger(i + 1)}>
                <Link href={l.href} data-no-transition className="group relative">
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-px transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                    {l.label}
                  </span>
                  {l.count !== undefined && <sup className="ml-0.5 text-[11px]">({l.count})</sup>}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pointer-events-auto flex items-center gap-2 animate-[pressnav_0.7s_cubic-bezier(0.22,1,0.36,1)_both]" style={stagger(links.length + 1)}>
            <span className={`hidden md:block ${pill} ${tag}`}>
              <SoundToggle light />
            </span>
            <Link href="/press/commission" data-no-transition className={`hidden bg-press-paper md:block ${pill} hover:bg-press-ink hover:text-press-paper`}>
              Submit a manuscript
            </Link>
            <button type="button" onClick={() => setOpen(true)} aria-expanded={open} className={`bg-press-paper lg:hidden ${pill}`}>
              Menu
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-press-paper px-5 pb-8 pt-5 font-text tracking-[-0.02em] text-press-ink" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex items-center justify-between text-[17px]">
            <span>©Gaze Press Global</span>
            <button type="button" onClick={() => setOpen(false)} className={`bg-press-ink text-press-paper ${pill}`}>Close</button>
          </div>
          <p className="mt-16 text-[15px]">[ Navigation ]</p>
          <ul className="mt-6 flex flex-col gap-2 text-[48px] leading-[1.05]">
            {[...links, { label: 'Submit a manuscript', href: '/press/commission' }].map((l) => (
              <li key={l.label}>
                <Link href={l.href} data-no-transition onClick={() => setOpen(false)}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <Link href="/" className="mt-auto text-[15px]">← Gaze Holdings</Link>
        </div>
      )}
    </>
  );
}
