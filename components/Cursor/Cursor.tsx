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

    const onMove = (event: MouseEvent) => {
      tx = event.clientX;
      ty = event.clientY;
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor="hover"]');
      setHovering(Boolean(interactive));
    };

    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
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
      className={`fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference transition-[opacity,transform] duration-300 ${
        hovering ? 'opacity-100' : 'opacity-90'
      }`}
      style={{ width: 36, height: 36 }}
    >
      <span
        className={`absolute inset-0 rounded-full border border-[var(--house-rose)] transition-all duration-300 ${
          hovering ? 'scale-125 border-[var(--champagne)]' : 'scale-100'
        }`}
      />
      <span
        className={`absolute left-1/2 top-1/2 h-4 w-[1px] -translate-x-1/2 -translate-y-1/2 bg-[var(--house-rose)] transition-all duration-300 ${
          hovering ? 'opacity-100 scale-y-125 bg-[var(--champagne)]' : 'opacity-0 scale-y-75'
        }`}
      />
      <span
        className={`absolute left-1/2 top-1/2 h-[1px] w-4 -translate-x-1/2 -translate-y-1/2 bg-[var(--house-rose)] transition-all duration-300 ${
          hovering ? 'opacity-100 scale-x-125 bg-[var(--champagne)]' : 'opacity-0 scale-x-75'
        }`}
      />
      <span
        className={`absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--house-rose)] transition-all duration-300 ${
          hovering ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      />
    </div>
  );
}
