// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { decodePriceCode, encodePriceSheet, PRICE_CODE } from './priceCode';
import type { PriceSheet } from './priceSheet';

const sheet: PriceSheet = {
  settings: { extraStepFt: 2, extraStepKes: 3500, twoSeaterPct: 75, oneSeaterPct: 50 },
  pieces: { 'simba-sofa': { price: 245000, size: '10 ft W × 3 ft D', ft: 10 }, 'chui-bed': { price: 98000 } },
};

describe('price code', () => {
  it('comes back exactly as it went in, from inside a WhatsApp message', async () => {
    const code = await encodePriceSheet(sheet);
    expect(code).toMatch(PRICE_CODE);
    const message = `Hello, here are my Gaze Furnishings prices: 2 of 91 pieces priced.\n\nFor the web team: ${code}\n`;
    expect(await decodePriceCode(message)).toEqual(sheet);
  });

  it('stays short for a full sheet', async () => {
    const full: PriceSheet = { ...sheet, pieces: Object.fromEntries(Array.from({ length: 91 }, (_, i) => [`piece-number-${i}`, { price: 100000 + i * 1000 }])) };
    const code = await encodePriceSheet(full);
    expect(code.length).toBeLessThan(2000);
    expect(await decodePriceCode(code)).toEqual(full);
  });

  it('says so when a message has no code', async () => {
    await expect(decodePriceCode('Hello, prices coming tomorrow')).rejects.toThrow(/no price code/);
  });

  it('refuses a damaged code', async () => {
    const code = await encodePriceSheet(sheet);
    await expect(decodePriceCode(code.slice(0, -12))).rejects.toThrow();
  });
});
