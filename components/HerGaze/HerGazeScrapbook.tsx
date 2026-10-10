'use client';

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from 'react';

type Item = { src: string; alt: string; video?: boolean; poster?: string };

/* Stills and short loops from her own convenings and her podcast. */
const media = {
  panel: { src: '/images/hergaze/panel.jpg', alt: 'A panel on the Her Gaze stage' },
  smiles: { src: '/images/hergaze/smiles.jpg', alt: 'Women in the audience, laughing' },
  podcast: { src: '/images/hergaze/podcast.jpg', alt: 'The founder in conversation, holding Stay by Design' },
  speaker: { src: '/images/hergaze/speaker.jpg', alt: 'A speaker with a microphone at a Her Gaze convening' },
  audience: { src: '/images/hergaze/audience.jpg', alt: 'The audience facing the purple stage' },
  launch: { src: '/images/hergaze/launch.jpg', alt: 'A book launch banner at the venue' },
  clipAudience: { src: '/video/hergaze/clip-audience.mp4', poster: '/video/hergaze/clip-audience.jpg', alt: 'The audience applauding', video: true },
  clipFounder: { src: '/video/hergaze/clip-founder.mp4', poster: '/video/hergaze/clip-founder.jpg', alt: 'The founder speaking on her podcast', video: true },
  clipStage: { src: '/video/hergaze/clip-stage.mp4', poster: '/video/hergaze/clip-stage.jpg', alt: 'A speaker on the Her Gaze stage', video: true },
} satisfies Record<string, Item>;

/* The scrapbook, after Very Work In Progress. Positions are percentages of the collage box. */
const collage: Array<{ item: Item; x: number; y: number; w: number; r: number; framed?: boolean }> = [
  { item: media.panel, x: 36, y: 0, w: 26, r: -2 },
  { item: media.clipAudience, x: 4, y: 16, w: 25, r: 3 },
  { item: media.clipFounder, x: 71, y: 6, w: 16, r: -4, framed: true },
  { item: media.speaker, x: 30, y: 40, w: 30, r: 1.5, framed: true },
  { item: media.clipStage, x: 65, y: 56, w: 26, r: 3 },
  { item: media.launch, x: 5, y: 60, w: 21, r: -3 },
  { item: media.smiles, x: 46, y: 76, w: 17, r: 4 },
];
const cards = [
  { label: 'The Singles Kingdom Summit', x: 9, y: 2, bg: 'bg-her-terracotta text-white', r: -3 },
  { label: 'The Place of Waiting', x: 69, y: 38, bg: 'bg-her-noir text-her-blush', r: 2 },
  { label: 'The Rebuilding Conference', x: 22, y: 86, bg: 'bg-her-magenta text-white', r: -1.5 },
];

/* Everything in the gallery: the collage first, then the rest of the convenings. */
const gallery: Item[] = [
  ...collage.map((c) => c.item),
  media.podcast,
  media.audience,
  ...Array.from({ length: 10 }, (_, i) => ({
    src: `/images/hergaze/gallery/${String(i + 1).padStart(2, '0')}.jpg`,
    alt: i < 8 ? 'A moment from a Her Gaze convening' : 'The founder on her podcast',
  })),
];

function Media({ item, className = '' }: { item: Item; className?: string }) {
  return item.video ? (
    <video src={item.src} poster={item.poster} muted loop playsInline autoPlay preload="metadata" aria-label={item.alt} className={className} />
  ) : (
    <img src={item.src} alt={item.alt} loading="lazy" className={className} />
  );
}

/**
 * The scrapbook under the Her Gaze statement: stills and moving clips from her convenings set at an angle, the three
 * convocations pinned among them, and a small button that opens the whole gallery.
 */
export function HerGazeScrapbook() {
  const [open, setOpen] = useState<number | null>(null);
  const [grid, setGrid] = useState(false);
  const close = useCallback(() => {
    setOpen(null);
    setGrid(false);
  }, []);

  useEffect(() => {
    if (!grid && open === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (open !== null) setOpen(null);
        else close();
      }
      if (open !== null && e.key === 'ArrowRight') setOpen((i) => ((i ?? 0) + 1) % gallery.length);
      if (open !== null && e.key === 'ArrowLeft') setOpen((i) => ((i ?? 0) - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [grid, open, close]);

  return (
    <section aria-label="From our convenings" className="px-5 pb-28 md:px-10">
      <div className="relative mx-auto hidden aspect-[16/11] max-w-[1200px] md:block">
        {collage.map((c, i) => (
          <button
            key={c.item.src}
            type="button"
            onClick={() => {
              setGrid(true);
              setOpen(i);
            }}
            aria-label={`Open: ${c.item.alt}`}
            className={`absolute block transition-transform duration-700 ease-reveal hover:z-10 hover:scale-[1.03] ${c.framed ? 'bg-white p-3 shadow-[0_24px_50px_-30px_rgba(26,26,26,0.6)] ring-2 ring-her-noir' : 'shadow-[0_24px_50px_-34px_rgba(26,26,26,0.7)]'}`}
            style={{ left: `${c.x}%`, top: `${c.y}%`, width: `${c.w}%`, rotate: `${c.r}deg` }}
          >
            <Media item={c.item} className="block w-full" />
          </button>
        ))}
        {cards.map((c) => (
          <a
            key={c.label}
            href="#convocations"
            data-no-transition
            className={`absolute z-[5] flex w-[19%] items-center justify-center px-4 py-6 text-center font-her-head text-[clamp(16px,1.5vw,24px)] leading-tight shadow-[0_18px_40px_-26px_rgba(26,26,26,0.7)] transition-transform duration-500 hover:scale-[1.04] ${c.bg}`}
            style={{ left: `${c.x}%`, top: `${c.y}%`, rotate: `${c.r}deg` }}
          >
            {c.label}
          </a>
        ))}
      </div>

      {/* phones: the same pictures and clips, two by two */}
      <div className="grid grid-cols-2 gap-4 md:hidden">
        {collage.map((c, i) => (
          <button key={c.item.src} type="button" onClick={() => { setGrid(true); setOpen(i); }} aria-label={`Open: ${c.item.alt}`} style={{ rotate: `${c.r / 2}deg` }}>
            <Media item={c.item} className="aspect-square w-full object-cover" />
          </button>
        ))}
      </div>

      <div className="mt-10 text-center md:mt-6">
        <button
          type="button"
          onClick={() => setGrid(true)}
          className="rounded-full border border-her-noir px-6 py-2.5 text-[11px] uppercase tracking-[0.24em] transition-colors hover:bg-her-noir hover:text-her-blush"
        >
          View gallery <span className="ml-1 text-her-magenta">({gallery.length})</span>
        </button>
      </div>

      {grid && (
        <div className="fixed inset-0 z-[70] overflow-y-auto bg-her-noir text-her-blush" role="dialog" aria-modal="true" aria-label="Her Gaze gallery">
          <div className="sticky top-0 z-10 flex items-center justify-between bg-her-noir px-5 py-5 md:px-10">
            <p className="font-her-head text-[clamp(28px,3vw,44px)] leading-none">The gallery</p>
            <button type="button" onClick={close} className="rounded-full border border-[rgba(241,228,214,0.4)] px-5 py-2 text-[11px] uppercase tracking-[0.24em] transition-colors hover:bg-her-magenta hover:text-white">
              Close
            </button>
          </div>
          <ul className="columns-2 gap-4 px-5 pb-16 md:columns-4 md:px-10">
            {gallery.map((item, i) => (
              <li key={item.src} className="mb-4 break-inside-avoid">
                <button type="button" onClick={() => setOpen(i)} aria-label={`Open: ${item.alt}`} className="group relative block w-full overflow-hidden">
                  <Media item={item} className="w-full transition-transform duration-700 group-hover:scale-[1.03]" />
                  {item.video && <span className="absolute left-3 top-3 rounded-full bg-her-magenta px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white">Film</span>}
                </button>
              </li>
            ))}
          </ul>

          {open !== null && (
            <div className="fixed inset-0 z-20 flex items-center justify-center bg-[rgba(26,26,26,0.94)] p-5 md:p-16" onClick={() => setOpen(null)}>
              <div className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
                {gallery[open].video ? (
                  <video key={gallery[open].src} src={gallery[open].src} autoPlay muted loop playsInline controls className="max-h-[80vh] w-auto" />
                ) : (
                  <img src={gallery[open].src} alt={gallery[open].alt} className="max-h-[80vh] w-auto" />
                )}
                <div className="mt-4 flex items-center justify-between gap-6 text-[11px] uppercase tracking-[0.24em]">
                  <button type="button" onClick={() => setOpen((open - 1 + gallery.length) % gallery.length)} aria-label="Previous">← Previous</button>
                  <span>{open + 1} / {gallery.length}</span>
                  <button type="button" onClick={() => setOpen((open + 1) % gallery.length)} aria-label="Next">Next →</button>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(null)} className="absolute right-5 top-5 text-[11px] uppercase tracking-[0.24em]">Back to the grid</button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
