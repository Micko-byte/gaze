export type SynergyNode = {
  id: string;
  label: string;
  x: number; // %
  y: number; // %
  caption: string;
};

export const synergyNodes: ReadonlyArray<SynergyNode> = [
  {
    id: 'furnishings',
    label: 'Furnishings',
    x: 18,
    y: 22,
    caption: 'Interiors furnish the Manor. The Manor hosts the Press launches.',
  },
  {
    id: 'press',
    label: 'Press',
    x: 82,
    y: 22,
    caption: 'Press publishes the Institute curriculum. The Institute teaches HerGaze.',
  },
  {
    id: 'institute',
    label: 'Institute',
    x: 18,
    y: 78,
    caption: 'The Institute trains the writers Press will publish next.',
  },
  {
    id: 'manor',
    label: 'Manor',
    x: 82,
    y: 78,
    caption: 'The Manor broadcasts the Institute cohorts and HerGaze summits.',
  },
  {
    id: 'hergaze',
    label: 'HerGaze',
    x: 95,
    y: 50,
    caption: 'HerGaze convenes the women the rest of the group will serve.',
  },
];

export const synergyContent = {
  eyebrow: '04 · Cross-Division Synergy',
  heading: {
    pre: 'Five companies. ',
    accent: 'One',
    post: ' system.',
  },
  sub: 'Each division feeds the others. Capital, audience, and discipline move freely across the house.',
} as const;
