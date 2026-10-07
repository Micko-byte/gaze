/* eslint-disable @next/next/no-img-element */
import type { CSSProperties, ReactNode } from 'react';
import type { Book } from '@/content/library';

/*
 * The ground each book is set on, after the stone in Natuzzi's catalogue spread: the book's own tone, a fine grain,
 * a scatter of terrazzo flecks and a soft light falling from the top left. All drawn in CSS, no image to load.
 */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.32 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
const FLECKS =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='1' seed='7'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 -3 1.9'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0 0 0 0 0 0.3 0.5'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E\")";

export function bookGround(tone: string): CSSProperties {
  return {
    backgroundColor: tone,
    backgroundImage: `radial-gradient(120% 90% at 18% 0%, rgba(255,255,255,0.22), transparent 60%), ${FLECKS}, ${GRAIN}`,
    backgroundBlendMode: 'soft-light, soft-light, multiply',
  };
}

/** The book's title page, set in the house's type: the closed book of the spread. */
function TitlePage({ book }: { book: Book }) {
  return (
    <div className="flex aspect-[3/4] flex-col justify-between bg-[#F4F1EB] p-[8%] text-press-ink shadow-[0_40px_60px_-30px_rgba(0,0,0,0.55)]">
      <p className="text-center text-[clamp(8px,0.7vw,11px)] uppercase tracking-[0.3em] text-press-rose">Gaze Press Global</p>
      <div className="text-center">
        <p className="font-press-head text-[clamp(18px,2vw,34px)] leading-[1.05]">{book.title}</p>
        <p className="mx-auto mt-3 max-w-[22ch] text-[clamp(9px,0.75vw,12px)] leading-snug text-[#5A5550]">{book.sub}</p>
      </div>
      <p className="text-center font-press-script text-[clamp(18px,1.8vw,30px)] leading-none">{book.author}</p>
    </div>
  );
}

/**
 * A book's spread on its ground: the eyebrow, title, subtitle and an action on the left; on the right its title page
 * beside the cover artwork, like a catalogue lying open on stone. The library sections and the book's own page share
 * this, so choosing a book reads as its section opening out into the page.
 */
export function BookHero({ book, full, action, index }: { book: Book; full?: boolean; action: ReactNode; index?: number }) {
  const Title = full ? 'h1' : 'h2';
  return (
    <div
      className={`relative flex items-center overflow-hidden px-5 md:px-10 ${full ? 'min-h-[100svh] pb-16 pt-28' : 'min-h-[86svh] py-24'}`}
      style={{ ...bookGround(book.tone), color: book.ink }}
    >
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-14 md:grid-cols-[1fr_1.25fr]">
        <div data-loader-target={full ? '' : undefined}>
          <p className="text-[13px] tracking-[-0.01em] opacity-80">
            {index !== undefined && <span className="mr-4 text-[11px]">{String(index + 1).padStart(2, '0')}</span>}
            {book.author}
            {book.shelf === 'authors' ? ' · published for our author' : ' · Gaze Press Global'}
            {book.young ? ' · for young readers' : ''}
          </p>
          <Title className="mt-5 font-press-head text-[clamp(44px,5.4vw,96px)] font-normal leading-[0.98] tracking-[-0.01em]">{book.title}</Title>
          <p className="mt-6 max-w-md text-lg font-light leading-relaxed opacity-85">{book.sub}</p>
          <div className="mt-10">{action}</div>
        </div>
        <div className="relative flex items-center justify-center gap-[3%]">
          <div className="w-[38%] -rotate-[1.5deg]">
            <TitlePage book={book} />
          </div>
          {book.poster ? (
            <div className="w-[58%] rotate-[1deg] overflow-hidden bg-[#F4F1EB] shadow-[0_50px_70px_-35px_rgba(0,0,0,0.6)]">
              <img src={book.poster} alt={`${book.title}, cover artwork`} className="w-full" />
            </div>
          ) : (
            <div className="flex aspect-[3/4] w-[46%] rotate-[1deg] items-center justify-center bg-press-ink p-[6%] text-center text-press-paper shadow-[0_50px_70px_-35px_rgba(0,0,0,0.6)]">
              <p className="font-press-head text-[clamp(20px,2.4vw,40px)] leading-[1.05]">{book.title}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
