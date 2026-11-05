import { describe, it, expect } from 'vitest';
import { invoiceFor, kes, lengthCharge } from './pricing';

describe('invoiceFor', () => {
  it('matches her QuickBooks example to the shilling', () => {
    expect(invoiceFor(54200)).toEqual({ subtotal: 54200, vat: 8672, total: 62872, deposit: 47154, balance: 15718 });
  });

  it('always splits the total exactly into deposit and balance', () => {
    for (const base of [1, 999, 54201, 185000, 423333]) {
      const i = invoiceFor(base);
      expect(i.deposit + i.balance).toBe(i.total);
    }
  });
});

describe('lengthCharge', () => {
  it('charges KES 3,500 for every 2 ft beyond standard', () => {
    expect(lengthCharge(10, 12)).toBe(3500);
    expect(lengthCharge(10, 14)).toBe(7000);
  });

  it('counts part of a step as a step', () => {
    expect(lengthCharge(10, 10.5)).toBe(3500);
    expect(lengthCharge(10, 12.5)).toBe(7000);
  });

  it('adds nothing at or below standard, or for an empty entry', () => {
    expect(lengthCharge(10, 10)).toBe(0);
    expect(lengthCharge(10, 7)).toBe(0);
    expect(lengthCharge(10, NaN)).toBe(0);
  });
});

describe('kes', () => {
  it('writes the amount with its currency', () => {
    expect(kes(54200)).toBe('KES 54,200');
  });
});
