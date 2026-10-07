'use client';

import { useEffect, useRef } from 'react';
import { ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

/**
 * A scatter of gold points that gathers into a word as the section scrolls past, after hobro.digital. The points are
 * sampled from the word drawn in heavy Metropolis on an offscreen canvas (a dense face gives a legible cloud); each has its own start and a small delay, so the
 * word assembles rather than snapping together.
 */
export function DotWord({ word, color = '#DEBA78' }: { word: string; color?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    let dots: { x: number; y: number; sx: number; sy: number; d: number }[] = [];
    let progress = prefersReducedMotion() ? 1 : 0;
    let trigger: ScrollTrigger | undefined;
    let cancelled = false;

    const draw = () => {
      const w = c.clientWidth;
      const h = c.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      for (const p of dots) {
        // each point waits its turn, then eases home
        const t = Math.min(1, Math.max(0, (progress - p.d) / (1 - p.d)));
        const e = 1 - Math.pow(1 - t, 3);
        ctx.beginPath();
        ctx.arc(p.sx + (p.x - p.sx) * e, p.sy + (p.y - p.sy) * e, 1.4 + e * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = c.clientWidth;
      const h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // draw the word offscreen and keep a point wherever it is inked
      const off = document.createElement('canvas');
      off.width = w;
      off.height = h;
      const o = off.getContext('2d')!;
      const family = getComputedStyle(document.documentElement).getPropertyValue('--font-metropolis') || 'sans-serif';
      let size = h * 0.95;
      o.font = `600 ${size}px ${family}`;
      const fit = o.measureText(word).width;
      if (fit > w * 0.94) size *= (w * 0.94) / fit;
      o.font = `600 ${size}px ${family}`;
      o.textAlign = 'center';
      o.textBaseline = 'middle';
      o.fillText(word, w / 2, h / 2);
      const data = o.getImageData(0, 0, w, h).data;
      const step = Math.max(4, Math.round(w / 230));
      dots = [];
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          if (data[(y * w + x) * 4 + 3] > 140) {
            dots.push({ x, y, sx: Math.random() * w, sy: Math.random() * h * 1.6 - h * 0.3, d: Math.random() * 0.45 });
          }
        }
      }
      draw();
    };

    document.fonts.ready.then(() => {
      if (cancelled) return;
      build();
      if (!prefersReducedMotion()) {
        trigger = ScrollTrigger.create({
          trigger: c,
          start: 'top 85%',
          end: 'center 45%',
          scrub: 0.6,
          onUpdate: (self) => {
            progress = self.progress;
            draw();
          },
        });
      }
    });

    let timer = 0;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(build, 150);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelled = true;
      trigger?.kill();
      window.removeEventListener('resize', onResize);
      window.clearTimeout(timer);
    };
  }, [word, color]);

  return <canvas ref={canvas} role="img" aria-label={word} className="block h-[clamp(140px,22vw,320px)] w-full" />;
}
