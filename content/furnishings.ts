/** Gaze Furnishings content, from the client's discovery answers (3 Oct 2026). */
export const furnHero = {
  eyebrow: 'Gaze Furnishings · Nairobi',
  headline: ['Luxury,', 'without ornament.'],
  sub: 'Bespoke furniture, made to order in 14–21 days and delivered worldwide.',
  /* Interiors for the hero until the studio shoot; the client prefers not to reuse Instagram imagery. */
  images: ['/video/hero-poster.jpg', '/images/divisions/furnishings.jpg', '/images/contact-backdrop.jpg'],
};

export const furnNav = [
  { label: 'Collection', href: '#collection' },
  { label: 'Signature', href: '#signature' },
  { label: 'Ordering', href: '#ordering' },
  { label: 'Consultations', href: '#consultation' },
] as const;

/** The client's catalogue sections, in her order. Named pieces are the ones she has decided. */
export const collections = [
  { name: 'Dining', piece: 'Duma Dining Set' },
  { name: 'Living', piece: null },
  { name: 'Master bedroom', piece: null },
  { name: 'Kids bedroom', piece: 'Kifaru Kids Set' },
  { name: 'Kitchen', piece: null },
  { name: 'Outdoor', piece: null },
  { name: 'Office & study', piece: null },
] as const;

export const orderingSteps = [
  { title: 'Choose and make it yours', body: 'Pick the piece, then the fabric, finish and measurements for your room.' },
  { title: 'Place a deposit', body: 'Pay by M-Pesa, Visa, Mastercard or bank transfer, in your own currency.' },
  { title: 'Made in Nairobi', body: 'Your piece is made to order in 14 to 21 days, and we keep you posted as it takes shape.' },
  { title: 'Delivered to you', body: 'We deliver worldwide. The balance is settled on delivery.' },
] as const;

export const payments = ['M-Pesa', 'Visa', 'Mastercard', 'Bank transfer'] as const;
