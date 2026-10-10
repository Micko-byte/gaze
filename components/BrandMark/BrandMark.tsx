/**
 * GAZE HOLDINGS — brand mark
 *
 * Variants:
 *   inline (default) — horizontal lockup for nav and footer
 *   stacked — vertical: paired-G monogram above the wordmark, for hero / route curtains
 *   monogram — the paired G's alone, for favicons, watermarks, social avatar
 *
 * All paths use currentColor so the mark inherits its parent's text color.
 * The only accent is the rose separator dot in the inline variant; remove
 * or swap it by overriding fill on <circle> if the palette changes.
 */

type Variant = 'inline' | 'stacked' | 'monogram';

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
    return <StackedMark height={height ?? 88} className={className} ariaLabel={ariaLabel} />;
  }
  if (variant === 'monogram') {
    return <MonogramMark height={height ?? 56} className={className} ariaLabel={ariaLabel} />;
  }
  return <InlineMark height={height ?? 18} className={className} ariaLabel={ariaLabel} />;
}

/* ─────────────────────────────────────────────
   Inline — nav / footer lockup
   viewBox 0 0 280 32
───────────────────────────────────────────── */

function InlineMark({ height, className, ariaLabel }: { height: number; className?: string; ariaLabel: string }) {
  const width = (height * 280) / 32;
  return (
    <svg
      viewBox="0 0 280 32"
      width={width}
      height={height}
      role="img"
      aria-label={ariaLabel}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="22"
        fill="currentColor"
        style={{
          fontFamily: 'var(--font-outfit), sans-serif',
          fontWeight: 300,
          fontSize: '16px',
          letterSpacing: '5px',
        }}
      >
        GAZE
      </text>

      {/* Rose separator — single dot, brand signature */}
      <circle cx="76" cy="13" r="1.8" fill="var(--house-rose)" />

      <text
        x="88"
        y="22"
        fill="currentColor"
        style={{
          fontFamily: 'var(--font-outfit), sans-serif',
          fontWeight: 300,
          fontSize: '16px',
          letterSpacing: '5px',
        }}
      >
        HOLDINGS
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Monogram — the paired G's alone
   viewBox 0 0 180 100
   Left G: normal italic. Right G: mirrored italic.
   They face each other — the only "action" in the mark.
───────────────────────────────────────────── */

function MonogramMark({ height, className, ariaLabel }: { height: number; className?: string; ariaLabel: string }) {
  const width = (height * 180) / 100;
  return (
    <svg
      viewBox="0 0 180 100"
      width={width}
      height={height}
      role="img"
      aria-label={ariaLabel}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/*
        Both G's share the same anchor point (x=−6, y=84) with textAnchor="end".
        The right G uses scale(−1, 1) which flips x around the group's origin (x=90),
        mirroring it to the right side. The italic slant makes them lean toward each other.
      */}
      <g transform="translate(90, 0)">
        {/* Left G */}
        <text
          x="-6"
          y="84"
          textAnchor="end"
          fill="currentColor"
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '80px',
          }}
        >
          G
        </text>

        {/* Right G — mirrored around x=90 */}
        <text
          x="-6"
          y="84"
          textAnchor="end"
          fill="currentColor"
          transform="scale(-1, 1)"
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '80px',
          }}
        >
          G
        </text>
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Stacked — hero / route curtains / 404
   viewBox 0 0 220 130
───────────────────────────────────────────── */

function StackedMark({ height, className, ariaLabel }: { height: number; className?: string; ariaLabel: string }) {
  const width = (height * 220) / 130;
  return (
    <svg
      viewBox="0 0 220 130"
      width={width}
      height={height}
      role="img"
      aria-label={ariaLabel}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Paired G monogram */}
      <g transform="translate(110, 0)">
        <text
          x="-6"
          y="84"
          textAnchor="end"
          fill="currentColor"
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '80px',
          }}
        >
          G
        </text>
        <text
          x="-6"
          y="84"
          textAnchor="end"
          fill="currentColor"
          transform="scale(-1, 1)"
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '80px',
          }}
        >
          G
        </text>
      </g>

      {/* GAZE wordmark */}
      <text
        x="110"
        y="106"
        textAnchor="middle"
        fill="currentColor"
        style={{
          fontFamily: 'var(--font-outfit), sans-serif',
          fontWeight: 300,
          fontSize: '20px',
          letterSpacing: '10px',
        }}
      >
        GAZE
      </text>

      {/* HOLDINGS sub-word */}
      <text
        x="110"
        y="123"
        textAnchor="middle"
        fill="currentColor"
        style={{
          fontFamily: 'var(--font-outfit), sans-serif',
          fontWeight: 400,
          fontSize: '7.5px',
          letterSpacing: '5px',
        }}
      >
        HOLDINGS
      </text>
    </svg>
  );
}
