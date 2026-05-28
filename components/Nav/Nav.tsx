'use client';

import { useEffect, useState } from 'react';
import { navLinks } from '@/content/nav';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-reveal
        ${scrolled ? 'bg-obsidian/85 backdrop-blur-md border-b border-hairline py-3' : 'bg-transparent py-5'}`}
      aria-label="Primary"
    >
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="font-display font-medium text-[0.85rem] tracking-[0.3em] text-ivory">
          GAZE <span className="text-rose">▲</span> HOLDINGS
        </a>
        <ul className="hidden md:flex gap-8">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-display text-[0.65rem] tracking-[0.3em] uppercase text-ivory/70 hover:text-rose transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
