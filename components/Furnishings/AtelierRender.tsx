import { useId, type CSSProperties } from 'react';
import { finishes, timbers, type Configuration, type StudioForm, type TextureId, type TimberId } from '@/content/furnishings';

/*
 * The look of each material, drawn over its colour: the same overlays dress the swatch cards and the live render, so
 * what is chosen in the grid is exactly what appears on the piece.
 */
const damask = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='36' height='48' viewBox='0 0 36 48'><path d='M18 4c6 6 10 10 10 20s-4 14-10 20c-6-6-10-10-10-20S12 10 18 4z' fill='rgba(255,255,255,0.16)' stroke='rgba(0,0,0,0.2)' stroke-width='1'/><path d='M18 14c3 3 4 6 4 10s-1 7-4 10c-3-3-4-6-4-10s1-7 4-10z' fill='rgba(0,0,0,0.14)'/><circle cx='0' cy='0' r='3' fill='rgba(255,255,255,0.18)'/><circle cx='36' cy='0' r='3' fill='rgba(255,255,255,0.18)'/><circle cx='0' cy='48' r='3' fill='rgba(255,255,255,0.18)'/><circle cx='36' cy='48' r='3' fill='rgba(255,255,255,0.18)'/></svg>",
);

const OVERLAYS: Record<TextureId | TimberId, string> = {
  velvet:
    'linear-gradient(125deg, rgba(255,255,255,0.34), rgba(255,255,255,0) 32%, rgba(0,0,0,0.34) 68%, rgba(255,255,255,0.1)), repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 3px)',
  boucle:
    'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0 1.1px, transparent 1.7px) 0 0/5px 5px, radial-gradient(circle at 75% 70%, rgba(0,0,0,0.22) 0 1.2px, transparent 1.8px) 0 0/5px 5px, radial-gradient(circle at 70% 25%, rgba(255,255,255,0.16) 0 0.9px, transparent 1.4px) 2px 1px/7px 7px, radial-gradient(circle at 20% 80%, rgba(0,0,0,0.12) 0 0.9px, transparent 1.4px) 1px 3px/6px 6px',
  linen:
    'repeating-linear-gradient(0deg, rgba(255,255,255,0.14) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(0,0,0,0.11) 0 1px, transparent 1px 4px), linear-gradient(160deg, rgba(255,255,255,0.08), rgba(0,0,0,0.08))',
  leather:
    'radial-gradient(ellipse at 28% 18%, rgba(255,255,255,0.36), transparent 55%), radial-gradient(ellipse at 82% 92%, rgba(0,0,0,0.32), transparent 60%), radial-gradient(rgba(0,0,0,0.12) 0.8px, transparent 1.3px) 0 0/4px 4px',
  damask: `url("data:image/svg+xml,${damask}") 0 0/36px 48px, linear-gradient(140deg, rgba(255,255,255,0.14), rgba(0,0,0,0.16))`,
  oak: 'repeating-linear-gradient(93deg, rgba(0,0,0,0.08) 0 2px, transparent 2px 7px, rgba(255,255,255,0.08) 7px 8px, transparent 8px 13px), radial-gradient(ellipse at 30% 40%, rgba(0,0,0,0.12), transparent 30%)',
  walnut: 'repeating-linear-gradient(91deg, rgba(0,0,0,0.16) 0 2px, transparent 2px 6px, rgba(255,255,255,0.06) 6px 7px, transparent 7px 12px), radial-gradient(ellipse at 65% 60%, rgba(0,0,0,0.18), transparent 32%)',
  lacquer: 'linear-gradient(160deg, rgba(255,255,255,0.3), transparent 40%, rgba(0,0,0,0.2))',
};

/** The colour a configuration is made in: the chosen house colour, or the timber's own. */
export function baseHex(c: Configuration, colourHex: string | undefined): string {
  const timber = timbers.find((t) => t.id === c.material);
  if (timber && timber.id !== 'lacquer') return timber.hex;
  return colourHex ?? '#CFC6B8';
}

export const materialStyle = (material: TextureId | TimberId, hex: string): CSSProperties => ({ background: `${OVERLAYS[material]}, ${hex}` });

/* ── the forms the studio can dress, drawn in a 600 × 400 box ── */

type Shape = { kind: 'rect'; x: number; y: number; w: number; h: number; r: number } | { kind: 'path'; d: string };

const UPHOLSTERY: Record<Exclude<StudioForm, 'case'>, Shape[]> = {
  sofa: [
    { kind: 'rect', x: 78, y: 92, w: 444, h: 150, r: 46 },
    { kind: 'rect', x: 120, y: 118, w: 176, h: 118, r: 34 },
    { kind: 'rect', x: 304, y: 118, w: 176, h: 118, r: 34 },
    { kind: 'rect', x: 40, y: 150, w: 96, h: 170, r: 40 },
    { kind: 'rect', x: 464, y: 150, w: 96, h: 170, r: 40 },
    // the deck under the seat cushions, so no light shows between them
    { kind: 'rect', x: 120, y: 226, w: 360, h: 70, r: 12 },
    { kind: 'rect', x: 128, y: 214, w: 172, h: 76, r: 24 },
    { kind: 'rect', x: 300, y: 214, w: 172, h: 76, r: 24 },
    { kind: 'rect', x: 58, y: 282, w: 484, h: 48, r: 18 },
  ],
  chair: [
    { kind: 'path', d: 'M150 132 C150 58 450 58 450 132 L464 268 C464 300 136 300 136 268 Z' },
    { kind: 'path', d: 'M196 140 C196 104 404 104 404 140 L410 214 L190 214 Z' },
    { kind: 'rect', x: 182, y: 200, w: 236, h: 74, r: 28 },
    { kind: 'rect', x: 168, y: 268, w: 264, h: 38, r: 16 },
  ],
  bed: [
    { kind: 'rect', x: 110, y: 52, w: 380, h: 182, r: 36 },
    { kind: 'rect', x: 80, y: 250, w: 440, h: 76, r: 20 },
  ],
};

const LEGS: Record<Exclude<StudioForm, 'case'>, { x: number; y: number; w: number; h: number }[]> = {
  sofa: [
    { x: 74, y: 330, w: 16, h: 26 },
    { x: 510, y: 330, w: 16, h: 26 },
    { x: 150, y: 330, w: 12, h: 18 },
    { x: 438, y: 330, w: 12, h: 18 },
  ],
  chair: [
    { x: 186, y: 306, w: 14, h: 40 },
    { x: 400, y: 306, w: 14, h: 40 },
    { x: 236, y: 306, w: 10, h: 26 },
    { x: 354, y: 306, w: 10, h: 26 },
  ],
  bed: [
    { x: 96, y: 326, w: 18, h: 22 },
    { x: 486, y: 326, w: 18, h: 22 },
  ],
};

function ShapeEl({ s, ...rest }: { s: Shape; fill?: string; stroke?: string; strokeWidth?: number; transform?: string }) {
  return s.kind === 'rect' ? <rect x={s.x} y={s.y} width={s.w} height={s.h} rx={s.r} {...rest} /> : <path d={s.d} {...rest} />;
}

/**
 * The live render: the piece's form dressed in the chosen fabric and colour, standing on legs in the chosen finish.
 * The fabric is the same CSS texture as the swatch cards, clipped to the form; shading and seams sit over it.
 */
export function AtelierRender({ form, config, hex, className = '' }: { form: Exclude<StudioForm, 'case'>; config: Configuration; hex: string; className?: string }) {
  const uid = useId().replace(/:/g, '');
  const finish = finishes.find((f) => f.id === config.finish)!;
  const shapes = UPHOLSTERY[form];

  return (
    <div className={`relative aspect-[3/2] ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 600 400" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id={`floor-${uid}`}>
            <stop offset="0" stopColor="rgba(30,30,34,0.32)" />
            <stop offset="1" stopColor="rgba(30,30,34,0)" />
          </radialGradient>
          <linearGradient id={`metal-${uid}`} x1="0" x2="1">
            <stop offset="0" stopColor={finish.hex} />
            <stop offset="0.45" stopColor={finish.id === 'brass' ? '#E6CB91' : finish.id === 'black' ? '#3A3A3D' : '#9A6A43'} />
            <stop offset="1" stopColor={finish.hex} />
          </linearGradient>
          {/* a clipPath takes only shapes (no groups), so each one carries the scale to the box's 0–1 units */}
          <clipPath id={`clip-${uid}`} clipPathUnits="objectBoundingBox">
            {shapes.map((s, i) => (
              <ShapeEl key={i} s={s} transform="scale(0.0016667 0.0025)" />
            ))}
          </clipPath>
        </defs>
        <ellipse cx="300" cy="352" rx="290" ry="22" fill={`url(#floor-${uid})`} />
        {LEGS[form].map((l, i) => (
          <path key={i} d={`M${l.x} ${l.y} h${l.w} l-${l.w * 0.18} ${l.h} h-${l.w * 0.64} Z`} fill={`url(#metal-${uid})`} />
        ))}
      </svg>

      {/* the fabric itself, cut to the form */}
      <div className="absolute inset-0 transition-[background] duration-500" style={{ ...materialStyle(config.material, hex), clipPath: `url(#clip-${uid})` }} />

      <svg aria-hidden="true" viewBox="0 0 600 400" className="pointer-events-none absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={`shade-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="0.45" stopColor="rgba(255,255,255,0)" />
            <stop offset="1" stopColor="rgba(0,0,0,0.3)" />
          </linearGradient>
        </defs>
        {shapes.map((s, i) => (
          <ShapeEl key={i} s={s} fill={`url(#shade-${uid})`} stroke="rgba(0,0,0,0.28)" strokeWidth={1.5} />
        ))}
        {form === 'bed' && (
          <g>
            {/* the bedding stays in white linen; a throw in the chosen colour ties it to the frame */}
            <rect x="96" y="196" width="408" height="72" rx="16" fill="#F4F0E8" stroke="rgba(0,0,0,0.12)" />
            <rect x="96" y="196" width="408" height="72" rx="16" fill={`url(#shade-${uid})`} opacity="0.6" />
            <rect x="150" y="150" width="130" height="58" rx="24" fill="#FBF8F2" stroke="rgba(0,0,0,0.12)" />
            <rect x="320" y="150" width="130" height="58" rx="24" fill="#FBF8F2" stroke="rgba(0,0,0,0.12)" />
            <rect x="96" y="238" width="408" height="22" rx="6" fill={hex} opacity="0.9" />
          </g>
        )}
      </svg>
    </div>
  );
}
