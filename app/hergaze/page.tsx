/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { houses } from '@/content/houses';
import { HouseHeader } from '@/components/House/HouseHeader';
import { HouseFooter } from '@/components/House/HouseFooter';
import { Reveal } from '@/components/Reveal/Reveal';

export const metadata: Metadata = {
  title: 'Her Gaze Global',
  description: 'An apex convening house for kingdom-minded summits, executive retreats and cultural milestones. We do not host events. We assemble power.',
};

const house = houses.find((h) => h.id === 'hergaze')!;
const nav = [
  { label: 'The Maison', href: '#maison' },
  { label: 'Convocations', href: '#convocations' },
  { label: 'Take part', href: '#take-part' },
] as const;

/* The client's own Maison Profile (discovery answers, 3 Oct 2026). */
const convocations = [
  {
    name: 'The Singles Kingdom Summit',
    line: 'A foundational convening focused on alignment, identity and the architecture of purpose.',
  },
  {
    name: 'The Place of Waiting',
    line: 'An intimate, high-stakes gathering for navigating transitions and forging internal fortitude.',
  },
  {
    name: 'The Rebuilding Conference',
    line: 'Our flagship international summit: American and Kenyan entrepreneurs, executives and visionaries, converging to build the future.',
    flagship: true,
  },
];

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

export default function HerGazePage() {
  return (
    <div className="bg-her-blush font-her-text text-her-noir">
      <HouseHeader house={house} links={nav} overHero="light" textFont="font-her-text" />
      <main>
        {/* ── Hero ── */}
        <section id="top" className="relative min-h-[100svh] overflow-hidden bg-her-noir text-her-blush">
          <img
            src="/images/founder/muthoni-ngugi-new.webp"
            alt="The founder of Her Gaze Global, in white"
            className="absolute right-0 top-0 h-full w-full object-cover object-[60%_20%] opacity-90 md:w-[48%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#1A1A1A_38%,rgba(26,26,26,0.6)_60%,rgba(26,26,26,0.05)_100%)]" />
          <div data-loader-target className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-center px-5 pb-16 pt-32 md:px-10">
            <p className="font-her-script text-[clamp(34px,3.4vw,58px)] leading-none text-her-magenta">Her Gaze Global</p>
            <h1 className="mt-6 max-w-[13ch] font-her-head text-[clamp(52px,7.6vw,132px)] font-normal leading-[0.96]">
              We do not host events. <em className="text-her-magenta">We assemble power.</em>
            </h1>
            <p className="mt-8 max-w-md text-lg font-light leading-relaxed text-[rgba(241,228,214,0.82)]">
              An apex convening house for kingdom-minded summits, executive retreats and cultural milestones.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 text-[12px] font-medium uppercase tracking-[0.22em]">
              <a href="#take-part" className="bg-her-magenta px-7 py-4 text-white transition-colors hover:bg-her-terracotta">Book a seat</a>
              <a href="#convocations" className="border border-[rgba(241,228,214,0.6)] px-7 py-4 transition-colors hover:border-her-magenta hover:text-her-magenta">The convocations</a>
            </div>
          </div>
        </section>

        {/* ── The Maison ── */}
        <section id="maison" className="px-5 py-28 md:px-10 md:py-36">
          <Reveal className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-[1fr_1.3fr]">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-her-terracotta">The Maison</p>
              <h2 className="mt-4 font-her-head text-[clamp(40px,5vw,88px)] leading-[1]">True impact is never accidental.</h2>
            </div>
            <div className="flex flex-col gap-6 self-end text-lg font-light leading-relaxed">
              <p>
                Operating at the intersection of divine mandate, marketplace authority and deep personal mastery, Her Gaze
                Global creates the rooms where visionary leaders, corporate titans and international pioneers converge.
              </p>
              <p>
                Our platforms are engineered to shift paradigms, forge cross-continental alliances and redefine the standard of
                global influence. It is <span className="font-her-script text-3xl text-her-magenta">masterfully convened</span>.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Convocations ── */}
        <section id="convocations" className="bg-her-noir px-5 py-28 text-her-blush md:px-10 md:py-36">
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-her-magenta">Landmark convocations</p>
              <h2 className="mt-4 max-w-3xl font-her-head text-[clamp(40px,5vw,88px)] leading-[1]">Rare gatherings that bridge nations.</h2>
            </Reveal>
            <div className="mt-16 grid gap-5 md:grid-cols-3">
              {convocations.map((c, i) => (
                <Reveal key={c.name} delay={i * 0.1}>
                  <article
                    className={`flex h-full flex-col justify-between gap-16 p-8 md:p-10 ${c.flagship ? 'bg-her-magenta text-white' : 'border border-[rgba(241,228,214,0.25)]'}`}
                  >
                    <span className="text-[11px] uppercase tracking-[0.3em] opacity-75">{c.flagship ? 'Flagship · International' : `Convocation 0${i + 1}`}</span>
                    <div>
                      <h3 className="font-her-head text-[clamp(28px,2.4vw,40px)] leading-[1.05]">{c.name}</h3>
                      <p className="mt-4 text-sm font-light leading-relaxed opacity-85">{c.line}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-14 flex flex-wrap items-baseline justify-between gap-6 border-t border-[rgba(241,228,214,0.2)] pt-8">
              <p className="font-her-head text-[clamp(28px,3vw,48px)]">KSh 10,000 a seat <span className="text-lg text-[rgba(241,228,214,0.6)]">· about USD 76</span></p>
              <a href="#take-part" className="bg-her-blush px-7 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-her-noir transition-colors hover:bg-her-magenta hover:text-white">Book a seat</a>
            </Reveal>
          </div>
        </section>

        {/* ── Take part ── */}
        <section id="take-part" className="px-5 py-28 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <p className="font-her-script text-[clamp(34px,3vw,52px)] leading-none text-her-magenta">Take your place</p>
              <h2 className="mt-4 max-w-3xl font-her-head text-[clamp(40px,5vw,88px)] leading-[1]">Nine ways into the room.</h2>
            </Reveal>
            <ul className="mt-14 grid gap-px bg-[rgba(26,26,26,0.14)] sm:grid-cols-2 lg:grid-cols-3">
              {actions.map((a, i) => (
                <Reveal key={a} delay={(i % 3) * 0.06} className="bg-her-blush">
                  <li>
                    <a href="/#contact" className="group flex min-h-[150px] flex-col justify-between p-8 transition-colors duration-500 hover:bg-her-noir hover:text-her-blush">
                      <span className="text-[11px] uppercase tracking-[0.3em] text-her-terracotta">0{i + 1}</span>
                      <span className="flex items-end justify-between gap-6 text-xl font-medium">
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
