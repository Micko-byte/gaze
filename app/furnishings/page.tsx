/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { houses } from '@/content/houses';
import { collections, furnNav, orderingSteps, payments } from '@/content/furnishings';
import { HouseHeader } from '@/components/House/HouseHeader';
import { HouseFooter } from '@/components/House/HouseFooter';
import { FurnHero } from '@/components/Furnishings/FurnHero';
import { Reveal } from '@/components/Reveal/Reveal';

export const metadata: Metadata = {
  title: 'Gaze Furnishings',
  description: 'Bespoke furniture, made to order in Nairobi in 14–21 days and delivered worldwide. Luxury, without ornament.',
};

const house = houses.find((h) => h.id === 'furnishings')!;

/* Collection panels alternate the house colours until the studio photography arrives. */
const PANEL = [
  { bg: '#E2D7C9', ink: '#1E1E22', rule: '#7B5232' },
  { bg: '#1E1E22', ink: '#EEE7DF', rule: '#C99DC2' },
  { bg: '#7B5232', ink: '#EEE7DF', rule: '#EEE7DF' },
  { bg: '#C99DC2', ink: '#1E1E22', rule: '#1E1E22' },
];

export default function FurnishingsPage() {
  return (
    <div className="bg-furn-linen font-text text-furn-ink">
      <HouseHeader house={house} links={furnNav} overHero="light" />
      <main>
        <FurnHero />

        {/* ── The collection ── */}
        <section id="collection" className="px-5 py-28 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-furn-walnut">The collection</p>
                <h2 className="mt-4 font-furn text-[clamp(40px,5vw,84px)] leading-[1.02]">Seven rooms, made to order.</h2>
              </div>
              <p className="max-w-sm text-base font-light leading-relaxed text-[#4A4640]">
                Every piece is named for an animal of the Kenyan plains and made for the room it will live in.
              </p>
            </Reveal>
            <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {collections.map((c, i) => {
                const p = PANEL[i % PANEL.length];
                return (
                  <Reveal key={c.name} delay={(i % 4) * 0.08} className={i === 0 ? 'sm:col-span-2 lg:row-span-2' : ''}>
                    <a
                      href="#consultation"
                      className="group relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden p-7 transition-transform duration-700 ease-reveal hover:-translate-y-1"
                      style={{ background: p.bg, color: p.ink }}
                    >
                      <span className="text-[11px] uppercase tracking-[0.3em] opacity-70">0{i + 1}</span>
                      <div>
                        <span className="block h-px w-12 transition-all duration-700 ease-reveal group-hover:w-24" style={{ background: p.rule }} />
                        <h3 className={`mt-5 font-furn leading-[1.02] ${i === 0 ? 'text-[clamp(44px,5vw,88px)]' : 'text-[clamp(30px,2.6vw,44px)]'}`}>{c.name}</h3>
                        <p className="mt-3 text-[12px] uppercase tracking-[0.24em] opacity-75">{c.piece ?? 'Pieces arriving with the first collection'}</p>
                      </div>
                    </a>
                  </Reveal>
                );
              })}
              <Reveal delay={0.24}>
                <a href="#consultation" className="flex h-full min-h-[260px] flex-col justify-between border border-furn-ink p-7 transition-colors duration-500 hover:bg-furn-ink hover:text-furn-linen">
                  <span className="text-[11px] uppercase tracking-[0.3em] opacity-70">Services</span>
                  <div>
                    <h3 className="font-furn text-[clamp(30px,2.6vw,44px)] leading-[1.02]">Interior design &amp; private consultation</h3>
                    <p className="mt-3 text-[12px] uppercase tracking-[0.24em] opacity-75">Book a consultation →</p>
                  </div>
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Signature piece ── */}
        <section id="signature" className="bg-furn-ink px-5 py-28 text-furn-linen md:px-10 md:py-36">
          <div className="mx-auto grid max-w-[1440px] items-center gap-14 md:grid-cols-[1.15fr_1fr]">
            <Reveal className="relative aspect-[4/3] overflow-hidden">
              <img src="/images/divisions/furnishings.jpg" alt="A living room furnished in warm timber and soft neutrals" className="h-full w-full object-cover" />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-furn-lilac">Signature · Dining</p>
              <h2 className="mt-5 font-furn text-[clamp(44px,5.4vw,96px)] leading-[0.98]">Duma Dining Set</h2>
              <p className="mt-6 max-w-md text-base font-light leading-relaxed text-[rgba(238,231,223,0.8)]">
                Named for the cheetah: a table and chairs drawn with speed and restraint, made to your room&apos;s measurements
                and finished in the fabric you choose.
              </p>
              <dl className="mt-10 grid max-w-md grid-cols-2 gap-x-8 gap-y-6 border-t border-[rgba(238,231,223,0.18)] pt-8 text-sm">
                <div><dt className="text-[11px] uppercase tracking-[0.26em] text-furn-lilac">Made to order</dt><dd className="mt-2">14–21 days</dd></div>
                <div><dt className="text-[11px] uppercase tracking-[0.26em] text-furn-lilac">Delivery</dt><dd className="mt-2">Worldwide</dd></div>
                <div><dt className="text-[11px] uppercase tracking-[0.26em] text-furn-lilac">Price</dt><dd className="mt-2">Shown in your currency</dd></div>
                <div><dt className="text-[11px] uppercase tracking-[0.26em] text-furn-lilac">Payment</dt><dd className="mt-2">Deposit, balance on delivery</dd></div>
              </dl>
              <a href="#consultation" className="mt-10 inline-block bg-furn-lilac px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-furn-ink transition-colors hover:bg-furn-linen">
                Enquire about the Duma
              </a>
            </Reveal>
          </div>
        </section>

        {/* ── Ordering ── */}
        <section id="ordering" className="px-5 py-28 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-furn-walnut">Ordering</p>
              <h2 className="mt-4 max-w-3xl font-furn text-[clamp(40px,5vw,84px)] leading-[1.02]">From your room to your door.</h2>
            </Reveal>
            <ol className="mt-16 grid gap-10 md:grid-cols-4">
              {orderingSteps.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.08}>
                  <li className="border-t border-furn-ink pt-6">
                    <span className="font-furn text-5xl text-furn-walnut">{i + 1}</span>
                    <h3 className="mt-4 text-lg font-medium">{s.title}</h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-[#4A4640]">{s.body}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-y border-[rgba(30,30,34,0.15)] py-6 text-[12px] uppercase tracking-[0.26em]">
              <span className="text-furn-walnut">We accept</span>
              {payments.map((p) => <span key={p}>{p}</span>)}
              <span className="ml-auto normal-case tracking-normal text-[#4A4640]">Prices follow your country automatically.</span>
            </Reveal>
          </div>
        </section>

        {/* ── See it in your room ── */}
        <section className="bg-furn-lilac px-5 py-24 md:px-10">
          <Reveal className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 md:flex-row md:items-center">
            <h2 className="max-w-2xl font-furn text-[clamp(36px,4vw,68px)] leading-[1.02]">See it in your own room, through your phone.</h2>
            <p className="max-w-sm text-base leading-relaxed">Coming after launch, starting with our signature pieces.</p>
          </Reveal>
        </section>

        {/* ── Consultation ── */}
        <section id="consultation" className="px-5 py-28 md:px-10 md:py-36">
          <Reveal className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-2">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-furn-walnut">Consultations</p>
              <h2 className="mt-4 font-furn text-[clamp(40px,5vw,84px)] leading-[1.02]">Interior design, privately.</h2>
              <p className="mt-6 max-w-md text-base font-light leading-relaxed text-[#4A4640]">
                For a single room or a whole home, a Gaze designer will walk the space with you, then propose pieces, fabrics and
                finishes made for it. Your enquiry reaches our representative straight away, by email and text.
              </p>
            </div>
            <div className="flex flex-col justify-end gap-4">
              <a href="/#contact" className="bg-furn-ink px-7 py-5 text-center text-[12px] font-semibold uppercase tracking-[0.22em] text-furn-linen transition-colors hover:bg-furn-walnut">
                Book a consultation
              </a>
              <a href="/#contact" className="border border-furn-ink px-7 py-5 text-center text-[12px] font-semibold uppercase tracking-[0.22em] transition-colors hover:bg-furn-ink hover:text-furn-linen">
                Ask about a piece
              </a>
            </div>
          </Reveal>
        </section>
      </main>
      <HouseFooter house={house} />
    </div>
  );
}
