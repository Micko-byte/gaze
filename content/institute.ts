/*
 * Gaze Leadership Institute: the website copy the client sent on 15 Oct 2026, with programme detail, the founder's
 * note, pillars, promise and teaching methods taken from the GLI Brand Book V1.
 */

export const gliNav = [
  { label: 'About', href: '/institute/about' },
  { label: 'Programs', href: '/institute/programs' },
  { label: 'Prophetic School', href: '/institute/prophetic-intelligence' },
  { label: 'Admissions', href: '/institute/admissions' },
  { label: 'Corporate', href: '/institute/corporate' },
  { label: 'Contact', href: '/institute/contact' },
] as const;

export const gliContact = {
  city: 'Nairobi, Kenya',
  phones: ['+254 117 664 505', '+254 706 338 791'],
  info: 'info@gazeleadershipinstitute.com',
  admissions: 'admissions@gazeleadershipinstitute.com',
  web: 'www.gazeleadershipinstitute.com',
  parent: 'A division of Gaze Group of Companies',
};

export const tagline = 'Training Kingdom Leaders For Global Influence';

/* ── Home ── */

export const hero = {
  headline: 'Raising Emotionally Intelligent, Spirit-Led, High-Capacity Leaders for Global Impact.',
  body: 'A premier Kingdom-based leadership academy equipping individuals, corporates, and ministry leaders with clarity, emotional maturity, and strategic intelligence.',
};

export const whoWeAre = [
  'Gaze Leadership Institute (GLI) is a transformative leadership, purpose, and emotional intelligence academy committed to raising leaders who influence environments, build systems, and steward purpose with excellence.',
  'We merge Kingdom principles, leadership science, and practical application to produce grounded, effective, purpose-led leaders.',
];

/* Each offer links to the School (or page) that teaches it. */
export const offers = [
  { title: 'Professional leadership training', href: '/institute/programs#school-1', image: 'speaker-group' },
  { title: 'Emotional intelligence mastery', href: '/institute/programs#school-3', image: 'counsel' },
  { title: 'Purpose mapping and clarity programs', href: '/institute/programs#school-4', image: 'reader' },
  { title: 'Corporate training & executive development', href: '/institute/corporate', image: 'boardroom-a' },
  { title: 'Women-in-leadership programs (Her Gaze Track)', href: '/institute/programs#school-6', image: 'women-a' },
  { title: 'Public speaking & communication mastery', href: '/institute/programs#school-7', image: 'podium' },
  { title: 'Coaching & mentorship pathways', href: '/institute/programs#school-5', image: 'coach-a' },
];

export const whyGli = [
  'Kingdom-centered leadership',
  'Executive-standard professional training',
  'Deep emotional and spiritual transformation',
  'Highly practical tools & frameworks',
  'Access to the Gaze global network',
  'Certificates upon completion',
];

export const upcoming = [
  { title: 'Emotional Intelligence Mastery', school: 'School of Emotional Intelligence & Human Behavior', href: '/institute/programs#school-3', image: 'laptop-smile', open: true },
  { title: 'Purpose Mapping Intensive (Habakkuk 2:2)', school: 'School of Purpose, Faith & Kingdom Leadership', href: '/institute/programs#school-4', image: 'study' },
  { title: 'Gaze Leadership Voice (Public Speaking)', school: 'School of Communication, Branding & Public Speaking', href: '/institute/programs#school-7', image: 'facilitator' },
  { title: 'Executive Leadership Certificate', school: 'School of Leadership & Personal Mastery', href: '/institute/programs#school-1', image: 'justice' },
  { title: 'Women of Influence Program', school: 'School of Women in Leadership', href: '/institute/programs#school-6', image: 'women-b' },
];

export const testimonials = [
  { quote: 'GLI helped me find clarity, confidence, and leadership grace. I am a different person.', who: 'Student' },
  { quote: 'A transformative experience—spiritual, practical, and empowering.', who: 'Corporate Client' },
];

/* ── About ── */

export const about = {
  lede: 'Where Kingdom Wisdom Meets Leadership Excellence.',
  who: [
    'Gaze Leadership Institute (GLI) is a leadership, personal transformation, and Kingdom-alignment academy rooted in the belief that leadership begins within.',
    'Through deep emotional intelligence, spiritual alignment, purpose clarity, and strategic thinking, GLI develops world-class leaders who build with intention and influence their generation.',
  ],
  mission: 'To refine, equip, and activate leaders—emotionally, spiritually, and strategically—to build with clarity, confidence, and Kingdom purpose.',
  vision: 'To become Africa’s leading Kingdom leadership institute, raising men and women who shape systems, families, businesses, and nations through wisdom and alignment.',
};

export const founderNote = {
  title: 'Founder’s Welcome Note',
  body: 'GLI was birthed from a divine vision: to raise leaders who build according to God’s blueprint. Every leader must see clearly, lead with intelligence, and influence intentionally. Our mission is to equip leaders with the clarity, character, and competence to impact the world for Kingdom purposes. Welcome to a journey of transformation.',
  /* as credited in the GLI Brand Book V1 */
  signed: 'Muthoni Ngugi, Founder & Visionary',
};

export const originStory =
  'GLI began as an extension of the Gaze Group, emerging out of years of entrepreneurship, ministry, and leadership work. The Founder’s journey, marked by rebuilding, clarity, and divine strategy, revealed the need for a formal leadership institution grounded in Kingdom principles, emotional intelligence, and strategic excellence.';

export const brandStory = {
  opening: 'GLI was birthed from a divine instruction:',
  instruction: 'Raise leaders who build according to My blueprint.',
  crisis: ['The institute exists to solve a global crisis—', 'a generation full of ambition but empty of alignment.'],
  answer: ['GLI trains leaders to see clearly,', 'build intentionally,', 'and rise with authority in business, ministry, and governance.'],
};

export const philosophy = [
  'Leadership is identity before it is skill',
  'Emotional intelligence anchors influence',
  'Purpose shapes direction',
  'Kingdom principles build lasting structures',
  'Excellence is a spiritual discipline',
];

/* The website's six pillars, each described as in the brand book's "Strategic Anchors". */
export const pillars = [
  { title: 'Emotional Intelligence & Self-Mastery', body: 'Developing self-awareness, emotional maturity, and relational intelligence that strengthens influence and leadership presence.' },
  { title: 'Kingdom Leadership & Character Formation', body: 'Cultivating leaders who build with divine wisdom, moral integrity, and alignment with God’s purpose and principles.' },
  { title: 'Strategic Thinking & Organizational Development', body: 'Raising leaders who operate with clarity, discipline, and strategic intelligence across personal, corporate, and ministry spaces.' },
  { title: 'Purpose, Calling & Destiny Alignment', body: 'Guiding individuals into a deep understanding of their identity, assignment, and long-term direction.' },
  { title: 'Communication, Influence & Public Presence', body: 'Equipping leaders to communicate with authority, articulate vision, and build impactful personal and organizational brands.' },
  { title: 'Women in Leadership & Identity Formation', body: 'Strengthening women to rise in identity, wholeness, emotional power, and feminine leadership.' },
];

export const values = ['Excellence', 'Integrity', 'Wisdom', 'Service', 'Alignment', 'Impact'];

export const promise = {
  heading: 'What GLI guarantees to students, parents, staff, partners, and the world.',
  body: 'Gaze Leadership Institute promises to build leaders from the inside out, leaders who are emotionally intelligent, spiritually aligned, strategically equipped, and globally impactful. We guarantee an environment of excellence, personal mastery, and transformative learning designed to refine identity, strengthen character, and elevate leadership capacity.',
  points: [
    'Deliver world-class, Kingdom-rooted leadership training.',
    'Provide emotionally safe, supportive, and growth-focused learning spaces.',
    'Equip every learner with clarity, purpose, and practical tools for real-world influence.',
    'Maintain high standards of integrity, excellence, and spiritual alignment.',
    'Develop men and women who positively transform families, organizations, communities, and nations.',
  ],
  close: 'GLI guarantees not just education, but transformation, direction, and leadership mastery that endures beyond the classroom.',
};

export const usp = {
  lead: 'No institute in Africa combines',
  points: ['Kingdom leadership', 'Emotional intelligence mastery', 'Business strategy', 'Prophetic alignment', 'Executive coaching'],
  close: 'into one structured leadership system. This is GLI’s global advantage.',
  graduates: 'Your graduates become leaders who build with God’s blueprint, emotional maturity, intelligence, clarity, and stewardship.',
};

export const positioning =
  'Gaze Leadership Institute is Africa’s premier kingdom leadership academy—where emotional intelligence, prophetic clarity, and business strategy converge to raise leaders who influence nations.';

/* ── Programmes ── */

export type Programme = { title: string; weeks: number; modules: string[]; outcome?: string };

export type School = {
  id: string;
  name: string;
  includes: string[];
  outcome: string;
  image: string;
  programmes: Programme[];
};

export const schools: School[] = [
  {
    id: 'school-1',
    name: 'Leadership & Personal Mastery',
    includes: ['Self-Leadership & Identity', 'Executive Leadership Foundations', 'Transformational Leadership', 'Character & Discipline Development'],
    outcome: 'Leaders with clarity, self-mastery, and authority.',
    image: 'lecture-dark',
    programmes: [
      {
        title: 'Personal Mastery & Self-Leadership',
        weeks: 4,
        modules: ['Understanding Yourself as a Leader', 'Vision, Values & Life Alignment', 'Building Mental, Emotional & Spiritual Strength', 'Habits of Highly Effective Kingdom Leaders', 'Productivity & Discipline'],
        outcome: 'Learners develop clarity, identity, and personal governance.',
      },
      {
        title: 'Executive Leadership Foundations',
        weeks: 6,
        modules: ['Leadership Competencies', 'Strategic Thinking', 'Decision-Making Models', 'Delegation, Influence & Power', 'Ethical Leadership & Stewardship'],
        outcome: 'Leaders capable of managing teams and driving organizational results.',
      },
      {
        title: 'Transformational Leadership Mastery',
        weeks: 6,
        modules: ['Leading Change', 'Cultivating Culture', 'High-Performance Leadership', 'Leading with Grace & Authority', 'Crisis & Conflict Leadership'],
        outcome: 'Leaders who shift organizations and communities.',
      },
    ],
  },
  {
    id: 'school-2',
    name: 'Business, Corporate Systems & Strategy',
    includes: ['Entrepreneurship & Business Fundamentals', 'Strategic Planning & Structure', 'Organizational Leadership', 'Corporate Governance'],
    outcome: 'Builders who design and scale effective systems.',
    image: 'office-b',
    programmes: [
      {
        title: 'Entrepreneurship & Business Development',
        weeks: 6,
        modules: ['Business Foundations', 'Product Development & Market Fit', 'Branding & Positioning', 'Marketing & Sales', 'Structuring for Growth', 'Scaling Strategies'],
        outcome: 'Entrepreneurs ready to grow sustainable enterprises.',
      },
      {
        title: 'Strategic Planning & Organizational Structure',
        weeks: 5,
        modules: ['Vision Mapping', 'Strategic Roadmaps', 'Annual & Quarterly Planning', 'Department Structuring', 'KPIs & Accountability Systems'],
        outcome: 'Leaders who think, plan, and execute strategically.',
      },
      {
        title: 'Corporate Governance & Organizational Leadership',
        weeks: 8,
        modules: ['Boards & Governance', 'Organizational Policies', 'Performance Management', 'Risk Management', 'Corporate Ethics & Standards'],
        outcome: 'Leaders equipped to run institutions with excellence.',
      },
    ],
  },
  {
    id: 'school-3',
    name: 'Emotional Intelligence & Human Behavior',
    includes: ['Emotional Intelligence Certification', 'People Dynamics & Relational Skills', 'Conflict Management', 'Behavioral Patterns & Awareness'],
    outcome: 'Emotionally mature leaders with people mastery.',
    image: 'counsel',
    programmes: [
      {
        title: 'Emotional Intelligence (EI) Practitioner Certification',
        weeks: 8,
        modules: ['Self-Awareness', 'Self-Regulation', 'Empathy', 'Social Intelligence', 'Relationship Management', 'Emotional Maturity & Conflict Resolution'],
        outcome: 'Certified EI practitioners.',
      },
      {
        title: 'Human Dynamics, People Skills & Workplace Interactions',
        weeks: 4,
        modules: ['Communication Styles', 'Understanding Behavior Patterns', 'Healthy Confrontation', 'Feedback & Difficult Conversations'],
        outcome: 'Leaders who create healthy relational environments.',
      },
    ],
  },
  {
    id: 'school-4',
    name: 'Purpose, Faith & Kingdom Leadership',
    includes: ['Purpose Mapping (Habakkuk 2:2)', 'Vision Clarity & Destiny Alignment', 'Kingdom Leadership Development', 'Building With God’s Blueprint (Nehemiah)'],
    outcome: 'Leaders aligned with God’s assignment.',
    image: 'reading-room',
    programmes: [
      {
        title: 'Purpose Discovery & Vision Clarity',
        weeks: 4,
        modules: ['Identity in God', 'Purpose Mapping', 'Assignment vs. Calling', 'Vision Interpretation (Habakkuk 2:2)', 'Purpose-Driven Decision Making'],
      },
      {
        title: 'Kingdom Leadership Development',
        weeks: 6,
        modules: ['Leadership in the Bible', 'Prophetic Leadership', 'Servant Leadership', 'Building with God’s Blueprint', 'Spiritual Authority & Integrity'],
      },
      {
        title: 'Faith & Marketplace Influence',
        weeks: 4,
        modules: ['The Believer in the Marketplace', 'Spiritual Disciplines for Leaders', 'Wisdom in Business', 'Ministry in the Workplace'],
      },
    ],
  },
  {
    id: 'school-5',
    name: 'Coaching, Training & Facilitation',
    includes: ['Coaching Foundations', 'Facilitation Skills', 'Mentorship & Ethics', 'Coaching for Transformation'],
    outcome: 'Coaches & trainers who create measurable change.',
    image: 'coach-b',
    programmes: [
      {
        title: 'Professional Coaching Foundations',
        weeks: 8,
        modules: ['Coaching Fundamentals', 'Listening & Questioning Skills', 'Coaching Presence', 'Coaching Frameworks', 'Conducting Coaching Sessions', 'Ethics & Standards'],
      },
      {
        title: 'Facilitation & Training Mastery',
        weeks: 4,
        modules: ['Curriculum Design', 'Group Dynamics', 'Adult Learning Principles', 'Holding Space as a Facilitator'],
      },
    ],
  },
  {
    id: 'school-6',
    name: 'Women in Leadership (Her Gaze Track)',
    includes: ['Feminine Leadership & Emotional Strength', 'Sensuality, Wholeness & Identity', 'Kingdom Womanhood', 'Marriage, Partnership & Purpose'],
    outcome: 'Women who carry grace, strength, and influence.',
    image: 'woman-red',
    programmes: [
      {
        title: 'The Woman of Influence Program',
        weeks: 6,
        modules: ['Identity & Worth', 'Leadership as a Woman', 'Emotional Strength', 'Presence, Confidence & Grace', 'Building a Feminine Yet Powerful Brand'],
      },
      {
        title: 'Marriage, Family & Purpose for Women',
        weeks: 4,
        modules: ['Emotional Intelligence in Marriage', 'Becoming a Suitable Helper', 'Submission, Honor & Leadership Alignment', 'Balancing Calling, Family & Purpose'],
      },
    ],
  },
  {
    id: 'school-7',
    name: 'Communication, Branding & Public Speaking',
    includes: ['Public Speaking Mastery', 'Executive Communication', 'Storytelling & Influence', 'Personal Branding & Visibility Strategy'],
    outcome: 'Leaders who speak with clarity and authority.',
    image: 'podium',
    programmes: [
      {
        title: 'Public Speaking & Presentation Skills',
        weeks: 5,
        modules: ['Voice, Tone & Presence', 'Speech Structuring', 'Storytelling Skills', 'Overcoming Stage Fear', 'Practical Presentations'],
      },
      {
        title: 'Communication Intelligence (CI)',
        weeks: 4,
        modules: ['Communicating with Clarity', 'Managing Countenance & Emotional Delivery', 'Non-Verbal Communication', 'Influence & Persuasion Skills'],
      },
    ],
  },
];

export const flagships = [
  'Her Gaze 12-Week Transformation Program',
  'Gaze Room Mentorship Circle (Monthly Program)',
  'Gaze Leadership Voice (Public Speaking Certification)',
  'Wealth & Kingdom Stewardship Blueprint Masterclass',
  'Purpose Mapping Intensive (Habakkuk 2:2)',
  'Emotional Intelligence Mastery Certification',
];

/* Ordered by length and depth: each tier builds on the one before it. */
export const certifications = [
  { tier: 'Foundational Certificates', length: '1–4 weeks', body: 'Entry-level leadership building blocks' },
  { tier: 'Professional Certificates', length: '4–8 weeks', body: 'Career-ready leadership tools' },
  { tier: 'Executive Certifications', length: '8–12 weeks', body: 'Corporate-standard leadership mastery' },
  { tier: 'MasterTrack Programs', length: '3–6 months', body: 'Deep personal and leadership transformation' },
];

export const teachingMethods = [
  'Live virtual classes',
  'Physical masterclasses',
  'Corporate training & workshops',
  'Group coaching',
  'Assignments & practical application',
  'Field projects',
  'Guest expert sessions',
  'Kingdom alignment sessions',
];

export const graduation = ['Attendance', 'Assignments', 'Final project or assessment', 'Demonstration of competence', 'Code of ethics adherence'];

/* ── Admissions ── */

export const applySteps = [
  'Choose your program',
  'Fill the online application form',
  'Wait for approval',
  'Pay and secure your seat',
  'Begin your GLI transformation journey',
];

export const whoCanApply = [
  'Young professionals',
  'Corporate leaders',
  'Entrepreneurs',
  'Ministry leaders',
  'Women in leadership',
  'Coaches & facilitators',
  'University graduates',
  'Anyone seeking clarity & alignment',
];

export const payments = [
  { method: 'M-Pesa', note: 'Pay from your phone once your place is approved.' },
  { method: 'Bank Transfer', note: 'Our bank details come with your letter of approval.' },
  { method: 'Credit/Debit Card', note: 'Visa and Mastercard.' },
  { method: 'Corporate invoicing', note: 'For organizations sending a team.' },
];

/* ── Corporate ── */

export const corporate = {
  lede: 'GLI delivers values-driven, results-based corporate training that transforms team culture, strengthens communication, and elevates leadership performance.',
  intro: 'GLI provides structured leadership and emotional intelligence training for corporates including:',
  solutions: [
    'Executive Leadership Training',
    'Emotional Intelligence for Teams',
    'Workplace Culture & People Dynamics',
    'Professional Communication Skills',
    'Conflict Resolution & Team Alignment',
  ],
  why: [
    { title: 'Expert facilitators', body: 'Facilitators with expertise in leadership psychology, Kingdom values, and organizational development.' },
    { title: 'Practical frameworks', body: 'Practical frameworks tailored for real-world workplace challenges.' },
    { title: 'Tailored corporate solutions', body: 'Customized training solutions for teams and organizations.' },
    { title: 'Measurable outcomes', body: 'Improved performance, engagement, and culture.' },
    { title: 'Faith-friendly approach (when requested)', body: 'An excellence-driven approach that honors both professionalism and values.' },
  ],
};

/* ── Faculties (22 Oct 2026): the seven Schools sit in Faculty I; the School of Prophetic Intelligence is Faculty II ── */

export const faculties = [
  {
    numeral: 'I',
    name: 'Executive Leadership & Public Discourse',
    focus: 'Communication, Public Speaking, Thought Leadership',
    body: 'The seven Schools of the Institute: leadership and personal mastery, business, emotional intelligence, purpose and faith, coaching, women in leadership, and communication.',
    href: '/institute/programs',
    cta: 'Explore the Schools',
  },
  {
    numeral: 'II',
    name: 'The School of Prophetic Intelligence',
    focus: 'Spiritual Governance, Strategic Discernment, Kingdom Architecture',
    body: 'An executive spiritual incubator for leaders who translate divine foresight into institutions, strategy, and generational frameworks.',
    href: '/institute/prophetic-intelligence',
    cta: 'Enter Faculty II',
  },
] as const;

export const prophetic = {
  name: 'The School of Prophetic Intelligence & Strategic Governance',
  alt: 'The School of Prophetic Architecture',
  tagline: 'Deconstructing Human Limits. Governing through Divine Foresight and Alignment.',
  overview:
    'The School of Prophetic Intelligence at the Gaze Leadership Institute is an executive spiritual incubator designed for high-caliber leaders, entrepreneurs, and visionaries. Grounded in the tradition of kingdom stewardship, structural alignment, and strategic discernment, this program equips leaders to hear, interpret, and translate divine foresight into tangible institutional systems, business strategies, and generational frameworks.',
  modules: [
    {
      title: 'The Artisan’s Anointing & Spiritual Architecture',
      focus: 'Aligning spiritual insight with physical execution and craftsmanship.',
      topics: [
        { title: 'The Bezalel Blueprint', body: 'Translating divine revelation into physical structure, design, and enterprise.' },
        { title: 'Understanding Spiritual Authority', body: 'Operating with integrity, purity, and governance in marketplace spheres.' },
        { title: 'Cognitive Alignment', body: 'Overcoming cognitive dissonance and aligning internal identity with corporate vision.' },
        { title: 'Deconstructing Cultural Models', body: 'Breaking reliance on performance-driven paradigms to enter alignment-based leadership.' },
      ],
    },
    {
      title: 'Prophetic Discernment & Strategic Foresight',
      focus: 'Cultivating acute spiritual perception to navigate complex economic and organizational decisions.',
      topics: [
        { title: 'The Hearing Ear', body: 'Systems of personal silence, intercession, and hearing God cleanly without ego filter.' },
        { title: 'Reading Seasons & Cycles', body: 'Discernment in timing—knowing when to build, when to hold, and when to expand.' },
        { title: 'Pattern Recognition & Market Foresight', body: 'Distinguishing divine direction from market noise and trend-chasing.' },
        { title: 'Guardianship of the Mind', body: 'Preserving executive mental clarity and spiritual health under high-stakes pressure.' },
      ],
    },
    {
      title: 'Kingdom Governance, Order & Wealth Stewardship',
      focus: 'Transitioning from personal breakthrough to enterprise governance and institutional legacy.',
      topics: [
        { title: 'The Architecture of Altars', body: 'Building sustainable prayer protocols and spiritual foundations for families and corporate entities.' },
        { title: 'Kingdom Wealth Mechanics', body: 'Managing capital, asset stewardship, and financial flow with righteous accountability.' },
        { title: 'Ethical Governance & Boardroom Integrity', body: 'Establishing institutional policies reflecting divine justice and order.' },
        { title: 'Territorial & Marketplace Mandates', body: 'How to influence cities, industries, and executive ecosystems.' },
      ],
    },
    {
      title: 'Practical Translation & Execution Sprints',
      focus: 'Turning prophetic revelation into written strategy, enterprise frameworks, and operational systems.',
      topics: [
        { title: 'Translating Revelation into Strategy', body: 'Writing clear corporate briefs, policies, and operational manifestos from divine guidance.' },
        { title: 'Spiritual Warfare in Enterprise', body: 'Shielding your enterprise, household, and health from institutional burnout and spiritual friction.' },
        { title: 'Mentorship & Covenant Networks', body: 'Building accountability circles with fellow kingdom builders.' },
        { title: 'The Capstone Blueprint', body: 'Developing your personal or corporate 10-year Strategic Vision Document.' },
      ],
    },
  ],
  details: [
    { label: 'Format', value: 'Hybrid', note: 'Virtual Executive Sprints via Google Meet, with Quarterly In-Person Intensives.' },
    { label: 'Target audience', value: 'Founders & executives', note: 'Founders, C-Suite Executives, Public Sector Leaders, Authors, and High-Impact Builders.' },
    { label: 'Duration', value: '12 weeks', note: '12-Week Immersion Cohort, or the 6-Month Mentorship Circle Track.' },
  ],
  /* foundational required reading for cohort participants, from the Gaze Press library */
  reading: ['stay-by-design', 'the-artisans-anointing'],
  sectors: ['Business', 'Public Policy', 'Creative Arts', 'Ministry', 'Education'],
  tracks: ['12-Week Immersion Cohort', '6-Month Mentorship Circle Track'],
  /* the client is to publish cohort dates */
  terms: ['The next cohort (dates to be announced)', 'The cohort after', 'Not decided yet'],
};
