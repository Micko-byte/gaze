export const heroContent = {
  eyebrow: 'Gaze Holdings',
  headline: {
    // Set massive over two lines; the accent never starts a line, since it carries a leading margin.
    lines: [
      { parts: [{ text: 'A House' }] },
      { parts: [{ text: 'of' }, { text: 'Brands', accent: true }, { text: '.' }] },
    ],
  },
  sub: 'Four houses. One standard. Built in Nairobi, made for the world.',
  scrollCue: 'Scroll',
} as const;
