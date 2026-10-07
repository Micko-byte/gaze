import type { Metadata } from 'next';
import { PressNav } from '@/components/Press/PressNav';
import { PressFooter } from '@/components/Press/PressFooter';
import { AgreementForm } from '@/components/Press/AgreementForm';

export const metadata: Metadata = {
  title: 'Publishing & Literary Commission · Gaze Press Global',
  description: 'Submit your manuscript and sign the Gaze Press Global Publishing & Literary Commission Agreement.',
};

/** Where an author submits a manuscript and signs the commission agreement. */
export default function PressCommissionPage() {
  return (
    <div className="bg-press-paper font-text text-press-ink">
      <PressNav />
      <main className="px-5 pb-28 pt-36 md:px-10 md:pt-44">
        <div className="mx-auto max-w-[1100px]">
          <div data-loader-target className="max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-press-rose">The Sovereign Commission · $500 · Ksh 65,000</p>
            <h1 className="mt-6 font-press-head text-[clamp(44px,6vw,104px)] font-normal leading-[0.96]">Commission your book.</h1>
            <p className="mt-8 max-w-xl text-lg font-light leading-relaxed">
              Tell us about yourself and your manuscript, read the Publishing &amp; Literary Commission Agreement, and sign it
              here. Gaze Press Global reviews every manuscript before countersigning.
            </p>
          </div>
          <div className="mt-20">
            <AgreementForm />
          </div>
        </div>
      </main>
      <PressFooter />
    </div>
  );
}
