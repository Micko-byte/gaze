'use client';

import { useEffect, useState } from 'react';
import { navLinks } from '@/content/nav';
import { MobileMenu } from './MobileMenu';
import { BrandMark } from '@/components/BrandMark/BrandMark';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-reveal
          ${scrolled ? 'bg-obsidian/85 backdrop-blur-md border-b border-hairline py-3' : 'bg-transparent py-5'}`}
        aria-label="Primary"
      >
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          <a href="#top" aria-label="Gaze Holdings home" className="text-ivory hover:text-rose transition-colors">
            <BrandMark variant="inline" height={16} />
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-8 items-center">
            {navLinks.map(link => {
              const externalProps = link.external
                ? { target: '_blank' as const, rel: 'noopener noreferrer' }
                : {};
              const isAccent = 'accent' in link && link.accent;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...externalProps}
                    className={
                      isAccent
                        ? 'font-display text-[0.65rem] tracking-[0.3em] uppercase text-ivory font-medium border border-rose px-4 py-2 hover:bg-rose hover:text-obsidian transition-colors duration-500 ease-reveal'
                        : 'font-display text-[0.65rem] tracking-[0.3em] uppercase text-ivory/70 hover:text-rose transition-colors'
                    }
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden text-ivory hover:text-rose transition-colors p-2 -mr-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className="md:hidden">
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </>
  );
}
