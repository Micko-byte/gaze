import { describe, it, expect, vi } from 'vitest';
import type { Piece } from './furnishings';
import { pieceSpec, priceIsSet, priceSettings, SEATER_SHARE, testSpec } from './pricing';

vi.mock('./prices.json', () => ({
  default: {
    settings: { extraStepFt: 3, extraStepKes: 5000, twoSeaterPct: 80, oneSeaterPct: 40 },
    pieces: { 'set-sofa': { price: 240000, size: '12 ft wide', ft: 12 }, 'sized-only': { size: '9 ft' } },
  },
}));

const sofa = (slug: string) => ({ slug, drawing: 'sofa' }) as Piece;

describe('pieceSpec', () => {
  it('uses her figures where she has set them', () => {
    expect(pieceSpec(sofa('set-sofa'))).toMatchObject({ price: 240000, size: '12 ft wide', ft: 12, confirmed: true });
  });

  it('stays on the test figure, marked unconfirmed, where she has not', () => {
    expect(pieceSpec(sofa('other'))).toMatchObject({ price: testSpec(sofa('other')).price, confirmed: false });
  });

  it('a size without a price is still unconfirmed', () => {
    expect(pieceSpec(sofa('sized-only'))).toMatchObject({ size: '9 ft', confirmed: false });
    expect(priceIsSet('sized-only')).toBe(false);
  });
});

describe('settings', () => {
  it('come from the sheet', () => {
    expect(priceSettings.extraStepKes).toBe(5000);
    expect(SEATER_SHARE.map((s) => s.share)).toEqual([1, 0.8, 0.4]);
  });
});
