/**
 * The sums behind a price, from the client's notes of 28–29 Oct 2026: 16% VAT itemised on top of the base price, a 75%
 * deposit on the total, and a set charge for every extra length beyond a piece's standard size.
 */
export const VAT_RATE = 0.16;
export const DEPOSIT_RATE = 0.75;
/** Her example: every 2 ft added beyond the standard size is KES 3,500. Part of a step counts as a step. */
export const EXTRA_STEP_FT = 2;
export const EXTRA_STEP_KES = 3500;

/** What a made-to-measure length adds to the price. Shorter than standard costs the same as standard. */
export function lengthCharge(standardFt: number, chosenFt: number, stepFt: number = EXTRA_STEP_FT, stepKes: number = EXTRA_STEP_KES): number {
  if (!Number.isFinite(chosenFt) || chosenFt <= standardFt) return 0;
  // the small allowance keeps a length like 12.000000001 from counting as a further step
  return Math.ceil((chosenFt - standardFt) / stepFt - 1e-9) * stepKes;
}

export type Invoice = { subtotal: number; vat: number; total: number; deposit: number; balance: number };

/** The invoice for a base price, as QuickBooks will set it out. */
export function invoiceFor(subtotal: number): Invoice {
  const vat = Math.round(subtotal * VAT_RATE);
  const total = subtotal + vat;
  const deposit = Math.round(total * DEPOSIT_RATE);
  return { subtotal, vat, total, deposit, balance: total - deposit };
}

export const kes = (n: number) => `KES ${n.toLocaleString('en-KE')}`;
