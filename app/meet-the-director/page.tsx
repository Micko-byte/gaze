/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { books } from '@/content/library';
import { concierge, director, distinctions, engagement, portfolio } from '@/content/director';
import { Nav } from '@/components/Nav/Nav';
import { Footer } from '@/components/Footer/Footer';
import { Reveal } from '@/components/Reveal/Reveal';
import { KineticText } from '@/components/ui/KineticText';
import { BookingForm } from '@/components/Director/BookingForm';

export const metadata: Metadata = {
  title: `${director.office} · ${director.name}`,
  description: director.overview[0],
};

const posterOf = (slug: string) => books.find((b) => b.slug === slug)?.poster;

export default function MeetTheDirector() {
  return (
    <>
      <Nav />
      <main id="top">
        {/* ── hero ── */}
        <section className="relative overflow-hidden bg-gaze-navy px-6 pb-24 pt-36 text-gaze-parchment md:pb-32 md:pt-44">
          <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-[1.15fr_0.85fr]">
            <div data-loader-target>
              <p className="font-text text-[12px] uppercase tracking-[0.4em] text-gaze-champagne">{director.office}</p>
              <KineticText
                as="h1"
                mode="flip"
                start="top 95%"
                parts={[{ text: director.name }]}
                className="mt-6 font-headline text-[clamp(64px,9vw,148px)] leading-[0.92]"
              />
              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-text text-[12px] uppercase tracking-[0.24em] text-[rgba(243,239,230,0.75)]">
                {director.titles.map((t, i) => (
                  <li key={t} className="flex items-center gap-5">
                    {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gaze-champagne" />}
                    {t}
                  </li>
                ))}
              </ul>
              <blockquote className="mt-12 max-w-[30ch] font-headline text-[clamp(26px,2.6vw,40px)] leading-snug">
                “<span className="gold-sheen">{director.maxim}</span>”
              </blockquote>
            </div>
            <Reveal className="relative mx-auto w-full max-w-[400px]" y={40}>
              <span aria-hidden="true" className="absolute -right-4 -top-4 h-full w-full border border-gaze-champagne" />
              <img src="/images/founder/muthoni-ngugi-new.webp" alt={director.name} className="relative aspect-[591/1058] w-full object-cover" />
            </Reveal>
          </div>
        </section>

        {/* ── executive overview ── */}
        <section data-nav-theme="light" className="bg-gaze-parchment px-6 py-28 text-gaze-deep md:py-36">
          <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.9fr_1.1fr]">
            <KineticText
              parts={[{ text: director.overviewHeading }]}
              className="font-headline text-[clamp(40px,4.6vw,72px)] leading-[1.02]"
            />
            <Reveal className="grid gap-6 font-text text-[17px] font-light leading-[1.75] text-[rgba(6,18,42,0.85)]">
              {director.overview.map((p, i) => (
                <p key={i} className={i === 0 ? 'first-letter:float-left first-letter:mr-3 first-letter:font-headline first-letter:text-[72px] first-letter:leading-[0.8] first-letter:text-[#AE8448]' : ''}>
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ── recognitions ── */}
        <section data-nav-theme="light" className="bg-[#DEBA78] px-6 py-28 text-gaze-navy md:py-36">
          <div className="mx-auto max-w-6xl">
            <p className="font-text text-[12px] uppercase tracking-[0.4em]">{distinctions.heading}</p>
            <KineticText
              mode="flip"
              parts={[{ text: `“${distinctions.maxim}”` }]}
              className="mt-6 max-w-[26ch] font-headline text-[clamp(30px,3.4vw,54px)] leading-[1.15]"
            />
            <ul className="mt-16 grid gap-px bg-[rgba(6,18,42,0.25)] md:grid-cols-2">
              {distinctions.items.map((d, i) => (
                <li key={d.title} className="bg-[#DEBA78] py-8 md:p-10">
                  <Reveal delay={i * 0.06}>
                    <p className="font-text text-[11px] uppercase tracking-[0.28em] text-[#5A4422]">{d.from}</p>
                    <h3 className="mt-3 font-headline text-[clamp(24px,2.2vw,34px)] leading-tight">{d.title}</h3>
                    <p className="mt-4 font-text text-[15px] font-light leading-relaxed text-[rgba(6,18,42,0.85)]">{d.body}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── how to engage ── */}
        <section data-nav-theme="light" className="bg-gaze-parchment px-6 py-28 text-gaze-deep md:py-36">
          <div className="mx-auto max-w-6xl">
            <KineticText parts={[{ text: engagement.heading }]} className="max-w-[18ch] font-headline text-[clamp(40px,4.6vw,72px)] leading-[1.02]" />
            <ol className="mt-16 grid gap-12 md:grid-cols-3">
              {engagement.pillars.map((p, i) => (
                <li key={p.title} className="border-t border-gaze-deep pt-6">
                  <Reveal delay={i * 0.08}>
                    <span className="font-headline text-[56px] leading-none text-[#AE8448]">{i + 1}</span>
                    <h3 className="mt-4 font-headline text-[clamp(24px,2vw,30px)] leading-tight">{p.title}</h3>
                    <p className="mt-4 font-text text-[15px] font-light leading-relaxed text-[rgba(6,18,42,0.82)]">{p.body}</p>
                    {'points' in p && p.points && (
                      <ul className="mt-5 grid gap-2 font-text text-[14px] text-gaze-deep">
                        {p.points.map((pt) => (
                          <li key={pt} className="flex gap-3">
                            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#AE8448]" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    )}
                    {'href' in p && p.href && (
                      <Link href={p.href} className="mt-6 inline-block font-text text-[12px] uppercase tracking-[0.24em] text-rose-ink hover:underline">
                        Visit the house →
                      </Link>
                    )}
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── published literary portfolio ── */}
        <section className="bg-gaze-navy px-6 py-28 text-gaze-parchment md:py-36">
          <div className="mx-auto grid max-w-6xl items-start gap-16 md:grid-cols-[0.8fr_1.2fr]">
            <Reveal className="md:sticky md:top-28">
              <p className="font-text text-[12px] uppercase tracking-[0.4em] text-gaze-champagne">Published literary portfolio</p>
              <h2 className="mt-5 font-headline text-[clamp(40px,4.6vw,72px)] leading-none">Gaze Press core titles</h2>
              <img src="/images/founder/muthoni-ngugi-book.jpg" alt={`${director.name} with My Journey as a Kingdom Wife to Be`} className="mt-10 w-full max-w-[420px] object-cover" />
            </Reveal>
            <ol className="border-t border-[rgba(243,239,230,0.2)]">
              {portfolio.map((b, i) => {
                const poster = posterOf(b.slug);
                return (
                  <li key={b.slug}>
                    <Link href={`/press/books/${b.slug}`} className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-5 border-b border-[rgba(243,239,230,0.2)] py-6">
                      <span className="font-text text-[12px] text-gaze-champagne">0{i + 1}</span>
                      <span>
                        <span className="block font-headline text-[clamp(24px,2.4vw,36px)] leading-tight transition-colors group-hover:text-gaze-champagne">{b.title}</span>
                        <span className="mt-1 block font-text text-[14px] font-light text-[rgba(243,239,230,0.7)]">{b.sub}</span>
                      </span>
                      {poster ? (
                        <img src={poster} alt="" className="h-20 w-14 object-cover opacity-80 transition-[opacity,transform] duration-500 group-hover:-translate-y-1 group-hover:opacity-100" />
                      ) : (
                        <span aria-hidden="true" className="font-text text-lg transition-transform group-hover:translate-x-1">→</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ── concierge & executive booking ── */}
        <section id="booking" data-nav-theme="light" className="bg-gaze-parchment px-6 py-28 text-gaze-deep md:py-36">
          <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-text text-[12px] uppercase tracking-[0.4em] text-rose-ink">Direct concierge &amp; executive booking</p>
              <KineticText parts={[{ text: concierge.heading }]} className="mt-5 font-headline text-[clamp(40px,4.4vw,68px)] leading-[1.02]" />
              <p className="mt-6 font-text text-[16px] font-light leading-relaxed text-[rgba(6,18,42,0.82)]">{concierge.body}</p>
              <dl className="mt-10 grid gap-5 font-text text-[15px]">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.26em] text-[rgba(6,18,42,0.6)]">Direct office inquiry</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${concierge.email}`} className="font-medium text-gaze-deep underline decoration-[#AE8448] underline-offset-4">{concierge.email}</a>
                  </dd>
                </div>
                {concierge.lines.map((l) => (
                  <div key={l}>
                    <dt className="text-[11px] uppercase tracking-[0.26em] text-[rgba(6,18,42,0.6)]">{l}</dt>
                    <dd className="mt-1 text-[rgba(6,18,42,0.6)]">Number to be announced</dd>
                  </div>
                ))}
              </dl>
            </div>
            <BookingForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
