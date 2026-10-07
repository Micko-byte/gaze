/* The client's Master Ecosystem Profile (5 Oct 2026). */
export const ethosContent = {
  eyebrow: 'The Architecture of Influence',
  /*
   * Her line, set after Pensatori Irrazionali: big capitals carry it, small serif, italic and script words sit
   * between them. `big` words rise letter by letter; the rest come into focus.
   */
  statement: [
    [
      { text: 'We do not', style: 'big' },
      { text: 'manage', style: 'italic' },
      { text: 'businesses;', style: 'script' },
    ],
    [
      { text: 'we', style: 'serif' },
      { text: 'anchor', style: 'big' },
      { text: '', style: 'mark' },
    ],
    [
      { text: 'institutions', style: 'big' },
      { text: 'of enduring power.', style: 'bold' },
    ],
  ],
  manifesto: [
    'Gaze Holdings Ltd. is an apex parent enterprise rooted in Nairobi, overseeing a curated ecosystem of luxury, education, convening, and literature.',
    'We do not manage businesses; we anchor institutions of enduring power.',
    'Operating at the intersection of uncompromised craftsmanship, sovereign leadership, and divine mandate, Gaze Holdings unites four distinct global houses under a single standard of absolute distinction.',
    'For those who understand that true legacy is designed, structured, and sustained, Gaze Holdings provides the ultimate ecosystem.',
  ],
  pullquote: {
    pre: 'Excellence is not an aspiration; it is our ',
    accent: 'native standard',
    post: '.',
  },
} as const;
