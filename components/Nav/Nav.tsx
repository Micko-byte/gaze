'use client';

import { useEffect, useState } from 'react';
import { navLinks } from '@/content/nav';
import { MobileMenu } from './MobileMenu';
import { BrandMark } from '@/components/BrandMark/BrandMark';

type Props = {
  theme?: 'auto' | 'light';
};

export function Nav({ theme = 'auto' }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const isLight = theme === 'light';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlight the nav link for the section currently in view
  useEffect(() => {
    const ids = navLinks
      .filter(l => !l.external && l.href.startsWith('#'))
      .map(l => l.href.slice(1));
    const els = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-reveal
          ${
            isLight
              ? 'bg-ivory/90 backdrop-blur-md border-b border-black/10 py-3'
              : scrolled
                ? 'bg-obsidian/85 backdrop-blur-md border-b border-hairline py-3'
                : 'bg-transparent py-5'
          }`}
        aria-label="Primary"
      >
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          <a href="#top" aria-label="Gaze Holdings home" className={`${isLight ? 'text-obsidian hover:text-rose-ink' : 'text-ivory hover:text-rose'} transition-colors`}>
            <BrandMark variant="inline" height={16} />
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-8 items-center">
            {navLinks.map(link => {
              const externalProps = link.external
                ? { target: '_blank' as const, rel: 'noopener noreferrer' }
                : {};
              const isAccent = 'accent' in link && link.accent;
              const isActive = !link.external && link.href === `#${activeId}`;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...externalProps}
                    aria-current={isActive ? 'true' : undefined}
                    className={
                      isAccent
                        ? isLight
                          ? 'font-display text-[0.65rem] tracking-[0.3em] uppercase text-obsidian font-medium border border-rose-ink px-4 py-2 hover:bg-rose-ink hover:text-ivory transition-colors duration-500 ease-reveal'
                          : 'font-display text-[0.65rem] tracking-[0.3em] uppercase text-ivory font-medium border border-rose px-4 py-2 hover:bg-rose hover:text-obsidian transition-colors duration-500 ease-reveal'
                        : isLight
                          ? `font-display text-[0.65rem] tracking-[0.3em] uppercase transition-colors hover:text-rose-ink ${isActive ? 'text-rose-ink' : 'text-obsidian/70'}`
                          : `font-display text-[0.65rem] tracking-[0.3em] uppercase transition-colors hover:text-rose ${isActive ? 'text-rose' : 'text-ivory/70'}`
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
            className={`${isLight ? 'text-obsidian hover:text-rose-ink' : 'text-ivory hover:text-rose'} md:hidden transition-colors p-2 -mr-2`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className="md:hidden">
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} theme={theme} />
      </div>
    </>
  );
}
