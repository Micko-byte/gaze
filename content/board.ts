/* The Board of Gaze Holdings Limited: the client's website profile drafts (22 Oct 2026). */

export type Director = {
  slug: string;
  name: string;
  role: string;
  portrait: string;
  overview: string;
  /** A section's heading may be empty where her draft gives the text without one. */
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
  /* the two below are from her profiles of 6 Nov 2026 */
  {
    slug: 'lungisa-lutshaba',
    name: 'Lungisa Jason Lutshaba',
    role: 'Director — Industrial Strategy & Enterprise Scaling',
    portrait: '/images/board/lungisa-lutshaba.jpg',
    overview:
      'Lungisa Jason Lutshaba is a distinguished business executive, industrial visionary, and product development specialist with over 18 years of pioneering expertise spanning FMCG manufacturing, brand architecture, hospitality innovation, and international trade. As the Founding President and Chief Executive Officer of Analit Africa (Pty) Ltd—established in 2012—he has spearheaded the creation and scaling of elite consumer brands and diversified manufacturing enterprises across global and African markets.',
    sections: [
      {
        heading: 'Core Expertise & Strategic Focus',
        points: [
          { title: 'Industrial & Brand Stewardship', body: 'Architect behind an elite portfolio of household and personal care brands—including Sunpheka Foods, Ticklecare Skin, and Ambush Hygiene—with an expansive commercial footprint reaching Kenya, Ghana, Namibia, Nigeria, Kuwait, and the UAE.' },
          { title: 'Hospitality & Market Diversification', body: 'Proven mastery in developing bespoke hospitality products and luxury resort investments, serving prestigious groups such as Sun International, Tsogo Sun, and City Lodge Group.' },
          { title: 'Operational Excellence', body: 'Deep technical grounding in food science, quality assurance frameworks (ISO 9001:2015, FSSC 22000, HACCP), chemical engineering fundamentals, and industrial calibration.' },
        ],
      },
      {
        heading: 'Academic & Professional Credentials',
        points: [
          { title: 'Gordon Institute of Business Science (GIBS), University of Pretoria', body: 'Executive training in Business Administration, Entrepreneurship, Leadership, and Supply Chain Compliance.' },
          { title: 'Nelson Mandela University', body: 'Advanced studies in Marketing, Sales, Human Resource Management, and Financial Management Principles.' },
          { title: 'International Certifications', body: 'Specialized qualifications in Science, Mathematics, and Technological Education (SMATE) spanning web development, e-commerce, and technical programming, alongside formal certifications in Quality Management Systems and Industrial Supply Chain Governance.' },
        ],
      },
      {
        heading: 'Board Contribution',
        points: [
          {
            title: '',
            body: 'As a board member guiding industrial strategy and enterprise scaling, Lungisa brings exceptional acumen in scaling production operations, expanding cross-border trade channels, and securing high-value commercial and luxury hospitality partnerships. His strategic oversight anchors Gaze Holdings in uncompromising operational standards and visionary global expansion.',
          },
        ],
      },
    ],
  },
  {
    slug: 'mandy-sigauke',
    name: 'Dr. Mandy Sigauke',
    /* her new write-up, 6 Nov 2026 */
    role: 'Advisory Director — International Leadership & Governance',
    portrait: '/images/board/mandy-sigauke.jpg',
    overview:
      'Dr. Mandy Sigauke is a visionary entrepreneur, global speaker, wealth coach, author, and Christian leader dedicated to transforming mindsets, strengthening confidence, and helping leaders build sustainable wealth and meaningful legacies.',
    sections: [
      {
        heading: 'Executive Bio',
        points: [
          {
            title: '',
            body: 'She is the Founder and CEO of SheMillionaire, CEO of Mansig Holdings, and Founder of the Limpopo School of Etiquette—an institution where executive presence, confidence, and professional excellence find practical expression. As an Advisory Director for Gaze Holdings Ltd, Dr. Sigauke brings extensive continental governance, economic empowerment strategies, and institutional poise to the board.',
          },
        ],
      },
      {
        heading: 'Strategic Mandate & Board Focus',
        points: [
          { title: 'Continental Leadership & Governance', body: 'Advising the executive committee on cross-border expansion, institutional standards, and executive growth across Gaze Leadership Institute (GLI) and Her Gaze Global.' },
          { title: 'Wealth Architecture & Mindset', body: 'Bringing a proven framework in wealth creation, entrepreneurship, and brand positioning to empower regional leaders and corporate cohorts.' },
          { title: 'Global Visibility & Advocacy', body: 'Leveraging international platforms—from Paris and Dubai to China and Singapore—to connect African leaders with global opportunities and rooms of greater influence.' },
        ],
      },
      {
        heading: 'Key Quote',
        points: [
          {
            title: '',
            body: '“You do not need permission to become powerful. You are allowed to build wealth, become the face of your brand, enter global rooms, and create a legacy worthy of your vision.” — Dr. Mandy Sigauke',
          },
        ],
      },
    ],
  },
];
