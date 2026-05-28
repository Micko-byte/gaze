/**
 * GAZE ▲ HOLDINGS — inline SVG logo lockup.
 *
 * Variants:
 *   inline (default) — horizontal lockup for navbars, footers, anywhere the
 *     mark sits on a single line.
 *   stacked — vertical lockup: large "GAZE" with triangle above center,
 *     thin rose underline, small-caps "HOLDINGS" beneath. For hero canvases,
 *     route curtains, and the 404 page.
 *
 * The rendered SVG uses currentColor for the wordmark so it inherits text
 * color from its parent, with var(--house-rose) hardcoded for the triangle
 * + underline accents (the rose is the brand signature regardless of canvas).
 */

type Variant = 'inline' | 'stacked';

type Props = {
  variant?: Variant;
  /** Height in px. Width scales proportionally. */
  height?: number;
  /** Optional className applied to the outer <svg>. */
  className?: string;
  /** Override the default aria-label. */
  ariaLabel?: string;
};

export function BrandMark({
  variant = 'inline',
  height,
  className,
  ariaLabel = 'Gaze Holdings',
}: Props) {
  if (variant === 'stacked') {
    return <StackedMark height={height ?? 56} className={className} ariaLabel={ariaLabel} />;
  }
  return <InlineMark height={height ?? 18} className={className} ariaLabel={ariaLabel} />;
}

/* ───────────────── Inline ───────────────── */

function InlineMark({ height, className, ariaLabel }: { height: number; className?: string; ariaLabel: string }) {
  // viewBox 0 0 340 36 — 340 wide / 36 tall — width scales from height
  const width = (height * 340) / 36;
  return (
    <svg
      viewBox="0 0 340 36"
      width={width}
      height={height}
      role="img"
      aria-label={ariaLabel}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* GAZE */}
      <text
        x="0"
        y="25"
        fill="currentColor"
        style={{
          fontFamily: 'var(--font-outfit), sans-serif',
          fontWeight: 500,
          fontSize: '20px',
          letterSpacing: '6px',
        }}
      >
        GAZE
      </text>

      {/* Triangle separator — geometric, not unicode */}
      <polygon points="118,18 126,5 134,18" fill="var(--house-rose)" />
      <line x1="118" y1="22" x2="134" y2="22" stroke="var(--house-rose)" strokeWidth="1" />

      {/* HOLDINGS */}
      <text
        x="148"
        y="25"
        fill="currentColor"
        style={{
          fontFamily: 'var(--font-outfit), sans-serif',
          fontWeight: 500,
          fontSize: '20px',
          letterSpacing: '6px',
        }}
      >
        HOLDINGS
      </text>
    </svg>
  );
}

/* ───────────────── Stacked ───────────────── */

function StackedMark({ height, className, ariaLabel }: { height: number; className?: string; ariaLabel: string }) {
  // viewBox 0 0 220 88 — 220 wide / 88 tall
  const width = (height * 220) / 88;
  return (
    <svg
      viewBox="0 0 220 88"
      width={width}
      height={height}
      role="img"
      aria-label={ariaLabel}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top triangle */}
      <polygon points="100,4 110,22 90,22" fill="var(--house-rose)" />

      {/* GAZE — large geometric sans */}
      <text
        x="110"
        y="56"
        textAnchor="middle"
        fill="currentColor"
        style={{
          fontFamily: 'var(--font-outfit), sans-serif',
          fontWeight: 300,
          fontSize: '40px',
          letterSpacing: '8px',
        }}
      >
        GAZE
      </text>

      {/* Thin rose underline */}
      <line x1="40" y1="66" x2="180" y2="66" stroke="var(--house-rose)" strokeWidth="1" />

      {/* HOLDINGS small-caps */}
      <text
        x="110"
        y="82"
        textAnchor="middle"
        fill="currentColor"
        style={{
          fontFamily: 'var(--font-outfit), sans-serif',
          fontWeight: 400,
          fontSize: '10px',
          letterSpacing: '6px',
        }}
      >
        HOLDINGS
      </text>
    </svg>
  );
}
