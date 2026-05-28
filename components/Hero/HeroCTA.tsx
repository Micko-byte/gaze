'use client';

import { useCallback } from 'react';

export function HeroCTA({ label, href }: { label: string; href: string }) {
  const onClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    // Lenis hooks window.scrollTo automatically for smooth easing.
    const top = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: 'smooth' });
  }, [href]);

  return (
    <a
      href={href}
      onClick={onClick}
      className="inline-block mt-10 px-8 py-3.5 border border-rose font-display text-[0.7rem] tracking-[0.35em] uppercase text-ivory font-medium hover:bg-rose hover:text-obsidian transition-colors duration-500 ease-reveal"
    >
      {label}
    </a>
  );
}
