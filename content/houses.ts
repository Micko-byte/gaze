import type { LogoId } from '@/components/Logo/logos';

/**
 * The houses of Gaze Holdings: routes, logos and brand-kit colours. The showcase, the page transitions and the
 * division pages all read from here. Copy follows the client's discovery answers (3 Oct 2026).
 */
export type HouseId = 'holdings' | 'furnishings' | 'institute' | 'hergaze' | 'press';

export type House = {
  id: HouseId;
  logo: LogoId;
  name: string;
  line: string;
  href: string;
  /** The house's own ground: logos sit on it, its pages are set on it. */
  ground: string;
  ink: string;
  accent: string;
  /** Colours that close in, outermost first, when a page of this house opens. */
  stack: [string, string, string];
};

export const HOLDINGS: House = {
  id: 'holdings',
  logo: 'holdings',
  name: 'Gaze Holdings',
  line: 'A House of Brands.',
  href: '/',
  ground: '#F3EFE6',
  ink: '#0A1631',
  accent: '#DEBA78',
  stack: ['#DEBA78', '#AE8448', '#06122A'],
};

export const houses: ReadonlyArray<House> = [
  {
    id: 'furnishings',
    logo: 'furnishings',
    name: 'Gaze Furnishings',
    line: 'Bespoke furniture, made in Nairobi and delivered worldwide.',
    href: '/furnishings',
    ground: '#EEE7DF',
    ink: '#1E1E22',
    accent: '#C99DC2',
    stack: ['#7B5232', '#C99DC2', '#1E1E22'],
  },
  {
    id: 'institute',
    logo: 'institute',
    name: 'Gaze Leadership Institute',
    line: 'Programmes for leaders, with fixed intakes and enrolment online.',
    href: '/institute',
    ground: '#F6F4EE',
    ink: '#0B1A40',
    accent: '#7A1F2E',
    stack: ['#4C88F0', '#7A1F2E', '#0B1A40'],
  },
  {
    id: 'hergaze',
    logo: 'hergaze',
    name: 'Her Gaze Global',
    line: 'Summits and retreats. We do not host events; we assemble power.',
    href: '/hergaze',
    ground: '#F1E4D6',
    ink: '#1A1A1A',
    accent: '#C8186F',
    stack: ['#C25530', '#C8186F', '#1A1A1A'],
  },
  {
    id: 'press',
    logo: 'press',
    name: 'Gaze Press Global',
    line: 'Books and archives that carry the voice of the house.',
    href: '/press',
    ground: '#ECE7DF',
    ink: '#111111',
    accent: '#B5776F',
    stack: ['#B5776F', '#ECE7DF', '#111111'],
  },
];

/** Which house a path belongs to (for the page transition colours). */
export function houseForPath(path: string): House {
  return houses.find((h) => path === h.href || path.startsWith(`${h.href}/`)) ?? HOLDINGS;
}
