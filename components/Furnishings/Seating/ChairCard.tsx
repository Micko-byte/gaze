'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { chairTitle, turnOrder, type Chair } from '@/content/executiveSeating';
import { hasFinePointer, prefersReducedMotion } from '@/lib/motion';
import { kes } from '@/lib/pricing';
import { ChairTurn } from './ChairTurn';

/** One chair in a collection. Hover and it comes round through its views; on a phone it stands still and the tap opens it. */
export function ChairCard({ chair }: { chair: Chair }) {
  const [angle, setAngle] = useState(0);
  const timer = useRef<number>();

  const start = () => {
    if (timer.current || prefersReducedMotion() || !hasFinePointer()) return;
    setAngle(1);
    timer.current = window.setInterval(() => setAngle((a) => (a + 1) % turnOrder.length), 620);
  };
  const stop = () => {
    window.clearInterval(timer.current);
    timer.current = undefined;
    setAngle(0);
  };
  useEffect(() => () => window.clearInterval(timer.current), []);

  const title = chairTitle(chair);
  return (
    <Link href={`/furnishings/executive-seating/${chair.slug}`} data-no-transition onPointerEnter={start} onPointerLeave={stop} className="group block">
      <div className="relative aspect-[9/11] overflow-hidden transition-colors duration-700" style={{ background: 'radial-gradient(70% 60% at 50% 38%, #F6F1E9 0%, #E9E1D6 70%, #DDD3C5 100%)' }}>
        <div className="absolute inset-[5%]">
          <ChairTurn slug={chair.slug} title={title} angle={angle} />
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <p className="font-furn text-[clamp(20px,1.9vw,30px)] leading-[1.05]">{chair.name}</p>
        <p className="shrink-0 text-[12px] tabular-nums md:text-[13px]">{kes(chair.rrp)}</p>
      </div>
      <p className="mt-1 text-[12px] text-[#6F6A62]">{chair.finish && chair.finish !== 'Black' ? `${chair.finish} · ` : ''}{chair.kind}</p>
    </Link>
  );
}
