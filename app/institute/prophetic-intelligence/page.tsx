/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { prophetic } from '@/content/institute';
import { books } from '@/content/library';
import { GliBars, GliContours, GliLabel } from '@/components/Institute/GliBits';
import { PropheticIntakeForm } from '@/components/Institute/GliForms';

export const metadata: Metadata = {
  title: 'The School of Prophetic Intelligence · Gaze Leadership Institute',
  description: `${prophetic.tagline} ${prophetic.overview}`,
};

const reading = prophetic.reading.map((slug) => books.find((b) => b.slug === slug)!);

/**
 * Faculty II of the Institute. Set in the crest's navy and gold rather than the Schools' red, so the faculty reads as
 * its own house within GLI: the serif carries the name, the gold lines run under the modules.
 */
export default function PropheticIntelligence() {
  return (
    <>
      {/* ── hero ── */}
      <section className="gli-speckle relative isolate overflow-hidden px-5 pb-24 pt-[160px] text-white md:px-10 md:pb-32 md:pt-[200px]">
        <GliContours className="absolute inset-x-0 bottom-0 -z-10 h-[70%] w-full opacity-80" lines={30} />
        <div data-loader-target className="mx-auto max-w-[1320px]">
          <GliLabel className="text-gli-gold">Faculty II · Gaze Leadership Institute</GliLabel>
          <h1 data-gli-rise className="mt-8 max-w-[18ch] font-gli-serif text-[clamp(40px,6vw,96px)] font-black leading-[1.04]">
            {prophetic.name}
          </h1>
          <p className="mt-5 font-gli-serif text-[clamp(18px,1.6vw,22px)] italic text-[rgba(255,255,255,0.7)]">Or: {prophetic.alt}</p>
          <p className="mt-12 max-w-[34ch] border-l-4 border-gli-gold pl-6 text-[clamp(20px,2vw,28px)] font-semibold leading-snug">{prophetic.tagline}</p>
          <div className="mt-12 flex flex-wrap gap-3">
            <a href="#intake" className="bg-gli-gold px-7 py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-gli-navy transition-colors hover:bg-white">
              Apply for the next cohort
            </a>
            <a href="#assessment" className="border-2 border-white px-7 py-4 text-[13px] font-bold uppercase tracking-[0.16em] transition-colors hover:bg-white hover:text-gli-navy">
              Reserve an assessment call
            </a>
          </div>
        </div>
      </section>

      {/* ── program overview ── */}
      <section className="bg-white px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <GliBars className="[&>span]:bg-[linear-gradient(90deg,rgba(200,153,47,0.15),#C8992F)]" />
            <h2 data-gli-rise className="mt-6 font-gli-head text-[clamp(48px,5.4vw,88px)] uppercase leading-none text-gli-navy">Program overview</h2>
          </div>
          <p data-gli-ink className="text-[clamp(20px,1.9vw,27px)] font-semibold leading-[1.55] text-gli-navy">{prophetic.overview}</p>
        </div>
      </section>

      {/* ── the four-module curriculum, built storey on storey ── */}
      <section className="relative isolate overflow-hidden bg-gli-mist px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <GliLabel className="text-gli-red">The curriculum architecture</GliLabel>
          <h2 data-gli-rise className="mt-4 font-gli-head text-[clamp(48px,5.4vw,88px)] uppercase leading-none text-gli-navy">Four modules</h2>
          <ol className="mt-16 grid gap-6">
            {prophetic.modules.map((m, i) => (
              <li key={m.title} data-gli-wipe className="grid gap-8 bg-gli-navy p-8 text-white md:grid-cols-[auto_1fr_1.4fr] md:gap-12 md:p-12">
                <span className="font-gli-head text-[clamp(64px,7vw,112px)] leading-none text-gli-gold">0{i + 1}</span>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[rgba(255,255,255,0.6)]">Module {i + 1}</p>
                  <h3 className="mt-3 font-gli-serif text-[clamp(24px,2.4vw,36px)] font-black leading-[1.15]">{m.title}</h3>
                  <p className="mt-5 text-[16px] font-medium leading-relaxed text-[rgba(255,255,255,0.82)]">
                    <span className="font-bold text-gli-gold">Core focus: </span>
                    {m.focus}
                  </p>
                </div>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {m.topics.map((t) => (
                    <li key={t.title} className="border-t border-[rgba(200,153,47,0.6)] pt-3">
                      <p className="text-[16px] font-bold">{t.title}</p>
                      <p className="mt-1 text-[14px] font-medium leading-snug text-[rgba(255,255,255,0.75)]">{t.body}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── program details ── */}
      <section className="bg-white px-5 py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1320px]">
          <h2 data-gli-rise className="font-gli-head text-[clamp(44px,5vw,80px)] uppercase leading-none text-gli-red">Program details</h2>
          <dl className="mt-12 grid gap-5 md:grid-cols-3">
            {prophetic.details.map((d) => (
              <div key={d.label} className="border-t-[6px] border-gli-gold bg-gli-mist p-8">
                <dt className="text-[12px] font-bold uppercase tracking-[0.24em] text-gli-ink">{d.label}</dt>
                <dd className="mt-3 font-gli-head text-[36px] uppercase leading-none text-gli-navy">{d.value}</dd>
                <dd className="mt-4 text-[15px] font-medium leading-relaxed text-gli-ink">{d.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── foundational reading, from Gaze Press ── */}
      <section className="relative isolate overflow-hidden bg-gli-navy px-5 py-24 text-white md:px-10 md:py-28">
        <GliContours className="absolute inset-0 -z-10 h-full w-full opacity-40" />
        <div className="mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <GliLabel className="text-gli-gold">Required reading</GliLabel>
            <h2 data-gli-rise className="mt-4 font-gli-serif text-[clamp(32px,3.6vw,56px)] font-black leading-[1.1]">Foundational texts for every cohort</h2>
            <p className="mt-6 max-w-[42ch] text-[17px] font-medium leading-relaxed text-[rgba(255,255,255,0.8)]">
              Two works by the Founder, published by Gaze Press Global, are required reading for every cohort participant.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-6">
            {reading.map((b) => (
              <li key={b.slug}>
                <Link href={`/press/books/${b.slug}`} className="group block">
                  <div className="flex aspect-[4/5] items-center justify-center overflow-hidden p-5" style={{ background: b.tone }}>
                    {b.poster && <img src={b.poster} alt="" className="max-h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.04]" />}
                  </div>
                  <p className="mt-4 font-gli-serif text-[20px] font-black leading-tight">{b.title}</p>
                  <p className="mt-1 text-[14px] text-[rgba(255,255,255,0.7)]">{b.sub}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── intake ── */}
      <section id="intake" className="scroll-mt-[76px] bg-gli-mist px-5 py-24 md:px-10 md:py-32">
        <span id="assessment" className="block scroll-mt-[76px]" aria-hidden="true" />
        <div className="mx-auto grid max-w-[1320px] gap-16 lg:grid-cols-[0.8fr_1.6fr]">
          <div>
            <GliLabel className="text-gli-red">Intake</GliLabel>
            <h2 data-gli-rise className="mt-4 font-gli-head text-[clamp(48px,5vw,84px)] uppercase leading-none text-gli-navy">Join the next cohort</h2>
            <p className="mt-6 max-w-[36ch] text-[17px] font-medium leading-relaxed text-gli-ink">
              Apply for a place in the cohort, or reserve an assessment call to discuss your vision with the Faculty first.
            </p>
          </div>
          <PropheticIntakeForm />
        </div>
      </section>
    </>
  );
}
