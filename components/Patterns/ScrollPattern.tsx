'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

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

type Shape = { d: string; w?: number; o?: number };

/* Each variant places its hexagons in the margins, so the lines frame the content instead of crossing the reading line. */
function build(variant: 'showcase' | 'ethos' | 'leadership', w: number, h: number): Shape[] {
  const out: Shape[] = [];
  const add = (cx: number, cy: number, r: number, rings = 2) => {
    for (let k = 0; k < rings; k++) out.push({ d: hex(cx, cy, r * (1 - k * 0.22)).d, w: k === 0 ? 1.2 : 0.8 });
    guides(cx, cy, r, r * 0.55).forEach((d) => out.push({ d, w: 0.6, o: 0.55 }));
    out.push({ d: `M ${cx - r * 1.18} ${cy} a ${r * 1.18} ${r * 1.18} 0 1 0 ${r * 2.36} 0 a ${r * 1.18} ${r * 1.18} 0 1 0 ${-r * 2.36} 0`, w: 0.6, o: 0.5 });
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
 * Background linework for a Holdings section, drawn from the Gaze mark the way the loader draws the logo: hexagons
 * with construction lines run out past their corners, and a guide circle. The lines draw on as the section scrolls by
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
              pathLength={1}
              fill="none"
              vectorEffect="non-scaling-stroke"
              strokeDasharray="1"
              strokeLinecap="round"
              style={{ stroke: 'var(--pattern-ink, #2F4C9E)', strokeWidth: p.w ?? 1, opacity: (p.o ?? 1) * 0.55, transition: 'stroke 0.6s ease' }}
            />
          ))}
      </svg>
    </div>
  );
}
