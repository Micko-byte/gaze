import Lenis from 'lenis';

/** The running instance (desktop only), so a route change can jump to the top without easing. */
export let activeLenis: Lenis | null = null;

export function setActiveLenis(l: Lenis | null): void {
  activeLenis = l;
}

export function createLenis() {
  return new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });
}
