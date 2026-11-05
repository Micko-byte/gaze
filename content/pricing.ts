import type { Drawing, Piece } from './furnishings';
import type { PriceSheet } from '@/lib/priceSheet';
import published from './prices.json';

const sheet = published as PriceSheet;

/**
 * TEST FIGURES, not her price list. On the review call of late Oct 2026 she asked for approximate prices and sizes so
 * that everyone can test the calculations ("don't put actual, put about") while her new accountant sets the real ones.
 * She sets the real ones on /furnishings/price-list, which saves content/prices.json; those take over piece by piece,
 * and any piece still on a test figure is labelled "indicative".
 */

type Spec = {
  /** Base price in KES, excluding VAT. */
  price: number;
  /** The standard length in feet that made-to-measure counts from; null where length isn't what a buyer changes. */
  ft: number | null;
  size: string;
};

const BY_DRAWING: Record<Drawing, Spec> = {
  sofa: { price: 185000, ft: 10, size: '10 ft W × 3 ft D × 2.7 ft H' },
  outdoor: { price: 165000, ft: 8, size: '8 ft W × 3 ft D × 2.5 ft H' },
  armchair: { price: 65000, ft: null, size: '2.8 ft W × 2.8 ft D × 2.7 ft H' },
  table: { price: 48000, ft: 4, size: '4 ft W × 2 ft D × 1.4 ft H' },
  dining: { price: 195000, ft: 7, size: '7 ft L × 3.5 ft W × 2.5 ft H' },
  sideboard: { price: 95000, ft: 6, size: '6 ft W × 1.5 ft D × 2.7 ft H' },
  bed: { price: 145000, ft: 6, size: '6 ft W × 6.5 ft L, a king' },
  kids: { price: 85000, ft: 4, size: '4 ft W × 6.5 ft L' },
  bunk: { price: 125000, ft: null, size: '3.5 ft W × 6.5 ft L × 5.5 ft H' },
  wardrobe: { price: 160000, ft: 6, size: '6 ft W × 2 ft D × 8 ft H' },
  kitchen: { price: 420000, ft: 10, size: '10 ft run of cabinets' },
  stool: { price: 95000, ft: null, size: 'Counter 6 ft W, with two stools' },
  lounger: { price: 58000, ft: null, size: '6.5 ft L × 2.5 ft W' },
  desk: { price: 135000, ft: 6, size: '6 ft W × 3 ft D × 2.5 ft H' },
  bookcase: { price: 78000, ft: 5, size: '5 ft W × 1.2 ft D × 7 ft H' },
};

const BY_SLUG: Record<string, Partial<Spec>> = {
  'milia-credenza': { price: 145000, ft: null, size: '4.5 ft W × 1.2 ft D × 2.8 ft H' },
  'hondohondo-side-table': { price: 28000, ft: null, size: '1.6 ft across × 2 ft H' },
  'hondohondo-bench': { price: 75000, ft: 5, size: '5 ft W × 2.2 ft D × 2.4 ft H' },
  'kerengende-dressing-table': { price: 88000, ft: null, size: '4 ft W × 1.5 ft D, with mirror and stool' },
  'pimbi-cot': { price: 45000, ft: null, size: '2.2 ft W × 4.2 ft L' },
  'sokwe-play-kitchen': { price: 38000, ft: null, size: '2.8 ft W × 1.2 ft D × 4 ft H' },
  'ndege-play-kitchen': { price: 52000, ft: null, size: '5 ft W × 1.2 ft D × 4 ft H' },
  'komba-twin-beds': { price: 150000, size: 'Two beds, each 3.5 ft W × 6.5 ft L' },
  'fungo-twin-beds': { price: 150000, size: 'Two beds, each 3.5 ft W × 6.5 ft L' },
};

/** The test figure for a piece, before anything she has set. */
export function testSpec(piece: Piece): Spec {
  return { ...BY_DRAWING[piece.drawing], ...BY_SLUG[piece.slug] };
}

/** What the site shows for a piece: her figures where she has set them, and test figures for the rest. */
export function pieceSpec(piece: Piece): Spec & { confirmed: boolean } {
  const set = sheet.pieces[piece.slug];
  return { ...testSpec(piece), ...set, confirmed: set?.price !== undefined };
}

export const priceIsSet = (slug: string) => sheet.pieces[slug]?.price !== undefined;
export const priceSheet = sheet;
export const priceSettings = sheet.settings;

/* Couches sold in parts: a buyer picks how many of each. A 2-seater and 1-seater are priced as a share of the 3-seater. */
export const SEATER_SHARE: ReadonlyArray<{ seats: 3 | 2 | 1; label: string; share: number }> = [
  { seats: 3, label: '3-seater', share: 1 },
  { seats: 2, label: '2-seater', share: sheet.settings.twoSeaterPct / 100 },
  { seats: 1, label: '1-seater', share: sheet.settings.oneSeaterPct / 100 },
];
