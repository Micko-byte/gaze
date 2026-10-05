'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { prefersReducedMotion } from '@/lib/motion';
import { audioReady, playCue, preloadCue, soundEnabled, tryAutoplay, unlockAudio } from '@/lib/sound';
import styles from './Intro.module.css';
import { GAZE_VIEWBOX, LETTER_PATHS, LETTER_X, MARK_PATHS, SUBTITLE_PATH } from './gazeLogo';

const KEY = 'gaze.introSeen.v2';
const COLLAPSE_AT = 3300;
const COLLAPSE_MS = 1300;
const TYPE_AT = 2.1;
const TYPE_STEP = 0.14;
/** Colours that close in behind the loader, outermost first. The parchment loader itself is innermost. */
const STACK = ['var(--gaze-champagne)', 'var(--gaze-antique)', 'var(--gaze-navy)'];

const H_GUIDES = [50, 235, 400, 565, 750];
const V_GUIDES = [50, 130, 335, 540, 620];
const RAYS = [30, 90, 150].map((deg) => {
  const a = (deg * Math.PI) / 180;
  return [335 - 420 * Math.cos(a), 400 - 420 * Math.sin(a), 335 + 420 * Math.cos(a), 400 + 420 * Math.sin(a)];
});

type Phase = 'off' | 'build' | 'collapse';
const v = (vars: Record<string, string>) => vars as CSSProperties;

/**
 * First-load loader for the Holdings site. The mark draws itself from its construction lines, fills, slides
 * into the lockup while GAZE types in, then the loader collapses as nested Holdings colours onto the hero
 * headline. Once per session; skipped for reduced-motion users; click or any key skips ahead.
 */
export function Intro() {
  const [phase, setPhase] = useState<Phase>('off');
  /** Shown when the browser blocked the loader's music: one tap starts it in time with the loader. */
  const [offerSound, setOfferSound] = useState(false);
  const startedAt = useRef(0);
  const stopCue = useRef<(() => void) | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const timers = useRef<number[]>([]);

  const finish = useCallback(() => {
    setPhase('off');
    document.body.style.overflow = '';
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* storage blocked — ignore */
    }
  }, []);

  const collapse = useCallback(() => {
    const root = rootRef.current;
    const logo = logoRef.current;
    if (!root || !logo) return;
    timers.current.forEach(clearTimeout);
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const target = document.querySelector('[data-loader-target]')?.getBoundingClientRect();
    const t = target && target.width > 0 ? target : { left: vw * 0.3, top: vh * 0.4, width: vw * 0.4, height: vh * 0.2 };
    const l = logo.getBoundingClientRect();
    const k = Math.min((0.9 * t.width) / l.width, (0.9 * t.height) / l.height, 1);
    root.style.setProperty('--ci', `${t.top}px ${vw - t.left - t.width}px ${vh - t.top - t.height}px ${t.left}px`);
    root.style.setProperty('--tx', `${t.left + t.width / 2 - vw / 2}px`);
    root.style.setProperty('--ty', `${t.top + t.height / 2 - vh / 2}px`);
    root.style.setProperty('--ts', `${k}`);
    setPhase('collapse');
    timers.current = [window.setTimeout(finish, COLLAPSE_MS)];
  }, [finish]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    try {
      // `?intro` replays it on demand
      if (sessionStorage.getItem(KEY) && !new URLSearchParams(location.search).has('intro')) return;
    } catch {
      /* storage blocked — show once, don't persist */
    }
    const start = () => {
      setPhase('build');
      document.body.style.overflow = 'hidden';
      timers.current = [window.setTimeout(collapse, COLLAPSE_AT)];
      startedAt.current = performance.now();
      // the Gaze Holdings logo-animation music; its first hit lands as the loader collapses
      void preloadCue('intro-holdings');
      let cancelled = false;
      stopCue.current = () => {
        cancelled = true;
      };
      void tryAutoplay().then((ok) => {
        if (cancelled) return;
        if (ok) stopCue.current = playCue('intro-holdings', (performance.now() - startedAt.current) / 1000);
        else if (soundEnabled()) setOfferSound(true);
      });
    };
    // A page opened in a background tab waits until it is actually seen, so nobody misses the loader.
    const onVisible = () => {
      if (document.visibilityState !== 'visible') return;
      document.removeEventListener('visibilitychange', onVisible);
      start();
    };
    if (document.visibilityState === 'visible') start();
    else document.addEventListener('visibilitychange', onVisible);
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      timers.current.forEach(clearTimeout);
      stopCue.current?.();
      document.body.style.overflow = '';
    };
  }, [collapse]);

  useEffect(() => {
    if (phase !== 'build') return;
    const skip = () => collapse();
    window.addEventListener('keydown', skip, { once: true });
    return () => window.removeEventListener('keydown', skip);
  }, [phase, collapse]);

  const startSound = (event: React.MouseEvent) => {
    event.stopPropagation(); // don't skip the loader
    unlockAudio();
    setOfferSound(false);
    // join the music at the point the loader has reached
    void tryAutoplay().then((ok) => {
      if (ok && audioReady()) stopCue.current = playCue('intro-holdings', (performance.now() - startedAt.current) / 1000);
    });
  };

  if (phase === 'off') return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={styles.root}
      data-phase={phase}
      onClick={phase === 'build' ? collapse : undefined}
    >
      {STACK.map((colour, i) => (
        <div key={colour} className={styles.layer} style={v({ background: colour, '--d': `${(STACK.length - i) * 75}ms` })} />
      ))}
      <div className={`${styles.layer} ${styles.loader}`} style={v({ '--d': '0ms' })}>
        <div className={styles.content}>
          <svg ref={logoRef} className={styles.logo} viewBox={GAZE_VIEWBOX}>
            <g className={styles.mark}>
              <g className={styles.guides}>
                {H_GUIDES.map((y, i) => (
                  <line key={`h${y}`} x1={-3000} y1={y} x2={5000} y2={y} pathLength={1}
                    className={`${styles.draw} ${styles.guide}`} style={v({ '--d': `${0.1 + i * 0.06}s` })} />
                ))}
                {V_GUIDES.map((x, i) => (
                  <line key={`v${x}`} x1={x} y1={-2000} x2={x} y2={3000} pathLength={1}
                    className={`${styles.draw} ${styles.guide}`} style={v({ '--d': `${0.2 + i * 0.06}s` })} />
                ))}
                <circle cx={335} cy={400} r={370} pathLength={1}
                  className={`${styles.draw} ${styles.guide}`} style={v({ '--d': '0.3s', '--dur': '1.2s' })} />
                {RAYS.map(([x1, y1, x2, y2], i) => (
                  <line key={`r${i}`} x1={x1} y1={y1} x2={x2} y2={y2} pathLength={1}
                    className={`${styles.draw} ${styles.guide}`} style={v({ '--d': '0.5s', '--dur': '0.8s' })} />
                ))}
              </g>
              <g className={styles.outlines}>
                {MARK_PATHS.map((d, i) => (
                  <path key={`o${i}`} d={d} pathLength={1}
                    className={`${styles.draw} ${styles.outline}`} style={v({ '--d': `${0.45 + i * 0.15}s`, '--dur': '1.3s' })} />
                ))}
              </g>
              {MARK_PATHS.map((d, i) => (
                <path key={`f${i}`} d={d} className={styles.fill} />
              ))}
            </g>
            <g transform="translate(680 140) scale(1.3333)">
              {LETTER_PATHS.map((d, i) => (
                <path key={`l${i}`} d={d} className={styles.letter} style={v({ '--d': `${TYPE_AT + i * TYPE_STEP}s` })} />
              ))}
              {LETTER_X.map(([, right], i) => (
                <rect key={`c${i}`} x={right + 12} y={40} width={5} height={175} className={styles.caret}
                  style={v({ '--d': `${TYPE_AT + i * TYPE_STEP}s`, '--dur': `${i === LETTER_X.length - 1 ? 0.6 : TYPE_STEP}s` })} />
              ))}
              <path d={SUBTITLE_PATH} className={styles.subtitle} />
            </g>
          </svg>
        </div>
      </div>
      {offerSound && phase === 'build' && (
        <button type="button" onClick={startSound} className={styles.soundOn} aria-label="Play the loader with sound">
          <span aria-hidden="true" className={styles.bars}><i /><i /><i /></span>
          Sound
        </button>
      )}
    </div>
  );
}
