/* The Board of Gaze Holdings Limited: the client's website profile drafts (22 Oct 2026). */

export type Director = {
  slug: string;
  name: string;
  role: string;
  portrait: string;
  overview: string;
  sections: { heading: string; points: { title: string; body: string }[] }[];
};

export const board: ReadonlyArray<Director> = [
  {
    slug: 'edwin-musiime',
    name: 'Dr. Edwin Musiime',
    role: 'Director — Faith, Kingdom Governance & Ethical Leadership',
    portrait: '/images/board/edwin-musiime.jpg',
    overview:
      'Dr. Edwin Musiime is a distinguished business growth strategist, corporate leader, and transformational speaker based in Kampala, Uganda. Grounded in a strong conviction for kingdom-minded enterprise and ethical stewardship, Dr. Musiime brings a unique synthesis of faith-driven vision, high-level corporate governance, and cross-sector growth strategy to the Board of Gaze Holdings Limited. His leadership ensures that our strategic expansion remains rooted in integrity, purpose, and lasting socio-economic transformation.',
    sections: [
      {
        heading: 'Distinguished Credentials',
        points: [
          { title: 'Doctor of Philosophy (PhD) in Leadership and Management', body: 'Specializing in transformational leadership, enterprise development, and socio-economic advancement across African markets.' },
          { title: 'Master in Leadership and Management', body: 'Advanced expertise in strategic scaling, organizational governance, and sustainable board practices.' },
          { title: 'Bachelor of Arts in Mass Communication (Makerere University)', body: 'Foundational mastery in brand architecture, corporate communication, and media innovation.' },
        ],
      },
      {
        heading: 'Board Contribution & Strategic Alignment',
        points: [
          {
            title: '',
            body: 'As a board member guiding the aspect of faith, Dr. Musiime champions the integration of kingdom principles within modern corporate frameworks. His extensive portfolio across real estate advocacy, media enterprise, and executive development enables Gaze Holdings to scale with luxury refinement while staying firmly anchored to higher purpose, sound governance, and transformative impact across the continent.',
          },
        ],
      },
    ],
  },
  {
    slug: 'julius-gitonga',
    name: 'Julius Gitonga',
    role: 'Director — Enterprise Technology Architecture & Digital Transformation',
    portrait: '/images/board/julius-gitonga.jpg',
    overview:
      'Julius Gitonga is an elite technological architect and digital steward with over a decade of distinguished leadership in software engineering, digital product development, and complex systems architecture. Renowned for his ability to translate corporate vision into resilient, high-performance technology ecosystems, Julius brings master-level software expertise and strategic digital foresight to the Board of Gaze Holdings Limited.',
    sections: [
      {
        heading: 'Core Expertise & Strategic Focus',
        points: [
          { title: 'Architectural Excellence', body: 'Specializes in leading high-caliber software engineering teams and delivering scalable, bespoke digital platforms across international markets.' },
          { title: 'Cross-Industry Mastery', body: 'Broad technical footprint spanning financial services, telecommunications, insurance, digital health, and high-security information management.' },
          /* the draft breaks off at "Data & Process Transformation: Expert in business process automat…"; the rest is to follow */
        ],
      },
    ],
  },
];
