/**
 * Gaze Furnishings · Projects & Contract, after Natuzzi's Projects & Contract division (the client's request of
 * 28 Oct 2026): the kinds of spaces the house furnishes, each shown in her own photographs or film, then a desk for
 * architects, developers, hotels and companies. The project lines are a proposal until she names real projects.
 */
const f = (name: string) => `/images/furnishings/${name}.jpg`;

export type Project = {
  id: string;
  kind: string;
  title: string;
  line: string;
  media: { image: string; alt: string } | { video: string; poster: string };
  /** The wing whose pieces made it. */
  wing: string;
};

export const projects: ReadonlyArray<Project> = [
  {
    id: 'residences',
    kind: 'Private residences',
    title: 'Homes, room by room',
    line: 'Living rooms, bedrooms and kitchens measured to the house and made as one composition: sofas, beds, storage and the kitchen that ties them together.',
    media: { image: f('kitchen-open-plan'), alt: 'An open-plan kitchen and living room furnished by Gaze' },
    wing: 'living',
  },
  {
    id: 'corporate',
    kind: 'Corporate & executive',
    title: 'Boardrooms that hold the room',
    line: 'Executive suites, boardrooms and reception lounges from the Corporate Collection, imported and placed for companies that lead.',
    media: { image: f('office-boardroom-long'), alt: 'A long boardroom table with executive leather chairs' },
    wing: 'office',
  },
  {
    id: 'hospitality',
    kind: 'Hospitality',
    title: 'Bars, restaurants & events',
    line: 'Bar counters, tables and seating made in runs for restaurants, hotels and garden events, to one finish and one standard.',
    media: { image: f('bar-black'), alt: 'A black lacquered bar counter and back bar set up under a garden marquee' },
    wing: 'kitchen',
  },
  {
    id: 'reception',
    kind: 'Lobbies & reception',
    title: 'The first impression',
    line: 'Reception seating, lounge tables and fluted reception desks for lobbies, clinics and offices, drawn to the plan of the space.',
    media: { image: f('office-waiting-beam'), alt: 'Leather beam seating in a lobby with a window onto an airfield' },
    wing: 'office',
  },
  {
    id: 'estates',
    kind: 'Estates & gardens',
    title: 'Living in the open air',
    line: 'Terraces, pool decks and gardens furnished with weather-ready sofas, loungers and dining, made by our artisans for open-air estate living.',
    media: { video: '/video/furnishings/outdoor-garden.mp4', poster: '/video/furnishings/outdoor-garden.jpg' },
    wing: 'outdoor',
  },
];

export const contract = {
  eyebrow: 'For professionals',
  title: 'Design with us',
  body: 'Architects, interior designers, developers, hotels and companies: our contract desk furnishes whole projects, from a single boardroom to every apartment in a development, with drawings, samples and a schedule agreed before production.',
  requests: ['A project quote', 'A design consultation', 'A trade account'],
};
