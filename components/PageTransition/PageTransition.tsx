'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { HouseLogo } from '@/components/Logo/HouseLogo';
import { prefersReducedMotion } from '@/lib/motion';
import { activeLenis } from '@/lib/lenis';
import { playCue, preloadCue, preloadMusic } from '@/lib/sound';
import { houseForPath, houses as allHouses, HOLDINGS, type House } from '@/content/houses';
import styles from './PageTransition.module.css';

type Phase = 'idle' | 'cover' | 'hold' | 'reveal';
const v = (vars: Record<string, string>) => vars as CSSProperties;

/* The cue's hit lands at 0.95 s: the route swaps once the logo has filled (~0.8 s), the reveal follows at once. */
const COVER_MS = 400;
const LOGO_MS = 420;
const REVEAL_MS = 1000;

function insetOf(r: { left: number; top: number; width: number; height: number }): string {
  return `${r.top}px ${window.innerWidth - r.left - r.width}px ${window.innerHeight - r.top - r.height}px ${r.left}px`;
}

/**
 * Site-wide navigation between houses. Internal links are intercepted: the destination house's colours open out
 * from the link, its logo draws itself, the route changes underneath, then the colours close in onto the new
 * page's hero ([data-loader-target]). Opening a division page directly plays the same build once per session.
 * Reduced-motion visitors get plain navigation.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>('idle');
  const [house, setHouse] = useState<House | null>(null);
  const [run, setRun] = useState(0);
  const [quick, setQuick] = useState(true);
  /** Once the logo has finished drawing it is frozen, so restyles during the route swap can't restart it. */
  const [drawn, setDrawn] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pending = useRef<string | null>(null);
  const timers = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
  const settling = useRef(0);

  /*
   * Run `fn` once the page underneath has settled: the new route sets up its images and scroll animations in the
   * first few hundred milliseconds, and a reveal started during that work stutters. Wait (behind the still cover)
   * for a run of ordinary frames, but never longer than `maxMs`.
   */
  const whenSettled = (fn: () => void, maxMs = 700) => {
    cancelAnimationFrame(settling.current);
    const start = performance.now();
    let last = start;
    let calm = 0;
    const tick = (now: number) => {
      calm = now - last < 34 ? calm + 1 : 0;
      last = now;
      if (calm >= 6 || now - start > maxMs) fn();
      else settling.current = requestAnimationFrame(tick);
    };
    settling.current = requestAnimationFrame(tick);
  };

  const reveal = useCallback(() => {
    const root = rootRef.current;
    const content = contentRef.current;
    if (!root || !content) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const t = document.querySelector('[data-loader-target]')?.getBoundingClientRect();
    const target = t && t.width > 0 && t.bottom > 0 && t.top < vh ? t : { left: vw * 0.3, top: vh * 0.38, width: vw * 0.4, height: vh * 0.24 };
    const c = content.getBoundingClientRect();
    const k = Math.min((0.9 * target.width) / c.width, (0.9 * target.height) / c.height, 1);
    root.style.setProperty('--to', insetOf(target));
    root.style.setProperty('--tx', `${target.left + target.width / 2 - vw / 2}px`);
    root.style.setProperty('--ty', `${target.top + target.height / 2 - vh / 2}px`);
    root.style.setProperty('--ts', `${k}`);
    setPhase('reveal');
    // hide rather than unmount: tearing down the drawn logo in one go caused a hitch as the page appeared
    later(() => setPhase('idle'), REVEAL_MS);
  }, []);

  // 1 · intercept internal links
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const a = (event.target as Element | null)?.closest('a[href]') as HTMLAnchorElement | null;
      if (!a || a.target === '_blank' || a.hasAttribute('download') || a.dataset.noTransition !== undefined) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      // capture phase: take the click before next/link does, and do the navigation ourselves after the cover
      event.preventDefault();
      event.stopPropagation();
      const r = a.getBoundingClientRect();
      const from = r.width > 0 ? r : { left: event.clientX - 20, top: event.clientY - 20, width: 40, height: 40 };
      const dest = houseForPath(url.pathname);
      timers.current.forEach(clearTimeout);
      timers.current = [];
      rootRef.current?.style.setProperty('--from', insetOf(from));
      setHouse(dest);
      setQuick(true);
      setDrawn(false);
      setRun((n) => n + 1);
      setPhase('cover');
      // the destination house's logo-animation music; its first hit lands as the frames close in
      playCue(`cue-${dest.id}`);
      const href = url.pathname + url.search + url.hash;
      router.prefetch(url.pathname);
      // the logo finishes drawing over the cover; only then does the page underneath change
      later(() => {
        setDrawn(true);
        setPhase('hold');
        pending.current = href;
        router.push(href);
      }, COVER_MS + LOGO_MS);
    };
    window.addEventListener('click', onClick, { capture: true });
    return () => window.removeEventListener('click', onClick, { capture: true });
  }, [router]);

  // 2 · once the new route has rendered, close in onto its hero
  useEffect(() => {
    if (!pending.current) return;
    pending.current = null;
    // land at the top instantly: an eased scroll here reads as a lag at the end of the transition
    activeLenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    whenSettled(reveal);
  }, [pathname, reveal]);

  // 3 · a division opened directly plays its build once per session (the home page has its own loader)
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const dest = houseForPath(pathname);
    if (dest.id === 'holdings') return;
    const key = `gaze.loader.${dest.id}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
    } catch {
      /* storage blocked */
    }
    setHouse(dest);
    setQuick(false);
    setDrawn(false);
    setRun((n) => n + 1);
    setPhase('hold');
    later(() => playCue(`cue-${dest.id}`), 1350);
    later(() => setDrawn(true), 2200);
    later(reveal, 2300);
    // only on first mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      cancelAnimationFrame(settling.current);
    },
    [],
  );

  // decode the house cues once the page is idle, so the first transition has its music ready
  useEffect(() => {
    const load = () => [HOLDINGS, ...allHouses].forEach((h) => {
      void preloadCue(`cue-${h.id}`);
      void preloadMusic(h.id);
    });
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(load);
    else window.setTimeout(load, 2000);
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={styles.root}
      data-phase={phase}
      style={{ display: phase === 'idle' || !house ? 'none' : undefined }}
    >
      {house && (
        <>
          {house.stack.map((colour, i) => (
            <div key={`${run}-${i}`} className={styles.layer}
              style={v({ background: colour, '--d': `${i * 70}ms`, '--r': `${(house.stack.length - i) * 75}ms` })} />
          ))}
          <div key={`${run}-ground`} className={`${styles.layer} ${styles.ground}`}
            style={v({ background: house.ground, '--d': `${house.stack.length * 70}ms`, '--r': '0ms' })}>
            <div ref={contentRef} className={styles.content}>
              <HouseLogo
                key={run}
                id={house.logo}
                draw={!drawn}
                className={styles.logo}
                style={v({
                  color: house.ink,
                  '--draw-delay': quick ? '0.12s' : '0.1s',
                  '--draw-span': quick ? '0.2s' : '0.9s',
                  '--trace-dur': quick ? '0.3s' : '0.9s',
                  '--flood-gap': quick ? '0.02s' : '0.2s',
                  '--flood-span': quick ? '0.08s' : '0.3s',
                  '--draw-width': house.logo === 'institute' ? '3' : '4',
                })}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
