'use client';

import { useSyncExternalStore, type CSSProperties } from 'react';

/** The fabric chosen in the buy box, so the piece's photograph can show it as a circle of real cloth. */
export type Swatch = { label: string; style: CSSProperties } | null;

let current: Swatch = null;
const listeners = new Set<() => void>();

export function setSwatch(next: Swatch) {
  current = next;
  listeners.forEach((l) => l());
}

export function useSwatch(): Swatch {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => current,
    () => null,
  );
}

/** Her cloth's weave, multiplied by a house colour: the real texture in any colourway. */
export const clothStyle = (grain: string, hex: string): CSSProperties => ({
  backgroundColor: hex,
  backgroundImage: `url(${grain})`,
  backgroundSize: 'cover',
  backgroundBlendMode: 'multiply',
});
