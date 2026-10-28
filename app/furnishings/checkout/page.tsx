import type { Metadata } from 'next';
import { FurnHeader } from '@/components/Furnishings/FurnHeader';
import { FurnFooter } from '@/components/Furnishings/FurnFooter';
import { Checkout } from '@/components/Furnishings/Checkout';

export const metadata: Metadata = {
  title: 'Checkout · Gaze Furnishings',
  robots: { index: false },
};

/** The one-page checkout for the bag. */
export default function CheckoutPage() {
  return (
    <div className="bg-furn-linen font-text text-furn-ink">
      <FurnHeader />
      <main className="px-5 pb-28 pt-[120px] md:px-[6vw] md:pt-[140px]">
        <div className="mx-auto max-w-[1400px]">
          <Checkout />
        </div>
      </main>
      <FurnFooter />
    </div>
  );
}
