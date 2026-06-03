/**
 * Instagram gallery copy + the curated fallback tiles shown until the live
 * Graph API feed is connected (see lib/instagram.ts). Fallback uses existing
 * self-hosted imagery so the grid always looks intentional.
 */

export const instagramSection = {
  eyebrow: 'Instagram',
  heading: {
    pre: 'The latest, ',
    accent: 'unfiltered',
    post: '.',
  },
  cta: 'Follow on Instagram',
} as const;

export type FallbackTile = { key: string; image: string; alt: string };

export const instagramFallback: ReadonlyArray<FallbackTile> = [
  { key: 'f1', image: '/images/divisions/furnishings.jpg', alt: 'Interiors' },
  { key: 'f2', image: '/images/founder/muthoni-ngugi-new.webp', alt: 'The founder' },
  { key: 'f3', image: '/images/divisions/press.jpg', alt: 'Press' },
  { key: 'f4', image: '/images/founder/muthoni-ngugi-new.webp', alt: 'The Manor' },
  { key: 'f5', image: '/images/divisions/hergaze.jpg', alt: 'HerGaze' },
  { key: 'f6', image: '/images/contact-backdrop.jpg', alt: 'A quiet moment' },
  { key: 'f7', image: '/images/divisions/institute.jpg', alt: 'The Institute' },
  { key: 'f8', image: '/video/hero-poster.jpg', alt: 'Gaze Holdings' },
];
