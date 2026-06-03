/**
 * Recognition. We present only what is true.
 * No fabricated press logos - when real coverage exists, add it to `coverage`
 * and the section will render a logo row beneath the award.
 */

export const pressContent = {
  eyebrow: '05 · Recognition',
  heading: {
    pre: 'The work, ',
    accent: 'noticed',
    post: '.',
  },
  sub: 'Recognition follows the work - never the other way around.',
  award: {
    tag: 'Award · 2024',
    title: 'Businesswoman of the Year',
    detail: 'She Millionaire Business Summit · Limpopo, South Africa',
    holder: 'Awarded to Muthoni Ngugi, Founder & Director',
  },
  media: {
    label: 'Media & press enquiries',
    href: '#contact',
    cta: 'Write to us',
  },
  coverage: [] as ReadonlyArray<{ id: string; name: string }>,
} as const;
