/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { books } from '@/content/library';
import { PressNav } from '@/components/Press/PressNav';
import { PressFooter } from '@/components/Press/PressFooter';
import { BookFeature } from '@/components/Press/BookFeature';
import { PressHowItWorks } from '@/components/Press/PressHowItWorks';
import { Reveal } from '@/components/Reveal/Reveal';

export const metadata: Metadata = {
  title: 'Gaze Press Global',
  description: 'An apex publishing house dedicated to permanent literature, foundational philosophy, and uncompromised truth. We do not merely print books. We archive legacy.',
};

/* The client's Authoring & Publishing Commission (5 Oct 2026). */
const commission = [
  { title: 'Rigorous editorial & proofreading suite', body: 'Deep structural editing, line editing, and meticulous proofreading, so your voice commands absolute clarity and authority.' },
  { title: 'Bespoke interior & exterior styling', body: 'A custom, high-end cover design and interior typography, matched to the aesthetic of international publishing houses.' },
  { title: 'Official global registration', body: 'Formal acquisition of your unique ISBN, securing your intellectual property within the global registry.' },
  { title: "The author's physical archive", body: 'Two author copies, in premium binding, delivered directly to your hands.' },
  { title: 'Ecosystem launch campaign', body: 'Promotion across Gaze Press Global and the wider Gaze Holdings networks, in front of leaders, executives, and high-net-worth readers.' },
];

const label = 'text-[17px] tracking-[-0.02em]';
/* Matthieu Givelet's system: one sans, regular, large and tight, with bracketed labels and small raised numbers. */
const big = 'font-text font-normal tracking-[-0.04em]';

export default function PressPage() {
  return (
    <div className="bg-press-paper font-text text-press-ink">
      <PressNav />
      <main>
        {/* ── hero: the name with a picture set into it ── */}
        <section id="top" className="px-5 pb-16 pt-36 text-center md:px-9 md:pt-40">
          <div data-loader-target>
            <h1 className="font-press-head text-[clamp(72px,13.5vw,232px)] font-normal leading-[0.9] tracking-[-0.02em]">
              Gaze{' '}
              <img
                src="/images/press/books/the-collection.jpg"
                alt="Five Gaze Press Global titles"
                className="inline-block h-[0.74em] w-[1.15em] rounded-[6px] object-cover object-[50%_40%] align-[-0.02em]"
              />{' '}
              Press
            </h1>
            <p className={`${big} mx-auto mt-10 max-w-[22ch] text-[clamp(28px,3.6vw,52px)] leading-[1.1]`}>
              We do not merely print books. We archive legacy. <span className="whitespace-nowrap">[ Nairobi ]</span>
            </p>
          </div>
        </section>

        {/* ── approach ── */}
        <section className="px-5 md:px-9">
          <Reveal className="grid gap-8 border-t border-[rgba(17,17,17,0.15)] pb-28 pt-10 md:grid-cols-[1fr_0.6fr_0.6fr]">
            <p className={label}>[ Approach ]</p>
            <p className={`${big} max-w-[24ch] text-[22px] leading-[1.24]`}>
              <span className="mr-10 align-top text-[11px] tracking-normal">01</span>
              An apex publishing house and media curation engine dedicated to permanent literature, foundational philosophy, and
              uncompromised truth.
            </p>
            <Link href="/press/commission" data-no-transition className={`${label} self-start md:justify-self-end`}>
              → Publish with us
            </Link>
          </Reveal>
        </section>

        {/* ── the library: an index, then a section for each book ── */}
        <section id="library" className="scroll-mt-[72px] px-5 md:px-9">
          <Reveal className="flex items-end justify-between gap-6">
            <h2 className={`${big} text-[clamp(44px,5vw,80px)] leading-none`}>The library</h2>
            <a href="#how" data-no-transition className={label}>→ How it works</a>
          </Reveal>
          <ol className="mt-12 border-t border-[rgba(17,17,17,0.15)]">
            {books.map((b, i) => (
              <li key={b.slug}>
                <a
                  href={`#book-${b.slug}`}
                  data-no-transition
                  className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 border-b border-[rgba(17,17,17,0.15)] py-5 md:grid-cols-[3rem_1.4fr_1fr_auto]"
                >
                  <span className="text-[11px]">{String(i + 1).padStart(2, '0')}</span>
                  <span className={`${big} text-[clamp(22px,2vw,32px)] leading-tight transition-transform duration-500 group-hover:translate-x-2`}>{b.title}</span>
                  <span className="col-start-2 text-[15px] text-[#5A5550] md:col-start-auto">{b.author}</span>
                  <span className="hidden text-[15px] md:block">{b.shelf === 'authors' ? '[ Our authors ]' : '[ House ]'}</span>
                </a>
              </li>
            ))}
          </ol>
        </section>
        <div className="mt-24">
          {books.map((b, i) => (
            <BookFeature key={b.slug} book={b} index={i} />
          ))}
        </div>

        <PressHowItWorks />

        {/* ── publish with us ── */}
        <section id="publish" className="scroll-mt-[72px] px-5 pb-28 md:px-9">
          <Reveal className="grid gap-8 border-t border-[rgba(17,17,17,0.15)] pt-10 md:grid-cols-[1fr_1.2fr]">
            <p className={label}>[ The Authoring &amp; Publishing Commission ]</p>
            <div>
              <h2 className={`${big} text-[clamp(40px,5vw,84px)] leading-[1]`}>
                We{' '}
                <span className="rounded-[4px] bg-press-rose px-[0.12em]">architect</span>{' '}
                literary legacies.
              </h2>
              <p className="mt-8 max-w-xl text-lg font-light leading-relaxed">
                To write a book is to deposit a piece of your mind into eternity. To publish with Gaze Press Global is to ensure
                your message is rendered with absolute distinction, uncompromising structural integrity, and elite market
                positioning.
              </p>
            </div>
          </Reveal>
          <Reveal className="mt-20 grid gap-10 md:grid-cols-[1fr_1.2fr]">
            <div>
              <p className={label}>[ The Sovereign Commission ]</p>
              <p className="mt-6 font-press-head text-[clamp(72px,9vw,160px)] leading-[0.9]">$500</p>
              <p className={`${label} mt-4 text-[#5A5550]`}>USD · Ksh 65,000 · all-inclusive</p>
              <Link href="/press/commission" data-no-transition className="mt-10 inline-block rounded-[3px] bg-press-ink px-[14px] py-[8px] text-[17px] tracking-[-0.02em] text-press-paper transition-colors hover:bg-press-rose hover:text-press-ink">
                Submit a manuscript
              </Link>
            </div>
            <ol className="border-t border-[rgba(17,17,17,0.15)]">
              {commission.map((c, i) => (
                <li key={c.title} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-[rgba(17,17,17,0.15)] py-6">
                  <span className="pt-1 text-[11px]">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className={`${big} text-[24px] leading-tight`}>{c.title}</h3>
                    <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-[#3D3935]">{c.body}</p>
                  </div>
                </li>
              ))}
              <li className="grid grid-cols-[3rem_1fr] gap-x-4 py-6">
                <span className="pt-1 text-[11px]">+</span>
                <div>
                  <h3 className={`${big} text-[24px] leading-tight`}>Printing, Ksh 500 – 1,000 a copy</h3>
                  <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-[#3D3935]">
                    Direct, high-grade printing for you and your readers, priced by paper stock, finish, and page count.
                  </p>
                </div>
              </li>
            </ol>
          </Reveal>
        </section>

        {/* ── buying ── */}
        <section id="buying" className="scroll-mt-[72px] px-5 pb-28 md:px-9">
          <Reveal className="grid gap-8 border-t border-[rgba(17,17,17,0.15)] pt-10 md:grid-cols-[1fr_0.6fr_0.6fr]">
            <p className={label}>[ Buying ]</p>
            <div>
              <p className={label}>In Kenya</p>
              <p className={`${big} mt-6 max-w-[18ch] text-[22px] leading-[1.24]`}>Order here and pay by M-Pesa, Visa, Mastercard or bank transfer, delivered to your door.</p>
            </div>
            <div>
              <p className={label}>Everywhere else</p>
              <p className={`${big} mt-6 max-w-[18ch] text-[22px] leading-[1.24]`}>Every title is available on Amazon.</p>
            </div>
          </Reveal>
        </section>

        {/* ── the archive ── */}
        <section id="archive" className="scroll-mt-[72px] px-5 pb-32 text-center md:px-9">
          <Reveal>
            <p className={label}>[ The archive ]</p>
            <p className="mx-auto mt-8 max-w-[22ch] font-press-head text-[clamp(40px,5vw,88px)] leading-[1.02]">
              True influence is not spoken into the wind; it is bound in permanence.
            </p>
            <p className="mt-10 font-press-script text-[clamp(36px,3.4vw,60px)] text-press-rose">Gaze Press Global</p>
          </Reveal>
        </section>
      </main>
      <PressFooter />
    </div>
  );
}
