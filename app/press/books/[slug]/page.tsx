/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { books } from '@/content/library';
import { PressNav } from '@/components/Press/PressNav';
import { PressFooter } from '@/components/Press/PressFooter';
import { BookHero } from '@/components/Press/BookHero';
import { BookOrder } from '@/components/Press/BookOrder';
import { PressMotion } from '@/components/Press/PressMotion';
import { bookNotes } from '@/content/bookNotes';

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
  const note = bookNotes[book.slug];

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
        {note && (
          <section className="px-5 pt-24 md:px-9">
            <div className="grid gap-8 border-t border-[rgba(17,17,17,0.15)] pt-10 md:grid-cols-[1fr_2.2fr]">
              <p className="text-[17px] tracking-[-0.02em]">[ About the book ]</p>
              <div>
                <blockquote data-rise className="max-w-[24ch] font-press-head text-[clamp(32px,3.6vw,60px)] leading-[1.08]">
                  “{note.epigraph}”
                </blockquote>
                <div className="mt-14 grid max-w-[62ch] gap-6 text-[19px] leading-[1.6] tracking-[-0.01em]">
                  {note.intro.map((p, i) => (
                    <p key={i} data-ink>{p}</p>
                  ))}
                </div>
                <div className="mt-20 grid gap-14 md:grid-cols-2">
                  <div>
                    <p className="text-[17px] tracking-[-0.02em]">[ Inside the book ]</p>
                    <ol className="mt-6 grid gap-6">
                      {note.inside.map((x, i) => (
                        <li key={x.title} className="grid grid-cols-[2rem_1fr] gap-2 border-t border-[rgba(17,17,17,0.15)] pt-4">
                          <span className="text-[11px] leading-[2]">0{i + 1}</span>
                          <span>
                            <span className="block text-[20px] tracking-[-0.02em]">{x.title}</span>
                            <span className="mt-1 block text-[15px] leading-relaxed text-[rgba(17,17,17,0.72)]">{x.body}</span>
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <p className="text-[17px] tracking-[-0.02em]">[ Who this book is for ]</p>
                    <ul className="mt-6 grid gap-6">
                      {note.forWhom.map((x) => (
                        <li key={x.title} className="rounded-[6px] p-6" style={{ background: book.tone, color: book.ink }}>
                          <span className="block text-[20px] tracking-[-0.02em]">{x.title}</span>
                          <span className="mt-1 block text-[15px] leading-relaxed opacity-80">{x.body}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
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
      <PressMotion />
    </div>
  );
}
