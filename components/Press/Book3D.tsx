'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, type CSSProperties } from 'react';
import type { Book } from '@/content/library';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

const face = 'absolute [backface-visibility:hidden]';
const PAGES = 'repeating-linear-gradient(90deg, #F4EEE2 0 1px, #DDD4C4 1px 2px)';
const PAGES_ACROSS = 'repeating-linear-gradient(0deg, #F4EEE2 0 1px, #DDD4C4 1px 2px)';

/**
 * A real book, built from her wrap cover: front, spine, back, and pages along the other three sides. Inside a section
 * marked data-book-scroll, the scroll turns it from spine-on, to its cover, and round to the blurb on the back.
 */
export function Book3D({ book, still }: { book: Book; still?: boolean }) {
  const body = useRef<HTMLDivElement>(null);
  const { aspect, thickness } = book.faces!;
  const src = (side: 'front' | 'spine' | 'back') => `/images/press/books/3d/${book.slug}-${side}.webp`;

  useEffect(() => {
    if (still || prefersReducedMotion() || !body.current) return;
    const trigger = body.current.closest('[data-book-scroll]');
    if (!trigger) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger, start: 'top 12%', end: 'bottom bottom', scrub: 0.7 } })
        .fromTo(body.current, { rotationY: 68, rotationX: 5 }, { rotationY: -6, rotationX: 2, duration: 0.42, ease: 'power1.out' })
        .to(body.current, { rotationY: -18, duration: 0.14 })
        .to(body.current, { rotationY: -174, rotationX: 2, duration: 0.44, ease: 'power1.inOut' });
    });
    return () => ctx.revert();
  }, [still]);

  const vars = { '--a': aspect, '--t': thickness } as CSSProperties;
  const half = 'calc(var(--w) * var(--t) / 2)';
  const height = 'calc(var(--w) / var(--a))';

  return (
    <div style={vars} className="relative flex justify-center [--w:calc(36svh*var(--a))] [perspective:1800px] md:[--w:min(30vw,calc(72svh*var(--a)))]">
      <div
        ref={body}
        role="img"
        aria-label={`${book.title}, the printed book`}
        className="relative will-change-transform [transform-style:preserve-3d]"
        style={{ width: 'var(--w)', height, transform: 'rotateY(26deg) rotateX(3deg)' }}
      >
        <img src={src('front')} alt="" className={`${face} inset-0 h-full w-full`} style={{ transform: `translateZ(${half})` }} />
        <img src={src('back')} alt="" className={`${face} inset-0 h-full w-full`} style={{ transform: `rotateY(180deg) translateZ(${half})` }} />
        <img src={src('spine')} alt="" className={`${face} top-0 h-full`} style={{ width: `calc(${half} * 2)`, left: `calc(50% - ${half})`, transform: 'rotateY(-90deg) translateZ(calc(var(--w) / 2))' }} />
        {/* the pages: fore-edge, top and bottom */}
        <div className={`${face} top-[0.6%] h-[98.8%]`} style={{ width: `calc(${half} * 2)`, left: `calc(50% - ${half})`, transform: 'rotateY(90deg) translateZ(calc(var(--w) / 2 - 2px))', background: PAGES }} />
        <div className={`${face} left-[0.5%] w-[99%]`} style={{ height: `calc(${half} * 2)`, top: `calc(50% - ${half})`, transform: `rotateX(90deg) translateZ(calc(${height} / 2 - 2px))`, background: PAGES_ACROSS }} />
        <div className={`${face} left-[0.5%] w-[99%]`} style={{ height: `calc(${half} * 2)`, top: `calc(50% - ${half})`, transform: `rotateX(-90deg) translateZ(calc(${height} / 2 - 2px))`, background: PAGES_ACROSS }} />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-[7%] left-1/2 h-[6%] w-[62%] -translate-x-1/2 rounded-[50%] bg-[rgba(0,0,0,0.42)] blur-2xl" />
    </div>
  );
}
