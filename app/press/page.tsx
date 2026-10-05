/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { houses } from '@/content/houses';
import { HouseHeader } from '@/components/House/HouseHeader';
import { HouseFooter } from '@/components/House/HouseFooter';
import { Reveal } from '@/components/Reveal/Reveal';

export const metadata: Metadata = {
  title: 'Gaze Press Global',
  description: 'The publishing house of Gaze Holdings: books and archives that carry the voice of the house. In Kenya, buy here; abroad, through Amazon.',
};

const house = houses.find((h) => h.id === 'press')!;
const nav = [
  { label: 'The books', href: '#books' },
  { label: 'Buying', href: '#buying' },
  { label: 'The archive', href: '#archive' },
] as const;

export default function PressPage() {
  return (
    <div className="bg-press-paper font-text text-press-ink">
      <HouseHeader house={house} links={nav} overHero="dark" />
      <main>
        {/* ── Hero ── */}
        <section id="top" className="px-5 pb-24 pt-36 md:px-10 md:pt-44">
          <div className="mx-auto grid max-w-[1440px] items-end gap-14 md:grid-cols-[1.3fr_1fr]">
            <div data-loader-target>
              <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-press-rose">Gaze Press Global · Nairobi</p>
              <h1 className="mt-6 font-press-head text-[clamp(52px,7.4vw,128px)] font-normal leading-[0.95] tracking-[-0.015em]">
                Books that carry the voice of the house.
              </h1>
              <p className="mt-6 font-press-script text-[clamp(40px,4vw,72px)] leading-none text-press-rose">Signed by hand.</p>
            </div>
            <Reveal className="relative">
              {/* the source is an Instagram export: crop its carousel badge out of the top-right corner */}
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img
                  src="/images/founder/muthoni-ngugi-editorial.png"
                  alt="The author with her book"
                  className="h-full w-full origin-bottom-left scale-[1.12] object-cover"
                />
              </div>
              <span className="absolute -bottom-4 -left-4 bg-press-ink px-4 py-3 text-[11px] uppercase tracking-[0.3em] text-press-paper">From the catalogue</span>
            </Reveal>
          </div>
        </section>

        {/* ── The books ── */}
        <section id="books" className="border-t border-press-ink px-5 py-28 md:px-10 md:py-36">
          <Reveal className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-press-rose">The books</p>
              <h2 className="mt-4 font-press-head text-[clamp(40px,5vw,88px)] leading-[1]">Titles with presence.</h2>
            </div>
            <div className="flex flex-col gap-6 self-end">
              <p className="text-lg font-light leading-relaxed">
                Every title is set in the house&apos;s own type, printed to last and kept in print. The full catalogue, with each
                book&apos;s story, appears here as titles are released.
              </p>
              <a href="#buying" className="self-start border-b border-press-ink pb-1 text-[12px] font-semibold uppercase tracking-[0.22em] transition-colors hover:border-press-rose hover:text-press-rose">
                How to buy →
              </a>
            </div>
          </Reveal>
        </section>

        {/* ── Buying ── */}
        <section id="buying" className="bg-press-ink px-5 py-28 text-press-paper md:px-10 md:py-36">
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-press-rose">Buying</p>
              <h2 className="mt-4 font-press-head text-[clamp(40px,5vw,88px)] leading-[1]">Wherever you read.</h2>
            </Reveal>
            <div className="mt-16 grid gap-5 md:grid-cols-2">
              <Reveal className="border border-[rgba(236,231,223,0.25)] p-10">
                <p className="text-[11px] uppercase tracking-[0.3em] text-press-rose">In Kenya</p>
                <h3 className="mt-4 font-press-head text-4xl">Buy here</h3>
                <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-[rgba(236,231,223,0.8)]">Pay by M-Pesa, Visa, Mastercard or bank transfer, delivered to your door.</p>
              </Reveal>
              <Reveal delay={0.1} className="bg-press-rose p-10 text-press-ink">
                <p className="text-[11px] uppercase tracking-[0.3em]">Everywhere else</p>
                <h3 className="mt-4 font-press-head text-4xl">Through Amazon</h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed">International readers are sent straight to each title on Amazon.</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── The archive ── */}
        <section id="archive" className="px-5 py-28 md:px-10 md:py-40">
          <Reveal className="mx-auto max-w-[1100px] text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-press-rose">The archive</p>
            <p className="mt-8 font-press-head text-[clamp(36px,4.6vw,80px)] leading-[1.06]">
              A publishing house that keeps foundational words in print, so they outlive the moment.
            </p>
            <p className="mt-10 font-press-script text-[clamp(36px,3.4vw,60px)] text-press-rose">Gaze Press Global</p>
          </Reveal>
        </section>
      </main>
      <HouseFooter house={house} />
    </div>
  );
}
