import type { Metadata } from 'next';
import Link from 'next/link';
import { chairs, chairTitle, seatingCollections, seatingWing } from '@/content/executiveSeating';
import { furnContact } from '@/content/furnishings';
import { FurnHeader } from '@/components/Furnishings/FurnHeader';
import { FurnFooter } from '@/components/Furnishings/FurnFooter';
import { ChairCard } from '@/components/Furnishings/Seating/ChairCard';
import { HeroChair } from '@/components/Furnishings/Seating/HeroChair';
import { Reveal } from '@/components/Reveal/Reveal';

export const metadata: Metadata = {
  title: 'Executive Seating · Gaze Furnishings',
  description: seatingWing.body,
};

const ROMAN = ['I', 'II', 'III'];
const catalogue = `https://wa.me/${furnContact.whatsapp}?text=${encodeURIComponent('Hello Gaze Furnishings, may I have the full executive seating catalogue?')}`;

/** The Executive Seating Wing: its own wing, apart from the office tables. Three collections, twenty chairs. */
export default function ExecutiveSeatingPage() {
  const lead = chairs[0];
  return (
    <div className="bg-furn-linen font-text text-furn-ink">
      <FurnHeader />
      <main className="pt-[72px]">
        {/* ── the opening: the chair coming round in a pool of light ── */}
        <section className="relative overflow-hidden bg-[#15100C] text-furn-linen">
          <div className="relative mx-auto grid min-h-[calc(100svh-72px)] max-w-[1600px] items-center gap-4 px-5 py-12 md:grid-cols-[1.05fr_1fr] md:px-[6vw] md:py-16">
            <div>
              <nav aria-label="Breadcrumb" className="text-[12px] text-[rgba(238,231,223,0.6)]">
                <Link href="/furnishings#catalogue" data-no-transition className="hover:text-furn-linen">the house</Link>
                <span className="px-2">/</span>
                <Link href="/furnishings/office" data-no-transition className="hover:text-furn-linen">office &amp; study</Link>
                <span className="px-2">/</span>
                <span className="text-furn-linen">executive seating</span>
              </nav>
              <h1 className="mt-8 font-furn text-[clamp(64px,10vw,176px)] font-normal leading-[0.88]">{seatingWing.title}</h1>
              <p className="mt-8 max-w-xl text-[17px] font-light leading-relaxed text-[rgba(238,231,223,0.84)]">{seatingWing.body}</p>
              <ul className="mt-10 grid max-w-xl border-t border-[rgba(238,231,223,0.25)]">
                {seatingCollections.map((c, i) => (
                  <li key={c.id}>
                    <a href={`#${c.id}`} data-no-transition className="group flex items-baseline gap-4 border-b border-[rgba(238,231,223,0.25)] py-3 transition-colors hover:text-[#DEBA78]">
                      <span className="w-7 font-furn text-[15px] text-[#DEBA78]">{ROMAN[i]}</span>
                      <span className="flex-1 font-furn text-[clamp(18px,1.6vw,24px)] leading-tight">{c.name}</span>
                      <span className="text-[12px] text-[rgba(238,231,223,0.6)]">{chairs.filter((x) => x.collection === c.id).length}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative order-first h-[46svh] md:order-none md:h-[78svh]">
              <div aria-hidden="true" className="absolute -inset-[16%]" style={{ background: 'radial-gradient(closest-side, rgba(246,232,208,0.92) 0%, rgba(214,190,156,0.5) 55%, rgba(21,16,12,0) 100%)' }} />
              <HeroChair slug={lead.slug} title={chairTitle(lead)} />
            </div>
          </div>
        </section>

        {/* ── the three collections ── */}
        {seatingCollections.map((c, i) => (
          <section key={c.id} id={c.id} className="scroll-mt-[72px] px-5 py-20 md:px-[6vw] md:py-28">
            <div className="mx-auto max-w-[1600px]">
              <Reveal className="grid items-end gap-6 border-t border-furn-ink pt-6 md:grid-cols-[1.4fr_1fr]">
                <h2 className="font-furn text-[clamp(38px,5vw,88px)] font-normal leading-[0.96]">
                  <span className="mr-4 text-furn-walnut">{ROMAN[i]}</span>
                  {c.name}
                </h2>
                <p className="max-w-md text-base font-light leading-relaxed text-[#4A4640] md:justify-self-end">{c.intro}</p>
              </Reveal>
              <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16 lg:grid-cols-3 xl:grid-cols-4">
                {chairs.filter((x) => x.collection === c.id).map((chair) => (
                  <li key={chair.slug}>
                    <ChairCard chair={chair} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        {/* ── the rest of the range ── */}
        <section className="bg-[#E4DCD1] px-5 py-20 md:px-[6vw] md:py-24">
          <Reveal className="mx-auto flex max-w-[1600px] flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <h2 className="font-furn text-[clamp(40px,4.6vw,80px)] leading-[0.98]">The full seating catalogue</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed">These twenty are the house&apos;s selection. For the complete range, by model, our team will send the catalogue directly to you.</p>
            </div>
            <a href={catalogue} target="_blank" rel="noopener noreferrer" data-no-transition className="inline-block rounded-full bg-furn-ink px-7 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-furn-linen transition-colors hover:bg-furn-walnut">
              Request the catalogue
            </a>
          </Reveal>
        </section>
      </main>
      <FurnFooter />
    </div>
  );
}
