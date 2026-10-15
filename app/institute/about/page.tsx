/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { about, brandStory, founderNote, originStory, philosophy, pillars, positioning, promise, usp, values } from '@/content/institute';
import { GliBars, GliButton, GliCircle, GliContours, GliLabel } from '@/components/Institute/GliBits';

export const metadata: Metadata = {
  title: 'About · Gaze Leadership Institute',
  description: about.who[0],
};

/** The brand book's Vision / Mission heading: a navy square set behind the first letter. */
function Squared({ word }: { word: string }) {
  return (
    <h2 className="relative inline-block font-gli-head text-[clamp(48px,5vw,80px)] uppercase leading-none text-gli-red">
      <span aria-hidden="true" className="absolute -left-2 top-[0.06em] -z-10 h-[0.82em] w-[0.62em] bg-gli-navy" />
      {word}
    </h2>
  );
}

export default function InstituteAbout() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="gli-speckle relative isolate overflow-hidden px-5 pb-24 pt-[160px] text-white md:px-10 md:pb-32 md:pt-[200px]">
        <GliContours className="absolute inset-x-0 bottom-0 -z-10 h-[55%] w-full opacity-60" />
        <div className="mx-auto grid max-w-[1320px] items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div data-loader-target>
            <GliBars />
            <h1 data-gli-rise className="mt-8 font-gli-head text-[clamp(64px,9vw,152px)] uppercase leading-[0.95]">About GLI</h1>
            <p className="mt-6 font-gli-serif text-[clamp(22px,2.2vw,32px)] italic leading-snug text-[rgba(255,255,255,0.92)]">{about.lede}</p>
            <div className="mt-10 grid max-w-[60ch] gap-5 text-[18px] font-medium leading-relaxed text-[rgba(255,255,255,0.85)]">
              {about.who.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <GliCircle src="campus-circle" alt="A sandstone university hall" className="mx-auto w-full max-w-[520px] border-[12px] border-gli-red" />
        </div>
      </section>

      {/* ── Founder's welcome note: portrait on the left, the red page on the right ── */}
      <section className="relative isolate overflow-hidden bg-white">
        <img src="/images/institute/library.jpg" alt="" className="absolute inset-y-0 left-0 -z-10 h-full w-1/2 object-cover opacity-25" />
        <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex items-center justify-center px-5 py-16 md:px-10">
            <img
              src="/images/institute/founder.jpg"
              alt="Muthoni Ngugi, Founder and Visionary of the Gaze Leadership Institute"
              className="aspect-[3/4] w-full max-w-[420px] rounded-[22px] object-cover shadow-[0_40px_60px_-30px_rgba(0,11,61,0.55)]"
            />
          </div>
          <div data-gli-wipe className="bg-gli-red px-6 py-16 text-white md:px-16 md:py-24">
            <h2 className="font-gli-head text-[clamp(44px,5vw,84px)] uppercase leading-none">{founderNote.title}</h2>
            <p className="mt-10 max-w-[56ch] text-[clamp(18px,1.6vw,22px)] font-bold leading-[1.6]">{founderNote.body}</p>
            <p className="mt-10 text-[18px] font-semibold italic">{founderNote.signed}</p>
          </div>
        </div>
      </section>

      {/* ── Origin story and the brand story ── */}
      <section className="relative isolate overflow-hidden bg-gli-mist px-5 py-24 md:px-10 md:py-32">
        <span aria-hidden="true" className="absolute inset-y-[18%] right-0 w-5 bg-gli-red md:w-10" />
        <div className="mx-auto max-w-[1320px]">
          <h2 data-gli-rise className="text-center font-gli-head text-[clamp(52px,6.4vw,104px)] uppercase leading-none text-gli-red">Origin story</h2>
          <div data-gli-wipe className="mx-auto mt-12 max-w-[920px] bg-gli-navy px-8 py-12 text-white md:px-14 md:py-16">
            <p className="text-[clamp(18px,1.6vw,22px)] font-bold leading-[1.65]">{originStory}</p>
          </div>
          <div className="mx-auto mt-24 max-w-[1000px] text-center">
            <GliLabel className="text-gli-red">Our story</GliLabel>
            <p className="mt-6 text-[20px] font-semibold text-gli-ink">{brandStory.opening}</p>
            <p data-gli-rise className="mt-4 font-gli-serif text-[clamp(32px,4.2vw,64px)] font-black leading-[1.12] text-gli-navy">
              “{brandStory.instruction}”
            </p>
            <p className="mx-auto mt-12 max-w-[34ch] text-[clamp(20px,2vw,28px)] font-bold leading-snug text-gli-ink">
              {brandStory.crisis[0]} <span className="text-gli-red">{brandStory.crisis[1]}</span>
            </p>
            <p className="mx-auto mt-10 max-w-[40ch] font-gli-serif text-[clamp(20px,1.9vw,26px)] italic leading-[1.6] text-gli-navy">
              {brandStory.answer.join(' ')}
            </p>
          </div>
        </div>
      </section>

      {/* ── Vision and mission ── */}
      <section className="relative overflow-hidden border-x-[10px] border-gli-red bg-white px-5 py-24 md:border-x-[18px] md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1320px] gap-16 md:grid-cols-2">
          {[
            { word: 'Vision', body: about.vision },
            { word: 'Mission', body: about.mission },
          ].map((v) => (
            <div key={v.word} className="isolate">
              <Squared word={v.word} />
              <p className="mt-8 max-w-[44ch] text-[clamp(19px,1.7vw,24px)] font-bold leading-[1.55] text-gli-navy">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="gli-speckle px-5 py-24 text-white md:px-10 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <GliLabel className="text-gli-red">Our philosophy · We believe</GliLabel>
          <ul className="mt-12 grid gap-6">
            {philosophy.map((p, i) => (
              <li key={p} data-gli-rise className={`font-gli-head text-[clamp(36px,5.2vw,86px)] uppercase leading-[1.02] ${i % 2 ? 'text-gli-red' : ''}`}>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Core pillars: the navy pillars page with its red tab ── */}
      <section className="relative isolate bg-white px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1320px] items-start gap-0 lg:grid-cols-[1fr_auto]">
          <div className="order-2 bg-[#222B57] px-6 py-12 text-white md:px-12 lg:order-1">
            <p className="text-[16px] font-bold">The strategic anchors of Gaze Leadership Institute</p>
            <p className="mt-2 text-[15px] font-medium text-[rgba(255,255,255,0.75)]">These pillars represent the foundation of GLI’s identity, curriculum, and impact.</p>
            <ul className="mt-10 grid gap-x-12 gap-y-9 md:grid-cols-2">
              {pillars.map((p) => (
                <li key={p.title} className="border-t-2 border-gli-red pt-5">
                  <h3 className="text-[19px] font-extrabold leading-snug">{p.title}</h3>
                  <p className="mt-3 text-[15px] font-medium leading-relaxed text-[rgba(255,255,255,0.82)]">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div data-gli-wipe className="order-1 self-center bg-gli-red px-8 py-6 text-white lg:order-2 lg:-ml-6 lg:mt-24">
            <h2 className="font-gli-head text-[clamp(44px,4.6vw,76px)] uppercase leading-[0.98]">
              Core
              <br />
              pillars
            </h2>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-gli-mist px-5 py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1320px]">
          <GliLabel className="text-gli-red">Our values</GliLabel>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
            {values.map((v, i) => (
              <li key={v} className="font-gli-head text-[clamp(44px,6.4vw,108px)] uppercase leading-[1.04] text-gli-navy transition-colors duration-300 hover:text-gli-red">
                {v}
                {i < values.length - 1 && <span aria-hidden="true" className="ml-8 text-gli-red">·</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── School promise ── */}
      <section className="relative isolate overflow-hidden bg-gli-red px-5 py-24 text-white md:px-10 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <h2 data-gli-rise className="font-gli-head text-[clamp(52px,6.4vw,104px)] uppercase leading-none text-gli-navy">School promise</h2>
          <p className="mt-6 text-[18px] font-bold">{promise.heading}</p>
          <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_1fr]">
            <p className="text-[clamp(18px,1.6vw,22px)] font-semibold leading-[1.65]">{promise.body}</p>
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.24em]">We promise to</p>
              <ul className="mt-6 grid gap-4">
                {promise.points.map((p) => (
                  <li key={p} className="flex gap-4 text-[17px] font-bold leading-snug">
                    <span aria-hidden="true" className="mt-1.5 h-3 w-3 shrink-0 bg-gli-navy" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-14 max-w-[60ch] border-t-2 border-[rgba(255,255,255,0.4)] pt-8 font-gli-serif text-[clamp(20px,1.9vw,26px)] italic leading-relaxed">
            {promise.close}
          </p>
        </div>
      </section>

      {/* ── Why GLI: the value proposition ── */}
      <section id="why" className="relative isolate scroll-mt-[90px] overflow-hidden bg-[#050A1F] px-5 py-24 text-white md:px-10 md:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_90%_10%,rgba(220,14,32,0.42),transparent_36%),radial-gradient(circle_at_5%_90%,rgba(220,14,32,0.25),transparent_30%)]" />
        <div className="mx-auto grid max-w-[1320px] items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="block h-2 w-24 bg-gli-red" />
            <h2 data-gli-rise className="mt-6 font-gli-head text-[clamp(52px,6.4vw,104px)] uppercase leading-none">Why GLI</h2>
            <p className="mt-8 text-[20px] font-bold">{usp.lead}</p>
            <ol className="mt-6 grid gap-3">
              {usp.points.map((p, i) => (
                <li key={p} className="flex items-baseline gap-5 font-gli-head text-[clamp(28px,3vw,44px)] uppercase leading-tight">
                  <span className="font-gli-text text-[14px] font-bold text-gli-red">{i + 1}</span>
                  {p}
                </li>
              ))}
            </ol>
            <p className="mt-8 max-w-[46ch] text-[18px] font-semibold leading-relaxed text-[rgba(255,255,255,0.85)]">{usp.close}</p>
            <p className="mt-6 max-w-[46ch] text-[18px] font-medium leading-relaxed text-[rgba(255,255,255,0.7)]">{usp.graduates}</p>
          </div>
          <div className="relative mx-auto w-full max-w-[520px]">
            <GliCircle src="hall-a" alt="A packed university auditorium" className="w-[80%] border-[10px] border-gli-red" />
            <GliCircle src="student" alt="A student at work on a laptop" className="absolute -bottom-[6%] right-0 w-[46%] border-[10px] border-white" />
          </div>
        </div>
      </section>

      {/* ── Positioning ── */}
      <section className="relative isolate overflow-hidden bg-gli-navy px-5 py-24 text-center text-white md:px-10 md:py-32">
        <GliContours className="absolute inset-0 -z-10 h-full w-full opacity-50" />
        <p className="mx-auto max-w-[30ch] font-gli-serif text-[clamp(26px,3vw,46px)] font-black leading-[1.25]">{positioning}</p>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <GliButton href="/institute/programs">Explore the Schools</GliButton>
          <GliButton href="/institute/admissions" tone="outline-light">How to apply</GliButton>
        </div>
      </section>
    </>
  );
}
