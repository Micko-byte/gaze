import { shopConfig } from './shop';

export type Division = {
  id: string;
  number: string;
  category: string;
  name: string;
  tagline: string;
  detail: string;
  href: string;
  external: boolean;
  image: string;
  /** Optional Shopify storefront URL - when set, the card shows an inline 'Shop' chip. */
  shopHref?: string;
};

export const divisions: ReadonlyArray<Division> = [
  {
    id: 'furnishings',
    number: '01',
    category: 'Lifestyle',
    name: 'Gaze Furnishings',
    tagline: 'Bespoke interiors and residential commissions.',
    detail: 'Interiors, styling, material direction, and home environments with restraint.',
    href: '/furnishings',
    external: false,
    image: '/images/divisions/furnishings.jpg',
    shopHref: `${shopConfig.storefrontUrl}${shopConfig.collectionPath}`,
  },
  {
    id: 'press',
    number: '02',
    category: 'Publishing',
    name: 'Gaze Press Global',
    tagline: 'Books, editorials, and long-form thought.',
    detail: 'Publishing work shaped to outlive the moment.',
    href: '/press',
    external: false,
    image: '/images/divisions/press.jpg',
  },
  {
    id: 'institute',
    number: '03',
    category: 'Leadership',
    name: 'Gaze Leadership Institute',
    tagline: 'Training the next generation of African leaders.',
    detail: 'Formation, mentorship, and executive discipline for cohorts and leaders.',
    href: '/institute',
    external: false,
    image: '/images/divisions/institute.jpg',
  },
  {
    id: 'manor',
    number: '04',
    category: 'Broadcast',
    name: 'The Gaze Manor',
    tagline: 'Media, design, and broadcast under one estate.',
    detail: 'Film, production, and the group visual voice.',
    href: '/manor',
    external: false,
    image: '/images/divisions/manor.jpg',
  },
  {
    id: 'hergaze',
    number: '05',
    category: 'Transformation',
    name: 'HerGaze Global',
    tagline: 'Corporate, ministry, and transformation for women.',
    detail: 'Women-led convenings and enterprise leadership across markets.',
    href: '/hergaze',
    external: false,
    image: '/images/divisions/hergaze.jpg',
  },
];
