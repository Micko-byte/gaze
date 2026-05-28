import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://gazeholdings.com', lastModified: new Date(), priority: 1 },
    { url: 'https://gazeholdings.com/institute', lastModified: new Date(), priority: 0.8 },
    { url: 'https://gazeholdings.com/manor', lastModified: new Date(), priority: 0.8 },
  ];
}
