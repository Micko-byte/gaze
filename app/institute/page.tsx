/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { hero, offers, tagline, testimonials, upcoming, whoWeAre, whyGli } from '@/content/institute';
import { GliBars, GliButton, GliCircle, GliContours, GliCrest, GliLabel } from '@/components/Institute/GliBits';

export const metadata: Metadata = {
  title: 'Gaze Leadership Institute',
  description: hero.body,
};

export default function InstituteHome() {
  return (
    <>
      {/* ── Hero: the brand book cover, the city at dusk, the crest, and the name on a navy band ── */}
      <section className="relative isolate overflow-hidden bg-white pt-[112px]">
        <div className="relative h-[clamp(240px,38svh,420px)]">
          <img src="/images/institute/city.jpg" alt="A city at dusk, seen from above" className="absolute inset-0 h-full w-full object-cover object-[50%_45%]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.55)_45%,rgba(255,255,255,0.1)_100%)]" />
          <GliContours className="absolute inset-x-0 bottom-0 h-1/2 w-full" lines={18} />
          <div data-loader-target className="absolute inset-x-0 top-6 flex justify-center md:top-8">
            <GliCrest className="h-[clamp(130px,22svh,210px)] w-[clamp(124px,21svh,200px)] drop-shadow-[0_18px_30px_rgba(0,11,61,0.25)]" />
          </div>
        </div>
        <div className="relative bg-gli-navy px-5 py-10 text-center text-white md:py-14">
          <h1 className="font-gli-serif text-[clamp(40px,7.2vw,118px)] font-black uppercase leading-[1] [text-shadow:0_4px_18px_rgba(0,0,0,0.45)]">
            <span data-gli-rise className="block">Gaze Leadership</span>
            <span data-gli-rise className="block">Institute</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[40ch] text-[clamp(16px,1.6vw,22px)] font-light italic tracking-[0.06em]">“{tagline}”</p>
        </div>
        <div className="relative px-5 pb-24 pt-16 md:px-10 md:pb-32 md:pt-20">
          <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <h2 data-gli-rise className="font-gli-head text-[clamp(40px,5.4vw,88px)] uppercase leading-[1.02]">
              Raising emotionally intelligent,{' '}
              <span className="whitespace-nowrap">
                <span className="text-gli-red">spirit-led</span>,
              </span>{' '}
              high-capacity leaders for{' '}
              <span className="text-gli-red">global impact.</span>
            </h2>
            <div>
              <GliBars />
              <p className="mt-6 text-[18px] font-semibold leading-relaxed text-gli-ink">{hero.body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <GliButton href="/institute/admissions#apply">Enroll now</GliButton>
                <GliButton href="/institute/programs" tone="outline">Explore courses</GliButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who we are: the navy and red rails of the brand book's text pages ── */}
      <section className="relative overflow-hidden border-x-[10px] border-l-gli-navy border-r-gli-red bg-gli-mist px-5 py-24 md:border-x-[18px] md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1320px] items-center gap-16 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <h2 data-gli-rise className="font-gli-head text-[clamp(52px,6.4vw,104px)] uppercase leading-none text-gli-red">Who we are</h2>
            <p data-gli-ink className="mt-8 text-[clamp(20px,1.9vw,27px)] font-bold leading-[1.45] text-gli-navy">{whoWeAre[0]}</p>
            <p className="mt-6 max-w-[56ch] text-[18px] font-medium leading-relaxed text-gli-ink">{whoWeAre[1]}</p>
          </div>
          <div className="relative mx-auto w-full max-w-[460px]">
            <GliCircle src="campus-circle" alt="A sandstone university hall" className="w-[78%] border-[10px] border-white" />
            <GliCircle src="counsel" alt="Two women in a coaching conversation" className="absolute bottom-[-8%] right-0 w-[52%] border-[10px] border-gli-red" />
          </div>
        </div>
      </section>

      {/* ── What we offer: the red curriculum page, a navy title tab and a circle for each offer ── */}
      <section className="relative isolate overflow-hidden bg-gli-red px-5 py-24 text-white md:px-10 md:py-32">
        <div className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.16),transparent_65%)]" />
        <div className="mx-auto max-w-[1320px]">
          <div data-gli-wipe className="inline-block rounded-[18px] bg-gli-navy px-8 py-5 md:px-12">
            <h2 className="font-gli-head text-[clamp(44px,5vw,84px)] uppercase leading-none">What we offer</h2>
          </div>
          <ul className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {offers.map((o) => (
              <li key={o.title}>
                <Link href={o.href} className="group flex items-center gap-5 lg:flex-col lg:items-start">
                  <GliCircle src={o.image} alt="" className="w-24 shrink-0 border-4 border-white transition-transform duration-500 group-hover:scale-105 lg:w-36" />
                  <span className="text-[18px] font-bold leading-snug">
                    {o.title}
                    <span className="mt-2 block text-[12px] uppercase tracking-[0.2em] text-[rgba(255,255,255,0.75)] transition-colors group-hover:text-white">Explore →</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Why GLI: the dark value-proposition page, red light on navy-black, a campus photograph cut on the slant ── */}
      <section className="relative isolate overflow-hidden bg-[#050A1F] px-5 py-24 text-white md:px-10 md:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_15%,rgba(220,14,32,0.4),transparent_38%),radial-gradient(circle_at_10%_95%,rgba(220,14,32,0.28),transparent_34%)]" />
        <div className="mx-auto grid max-w-[1320px] items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="block h-2 w-24 bg-gli-red" />
            <h2 data-gli-rise className="mt-6 font-gli-head text-[clamp(52px,6.4vw,104px)] uppercase leading-none">Why GLI?</h2>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2">
              {whyGli.map((w) => (
                <li key={w} className="flex gap-4 text-[18px] font-semibold leading-snug">
                  <span aria-hidden="true" className="mt-1.5 h-3.5 w-3.5 shrink-0 bg-gli-red" />
                  {w}
                </li>
              ))}
            </ul>
            <GliButton href="/institute/about#why" tone="white" className="mt-12">Discover why GLI</GliButton>
          </div>
          <div data-gli-wipe className="relative">
            <img
              src="/images/institute/lecture.jpg"
              alt="A lecture theatre in session"
              className="h-[min(620px,80vw)] w-full object-cover [clip-path:polygon(14%_0,100%_0,86%_100%,0_100%)]"
            />
          </div>
        </div>
      </section>

      {/* ── Upcoming programmes: the flagship page, gold lines on white and a red slanted tab ── */}
      <section className="relative isolate overflow-hidden px-5 py-24 md:px-10 md:py-32">
        <GliContours className="absolute inset-x-0 top-0 -z-10 h-[70%] w-full opacity-70" />
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div data-gli-wipe className="bg-gli-red py-5 pl-14 pr-10 text-white [clip-path:polygon(9%_0,100%_0,100%_100%,0_100%)] md:pl-20">
              <h2 className="font-gli-head text-[clamp(40px,4.6vw,76px)] uppercase leading-none">Upcoming programs</h2>
            </div>
            <GliButton href="/institute/programs" tone="outline">View all programs</GliButton>
          </div>
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {upcoming.map((u) => (
              <li key={u.title}>
                <Link href={u.href} className="group flex h-full flex-col overflow-hidden rounded-[18px] bg-gli-navy text-white">
                  <span className="relative block aspect-[4/3] overflow-hidden">
                    <img src={`/images/institute/${u.image}.jpg`} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    {u.open && (
                      <span className="absolute left-3 top-3 bg-gli-red px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em]">Enrolling now</span>
                    )}
                  </span>
                  <span className="flex flex-1 flex-col bg-[linear-gradient(120deg,#DC0E20_0%,#7A0C2A_45%,#000B3D_100%)] p-6">
                    <span className="text-[19px] font-bold leading-tight">{u.title}</span>
                    <span className="mt-3 text-[13px] font-medium leading-snug text-[rgba(255,255,255,0.75)]">{u.school}</span>
                    <span className="mt-auto pt-6 text-[12px] font-bold uppercase tracking-[0.2em]">See the program →</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-gli-mist px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <GliLabel className="text-gli-red">Testimonials</GliLabel>
          <div className="mt-12 grid gap-14 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <figure key={t.who} className={i === 1 ? 'md:mt-24' : ''}>
                <span aria-hidden="true" className="block font-gli-head text-[120px] leading-[0.7] text-gli-red">“</span>
                <blockquote className="mt-4 font-gli-serif text-[clamp(24px,2.4vw,36px)] italic leading-[1.35] text-gli-navy">{t.quote}</blockquote>
                <figcaption className="mt-6 flex items-center gap-4 text-[13px] font-bold uppercase tracking-[0.22em] text-gli-ink">
                  <span className="h-[3px] w-10 bg-gli-red" />
                  {t.who}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Call to action ── */}
      <section className="relative isolate overflow-hidden bg-gli-red px-5 py-24 text-white md:px-10 md:py-32">
        <GliContours className="absolute inset-0 -z-10 h-full w-full opacity-50" stroke="#ffffff" lines={20} />
        <div className="mx-auto max-w-[1320px]">
          <GliBars className="[&>span]:bg-[linear-gradient(90deg,rgba(255,255,255,0.15),#fff)]" />
          <h2 data-gli-rise className="mt-8 max-w-[16ch] font-gli-head text-[clamp(52px,7vw,120px)] uppercase leading-[0.98]">
            Become the leader God designed you to be.
          </h2>
          <p className="mt-8 max-w-[44ch] text-[20px] font-semibold leading-relaxed">Join a global community of vision-led, high-capacity leaders.</p>
          <GliButton href="/institute/admissions" tone="white" className="mt-10">Start your journey</GliButton>
        </div>
      </section>
    </>
  );
}
