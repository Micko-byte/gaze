import type { Metadata } from 'next';
import Link from 'next/link';
import { furnContact } from '@/content/furnishings';
import { FurnHeader } from '@/components/Furnishings/FurnHeader';
import { FurnFooter } from '@/components/Furnishings/FurnFooter';
import { MasterTerms } from '@/components/Furnishings/MasterTerms';

export const metadata: Metadata = {
  title: 'Master Terms & Conditions · Gaze Furnishings',
  description: 'The terms under which Gaze Furnishings Kenya Limited quotes, makes, supplies, delivers and installs every commission.',
};

/** Her Master Terms & Conditions, in full. */
export default function FurnTermsPage() {
  return (
    <div className="bg-furn-linen font-text text-furn-ink">
      <FurnHeader />
      <main className="pt-[72px]">
        <section className="px-5 pb-24 pt-12 md:px-[6vw] md:pb-36 md:pt-16">
          <div className="mx-auto max-w-[1600px]">
            <nav aria-label="Breadcrumb" className="text-[12px] text-[#6F6A62]">
              <Link href="/furnishings" data-no-transition className="hover:text-furn-ink">the house</Link>
              <span className="px-2">/</span>
              <span className="text-furn-ink">terms &amp; conditions</span>
            </nav>
            <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_1.5fr]">
              <div className="lg:sticky lg:top-[112px] lg:self-start">
                <p className="text-[12px] text-[#6F6A62]">Gaze Furnishings Kenya Limited · a member of the Gaze Group of Companies</p>
                <h1 className="mt-4 font-furn text-[clamp(48px,6vw,104px)] font-normal leading-[0.94]">Master Terms &amp; Conditions</h1>
                <p className="mt-8 max-w-sm text-base font-light leading-relaxed text-[#4A4640]">
                  By confirming an order or making any payment, you accept these terms. Questions about them go to{' '}
                  <a href={`mailto:${furnContact.email}`} className="underline underline-offset-4">{furnContact.email}</a> or{' '}
                  <a href={`tel:${furnContact.phones[0].tel}`} className="whitespace-nowrap underline underline-offset-4">{furnContact.phones[0].label}</a>.
                </p>
                <p className="mt-6 text-[13px] text-[#6F6A62]">
                  Commissioning from outside Kenya?{' '}
                  <Link href="/furnishings/international" data-no-transition className="underline underline-offset-4">The Worldwide Atelier</Link>
                </p>
              </div>
              <div className="border-t border-furn-ink pt-10">
                <MasterTerms />
              </div>
            </div>
          </div>
        </section>
      </main>
      <FurnFooter />
    </div>
  );
}
