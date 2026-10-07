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

export type Drawing =
  | 'sofa' | 'dining' | 'bed' | 'kids' | 'kitchen' | 'outdoor' | 'desk' | 'armchair'
  | 'table' | 'sideboard' | 'wardrobe' | 'bunk' | 'stool' | 'lounger' | 'bookcase';
export type RoomId = 'living' | 'dining' | 'bedroom' | 'kids' | 'kitchen' | 'outdoor' | 'office';

/**
 * The catalogue's chapters: the client's catalogue sections, in her order. Each opens as a magazine spread.
 * Every piece is named for an animal of the plains, as the Duma and the Kifaru are.
 */
export const collections: ReadonlyArray<{ id: RoomId; name: string; intro: string; drawing: Drawing }> = [
  { id: 'living', name: 'Living', intro: 'The room where a house receives the world. Deep seats, low lines and fabrics that soften with the years.', drawing: 'sofa' },
  { id: 'dining', name: 'Dining', intro: 'A table is a promise of company. Ours are drawn with speed and restraint, and made to the size of your gatherings.', drawing: 'dining' },
  { id: 'bedroom', name: 'Master bedroom', intro: 'Quiet architecture for the most private room: upholstered headboards, measured storage, nothing that asks for attention.', drawing: 'bed' },
  { id: 'kids', name: 'Kids bedroom', intro: 'Pieces that grow with them: safe, sturdy, and made with the same care as the rest of the house.', drawing: 'kids' },
  { id: 'kitchen', name: 'Kitchen', intro: 'Where the day begins. Islands and stools built for daily use and finished to be looked at.', drawing: 'kitchen' },
  { id: 'outdoor', name: 'Outdoor', intro: 'Made for the light and the long evenings: weather-ready frames and fabrics that keep their colour.', drawing: 'outdoor' },
  { id: 'office', name: 'Office & study', intro: 'For the decisions that matter: desks of presence and storage that keeps the room composed.', drawing: 'desk' },
];

export type Piece = {
  slug: string;
  name: string;
  /** What the piece is, in a few lowercase words. */
  kind: string;
  /** The animal it is named for. */
  animal: string;
  room: RoomId;
  line: string;
  drawing: Drawing;
  /** Prices are set by the client; until then the price slot reads "price to follow". */
  price: string | null;
  /** The client's decided pieces; the rest are named proposals for her to confirm. */
  decided?: boolean;
};

export const pieces: ReadonlyArray<Piece> = [
  { slug: 'simba-sofa', name: 'Simba Sofa', kind: 'three-seater sofa', animal: 'lion', room: 'living', drawing: 'sofa', price: null, line: 'A broad, low sofa with a generous seat and a back that holds you upright: the centre of the room.' },
  { slug: 'twiga-armchair', name: 'Twiga Armchair', kind: 'armchair', animal: 'giraffe', room: 'living', drawing: 'armchair', price: null, line: 'A tall-backed reading chair on slender legs, made to sit beside a window.' },
  { slug: 'kobe-coffee-table', name: 'Kobe Coffee Table', kind: 'coffee table', animal: 'tortoise', room: 'living', drawing: 'table', price: null, line: 'A low, rounded table in solid timber, built to be handed down.' },
  { slug: 'duma-dining-set', name: 'Duma Dining Set', kind: 'dining table & chairs', animal: 'cheetah', room: 'dining', drawing: 'dining', price: null, decided: true, line: 'Named for the cheetah: a table and chairs drawn with speed and restraint, made to your room\u2019s measurements.' },
  { slug: 'nyati-sideboard', name: 'Nyati Sideboard', kind: 'sideboard', animal: 'buffalo', room: 'dining', drawing: 'sideboard', price: null, line: 'A long, grounded sideboard with quiet doors and room for the good china.' },
  { slug: 'chui-bed', name: 'Chui Bed', kind: 'upholstered bed', animal: 'leopard', room: 'bedroom', drawing: 'bed', price: null, line: 'A bed with a tall upholstered headboard that wraps the room in calm.' },
  { slug: 'nyumbu-wardrobe', name: 'Nyumbu Wardrobe', kind: 'wardrobe', animal: 'wildebeest', room: 'bedroom', drawing: 'wardrobe', price: null, line: 'Fitted storage, measured to your wall, with a finish matched to the bed.' },
  { slug: 'kifaru-kids-set', name: 'Kifaru Kids Set', kind: 'bed, desk & storage', animal: 'rhino', room: 'kids', drawing: 'kids', price: null, decided: true, line: 'Named for the rhino: a sturdy bed, desk and storage set made to grow with them.' },
  { slug: 'pundamilia-bunk-bed', name: 'Pundamilia Bunk Bed', kind: 'bunk bed', animal: 'zebra', room: 'kids', drawing: 'bunk', price: null, line: 'Two beds, one frame, safe rails and a ladder they will race up.' },
  { slug: 'kongoni-kitchen-island', name: 'Kongoni Kitchen Island', kind: 'kitchen island', animal: 'hartebeest', room: 'kitchen', drawing: 'kitchen', price: null, line: 'A working island with a stone top and storage on every side.' },
  { slug: 'korongo-bar-stool', name: 'Korongo Bar Stool', kind: 'bar stool', animal: 'crane', room: 'kitchen', drawing: 'stool', price: null, line: 'A tall, light stool with a footrest at the right height, made in sets.' },
  { slug: 'kiboko-outdoor-sofa', name: 'Kiboko Outdoor Sofa', kind: 'outdoor sofa', animal: 'hippo', room: 'outdoor', drawing: 'outdoor', price: null, line: 'A deep outdoor sofa with weather-ready cushions, made for long evenings.' },
  { slug: 'mamba-lounger', name: 'Mamba Lounger', kind: 'sun lounger', animal: 'crocodile', room: 'outdoor', drawing: 'lounger', price: null, line: 'A low lounger with an adjustable back, built to stay out in the sun.' },
  { slug: 'tai-executive-desk', name: 'Tai Executive Desk', kind: 'executive desk', animal: 'eagle', room: 'office', drawing: 'desk', price: null, line: 'A desk of presence, with a leather-lined top and drawers that close without a sound.' },
  { slug: 'tandala-bookcase', name: 'Tandala Bookcase', kind: 'bookcase', animal: 'kudu', room: 'office', drawing: 'bookcase', price: null, line: 'Tall shelving with adjustable bays, made to the height of your ceiling.' },
];

/**
 * Lowercase room links in the bar, as Natuzzi sets them, each with the two columns its dropdown shows.
 * Each opens its chapter of the catalogue; the sub-categories are a proposal until the client's product list arrives.
 */
export type FurnRoom = { label: string; href: string; columns: [string[], string[]]; feature?: string };

export const furnRooms: ReadonlyArray<FurnRoom> = [
  { label: 'living', href: '/furnishings#living', columns: [['sofas & sectionals', 'armchairs', 'coffee tables', 'side tables'], ['media units', 'shelving & bookcases', 'rugs', 'cushions & throws']] },
  { label: 'dining', href: '/furnishings#dining', columns: [['dining tables', 'dining chairs', 'sideboards & storage'], ['bar stools', 'lighting', 'table linen']], feature: 'Duma Dining Set' },
  { label: 'bedrooms', href: '/furnishings#bedroom', columns: [['beds', 'bedside tables', 'wardrobes'], ['dressers & chests', 'benches', 'bed linen']] },
  { label: 'kids', href: '/furnishings#kids', columns: [['kids beds', 'study desks', 'storage'], ['reading corners', 'play furniture', 'kids furniture design']], feature: 'Kifaru Kids Set' },
  { label: 'kitchen', href: '/furnishings#kitchen', columns: [['kitchen islands', 'bar stools'], ['pantry storage', 'open shelving']] },
  { label: 'outdoor', href: '/furnishings#outdoor', columns: [['loungers', 'outdoor sofas'], ['outdoor dining', 'planters & accessories']] },
  { label: 'office', href: '/furnishings#office', columns: [['desks', 'office chairs'], ['bookcases', 'filing & storage']] },
  { label: 'consultations', href: '/furnishings#consultation', columns: [['interior design services', 'private consultation'], ['book a showroom visit', 'made-to-measure pieces']] },
];

/* ── the commission ── */

export const fabrics = [
  { id: 'boucle', name: 'Bouclé', note: 'looped wool, soft and textural' },
  { id: 'linen', name: 'Linen', note: 'a dry, natural weave' },
  { id: 'velvet', name: 'Velvet', note: 'deep pile with a soft sheen' },
  { id: 'leather', name: 'Full-grain leather', note: 'ages into its own patina' },
  { id: 'chenille', name: 'Chenille', note: 'a ribbed, hard-wearing weave' },
  { id: 'performance', name: 'Performance weave', note: 'stain-resistant, for family and outdoor use' },
] as const;

export type FabricId = (typeof fabrics)[number]['id'];

export const colours = [
  { name: 'Ivory', hex: '#EFE8DC' },
  { name: 'Sand', hex: '#D9C7A8' },
  { name: 'Stone', hex: '#B7AFA3' },
  { name: 'Taupe', hex: '#8E7F70' },
  { name: 'Cognac', hex: '#9A5B32' },
  { name: 'Walnut', hex: '#5E3D24' },
  { name: 'Sage', hex: '#8F9C83' },
  { name: 'Lilac', hex: '#C99DC2' },
  { name: 'Midnight', hex: '#1F2A44' },
  { name: 'Charcoal', hex: '#2E2E33' },
] as const;

/*
 * Commission terms. A DRAFT written for the build: Gaze Furnishings' legal counsel must review and replace this
 * before the site takes real orders.
 */
export const commissionTerms = [
  'Each piece is made to order, to the specifications in this commission: measurements, fabric, colour and any design you have shared.',
  'This commission is a request. Nothing is charged by this form. A Gaze Furnishings representative will contact you to confirm the final price, specifications and delivery.',
  'Production begins once you have confirmed the order with your representative and your deposit has been received. The balance is due on delivery.',
  'Pieces are made in 14 to 21 days from confirmation. Delivery times depend on your destination and are confirmed with your order.',
  'Because each piece is made for you, a confirmed commission cannot be cancelled or refunded once production has begun.',
  'Natural materials vary. Small differences in grain, shade and texture from samples or screens are part of the craft, not defects.',
  'Designs, drawings and images you share are used only to make your piece. Gaze Furnishings keeps the right to its own designs.',
];

export const orderingSteps = [
  { title: 'Choose and make it yours', body: 'Pick the piece, then the fabric, finish and measurements for your room.' },
  { title: 'Place a deposit', body: 'Pay by M-Pesa, Visa, Mastercard or bank transfer, in your own currency.' },
  { title: 'Made in Nairobi', body: 'Your piece is made to order in 14 to 21 days, and we keep you posted as it takes shape.' },
  { title: 'Delivered to you', body: 'We deliver worldwide. The balance is settled on delivery.' },
] as const;

export const payments = ['M-Pesa', 'Visa', 'Mastercard', 'Bank transfer'] as const;
