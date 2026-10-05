/** Gaze Furnishings content, from the client's discovery answers (3 Oct 2026). Page rhythm after Natuzzi Italia. */
export const furnHero = {
  eyebrow: 'Gaze Furnishings · Nairobi',
  headline: ['Luxury,', 'without ornament.'],
  sub: 'Bespoke furniture, made to order in 14–21 days and delivered worldwide.',
  /* Interiors for the hero until the studio shoot; the client prefers not to reuse Instagram imagery. */
  slides: [
    { src: '/video/hero-poster.jpg', label: 'Living' },
    { src: '/images/divisions/furnishings.jpg', label: 'Lounge' },
    { src: '/images/contact-backdrop.jpg', label: 'Reading room' },
  ],
};

/** Lowercase room links in the bar, as Natuzzi sets them. */
export const furnRooms = [
  { label: 'living', href: '#collection' },
  { label: 'dining', href: '#collection' },
  { label: 'bedrooms', href: '#collection' },
  { label: 'kids', href: '#collection' },
  { label: 'kitchen', href: '#collection' },
  { label: 'outdoor', href: '#collection' },
  { label: 'office', href: '#collection' },
  { label: 'consultations', href: '#consultation' },
] as const;

export type Drawing = 'sofa' | 'dining' | 'bed' | 'kids' | 'kitchen' | 'outdoor' | 'desk' | 'armchair';

/** The client's catalogue sections, in her order. Named pieces are the ones she has decided. */
export const collections: ReadonlyArray<{ name: string; piece: string | null; drawing: Drawing }> = [
  { name: 'Living', piece: null, drawing: 'sofa' },
  { name: 'Dining', piece: 'Duma Dining Set', drawing: 'dining' },
  { name: 'Master bedroom', piece: null, drawing: 'bed' },
  { name: 'Kids bedroom', piece: 'Kifaru Kids Set', drawing: 'kids' },
  { name: 'Kitchen', piece: null, drawing: 'kitchen' },
  { name: 'Outdoor', piece: null, drawing: 'outdoor' },
  { name: 'Office & study', piece: null, drawing: 'desk' },
];

export const orderingSteps = [
  { title: 'Choose and make it yours', body: 'Pick the piece, then the fabric, finish and measurements for your room.' },
  { title: 'Place a deposit', body: 'Pay by M-Pesa, Visa, Mastercard or bank transfer, in your own currency.' },
  { title: 'Made in Nairobi', body: 'Your piece is made to order in 14 to 21 days, and we keep you posted as it takes shape.' },
  { title: 'Delivered to you', body: 'We deliver worldwide. The balance is settled on delivery.' },
] as const;

export const payments = ['M-Pesa', 'Visa', 'Mastercard', 'Bank transfer'] as const;
