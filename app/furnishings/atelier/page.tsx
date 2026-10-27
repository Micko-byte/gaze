import type { Metadata } from 'next';
import Link from 'next/link';
import { FurnHeader } from '@/components/Furnishings/FurnHeader';
import { FurnFooter } from '@/components/Furnishings/FurnFooter';
import { AtelierStudio } from '@/components/Furnishings/AtelierStudio';

export const metadata: Metadata = {
  title: 'The Bespoke Atelier · Gaze Furnishings',
  description: 'Choose your fabric (velvet, bouclé, linen, chenille or leatherette), your colour and your finish, and see your piece take shape.',
};

/** The Bespoke Atelier, the client's fabric studio, as its own wing of the house. */
export default function AtelierPage() {
  return (
    <div className="bg-furn-linen font-text text-furn-ink">
      <FurnHeader />
      <main className="pt-[72px]">
        <section className="px-5 pb-24 pt-12 md:px-[6vw] md:pb-36 md:pt-16">
          <div className="mx-auto max-w-[1600px]">
            <nav aria-label="Breadcrumb" className="text-[12px] text-[#6F6A62]">
              <Link href="/furnishings#catalogue" data-no-transition className="hover:text-furn-ink">the house</Link>
              <span className="px-2">/</span>
              <span className="text-furn-ink">the atelier</span>
            </nav>
            <div className="mt-10 grid gap-10 border-b border-furn-ink pb-10 md:grid-cols-[1fr_1fr] md:items-end">
              <div>
                <p className="text-[12px] text-[#6F6A62]">the fabric studio</p>
                <h1 className="mt-3 font-furn text-[clamp(56px,7.4vw,132px)] font-normal leading-[0.92]">The Bespoke Atelier</h1>
              </div>
              <p className="max-w-md text-lg font-light leading-relaxed text-[#4A4640] md:justify-self-end">
                Five fabrics, each shown on the chair it was made for. Choose one, then a piece, a colour and a finish, and watch
                it take shape as you go.
              </p>
            </div>
            <div className="mt-12">
              <AtelierStudio />
            </div>
          </div>
        </section>
      </main>
      <FurnFooter />
    </div>
  );
}
