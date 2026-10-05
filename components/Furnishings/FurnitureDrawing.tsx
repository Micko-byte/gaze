import type { Drawing } from '@/content/furnishings';

/**
 * Fine line drawings of each piece type, standing in for product photography until the studio shoot.
 * Drawn on a 200×140 grid with a single hairline weight, so they read as a set.
 */
const PATHS: Record<Drawing, string> = {
  sofa:
    'M22 92 V70 Q22 60 32 60 H168 Q178 60 178 70 V92 M30 60 V44 Q30 36 38 36 H162 Q170 36 170 44 V60 M22 92 H178 V104 H22 Z M100 60 V92 M34 104 V112 M166 104 V112',
  armchair: 'M60 96 V62 Q60 52 70 52 H130 Q140 52 140 62 V96 M68 52 V34 Q68 28 74 28 H126 Q132 28 132 34 V52 M60 96 H140 V108 H60 Z M70 108 V116 M130 108 V116',
  dining:
    'M40 70 H160 M46 70 V116 M154 70 V116 M40 70 V64 H160 V70 M14 116 V58 M14 84 H36 V116 M186 116 V58 M186 84 H164 V116 M70 40 Q100 30 130 40 M100 34 V64',
  bed: 'M18 112 V58 Q18 48 28 48 H58 V36 Q58 30 64 30 H136 Q142 30 142 36 V48 H172 Q182 48 182 58 V112 M18 84 H182 M18 112 H182 M30 84 V70 Q30 64 36 64 H86 Q92 64 92 70 V84 M108 84 V70 Q108 64 114 64 H164 Q170 64 170 70 V84 M24 112 V118 M176 112 V118',
  kids: 'M40 112 V62 Q40 54 48 54 H152 Q160 54 160 62 V112 M40 86 H160 M40 112 H160 M52 54 V38 M148 54 V38 M52 38 Q100 18 148 38 M60 86 V74 Q60 70 64 70 H100 Q104 70 104 74 V86',
  kitchen: 'M30 50 H170 V116 H30 Z M30 72 H170 M100 72 V116 M80 92 H90 M110 92 H120 M44 50 V30 H72 V50 M128 30 Q140 22 152 30 M140 26 V50',
  outdoor: 'M24 98 L70 70 H176 M70 70 L84 98 M24 98 H176 M40 98 V116 M160 98 V116 M150 70 V40 Q150 30 160 30 H176 M120 30 Q100 10 80 30 M100 20 V60',
  desk: 'M22 66 H178 M30 66 V116 M170 66 V116 M120 66 V116 H170 M120 82 H170 M120 98 H170 M58 66 V44 H92 V66 M66 44 V36 H84 V44',
};

export function FurnitureDrawing({ kind, className = '' }: { kind: Drawing; className?: string }) {
  return (
    <svg viewBox="0 0 200 140" className={className} aria-hidden="true">
      <path d={PATHS[kind]} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <line x1="8" y1="122" x2="192" y2="122" stroke="currentColor" strokeWidth="1" opacity="0.25" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
