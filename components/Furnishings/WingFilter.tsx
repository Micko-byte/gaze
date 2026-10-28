'use client';

import { useState, type ReactNode } from 'react';
import { Reveal } from '@/components/Reveal/Reveal';

/**
 * A wing's pieces with a row of types above them (sofas · armchairs · tables), as Natuzzi's lighting page sorts
 * floor, table and arc lamps. The grid keeps the wing's asymmetric rhythm whatever is showing.
 */
export function WingFilter({ items }: { items: ReadonlyArray<{ type: string; node: ReactNode }> }) {
  const types = Array.from(new Set(items.map((i) => i.type)));
  const [type, setType] = useState<string | null>(null);
  const shown = type ? items.filter((i) => i.type === type) : items;

  return (
    <>
      {types.length > 1 && (
        <div role="group" aria-label="Show" className="mb-14 flex flex-wrap gap-2">
          {[null, ...types].map((t) => (
            <button
              key={t ?? 'all'}
              type="button"
              aria-pressed={type === t}
              onClick={() => setType(t)}
              className={`rounded-full px-5 py-2.5 text-[13px] ring-1 transition-colors ${type === t ? 'bg-furn-ink text-furn-linen ring-furn-ink' : 'ring-[rgba(30,30,34,0.25)] hover:ring-furn-ink'}`}
            >
              {t ?? 'all'}
              <span className="ml-2 text-[11px] opacity-60">{t ? items.filter((i) => i.type === t).length : items.length}</span>
            </button>
          ))}
        </div>
      )}
      <div className="grid gap-14 md:grid-cols-12 md:gap-x-10">
        {shown.map((p, j) => {
          const span = j === 0 ? 'md:col-span-7' : j === 1 ? 'md:col-span-5 md:mt-32' : j % 2 === 0 ? 'md:col-span-6' : 'md:col-span-6 md:mt-24';
          return (
            <Reveal key={`${type ?? 'all'}-${j}`} delay={(j % 2) * 0.08} className={span}>
              {p.node}
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
