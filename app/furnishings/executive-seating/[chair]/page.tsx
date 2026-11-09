import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { chairs, chairTitle, seatingCollections } from '@/content/executiveSeating';
import { FurnHeader } from '@/components/Furnishings/FurnHeader';
import { FurnFooter } from '@/components/Furnishings/FurnFooter';
import { ChairBuy } from '@/components/Furnishings/Seating/ChairBuy';
import { ChairCard } from '@/components/Furnishings/Seating/ChairCard';
import { Turntable } from '@/components/Furnishings/Seating/Turntable';

type Props = { params: { chair: string } };

export function generateStaticParams() {
  return chairs.map((c) => ({ chair: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const chair = chairs.find((c) => c.slug === params.chair);
  if (!chair) return {};
  return { title: `${chairTitle(chair)} · Executive Seating · Gaze Furnishings`, description: chair.line };
}

const cap = 'text-[10px] font-medium uppercase tracking-[0.2em] text-[#8A847A]';

export default function ChairPage({ params }: Props) {
  const chair = chairs.find((c) => c.slug === params.chair);
  if (!chair) notFound();
  const collection = seatingCollections.find((c) => c.id === chair.collection)!;
  const title = chairTitle(chair);
  const more = chairs.filter((c) => c.collection === chair.collection && c.slug !== chair.slug).slice(0, 4);

  return (
    <div id="top" className="bg-furn-linen font-text text-furn-ink">
      <FurnHeader />
      <main className="pt-[72px]">
        <section data-turn-scroll className="grid md:grid-cols-12">
          <div className="min-w-0 md:sticky md:top-[72px] md:col-span-7 md:h-[calc(100svh-72px)] md:self-start">
            <Turntable slug={chair.slug} title={title} />
          </div>

          <div className="min-w-0 px-5 pb-20 pt-10 md:col-span-5 md:px-[4vw] md:pb-28 md:pt-14">
            <nav aria-label="Breadcrumb" className="text-[12px] text-[#6F6A62]">
              <Link href="/furnishings/executive-seating" data-no-transition className="hover:text-furn-ink">executive seating</Link>
              <span className="px-2">/</span>
              <Link href={`/furnishings/executive-seating#${collection.id}`} data-no-transition className="hover:text-furn-ink">{collection.name.replace(/^The /, '').toLowerCase()}</Link>
            </nav>
            <h1 className="mt-8 font-furn text-[clamp(52px,6vw,104px)] font-normal leading-[0.92]">{chair.name}</h1>
            <p className="mt-3 font-furn text-[22px] italic text-[#6F6A62]">{chair.finish && chair.finish !== 'Black' ? `${chair.finish}, ` : ''}{chair.kind.toLowerCase()}</p>
            <p className="mt-6 max-w-md text-lg font-light leading-relaxed text-[#4A4640]">{chair.line}</p>

            <ChairBuy chair={chair} />

            <p className="mt-10 max-w-md text-[15px] font-light leading-relaxed text-[#4A4640]">{chair.body}</p>

            <h2 className={`mt-12 ${cap}`}>Specification</h2>
            <dl className="mt-3 max-w-md border-t border-[rgba(30,30,34,0.15)]">
              {chair.specs.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-[rgba(30,30,34,0.15)] py-3 text-[14px]">
                  <dt className="text-[#6F6A62]">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>

            {chair.dims && (
              <>
                <h2 className={`mt-12 ${cap}`}>Dimensions, approximate</h2>
                <dl className="mt-3 grid max-w-md grid-cols-2 gap-x-6 border-t border-[rgba(30,30,34,0.15)]">
                  {chair.dims.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-b border-[rgba(30,30,34,0.15)] py-3 text-[14px]">
                      <dt className="text-[#6F6A62]">{k}</dt>
                      <dd className="tabular-nums">{v} cm</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </div>
        </section>

        <section className="bg-white px-5 py-20 md:px-[6vw] md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <h2 className="border-t border-furn-ink pt-6 font-furn text-[clamp(30px,3vw,48px)]">more from {collection.name.replace(/^The /, 'the ')}</h2>
            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-8 lg:grid-cols-4">
              {more.map((c) => (
                <li key={c.slug}>
                  <ChairCard chair={c} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <FurnFooter />
    </div>
  );
}
