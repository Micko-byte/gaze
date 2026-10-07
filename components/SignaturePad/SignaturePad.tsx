'use client';

import { useEffect, useRef } from 'react';

/** A hand-signature pad: draw with a finger, pen or mouse. Reports the signature as a PNG data URL, or null when cleared. */
export function SignaturePad({ onChange, id }: { onChange: (png: string | null) => void; id?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const inked = useRef(false);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    let width = 0;
    // size the bitmap to the box; on phones a scroll can fire resize, so refit only when the width really changes,
    // and carry the ink across so a signature is never lost
    const fit = () => {
      const r = c.getBoundingClientRect();
      if (r.width === width) return;
      width = r.width;
      const ink = inked.current ? c.toDataURL('image/png') : null;
      const dpr = window.devicePixelRatio || 1;
      c.width = r.width * dpr;
      c.height = r.height * dpr;
      const ctx = c.getContext('2d');
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      ctx.lineWidth = 1.8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#1E1E22';
      if (ink) {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0, r.width, r.height);
        img.src = ink;
      }
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  const point = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top] as const;
  };

  return (
    <div>
      <canvas
        ref={canvas}
        id={id}
        aria-label="Signature pad: sign with your finger, pen or mouse"
        className="h-40 w-full cursor-crosshair touch-none bg-white ring-1 ring-inset ring-[rgba(30,30,34,0.2)]"
        onPointerDown={(e) => {
          const ctx = e.currentTarget.getContext('2d');
          if (!ctx) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          drawing.current = true;
          const [x, y] = point(e);
          ctx.beginPath();
          ctx.moveTo(x, y);
        }}
        onPointerMove={(e) => {
          if (!drawing.current) return;
          const ctx = e.currentTarget.getContext('2d');
          if (!ctx) return;
          const [x, y] = point(e);
          ctx.lineTo(x, y);
          ctx.stroke();
          inked.current = true;
        }}
        onPointerUp={(e) => {
          drawing.current = false;
          if (inked.current) onChange(e.currentTarget.toDataURL('image/png'));
        }}
      />
      <button
        type="button"
        onClick={() => {
          const c = canvas.current;
          c?.getContext('2d')?.clearRect(0, 0, c.width, c.height);
          inked.current = false;
          onChange(null);
        }}
        className="mt-2 text-[12px] underline underline-offset-4 opacity-60 transition-opacity hover:opacity-100"
      >
        clear signature
      </button>
    </div>
  );
}
