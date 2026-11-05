import type { Metadata } from 'next';
import Link from 'next/link';
import { FurnHeader } from '@/components/Furnishings/FurnHeader';
import { FurnFooter } from '@/components/Furnishings/FurnFooter';
import { BespokeRequest } from '@/components/Furnishings/BespokeRequest';

export const metadata: Metadata = {
  title: 'Your Own Design · Gaze Furnishings',
  description: 'Send a picture and your specifications for a piece that is not in the catalogue, or speak with a representative.',
};

/** Her add-on brief of Oct 2026: a clean place to ask for a piece that isn't in the catalogue. */
export default function BespokePage() {
  return (
    <div className="bg-furn-linen font-text text-furn-ink">
      <FurnHeader />
      <main className="px-5 pb-28 pt-[120px] md:px-[6vw] md:pt-[140px]">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <nav aria-label="Breadcrumb" className="text-[12px] text-[#6F6A62]">
              <Link href="/furnishings#catalogue" data-no-transition className="hover:text-furn-ink">the catalogue</Link>
              <span className="px-2">/</span>
              <span className="text-furn-ink">your own design</span>
            </nav>
            <h1 className="mt-8 font-furn text-[clamp(48px,6.4vw,112px)] font-normal leading-[0.94]">Your own design</h1>
            <p className="mt-6 max-w-md text-lg font-light leading-relaxed text-[#4A4640]">
              Seen something you love, or sketched something of your own? Show us, tell us what you need, and we will make it to measure.
            </p>
          </div>
          <BespokeRequest />
        </div>
      </main>
      <FurnFooter />
    </div>
  );
}
