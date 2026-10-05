/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { orderingSteps, payments } from '@/content/furnishings';
import { FurnHeader } from '@/components/Furnishings/FurnHeader';
import { FurnHero } from '@/components/Furnishings/FurnHero';
import { CollectionCarousel } from '@/components/Furnishings/CollectionCarousel';
import { FurnFooter } from '@/components/Furnishings/FurnFooter';
import { Reveal } from '@/components/Reveal/Reveal';

export const metadata: Metadata = {
  title: 'Gaze Furnishings',
  description: 'Bespoke furniture, made to order in Nairobi in 14–21 days and delivered worldwide. Luxury, without ornament.',
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
            <p className="mx-auto mt-5 max-w-md px-5 text-sm font-light text-[#6F6A62]">Seven rooms, each piece named for an animal of the plains and made for the room it will live in.</p>
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
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="font-furn text-[clamp(30px,3.6vw,60px)] leading-[1.15]">
              Our work is driven by one idea: luxury, without ornament. Every line earns its place, and every piece is made
              for the room it will live in.
            </p>
            <a href="#craft" data-no-transition className={`${pill} mt-12 bg-furn-linen text-furn-ink hover:bg-furn-lilac`}>learn about our craft</a>
          </Reveal>
        </section>

        {/* ── interior design & consultation ── */}
        <section id="consultation" className="relative scroll-mt-[72px] overflow-hidden">
          <img src="/images/contact-backdrop.jpg" alt="A living room styled in soft blues and white" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[rgba(30,30,34,0.45)]" />
          <Reveal className="relative flex min-h-[80svh] flex-col items-center justify-center px-5 py-24 text-center text-furn-linen">
            <h2 className="font-furn text-[clamp(44px,6vw,108px)] leading-[0.98]">Interior design, privately</h2>
            <p className="mt-5 max-w-lg text-base font-light md:text-lg">Our way of taking care of your project: a designer walks the space with you, then proposes pieces, fabrics and finishes made for it.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a href="/#contact" className={`${pill} bg-furn-linen text-furn-ink hover:bg-furn-lilac`}>book a consultation</a>
              <a href="/#contact" className={`${pill} border border-[rgba(238,231,223,0.7)] hover:border-furn-lilac hover:text-furn-lilac`}>see how it works</a>
            </div>
          </Reveal>
        </section>

        {/* ── crafted in Nairobi ── */}
        <section id="craft" className="scroll-mt-[72px] px-5 py-24 md:px-[6vw] md:py-36">
          <div className="mx-auto grid max-w-[1600px] items-center gap-14 md:grid-cols-2">
            <Reveal className="aspect-[4/5] overflow-hidden md:aspect-[5/6]">
              <img src="/images/divisions/furnishings.jpg" alt="A lounge in warm timber, leather and linen" className="h-full w-full object-cover" />
            </Reveal>
            <Reveal delay={0.1} className="md:pl-10">
              <h2 className="font-furn text-[clamp(44px,5.4vw,96px)] leading-[0.98]">Made in Nairobi, made for your room</h2>
              <p className="mt-8 max-w-md text-base font-light leading-relaxed text-[#4A4640]">
                Each piece is made to order in our Nairobi workshop in 14 to 21 days, to your measurements and in the fabric
                you choose, then delivered wherever you are.
              </p>
              <dl className="mt-12 grid max-w-md grid-cols-2 gap-y-8 border-t border-[rgba(30,30,34,0.15)] pt-8">
                <div><dt className="text-[12px] text-[#6F6A62]">made to order</dt><dd className="mt-1 font-furn text-3xl">14–21 days</dd></div>
                <div><dt className="text-[12px] text-[#6F6A62]">delivery</dt><dd className="mt-1 font-furn text-3xl">worldwide</dd></div>
                <div><dt className="text-[12px] text-[#6F6A62]">rooms</dt><dd className="mt-1 font-furn text-3xl">seven</dd></div>
                <div><dt className="text-[12px] text-[#6F6A62]">prices</dt><dd className="mt-1 font-furn text-3xl">your currency</dd></div>
              </dl>
            </Reveal>
          </div>
        </section>

        {/* ── signature piece ── */}
        <section id="signature" className="bg-furn-ink px-5 py-24 text-furn-linen md:px-[6vw] md:py-36">
          <div className="mx-auto grid max-w-[1600px] items-end gap-14 md:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <p className="text-[12px] text-furn-lilac">signature · dining</p>
              <h2 className="mt-4 font-furn text-[clamp(56px,7vw,128px)] leading-[0.94]">Duma Dining Set</h2>
              <p className="mt-6 max-w-md text-base font-light leading-relaxed text-[rgba(238,231,223,0.8)]">
                Named for the cheetah: a table and chairs drawn with speed and restraint, made to your room&apos;s measurements
                and finished in the fabric you choose.
              </p>
              <a href="#consultation" data-no-transition className={`${pill} mt-10 bg-furn-lilac text-furn-ink hover:bg-furn-linen`}>enquire about the duma</a>
            </Reveal>
            <Reveal delay={0.1} className="aspect-[16/10] overflow-hidden">
              <img src="/video/hero-poster.jpg" alt="An open-plan dining and living space" className="h-full w-full object-cover" />
            </Reveal>
          </div>
        </section>

        {/* ── ordering ── */}
        <section id="ordering" className="scroll-mt-[72px] px-5 py-24 md:px-[6vw] md:py-36">
          <div className="mx-auto max-w-[1600px]">
            <Reveal className="text-center">
              <h2 className="inline-block border-b border-furn-ink pb-1 font-furn text-[clamp(30px,3vw,48px)] leading-none">from your room to your door</h2>
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
            <Reveal className="mt-16 flex flex-wrap items-center justify-center gap-3">
              {payments.map((p) => (
                <span key={p} className="rounded-full border border-[rgba(30,30,34,0.2)] px-5 py-2 text-[13px]">{p}</span>
              ))}
              <span className="px-3 text-[13px] text-[#6F6A62]">· a deposit today, the balance on delivery · prices follow your country</span>
            </Reveal>
          </div>
        </section>

        {/* ── see it in your room ── */}
        <section className="bg-furn-lilac px-5 py-24 md:px-[6vw]">
          <Reveal className="mx-auto flex max-w-[1600px] flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-[12px]">coming after launch</p>
              <h2 className="mt-3 max-w-2xl font-furn text-[clamp(36px,4.2vw,72px)] leading-[1.02]">See it in your own room, through your phone</h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed">Starting with our signature pieces: place the Duma in your dining room before it is made.</p>
          </Reveal>
        </section>

        {/* ── visit ── */}
        <section id="showroom" className="scroll-mt-[72px] px-5 py-24 md:px-[6vw] md:py-36">
          <div className="mx-auto grid max-w-[1600px] items-center gap-14 md:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <h2 className="font-furn text-[clamp(44px,5vw,88px)] leading-[0.98]">A unique experience, come visit us</h2>
              <p className="mt-6 max-w-sm text-base font-light leading-relaxed text-[#4A4640]">See the fabrics, sit in the pieces and meet the people who make them, in Nairobi.</p>
              <a href="/#contact" className={`${pill} mt-10 bg-furn-ink text-furn-linen hover:bg-furn-walnut`}>book a visit</a>
            </Reveal>
            <Reveal delay={0.1} className="aspect-[16/11] overflow-hidden">
              <img src="/images/contact-backdrop.jpg" alt="A styled room in the showroom" className="h-full w-full object-cover object-[50%_60%]" />
            </Reveal>
          </div>
        </section>
      </main>
      <FurnFooter />
    </div>
  );
}
