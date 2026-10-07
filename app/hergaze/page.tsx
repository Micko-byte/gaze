/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { houses } from '@/content/houses';
import { HouseFooter } from '@/components/House/HouseFooter';
import { HerGazeBar } from '@/components/HerGaze/HerGazeBar';
import { HerGazeHero } from '@/components/HerGaze/HerGazeHero';
import { Reveal } from '@/components/Reveal/Reveal';

export const metadata: Metadata = {
  title: 'Her Gaze Global',
  description: 'An apex convening house for kingdom-minded summits, executive retreats and cultural milestones. We do not host events. We assemble power.',
};

const house = houses.find((h) => h.id === 'hergaze')!;

/* The client's own Maison Profile (5 Oct 2026). */
const convocations = [
  {
    name: 'The Singles Kingdom Summit',
    line: 'A foundational convening focused on alignment, identity, and the architecture of purpose.',
  },
  {
    name: 'The Place of Waiting',
    line: 'An intimate, high-stakes gathering designed for navigating transitions and forging internal fortitude.',
  },
  {
    name: 'The Rebuilding Conference',
    line: 'Our flagship international summit. A sovereign fusion of elite American and Kenyan entrepreneurs, executives, and visionaries flying across continents to converge, strategize, and build the future.',
    flagship: true,
  },
];

/* Institutional alliances, as the client listed them. Names only until she sends their logos. */
const partners = ['Britam', 'Simple Pay', 'Zuri Springs Real Estate', 'Notify Labs', 'Grace Arena Ministries'];

/* Everything a visitor can do here, as the client listed it. */
const actions = [
  'Read about the work and the women behind it',
  'Apply or register for a programme',
  'Book a seat at a summit or retreat',
  'Enquire about corporate training',
  'Donate or contribute',
  'Nominate someone',
  'Partner or sponsor',
  'Sign up for news and events',
  'Volunteer or mentor',
];

/*
 * The scrapbook under the statement, after Very Work In Progress: stills from her own convenings, set at an angle,
 * with the three convocations pinned among them as cards. Positions are percentages of the collage box.
 */
const collage = [
  { src: '/images/hergaze/panel.jpg', alt: 'A panel on the Her Gaze stage', x: 37, y: 0, w: 26, r: -2 },
  { src: '/images/hergaze/smiles.jpg', alt: 'Women in the audience, laughing', x: 5, y: 20, w: 24, r: 3 },
  { src: '/images/hergaze/podcast.jpg', alt: 'The founder in conversation, holding Stay by Design', x: 70, y: 10, w: 18, r: -4, framed: true },
  { src: '/images/hergaze/speaker.jpg', alt: 'A speaker with a microphone at a Her Gaze convening', x: 31, y: 42, w: 30, r: 1.5, framed: true },
  { src: '/images/hergaze/audience.jpg', alt: 'The audience facing the purple stage', x: 66, y: 60, w: 25, r: 3 },
  { src: '/images/hergaze/launch.jpg', alt: 'A book launch banner at the venue', x: 4, y: 62, w: 22, r: -3 },
];
const cards = [
  { label: 'The Singles Kingdom Summit', x: 9, y: 4, bg: 'bg-her-terracotta text-white', r: -3 },
  { label: 'The Place of Waiting', x: 70, y: 42, bg: 'bg-her-noir text-her-blush', r: 2 },
  { label: 'The Rebuilding Conference', x: 30, y: 86, bg: 'bg-her-magenta text-white', r: -1.5 },
];

const label = 'text-[12px] uppercase tracking-[0.24em]';
/* One sans, set large and regular with tight leading: the Matthieu Givelet way, in the house's own Chillax. */
const big = 'font-her-text font-normal tracking-[-0.035em]';

export default function HerGazePage() {
  return (
    <div className="bg-her-blush font-her-text text-her-noir">
      <HerGazeHero />
      <HerGazeBar />
      <main>
        {/* ── what is Her Gaze Global ── */}
        <section className="px-5 pb-10 pt-28 text-center md:px-10 md:pt-40">
          <Reveal>
            <p className={label}>[ What is Her Gaze Global ]</p>
            <h1 className={`${big} mx-auto mt-8 max-w-[17ch] text-[clamp(44px,6.6vw,112px)] leading-[1.02]`}>
              We do not host events. We{' '}
              <span className="rounded-[6px] bg-her-magenta px-[0.14em] text-white">assemble power</span> in the rooms where{' '}
              <img
                src="/images/hergaze/speaker.jpg"
                alt=""
                className="inline-block h-[0.78em] w-[1.3em] rounded-[6px] object-cover align-[-0.06em]"
              />{' '}
              leaders converge.
            </h1>
            <a href="#maison" data-no-transition className="mt-14 inline-block rounded-full border border-her-noir px-8 py-3.5 text-[12px] uppercase tracking-[0.24em] transition-colors hover:bg-her-noir hover:text-her-blush">
              More on the Maison
            </a>
          </Reveal>
        </section>

        {/* ── the scrapbook ── */}
        <section aria-label="From our convenings" className="px-5 pb-28 md:px-10">
          <div className="relative mx-auto hidden aspect-[16/11] max-w-[1200px] md:block">
            {collage.map((c, i) => (
              <figure
                key={c.src}
                className={`absolute transition-transform duration-700 ease-reveal hover:z-10 hover:scale-[1.03] ${c.framed ? 'bg-white p-3 shadow-[0_24px_50px_-30px_rgba(26,26,26,0.6)] ring-2 ring-her-noir' : 'shadow-[0_24px_50px_-34px_rgba(26,26,26,0.7)]'}`}
                style={{ left: `${c.x}%`, top: `${c.y}%`, width: `${c.w}%`, rotate: `${c.r}deg` }}
              >
                <Reveal delay={i * 0.06} y={40}>
                  <img src={c.src} alt={c.alt} className="w-full" />
                </Reveal>
              </figure>
            ))}
            {cards.map((c) => (
              <a
                key={c.label}
                href="#convocations"
                data-no-transition
                className={`absolute z-[5] flex w-[19%] items-center justify-center px-4 py-6 text-center text-[clamp(16px,1.5vw,22px)] leading-tight tracking-[-0.02em] shadow-[0_18px_40px_-26px_rgba(26,26,26,0.7)] transition-transform duration-500 hover:scale-[1.04] ${c.bg}`}
                style={{ left: `${c.x}%`, top: `${c.y}%`, rotate: `${c.r}deg` }}
              >
                {c.label}
              </a>
            ))}
          </div>
          {/* phones: the same pictures, two by two */}
          <div className="grid grid-cols-2 gap-4 md:hidden">
            {collage.map((c) => (
              <img key={c.src} src={c.src} alt={c.alt} className="aspect-square w-full object-cover" style={{ rotate: `${c.r / 2}deg` }} />
            ))}
          </div>
        </section>

        {/* ── the Maison ── */}
        <section id="maison" className="scroll-mt-[120px] border-t border-[rgba(26,26,26,0.14)] px-5 py-24 md:px-10 md:py-32">
          <Reveal className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-2">
            <p className={label}>[ The Maison ]</p>
            <div>
              <p className={`${big} text-[clamp(26px,2.4vw,38px)] leading-[1.18]`}>
                <span className="mr-10 align-top text-[12px] tracking-normal">01</span>
                Operating at the intersection of divine mandate, marketplace authority, and deep personal mastery, Her Gaze
                Global creates the rooms where visionary leaders, corporate titans, and international pioneers converge.
              </p>
              <p className="mt-8 max-w-xl text-lg font-light leading-relaxed">
                Our platforms are engineered to shift paradigms, forge unbreakable cross-continental alliances, and redefine
                the standard of global influence. For those who dictate the trajectory of industries under a higher standard,
                Her Gaze Global provides the definitive stage. True impact is never accidental; it is{' '}
                <span className="font-her-script text-3xl text-her-magenta">masterfully convened</span>.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── convocations ── */}
        <section id="convocations" className="scroll-mt-[120px] bg-her-noir px-5 py-24 text-her-blush md:px-10 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2 className={`${big} text-[clamp(44px,6vw,104px)] leading-[0.98]`}>Landmark convocations</h2>
              <p className="max-w-sm text-base font-light leading-relaxed text-[rgba(241,228,214,0.75)]">
                Rare, high-impact gatherings that bridge nations and anchor spiritual authority in the marketplace.
              </p>
            </Reveal>
            <ol className="mt-16 border-t border-[rgba(241,228,214,0.25)]">
              {convocations.map((c, i) => (
                <Reveal key={c.name} delay={i * 0.08}>
                  <li className="grid gap-4 border-b border-[rgba(241,228,214,0.25)] py-10 md:grid-cols-[5rem_1fr_1fr] md:items-baseline">
                    <span className="text-[12px]">0{i + 1}</span>
                    <h3 className={`${big} text-[clamp(30px,3.2vw,56px)] leading-[1.02]`}>
                      {c.name}
                      {c.flagship && <span className="ml-3 rounded-[4px] bg-her-magenta px-2 py-1 align-middle text-[11px] uppercase tracking-[0.2em] text-white">Flagship</span>}
                    </h3>
                    <p className="max-w-md text-base font-light leading-relaxed text-[rgba(241,228,214,0.8)]">{c.line}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal className="mt-14 flex flex-wrap items-baseline justify-between gap-6">
              <p className={`${big} text-[clamp(28px,3vw,48px)]`}>KSh 10,000 a seat <span className="text-lg text-[rgba(241,228,214,0.6)]">· about USD 76</span></p>
              <a href="#take-part" data-no-transition className="rounded-full bg-her-blush px-8 py-3.5 text-[12px] uppercase tracking-[0.24em] text-her-noir transition-colors hover:bg-her-magenta hover:text-white">Book a seat</a>
            </Reveal>
          </div>
        </section>

        {/* ── partners ── */}
        <section id="partners" className="scroll-mt-[120px] px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="grid gap-10 md:grid-cols-2">
              <p className={label}>[ Institutional alliances &amp; partners ]</p>
              <div>
                <h2 className={`${big} text-[clamp(36px,4.4vw,72px)] leading-[1.02]`}>True magnitude is sustained by alignment.</h2>
                <p className="mt-8 max-w-xl text-lg font-light leading-relaxed">
                  Her Gaze Global has proudly convened, collaborated, and built alongside elite corporate and institutional
                  partners who share an unyielding commitment to excellence, integrity, and future-focused execution.
                </p>
              </div>
            </Reveal>
            <ul className="mt-16 grid border-t border-[rgba(26,26,26,0.14)] sm:grid-cols-2 lg:grid-cols-5">
              {partners.map((p, i) => (
                <Reveal key={p} delay={i * 0.06}>
                  <li className={`${big} flex h-full min-h-[140px] items-center border-b border-[rgba(26,26,26,0.14)] py-8 text-[clamp(22px,1.8vw,30px)] leading-[1.1] lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0`}>
                    {p}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ── take part ── */}
        <section id="take-part" className="scroll-mt-[120px] border-t border-[rgba(26,26,26,0.14)] px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="grid gap-10 md:grid-cols-2">
              <p className={label}>[ Take your place ]</p>
              <h2 className={`${big} text-[clamp(36px,4.4vw,72px)] leading-[1.02]`}>Nine ways into the room.</h2>
            </Reveal>
            <ul className="mt-14 grid gap-px bg-[rgba(26,26,26,0.14)] sm:grid-cols-2 lg:grid-cols-3">
              {actions.map((a, i) => (
                <Reveal key={a} delay={(i % 3) * 0.06} className="bg-her-blush">
                  <li>
                    <a href="/#contact" className="group flex min-h-[150px] flex-col justify-between p-8 transition-colors duration-500 hover:bg-her-noir hover:text-her-blush">
                      <span className="text-[12px] text-her-terracotta">0{i + 1}</span>
                      <span className="flex items-end justify-between gap-6 text-xl tracking-[-0.02em]">
                        {a}
                        <span className="text-her-magenta transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">→</span>
                      </span>
                    </a>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <HouseFooter house={house} textFont="font-her-text" />
    </div>
  );
}
