'use client';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  // `?motion=full` (set up in the root layout) shows the full motion regardless of the OS setting — for reviews.
  if (document.documentElement.dataset.motion === 'full') return false;
  if (typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function hasFinePointer(): boolean {
  if (typeof window === 'undefined') return false;
  if (typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(pointer: fine)').matches;
}

export function isSaveData(): boolean {
  if (typeof navigator === 'undefined') return false;
  // @ts-expect-error — connection is non-standard but widely available
  return Boolean(navigator.connection?.saveData);
}
