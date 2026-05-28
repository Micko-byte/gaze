'use client';

import { useEffect, useState } from 'react';
import { shopConfig, shopHref } from '@/content/shop';

/**
 * Floating Shop pill, bottom-right.
 * Hidden during the Hero so it doesn't compete with the primary CTA;
 * fades in after the visitor has scrolled past ~50% of the viewport.
 */
export function ShopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={shopHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={shopConfig.ariaLabel}
      data-cursor="hover"
      className={`fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 inline-flex items-center gap-2 px-5 py-3 bg-rose text-obsidian font-display text-[0.65rem] tracking-[0.3em] uppercase font-medium shadow-[0_8px_28px_-12px_rgba(201,155,175,0.55)] transition-all duration-500 ease-reveal hover:bg-champagne ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <span aria-hidden="true" className="text-base leading-none">▲</span>
      <span className="hidden md:inline">{shopConfig.longLabel}</span>
      <span className="md:hidden">{shopConfig.label}</span>
    </a>
  );
}
