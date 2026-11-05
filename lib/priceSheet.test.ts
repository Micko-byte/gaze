import { describe, it, expect } from 'vitest';
import { cleanSheet } from './priceSheet';

const slugs = new Set(['simba-sofa', 'chui-bed']);
const settings = { extraStepFt: 2, extraStepKes: 3500, twoSeaterPct: 75, oneSeaterPct: 50 };

describe('cleanSheet', () => {
  it('keeps valid rows and tidies sizes', () => {
    const r = cleanSheet({ settings, pieces: { 'simba-sofa': { price: 185000, size: '  10 ft   wide ', ft: 10 } } }, slugs);
    expect(r).toEqual({ ok: true, sheet: { settings, pieces: { 'simba-sofa': { price: 185000, size: '10 ft wide', ft: 10 } } } });
  });

  it('drops anything it does not know about', () => {
    const r = cleanSheet({ settings: { ...settings, extra: 1 }, other: 1, pieces: { 'chui-bed': { price: 90000, cost: 35000 } } }, slugs);
    expect(r).toEqual({ ok: true, sheet: { settings, pieces: { 'chui-bed': { price: 90000 } } } });
  });

  it('leaves empty rows out', () => {
    const r = cleanSheet({ settings, pieces: { 'chui-bed': {} } }, slugs);
    expect(r).toEqual({ ok: true, sheet: { settings, pieces: {} } });
  });

  it.each([
    ['an unknown piece', { settings, pieces: { 'made-up': { price: 1000 } } }],
    ['a negative price', { settings, pieces: { 'simba-sofa': { price: -5 } } }],
    ['a price in text', { settings, pieces: { 'simba-sofa': { price: '185000' } } }],
    ['part of a shilling', { settings, pieces: { 'simba-sofa': { price: 1000.5 } } }],
    ['an absurd price', { settings, pieces: { 'simba-sofa': { price: 1e12 } } }],
    ['a very long size', { settings, pieces: { 'simba-sofa': { size: 'x'.repeat(121) } } }],
    ['a bad length', { settings, pieces: { 'simba-sofa': { ft: 0 } } }],
    ['a zero step', { settings: { ...settings, extraStepFt: 0 }, pieces: {} }],
    ['a bad percentage', { settings: { ...settings, oneSeaterPct: 500 }, pieces: {} }],
    ['no settings', { pieces: {} }],
    ['nothing at all', null],
  ])('refuses %s', (_name, input) => {
    expect(cleanSheet(input, slugs).ok).toBe(false);
  });
});
