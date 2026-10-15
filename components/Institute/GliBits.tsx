/* eslint-disable @next/next/no-img-element */
/*
 * The small pieces of the GLI brand book's page furniture, shared by every Institute page: the three red bars, the
 * gold contour lines, the crest, section labels and the two button styles.
 */
import Link from 'next/link';
import type { ReactNode } from 'react';

/** The three red bars that mark the brand book's pages, each fading in from the left. */
export function GliBars({ className = '' }: { className?: string }) {
  return (
    <span data-gli-bars aria-hidden="true" className={`inline-flex h-10 gap-[6px] ${className}`}>
      {[0, 1, 2].map((i) => (
        <span key={i} className="block h-full w-7 origin-left bg-[linear-gradient(90deg,rgba(220,14,32,0.15),#DC0E20)]" />
      ))}
    </span>
  );
}

/*
 * The flowing gold lines from the brand book's cover: a family of waves that drift apart and close up again, like a
 * contour map. Computed once; they draw themselves on when they scroll into view.
 */
function contour(i: number, lines: number) {
  const pts: string[] = [];
  const t = i / lines;
  for (let x = -40; x <= 1480; x += 20) {
    const y =
      70 + i * 13 +
      70 * Math.sin(x / 300 + t * 1.6) * (0.4 + t) +
      34 * Math.sin(x / 140 - t * 4.2) * (1 - t * 0.6) +
      12 * Math.sin(x / 60 + i * 0.35);
    pts.push(`${x},${y.toFixed(1)}`);
  }
  return `M${pts.join(' L')}`;
}

export function GliContours({ className = '', lines = 24, stroke = 'var(--gli-gold)' }: { className?: string; lines?: number; stroke?: string }) {
  return (
    <svg data-gli-contours viewBox="0 0 1440 520" preserveAspectRatio="none" aria-hidden="true" className={`pointer-events-none ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <path
          key={i}
          d={contour(i, lines)}
          pathLength={1}
          fill="none"
          stroke={stroke}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          style={{ strokeDasharray: 1, opacity: 0.35 + 0.5 * Math.sin((i / lines) * Math.PI) }}
        />
      ))}
    </svg>
  );
}

/** The crest, as on the brand book cover. On navy it sits on its own white plate. */
export function GliCrest({ className = '', plate = false }: { className?: string; plate?: boolean }) {
  const img = <img src="/images/institute/crest.png" alt="Gaze Leadership Institute crest" className="h-full w-full object-contain" />;
  if (!plate) return <span className={`block ${className}`}>{img}</span>;
  return (
    <span className={`flex items-center justify-center rounded-full bg-white shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] ${className}`}>
      <span className="block h-[74%] w-[74%]">{img}</span>
    </span>
  );
}

export function GliLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`font-gli-text text-[12px] font-bold uppercase tracking-[0.26em] ${className}`}>{children}</p>;
}

const btn = 'inline-flex items-center justify-center gap-3 px-7 py-4 font-gli-text text-[13px] font-bold uppercase tracking-[0.16em] transition-colors duration-300';

export function GliButton({
  href,
  children,
  tone = 'red',
  className = '',
}: {
  href: string;
  children: ReactNode;
  tone?: 'red' | 'navy' | 'white' | 'outline' | 'outline-light';
  className?: string;
}) {
  const tones = {
    red: 'bg-gli-red text-white hover:bg-gli-navy',
    navy: 'bg-gli-navy text-white hover:bg-gli-red',
    white: 'bg-white text-gli-navy hover:bg-gli-navy hover:text-white',
    outline: 'border-2 border-gli-navy text-gli-navy hover:bg-gli-navy hover:text-white',
    'outline-light': 'border-2 border-white text-white hover:bg-white hover:text-gli-navy',
  };
  return (
    <Link href={href} className={`${btn} ${tones[tone]} ${className}`}>
      {children}
    </Link>
  );
}

/** A photograph cut to a circle, as on GLI's Instagram. */
export function GliCircle({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <span data-gli-circle className={`block aspect-square overflow-hidden rounded-full ${className}`}>
      <img src={`/images/institute/${src}.jpg`} alt={alt} className="h-full w-full scale-[1.08] object-cover" />
    </span>
  );
}
