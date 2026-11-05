'use client';

import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { typeSlug } from '@/content/furnishings';
import { Reveal } from '@/components/Reveal/Reveal';

type Item = { type: string; node: ReactNode };

function Grid({ items, gridKey }: { items: ReadonlyArray<Item>; gridKey: string }) {
  return (
    <div className="grid gap-14 md:grid-cols-12 md:gap-x-10">
      {items.map((p, j) => {
        const span = j === 0 ? 'md:col-span-7' : j === 1 ? 'md:col-span-5 md:mt-32' : j % 2 === 0 ? 'md:col-span-6' : 'md:col-span-6 md:mt-24';
        return (
          <Reveal key={`${gridKey}-${j}`} delay={(j % 2) * 0.08} className={span}>
            {p.node}
          </Reveal>
        );
      })}
    </div>
  );
}

function Filtered({ items }: { items: ReadonlyArray<Item> }) {
  const types = Array.from(new Set(items.map((i) => i.type)));
  const asked = useSearchParams().get('type');
  const fromLink = types.find((t) => typeSlug(t) === asked) ?? null;
  const [type, setType] = useState<string | null>(fromLink);
  const row = useRef<HTMLDivElement>(null);

  // a menu link opens the wing on that type, and a later one changes it
  useEffect(() => {
    setType(fromLink);
    if (fromLink) row.current?.scrollIntoView({ block: 'start' });
  }, [fromLink]);

  const shown = type ? items.filter((i) => i.type === type) : items;

  return (
    <>
      {types.length > 1 && (
        <div ref={row} role="group" aria-label="Show" className="mb-14 flex scroll-mt-[96px] flex-wrap gap-2">
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
      <Grid items={shown} gridKey={type ?? 'all'} />
    </>
  );
}

/**
 * A wing's pieces with a row of types above them (sofas · armchairs · coffee tables), as Natuzzi's lighting page sorts
 * floor, table and arc lamps. The menu links straight to a type. The grid keeps the wing's asymmetric rhythm whatever
 * is showing.
 */
export function WingFilter({ items }: { items: ReadonlyArray<Item> }) {
  return (
    <Suspense fallback={<Grid items={items} gridKey="all" />}>
      <Filtered items={items} />
    </Suspense>
  );
}
