'use client';

import { useEffect } from 'react';
import { navLinks } from '@/content/nav';
import { divisions } from '@/content/divisions';
import { BrandMark } from '@/components/BrandMark/BrandMark';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: Props) {
  // Lock body scroll while open + ESC to close
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile menu"
      aria-hidden={!open}
      className={`fixed inset-0 z-50 bg-obsidian transition-all duration-500 ease-reveal ${
        open ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      {/* Top bar with brand + close */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-hairline">
        <a href="#top" onClick={onClose} aria-label="Gaze Holdings home" className="text-ivory">
          <BrandMark variant="inline" height={16} />
        </a>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="text-ivory hover:text-rose transition-colors p-2 -mr-2"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>
      </div>

      {/* Primary links */}
      <nav aria-label="Primary mobile" className="px-6 py-12 flex flex-col gap-7">
        {navLinks.map((link, i) => {
          const externalProps = link.external
            ? { target: '_blank' as const, rel: 'noopener noreferrer' }
            : {};
          const isAccent = 'accent' in link && link.accent;
          return (
            <a
              key={link.href}
              href={link.href}
              {...externalProps}
              onClick={onClose}
              style={{ transitionDelay: open ? `${i * 60 + 200}ms` : '0ms' }}
              className={`font-display font-extralight text-3xl tracking-tight text-ivory leading-none transition-all duration-700 ease-reveal ${
                open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } ${isAccent ? 'inline-flex items-center gap-2 self-start text-rose' : 'hover:text-rose'}`}
            >
              {isAccent && <span aria-hidden="true">▲</span>}
              {link.label}
            </a>
          );
        })}
      </nav>

      {/* Divisions strip */}
      <div className="px-6 mt-auto py-8 border-t border-hairline">
        <div className="font-display text-[0.55rem] tracking-[0.35em] uppercase text-rose font-medium mb-4">
          The Group
        </div>
        <ul className="flex flex-wrap gap-2">
          {divisions.map(d => {
            const externalProps = d.external
              ? { target: '_blank' as const, rel: 'noopener noreferrer' }
              : {};
            return (
              <li key={d.id}>
                <a
                  href={d.href}
                  {...externalProps}
                  onClick={onClose}
                  className="block px-3 py-2 border border-hairline hover:border-rose hover:text-rose transition-colors font-display text-[0.55rem] tracking-[0.25em] uppercase text-ivory/65"
                >
                  {d.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
