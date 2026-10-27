/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { houses } from '@/content/houses';
import { manorCities, manorCredits, manorExperience, manorIntro, manorPillars } from '@/content/manor';
import { HouseHeader } from '@/components/House/HouseHeader';
import { HouseFooter } from '@/components/House/HouseFooter';
import { HouseLogo } from '@/components/Logo/HouseLogo';
import { ManorMotion } from '@/components/Manor/ManorMotion';

export const metadata: Metadata = {
  title: 'The Gaze Manor',
  description: `${manorIntro.sub}. ${manorIntro.series}`,
};

const house = houses.find((h) => h.id === 'manor')!;
const nav = [
  { label: 'The series', href: '#series' },
  { label: 'Each episode', href: '#experience' },
  { label: 'Credits', href: '#credits' },
] as const;

const photo = (name: string) => `/images/furnishings/${name}.jpg`;
const ROMAN = ['I', 'II', 'III', 'IV'];

function Film({ name, className = '' }: { name: string; className?: string }) {
  return (
    <video autoPlay muted loop playsInline preload="metadata" poster={`/video/manor/${name}.jpg`} className={`h-full w-full object-cover ${className}`}>
      <source src={`/video/manor/${name}.mp4`} type="video/mp4" />
    </video>
  );
}

export default function ManorPage() {
  return (
    <div className="bg-manor-stone font-manor-text text-manor-ink">
      <HouseHeader house={house} links={nav} overHero="light" textFont="font-manor-text" heroGround="#111111" />
      <main>
        {/* ── hero: the mark draws itself; an arched window opens on a residence ── */}
        <section id="top" className="relative overflow-hidden bg-manor-ink px-5 pb-16 pt-32 text-manor-stone md:px-10 md:pb-24 md:pt-40">
          <div className="mx-auto grid max-w-[1440px] items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div data-loader-target>
              <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-manor-bronze">{manorCredits.series}</p>
              <HouseLogo
                id="manor"
                tone="mono"
                knock="#111111"
                draw
                title="The Gaze Manor"
                className="mt-10 w-[min(360px,70vw)] text-manor-stone"
                style={{ '--draw-delay': '0.4s', '--draw-span': '1.2s', '--draw-width': '3' } as CSSProperties}
              />
              <h1 data-manor-rise className="mt-12 max-w-[16ch] font-manor-head text-[clamp(40px,5.4vw,88px)] font-light leading-[1.02]">
                Architecture, Psychology, and <em className="text-manor-bronze">International Luxury Living</em>
              </h1>
            </div>
            <div data-manor-arch className="relative mx-auto aspect-[9/14] w-full max-w-[460px] overflow-hidden rounded-t-full">
              <Film name="staircase" />
              <div className="absolute inset-0 rounded-t-full ring-1 ring-inset ring-[rgba(238,235,230,0.25)]" />
            </div>
          </div>

          {/* the cities the series travels to, drifting past */}
          <div aria-hidden="true" className="mt-20 overflow-hidden border-y border-[rgba(238,235,230,0.15)] py-5">
            <div className="manor-drift flex w-max animate-[manordrift_38s_linear_infinite] gap-12 whitespace-nowrap font-manor-head text-[clamp(28px,3vw,44px)] font-light italic text-[rgba(238,235,230,0.75)]">
              {[0, 1].map((k) =>
                [...manorCities, 'Europe', 'North America', 'Africa'].map((c) => (
                  <span key={`${k}-${c}`} className="flex items-center gap-12">
                    {c}
                    <span className="h-1.5 w-1.5 rounded-full bg-manor-bronze" />
                  </span>
                )),
              )}
            </div>
          </div>
        </section>

        {/* ── the premise ── */}
        <section className="px-5 py-28 md:px-10 md:py-40">
          <div className="mx-auto max-w-[1200px]">
            <h2 data-manor-rise className="font-manor-head text-[clamp(52px,8vw,140px)] font-light leading-[0.98]">
              {manorIntro.opening}
            </h2>
            <p data-manor-ink className="ml-auto mt-14 max-w-[40ch] text-[clamp(19px,1.7vw,24px)] font-light leading-[1.6]">
              {manorIntro.premise}
            </p>
          </div>
        </section>

        {/* ── the series ── */}
        <section id="series" className="scroll-mt-20 bg-white px-5 py-28 md:px-10 md:py-36">
          <div className="mx-auto grid max-w-[1440px] items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
            <div className="grid grid-cols-2 gap-4">
              <div data-manor-reveal className="aspect-[3/4] overflow-hidden">
                <img src={photo('bed-bolster')} alt="A bedroom suite with a bespoke upholstered bed" className="h-full w-full object-cover" />
              </div>
              <div data-manor-reveal className="mt-24 aspect-[3/4] overflow-hidden">
                <img src={photo('sofa-olive-room')} alt="A living room with a low olive sofa under a timber ceiling" className="h-full w-full object-cover" />
              </div>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-manor-bronze">The series</p>
              <p className="mt-8 font-manor-head text-[clamp(28px,2.6vw,42px)] font-light leading-[1.3]">{manorIntro.series}</p>
            </div>
          </div>
        </section>

        {/* ── where architectural prestige meets cognitive science ── */}
        <section className="px-5 py-28 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
              <h2 data-manor-rise className="font-manor-head text-[clamp(44px,5.4vw,92px)] font-light leading-[1]">{manorPillars.heading}</h2>
              <p className="max-w-[42ch] text-[18px] font-light leading-relaxed text-manor-umber lg:justify-self-end">{manorPillars.lede}</p>
            </div>
            <ul className="mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
              {manorPillars.items.map((p, i) => (
                <li key={p.title} className={i === 1 ? 'md:mt-24' : ''}>
                  <div data-manor-reveal className="aspect-[4/5] overflow-hidden">
                    <img src={photo(p.image)} alt="" className="h-full w-full object-cover" />
                  </div>
                  <h3 className="mt-6 font-manor-head text-[clamp(26px,2.2vw,34px)] leading-tight">{p.title}</h3>
                  <p className="mt-3 text-[16px] font-light leading-relaxed text-manor-umber">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── the experience: the four movements of an episode, passing sideways ── */}
        <section id="experience" data-manor-acts className="scroll-mt-20 overflow-hidden bg-manor-ink text-manor-stone">
          <div data-manor-track className="flex flex-col gap-16 px-5 py-24 md:px-10 lg:h-[100svh] lg:w-max lg:flex-row lg:items-center lg:gap-[6vw] lg:py-0 lg:pl-[6vw] lg:pr-[10vw]">
            <div className="lg:w-[34vw] lg:shrink-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-manor-bronze">The experience</p>
              <h2 className="mt-6 font-manor-head text-[clamp(48px,6vw,104px)] font-light leading-[0.98]">Every episode, in four movements</h2>
            </div>
            {manorExperience.map((a, i) => (
              <article key={a.title} className="grid gap-8 lg:w-[56vw] lg:shrink-0 lg:grid-cols-[0.8fr_1fr] lg:items-center">
                <div className="relative aspect-[9/14] max-h-[72svh] overflow-hidden rounded-t-full">
                  {'video' in a.media ? <Film name={a.media.video} /> : <img src={photo(a.media.image)} alt="" className="h-full w-full object-cover" />}
                </div>
                <div>
                  <span className="font-manor-head text-[clamp(64px,7vw,120px)] font-light italic leading-none text-manor-bronze">{ROMAN[i]}</span>
                  <h3 className="mt-4 font-manor-head text-[clamp(32px,3vw,52px)] leading-[1.05]">{a.title}</h3>
                  <p className="mt-5 max-w-[34ch] text-[17px] font-light leading-relaxed text-[rgba(238,235,230,0.78)]">{a.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── the credits roll ── */}
        <section id="credits" className="scroll-mt-20 bg-manor-ink px-5 pb-36 pt-16 text-center text-manor-stone md:px-10 md:pb-48">
          <div data-manor-credits className="mx-auto flex max-w-[900px] flex-col items-center gap-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-manor-bronze">{manorCredits.series}</p>
            <p className="font-manor-head text-[22px] font-light italic text-[rgba(238,235,230,0.7)]">powered by</p>
            <p className="font-manor-head text-[clamp(40px,5vw,80px)] leading-none">{manorCredits.poweredBy}</p>
            <span className="h-14 w-px bg-manor-bronze" />
            <p className="max-w-[30ch] font-manor-head text-[22px] font-light italic text-[rgba(238,235,230,0.7)]">{manorCredits.featuring}</p>
            <Link href="/furnishings" className="font-manor-head text-[clamp(36px,4.4vw,72px)] leading-[1.05] underline decoration-[rgba(163,139,103,0.6)] decoration-1 underline-offset-[12px] transition-colors hover:text-manor-bronze">
              {manorCredits.maker}
            </Link>
          </div>
        </section>

        {/* ── enquiries ── */}
        <section className="px-5 py-24 md:px-10">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 border-t border-manor-ink pt-10 md:flex-row md:items-end">
            <h2 className="max-w-[20ch] font-manor-head text-[clamp(36px,4vw,64px)] font-light leading-[1.05]">
              A residence for the series, or a partnership in it?
            </h2>
            <Link href="/#contact" className="self-start rounded-full bg-manor-ink px-8 py-4 text-[12px] font-medium uppercase tracking-[0.24em] text-manor-stone transition-colors hover:bg-manor-bronze md:self-auto">
              Write to the producers
            </Link>
          </div>
        </section>
      </main>
      <HouseFooter house={house} textFont="font-manor-text" />
      <ManorMotion />
    </div>
  );
}
