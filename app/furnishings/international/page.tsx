import type { Metadata } from 'next';
import Link from 'next/link';
import { furnContact } from '@/content/furnishings';
import { international as w } from '@/content/international';
import { FurnHeader } from '@/components/Furnishings/FurnHeader';
import { FurnFooter } from '@/components/Furnishings/FurnFooter';
import { Reveal } from '@/components/Reveal/Reveal';

export const metadata: Metadata = {
  title: 'The Worldwide Atelier · Gaze Furnishings & Gaze Manor',
  description: 'Global export and international commissions: from our Nairobi master ateliers to your doorstep anywhere in the world.',
};

const cap = 'text-[10px] font-medium uppercase tracking-[0.28em]';
const pill = 'inline-block rounded-full px-7 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.22em] transition-colors';
const mail = (subject: string) => `mailto:${furnContact.email}?subject=${encodeURIComponent(subject)}`;

/** The Worldwide Atelier: her terms for international clients, on a page of their own. */
export default function InternationalPage() {
  return (
    <div className="bg-furn-linen font-text text-furn-ink">
      <FurnHeader />
      <main className="pt-[72px]">
        {/* ── the opening ── */}
        <section className="bg-furn-ink px-5 pb-20 pt-14 text-furn-linen md:px-[6vw] md:pb-28 md:pt-20">
          <div className="mx-auto max-w-[1600px]">
            <nav aria-label="Breadcrumb" className="text-[12px] text-[rgba(238,231,223,0.6)]">
              <Link href="/furnishings" data-no-transition className="hover:text-furn-linen">the house</Link>
              <span className="px-2">/</span>
              <span className="text-furn-linen">the worldwide atelier</span>
            </nav>
            <p className={`mt-12 ${cap} text-[rgba(238,231,223,0.6)]`}>{w.eyebrow}</p>
            <h1 className="mt-5 font-furn text-[clamp(56px,9vw,168px)] font-normal leading-[0.9]">{w.title}</h1>
            <div className="mt-14 grid gap-10 border-t border-[rgba(238,231,223,0.25)] pt-10 md:grid-cols-[1fr_1.2fr]">
              <div>
                <p className="text-[12px] text-[rgba(238,231,223,0.6)]">{w.tagline}</p>
                <h2 className="mt-4 font-furn text-[clamp(32px,3.4vw,56px)] leading-[1.02]">{w.headline}</h2>
              </div>
              <div className="grid gap-5 text-lg font-light leading-relaxed text-[rgba(238,231,223,0.85)]">
                {w.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── the framework ── */}
        <section className="px-5 py-20 md:px-[6vw] md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <Reveal className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-end">
              <h2 className="font-furn text-[clamp(40px,4.6vw,80px)] leading-[0.98]">{w.frameworkTitle}</h2>
              <p className="max-w-lg text-base font-light leading-relaxed text-[#4A4640]">{w.frameworkIntro}</p>
            </Reveal>
            <ol className="mt-14 grid gap-px bg-[rgba(30,30,34,0.15)] md:grid-cols-2 lg:grid-cols-3">
              {w.framework.map((f, i) => (
                <li key={f.label} className="bg-furn-linen py-8 md:p-8">
                  <span className="font-furn text-4xl text-furn-walnut">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-4 text-lg font-medium">{f.label}</h3>
                  <p className="mt-2 text-[15px] font-light leading-relaxed text-[#4A4640]">{f.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── the pathways ── */}
        <section className="bg-white px-5 py-20 md:px-[6vw] md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <h2 className="border-t border-furn-ink pt-6 font-furn text-[clamp(32px,3.2vw,52px)]">{w.pathwaysTitle}</h2>
            <ul className="mt-10 grid gap-10 md:grid-cols-3">
              {w.pathways.map((p, i) => (
                <li key={p.label}>
                  <Reveal delay={i * 0.08}>
                    <h3 className="font-furn text-[clamp(26px,2.4vw,38px)] leading-tight">{p.label}</h3>
                    <p className="mt-3 text-[15px] font-light leading-relaxed text-[#4A4640]">{p.body}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── initiate ── */}
        <section className="bg-[#E4DCD1] px-5 py-20 md:px-[6vw] md:py-24">
          <Reveal className="mx-auto flex max-w-[1600px] flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <h2 className="font-furn text-[clamp(40px,4.6vw,80px)] leading-[0.98]">{w.closingTitle}</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed">{w.closing}</p>
              <p className="mt-6 text-[13px]">
                Every international commission is made under our{' '}
                <Link href="/furnishings/terms" data-no-transition className="underline underline-offset-4">Master Terms &amp; Conditions</Link>.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={mail('Virtual design consultation')} className={`${pill} bg-furn-ink text-furn-linen hover:bg-furn-walnut`}>Schedule a Virtual Design Consultation</a>
              <a href={mail('Global export inquiry')} className={`${pill} ring-1 ring-furn-ink hover:bg-furn-ink hover:text-furn-linen`}>Inquire with the Global Export Desk</a>
            </div>
          </Reveal>
        </section>
      </main>
      <FurnFooter />
    </div>
  );
}
