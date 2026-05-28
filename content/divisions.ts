export type Division = {
  id: string;
  number: string;
  category: string;
  name: string;
  tagline: string;
  href: string;
  external: boolean;
  image: string;
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
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'press',
    number: '02',
    category: 'Publishing',
    name: 'Gaze Press Global',
    tagline: 'Books that shape leaders and outlive trends.',
    href: 'https://press.gaze.co',
    external: true,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'institute',
    number: '03',
    category: 'Leadership',
    name: 'Gaze Leadership Institute',
    tagline: 'Training the next generation of African kingdom leaders.',
    href: '/institute',
    external: false,
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'manor',
    number: '04',
    category: 'Broadcast',
    name: 'The Gaze Manor',
    tagline: 'Media production, design, broadcast — built on a single estate.',
    href: '/manor',
    external: false,
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'hergaze',
    number: '05',
    category: 'Transformation',
    name: 'HerGaze Global',
    tagline: 'Corporate. Ministry. Transformation. For women.',
    href: 'https://hergaze.global',
    external: true,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
  },
];
