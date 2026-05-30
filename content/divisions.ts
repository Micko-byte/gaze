import { shopConfig } from './shop';

export type Division = {
  id: string;
  number: string;
  category: string;
  name: string;
  tagline: string;
  href: string;
  external: boolean;
  image: string;
  /** Optional Shopify storefront URL — when set, the card shows an inline 'Shop' chip. */
  shopHref?: string;
};

export const divisions: ReadonlyArray<Division> = [
  {
    id: 'furnishings',
    number: '01',
    category: 'Lifestyle',
    name: 'Gaze Furnishings',
    tagline: 'Bespoke interiors and luxury residential commissions.',
    href: 'https://furnishings.gaze.co',
    external: true,
    image: '/images/divisions/furnishings.jpg',
    shopHref: `${shopConfig.storefrontUrl}${shopConfig.collectionPath}`,
  },
  {
    id: 'press',
    number: '02',
    category: 'Publishing',
    name: 'Gaze Press Global',
    tagline: 'Books that shape leaders and outlive trends.',
    href: 'https://press.gaze.co',
    external: true,
    image: '/images/divisions/press.jpg',
  },
  {
    id: 'institute',
    number: '03',
    category: 'Leadership',
    name: 'Gaze Leadership Institute',
    tagline: 'Training the next generation of African kingdom leaders.',
    href: '/institute',
    external: false,
    image: '/images/divisions/institute.jpg',
  },
  {
    id: 'manor',
    number: '04',
    category: 'Broadcast',
    name: 'The Gaze Manor',
    tagline: 'Media production, design, broadcast — built on a single estate.',
    href: '/manor',
    external: false,
    image: '/images/divisions/manor.jpg',
  },
  {
    id: 'hergaze',
    number: '05',
    category: 'Transformation',
    name: 'HerGaze Global',
    tagline: 'Corporate. Ministry. Transformation. For women.',
    href: 'https://hergaze.global',
    external: true,
    image: '/images/divisions/hergaze.jpg',
  },
];
