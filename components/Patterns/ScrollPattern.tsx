'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import { MARK_PATHS } from '@/components/Intro/gazeLogo';

/* Blue on the way down, gold on the way back up. */
const DOWN = '#2F4C9E';
const UP = '#B08A4E';

/* One listener for the whole page sets the pattern ink from the scroll direction. */
let watching = false;
function watchDirection() {
  if (watching || typeof window === 'undefined') return;
  watching = true;
  let last = window.scrollY;
  let dir: 'down' | 'up' = 'down';
  document.documentElement.style.setProperty('--pattern-ink', DOWN);
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 2) return;
      const next = y > last ? 'down' : 'up';
      last = y;
      if (next === dir) return;
      dir = next;
      document.documentElement.style.setProperty('--pattern-ink', dir === 'down' ? DOWN : UP);
    },
    { passive: true },
  );
}

/* A pointy-topped hexagon, the shape of the Gaze mark. */
function hex(cx: number, cy: number, r: number) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 90);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
  return { d: `M ${pts.map((p) => p.map((n) => n.toFixed(1)).join(' ')).join(' L ')} Z`, pts };
}

/* Construction lines through opposite corners, run well past the edges as the logo's guides are. */
function guides(cx: number, cy: number, r: number, reach: number) {
  return [0, 1, 2].map((i) => {
    const a = (Math.PI / 180) * (60 * i - 90);
    const dx = Math.cos(a) * (r + reach);
    const dy = Math.sin(a) * (r + reach);
    return `M ${(cx - dx).toFixed(1)} ${(cy - dy).toFixed(1)} L ${(cx + dx).toFixed(1)} ${(cy + dy).toFixed(1)}`;
  });
}

/* `w` is a stroke width: page units when `bold` (it grows with the motif, like the logo's bands), screen pixels otherwise. */
type Shape = { d: string; w: number; o: number; bold?: boolean; t?: string; k?: number };

/* Each variant places its hexagons in the margins, so the lines frame the content instead of crossing the reading line. */
function build(variant: 'showcase' | 'ethos' | 'leadership', w: number, h: number): Shape[] {
  const out: Shape[] = [];
  const add = (cx: number, cy: number, r: number, rings = 2) => {
    // the logo's bold hexagon band, then a lighter inner ring
    out.push({ d: hex(cx, cy, r).d, w: r * 0.1, o: 0.24, bold: true });
    if (rings > 1) out.push({ d: hex(cx, cy, r * 0.74).d, w: r * 0.045, o: 0.2, bold: true });
    // the hexagonal G itself, in outline at the centre
    const k = (r * 0.92) / 700;
    const t = `translate(${(cx - 335 * k).toFixed(1)} ${(cy - 400 * k).toFixed(1)}) scale(${k.toFixed(4)})`;
    MARK_PATHS.forEach((d) => out.push({ d, w: r * 0.035, o: 0.3, bold: true, t, k }));
    // the fine construction lines and guide circle the loader draws first
    guides(cx, cy, r, r * 0.55).forEach((d) => out.push({ d, w: 1.5, o: 0.45 }));
    out.push({ d: `M ${cx - r * 1.18} ${cy} a ${r * 1.18} ${r * 1.18} 0 1 0 ${r * 2.36} 0 a ${r * 1.18} ${r * 1.18} 0 1 0 ${-r * 2.36} 0`, w: 2, o: 0.4 });
  };
  if (variant === 'showcase') {
    add(w * 0.06, h * 0.16, w * 0.16, 3);
    add(w * 0.95, h * 0.32, w * 0.2, 3);
    add(w * 0.1, h * 0.72, w * 0.12);
    add(w * 0.9, h * 0.9, w * 0.14);
  } else if (variant === 'ethos') {
    add(w * 0.94, h * 0.06, w * 0.14, 3);
    add(w * 0.04, h * 0.34, w * 0.11);
    add(w * 0.96, h * 0.55, w * 0.16, 3);
    add(w * 0.06, h * 0.86, w * 0.14);
  } else {
    add(w * 0.02, h * 0.2, w * 0.18, 3);
    add(w * 0.97, h * 0.82, w * 0.13);
  }
  return out;
}

/**
 * Background linework for a Holdings section, drawn from the Gaze mark the way the loader draws the logo: bold
 * hexagon bands as heavy as the mark's own, the hexagonal G in outline, and fine construction lines with a guide circle. The lines draw on as the section scrolls by
 * (and undraw on the way back), blue when scrolling down and gold when scrolling up. It sits beneath the section's
 * content (the section needs `isolate`), so it never covers text.
 */
export function ScrollPattern({ variant }: { variant: 'showcase' | 'ethos' | 'leadership' }) {
  const svg = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    watchDirection();
    const el = svg.current?.parentElement;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: 1440, h: Math.round((1440 * el.offsetHeight) / Math.max(1, el.offsetWidth)) }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const s = svg.current;
    if (!s || !size || prefersReducedMotion()) return;
    const paths = s.querySelectorAll('path');
    const tween = gsap.fromTo(
      paths,
      { strokeDashoffset: 1 },
      {
        strokeDashoffset: 0,
        ease: 'none',
        stagger: { each: 0.35 / paths.length },
        scrollTrigger: { trigger: s.parentElement, start: 'top 85%', end: 'bottom 60%', scrub: 0.8 },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [size]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg ref={svg} className="h-full w-full" viewBox={size ? `0 0 ${size.w} ${size.h}` : '0 0 1440 900'} preserveAspectRatio="none">
        {size &&
          build(variant, size.w, size.h).map((p, i) => (
            <path
              key={i}
              d={p.d}
              transform={p.t}
              pathLength={1}
              fill="none"
              vectorEffect={p.bold ? undefined : 'non-scaling-stroke'}
              strokeDasharray="1"
              strokeLinecap={p.bold ? 'butt' : 'round'}
              strokeLinejoin="miter"
              style={{
                stroke: 'var(--pattern-ink, #2F4C9E)',
                // a scaled G takes its width in its own, unscaled units
                strokeWidth: p.k ? p.w / p.k : p.w,
                opacity: p.o,
                transition: 'stroke 0.6s ease',
              }}
            />
          ))}
      </svg>
    </div>
  );
}
