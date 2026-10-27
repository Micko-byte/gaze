/* The Gaze Manor: the client's series profile (22 Oct 2026). */

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
    { title: 'Global Real Estate & Architecture', body: 'Touring premier luxury condos and private estates across Africa, North America, and Europe.', image: 'sofa-olive-stair' },
    { title: 'The Psychology of Space', body: 'Unpacking how lighting, layout, and spatial balance elevate mental clarity, emotional peace, and restorative living.', image: 'bed-ivory-suite' },
    { title: 'Bespoke Interior Craftsmanship', body: 'Going behind the scenes to show how custom, artisan-crafted furnishings transform raw architecture into a living sanctuary.', image: 'curved-sofa-forest' },
  ],
};

/* The four movements of an episode, in the order they play; each shows one of her films or photographs. */
export const manorExperience: ReadonlyArray<{ title: string; body: string; media: { video: string } | { image: string } }> = [
  { title: 'The Global Estate Tour', body: 'Discovering exceptional architectural properties in prestigious international enclaves.', media: { video: 'staircase' } },
  { title: 'The Spatial Narrative', body: 'Analyzing how the design, light, and proportions of the home impact the lifestyle and wellbeing of its inhabitants.', media: { video: 'marble-wall' } },
  { title: 'The Craft & Curation', body: 'Showcasing the custom furniture production, textures, and bespoke finishes that define true luxury.', media: { image: 'curved-sofa-channel' } },
  { title: 'The Sanctuary Reveal', body: 'Demonstrating the ultimate harmony between high-end luxury real estate and deep emotional comfort.', media: { image: 'curved-sofa-mink' } },
];

export const manorCredits = {
  series: 'An original international series',
  poweredBy: 'Gaze Holdings Ltd',
  featuring: 'Featuring bespoke interior curation and manufacturing by',
  maker: 'Gaze Furnishings Kenya Limited',
};
