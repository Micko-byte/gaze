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

function Layer({ media, state, panel, still }: { media: MontageMedia; state: 'on' | 'under' | 'off'; panel: number; still: boolean }) {
  return (
    <div
      data-state={state}
      className="absolute inset-0 overflow-hidden"
      style={{
        zIndex: state === 'on' ? 2 : state === 'under' ? 1 : 0,
        opacity: state === 'off' ? 0 : 1,
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
        {'video' in media && !still ? (
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
 * few seconds the next house dissolves in over the last, panel by panel. With reduced motion or Save-Data, the first
 * house stands still.
 */
export function HeroVideo() {
  const [still, setStill] = useState(true);
  const [chapter, setChapter] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!prefersReducedMotion() && !isSaveData()) setStill(false);
  }, []);

  // the next house, while the hero is on screen and the tab is showing
  useEffect(() => {
    if (still || !root.current) return;
    let onScreen = true;
    const io = new IntersectionObserver(([e]) => (onScreen = e.isIntersecting));
    io.observe(root.current);
    const t = window.setInterval(() => {
      if (!onScreen || document.hidden) return;
      setChapter((c) => {
        setPrev(c);
        return (c + 1) % montage.length;
      });
    }, MONTAGE_HOLD_MS);
    return () => {
      window.clearInterval(t);
      io.disconnect();
    };
  }, [still]);

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
    if (still || !root.current) return;
    const next = (chapter + 1) % montage.length;
    const cols = Array.from(root.current.querySelectorAll<HTMLElement>('[data-panel]'));
    const timers: number[] = [];
    cols.forEach((col) => {
      const shown = col.offsetParent !== null;
      col.querySelectorAll<HTMLVideoElement>('video').forEach((video) => {
        const at = Number(video.closest<HTMLElement>('[data-chapter]')!.dataset.chapter);
        if (at === chapter && shown) {
          video.preload = 'auto';
          video.currentTime = 0;
          video.play().catch(() => {});
        } else if (at === next && shown) {
          video.preload = 'auto';
        } else if (at === prev) {
          // keep the outgoing film running until the wipe has covered it
          timers.push(window.setTimeout(() => video.pause(), 1800));
        } else {
          video.pause();
        }
      });
    });
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [chapter, prev, still]);

  return (
    <div ref={root} className="absolute inset-0 overflow-hidden bg-ink" aria-hidden="true">
      <div
        className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        style={{ transform: 'translate3d(calc(var(--hero-x, 0) * 10px), calc(var(--hero-y, 0) * 8px), 0) scale(1.04)' }}
      >
        {[0, 1, 2, 3].map((panel) => (
          <div key={panel} data-panel={panel} className={`relative h-full overflow-hidden brightness-[1.04] ${SHOWN[panel]}`}>
            {montage.map((c, i) => (
              <div key={c.house} data-chapter={i}>
                <Layer media={c.panels[panel]} panel={panel} still={still} state={i === chapter ? 'on' : i === prev ? 'under' : 'off'} />
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
        <span key={chapter} className="font-display text-[0.62rem] uppercase tracking-[0.36em] text-ivory/80 animate-[stat-appear_0.9s_ease-out]">
          {montage[chapter].house}
        </span>
      </div>
    </div>
  );
}
