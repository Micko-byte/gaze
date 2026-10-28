/** Gaze Furnishings content, from the client's discovery answers (3 Oct 2026). Page rhythm after Natuzzi Italia. */
export const furnHero = {
  eyebrow: 'Gaze Furnishings · Online, delivered to your door',
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
 * Every piece is named in Swahili for a creature of Africa, as the Duma and the Kifaru are.
 */
/* Photographs are the client's own work, sent 4–6 Oct 2026 (public/images/furnishings). `cover` opens the room in the
   carousel. Since 27 Oct every piece in her photographs stands as its own product. */
const f = (name: string) => `/images/furnishings/${name}.jpg`;

/* Since 27 Oct each room is its own wing of the house, at /furnishings/<id>; `film` plays beside the wing's name. */
export const collections: ReadonlyArray<{ id: RoomId; name: string; intro: string; drawing: Drawing; cover?: string; film?: { src: string; poster: string } }> = [
  { id: 'living', name: 'Living', intro: 'The room where a house receives the world. Deep seats, low lines and fabrics that soften with the years.', drawing: 'sofa', cover: f('curved-sofa-mink') },
  { id: 'dining', name: 'Dining', intro: 'A table is a promise of company. Ours are drawn with speed and restraint, and made to the size of your gatherings.', drawing: 'dining', cover: f('dining-organic-table') },
  { id: 'bedroom', name: 'Master bedroom', intro: 'Quiet architecture for the most private room: upholstered headboards, measured storage, nothing that asks for attention.', drawing: 'bed', cover: f('bed-bolster') },
  { id: 'kids', name: 'Kids bedroom', intro: 'Pieces that grow with them: safe, sturdy, and made with the same care as the rest of the house.', drawing: 'kids', cover: f('kids-mountain-room') },
  { id: 'kitchen', name: 'Kitchen', intro: 'Where the day begins. Kitchens and bars built for daily use and finished to be looked at.', drawing: 'kitchen', cover: f('kitchen-oak-grey') },
  { id: 'outdoor', name: 'Outdoor', intro: 'Made for the light and the long evenings: weather-ready frames and fabrics that keep their colour.', drawing: 'outdoor', cover: f('outdoor-daybed-round-pool'), film: { src: '/video/furnishings/outdoor-garden.mp4', poster: '/video/furnishings/outdoor-garden.jpg' } },
  { id: 'office', name: 'Office & study', intro: 'For the decisions that matter: executive desks, boardroom suites and private office seating, imported and placed with care.', drawing: 'desk', cover: f('office-boardroom-black') },
];

export type Piece = {
  slug: string;
  name: string;
  /** What the piece is, in a few lowercase words. */
  kind: string;
  /** The animal it is named for; empty for the imported Corporate Collection, which carries her own names. */
  animal: string;
  /** Imported on a dedicated production schedule (three months) rather than made in the Nairobi workshops. */
  imported?: boolean;
  room: RoomId;
  line: string;
  drawing: Drawing;
  /** Prices are set by the client; until then the price slot reads "on request". */
  price: string | null;
  /** The client's decided pieces; the rest are named proposals for her to confirm. */
  decided?: boolean;
  /** Her photographs of the piece, the cover first; further photographs are other angles or colourways. */
  photos?: string[];
  /** Standard size, as "W 240 × D 100 × H 80 cm", once she sends it; until then the page offers her standard or yours. */
  dims?: string;
};

const P = (slug: string, name: string, kind: string, animal: string, room: RoomId, drawing: Drawing, line: string, photos?: string[], decided?: boolean): Piece => ({
  slug,
  name,
  kind,
  animal,
  room,
  drawing,
  line,
  price: null,
  ...(photos ? { photos: photos.map(f) } : {}),
  ...(decided ? { decided } : {}),
});

export const pieces: ReadonlyArray<Piece> = [
  /* living */
  P('simba-sofa', 'Simba Sofa', 'low modular sofa', 'lion', 'living', 'sofa', 'A broad, low sofa with a generous seat and a back that holds you upright: the centre of the room.', ['sofa-olive-room', 'sofa-olive-stair']),
  P('nyoka-curved-sofa', 'Nyoka Curved Sofa', 'curved sofa', 'snake', 'living', 'sofa', 'A sofa that winds around the room in one soft line, made to sit facing its companion or alone.', ['curved-sofa-mink', 'curved-sofa-pair', 'armchair-swivel-grey']),
  P('tausi-channel-sofa', 'Tausi Channel Sofa', 'channel-tufted curved sofa', 'peacock', 'living', 'sofa', 'Fanned channels of velvet set on a long curve: a sofa for rooms that receive many guests.', ['curved-sofa-channel', 'curved-sofa-forest']),
  P('swala-chaise-sofa', 'Swala Chaise Sofa', 'curved chaise on a timber plinth', 'impala', 'living', 'sofa', 'A single sweep of upholstery resting on a turned timber plinth, light on its feet.', ['curved-sofa-ivory']),
  P('pomboo-crescent-sofa', 'Pomboo Crescent Sofa', 'crescent sofa', 'dolphin', 'living', 'sofa', 'A crescent of deep velvet with a rolled back, drawn to close a conversation into a circle.', ['curved-sofa-emerald']),
  P('mbuni-modular-sofa', 'Mbuni Modular Sofa', 'channel-tufted modular sofa', 'ostrich', 'living', 'sofa', 'Upright channelled modules that join to any length your wall asks for.', ['sofa-chartreuse']),
  P('tembo-corner-sofa', 'Tembo Corner Sofa', 'corner sectional', 'elephant', 'living', 'sofa', 'A deep corner sofa for the whole family, built to your room in either hand, with or without a chaise.', ['sofa-corner-ivory', 'sofa-sectional-studio', 'sofa-chaise-sectional', 'sofa-ivory-sectional']),
  P('kanga-velvet-sofa', 'Kanga Velvet Sofa', 'velvet sofa', 'guinea fowl', 'living', 'sofa', 'A tailored velvet sofa with plump back cushions, shown here in claret and in black.', ['sofa-claret', 'sofa-black']),
  P('twiga-armchair', 'Twiga Armchair', 'swivel armchair', 'giraffe', 'living', 'armchair', 'A rounded armchair that turns on its base, in bouclé, velvet or a printed weave.', ['armchair-boucle', 'armchair-stripe-swivel', 'armchair-toile']),
  P('kobe-coffee-table', 'Kobe Coffee Table', 'coffee table', 'tortoise', 'living', 'table', 'A low, rounded table in solid timber, built to be handed down.'),
  /* dining */
  P('duma-dining-set', 'Duma Dining Set', 'dining table & chairs', 'cheetah', 'dining', 'dining', 'Named for the cheetah: a table and chairs drawn with speed and restraint, made to your room’s measurements.', ['dining-organic-table', 'dining-sculpted-base', 'dining-velvet-chairs'], true),
  P('pofu-dining-table', 'Pofu Dining Table', 'dining table on a slatted base', 'eland', 'dining', 'dining', 'A long walnut top over a fluted, slatted base: weight where it matters, air everywhere else.', ['table-walnut-slats']),
  P('nguva-crescent-table', 'Nguva Crescent Table', 'crescent dining table', 'dugong', 'dining', 'dining', 'A table that curves around its company, in warm solid timber.', ['table-crescent']),
  P('njiwa-extending-table', 'Njiwa Extending Table', 'extending dining table', 'dove', 'dining', 'dining', 'A white lacquered table on turned legs that opens for the long dinners.', ['table-white-extending']),
  P('bundi-round-table', 'Bundi Round Table', 'round dining table', 'owl', 'dining', 'dining', 'A round table on turned legs, for four or for six, made in sets for restaurants and homes.', ['tables-round-white']),
  P('nyati-sideboard', 'Nyati Sideboard', 'sideboard', 'buffalo', 'dining', 'sideboard', 'A long, grounded sideboard with quiet doors and room for the good china.', ['sideboard-navy']),
  /* bedroom */
  P('chui-bed', 'Chui Bed', 'bolster bed', 'leopard', 'bedroom', 'bed', 'A bed built of soft bolsters, layered low and wide, that wraps the room in calm.', ['bed-bolster', 'bed-bolster-side', 'bed-bolster-detail']),
  P('choroa-striped-bed', 'Choroa Striped Bed', 'scalloped striped bed', 'oryx', 'bedroom', 'bed', 'A scalloped headboard dressed in ticking stripes: claret, blue, olive or noir.', ['bed-stripe-room', 'bed-stripe-claret', 'bed-stripe-blue', 'bed-stripe-olive', 'bed-stripe-noir']),
  P('kulungu-bed', 'Kulungu Bed', 'split-headboard bed', 'bushbuck', 'bedroom', 'bed', 'Two rounded headboard panels side by side, in deep velvet.', ['bed-plum', 'bed-split-taupe']),
  P('tohe-bed', 'Tohe Bed', 'rounded-headboard bed', 'reedbuck', 'bedroom', 'bed', 'A tall headboard with softened corners, upholstered from floor to crown.', ['bed-mocha', 'bed-ivory-rounded']),
  P('nyangumi-channel-bed', 'Nyangumi Channel Bed', 'channel-tufted bed', 'whale', 'bedroom', 'bed', 'Deep vertical channels in the headboard and base, made to sit under architectural light.', ['bed-channel-lit', 'bed-channel-atelier']),
  P('kipepeo-arched-bed', 'Kipepeo Arched Bed', 'arched-headboard bed', 'butterfly', 'bedroom', 'bed', 'A low bed with a gentle arch at its head, quiet enough for the calmest room.', ['bed-arched', 'bed-ivory-suite', 'bed-ivory-low']),
  P('paa-panel-bed', 'Paa Panel Bed', 'wall-panel bed', 'dik-dik', 'bedroom', 'bed', 'An upholstered wall panel that becomes the headboard, measured to your wall.', ['bed-panel-wall', 'bed-panel-room', 'bed-panel-throw']),
  P('nyumbu-wardrobe', 'Nyumbu Wardrobe', 'wardrobe', 'wildebeest', 'bedroom', 'wardrobe', 'Fitted storage, measured to your wall, with a finish matched to the bed.', ['wardrobe-lit-niche', 'wardrobe-grey', 'wardrobe-white']),
  /* kids */
  P('kifaru-kids-set', 'Kifaru Kids Set', 'bed, desk & storage', 'rhino', 'kids', 'kids', 'Named for the rhino: a sturdy bed, desk and storage set made to grow with them.', ['kids-mountain-room', 'kids-mountain-giraffe', 'kids-mountain-rug'], true),
  P('paka-kids-bed', 'Paka Kids Bed', 'cat-ear bed', 'cat', 'kids', 'kids', 'A soft upholstered bed with a cat’s ears at its head, in blush or oat.', ['kids-pink-cat', 'kids-cat-beige']),
  P('kondoo-cloud-bed', 'Kondoo Cloud Bed', 'cloud bed', 'sheep', 'kids', 'kids', 'A bouclé bed with cloud-shaped sides that keep little sleepers in.', ['kids-cloud-bed', 'kids-cloud-sofa']),
  P('kasuku-daybed', 'Kasuku Daybed', 'corner daybed', 'parrot', 'kids', 'kids', 'A corner daybed in bold velvet that is a sofa by day and a bed by night.', ['kids-daybed-blue']),
  P('chura-daybed', 'Chura Daybed', 'skirted daybed', 'frog', 'kids', 'kids', 'A skirted daybed in moss green, made for reading corners and sleepovers.', ['kids-forest']),
  P('pundamilia-bunk-bed', 'Pundamilia Bunk Bed', 'bunk bed', 'zebra', 'kids', 'bunk', 'Two beds, one frame, safe rails and a ladder they will race up.', ['bunk-terrazzo', 'bunk-grey', 'bunk-white']),
  /* kitchen */
  P('kongoni-kitchen-island', 'Kongoni Kitchen', 'fitted kitchen', 'hartebeest', 'kitchen', 'kitchen', 'A fitted kitchen measured to your walls: handle-less fronts, oak and stone, storage on every side.', ['kitchen-oak-grey', 'kitchen-corner', 'kitchen-drawers', 'kitchen-open-plan', 'kitchen-wide']),
  P('korongo-bar-stool', 'Korongo Bar & Stools', 'home bar & stools', 'crane', 'kitchen', 'stool', 'A bar counter and tall stools with a footrest at the right height, made in sets.', ['bar-black', 'bar-stools-walnut']),
  /* outdoor: her photographs of 27 Oct */
  P('kiboko-outdoor-sofa', 'Kiboko Outdoor Sofa', 'outdoor sofa', 'hippo', 'outdoor', 'outdoor', 'A deep outdoor sofa with weather-ready cushions, made for long evenings.', ['outdoor-sofa-cream-teak', 'outdoor-sofa-cream-low']),
  P('kuro-curved-sectional', 'Kuro Curved Sectional', 'curved outdoor sectional', 'waterbuck', 'outdoor', 'outdoor', 'A long sectional that bends along the terrace, so the whole party faces the water.', ['outdoor-sectional-curved']),
  P('taa-modular-lounge', 'Taa Modular Lounge', 'low modular lounge', 'manta ray', 'outdoor', 'outdoor', 'Low, wide modules that set out as sofa, chaise or a single chair, wherever the shade falls.', ['outdoor-modular-terrace', 'outdoor-modular-lounge']),
  P('ngamia-teak-sofa', 'Ngamia Teak Sofa', 'teak-framed sofa & armchair', 'camel', 'outdoor', 'outdoor', 'A solid teak frame around deep cushions, a sofa and armchair that weather to silver over the years.', ['outdoor-teak-sofa-deck', 'outdoor-teak-sofa-sea']),
  P('mbogo-charcoal-sofa', 'Mbogo Charcoal Sofa', 'outdoor sectional in charcoal', 'buffalo', 'outdoor', 'outdoor', 'A grounded sofa in charcoal, as a corner sectional or a rope-wrapped three-seater.', ['outdoor-sectional-charcoal', 'outdoor-sofa-rope-charcoal']),
  P('mnandi-rope-armchair', 'Mnandi Rope Armchair', 'rope-woven armchair', 'weaver bird', 'outdoor', 'armchair', 'Hand-woven rope around a deep cushion, the way the weaver bird builds its nest. Fixed or on a swivel.', ['outdoor-armchair-rope-set', 'outdoor-armchair-rope-black']),
  P('mwari-outdoor-dining', 'Mwari Outdoor Dining', 'outdoor dining table & rope chairs', 'pelican', 'outdoor', 'dining', 'A table for lunch by the water, ringed with rope-woven chairs that turn to the view.', ['outdoor-dining-rope-sea', 'outdoor-dining-teak-pool', 'outdoor-dining-rope-round', 'outdoor-dining-rope-pedestal']),
  P('nyegere-dining-set', 'Nyegere Dining Set', 'outdoor dining set in black', 'honey badger', 'outdoor', 'dining', 'Black frames and woven backs around a stone or timber top: dining that stands up to sun and rain.', ['outdoor-dining-black-table', 'outdoor-dining-black-chair', 'outdoor-dining-black-pool', 'outdoor-dining-stone-round']),
  P('mamba-lounger', 'Mamba Lounger', 'teak sun lounger', 'crocodile', 'outdoor', 'lounger', 'A low teak lounger with an adjustable back, built to stay out in the sun.', ['outdoor-lounger-teak-sea', 'outdoor-lounger-teak-sling', 'outdoor-lounger-teak-cushion']),
  P('kasa-lounger', 'Kasa Lounger', 'upholstered sun lounger', 'sea turtle', 'outdoor', 'lounger', 'A deep, cushioned lounger with a reclining back, made in pairs and rows for the poolside.', ['outdoor-lounger-pool', 'outdoor-lounger-umbrellas', 'outdoor-lounger-swim', 'outdoor-lounger-above']),
  P('heroe-round-daybed', 'Heroe Round Daybed', 'round rope daybed', 'flamingo', 'outdoor', 'lounger', 'A round daybed held in a curved, rope-woven back, deep enough for two and an afternoon.', ['outdoor-daybed-round-pool', 'outdoor-daybed-round-pair', 'outdoor-daybed-round-sunset']),
  P('shakwe-daybed', 'Shakwe Daybed', 'low outdoor daybed', 'gull', 'outdoor', 'lounger', 'A low daybed on a timber plinth, soft-edged and made to sit right at the water.', ['outdoor-daybed-plinth', 'outdoor-daybed-rounded']),
  /* office: the Corporate Collection, imported (her write-up and photographs, 27 Oct) */
  { ...P('sovereign-monolith-desk', 'The Sovereign Monolith', 'architectural executive desk', '', 'office', 'desk', 'Our signature executive desk: a cantilevered top that floats over a recessed, shadow-lined pedestal, in matte charcoal or brushed smoked oak, with all power and cables hidden behind touch-release leather panels.', ['office-desk-charcoal', 'office-desk-suite'], true), imported: true },
  { ...P('executive-boardroom-suite', 'The Executive Boardroom Suite', 'conference tables & boardroom seating', '', 'office', 'table', 'Statement conference tables and ergonomic seating engineered for long-form strategic clarity.', ['office-boardroom-black', 'office-boardroom-long', 'office-boardroom-walnut', 'office-conference-white']), imported: true },
  { ...P('private-office-seating', 'The Private Office Seating Line', 'executive leather & mesh seating', '', 'office', 'armchair', 'Executive leather and mesh upholstery balancing postural neuroscience with executive prestige.', ['office-chairs-leather', 'office-chair-mesh']), imported: true },
  { ...P('reception-lounge-collection', 'The Reception & Lounge Collection', 'reception seating & lounge tables', '', 'office', 'table', 'Beam seating for reception and waiting rooms, with sculpted glass tables for the lounge.', ['office-waiting-beam', 'office-table-smoked', 'office-table-clear']), imported: true },
  { ...P('breakout-meeting-set', 'The Breakout Meeting Set', 'round meeting table & chairs', '', 'office', 'table', 'A round table and light shell chairs for quick meetings and open-plan corners.', ['office-breakout-round']), imported: true },
  P('nyuki-reception-desk', 'Nyuki Reception Desk', 'curved reception desk', 'bee', 'office', 'desk', 'A ring of fluted timber that receives your guests from every side, made to your lobby.', ['reception-ring', 'reception-ring-side']),
  P('tandala-bookcase', 'Tandala Bookcase', 'bookcase', 'kudu', 'office', 'bookcase', 'Tall shelving with adjustable bays, made to the height of your ceiling.'),
];

/**
 * Lowercase room links in the bar, as Natuzzi sets them, each with the two columns its dropdown shows.
 * Each opens its own wing; the sub-categories are a proposal until the client's product list arrives.
 */
export type FurnRoom = { label: string; href: string; columns: [string[], string[]]; feature?: string };

export const furnRooms: ReadonlyArray<FurnRoom> = [
  { label: 'living', href: '/furnishings/living', columns: [['sofas & sectionals', 'armchairs', 'coffee tables', 'side tables'], ['media units', 'shelving & bookcases', 'rugs', 'cushions & throws']] },
  { label: 'dining', href: '/furnishings/dining', columns: [['dining tables', 'dining chairs', 'sideboards & storage'], ['bar stools', 'lighting', 'table linen']], feature: 'Duma Dining Set' },
  { label: 'bedrooms', href: '/furnishings/bedroom', columns: [['beds', 'bedside tables', 'wardrobes'], ['dressers & chests', 'benches', 'bed linen']] },
  { label: 'kids', href: '/furnishings/kids', columns: [['kids beds', 'study desks', 'storage'], ['reading corners', 'play furniture', 'kids furniture design']], feature: 'Kifaru Kids Set' },
  { label: 'kitchen', href: '/furnishings/kitchen', columns: [['kitchen islands', 'bar stools'], ['pantry storage', 'open shelving']] },
  { label: 'outdoor', href: '/furnishings/outdoor', columns: [['sun loungers & daybeds', 'outdoor sofas', 'rope armchairs'], ['outdoor dining', 'planters & accessories']] },
  { label: 'office', href: '/furnishings/office', columns: [['executive desks', 'boardroom suites', 'office seating'], ['reception & lounge', 'bookcases']], feature: 'The Sovereign Monolith' },
  { label: 'atelier', href: '/furnishings/atelier', columns: [['velvet', 'bouclé', 'linen', 'chenille', 'leatherette'], ['colour families', 'finishes', 'swatch samples']] },
  { label: 'projects & contract', href: '/furnishings/projects', columns: [['residences', 'hospitality', 'corporate', 'estates & gardens'], ['interior design services', 'private consultation', 'trade enquiries']] },
];

/* ── the bespoke atelier: the client's fabric studio brief ── */

/*
 * Her five fabrics, as she photographed them on 27 Oct: each beside an armchair made in it (`photo`), with the cloth
 * alone cut from the same picture (`cloth`) and the house colour the picture shows (`shown`). Which colours each is offered in is a proposal until she confirms what
 * her mills and suppliers carry.
 */
const a = (name: string) => `/images/atelier/${name}.jpg`;

export const textures = [
  {
    id: 'velvet',
    short: 'Velvet',
    name: 'Plush Velvet',
    family: 'Plush & luminous',
    line: 'Luminous, ultra-soft, and rich in depth.',
    detail: 'A rich, light-catching nap, soft to the touch, that adds instant depth and regal warmth to a room. Made for statement sofas and accent chairs.',
    photo: a('velvet'),
    cloth: a('velvet-cloth'),
    shown: 'Terracotta',
  },
  {
    id: 'boucle',
    short: 'Bouclé',
    name: 'Architectural Bouclé',
    family: 'Tactile & dimensional',
    line: 'Tactile, dimensional, and modern.',
    detail: 'A heavy loop texture, highly tactile and contemporary: the fabric of quiet luxury, adding physical depth to minimalist spaces.',
    photo: a('boucle'),
    cloth: a('boucle-cloth'),
    shown: 'Alabaster White',
  },
  {
    id: 'linen',
    short: 'Linen',
    name: 'Natural Linen Blend',
    family: 'Natural & breathable',
    line: 'Relaxed sophistication that softens over time.',
    detail: 'An organic texture with a matte finish and a casual elegance that softens gracefully with the years. Made for relaxed, sophisticated living.',
    photo: a('linen'),
    cloth: a('linen-cloth'),
    shown: 'Warm Linen',
  },
  {
    id: 'chenille',
    short: 'Chenille',
    name: 'Soft Chenille',
    family: 'Soft & enveloping',
    line: 'Warm to the hand and made for every day.',
    detail: 'A tufted yarn woven into a soft, gently napped cloth: warm to sit in, hard-wearing, and forgiving of daily life. Made for the family sofa and the armchair everyone reaches for.',
    photo: a('chenille'),
    cloth: a('chenille-cloth'),
    shown: 'Olive',
  },
  {
    id: 'leatherette',
    short: 'Leatherette',
    name: 'Performance Leatherette',
    family: 'Supple & durable',
    line: 'The look of leather, made for daily life.',
    detail: 'A fine-grained faux leather with a soft hand that wipes clean, resists wear and keeps its colour. Made for dining chairs, offices and busy homes.',
    photo: a('leatherette'),
    cloth: a('leatherette-cloth'),
    shown: 'Cognac',
  },
] as const;

export type TextureId = (typeof textures)[number]['id'];

/* Her colour families. */
export const palette = [
  {
    family: 'The Neutrals',
    colours: [
      { name: 'Alabaster White', hex: '#EEE8DD' },
      { name: 'Warm Linen', hex: '#DCCBB0' },
      { name: 'Warm Taupe', hex: '#9A8775' },
      { name: 'Charcoal Grey', hex: '#48494E' },
      { name: 'Obsidian Black', hex: '#161618' },
    ],
  },
  {
    family: 'The Deeps & Royals',
    colours: [
      { name: 'Midnight Navy', hex: '#1D2A47' },
      { name: 'Forest Emerald', hex: '#1F4D3C' },
      { name: 'Deep Plum', hex: '#4E2340' },
    ],
  },
  {
    family: 'The Earths & Metals',
    colours: [
      { name: 'Cognac', hex: '#8C4B25' },
      { name: 'Warm Ochre', hex: '#B8862E' },
      { name: 'Terracotta', hex: '#A8533A' },
      { name: 'Olive', hex: '#6C6B3B' },
    ],
  },
] as const;

export type Colour = { name: string; hex: string };

/** Every house colour, in family order. */
export const colours: ReadonlyArray<Colour> = palette.flatMap((p): ReadonlyArray<Colour> => p.colours);

/* The colours each fabric is woven in. */
export const textureColours: Record<TextureId, ReadonlyArray<string>> = {
  velvet: ['Alabaster White', 'Warm Taupe', 'Charcoal Grey', 'Obsidian Black', 'Midnight Navy', 'Forest Emerald', 'Deep Plum', 'Cognac', 'Warm Ochre', 'Terracotta', 'Olive'],
  boucle: ['Alabaster White', 'Warm Linen', 'Warm Taupe', 'Charcoal Grey', 'Midnight Navy', 'Warm Ochre', 'Olive'],
  linen: ['Alabaster White', 'Warm Linen', 'Warm Taupe', 'Charcoal Grey', 'Midnight Navy', 'Terracotta', 'Olive'],
  chenille: ['Alabaster White', 'Warm Linen', 'Warm Taupe', 'Charcoal Grey', 'Midnight Navy', 'Forest Emerald', 'Terracotta', 'Olive'],
  leatherette: ['Alabaster White', 'Warm Taupe', 'Charcoal Grey', 'Obsidian Black', 'Midnight Navy', 'Forest Emerald', 'Cognac', 'Terracotta'],
};

/* For case pieces (tables, storage, kitchens, desks), the studio offers timber and lacquer instead of fabric. */
export const timbers = [
  { id: 'oak', name: 'Natural Oak', hex: '#B98E5C', line: 'Pale, open grain, oiled to a soft sheen.' },
  { id: 'walnut', name: 'Smoked Walnut', hex: '#5B3A23', line: 'Dark, dense and warm, with a figured grain.' },
  { id: 'lacquer', name: 'Satin Lacquer', hex: '', line: 'A smooth, closed finish in any house colour.' },
] as const;

export type TimberId = (typeof timbers)[number]['id'];

/* The finishing touch: legs, trim and hardware. */
export const finishes = [
  { id: 'brass', name: 'Brass', accent: 'Brass Accents', hex: '#B4925A' },
  { id: 'black', name: 'Matte Black', accent: 'Matte Black Accents', hex: '#1F1F21' },
  { id: 'wood', name: 'Wood', accent: 'Wood Accents', hex: '#7B5232' },
] as const;

export type FinishId = (typeof finishes)[number]['id'];

/** How the studio draws a piece: an upholstered form it can dress in fabric, or a case piece in timber. */
export type StudioForm = 'sofa' | 'chair' | 'bed' | 'case';

export function studioForm(piece: Piece): StudioForm {
  if (piece.slug === 'duma-dining-set') return 'chair';
  if (piece.slug === 'kasuku-daybed' || piece.slug === 'chura-daybed') return 'sofa';
  switch (piece.drawing) {
    case 'sofa':
    case 'outdoor':
      return 'sofa';
    case 'armchair':
      return 'chair';
    case 'bed':
    case 'kids':
      return 'bed';
    default:
      return 'case';
  }
}

/** One configuration from the studio: a fabric (or timber), its colour, and the finish. */
export type Configuration = { material: TextureId | TimberId; colour: string; finish: FinishId };

/** The configuration in another fabric or timber, keeping its colour where the new material is made in it. */
export function withMaterial(c: Configuration, material: TextureId | TimberId): Configuration {
  const allowed = material === 'lacquer' ? colours.map((x) => x.name) : timbers.some((t) => t.id === material) ? [] : textureColours[material as TextureId];
  return { ...c, material, colour: allowed.includes(c.colour) ? c.colour : allowed[0] ?? '' };
}

export const defaultConfiguration = (form: StudioForm): Configuration =>
  form === 'case' ? { material: 'walnut', colour: '', finish: 'brass' } : { material: 'boucle', colour: 'Alabaster White', finish: 'brass' };

/** "Midnight Navy Bouclé with Brass Accents", as the summary reads it. */
export function describeConfiguration(c: Configuration): string {
  const finish = finishes.find((x) => x.id === c.finish)!.accent;
  const texture = textures.find((t) => t.id === c.material);
  if (texture) return `${c.colour} ${texture.short} with ${finish}`;
  const timber = timbers.find((t) => t.id === c.material)!;
  return timber.id === 'lacquer' ? `${c.colour} Satin Lacquer with ${finish}` : `${timber.name} with ${finish}`;
}

/* ── the house: the client's write-ups of 27 Oct 2026 ── */

/* Since 28 Oct 2026 Gaze Furnishings is wholly online: the storefront has closed, so no address is shown anywhere.
   Her official numbers; orders confirmed on WhatsApp go to the first. */
export const furnContact = {
  phones: [
    { label: '+254 706 338 791', tel: '+254706338791' },
    { label: '+254 740 692 298', tel: '+254740692298' },
  ],
  whatsapp: '254706338791',
  email: 'sales@gazefurnishings.co.ke',
};

const catalogueRequest = (subject: string) => `mailto:${furnContact.email}?subject=${encodeURIComponent(subject)}`;

export const masterAtelier = {
  company: 'Gaze Furnishings Kenya Limited',
  tagline: 'The Architecture of Interior Sovereignty',
  eyebrow: 'The Master Atelier',
  headline: 'Furniture is not merely placed; it is engineered to hold the room.',
  body: [
    'Gaze Furnishings Kenya Limited is the premier spatial and furniture design subsidiary of Gaze Holdings. Operating at the intersection of Scandinavian minimalist discipline, neuroscience-backed spatial psychology, and uncompromising craftsmanship, we shape environments that command authority and inspire quiet composure.',
    'Whether through bespoke local artisan workshops or curated international executive collections, every piece is built with a singular philosophy: alignment over performance. We design for those who build institutions, lead with clarity, and demand spaces that endure.',
  ],
  pillarsTitle: 'The Curated Pillars of Gaze Furnishings',
  pillars: [
    { name: 'Executive Workspaces', body: 'Imported international executive collections, featuring our signature Sovereign Monolith desking systems, boardroom suites, and private office architecture.', href: '/furnishings/office', image: f('office-boardroom-black') },
    { name: 'Outdoor Living & Patio Sanctuaries', body: 'Custom exterior furnishings crafted by local master artisans using weather-resilient materials, engineered specifically for open-air estate living.', href: '/furnishings/outdoor', image: f('outdoor-daybed-round-pool') },
    { name: 'Interior Architecture & Bespoke Sourcing', body: 'Tailored spatial layout design and custom statement pieces engineered precisely for private residences and corporate enterprises.', href: '/furnishings#consultation', image: f('curved-sofa-mink') },
  ],
  termsTitle: 'Atelier Specifications & Commissioning Terms',
  termsIntro: 'To maintain absolute institutional integrity across all commissions, our operational framework ensures complete transparency:',
  terms: [
    { label: 'Production Lead Time', body: '14 to 21 Days for custom local craftsmanship.' },
    { label: 'Seamless Tracking', body: 'Once an order is initiated, clients receive real-time visibility through our dedicated Furniture Tracker, providing continuous updates from workshop production to placement.' },
    { label: 'Delivery', body: 'Complimentary white-glove delivery and professional placement free anywhere around Nairobi.' },
    { label: 'Financial Structure', body: 'A 75% initial deposit is required upon order confirmation. The remaining 25% balance is due upon completion (prior to dispatch/delivery).' },
    { label: 'Binding Terms & Conditions', body: 'Submission of the initial 75% deposit serves as a legally binding agreement between Gaze Furnishings Kenya Limited and the client, confirming full acceptance of our operational terms and conditions.' },
    { label: 'Tax Compliance', body: 'All listed enterprise pricing excludes VAT, which will be itemized transparently upon formal invoicing.' },
  ],
  invoicingTitle: 'Pricing & Invoicing Transparency',
  invoicing: [
    'All collection prices listed on our platform exclude 16% VAT.',
    'To ensure seamless enterprise standards, all transactions are managed through our automated financial framework. Once your commission is confirmed and your legally binding 75% initial deposit is submitted, our integrated billing system instantly generates an official, itemized QuickBooks invoice detailing your base investment, exact VAT calculations, and the remaining 25% balance due upon completion.',
    'Simultaneously, your secure access to the Gaze Furniture Tracker is activated, providing real-time visibility from our ateliers directly to your space.',
  ],
  commissionTitle: 'Commission an Environment',
  ctas: [
    { label: 'Explore the Executive Collection', href: '/furnishings/office' },
    { label: 'Explore the Outdoor Atelier', href: '/furnishings/outdoor' },
    { label: 'Request a Private Consultation', href: '/furnishings#consultation' },
  ],
};

/** A wing's own write-up, where she has given one: its collection, terms, highlights and how to commission it. */
export type WingCopy = {
  eyebrow: string;
  title: string;
  headline: string;
  body: string[];
  signature?: { slug: string; eyebrow: string; headline: string; body: string };
  termsTitle: string;
  termsIntro: string;
  terms: ReadonlyArray<{ label: string; body: string }>;
  highlights: ReadonlyArray<{ name: string; body: string; slug: string }>;
  commission: { title: string; body: string; ctas: ReadonlyArray<{ label: string; href: string }> };
};

export const wingCopy: Partial<Record<RoomId, WingCopy>> = {
  office: {
    eyebrow: 'Executive Workspaces',
    title: 'The Corporate Collection',
    headline: 'The Art of Executive Placement',
    body: [
      'True institutional leadership begins in the architecture of the office. Our curated collection of imported executive furniture bridges minimalist Scandinavian engineering with commanding professional presence.',
      'Engineered for boardrooms, executive suites, and visionary enterprises, every piece is custom-sourced to reflect absolute authority, uncompromising comfort, and enduring corporate dignity.',
    ],
    signature: {
      slug: 'sovereign-monolith-desk',
      eyebrow: 'Signature Piece — The Sovereign Monolith Desk',
      headline: 'The Commanding Centerpiece',
      body: 'Inspired by the weight of decision-making, the Sovereign Monolith is our signature executive desk. Built in a deep, matte-charcoal or brushed smoked-oak finish, it features a cantilevered desktop that floats effortlessly over a recessed, shadow-lined pedestal. Designed completely free of visual clutter with flush, touch-release leather panels concealing all power and cable infrastructure, it projects absolute clarity, precision, and unshakeable structure before a single word is spoken.',
    },
    termsTitle: 'Atelier Specifications & Financial Terms',
    termsIntro: 'To maintain our uncompromising standards of craftsmanship and secure international production, our executive collections operate under structured, transparent commissioning terms:',
    terms: [
      { label: 'Commission Structure', body: '75% Initial Deposit upon order confirmation; 25% Balance due upon arrival prior to final placement.' },
      { label: 'Importation Lead Time', body: '3 Months (Custom international freight, maritime transit, and priority clearance).' },
      { label: 'White-Glove Delivery', body: 'Complimentary door-to-door delivery and professional installation directly into your corporate suite or private estate.' },
      { label: 'Tax Terms', body: 'All listed collection prices exclude VAT, which will be itemized upon formal enterprise invoicing.' },
    ],
    highlights: [
      { name: 'The Sovereign Monolith', body: 'Architectural executive desk with integrated concealment and floating cantilever design.', slug: 'sovereign-monolith-desk' },
      { name: 'The Executive Boardroom Suite', body: 'Statement conference tables and ergonomic seating engineered for long-form strategic clarity.', slug: 'executive-boardroom-suite' },
      { name: 'The Private Office Seating Line', body: 'Executive leather and mesh upholstery balancing postural neuroscience with executive prestige.', slug: 'private-office-seating' },
    ],
    commission: {
      title: 'Commission Your Workspace',
      body: 'Because our pieces are imported on dedicated production schedules, private corporate viewings and catalog requests are managed directly through our team.',
      ctas: [
        { label: 'Request the Corporate Catalog', href: catalogueRequest('Corporate catalog request') },
        { label: 'Inquire with an Interior Advisor', href: '/furnishings#consultation' },
      ],
    },
  },
  outdoor: {
    eyebrow: 'Outdoor Living & Patio Atelier',
    title: 'The Exterior Collection',
    headline: 'The Art of Open-Air Sanctuaries',
    body: [
      'True luxury extends seamlessly into the open air. Our outdoor living collection bridges structural minimalism with organic resilience, custom-crafted by master local artisans to withstand the elements while maintaining uncompromising aesthetic elegance.',
      'Designed for private terraces, courtyard sanctuaries, and estate gardens, every piece is custom-built to order, reflecting the quiet sophistication of modern architectural living.',
    ],
    termsTitle: 'Atelier Specifications & Financial Terms',
    termsIntro: 'To maintain our rigorous standards of bespoke local craftsmanship, our outdoor collections operate under structured, transparent commissioning terms:',
    terms: [
      { label: 'Commission Structure', body: '75% Initial Deposit upon order confirmation; 25% Balance due upon completion prior to delivery.' },
      { label: 'Production Lead Time', body: '14 to 21 Days (Handcrafted locally by our dedicated artisan workshops).' },
      { label: 'Complimentary Delivery', body: 'Free white-glove delivery and professional placement anywhere within Nairobi.' },
      { label: 'Tax Terms', body: 'All listed collection prices exclude VAT, which will be itemized upon formal invoicing.' },
    ],
    highlights: [
      { name: 'The Estate Lounge Suite', body: 'Weather-resistant modular seating engineered for deep-comfort exterior lounging.', slug: 'taa-modular-lounge' },
      { name: 'The Minimalist Dining Pavilion', body: 'Solid-form architectural dining tables and chairs crafted for open-air hosting and endurance.', slug: 'mwari-outdoor-dining' },
      { name: 'The Crystalline Sunbed Series', body: 'Clean-lined loungers pairing tactile upholstery with treated, durable framing.', slug: 'kasa-lounger' },
    ],
    commission: {
      title: 'Commission Your Outdoor Sanctuary',
      body: 'Because every outdoor piece is custom-crafted to your precise spatial requirements, commissions are managed directly through our workshop atelier.',
      ctas: [
        { label: 'Request the Outdoor Catalog', href: catalogueRequest('Outdoor catalog request') },
        { label: 'Inquire with an Interior Advisor', href: '/furnishings#consultation' },
      ],
    },
  },
};

export const payments = ['M-Pesa', 'Visa', 'Mastercard', 'Bank transfer'] as const;
