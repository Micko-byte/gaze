'use client';

import { useEffect, useState } from 'react';
import { BrandMark } from '@/components/BrandMark/BrandMark';
import { prefersReducedMotion } from '@/lib/motion';

const KEY = 'gaze.introSeen.v1';

/**
 * First-load brand reveal. Shows once per session, fades the wordmark in on
 * obsidian, then lifts away to reveal the Hero. Skipped entirely for
 * reduced-motion users and on subsequent navigations.
 */
export function Intro() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    try {
      if (sessionStorage.getItem(KEY)) return;
    } catch {
      /* storage blocked — show once, don't persist */
    }

    setMounted(true);
    document.body.style.overflow = 'hidden';

    const raf = requestAnimationFrame(() => setVisible(true));
    const tLeave = setTimeout(() => setLeaving(true), 1700);
    const tDone = setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = '';
      try {
        sessionStorage.setItem(KEY, '1');
      } catch {
        /* ignore */
      }
    }, 2500);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(tLeave);
      clearTimeout(tDone);
      document.body.style.overflow = '';
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9997] flex items-center justify-center bg-obsidian transition-all duration-[900ms] ease-reveal ${
        leaving ? 'opacity-0 -translate-y-6 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div
        className={`flex flex-col items-center gap-6 text-ivory transition-all duration-[1100ms] ease-reveal ${
          visible && !leaving ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.04]'
        }`}
      >
        <BrandMark variant="stacked" height={88} />
        <span
          className={`h-px bg-rose transition-all duration-[1400ms] ease-reveal ${
            visible && !leaving ? 'w-40 opacity-60' : 'w-0 opacity-0'
          }`}
        />
      </div>
    </div>
  );
}
