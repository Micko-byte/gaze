'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion, isSaveData } from '@/lib/motion';
import { montage, MONTAGE_HOLD_MS, type MontageMedia } from '@/content/heroMontage';

/* How bright a frame is where the words sit (0 dark, 1 white), read once from its poster or photograph. */
const brightness = new Map<string, number>();
function measure(src: string): Promise<number> {
  const known = brightness.get(src);
  if (known !== undefined) return Promise.resolve(known);
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 18;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(0.5);
      ctx.drawImage(img, 0, 0, 18, 32);
      // the middle band of the frame, behind the headline
      const d = ctx.getImageData(0, 10, 18, 12).data;
      let sum = 0;
      for (let i = 0; i < d.length; i += 4) sum += 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
      const l = sum / (d.length / 4) / 255;
      brightness.set(src, l);
      resolve(l);
    };
    img.onerror = () => resolve(0.5);
    img.src = src;
  });
}

/* Four panels on a wide screen, three on a tablet, two on a small one, one on a phone. */
const SHOWN = ['block', 'hidden sm:block', 'hidden md:block', 'hidden lg:block'];
const STAGGER = 0.14;

/* The next house may wait this much longer than its turn for its films to load, then it comes up on its posters. */
const MAX_WAIT_MS = 9000;

/** Each film needs about 0.9 Mbps. A line that can't carry every panel shown still gets the montage, on still frames. */
function isSlowLine(): boolean {
  // @ts-expect-error: connection is non-standard but widely available
  const line: { effectiveType?: string; downlink?: number } | undefined = navigator.connection;
  if (!line) return false;
  if (line.effectiveType?.includes('2g')) return true;
  const panels = [1024, 768, 640].findIndex((w) => window.matchMedia(`(min-width: ${w}px)`).matches);
  const shown = panels === -1 ? 1 : 4 - panels;
  return Boolean(line.downlink) && line.downlink! < shown * 0.9 * 1.2;
}

function Layer({ media, state, panel, films }: { media: MontageMedia; state: 'on' | 'under' | 'off'; panel: number; films: boolean }) {
  return (
    <div
      data-state={state}
      className="absolute inset-0 overflow-hidden"
      style={{
        zIndex: state === 'on' ? 2 : state === 'under' ? 1 : 0,
        opacity: state === 'off' ? 0 : 1,
        visibility: state === 'off' ? 'hidden' : 'visible',
        // only the arriving layer animates: it dissolves in over the last house, panel after panel
        transition: state === 'on' ? `opacity 1.6s ease-in-out ${panel * STAGGER}s` : 'none',
      }}
    >
      {/* every frame, film or photograph, drifts slowly the whole time it shows, as Natuzzi's films do */}
      <div
        className="h-full w-full"
        style={{
          transform: state === 'on' ? 'scale(1.02)' : state === 'under' ? 'scale(1.02)' : 'scale(1.12)',
          transition: state === 'on' ? `transform ${MONTAGE_HOLD_MS / 1000 + 2}s cubic-bezier(0.25, 0.1, 0.25, 1) ${panel * STAGGER}s` : 'none',
        }}
      >
        {'video' in media && films ? (
          <video muted loop playsInline preload="none" poster={media.poster} className="h-full w-full object-cover">
            <source src={media.video} type="video/mp4" />
          </video>
        ) : (
          <img src={'video' in media ? media.poster : media.image} alt="" className="h-full w-full object-cover" />
        )}
      </div>
    </div>
  );
}

/**
 * Behind "A House of Brands": a luxury montage of the houses in four tall panels set edge to edge, bright, as
 * Natuzzi's landing is. Films play at their own quality beside her photographs, everything drifting slowly; every
 * few seconds the next house dissolves in over the last, panel by panel. Four films at once are heavy, so the next
 * house loads while this one shows and only comes up once it can play. With reduced motion or Save-Data the first house
 * stands still; on a slow line the montage runs on still frames.
 */
export function HeroVideo() {
  const [still, setStill] = useState(true);
  const [films, setFilms] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || isSaveData()) return;
    setStill(false);
    setFilms(!isSlowLine());
  }, []);

  // the next house, while the hero is on screen and the tab is showing, once its films can play
  useEffect(() => {
    if (still || !root.current) return;
    const el = root.current;
    let onScreen = true;
    const io = new IntersectionObserver(([e]) => (onScreen = e.isIntersecting));
    io.observe(el);
    const next = (chapter + 1) % montage.length;
    const started = performance.now();
    const ready = () =>
      Array.from(el.querySelectorAll<HTMLElement>(`[data-chapter="${next}"] video`))
        .filter((v) => v.closest<HTMLElement>('[data-panel]')!.offsetParent !== null)
        .every((v) => (v as HTMLVideoElement).readyState >= 3);
    const t = window.setInterval(() => {
      const waited = performance.now() - started;
      if (waited < MONTAGE_HOLD_MS || !onScreen || document.hidden) return;
      if (!ready() && waited < MONTAGE_HOLD_MS + MAX_WAIT_MS) return;
      setPrev(chapter);
      setChapter(next);
    }, 250);
    return () => {
      window.clearInterval(t);
      io.disconnect();
    };
  }, [still, chapter]);

  // the shade behind the words follows the frames behind them: deeper over bright skies and pools, lighter at night
  useEffect(() => {
    const section = root.current?.closest('section');
    const words = section?.querySelector('[data-loader-target]');
    if (!root.current || !section || !words) return;
    const box = words.getBoundingClientRect();
    const srcs = Array.from(root.current.querySelectorAll<HTMLElement>('[data-panel]'))
      .filter((col) => {
        const r = col.getBoundingClientRect();
        return col.offsetParent !== null && r.right > box.left && r.left < box.right;
      })
      .map((col) => {
        const m = montage[chapter].panels[Number(col.dataset.panel)];
        return 'video' in m ? m.poster : m.image;
      });
    let live = true;
    Promise.all(srcs.map(measure)).then((ls) => {
      if (!live || !ls.length) return;
      const l = ls.reduce((a, b) => a + b, 0) / ls.length;
      section.style.setProperty('--hero-shade', Math.min(1, Math.max(0.25, (l - 0.15) / 0.45)).toFixed(2));
    });
    return () => {
      live = false;
    };
  }, [chapter]);

  // play the house on screen from its start, load the next one, rest the others
  useEffect(() => {
    if (!films || !root.current) return;
    const next = (chapter + 1) % montage.length;
    const cols = Array.from(root.current.querySelectorAll<HTMLElement>('[data-panel]'));
    const timers: number[] = [];
    const playing: HTMLVideoElement[] = [];
    const nextUp: HTMLVideoElement[] = [];
    const undo: Array<() => void> = [];
    cols.forEach((col) => {
      const shown = col.offsetParent !== null;
      col.querySelectorAll<HTMLVideoElement>('video').forEach((video) => {
        const at = Number(video.closest<HTMLElement>('[data-chapter]')!.dataset.chapter);
        if (at === chapter && shown) {
          playing.push(video);
          video.preload = 'auto';
          if (video.currentTime > 0) video.currentTime = 0;
          // its poster holds until it can really play, so a film never starts and stutters
          if (video.readyState >= 3) {
            video.play().catch(() => {});
          } else {
            const go = () => video.play().catch(() => {});
            video.addEventListener('canplay', go, { once: true });
            undo.push(() => video.removeEventListener('canplay', go));
            if (video.readyState === 0) video.load();
          }
        } else if (at === next && shown) {
          nextUp.push(video);
        } else if (at === prev) {
          // keep the outgoing film running until the dissolve has covered it
          timers.push(window.setTimeout(() => video.pause(), 1800));
        } else {
          video.pause();
        }
      });
    });
    // the next house starts loading only once this one has what it needs, so they never compete for the line
    const started = performance.now();
    const check = window.setInterval(() => {
      if (!playing.every((v) => v.readyState >= 4) && performance.now() - started < 5000) return;
      window.clearInterval(check);
      nextUp.forEach((v) => {
        v.preload = 'auto';
        if (v.readyState === 0) v.load();
      });
    }, 300);
    return () => {
      window.clearInterval(check);
      timers.forEach((t) => window.clearTimeout(t));
      undo.forEach((u) => u());
    };
  }, [chapter, prev, films]);

  return (
    <div ref={root} className="absolute inset-0 overflow-hidden bg-ink" aria-hidden="true">
      <div
        data-hero-grid
        className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        style={{ transform: 'scale(1.04)' }}
      >
        {[0, 1, 2, 3].map((panel) => (
          <div key={panel} data-panel={panel} className={`relative h-full overflow-hidden ${SHOWN[panel]}`}>
            {montage.map((c, i) => (
              <div key={c.house} data-chapter={i}>
                <Layer media={c.panels[panel]} panel={panel} films={films} state={i === chapter ? 'on' : i === prev ? 'under' : 'off'} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* which house is showing, and how far through the montage */}
      <div className="absolute bottom-8 left-6 z-10 hidden items-center gap-5 md:flex md:left-10">
        <div className="flex gap-1.5">
          {montage.map((c, i) => (
            <span key={c.house} className={`h-px w-6 transition-colors duration-700 ${i === chapter ? 'bg-ivory' : 'bg-[rgba(243,239,230,0.3)]'}`} />
          ))}
        </div>
        <span key={chapter} className="font-display text-[0.62rem] uppercase tracking-[0.36em] text-ivory [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] animate-[stat-appear_0.9s_ease-out]">
          {montage[chapter].house}
        </span>
      </div>
    </div>
  );
}
