import { createHash, timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { pieces } from '@/content/furnishings';
import { cleanSheet } from '@/lib/priceSheet';

export const dynamic = 'force-dynamic';

const PATH = 'content/prices.json';
const BRANCH = 'main';
const slugs = new Set(pieces.map((p) => p.slug));

const digest = (s: string) => createHash('sha256').update(s).digest();
const reply = (body: object, status: number) => NextResponse.json(body, { status });

/**
 * Publishes the price sheet: saves content/prices.json to the repository, which redeploys the site with her prices.
 * No database is involved. It runs only with PRICE_SHEET_PASSWORD and GITHUB_TOKEN set on the host, and the token
 * should be limited to this one repository's contents.
 */
export async function POST(request: Request) {
  const password = process.env.PRICE_SHEET_PASSWORD;
  const token = process.env.GITHUB_TOKEN;
  if (!password || !token) return reply({ error: 'not-configured' }, 503);

  let body: { password?: unknown; sheet?: unknown };
  try {
    body = await request.json();
  } catch {
    return reply({ error: 'The price sheet could not be read.' }, 400);
  }

  if (typeof body.password !== 'string' || !timingSafeEqual(digest(body.password), digest(password))) {
    await new Promise((r) => setTimeout(r, 1000)); // slows guessing
    return reply({ error: 'wrong-password' }, 401);
  }

  const cleaned = cleanSheet(body.sheet, slugs);
  if (!cleaned.ok) return reply({ error: cleaned.error }, 400);

  const repo = process.env.GITHUB_REPO ?? 'Micko-byte/gaze';
  const url = `https://api.github.com/repos/${repo}/contents/${PATH}`;
  const headers = { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };
  const content = Buffer.from(`${JSON.stringify(cleaned.sheet, null, 2)}\n`).toString('base64');

  // twice, in case another save lands between reading the file and writing it
  for (let attempt = 0; attempt < 2; attempt++) {
    const current = await fetch(`${url}?ref=${BRANCH}`, { headers, cache: 'no-store' });
    if (!current.ok) return reply({ error: 'The site could not be reached to save the prices. Nothing was changed.' }, 502);
    const { sha } = (await current.json()) as { sha: string };

    const saved = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ message: 'Prices updated from the price sheet', content, sha, branch: BRANCH }),
    });
    if (saved.ok) return reply({ ok: true, priced: Object.values(cleaned.sheet.pieces).filter((p) => p.price !== undefined).length }, 200);
    if (saved.status !== 409) return reply({ error: 'The site could not save the prices. Nothing was changed.' }, 502);
  }
  return reply({ error: 'Someone else was saving at the same moment. Please publish again.' }, 409);
}
