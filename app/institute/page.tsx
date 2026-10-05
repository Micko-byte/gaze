/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { houses } from '@/content/houses';
import { HouseHeader } from '@/components/House/HouseHeader';
import { HouseFooter } from '@/components/House/HouseFooter';
import { HouseLogo } from '@/components/Logo/HouseLogo';
import { Reveal } from '@/components/Reveal/Reveal';

export const metadata: Metadata = {
  title: 'Gaze Leadership Institute',
  description: 'Training kingdom leaders for global influence. Programmes with fixed intakes; enrol and pay online.',
};

const house = houses.find((h) => h.id === 'institute')!;
const nav = [
  { label: 'Programmes', href: '#programmes' },
  { label: 'How it works', href: '#how' },
  { label: 'Mentorship Circle', href: '#mentorship' },
  { label: 'Enrol', href: '#enrol' },
] as const;

/* From the client's answers: fixed intakes, enrol and pay in full online with no approval, proper student records. */
const how = [
  { title: 'Fixed intakes', body: 'Each programme opens on a published start date, so every cohort begins together.' },
  { title: 'Enrol instantly', body: 'Choose a programme and enrol straight away. There is no application to wait on.' },
  { title: 'Pay in full online', body: 'M-Pesa, Visa, Mastercard or bank transfer, settled at enrolment.' },
  { title: 'On record', body: 'Every student is kept on record, from first intake to graduation and beyond.' },
];

export default function InstitutePage() {
  return (
    <div className="bg-inst-paper font-text text-inst-midnight">
      <HouseHeader house={house} links={nav} overHero="dark" />
      <main>
        {/* ── Hero ── */}
        <section id="top" className="relative overflow-hidden px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
          <div className="mx-auto grid max-w-[1440px] items-center gap-14 md:grid-cols-[1.25fr_1fr]">
            <div data-loader-target>
              <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-inst-maroon">Gaze Leadership Institute · Nairobi</p>
              <h1 className="mt-6 font-inst text-[clamp(44px,6.2vw,108px)] font-bold uppercase leading-[0.96] tracking-[-0.01em]">
                Training kingdom leaders for global influence.
              </h1>
              <p className="mt-8 max-w-lg text-lg font-light leading-relaxed text-[#2B3656]">
                Programmes with fixed intakes. Enrol and pay online, with no approval to wait on.
              </p>
              <div className="mt-10 flex flex-wrap gap-3 text-[12px] font-semibold uppercase tracking-[0.22em]">
                <a href="#enrol" className="bg-inst-maroon px-7 py-4 text-inst-paper transition-colors hover:bg-inst-midnight">Enrol</a>
                <a href="#how" className="border border-inst-midnight px-7 py-4 transition-colors hover:bg-inst-midnight hover:text-inst-paper">How it works</a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 bg-inst-midnight md:-inset-10" aria-hidden="true" />
              <div className="relative flex aspect-square items-center justify-center bg-inst-paper p-10">
                <HouseLogo id="institute" title="Gaze Leadership Institute crest" className="h-full w-auto" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Statement band ── */}
        <section className="relative h-[70svh] min-h-[420px] overflow-hidden">
          <img src="/images/divisions/institute.jpg" alt="A cohort in session at the Institute" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,26,64,0.88),rgba(11,26,64,0.35))]" />
          <Reveal className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-center px-5 text-inst-paper md:px-10">
            <p className="font-inst text-[clamp(40px,5.6vw,96px)] font-bold uppercase leading-[0.98]">
              Clear.<br />Composed.<br /><span className="text-inst-sky">Built for leaders.</span>
            </p>
          </Reveal>
        </section>

        {/* ── How it works ── */}
        <section id="how" className="px-5 py-28 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-inst-maroon">How it works</p>
              <h2 className="mt-4 max-w-3xl font-inst text-[clamp(36px,4.4vw,72px)] font-bold uppercase leading-[1]">Enrol today. Begin with your intake.</h2>
            </Reveal>
            <div className="mt-16 grid gap-px bg-[rgba(11,26,64,0.15)] md:grid-cols-4">
              {how.map((h, i) => (
                <Reveal key={h.title} delay={i * 0.08} className="bg-inst-paper p-8">
                  <span className="font-inst text-5xl font-bold text-inst-sky">0{i + 1}</span>
                  <h3 className="mt-6 font-inst text-xl font-bold uppercase">{h.title}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-[#2B3656]">{h.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Programmes ── */}
        <section id="programmes" className="bg-inst-midnight px-5 py-28 text-inst-paper md:px-10 md:py-36">
          <Reveal className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-2 md:items-end">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-inst-sky">Programmes</p>
              <h2 className="mt-4 font-inst text-[clamp(36px,4.4vw,72px)] font-bold uppercase leading-[1]">The next intake is being set.</h2>
            </div>
            <div>
              <p className="max-w-md text-base font-light leading-relaxed text-[rgba(246,244,238,0.8)]">
                Programmes, their start dates and fees are published here before each intake opens. Register now and we will
                tell you first.
              </p>
              <a href="#enrol" className="mt-8 inline-block bg-inst-paper px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-inst-midnight transition-colors hover:bg-inst-sky">
                Register your interest
              </a>
            </div>
          </Reveal>
        </section>

        {/* ── Mentorship Circle ── */}
        <section id="mentorship" className="px-5 py-28 md:px-10 md:py-36">
          <Reveal className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-[1fr_1.2fr]">
            <div className="border-l-4 border-inst-maroon pl-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-inst-maroon">Within the Institute</p>
              <h2 className="mt-4 font-inst text-[clamp(36px,4.4vw,72px)] font-bold uppercase leading-[1]">The Gaze Mentorship Circle</h2>
            </div>
            <p className="self-end text-lg font-light leading-relaxed text-[#2B3656]">
              Alongside the programmes, the Circle pairs emerging leaders with those who have gone before them, so what is
              learned in the room carries on long after the intake ends.
            </p>
          </Reveal>
        </section>

        {/* ── Enrol ── */}
        <section id="enrol" className="bg-inst-maroon px-5 py-24 text-inst-paper md:px-10">
          <Reveal className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 md:flex-row md:items-center">
            <h2 className="max-w-2xl font-inst text-[clamp(32px,3.8vw,64px)] font-bold uppercase leading-[1]">Lead with the next cohort.</h2>
            <a href="/#contact" className="bg-inst-paper px-8 py-5 text-[12px] font-semibold uppercase tracking-[0.22em] text-inst-maroon transition-colors hover:bg-inst-midnight hover:text-inst-paper">
              Enrol or ask a question
            </a>
          </Reveal>
        </section>
      </main>
      <HouseFooter house={house} />
    </div>
  );
}
