/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { books } from '@/content/library';
import { PressNav } from '@/components/Press/PressNav';
import { PressFooter } from '@/components/Press/PressFooter';
import { BookHero } from '@/components/Press/BookHero';
import { BookOrder } from '@/components/Press/BookOrder';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const book = books.find((b) => b.slug === params.slug);
  if (!book) return {};
  return { title: `${book.title} · Gaze Press Global`, description: `${book.title}: ${book.sub}. By ${book.author}.` };
}

/** A book's own page: its library section opened out to the full screen, then the ways to buy it. */
export default function BookPage({ params }: Props) {
  const book = books.find((b) => b.slug === params.slug);
  if (!book) notFound();
  const others = books.filter((b) => b.slug !== book.slug).slice(0, 4);

  return (
    <div className="bg-press-paper font-text text-press-ink">
      <PressNav />
      <main>
        <BookHero
          book={book}
          full
          action={
            <a href="#buy" data-no-transition className="inline-block rounded-full px-7 py-3.5 text-[14px] tracking-[-0.01em]" style={{ background: book.ink, color: book.tone }}>
              Buy this book
            </a>
          }
        />
        <section id="buy" className="scroll-mt-[72px] px-5 py-24 md:px-9">
          <div className="grid gap-8 border-t border-[rgba(17,17,17,0.15)] pt-10 md:grid-cols-[1fr_2.2fr]">
            <p className="text-[17px] tracking-[-0.02em]">[ Buy {book.title} ]</p>
            <BookOrder book={book} />
          </div>
        </section>
        <section className="px-5 pb-28 md:px-9">
          <div className="flex items-end justify-between gap-6 border-t border-[rgba(17,17,17,0.15)] pt-10">
            <h2 className="text-[clamp(32px,3.4vw,52px)] leading-none tracking-[-0.04em]">More from the library</h2>
            <Link href="/press#library" data-no-transition className="text-[17px] tracking-[-0.02em]">→ All books</Link>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((b) => (
              <li key={b.slug}>
                <Link href={`/press/books/${b.slug}`} data-no-transition className="group block">
                  <div className="flex aspect-[4/5] items-center justify-center overflow-hidden p-6" style={{ background: b.tone }}>
                    {b.poster ? (
                      <img src={b.poster} alt="" className="max-h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.04]" />
                    ) : (
                      <p className="text-center font-press-head text-3xl" style={{ color: b.ink }}>{b.title}</p>
                    )}
                  </div>
                  <p className="mt-3 text-[17px] tracking-[-0.02em]">{b.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <PressFooter />
    </div>
  );
}
