'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Book } from '@/content/library';
import { prefersReducedMotion } from '@/lib/motion';
import { BookHero } from './BookHero';

const OPEN_MS = 750;

/**
 * One book's section in the library. Choosing to buy opens the section out to fill the screen (a copy of the book's
 * page hero, uncovered from the section's own rectangle), then the book's page takes over beneath it.
 */
export function BookFeature({ book, index }: { book: Book; index: number }) {
  const router = useRouter();
  const section = useRef<HTMLElement>(null);
  const [from, setFrom] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  // build the opening copy (hidden) as soon as the reader reaches for the button, so the click only has to animate
  const [primed, setPrimed] = useState(false);
  const href = `/press/books/${book.slug}`;

  const buy = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = section.current;
    if (!el || prefersReducedMotion()) {
      router.push(href);
      return;
    }
    router.prefetch(href);
    const r = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setFrom(`inset(${Math.max(0, r.top)}px ${vw - r.right}px ${Math.max(0, vh - r.bottom)}px ${r.left}px)`);
    // next frame: let the copy paint at the section's rectangle, then open it to the whole screen
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
    window.setTimeout(() => router.push(href), OPEN_MS);
  };

  const prime = () => {
    if (primed) return;
    setPrimed(true);
    router.prefetch(href);
  };

  const action = (
    <a
      href={href}
      data-no-transition
      onPointerEnter={prime}
      onFocus={prime}
      onClick={buy}
      className="inline-block rounded-full px-7 py-3.5 text-[14px] tracking-[-0.01em] transition-transform duration-300 hover:scale-[1.04]"
      style={{ background: book.ink, color: book.tone }}
    >
      Buy this book
    </a>
  );

  return (
    <section ref={section} id={`book-${book.slug}`} aria-label={book.title} className="scroll-mt-[72px]">
      <BookHero book={book} index={index} action={action} />
      {(primed || from) && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[60] will-change-[clip-path]"
          style={{
            visibility: from ? 'visible' : 'hidden',
            clipPath: open ? 'inset(0px 0px 0px 0px)' : (from ?? 'inset(50%)'),
            transition: open ? `clip-path ${OPEN_MS}ms cubic-bezier(0.76, 0, 0.24, 1)` : 'none',
          }}
        >
          <BookHero book={book} full action={<span className="inline-block rounded-full px-7 py-3.5 text-[14px]" style={{ background: book.ink, color: book.tone }}>Buy this book</span>} />
        </div>
      )}
    </section>
  );
}
