/**
 * The price sheet: what the client sets on /furnishings/price-list, stored in content/prices.json. Everything that
 * reaches that file passes through cleanSheet, whichever way it arrives.
 */
export type SheetPiece = { price?: number; size?: string; ft?: number };
export type PriceSettings = { extraStepFt: number; extraStepKes: number; twoSeaterPct: number; oneSeaterPct: number };
export type PriceSheet = { settings: PriceSettings; pieces: Record<string, SheetPiece> };

const MAX_PRICE = 100_000_000;
const MAX_SIZE_CHARS = 120;

const inRange = (n: unknown, min: number, max: number): n is number => typeof n === 'number' && Number.isFinite(n) && n >= min && n <= max;

/** Checks a sheet and returns a tidy copy holding only what's known, or says what is wrong in plain words. */
export function cleanSheet(input: unknown, slugs: ReadonlySet<string>): { ok: true; sheet: PriceSheet } | { ok: false; error: string } {
  if (typeof input !== 'object' || input === null) return { ok: false, error: 'The price sheet is empty.' };
  const { settings, pieces } = input as { settings?: Partial<PriceSettings>; pieces?: Record<string, SheetPiece> };
  if (typeof settings !== 'object' || settings === null || typeof pieces !== 'object' || pieces === null) return { ok: false, error: 'The price sheet is incomplete.' };

  const { extraStepFt, extraStepKes, twoSeaterPct, oneSeaterPct } = settings;
  if (!inRange(extraStepFt, 0.5, 20)) return { ok: false, error: 'The made-to-measure step must be between 0.5 and 20 ft.' };
  if (!inRange(extraStepKes, 0, MAX_PRICE)) return { ok: false, error: 'The made-to-measure charge is not a valid amount.' };
  if (!inRange(twoSeaterPct, 1, 100) || !inRange(oneSeaterPct, 1, 100)) return { ok: false, error: 'Seater percentages must be between 1 and 100.' };

  const clean: Record<string, SheetPiece> = {};
  for (const [slug, row] of Object.entries(pieces)) {
    if (!slugs.has(slug)) return { ok: false, error: `Unknown piece: ${slug.slice(0, 60)}.` };
    if (typeof row !== 'object' || row === null) return { ok: false, error: `Check the row for ${slug}.` };
    const out: SheetPiece = {};
    if (row.price !== undefined) {
      if (!inRange(row.price, 1, MAX_PRICE) || !Number.isInteger(row.price)) return { ok: false, error: `The price for ${slug} must be a whole number of shillings.` };
      out.price = row.price;
    }
    if (row.ft !== undefined) {
      if (!inRange(row.ft, 0.5, 100)) return { ok: false, error: `The standard length for ${slug} must be between 0.5 and 100 ft.` };
      out.ft = row.ft;
    }
    if (row.size !== undefined) {
      const size = typeof row.size === 'string' ? row.size.replace(/\s+/g, ' ').trim() : '';
      if (!size || size.length > MAX_SIZE_CHARS) return { ok: false, error: `The size for ${slug} must be up to ${MAX_SIZE_CHARS} characters.` };
      out.size = size;
    }
    if (Object.keys(out).length) clean[slug] = out;
  }
  return { ok: true, sheet: { settings: { extraStepFt, extraStepKes, twoSeaterPct, oneSeaterPct }, pieces: clean } };
}
