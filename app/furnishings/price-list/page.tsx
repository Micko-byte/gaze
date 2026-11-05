import type { Metadata } from 'next';
import { PriceSheet } from '@/components/Furnishings/PriceSheet';
import { HouseLogo } from '@/components/Logo/HouseLogo';

export const metadata: Metadata = {
  title: 'Price list · Gaze Furnishings',
  robots: { index: false, follow: false },
};

/** Where the client sets her prices. Reached by its link only: nothing on the site points here. */
export default function PriceListPage() {
  return (
    <div className="min-h-screen bg-furn-linen font-text text-furn-ink">
      <div className="border-b border-[rgba(30,30,34,0.12)] px-5 py-4 md:px-[6vw]">
        <HouseLogo id="furnishings" title="Gaze Furnishings" className="h-9 w-auto" />
      </div>
      <main className="mx-auto max-w-[1500px] px-5 pt-12 md:px-[6vw]">
        <PriceSheet />
      </main>
    </div>
  );
}
