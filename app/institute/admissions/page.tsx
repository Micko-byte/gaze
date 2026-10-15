/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { applySteps, gliContact, payments, whoCanApply } from '@/content/institute';
import { GliBars, GliCircle, GliContours, GliLabel } from '@/components/Institute/GliBits';
import { ApplicationForm } from '@/components/Institute/GliForms';

export const metadata: Metadata = {
  title: 'Admissions · Gaze Leadership Institute',
  description: 'How to apply to the Gaze Leadership Institute: choose your program, apply online, and secure your seat once approved.',
};

export default function InstituteAdmissions() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden bg-gli-navy pt-[112px] text-white">
        <div className="grid lg:grid-cols-[1.1fr_1fr]">
          <div data-loader-target className="px-5 py-20 md:px-10 md:py-28">
            <GliBars />
            <h1 data-gli-rise className="mt-8 font-gli-head text-[clamp(64px,9vw,150px)] uppercase leading-[0.95]">Admissions</h1>
            <p className="mt-6 max-w-[38ch] text-[clamp(18px,1.6vw,22px)] font-semibold leading-relaxed text-[rgba(255,255,255,0.85)]">
              Five steps from choosing your program to your first class. Apply online today; your seat is secured once your
              application is approved and paid for.
            </p>
            <a href="#apply" className="mt-10 inline-flex bg-gli-red px-7 py-4 text-[13px] font-bold uppercase tracking-[0.16em] transition-colors hover:bg-white hover:text-gli-navy">
              Start your application
            </a>
          </div>
          <div data-gli-wipe className="relative min-h-[360px]">
            <img src="/images/institute/hall-b.jpg" alt="Students in a lecture theatre" className="absolute inset-0 h-full w-full object-cover [clip-path:polygon(16%_0,100%_0,100%_100%,0_100%)]" />
          </div>
        </div>
      </section>

      {/* ── How to apply: five steps, in order ── */}
      <section className="relative isolate overflow-hidden bg-white px-5 py-24 md:px-10 md:py-32">
        <GliContours className="absolute inset-x-0 bottom-0 -z-10 h-1/2 w-full opacity-50" />
        <div className="mx-auto max-w-[1320px]">
          <h2 data-gli-rise className="font-gli-head text-[clamp(52px,6.4vw,104px)] uppercase leading-none text-gli-red">How to apply</h2>
          <ol className="relative mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
            <span aria-hidden="true" className="absolute left-0 right-0 top-8 hidden h-[3px] bg-[linear-gradient(90deg,#DC0E20,#000B3D)] md:block" />
            {applySteps.map((s, i) => (
              <li key={s} className="relative">
                <span className="relative flex h-16 w-16 items-center justify-center bg-gli-navy font-gli-head text-[32px] text-white">{i + 1}</span>
                <p className="mt-6 text-[19px] font-bold leading-snug text-gli-navy">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Who can apply ── */}
      <section className="gli-speckle px-5 py-24 text-white md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1320px] items-center gap-16 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 data-gli-rise className="font-gli-head text-[clamp(52px,6.4vw,104px)] uppercase leading-none">Who can apply</h2>
            <ul className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {whoCanApply.map((w) => (
                <li key={w} className="flex gap-4 text-[19px] font-bold leading-snug">
                  <span aria-hidden="true" className="mt-1.5 h-3.5 w-3.5 shrink-0 bg-gli-red" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-[460px]">
            <GliCircle src="reader" alt="A student reading in a library" className="w-[78%] border-[10px] border-gli-red" />
            <GliCircle src="executives" alt="Executives in conversation" className="absolute -bottom-[8%] right-0 w-[50%] border-[10px] border-white" />
          </div>
        </div>
      </section>

      {/* ── Payments & fees ── */}
      <section className="bg-gli-mist px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 data-gli-rise className="font-gli-head text-[clamp(52px,6.4vw,104px)] uppercase leading-none text-gli-navy">
              Payments <span className="text-gli-red">&amp;</span> fees
            </h2>
            <p className="max-w-[40ch] text-[17px] font-semibold leading-relaxed text-gli-ink">
              Fees are published with each intake and sent with your letter of approval.
            </p>
          </div>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {payments.map((p) => (
              <li key={p.method} className="border-t-[6px] border-gli-red bg-white p-7">
                <h3 className="font-gli-head text-[32px] uppercase leading-none text-gli-navy">{p.method}</h3>
                <p className="mt-4 text-[15px] font-medium leading-relaxed text-gli-ink">{p.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Application form ── */}
      <section id="apply" className="scroll-mt-[76px] bg-white px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1320px] gap-16 lg:grid-cols-[0.8fr_1.6fr]">
          <div>
            <GliLabel className="text-gli-red">Step 2</GliLabel>
            <h2 data-gli-rise className="mt-4 font-gli-head text-[clamp(48px,5vw,84px)] uppercase leading-none text-gli-navy">Apply online</h2>
            <p className="mt-6 max-w-[36ch] text-[17px] font-medium leading-relaxed text-gli-ink">
              Tell us who you are and which program you have chosen. Admissions replies from:
            </p>
            <a href={`mailto:${gliContact.admissions}`} className="mt-2 block text-[15px] font-bold text-gli-red [overflow-wrap:anywhere] underline-offset-4 hover:underline">
              {gliContact.admissions}
            </a>
          </div>
          <ApplicationForm />
        </div>
      </section>
    </>
  );
}
