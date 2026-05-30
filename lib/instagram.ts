/**
 * Live Instagram feed via the Instagram Graph API (Instagram Login flow).
 *
 * To go live:
 *   1. Create a Meta app and connect an Instagram **Business/Creator** account.
 *   2. Generate a long-lived access token (refreshes every ~60 days).
 *   3. Add INSTAGRAM_ACCESS_TOKEN to your environment (.env.local / Vercel).
 *
 * With no token configured this returns null, and the gallery falls back to the
 * curated tiles in content/instagram.ts. Results are cached and refreshed
 * nightly (revalidate: 86400) so we never hammer the API.
 */

export type InstagramPost = {
  id: string;
  caption?: string;
  mediaUrl: string;
  permalink: string;
  mediaType: string;
};

type RawMedia = {
  id: string;
  caption?: string;
  media_type: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
};

export async function getInstagramPosts(limit = 8): Promise<InstagramPost[] | null> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return null;

  try {
    const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink';
    const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=${limit}&access_token=${token}`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;

    const json = (await res.json()) as { data?: RawMedia[] };
    if (!json?.data?.length) return null;

    return json.data
      .map(m => ({
        id: m.id,
        caption: m.caption,
        // Video posts expose only a thumbnail; use it as the tile image.
        mediaUrl: m.media_type === 'VIDEO' ? (m.thumbnail_url ?? '') : (m.media_url ?? ''),
        permalink: m.permalink,
        mediaType: m.media_type,
      }))
      .filter(m => m.mediaUrl)
      .slice(0, limit);
  } catch {
    return null;
  }
}
