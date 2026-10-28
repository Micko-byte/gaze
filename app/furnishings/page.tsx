/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { furnContact, masterAtelier, payments, textures } from '@/content/furnishings';
import { FurnHeader } from '@/components/Furnishings/FurnHeader';
import { FurnHero } from '@/components/Furnishings/FurnHero';
import { CollectionCarousel } from '@/components/Furnishings/CollectionCarousel';
import { CatalogueContents } from '@/components/Furnishings/Catalogue';
import { FurnFooter } from '@/components/Furnishings/FurnFooter';
import { Reveal } from '@/components/Reveal/Reveal';

export const metadata: Metadata = {
  title: 'Gaze Furnishings',
  description: 'Bespoke furniture, bought online, made to order in 14–21 days and delivered worldwide. Luxury, without ornament.',
};

const pill = 'inline-block rounded-full px-7 py-3.5 font-text text-[13px] transition-colors';

/** Gaze Furnishings, laid out on Natuzzi Italia's rhythm and set in the house's own type and colours. */
export default function FurnishingsPage() {
  return (
    <div className="bg-furn-linen font-text text-furn-ink">
      <FurnHeader />
      <main>
        <FurnHero />

        {/* ── explore the collection ── */}
        <section id="collection" className="scroll-mt-[72px] bg-white py-24 md:py-32">
          <Reveal className="mb-12 text-center">
            <h2 className="inline-block border-b border-furn-ink pb-1 font-furn text-[clamp(30px,3vw,48px)] leading-none">explore the collection</h2>
            <p className="mx-auto mt-5 max-w-md px-5 text-sm font-light text-[#6F6A62]">Seven rooms, each its own wing. Choose one to walk in.</p>
          </Reveal>
          <CollectionCarousel />
        </section>

        {/* ── manifesto, on walnut ── */}
        <section
          className="relative px-5 py-32 text-furn-linen md:px-[6vw] md:py-44"
          style={{
            background:
              'repeating-linear-gradient(92deg, rgba(0,0,0,0.05) 0 2px, transparent 2px 9px), repeating-linear-gradient(88deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 23px), linear-gradient(180deg, #7B5232, #5E3D24)',
          }}
        >
          {/* the client's Master Atelier write-up (27 Oct 2026) */}
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="text-[12px] text-[rgba(238,231,223,0.75)]">
              {masterAtelier.company} · {masterAtelier.tagline}
            </p>
            <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.3em] text-[rgba(238,231,223,0.7)]">{masterAtelier.eyebrow}</p>
            <p className="mt-5 font-furn text-[clamp(30px,3.6vw,60px)] leading-[1.15]">{masterAtelier.headline}</p>
            <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-5 text-base font-light leading-relaxed text-[rgba(238,231,223,0.85)] md:text-lg">
              {masterAtelier.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <a href="#pillars" data-no-transition className={`${pill} mt-12 bg-furn-linen text-furn-ink hover:bg-white`}>the curated pillars</a>
          </Reveal>
        </section>

        {/* ── the curated pillars ── */}
        <section id="pillars" className="scroll-mt-[72px] bg-white px-5 py-24 md:px-[6vw] md:py-32">
          <div className="mx-auto max-w-[1600px]">
            <Reveal className="text-center">
              <h2 className="inline-block border-b border-furn-ink pb-1 font-furn text-[clamp(30px,3vw,48px)] leading-none">{masterAtelier.pillarsTitle}</h2>
            </Reveal>
            <ul className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
              {masterAtelier.pillars.map((p, i) => (
                <li key={p.name} className={i === 1 ? 'md:mt-20' : ''}>
                  <Reveal delay={i * 0.08}>
                    <Link href={p.href} data-no-transition className="group block">
                      <span className="block aspect-[4/5] overflow-hidden">
                        <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-reveal group-hover:scale-[1.04]" />
                      </span>
                      <span className="mt-6 block font-furn text-[clamp(26px,2.2vw,36px)] leading-tight">{p.name}</span>
                      <span className="mt-3 block text-[15px] font-light leading-relaxed text-[#4A4640]">{p.body}</span>
                      <span className="mt-4 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em]">
                        Enter <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CatalogueContents />

        {/* ── the bespoke atelier, its own wing: her five fabrics lead the way in ── */}
        <section id="atelier" className="scroll-mt-[72px] bg-white px-5 py-24 md:px-[6vw] md:py-36">
          <div className="mx-auto max-w-[1600px]">
            <div className="grid gap-10 border-t border-furn-ink pt-8 md:grid-cols-[1fr_1fr] md:items-end">
              <div>
                <p className="text-[12px] text-[#6F6A62]">the fabric studio</p>
                <h2 className="mt-3 font-furn text-[clamp(56px,7.4vw,132px)] leading-[0.92]">The Bespoke Atelier</h2>
              </div>
              <p className="max-w-md text-lg font-light leading-relaxed text-[#4A4640] md:justify-self-end">
                Select your fabric, define your palette, and curate your piece. Watch it take shape as you choose.
              </p>
            </div>
            <ul className="mt-14 grid grid-cols-3 gap-3 md:grid-cols-5 md:gap-4">
              {textures.map((t, i) => (
                <li key={t.id}>
                  <Reveal delay={i * 0.06}>
                    <Link href="/furnishings/atelier" data-no-transition className="group block">
                      <span className="block aspect-[720/819] overflow-hidden">
                        <img src={t.photo} alt={`${t.name}: the cloth, and an armchair made in it`} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-reveal group-hover:scale-[1.04]" />
                      </span>
                      <span className="mt-3 block font-furn text-xl md:text-2xl">{t.short}</span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Link href="/furnishings/atelier" data-no-transition className={`${pill} mt-12 bg-furn-ink text-furn-linen hover:bg-furn-walnut`}>enter the atelier</Link>
          </div>
        </section>

        {/* ── interior design & consultation ── */}
        <section id="consultation" className="relative scroll-mt-[72px] overflow-hidden">
          <img src="/images/contact-backdrop.jpg" alt="A living room styled in soft blues and white" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[rgba(30,30,34,0.45)]" />
          <Reveal className="relative flex min-h-[80svh] flex-col items-center justify-center px-5 py-24 text-center text-furn-linen">
            <h2 className="font-furn text-[clamp(44px,6vw,108px)] leading-[0.98]">Interior design, privately</h2>
            <p className="mt-5 max-w-lg text-base font-light md:text-lg">Our way of taking care of your project: a designer walks the space with you, then proposes pieces, fabrics and finishes made for it.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a href={`https://wa.me/${furnContact.whatsapp}?text=${encodeURIComponent('Hello Gaze Furnishings, I would like to book an interior design consultation.')}`} target="_blank" rel="noopener noreferrer" className={`${pill} bg-furn-linen text-furn-ink hover:bg-white`}>book a consultation</a>
              <Link href="/furnishings/projects" data-no-transition className={`${pill} border border-[rgba(238,231,223,0.7)] hover:bg-[rgba(238,231,223,0.12)]`}>see our projects</Link>
            </div>
          </Reveal>
        </section>

        {/* ── made to order ── */}
        <section id="craft" className="scroll-mt-[72px] px-5 py-24 md:px-[6vw] md:py-36">
          <div className="mx-auto grid max-w-[1600px] items-center gap-14 md:grid-cols-2">
            <Reveal className="aspect-[4/5] overflow-hidden md:aspect-[5/6]">
              <img src="/images/divisions/furnishings.jpg" alt="A lounge in warm timber, leather and linen" className="h-full w-full object-cover" />
            </Reveal>
            <Reveal delay={0.1} className="md:pl-10">
              <h2 className="font-furn text-[clamp(44px,5.4vw,96px)] leading-[0.98]">Made to order, made for your room</h2>
              <p className="mt-8 max-w-md text-base font-light leading-relaxed text-[#4A4640]">
                Each piece is made to order by our artisans in 14 to 21 days, to your measurements and in the fabric
                you choose, then delivered wherever you are.
              </p>
              <dl className="mt-12 grid max-w-md grid-cols-2 gap-y-8 border-t border-[rgba(30,30,34,0.15)] pt-8">
                <div><dt className="text-[12px] text-[#6F6A62]">made to order</dt><dd className="mt-1 font-furn text-3xl">14–21 days</dd></div>
                <div><dt className="text-[12px] text-[#6F6A62]">delivery</dt><dd className="mt-1 font-furn text-3xl">free within Nairobi</dd></div>
                <div><dt className="text-[12px] text-[#6F6A62]">rooms</dt><dd className="mt-1 font-furn text-3xl">seven</dd></div>
                <div><dt className="text-[12px] text-[#6F6A62]">deposit</dt><dd className="mt-1 font-furn text-3xl">75%</dd></div>
              </dl>
            </Reveal>
          </div>
        </section>

        {/* ── signature piece ── */}
        <section id="signature" className="bg-furn-ink px-5 py-24 text-furn-linen md:px-[6vw] md:py-36">
          <div className="mx-auto grid max-w-[1600px] items-end gap-14 md:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <p className="text-[12px] text-[rgba(238,231,223,0.6)]">signature · dining</p>
              <h2 className="mt-4 font-furn text-[clamp(56px,7vw,128px)] leading-[0.94]">Duma Dining Set</h2>
              <p className="mt-6 max-w-md text-base font-light leading-relaxed text-[rgba(238,231,223,0.8)]">
                Named for the cheetah: a table and chairs drawn with speed and restraint, made to your room&apos;s measurements
                and finished in the fabric you choose.
              </p>
              <Link href="/furnishings/duma-dining-set" data-no-transition className={`${pill} mt-10 bg-furn-linen text-furn-ink hover:bg-white`}>buy the duma</Link>
            </Reveal>
            <Reveal delay={0.1} className="aspect-[16/10] overflow-hidden">
              <img src="/video/hero-poster.jpg" alt="An open-plan dining and living space" className="h-full w-full object-cover" />
            </Reveal>
          </div>
        </section>

        {/* ── her commissioning terms ── */}
        <section id="ordering" className="scroll-mt-[72px] px-5 py-24 md:px-[6vw] md:py-36">
          <div className="mx-auto max-w-[1600px]">
            <Reveal className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-end">
              <h2 className="font-furn text-[clamp(40px,4.6vw,80px)] leading-[0.98]">{masterAtelier.termsTitle}</h2>
              <p className="max-w-lg text-base font-light leading-relaxed text-[#4A4640]">{masterAtelier.termsIntro}</p>
            </Reveal>
            <dl className="mt-14 grid gap-px bg-[rgba(30,30,34,0.15)] md:grid-cols-2 lg:grid-cols-3">
              {masterAtelier.terms.map((t) => (
                <div key={t.label} className="bg-furn-linen py-8 md:p-8">
                  <dt className="text-lg font-medium">{t.label}</dt>
                  <dd className="mt-2 text-[15px] font-light leading-relaxed text-[#4A4640]">{t.body}</dd>
                </div>
              ))}
            </dl>

            {/* pricing & invoicing transparency */}
            <div className="mt-20 grid gap-10 bg-furn-ink p-8 text-furn-linen md:grid-cols-[1fr_1.4fr] md:p-14">
              <h3 className="font-furn text-[clamp(32px,3.2vw,52px)] leading-[1.02]">{masterAtelier.invoicingTitle}</h3>
              <div className="grid gap-4 text-base font-light leading-relaxed text-[rgba(238,231,223,0.85)]">
                {masterAtelier.invoicing.map((p, i) => (
                  <p key={p} className={i === 0 ? 'font-furn text-2xl text-furn-linen' : ''}>{p}</p>
                ))}
              </div>
            </div>

            <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-3">
              {payments.map((p) => (
                <span key={p} className="rounded-full border border-[rgba(30,30,34,0.2)] px-5 py-2 text-[13px]">{p}</span>
              ))}
              <span className="px-3 text-[13px] text-[#6F6A62]">
                · <Link href="/furnishings/terms" data-no-transition className="underline underline-offset-4">master terms &amp; conditions</Link> ·{' '}
                <Link href="/furnishings/international" data-no-transition className="underline underline-offset-4">commissioning from abroad</Link>
              </span>
            </Reveal>

            <Reveal className="mt-24 border-t border-furn-ink pt-10 text-center">
              <h2 className="font-furn text-[clamp(40px,5vw,88px)] leading-[0.98]">{masterAtelier.commissionTitle}</h2>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                {masterAtelier.ctas.map((c, i) => (
                  <Link key={c.label} href={c.href} data-no-transition className={`${pill} ${i === 2 ? 'border border-furn-ink hover:bg-furn-ink hover:text-furn-linen' : 'bg-furn-ink text-furn-linen hover:bg-furn-walnut'}`}>
                    {c.label}
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── see it in your room ── */}
        <section className="bg-[#E4DCD1] px-5 py-24 md:px-[6vw]">
          <Reveal className="mx-auto flex max-w-[1600px] flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-[12px]">coming after launch</p>
              <h2 className="mt-3 max-w-2xl font-furn text-[clamp(36px,4.2vw,72px)] leading-[1.02]">See it in your own room, through your phone</h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed">Starting with our signature pieces: place the Duma in your dining room before it is made.</p>
          </Reveal>
        </section>

        {/* ── wholly online since 28 Oct 2026: how buying works, and how to reach the team ── */}
        <section id="shop-online" className="scroll-mt-[72px] px-5 py-24 md:px-[6vw] md:py-36">
          <div className="mx-auto grid max-w-[1600px] gap-14 md:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <h2 className="font-furn text-[clamp(44px,5vw,88px)] leading-[0.98]">Shop from wherever you are</h2>
              <p className="mt-6 max-w-sm text-base font-light leading-relaxed text-[#4A4640]">
                Gaze Furnishings is entirely online: choose your piece here, and we make it and bring it to your door.
              </p>
              <div className="mt-8 grid gap-1 text-[15px]">
                {furnContact.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="hover:text-furn-walnut">{p.label}</a>
                ))}
                <a href={`mailto:${furnContact.email}`} className="hover:text-furn-walnut">{furnContact.email}</a>
              </div>
              <a href={`https://wa.me/${furnContact.whatsapp}`} target="_blank" rel="noopener noreferrer" className={`${pill} mt-10 bg-furn-ink text-furn-linen hover:bg-furn-walnut`}>chat on WhatsApp</a>
            </Reveal>
            <Reveal delay={0.1}>
              <ol className="border-t border-furn-ink">
                {[
                  ['Choose', 'Pick the piece, then its fabric, colour, finish and size, all on its page.'],
                  ['Order', 'Add it to your bag and check out on one page. We reply on WhatsApp with your invoice.'],
                  ['Confirm', 'Your 75% deposit, by M-Pesa, card or bank transfer, starts production.'],
                  ['Receive', `Made in 14–21 days (imported pieces in 3 months), then delivered and placed: free within Nairobi.`],
                ].map(([t, b], i) => (
                  <li key={t} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-[rgba(30,30,34,0.15)] py-6 md:grid-cols-[3rem_10rem_1fr]">
                    <span className="font-furn text-2xl text-furn-walnut">{i + 1}</span>
                    <span className="font-furn text-[28px] leading-none">{t}</span>
                    <span className="col-start-2 text-[15px] font-light leading-relaxed text-[#4A4640] md:col-start-3">{b}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>
      </main>
      <FurnFooter />
    </div>
  );
}
