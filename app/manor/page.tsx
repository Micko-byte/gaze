/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { houses } from '@/content/houses';
import {
  manorAbout,
  manorCities,
  manorCommission,
  manorCommitment,
  manorCredits,
  manorExperience,
  manorHero,
  manorIntro,
  manorMenu,
  manorPillars,
  manorWings,
  type ManorWing,
} from '@/content/manor';
import { HouseHeader } from '@/components/House/HouseHeader';
import { HouseFooter } from '@/components/House/HouseFooter';
import { HouseLogo } from '@/components/Logo/HouseLogo';
import { ManorMotion } from '@/components/Manor/ManorMotion';

export const metadata: Metadata = {
  title: 'Gaze Manor',
  description: `${manorHero.tagline}. ${manorHero.subHeader}.`,
};

const house = houses.find((h) => h.id === 'manor')!;
const nav = [
  { label: 'About', href: '#about' },
  { label: 'Atelier', href: '#atelier' },
  { label: 'Landscape', href: '#landscape' },
  { label: 'Media', href: '#media' },
  { label: 'Commissions', href: '#commission' },
] as const;

const photo = (name: string) => `/images/furnishings/${name}.jpg`;
const ROMAN = ['I', 'II', 'III', 'IV'];
const eyebrow = 'text-[11px] font-medium uppercase tracking-[0.42em] text-manor-bronze';

function Film({ src, poster, className = '' }: { src: string; poster: string; className?: string }) {
  return (
    <video autoPlay muted loop playsInline preload="metadata" poster={poster} className={`h-full w-full object-cover ${className}`}>
      <source src={src} type="video/mp4" />
    </video>
  );
}

const manorFilm = (name: string) => ({ src: `/video/manor/${name}.mp4`, poster: `/video/manor/${name}.jpg` });

/** A wing's opening: its numeral and name held at the left, her text, services and calls at the right. */
function WingOpening({ wing, dark = false }: { wing: ManorWing; dark?: boolean }) {
  const soft = dark ? 'text-[rgba(238,235,230,0.78)]' : 'text-manor-umber';
  const rule = dark ? 'border-[rgba(238,235,230,0.2)]' : 'border-[rgba(17,17,17,0.15)]';
  return (
    <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className={eyebrow}>Wing {wing.numeral}</p>
        <h2 data-manor-rise className="mt-6 font-manor-head text-[clamp(44px,5.4vw,92px)] font-light leading-[1]">
          {wing.name}
        </h2>
        <p className={`mt-6 text-[13px] uppercase tracking-[0.2em] ${soft}`}>{wing.subHeader}</p>
      </div>
      <div>
        <h3 className="font-manor-head text-[clamp(30px,2.8vw,46px)] italic leading-[1.1] text-manor-bronze">{wing.headline}</h3>
        <div className={`mt-8 grid max-w-[60ch] gap-5 text-[18px] font-light leading-[1.7] ${soft}`}>
          {wing.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <dl className={`mt-12 border-t ${rule}`}>
          {wing.services.map((s) => (
            <div key={s.title} className={`grid gap-2 border-b ${rule} py-6 md:grid-cols-[0.9fr_1.1fr] md:gap-8`}>
              <dt className="font-manor-head text-[clamp(22px,1.8vw,28px)] leading-tight">{s.title}</dt>
              {s.body && <dd className={`text-[16px] font-light leading-relaxed ${soft}`}>{s.body}</dd>}
            </div>
          ))}
        </dl>
        <div className="mt-10 flex flex-wrap gap-3">
          {wing.ctas.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              data-no-transition
              className={`rounded-full px-7 py-4 text-[11px] font-medium uppercase tracking-[0.24em] transition-colors ${
                i === 0
                  ? dark
                    ? 'bg-manor-stone text-manor-ink hover:bg-manor-bronze'
                    : 'bg-manor-ink text-manor-stone hover:bg-manor-bronze'
                  : dark
                    ? 'ring-1 ring-[rgba(238,235,230,0.5)] hover:bg-manor-stone hover:text-manor-ink'
                    : 'ring-1 ring-manor-ink hover:bg-manor-ink hover:text-manor-stone'
              }`}
            >
              {c.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

const [atelier, landscape, media] = manorWings;

export default function ManorPage() {
  return (
    <div className="bg-manor-stone font-manor-text text-manor-ink">
      <HouseHeader house={house} links={nav} overHero="light" textFont="font-manor-text" heroGround="#111111" />
      <main>
        {/* ── hero: the mark draws itself; an arched window opens on a residence ── */}
        <section id="top" className="relative overflow-hidden bg-manor-ink px-5 pb-20 pt-32 text-manor-stone md:px-10 md:pb-28 md:pt-40">
          <div className="mx-auto grid max-w-[1440px] items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div data-loader-target>
              <p className={eyebrow}>{manorHero.subHeader}</p>
              <HouseLogo
                id="manor"
                tone="mono"
                knock="#111111"
                draw
                title="Gaze Manor"
                className="mt-10 w-[min(320px,64vw)] text-manor-stone"
                style={{ '--draw-delay': '0.4s', '--draw-span': '1.2s', '--draw-width': '3' } as CSSProperties}
              />
              <p className="mt-8 font-manor-head text-[clamp(22px,2vw,30px)] font-light italic text-[rgba(238,235,230,0.75)]">{manorHero.tagline}</p>
              <h1 data-manor-rise className="mt-6 max-w-[18ch] font-manor-head text-[clamp(40px,5vw,84px)] font-light leading-[1.02]">
                {manorHero.headline}
              </h1>
              <p className="mt-8 max-w-[56ch] text-[17px] font-light leading-[1.7] text-[rgba(238,235,230,0.78)]">{manorHero.body}</p>
              <p className="mt-5 max-w-[56ch] font-manor-head text-[22px] italic text-manor-bronze">{manorHero.coda}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                {manorHero.ctas.map((c, i) => (
                  <a
                    key={c.label}
                    href={c.href}
                    data-no-transition
                    className={`rounded-full px-7 py-4 text-[11px] font-medium uppercase tracking-[0.24em] transition-colors ${i === 0 ? 'bg-manor-stone text-manor-ink hover:bg-manor-bronze' : 'ring-1 ring-[rgba(238,235,230,0.5)] hover:bg-manor-stone hover:text-manor-ink'}`}
                  >
                    {c.label}
                  </a>
                ))}
              </div>
            </div>
            <div data-manor-arch className="relative mx-auto aspect-[9/14] w-full max-w-[460px] overflow-hidden rounded-t-full">
              <Film {...manorFilm('staircase')} />
              <div className="absolute inset-0 rounded-t-full ring-1 ring-inset ring-[rgba(238,235,230,0.25)]" />
            </div>
          </div>
        </section>

        {/* ── about, and her menu of the house ── */}
        <section id="about" className="scroll-mt-20 px-5 py-28 md:px-10 md:py-36">
          <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className={eyebrow}>About Gaze Manor</p>
              <h2 data-manor-rise className="mt-6 font-manor-head text-[clamp(44px,5.4vw,92px)] font-light leading-[1]">{manorAbout.title}</h2>
              <div className="mt-10 grid max-w-[52ch] gap-5 text-[clamp(18px,1.5vw,21px)] font-light leading-[1.65]">
                {manorAbout.body.map((p) => (
                  <p key={p} data-manor-ink>{p}</p>
                ))}
              </div>
            </div>
            <nav aria-label="Gaze Manor" className="lg:pt-16">
              <p className={eyebrow}>The three wings of Gaze Manor</p>
              <ol className="mt-6 border-t border-manor-ink">
                {manorMenu.map((item) => (
                  <li key={item.label} className="border-b border-[rgba(17,17,17,0.15)] py-6">
                    <a href={item.href} data-no-transition className="group flex items-baseline justify-between gap-6 font-manor-head text-[clamp(24px,2.2vw,34px)] leading-tight transition-colors hover:text-manor-bronze">
                      {item.label}
                      <span aria-hidden="true" className="text-base transition-transform duration-500 group-hover:translate-x-1">→</span>
                    </a>
                    {'line' in item && <p className="mt-2 text-[15px] font-light text-manor-umber">{item.line}</p>}
                    {item.items.length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[12px] uppercase tracking-[0.16em] text-manor-umber">
                        {item.items.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </section>

        {/* ── wing I: the architectural atelier ── */}
        <section id="atelier" className="scroll-mt-20 bg-white px-5 py-28 md:px-10 md:py-36">
          <WingOpening wing={atelier} />
          <div id="atelier-works" className="mx-auto mt-24 grid max-w-[1440px] scroll-mt-24 gap-4 md:grid-cols-12">
            {atelier.images!.map((img, i) => (
              <div
                key={img.src}
                data-manor-reveal
                className={`overflow-hidden ${['aspect-[4/5] md:col-span-7', 'aspect-[4/5] md:col-span-5 md:mt-24', 'aspect-[4/5] md:col-span-5', 'aspect-[4/5] md:col-span-7 md:mt-24'][i]}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </section>

        {/* ── wing II: landscape architecture & spatial design ── */}
        <section id="landscape" className="scroll-mt-20 px-5 py-28 md:px-10 md:py-36">
          <WingOpening wing={landscape} />
          <div id="landscape-works" className="mx-auto mt-24 grid max-w-[1440px] scroll-mt-24 gap-4 md:grid-cols-3">
            <div data-manor-reveal className="aspect-[9/14] overflow-hidden rounded-t-full md:row-span-2 md:aspect-auto">
              <Film src="/video/furnishings/outdoor-garden.mp4" poster="/video/furnishings/outdoor-garden.jpg" />
            </div>
            {landscape.images!.map((img) => (
              <div key={img.src} data-manor-reveal className="aspect-[3/4] overflow-hidden">
                <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </section>

        {/* ── wing III: media & broadcast, and the series ── */}
        <section id="media" className="scroll-mt-20 bg-manor-ink px-5 py-28 text-manor-stone md:px-10 md:py-36">
          <WingOpening wing={media} dark />

          {/* the cities the series travels to, drifting past */}
          <div aria-hidden="true" className="mt-24 overflow-hidden border-y border-[rgba(238,235,230,0.15)] py-5">
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
            <p className={eyebrow}>{manorCredits.series}</p>
            <h2 data-manor-rise className="mt-8 font-manor-head text-[clamp(52px,8vw,140px)] font-light leading-[0.98]">
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
              <p className={eyebrow}>The series</p>
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
              <p className={eyebrow}>The experience</p>
              <h2 className="mt-6 font-manor-head text-[clamp(48px,6vw,104px)] font-light leading-[0.98]">Every episode, in four movements</h2>
            </div>
            {manorExperience.map((a, i) => (
              <article key={a.title} className="grid gap-8 lg:w-[56vw] lg:shrink-0 lg:grid-cols-[0.8fr_1fr] lg:items-center">
                <div className="relative aspect-[9/14] max-h-[72svh] overflow-hidden rounded-t-full">
                  {'video' in a.media ? <Film {...manorFilm(a.media.video)} /> : <img src={photo(a.media.image)} alt="" className="h-full w-full object-cover" />}
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
            <p className={eyebrow}>{manorCredits.series}</p>
            <p className="font-manor-head text-[22px] font-light italic text-[rgba(238,235,230,0.7)]">powered by</p>
            <p className="font-manor-head text-[clamp(40px,5vw,80px)] leading-none">{manorCredits.poweredBy}</p>
            <span className="h-14 w-px bg-manor-bronze" />
            <p className="max-w-[30ch] font-manor-head text-[22px] font-light italic text-[rgba(238,235,230,0.7)]">{manorCredits.featuring}</p>
            <Link href="/furnishings" className="font-manor-head text-[clamp(36px,4.4vw,72px)] leading-[1.05] underline decoration-[rgba(163,139,103,0.6)] decoration-1 underline-offset-[12px] transition-colors hover:text-manor-bronze">
              {manorCredits.maker}
            </Link>
          </div>
        </section>

        {/* ── the commitment ── */}
        <section className="px-5 py-28 md:px-10 md:py-40">
          <figure className="mx-auto max-w-[1100px] text-center">
            <p className={eyebrow}>{manorCommitment.title}</p>
            <blockquote data-manor-ink className="mt-10 font-manor-head text-[clamp(30px,3.4vw,56px)] font-light italic leading-[1.25]">
              “{manorCommitment.quote}”
            </blockquote>
            <figcaption className="mt-10">
              <span className="block text-[13px] font-medium uppercase tracking-[0.3em]">— {manorCommitment.name}</span>
              <span className="mt-2 block text-[14px] font-light text-manor-umber">{manorCommitment.role}</span>
            </figcaption>
          </figure>
        </section>

        {/* ── commission an estate ── */}
        <section id="commission" className="scroll-mt-20 bg-manor-ink px-5 py-24 text-manor-stone md:px-10 md:py-32">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <p className={eyebrow}>Private Commissions &amp; Inquiries</p>
              <h2 className="mt-6 font-manor-head text-[clamp(48px,6vw,104px)] font-light leading-[0.98]">{manorCommission.title}</h2>
              <p className="mt-6 max-w-[52ch] text-[18px] font-light leading-relaxed text-[rgba(238,235,230,0.78)]">{manorCommission.body}</p>
              <p className="mt-6 text-[14px] text-[rgba(238,235,230,0.6)]">
                Building from abroad?{' '}
                <Link href="/furnishings/international" className="underline decoration-[rgba(163,139,103,0.6)] underline-offset-4 hover:text-manor-bronze">
                  The Worldwide Atelier
                </Link>
              </p>
            </div>
            <Link href={manorCommission.cta.href} className="self-start rounded-full bg-manor-stone px-8 py-4 text-[12px] font-medium uppercase tracking-[0.24em] text-manor-ink transition-colors hover:bg-manor-bronze lg:self-auto">
              {manorCommission.cta.label}
            </Link>
          </div>
        </section>
      </main>
      <HouseFooter house={house} textFont="font-manor-text" />
      <ManorMotion />
    </div>
  );
}
