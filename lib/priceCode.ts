import type { PriceSheet } from './priceSheet';

/**
 * Her whole price sheet as one line of text she can send on WhatsApp, for when the site can't save it directly.
 * scripts/import-prices.mjs reads it back. Plain web APIs only, so the same code runs in her browser and in Node.
 */
const PREFIX = 'GAZE-PRICES-1';
export const PRICE_CODE = /GAZE-PRICES-1(z?):([A-Za-z0-9_-]+)/;

function toBase64Url(bytes: Uint8Array): string {
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + 0x8000)));
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(s: string): Uint8Array {
  const raw = atob(s.replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

async function through(bytes: Uint8Array, stream: CompressionStream | DecompressionStream): Promise<Uint8Array> {
  return new Uint8Array(await new Response(new Blob([bytes as BlobPart]).stream().pipeThrough(stream)).arrayBuffer());
}

/** Compressed where the browser can, which keeps a full sheet of 91 pieces to a few hundred characters. */
export async function encodePriceSheet(sheet: PriceSheet): Promise<string> {
  const json = new TextEncoder().encode(JSON.stringify(sheet));
  if (typeof CompressionStream === 'function') {
    try {
      return `${PREFIX}z:${toBase64Url(await through(json, new CompressionStream('deflate-raw')))}`;
    } catch {
      /* an older browser without deflate-raw: send it uncompressed */
    }
  }
  return `${PREFIX}:${toBase64Url(json)}`;
}

/** Finds the code anywhere in a pasted message and returns the sheet inside it, still to be checked by cleanSheet. */
export async function decodePriceCode(text: string): Promise<unknown> {
  const m = text.match(PRICE_CODE);
  if (!m) throw new Error('There is no price code in that text. Copy her whole WhatsApp message and try again.');
  let bytes = fromBase64Url(m[2]);
  if (m[1]) bytes = await through(bytes, new DecompressionStream('deflate-raw'));
  return JSON.parse(new TextDecoder().decode(bytes));
}
