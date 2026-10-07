import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { collections, pieces } from '@/content/furnishings';
import { FurnHeader } from '@/components/Furnishings/FurnHeader';
import { FurnFooter } from '@/components/Furnishings/FurnFooter';
import { FurnitureDrawing } from '@/components/Furnishings/FurnitureDrawing';
import { CommissionForm } from '@/components/Furnishings/CommissionForm';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return pieces.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const piece = pieces.find((p) => p.slug === params.slug);
  if (!piece) return {};
  return { title: `${piece.name} · Gaze Furnishings`, description: `${piece.line} Made to commission in Nairobi.` };
}

/** A piece of the catalogue: its spread, then its commission. */
export default function PiecePage({ params }: Props) {
  const piece = pieces.find((p) => p.slug === params.slug);
  if (!piece) notFound();
  const room = collections.find((c) => c.id === piece.room)!;
  const more = pieces.filter((p) => p.room === piece.room && p.slug !== piece.slug);

  return (
    <div id="top" className="bg-furn-linen font-text text-furn-ink">
      <FurnHeader />
      <main className="pt-[72px]">
        {/* ── the spread ── */}
        <section className="px-5 py-12 md:px-[6vw] md:py-20">
          <div className="mx-auto max-w-[1600px]">
            <nav aria-label="Breadcrumb" className="text-[12px] text-[#6F6A62]">
              <Link href="/furnishings#catalogue" data-no-transition className="hover:text-furn-ink">the catalogue</Link>
              <span className="px-2">/</span>
              <Link href={`/furnishings#${room.id}`} data-no-transition className="hover:text-furn-ink">{room.name.toLowerCase()}</Link>
              <span className="px-2">/</span>
              <span className="text-furn-ink">{piece.name}</span>
            </nav>
            <div className="mt-10 grid items-end gap-12 md:grid-cols-12">
              <div data-loader-target className="relative flex aspect-[4/3] items-center justify-center bg-[#F6F1EA] md:col-span-7">
                <FurnitureDrawing kind={piece.drawing} className="w-[74%] text-furn-ink" />
                {piece.decided && <span className="absolute left-5 top-5 rounded-full bg-furn-lilac px-3 py-1 text-[11px]">signature</span>}
              </div>
              <div className="md:col-span-5 md:pl-6">
                <p className="text-[12px] text-[#6F6A62]">{room.name.toLowerCase()} · named for the {piece.animal}</p>
                <h1 className="mt-4 font-furn text-[clamp(56px,7vw,124px)] font-normal leading-[0.92]">{piece.name}</h1>
                <p className="mt-3 text-[15px] text-[#6F6A62]">{piece.kind}</p>
                <p className="mt-8 max-w-md text-lg font-light leading-relaxed text-[#4A4640]">{piece.line}</p>
                <dl className="mt-10 grid max-w-md grid-cols-2 gap-y-6 border-t border-[rgba(30,30,34,0.15)] pt-6 text-[13px]">
                  <div>
                    <dt className="text-[#6F6A62]">price</dt>
                    <dd className="mt-1 inline-block min-w-[120px] border-b border-dashed border-[rgba(30,30,34,0.35)] font-furn text-2xl">{piece.price ?? 'to follow'}</dd>
                  </div>
                  <div>
                    <dt className="text-[#6F6A62]">made to order</dt>
                    <dd className="mt-1 font-furn text-2xl">14–21 days</dd>
                  </div>
                  <div>
                    <dt className="text-[#6F6A62]">size</dt>
                    <dd className="mt-1 font-furn text-2xl">to your room</dd>
                  </div>
                  <div>
                    <dt className="text-[#6F6A62]">delivery</dt>
                    <dd className="mt-1 font-furn text-2xl">worldwide</dd>
                  </div>
                </dl>
                <a href="#commission" data-no-transition className="mt-10 inline-block rounded-full bg-furn-ink px-8 py-4 text-[13px] text-furn-linen transition-colors hover:bg-furn-walnut">
                  begin your commission
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── the commission ── */}
        <section id="commission" className="scroll-mt-[72px] bg-white px-5 py-20 md:px-[6vw] md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-16 max-w-2xl">
              <p className="text-[12px] text-[#6F6A62]">the commission</p>
              <h2 className="mt-3 font-furn text-[clamp(40px,4.6vw,80px)] leading-[0.96]">Make the {piece.name.split(' ')[0]} yours</h2>
              <p className="mt-5 text-base font-light leading-relaxed text-[#4A4640]">
                Seven short steps: your measurements, fabric and colour, your own design, a word to the atelier, and your
                signature. A representative then confirms everything with you before a single cut is made.
              </p>
            </div>
            <CommissionForm piece={piece} />
          </div>
        </section>

        {/* ── more from the room ── */}
        {more.length > 0 && (
          <section className="px-5 py-20 md:px-[6vw] md:py-28">
            <div className="mx-auto max-w-[1600px]">
              <h2 className="border-t border-furn-ink pt-6 font-furn text-[clamp(30px,3vw,48px)]">more from {room.name.toLowerCase()}</h2>
              <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {more.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/furnishings/${p.slug}`} data-no-transition className="group block">
                      <div className="flex aspect-[4/3] items-center justify-center bg-[#F6F1EA] transition-colors duration-700 group-hover:bg-[#EADFD2]">
                        <FurnitureDrawing kind={p.drawing} className="w-[70%] text-furn-ink" />
                      </div>
                      <p className="mt-3 font-furn text-2xl">{p.name}</p>
                      <p className="text-[12px] text-[#6F6A62]">{p.kind}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <FurnFooter />
    </div>
  );
}
