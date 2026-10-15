/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { corporate } from '@/content/institute';
import { GliBars, GliLabel } from '@/components/Institute/GliBits';
import { CorporateForm } from '@/components/Institute/GliForms';

export const metadata: Metadata = {
  title: 'Corporate Training · Gaze Leadership Institute',
  description: corporate.lede,
};

export default function InstituteCorporate() {
  return (
    <>
      {/* ── Hero: the conference room, "Corporate Training" in red, and the navy solutions panel ── */}
      <section className="relative isolate overflow-hidden bg-[#0B0B10] pt-[112px] text-white">
        <div className="grid lg:grid-cols-[1fr_1fr]">
          <div className="relative min-h-[460px] overflow-hidden">
            <img src="/images/institute/conference.jpg" alt="A conference room set for a session" className="absolute inset-0 h-full w-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,11,16,0.92)_0%,rgba(11,11,16,0.2)_60%)]" />
            <span aria-hidden="true" className="absolute left-0 top-10 h-10 w-40 rounded-r-full bg-gli-navy" />
            <h1 data-loader-target className="absolute bottom-10 left-5 font-gli-text text-[clamp(52px,7vw,112px)] font-extrabold uppercase leading-[0.92] tracking-[-0.02em] text-gli-red md:left-10">
              <span data-gli-rise className="block">Corporate</span>
              <span data-gli-rise className="block">training</span>
            </h1>
          </div>
          <div data-gli-wipe className="bg-gli-navy px-6 py-16 md:px-14 md:py-20">
            <h2 className="text-[clamp(28px,2.6vw,40px)] font-bold">Corporate Solutions</h2>
            <p className="mt-6 max-w-[48ch] text-[18px] font-semibold leading-relaxed text-[rgba(255,255,255,0.88)]">{corporate.lede}</p>
            <p className="mt-6 text-[16px] font-semibold">{corporate.intro}</p>
            <ul className="mt-5 grid gap-3">
              {corporate.solutions.map((s) => (
                <li key={s} className="flex gap-3 text-[18px] font-bold">
                  <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-gli-red" />
                  {s}
                </li>
              ))}
            </ul>
            <a href="#request" className="mt-10 inline-flex bg-gli-red px-7 py-4 text-[13px] font-bold uppercase tracking-[0.16em] transition-colors hover:bg-white hover:text-gli-navy">
              Request corporate training
            </a>
          </div>
        </div>
      </section>

      {/* ── Why corporates choose GLI: a red column holding the photograph, the list on dark ── */}
      <section className="relative isolate overflow-hidden bg-[#2B2B30] text-white">
        <div className="grid lg:grid-cols-[0.9fr_1.4fr]">
          <div className="relative flex items-center justify-center px-5 py-16 md:px-10">
            <span aria-hidden="true" className="absolute inset-y-0 left-[18%] right-[18%] -z-10 bg-gli-red" />
            <img src="/images/institute/presenter.jpg" alt="A facilitator presenting to a team" className="w-full max-w-[380px] object-cover shadow-[0_40px_60px_-30px_rgba(0,0,0,0.7)]" />
          </div>
          <div className="px-5 py-16 md:px-14 md:py-24">
            <div className="flex items-start justify-between gap-6">
              <h2 data-gli-rise className="font-gli-text text-[clamp(40px,4.6vw,72px)] font-bold leading-[1.05] text-gli-red">Why corporates choose GLI</h2>
              <GliBars className="hidden shrink-0 md:inline-flex" />
            </div>
            <ul className="mt-12 grid gap-8 md:grid-cols-2">
              {corporate.why.map((w) => (
                <li key={w.title} className="border-t-2 border-gli-red pt-5">
                  <h3 className="text-[20px] font-bold leading-snug">{w.title}</h3>
                  <p className="mt-2 text-[16px] font-medium leading-relaxed text-[rgba(255,255,255,0.78)]">{w.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Request ── */}
      <section id="request" className="scroll-mt-[76px] bg-gli-mist px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1320px] gap-16 lg:grid-cols-[0.8fr_1.6fr]">
          <div>
            <GliLabel className="text-gli-red">For your organization</GliLabel>
            <h2 data-gli-rise className="mt-4 font-gli-head text-[clamp(48px,5vw,84px)] uppercase leading-none text-gli-navy">Request corporate training</h2>
            <p className="mt-6 max-w-[36ch] text-[17px] font-medium leading-relaxed text-gli-ink">
              Tell us about your team. We tailor every engagement to the organization, and agree the outcomes with you before
              training begins.
            </p>
            <img src="/images/institute/meeting-table.jpg" alt="A team in a working session" className="mt-10 hidden w-full max-w-[420px] rounded-[16px] object-cover lg:block" />
          </div>
          <CorporateForm />
        </div>
      </section>
    </>
  );
}
