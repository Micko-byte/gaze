/* eslint-disable @next/next/no-img-element */
import { chairImage, turnOrder } from '@/content/executiveSeating';

/**
 * A chair's four standing views laid over one another. The one facing the viewer is sharp; the next waits to its right
 * and the last to its left, so stepping round reads as the chair turning on the spot rather than a picture changing.
 */
export function ChairTurn({ slug, title, angle, eager, dim }: { slug: string; title: string; angle: number; eager?: boolean; dim?: boolean }) {
  return (
    <>
      {turnOrder.map((view, i) => {
        const offset = (i - angle + turnOrder.length) % turnOrder.length;
        const pos = offset === 0 ? 'none' : offset === 1 ? 'translateX(9%) scale(0.95)' : offset === 3 ? 'translateX(-9%) scale(0.95)' : 'scale(0.9)';
        return (
          <img
            key={view}
            src={chairImage(slug, view)}
            alt={offset === 0 ? title : ''}
            aria-hidden={offset === 0 ? undefined : true}
            loading={eager || i === 0 ? 'eager' : 'lazy'}
            draggable={false}
            className="absolute inset-0 h-full w-full object-contain transition-[opacity,transform] duration-700 ease-reveal will-change-transform"
            style={{ opacity: offset === 0 ? (dim ? 0.18 : 1) : 0, transform: pos }}
          />
        );
      })}
    </>
  );
}
