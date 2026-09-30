'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion, hasFinePointer } from '@/lib/motion';

export function Cursor() {
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;

    setActive(true);
    document.documentElement.setAttribute('data-custom-cursor', 'on');

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let rafId = 0;
    let last = performance.now();
    let placed = false;

    const onMove = (event: MouseEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      // Jump to the first known position rather than gliding in from 0,0.
      if (!placed) {
        placed = true;
        x = tx;
        y = ty;
      }
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor="hover"]');
      setHovering(Boolean(interactive));
    };

    // Follow rate per second, converted to a per-frame factor from the real
    // frame delta so tracking feels identical at 60Hz and 144Hz. A fixed
    // per-frame factor tightens up as refresh rate rises.
    const FOLLOW = 26;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const ease = 1 - Math.exp(-FOLLOW * dt);

      x += (tx - x) * ease;
      y += (ty - y) * ease;
      // Settle exactly on target instead of creeping through sub-pixels.
      if (Math.abs(tx - x) < 0.05) x = tx;
      if (Math.abs(ty - y) < 0.05) y = ty;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeAttribute('data-custom-cursor');
    };
  }, []);

  if (!active) return null;

  return (
    <div
      ref={cursorRef}
      data-testid="custom-cursor"
      aria-hidden="true"
      // Only opacity transitions here. Transitioning transform would fight the
      // rAF loop, which retargets a fresh 300ms ease on every single frame.
      className={`fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference transition-opacity duration-300 will-change-transform ${
        hovering ? 'opacity-100' : 'opacity-90'
      }`}
      style={{ width: 36, height: 36 }}
    >
      <span
        className={`absolute inset-0 rounded-full border border-[var(--house-rose)] transition-[transform,opacity,background-color,border-color] duration-200 ${
          hovering ? 'scale-125 border-[var(--champagne)]' : 'scale-100'
        }`}
      />
      <span
        className={`absolute left-1/2 top-1/2 h-4 w-[1px] -translate-x-1/2 -translate-y-1/2 bg-[var(--house-rose)] transition-[transform,opacity,background-color,border-color] duration-200 ${
          hovering ? 'opacity-100 scale-y-125 bg-[var(--champagne)]' : 'opacity-0 scale-y-75'
        }`}
      />
      <span
        className={`absolute left-1/2 top-1/2 h-[1px] w-4 -translate-x-1/2 -translate-y-1/2 bg-[var(--house-rose)] transition-[transform,opacity,background-color,border-color] duration-200 ${
          hovering ? 'opacity-100 scale-x-125 bg-[var(--champagne)]' : 'opacity-0 scale-x-75'
        }`}
      />
      <span
        className={`absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--house-rose)] transition-[transform,opacity,background-color,border-color] duration-200 ${
          hovering ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      />
    </div>
  );
}
