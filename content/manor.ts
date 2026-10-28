/*
 * The Gaze Manor. Since 27 Oct 2026 the house is an estate practice with three wings (her write-ups and page order of
 * that day); the series profile of 22 Oct (further down) is now the third wing, Media & Broadcast.
 */

const m = (name: string) => `/images/manor/${name}.jpg`;

export const manorHero = {
  subHeader: 'Estate Living • Architectural Design • Media & Spatial Arts',
  tagline: 'The Sanctuary of Structural Elegance',
  headline: 'Where spatial psychology meets structural sovereignty.',
  body: 'Gaze Manor is the physical and narrative embodiment of our design philosophy. Operating at the intersection of Scandinavian minimalist purity, continental topography, and neuroscience-backed human behavior, Gaze Manor engineers living sanctuaries and documents the art of enduring estate architecture.',
  coda: 'Here, space is not merely occupied—it is curated to hold water for generations.',
  ctas: [
    { label: 'Inquire for Private Commissions', href: '#commission' },
    { label: 'Explore the Atelier', href: '#atelier' },
  ],
};

export const manorAbout = {
  title: 'The Sanctuary of Structural Elegance',
  body: [
    'Gaze Manor is the physical and narrative embodiment of our design philosophy—where spatial psychology, architectural discipline, and living artistry converge.',
    'Functioning as both a premier private estate destination and a creative broadcast enterprise, Gaze Manor documents and engineers environments built for quiet luxury, internal alignment, and enduring heritage.',
  ],
};

/* Her main-menu navigation for the house, each line opening its part of the page. */
export const manorMenu = [
  { label: 'About Gaze Manor', href: '#about', items: [] },
  { label: 'Architectural Atelier', href: '#atelier', line: 'Turnkey residential and commercial structural planning.', items: ['Concept Architecture & Site Topography', 'Residential & Commercial Blueprints', 'Structural Planning & Spatial Psychology'] },
  { label: 'Landscape Architecture & Spatial Design', href: '#landscape', line: 'Master site layouts, botanical curation, and living grounds.', items: ['Master Estate Planning', 'Botanical & Horticultural Curation', 'Hardscape Architecture & Living Grounds'] },
  { label: 'Media & Broadcast Series', href: '#media', line: 'Original editorial series and visual storytelling exploring design, neuroscience, and human behavior.', items: ['Original Design Series & Documentaries', 'Press & Visual Storytelling'] },
  { label: 'Private Commissions & Inquiries', href: '#commission', items: [] },
] as const;

export type ManorWing = {
  id: string;
  numeral: string;
  name: string;
  subHeader: string;
  headline: string;
  body: string[];
  services: ReadonlyArray<{ title: string; body?: string }>;
  ctas: ReadonlyArray<{ label: string; href: string }>;
  images?: ReadonlyArray<{ src: string; alt: string }>;
};

export const manorWings: ReadonlyArray<ManorWing> = [
  {
    id: 'atelier',
    numeral: 'I',
    name: 'The Architectural Atelier',
    subHeader: 'Concept Architecture • Site Topography • Structural Blueprints',
    headline: 'The Inner Architecture Made Physical.',
    body: [
      'Functioning as our principal architectural practice, the Atelier approaches structural design through a dual commitment to geometric discipline and human-centered flow. We curate private residential estates and corporate sanctuaries from raw land layout to structural execution oversight.',
      'Our architectural wing approaches structural design through the dual lenses of Scandinavian minimalist clarity and neuroscience-backed spatial flow. We engineer sovereign residential estates and private commercial sanctuaries where structural integrity, natural light corridors, and refined proportion meet.',
      'From initial land topography and site master planning to full structural blueprints and execution oversight, we design spaces that hold water for generations.',
    ],
    services: [
      { title: 'Estate Master Planning & Site Topography', body: 'Strategic alignment of physical structures with natural light corridors, site elevations, and land contours.' },
      { title: 'Residential & Commercial Blueprints', body: 'Bespoke concept architecture designed with Scandinavian spatial clarity and structural integrity.' },
      { title: 'Spatial Psychology & Flow Engineering', body: 'Blueprinting environments crafted to reduce cognitive dissonance and optimize internal composure.' },
      { title: 'Turnkey Structural Oversight', body: 'Rigorous execution management from foundational groundwork to architectural completion.' },
    ],
    ctas: [
      { label: 'Discover Architectural Works', href: '#atelier-works' },
      { label: 'Book Private Architectural Consultation', href: '#commission' },
    ],
    /* her concept renders, sent 27 Oct */
    images: [
      { src: m('atelier-great-room'), alt: 'A double-height timber great room with a gallery, a stair and an open kitchen beyond' },
      { src: m('atelier-fireplace'), alt: 'A living room under a timber roof, with a brick fireplace and tall windows onto a lawn' },
      { src: m('atelier-gallery'), alt: 'A timber stair and wrought-iron gallery above a white living room' },
      { src: m('atelier-loft'), alt: 'A stone-walled loft room with a mezzanine and an antler chandelier' },
    ],
  },
  {
    id: 'landscape',
    numeral: 'II',
    name: 'Landscape Architecture & Spatial Design',
    subHeader: 'Estate Master Planning • Botanical Curation • Living Grounds',
    headline: 'The Art of Exterior Architecture.',
    body: [
      'We view the surrounding landscape not as an exterior detail, but as the natural continuation of the inner architectural mind. Our landscape practice harmonizes hardscape elements, indigenous flora, and sustainable infrastructure into serene living grounds.',
      'Bridging Scandinavian minimalist purity with organic continental topography, our landscape architecture division engineers serene, sustainable living environments. From private residential estates to commercial sanctuaries, we curate spatial layouts, natural light corridors, biodigester infrastructure, and indigenous botanical compositions into a singular, harmonious sanctuary.',
    ],
    services: [
      { title: 'Estate Master Planning & Site Topography' },
      { title: 'Horticultural Curation & Botanical Gardening', body: 'Bespoke flora selection, sculptured gardens, and indigenous plant preservation tailored for estate longevity.' },
      { title: 'Hardscape Architecture & Water Elements', body: 'Precision stone terraces, private courtyards, natural light reflection pools, and outdoor living sanctuaries.' },
      { title: 'Sustainable Infrastructure Integration', body: 'Low-impact environmental engineering, including discreet biodigester integration and solar water systems.' },
    ],
    ctas: [
      { label: 'Discover Spatial Portfolio', href: '#landscape-works' },
      { label: 'Inquire for Private Commissions', href: '#commission' },
    ],
    /* stills from the Manor's own garden film of 27 Oct (Manor never borrows Furnishings' pictures) */
    images: [
      { src: m('garden-table'), alt: 'Round garden tables dressed in a blue floral cloth, with bamboo chairs on a stone terrace' },
      { src: m('garden-vase'), alt: 'A tall vase of garden flowers over limes, on a dressed table beside the house' },
      { src: m('garden-bamboo'), alt: 'A bamboo chair against a floral tablecloth' },
      { src: m('garden-setting'), alt: 'Stacked plates on a woven charger, navy napkins and a vase of limes' },
    ],
  },
  {
    id: 'media',
    numeral: 'III',
    name: 'Media & Broadcast Division',
    subHeader: 'Original Broadcast Series • Architectural Documentaries • Visual Storytelling',
    headline: 'The Narrative of Space & Human Behavior.',
    body: [
      'Gaze Manor doubles as a broadcast enterprise, producing high-end editorial series and documentary visual storytelling. We capture the dialogue between interior design, brain chemistry, failure as a structural audit, and the pursuit of mental sovereignty.',
    ],
    services: [
      { title: 'Gaze Manor Original Series', body: 'Visual exploration of luxury estate builds, structural transformations, and design philosophy.' },
      { title: 'The Architecture of the Mind', body: 'Documentary features connecting spatial environments to psychological well-being and performance.' },
      { title: 'Press & Editorial Archive', body: 'Curated broadcast appearances, keynote archives, and literary commentary.' },
    ],
    ctas: [{ label: 'Watch the Broadcast Series', href: '#series' }],
  },
];

export const manorCommitment = {
  title: 'The Gaze Manor Commitment',
  quote:
    'Architecture is not about surface performance—it is about structural alignment. Whether through the steel of a blueprint, the soil of a living garden, or the lens of a broadcast, Gaze Manor builds spaces that endure.',
  name: 'Muthoni Ngugi',
  role: 'Founder & Executive Chairperson, Gaze Holdings Limited',
};

export const manorCommission = {
  title: 'Commission an Estate',
  body: 'Whether acquiring land, blueprinting a private residence, or curating spatial grounds, Gaze Manor accepts a limited number of private commissions annually to maintain absolute craftsmanship.',
  cta: { label: 'Request a Private Consultation', href: '/#contact' },
};

/* ── the series (22 Oct 2026), now Wing III ── */

export const manorIntro = {
  title: 'The Gaze Manor',
  sub: 'Architecture, Psychology, and International Luxury Living',
  opening: 'Modern life demands sanctuary.',
  premise:
    'Yet the world’s most exclusive residences—from the hills of Los Angeles to the coastal estates of Cape Town, Lagos, Accra, and Nairobi—are rarely designed with cognitive wellbeing at their core.',
  series:
    'The Gaze Manor is an international luxury real estate, interior architecture, and lifestyle series. Moving beyond traditional home tours, the show takes viewers inside the most extraordinary private residences and high-end developments across global design capitals, exploring how spatial design shapes the human mind.',
};

export const manorCities = ['Los Angeles', 'Cape Town', 'Lagos', 'Accra', 'Nairobi'];

export const manorPillars = {
  heading: 'Where Architectural Prestige Meets Cognitive Science',
  lede: 'Every episode explores the intersection of high-net-worth real estate, bespoke interior craftsmanship, and psychological wellbeing:',
  items: [
    { title: 'Global Real Estate & Architecture', body: 'Touring premier luxury condos and private estates across Africa, North America, and Europe.', image: m('evening-porch') },
    { title: 'The Psychology of Space', body: 'Unpacking how lighting, layout, and spatial balance elevate mental clarity, emotional peace, and restorative living.', image: m('evening-armchair-lamp') },
    { title: 'Bespoke Interior Craftsmanship', body: 'Going behind the scenes to show how custom, artisan-crafted furnishings transform raw architecture into a living sanctuary.', image: m('evening-sofa-mirror') },
  ],
};

/* The four movements of an episode, in the order they play; each shows one of the Manor's own films (public/video/manor)
   or stills from them. */
export const manorExperience: ReadonlyArray<{ title: string; body: string; media: { video: string } | { image: string } }> = [
  { title: 'The Global Estate Tour', body: 'Discovering exceptional architectural properties in prestigious international enclaves.', media: { video: 'porch' } },
  { title: 'The Spatial Narrative', body: 'Analyzing how the design, light, and proportions of the home impact the lifestyle and wellbeing of its inhabitants.', media: { video: 'lamplight' } },
  { title: 'The Craft & Curation', body: 'Showcasing the custom furniture production, textures, and bespoke finishes that define true luxury.', media: { image: m('evening-blue-chair') } },
  { title: 'The Sanctuary Reveal', body: 'Demonstrating the ultimate harmony between high-end luxury real estate and deep emotional comfort.', media: { video: 'hearth' } },
];

export const manorCredits = {
  series: 'An original international series',
  poweredBy: 'Gaze Holdings Ltd',
  featuring: 'Featuring bespoke interior curation and manufacturing by',
  maker: 'Gaze Furnishings Kenya Limited',
};
