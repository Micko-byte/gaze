'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion, hasFinePointer } from '@/lib/motion';

export function Cursor() {
  const [active, setActive] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    setActive(true);
    document.documentElement.setAttribute('data-custom-cursor', 'on');

    let x = 0, y = 0, tx = 0, ty = 0;
    let rafId = 0;

    function onMove(e: MouseEvent) { tx = e.clientX; ty = e.clientY; }
    function onOver(e: MouseEvent) {
      const t = e.target as HTMLElement;
      const interactive = t.closest('a, button, [role="button"], input, textarea, select, [data-cursor="hover"]');
      ringRef.current?.classList.toggle('cursor-hover', Boolean(interactive));
    }

    function tick() {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${x - 14}px, ${y - 14}px, 0)`;
      rafId = requestAnimationFrame(tick);
    }

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
      ref={ringRef}
      data-testid="custom-cursor"
      aria-hidden="true"
      style={{
        position: 'fixed', top: 0, left: 0, width: 28, height: 28,
        borderRadius: '50%', border: '1px solid var(--house-rose)',
        pointerEvents: 'none', zIndex: 9999,
        transition: 'width 0.3s var(--motion-base), height 0.3s ease, border-color 0.3s ease',
        mixBlendMode: 'difference',
      }}
    />
  );
}
