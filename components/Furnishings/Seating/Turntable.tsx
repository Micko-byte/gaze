'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import { chairImage, chairViews, turnOrder, type ChairView } from '@/content/executiveSeating';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import { reveal, turn } from '@/lib/sound';
import { ChairTurn } from './ChairTurn';

const STEP_PX = 64;
const count = turnOrder.length;

/**
 * The chair on its turntable: drag or swipe to turn it, or scroll past it on a wide screen and it comes round on its
 * own. The five views of her brief sit underneath; the detail opens as a round glass over the chair. Each step makes a
 * soft sound, through the site's own Music switch.
 */
export function Turntable({ slug, title }: { slug: string; title: string }) {
  const [angle, setAngle] = useState(0);
  const [spin, setSpin] = useState(0);
  const [detail, setDetail] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const sweep = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number } | null>(null);
  const live = useRef({ angle: 0, detail: false });

  const moveTo = (next: number, by: number) => {
    live.current.angle = next;
    setAngle(next);
    setSpin((s) => s + by);
    turn();
    if (sweep.current && !prefersReducedMotion()) {
      gsap.fromTo(sweep.current, { xPercent: -130, opacity: 0.9 }, { xPercent: 130, opacity: 0, duration: 0.9, ease: 'power2.out', overwrite: true });
    }
  };

  const step = (by: number) => {
    if (live.current.detail) closeDetail();
    moveTo((live.current.angle + by + count) % count, by);
  };

  const openDetail = () => {
    live.current.detail = true;
    setDetail(true);
    reveal();
  };
  const closeDetail = () => {
    live.current.detail = false;
    setDetail(false);
  };

  const show = (view: ChairView) => {
    if (view === 'detail') {
      if (!live.current.detail) openDetail();
      return;
    }
    const target = turnOrder.indexOf(view);
    if (live.current.detail) closeDetail();
    if (target === live.current.angle) return;
    // round the shorter way
    const diff = ((target - live.current.angle + count + 2) % count) - 2 || 2;
    moveTo(target, diff);
  };

  // on a wide screen the page's scroll brings the chair round, while the details beside it go past
  useEffect(() => {
    const root = stage.current?.closest('[data-turn-scroll]');
    if (!root || prefersReducedMotion() || !window.matchMedia('(min-width: 768px)').matches) return;
    let last = 0;
    const st = ScrollTrigger.create({
      trigger: root,
      start: 'top 72px',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const at = Math.min(count - 1, Math.floor(self.progress * count));
        if (at === last || live.current.detail) return;
        const by = at - last;
        last = at;
        moveTo(at, by);
      },
    });
    return () => st.kill();
    // moveTo only touches refs and state setters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const active: ChairView = detail ? 'detail' : turnOrder[angle];

  return (
    <div>
      <div
        ref={stage}
        role="group"
        aria-label={`${title}. Drag to turn the chair.`}
        className="relative h-[66svh] min-h-[400px] cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing md:h-[calc(100svh-176px)]"
        style={{ background: 'radial-gradient(70% 60% at 50% 38%, #F6F1E9 0%, #E9E1D6 62%, #D9CEBF 100%)' }}
        onPointerDown={(e) => {
          drag.current = { x: e.clientX };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          const dx = e.clientX - drag.current.x;
          if (Math.abs(dx) < STEP_PX) return;
          drag.current.x = e.clientX;
          step(dx < 0 ? 1 : -1);
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
      >
        {/* the turntable under the chair: a ring of marks lying on the floor, turning with it */}
        <div aria-hidden="true" className="absolute bottom-[12%] left-1/2 aspect-square w-[min(84%,74svh)] -translate-x-1/2 translate-y-1/2 [perspective:1400px]">
          <svg
            viewBox="0 0 200 200"
            className="h-full w-full transition-transform duration-1000 ease-reveal"
            style={{ transform: `rotateX(76deg) rotateZ(${spin * -90}deg)` }}
          >
            <circle cx="100" cy="100" r="96" fill="rgba(90,70,50,0.07)" stroke="rgba(90,70,50,0.35)" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(90,70,50,0.18)" strokeWidth="0.4" />
            {Array.from({ length: 72 }, (_, i) => (
              <line key={i} x1="100" y1="4" x2="100" y2={i % 18 === 0 ? 18 : 9} stroke="rgba(90,70,50,0.45)" strokeWidth={i % 18 === 0 ? 1 : 0.35} transform={`rotate(${i * 5} 100 100)`} />
            ))}
          </svg>
        </div>

        <div className="absolute inset-x-0 bottom-[3%] top-[3%]">
          <ChairTurn slug={slug} title={title} angle={angle} eager dim={detail} />
        </div>

        {/* a band of light that crosses the stage on each step */}
        <div ref={sweep} aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-full opacity-0 mix-blend-soft-light" style={{ background: 'linear-gradient(100deg, transparent 30%, rgba(255,250,240,0.95) 50%, transparent 70%)' }} />

        {/* the round glass */}
        <div
          className={`absolute left-1/2 top-1/2 aspect-square w-[min(90%,54svh)] -translate-x-1/2 -translate-y-1/2 overflow-hidden md:w-[min(90%,calc((100svh-176px)*0.82))] rounded-full bg-[#E9E1D6] ring-1 ring-[rgba(90,70,50,0.45)] ring-offset-[10px] ring-offset-[rgba(246,241,233,0.6)] transition-[opacity,transform] duration-[900ms] ease-reveal ${detail ? 'opacity-100' : 'pointer-events-none scale-[0.35] opacity-0'}`}
        >
          <img src={chairImage(slug, 'detail')} alt={detail ? `${title}, a close view of the upholstery` : ''} loading="lazy" draggable={false} className={`h-full w-full object-cover transition-transform duration-[1400ms] ease-reveal ${detail ? 'scale-100' : 'scale-125'}`} />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 px-5 md:px-0">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {chairViews.map((v) => (
            <button
              key={v.id}
              type="button"
              aria-pressed={active === v.id}
              onClick={() => show(v.id)}
              className={`border-b pb-1 text-[12px] tracking-[0.04em] transition-colors ${active === v.id ? 'border-furn-ink text-furn-ink' : 'border-transparent text-[#6F6A62] hover:text-furn-ink'}`}
            >
              {v.label}
            </button>
          ))}
        </div>
        <div className="hidden shrink-0 gap-2 md:flex">
          <button type="button" aria-label="Turn the chair back" onClick={() => step(-1)} className="h-10 w-10 rounded-full ring-1 ring-[rgba(30,30,34,0.3)] transition-colors hover:bg-furn-ink hover:text-furn-linen">←</button>
          <button type="button" aria-label="Turn the chair on" onClick={() => step(1)} className="h-10 w-10 rounded-full ring-1 ring-[rgba(30,30,34,0.3)] transition-colors hover:bg-furn-ink hover:text-furn-linen">→</button>
        </div>
      </div>
    </div>
  );
}
