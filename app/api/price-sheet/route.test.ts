// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from './route';

const sheet = { settings: { extraStepFt: 2, extraStepKes: 3500, twoSeaterPct: 75, oneSeaterPct: 50 }, pieces: { 'simba-sofa': { price: 185000 } } };
const post = (body: unknown) => POST(new Request('http://x/api/price-sheet', { method: 'POST', body: typeof body === 'string' ? body : JSON.stringify(body) }));
const res = (status: number, json: unknown = {}) => new Response(JSON.stringify(json), { status });

describe('POST /api/price-sheet', () => {
  beforeEach(() => {
    vi.stubEnv('PRICE_SHEET_PASSWORD', 'right-password');
    vi.stubEnv('GITHUB_TOKEN', 'token');
    vi.stubGlobal('fetch', vi.fn());
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('says so when publishing has not been set up', async () => {
    vi.stubEnv('GITHUB_TOKEN', '');
    expect((await post({ password: 'right-password', sheet })).status).toBe(503);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('refuses a wrong password without touching the repository', async () => {
    const r = await post({ password: 'guess', sheet });
    expect(r.status).toBe(401);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('refuses a bad sheet without touching the repository', async () => {
    const r = await post({ password: 'right-password', sheet: { ...sheet, pieces: { nope: { price: 1 } } } });
    expect(r.status).toBe(400);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('refuses a body that is not JSON', async () => {
    expect((await post('not json')).status).toBe(400);
  });

  it('saves the cleaned sheet to prices.json', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(res(200, { sha: 'abc' })).mockResolvedValueOnce(res(200));
    const r = await post({ password: 'right-password', sheet });
    expect(r.status).toBe(200);
    expect(await r.json()).toEqual({ ok: true, priced: 1 });

    const [url, init] = vi.mocked(fetch).mock.calls[1] as [string, RequestInit];
    expect(url).toContain('/contents/content/prices.json');
    const sent = JSON.parse(init.body as string);
    expect(sent.sha).toBe('abc');
    expect(sent.branch).toBe('main');
    expect(JSON.parse(Buffer.from(sent.content, 'base64').toString())).toEqual(sheet);
  });

  it('tries again if the file changed in between', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(res(200, { sha: 'a' })).mockResolvedValueOnce(res(409)).mockResolvedValueOnce(res(200, { sha: 'b' })).mockResolvedValueOnce(res(200));
    expect((await post({ password: 'right-password', sheet })).status).toBe(200);
  });

  it('reports a failure from the repository', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(res(401));
    expect((await post({ password: 'right-password', sheet })).status).toBe(502);
  });
});
