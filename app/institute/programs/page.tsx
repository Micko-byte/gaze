/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { certifications, flagships, graduation, schools, teachingMethods } from '@/content/institute';
import { GliBars, GliButton, GliCircle, GliContours, GliLabel } from '@/components/Institute/GliBits';

export const metadata: Metadata = {
  title: 'Schools & Programs · Gaze Leadership Institute',
  description: 'Seven Schools structure the GLI curriculum: leadership, business, emotional intelligence, purpose and faith, coaching, women in leadership, and communication.',
};

export default function InstitutePrograms() {
  return (
    <>
      {/* ── Hero: "Our Schools & Programs", with the seven Schools as the brand book's programme-structure cards ── */}
      <section className="relative isolate overflow-hidden bg-white px-5 pb-20 pt-[160px] md:px-10 md:pt-[200px]">
        <GliContours className="absolute inset-x-0 top-[112px] -z-10 h-[60%] w-full opacity-60" />
        <div className="mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div data-loader-target>
            <h1 data-gli-rise className="font-gli-head text-[clamp(64px,9vw,150px)] uppercase leading-[0.95] text-gli-navy">
              Our Schools <span className="text-gli-red">&amp;</span> Programs
            </h1>
            <p className="mt-8 max-w-[40ch] text-[clamp(18px,1.6vw,22px)] font-semibold italic leading-relaxed text-gli-ink">
              GLI offers an integrated curriculum built around seven Schools that shape leaders holistically.
            </p>
          </div>
          <GliCircle src="campus-circle" alt="A sandstone university hall" className="mx-auto w-full max-w-[460px] border-[12px] border-gli-navy" />
        </div>
      </section>

      <nav aria-label="The seven Schools" className="gli-speckle px-5 py-16 md:px-10">
        <div className="mx-auto max-w-[1320px]">
          <h2 className="text-center font-gli-head text-[clamp(36px,3.6vw,56px)] uppercase text-white">Program structure</h2>
          <p className="mt-2 text-center text-[16px] font-semibold text-[rgba(255,255,255,0.8)]">Short courses, professional certifications, and executive programs.</p>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {schools.map((s, i) => (
              <li key={s.id}>
                <Link
                  href={`#${s.id}`}
                  data-no-transition
                  className="flex h-full min-h-[120px] flex-col justify-center rounded-[18px] bg-white px-6 py-5 text-center text-[17px] font-bold leading-snug text-gli-red transition-colors hover:bg-gli-red hover:text-white"
                >
                  <span className="text-[12px] uppercase tracking-[0.22em] text-gli-navy">School {i + 1}</span>
                  <span className="mt-2">{s.name}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#certifications"
                data-no-transition
                className="flex h-full min-h-[120px] flex-col justify-center rounded-[18px] border-2 border-white px-6 py-5 text-center text-[17px] font-bold leading-snug text-white transition-colors hover:bg-white hover:text-gli-navy"
              >
                <span className="text-[12px] uppercase tracking-[0.22em]">And</span>
                <span className="mt-2">Certification paths</span>
              </Link>
            </li>
          </ol>
        </div>
      </nav>

      {/* ── One chapter per School: the brand book's track opener, then each programme's card ── */}
      {schools.map((s, i) => (
        <section key={s.id} id={s.id} className="scroll-mt-[76px]">
          <div className="relative isolate flex min-h-[440px] items-center overflow-hidden bg-[#111]">
            <img src={`/images/institute/${s.image}.jpg`} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-55 grayscale-[35%]" />
            <GliBars className="absolute right-6 top-8 md:right-12" />
            <div
              data-gli-wipe
              className="mx-5 my-16 max-w-[860px] flex-1 bg-[linear-gradient(90deg,#DC0E20_0%,#B00B1E_45%,rgba(20,0,6,0.92)_100%)] px-6 py-10 text-white md:mx-10 md:px-14 md:py-12"
            >
              <p className="text-[clamp(28px,3vw,44px)] font-bold uppercase leading-none tracking-[-0.04em]">School {i + 1}</p>
              <h2 className="mt-3 text-[clamp(30px,4.6vw,72px)] font-bold uppercase leading-[0.98] tracking-[-0.045em]">{s.name}</h2>
            </div>
          </div>

          <div className="gli-speckle px-5 py-20 text-white md:px-10 md:py-24">
            <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[0.8fr_2fr]">
              <div>
                <GliLabel className="text-gli-red">Programs include</GliLabel>
                <ul className="mt-6 grid gap-3">
                  {s.includes.map((p) => (
                    <li key={p} className="flex gap-3 text-[17px] font-semibold leading-snug">
                      <span aria-hidden="true" className="mt-1.5 h-3 w-3 shrink-0 bg-gli-red" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 bg-gli-red px-6 py-5">
                  <p className="text-[12px] font-bold uppercase tracking-[0.24em]">Outcome</p>
                  <p className="mt-2 text-[18px] font-bold leading-snug">{s.outcome}</p>
                </div>
              </div>
              <ul className={`grid gap-5 ${s.programmes.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                {s.programmes.map((p) => (
                  <li key={p.title} className="flex flex-col bg-[linear-gradient(160deg,#DC0E20_0%,#7A0C2A_48%,#0A1550_100%)] p-7">
                    <h3 className="text-[22px] font-bold leading-[1.1] tracking-[-0.02em]">{p.title}</h3>
                    <p className="mt-4 self-start bg-white px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-gli-navy">{p.weeks} weeks</p>
                    <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.22em] text-[rgba(255,255,255,0.75)]">Modules</p>
                    <ul className="mt-3 grid gap-2 text-[15px] font-medium leading-snug">
                      {p.modules.map((m) => (
                        <li key={m} className="flex gap-2">
                          <span aria-hidden="true">·</span>
                          {m}
                        </li>
                      ))}
                    </ul>
                    {p.outcome && <p className="mt-auto pt-6 text-[14px] font-bold leading-snug">Outcome: {p.outcome}</p>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      {/* ── Flagship programmes ── */}
      <section className="relative isolate overflow-hidden bg-white px-5 py-24 md:px-10 md:py-32">
        <GliContours className="absolute inset-y-0 left-0 -z-10 h-full w-2/3 opacity-60" />
        <div className="mx-auto grid max-w-[1320px] items-center gap-16 lg:grid-cols-2">
          <div className="relative mx-auto h-[460px] w-full max-w-[520px]">
            <img src="/images/institute/study.jpg" alt="Notes and a tablet on a library desk" className="absolute right-0 top-0 w-[72%] rounded-[16px] object-cover shadow-[0_30px_50px_-30px_rgba(0,11,61,0.6)]" />
            <img src="/images/institute/reading-room.jpg" alt="A reading room" className="absolute bottom-0 left-0 w-[66%] rounded-[16px] object-cover shadow-[0_30px_50px_-30px_rgba(0,11,61,0.6)]" />
          </div>
          <div>
            <div data-gli-wipe className="inline-block bg-gli-red py-5 pl-14 pr-10 text-white [clip-path:polygon(9%_0,100%_0,100%_100%,0_100%)] md:pl-20">
              <h2 className="font-gli-head text-[clamp(40px,4.6vw,76px)] uppercase leading-none">GLI flagship programs</h2>
            </div>
            <ul className="mt-10 grid gap-4">
              {flagships.map((f) => (
                <li key={f} className="flex gap-4 text-[19px] font-bold leading-snug text-gli-navy">
                  <span aria-hidden="true" className="mt-2 h-3 w-3 shrink-0 bg-gli-red" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Certification paths: a staircase, each tier longer and deeper than the one before ── */}
      <section id="certifications" className="gli-speckle scroll-mt-[76px] px-5 py-24 text-white md:px-10 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-wrap items-center gap-6">
            <GliBars />
            <h2 data-gli-rise className="font-gli-head text-[clamp(44px,6.4vw,104px)] uppercase leading-none">Certification paths</h2>
          </div>
          <ol className="mt-16 grid items-end gap-4 md:grid-cols-4">
            {certifications.map((c, i) => (
              <li
                key={c.tier}
                data-gli-wipe
                className="flex flex-col justify-end bg-[linear-gradient(180deg,#DC0E20_0%,#7A0C2A_60%,#2A0A3A_100%)] p-7 md:min-h-[var(--h)]"
                style={{ ['--h' as string]: `${220 + i * 90}px` }}
              >
                <p className="font-gli-head text-[clamp(30px,2.6vw,40px)] uppercase leading-none">{c.length}</p>
                <h3 className="mt-4 text-[20px] font-bold leading-tight">{c.tier}</h3>
                <p className="mt-3 text-[15px] font-medium leading-snug text-[rgba(255,255,255,0.85)]">{c.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Teaching methods and graduation requirements ── */}
      <section className="grid lg:grid-cols-2">
        <div className="relative isolate overflow-hidden bg-[linear-gradient(120deg,#5A0712_0%,#DC0E20_100%)] px-5 py-20 text-white md:px-14 md:py-24">
          <h2 data-gli-rise className="font-gli-head text-[clamp(48px,5vw,84px)] uppercase leading-none">Teaching methods</h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {teachingMethods.map((t) => (
              <li key={t} className="text-[18px] font-bold leading-snug">· {t}</li>
            ))}
          </ul>
        </div>
        <div className="relative isolate overflow-hidden bg-[#0B0410] px-5 py-20 text-white md:px-14 md:py-24">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_80%,rgba(220,14,32,0.45),transparent_40%)]" />
          <h2 data-gli-rise className="font-gli-head text-[clamp(48px,5vw,84px)] uppercase leading-none">Graduation requirements</h2>
          <ul className="mt-10 grid gap-5">
            {graduation.map((g) => (
              <li key={g} className="flex items-center gap-4 text-[19px] font-bold">
                <span aria-hidden="true" className="h-4 w-4 shrink-0 bg-gli-red" />
                {g}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-10">
        <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-8 md:flex-row md:items-center">
          <h2 className="max-w-[18ch] font-gli-head text-[clamp(40px,4.4vw,72px)] uppercase leading-none text-gli-navy">
            Found your program? <span className="text-gli-red">Apply now.</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <GliButton href="/institute/admissions#apply">Apply now</GliButton>
            <GliButton href="/institute/corporate" tone="outline">For your team</GliButton>
          </div>
        </div>
      </section>
    </>
  );
}
