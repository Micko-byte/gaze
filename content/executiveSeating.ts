/*
 * The Executive Seating Wing: 20 chairs in three collections (the client's brief, 6 Nov 2026). Names and retail prices are
 * from her 2026 catalogue. `rrp` is the base price before VAT, which the site adds. The brown chairs lead, at her request.
 */
export type SeatingCollectionId = 'presidential' | 'governance' | 'ergonomic';

export const seatingWing = {
  title: 'Executive Seating',
  body: 'True leadership demands an environment crafted without compromise. The Gaze Executive Seating Wing presents a curated collection of high-performance task architecture, presidential leather suites, and boardroom seating. Designed for corporate executives, financial institutions, and modern workspaces where posture, prestige, and endurance converge.',
};

export const seatingCollections: ReadonlyArray<{ id: SeatingCollectionId; name: string; intro: string }> = [
  { id: 'presidential', name: 'The Presidential & Executive Suite', intro: 'High backs, deep cushions and polished bases, for the office where the final decision is made.' },
  { id: 'governance', name: 'The Governance & Boardroom Collection', intro: 'Composed seating for the table and for the guests who come to it.' },
  { id: 'ergonomic', name: 'Ergonomic Task Architecture', intro: 'Open mesh and precise adjustment, for the long hours behind the work.' },
];

export type ChairView = 'hero' | 'front' | 'side' | 'detail' | 'rear';

/** The five views in the order of her brief. */
export const chairViews: ReadonlyArray<{ id: ChairView; label: string }> = [
  { id: 'hero', label: 'Hero 45°' },
  { id: 'front', label: 'Front' },
  { id: 'side', label: 'Side' },
  { id: 'detail', label: 'Detail' },
  { id: 'rear', label: 'Rear' },
];

/** The four views a chair turns through, in the order they follow round. The detail is a close-up, so it sits outside. */
export const turnOrder: ReadonlyArray<ChairView> = ['hero', 'side', 'rear', 'front'];

export const chairImage = (slug: string, view: ChairView) => `/images/executive/${slug}/${view}.webp`;

export type Chair = {
  slug: string;
  name: string;
  /** Colour or base, where the model comes in more than one. */
  finish?: string;
  collection: SeatingCollectionId;
  rrp: number;
  kind: string;
  line: string;
  body: string;
  specs: ReadonlyArray<readonly [string, string]>;
  /** Approximate, in centimetres. Left out where the catalogue gives none. */
  dims?: ReadonlyArray<readonly [string, number]>;
};

export const chairs: ReadonlyArray<Chair> = [
  /* ── The Presidential & Executive Suite ── */
  {
    slug: 'apex-throne-mocha',
    name: 'Apex Throne',
    finish: 'Mocha',
    collection: 'presidential',
    rrp: 28299,
    kind: 'High-back executive chair',
    line: 'The tallest back in the suite, in a warm mocha that sets the tone of the room.',
    body: 'Tailored vertical stitching runs the length of a broad padded back and down into a generous seat. Arms of polished chrome curve up to meet padded rests, and the same chrome carries through to a five-star base.',
    specs: [['Upholstery', 'Mocha brown faux leather'], ['Back', 'Tall padded back with stitched panels'], ['Seat', 'Broad padded seat'], ['Arms', 'Fixed padded rests on chrome-plated supports'], ['Adjustment', 'Seat height, with swivel'], ['Base', 'Chrome-plated five-star base on five casters']],
    dims: [['Seat width', 52], ['Seat depth', 49], ['Back width', 50], ['Back height', 74]],
  },
  {
    slug: 'sienna-executive',
    name: 'Sienna Executive',
    finish: 'Cognac',
    collection: 'presidential',
    rrp: 18000,
    kind: 'Executive chair with headrest',
    line: 'Cognac upholstery, cut clean, with a headrest that stands on its own.',
    body: 'A rounded back and a broad seat keep the outline quiet so the colour can do the talking. A separate upholstered headrest rises on a central support, and broad black arms and a black five-star base give the warm tone something to stand against.',
    specs: [['Upholstery', 'Cognac brown'], ['Back', 'Tall rounded-rectangle back'], ['Headrest', 'Separate upholstered headrest on a central support'], ['Seat', 'Broad upholstered seat'], ['Arms', 'Black, with broad tops'], ['Base', 'Black five-star base on five casters, chrome-look column']],
    dims: [['Seat width', 49], ['Seat depth', 55], ['Arm to arm', 62], ['Back width', 46], ['Back height', 49]],
  },
  {
    slug: 'dominion-recliner-cafe-au-lait',
    name: 'Dominion Recliner',
    finish: 'Café au Lait',
    collection: 'presidential',
    rrp: 14499,
    kind: 'High-back executive chair',
    line: 'Café au lait leather, worked into panels and finished with a warm contrast stitch.',
    body: 'The back is segmented into padded panels that give it the depth of a club chair, outlined in stitching a shade lighter than the hide. Upright arms with dark pads frame a broad seat, on a bright chrome base.',
    specs: [['Upholstery', 'Brown leather'], ['Back', 'Tall padded back with segmented stitched panels'], ['Stitching', 'Warm contrast stitch'], ['Seat', 'Broad padded seat'], ['Arms', 'Upright, with dark pads'], ['Adjustment', 'Seat height'], ['Base', 'Chrome-finish five-star base on five casters']],
    dims: [['Seat width', 45], ['Seat depth', 45], ['Arm to arm', 54], ['Back width', 41], ['Back height', 64]],
  },
  {
    slug: 'amber-luxe',
    name: 'Amber Luxe',
    finish: 'Amber',
    collection: 'presidential',
    rrp: 27500,
    kind: 'Quilted high-back executive chair',
    line: 'Diamond quilting in a colour that refuses to be background.',
    body: 'A field of diamond quilting sits at the centre of a high padded back, in an amber that warms the whole office. Curved chrome supports rise to padded arms, and a gas lift sets the height.',
    specs: [['Upholstery', 'Padded amber upholstery'], ['Back', 'High padded back with diamond quilting'], ['Arms', 'Padded, on curved chrome-look supports'], ['Adjustment', 'Gas-lift seat height'], ['Base', 'Chrome-look five-star base on casters']],
    dims: [['Seat width', 48], ['Seat depth', 51], ['Arm to arm', 61], ['Back width', 47], ['Back height', 72]],
  },
  {
    slug: 'apex-throne-frost-grey',
    name: 'Apex Throne',
    finish: 'Frost Grey',
    collection: 'presidential',
    rrp: 28299,
    kind: 'High-back executive chair',
    line: 'The Apex silhouette in a cool, measured grey.',
    body: 'Segmented padding gives the tall back its architecture, while the frost grey keeps it composed in a room of glass and stone. Fixed padded arms sit on chrome-plated supports above a chrome five-star base.',
    specs: [['Upholstery', 'Frost grey faux leather'], ['Back', 'Tall padded back with segmented panels'], ['Seat', 'Broad padded seat'], ['Arms', 'Fixed padded rests on chrome-plated supports'], ['Adjustment', 'Pneumatic seat height, with swivel'], ['Base', 'Chrome-plated five-star base on five nylon casters']],
    dims: [['Seat width', 52], ['Seat depth', 49], ['Back width', 50], ['Back height', 74]],
  },
  {
    slug: 'onyx-crown',
    name: 'Onyx Crown',
    finish: 'Black',
    collection: 'presidential',
    rrp: 21000,
    kind: 'Padded high-back executive chair',
    line: 'Black, generously cushioned, and built around a sculpted centre panel.',
    body: 'A stitched centre panel runs between sculpted side sections, so the back reads as carved rather than upholstered. The seat is deep with cushioning, and chrome-look supports carry padded arms.',
    specs: [['Colour', 'Black'], ['Back', 'Padded high back, stitched centre panel, sculpted sides'], ['Seat', 'Generously cushioned'], ['Arms', 'Fixed padded rests on chrome-look supports'], ['Adjustment', 'Seat height, with swivel'], ['Base', 'Chrome-look five-star base on casters']],
    dims: [['Seat width', 47], ['Seat depth', 49], ['Arm to arm', 57], ['Back width', 46], ['Back height', 63]],
  },
  {
    slug: 'skyline-executive',
    name: 'Skyline Executive',
    finish: 'Black',
    collection: 'presidential',
    rrp: 26000,
    kind: 'Slim high-back executive chair',
    line: 'A slim, ribbed profile that reclines when the conversation does.',
    body: 'Horizontal ribbing climbs a slender high back, giving the chair a tailored, almost architectural line. The back tilts and reclines, the seat rises on a gas lift, and fixed arms sit on chrome-look supports.',
    specs: [['Colour', 'Black'], ['Back', 'Padded, with horizontal ribbed stitching'], ['Recline', 'Tilt and recline'], ['Arms', 'Fixed, on chrome-look supports'], ['Adjustment', 'Gas-lift seat height, with swivel'], ['Base', 'Chrome-look five-star base on casters']],
    dims: [['Seat width', 50], ['Seat depth', 48], ['Arm to arm', 65], ['Back width', 50], ['Back height', 69]],
  },

  /* ── The Governance & Boardroom Collection ── */
  {
    slug: 'nova-pro',
    name: 'Nova Pro',
    finish: 'Black',
    collection: 'governance',
    rrp: 20000,
    kind: 'Quilted high-back chair with headrest',
    line: 'A diamond-quilted back, framed in chrome and finished with a headrest.',
    body: 'The quilted centre panel gives the boardroom table a quiet richness. A separate padded headrest completes the long line of the back, and a gas lift brings every seat to the same height at the table.',
    specs: [['Upholstery', 'Padded black upholstery'], ['Back', 'Tall padded back, diamond-quilted centre panel'], ['Headrest', 'Separate padded headrest'], ['Arms', 'Fixed'], ['Adjustment', 'Gas-lift seat height, with swivel'], ['Base', 'Chrome-look five-star base on casters']],
    dims: [['Seat width', 48], ['Seat depth', 46], ['Arm to arm', 58], ['Back width', 44], ['Back height', 58]],
  },
  {
    slug: 'nova-executive',
    name: 'Nova Executive',
    finish: 'Black',
    collection: 'governance',
    rrp: 18500,
    kind: 'Quilted high-back chair',
    line: 'The Nova line without the headrest, for a cleaner run along the table.',
    body: 'A diamond-quilted panel sits within a slim chrome frame, keeping the back light even at full height. Set several down a long table and the line of chrome carries from chair to chair.',
    specs: [['Upholstery', 'Padded black upholstery'], ['Back', 'High back with diamond-quilted panel and chrome frame'], ['Arms', 'Fixed'], ['Adjustment', 'Seat height, with swivel'], ['Base', 'Chrome five-star base on casters']],
  },
  {
    slug: 'nova-visitor',
    name: 'Nova Visitor',
    finish: 'Black',
    collection: 'governance',
    rrp: 12000,
    kind: 'Quilted cantilever visitor chair',
    line: 'The same quilted back for the guests across the desk.',
    body: 'Matching the Nova chairs detail for detail, this one sits on a chrome cantilever frame with no casters, so a visitor is held still and upright. Protective feet look after the floor.',
    specs: [['Upholstery', 'Cushioned black upholstery'], ['Back', 'Tall padded back, diamond-quilted centre'], ['Seat', 'Broad padded seat'], ['Arms', 'Fixed'], ['Frame', 'Chrome-look cantilever, no casters'], ['Feet', 'Protective floor-contact feet']],
    dims: [['Seat width', 49], ['Seat depth', 51], ['Arm to arm', 56], ['Back height', 54], ['Overall height', 102]],
  },
  {
    slug: 'origin-visitor',
    name: 'Origin Visitor',
    finish: 'Black',
    collection: 'governance',
    rrp: 10795,
    kind: 'Mesh visitor chair',
    line: 'Open mesh on a dark steel sled, for meeting rooms that stay busy.',
    body: 'A shaped panel defines the lower back while open mesh keeps the rest cool through a long meeting. The black powder-coated sled stands firm, with no casters and nothing to adjust.',
    specs: [['Back', 'Open mesh with shaped lower-back panel'], ['Seat', 'Foam-padded, black'], ['Arms', 'Fixed, with flat pads'], ['Frame', 'Black powder-coated steel sled, no casters']],
    dims: [['Seat width', 45], ['Seat depth', 47], ['Arm to arm', 60], ['Back height', 50]],
  },
  {
    slug: 'executive-arc-visitor',
    name: 'Executive Arc Visitor',
    finish: 'Black',
    collection: 'governance',
    rrp: 6000,
    kind: 'Padded cantilever visitor chair',
    line: 'One sweep of chrome, and horizontal stitching across a padded back.',
    body: 'The arc of the cantilever frame gives the chair a gentle spring and a clean outline from the side. Padded arms and a stitched back make it a composed place to wait or to negotiate.',
    specs: [['Upholstery', 'Padded seat and back'], ['Back', 'Horizontal stitching'], ['Arms', 'Fixed padded rests'], ['Frame', 'Chrome-look cantilever, no casters']],
    dims: [['Seat width', 46], ['Seat depth', 44], ['Arm to arm', 55], ['Back width', 42], ['Back height', 50], ['Overall height', 97]],
  },
  {
    slug: 'aeroline-visitor',
    name: 'Aeroline Visitor',
    finish: 'Black',
    collection: 'governance',
    rrp: 5600,
    kind: 'Mesh cantilever visitor chair',
    line: 'Breathable mesh on a light chrome cantilever.',
    body: 'A slender frame and an open back keep this chair visually light, so a row of them never crowds a room. The padded seat stays comfortable through the length of a meeting.',
    specs: [['Back', 'Breathable mesh'], ['Seat', 'Padded upholstered seat'], ['Arms', 'Fixed'], ['Frame', 'Chrome-look cantilever, no casters']],
    dims: [['Seat width', 44], ['Seat depth', 43], ['Arm to arm', 52], ['Back width', 44], ['Back height', 50]],
  },
  {
    slug: 'breezemesh-visitor',
    name: 'Breezemesh Visitor',
    finish: 'Black',
    collection: 'governance',
    rrp: 5000,
    kind: 'Four-leg mesh visitor chair',
    line: 'Four straight chrome legs and a breathable back.',
    body: 'The most upright chair in the collection, and the simplest: a mesh back, a padded seat and fixed arms on a four-leg frame. Made for reception areas and side rooms.',
    specs: [['Back', 'Breathable mesh'], ['Seat', 'Padded upholstered seat'], ['Arms', 'Fixed'], ['Frame', 'Four-leg chrome-look frame, no casters']],
    dims: [['Seat width', 44], ['Seat depth', 43], ['Arm to arm', 52], ['Back width', 44], ['Back height', 50], ['Overall height', 93]],
  },

  /* ── Ergonomic Task Architecture ── */
  {
    slug: 'aero-flex-charcoal',
    name: 'Aero-Flex',
    finish: 'Charcoal',
    collection: 'ergonomic',
    rrp: 26000,
    kind: 'Full-mesh executive ergonomic chair',
    line: 'Full mesh, a retractable footrest, and an adjustment for almost everything.',
    body: 'The segmented back follows the spine and defines the lower back, while the headrest and arms move to meet you. When the work pauses, the footrest slides out from beneath the seat.',
    specs: [['Seat and back', 'Full mesh, charcoal black'], ['Headrest', 'Adjustable mesh headrest'], ['Back', 'Adjustable segmented high back'], ['Arms', 'Height-adjustable'], ['Footrest', 'Retractable'], ['Adjustment', 'Gas-lift seat height, under-seat controls'], ['Base', 'Chrome-look five-star base on five casters']],
    dims: [['Seat width', 49], ['Seat depth', 50], ['Back height', 55]],
  },
  {
    slug: 'aero-flex-ashy-graphite',
    name: 'Aero-Flex',
    finish: 'Ashy Graphite',
    collection: 'ergonomic',
    rrp: 26000,
    kind: 'Full-mesh executive ergonomic chair',
    line: 'The full Aero-Flex specification, in a lighter graphite.',
    body: 'Everything that makes the Aero-Flex work, the segmented back, moving headrest and arms and the retractable footrest, set in a pale ash grey that lifts a darker room.',
    specs: [['Seat and back', 'Full mesh, ashy graphite'], ['Headrest', 'Adjustable mesh headrest'], ['Back', 'Adjustable segmented high back'], ['Arms', 'Height-adjustable'], ['Footrest', 'Retractable'], ['Adjustment', 'Gas-lift seat height, under-seat controls'], ['Base', 'Chrome-look five-star base on five casters']],
    dims: [['Seat width', 49], ['Seat depth', 50], ['Back height', 55]],
  },
  {
    slug: 'astrolift-zero-g-graphite',
    name: 'Astrolift Zero-G',
    finish: 'Graphite',
    collection: 'ergonomic',
    rrp: 19499,
    kind: 'Ergonomic mesh chair with flip-up arms',
    line: 'Arms that fold out of the way when the desk needs you closer.',
    body: 'Padded arms flip up to clear the desk or a narrow space, and the separate headrest moves to find your neck. A shaped support holds the lower back within an open black mesh.',
    specs: [['Back', 'Black open mesh'], ['Headrest', 'Separate adjustable padded headrest'], ['Lumbar', 'Shaped lower-back support'], ['Seat', 'Padded, black'], ['Arms', 'Padded flip-up'], ['Adjustment', 'Seat height, with swivel'], ['Base', 'Black five-star base on casters']],
  },
  {
    slug: 'ergonomic-mesh-headrest-chrome',
    name: 'Ergonomic Mesh with Headrest',
    finish: 'Chrome base',
    collection: 'ergonomic',
    rrp: 16905,
    kind: 'High-back mesh chair',
    line: 'A tall mesh back and headrest, carried on chrome.',
    body: 'Open mesh runs from the seat to the head, with a shaped pad to hold the lower back. The chrome base lifts an otherwise all-black chair into the executive office.',
    specs: [['Back', 'Black open-mesh high back'], ['Headrest', 'Separate black mesh headrest'], ['Lumbar', 'Shaped lower-back pad'], ['Seat', 'Padded black fabric'], ['Arms', 'Flat pads'], ['Adjustment', 'Seat height, with swivel'], ['Base', 'Chrome-finish five-star base on casters']],
    dims: [['Seat width', 45], ['Seat depth', 50], ['Arm to arm', 59], ['Back width', 46], ['Back height', 49]],
  },
  {
    slug: 'astrolift-core-charcoal',
    name: 'Astrolift Core',
    finish: 'Charcoal',
    collection: 'ergonomic',
    rrp: 12799,
    kind: 'Mid-back mesh chair',
    line: 'A compact mid-back, in charcoal from arm to caster.',
    body: 'A padded panel supports the lower back behind open mesh, and looped arms keep the outline soft. Matte black from top to base, it disappears neatly into a working office.',
    specs: [['Back', 'Mid-back open mesh'], ['Lumbar', 'Shaped padded lower-back panel'], ['Seat', 'Padded black fabric'], ['Arms', 'Fixed loop arms'], ['Adjustment', 'Seat height, with swivel'], ['Base', 'Black five-star base on casters']],
    dims: [['Seat width', 48], ['Seat depth', 45], ['Arm to arm', 58], ['Back width', 43], ['Back height', 55]],
  },
  {
    slug: 'astrolift-core-polar-mint',
    name: 'Astrolift Core',
    finish: 'Polar Mint',
    collection: 'ergonomic',
    rrp: 12799,
    kind: 'Mid-back mesh chair',
    line: 'White frame, grey mesh and a pale mint seat, for the brighter office.',
    body: 'The lightest chair in the wing. A white frame and base hold a grey mesh back and a soft blue-grey seat, with the same shaped lower-back support as the Core in charcoal.',
    specs: [['Finish', 'White frame and base, grey mesh, pale blue-grey seat'], ['Back', 'Grey open-mesh mid-back'], ['Lumbar', 'Shaped lower-back support'], ['Seat', 'Padded upholstered seat'], ['Arms', 'Fixed white loop arms'], ['Adjustment', 'Seat height, with swivel'], ['Base', 'White five-star base on casters']],
  },
];

export const chairTitle = (c: Chair) => (c.finish && c.finish !== 'Black' ? `${c.name}, ${c.finish}` : c.name);
