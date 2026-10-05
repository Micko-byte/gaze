'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { houseForPath } from '@/content/houses';
import { click, scrollEnergy, setMusicHouse, unlockAudio } from '@/lib/sound';

/**
 * Drives the site sound; renders nothing. Each route plays its house's music, the first click or key press
 * unlocks audio, links and buttons tap softly, and scroll speed opens the music up.
 */
export function SoundLayer() {
  const pathname = usePathname();

  useEffect(() => {
    setMusicHouse(houseForPath(pathname).id);
  }, [pathname]);

  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      unlockAudio();
      const target = event.target as Element | null;
      if (target?.closest('a[href], button, [role="button"], summary')) click();
    };
    const onKey = () => unlockAudio();
    document.addEventListener('pointerdown', onPointer, { passive: true });
    document.addEventListener('keydown', onKey);

    // scroll energy: velocity, smoothed, decaying back to calm when the page rests
    let last = window.scrollY;
    let lastT = performance.now();
    let energy = 0;
    let raf = 0;
    const tick = () => {
      const now = performance.now();
      const dt = Math.max(16, now - lastT);
      const speed = Math.abs(window.scrollY - last) / dt; // px per ms
      last = window.scrollY;
      lastT = now;
      energy += (Math.min(1, speed / 2.5) - energy) * (speed > 0.02 ? 0.25 : 0.06);
      scrollEnergy(energy);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
