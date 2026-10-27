import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: 'https://gazeholdings.com', lastModified: now, priority: 1 },
    { url: 'https://gazeholdings.com/institute', lastModified: now, priority: 0.8 },
    ...['about', 'programs', 'prophetic-intelligence', 'admissions', 'corporate', 'contact'].map((p) => ({
      url: `https://gazeholdings.com/institute/${p}`,
      lastModified: now,
      priority: 0.7,
    })),
    { url: 'https://gazeholdings.com/manor', lastModified: now, priority: 0.8 },
    { url: 'https://gazeholdings.com/meet-the-director', lastModified: now, priority: 0.8 },
    { url: 'https://gazeholdings.com/legal/privacy', lastModified: now, priority: 0.3 },
    { url: 'https://gazeholdings.com/legal/terms', lastModified: now, priority: 0.3 },
    { url: 'https://gazeholdings.com/legal/cookies', lastModified: now, priority: 0.3 },
  ];
}
