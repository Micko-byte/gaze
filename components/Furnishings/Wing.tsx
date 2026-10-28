/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { collections, pieces, wingCopy } from '@/content/furnishings';
import { FurnHeader } from './FurnHeader';
import { FurnFooter } from './FurnFooter';
import { FurnitureDrawing } from './FurnitureDrawing';
import { ROMAN, WingPieces } from './Catalogue';
import { Reveal } from '@/components/Reveal/Reveal';

const cap = 'text-[10px] font-medium uppercase tracking-[0.28em]';
const pill = 'inline-block rounded-full px-7 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.22em] transition-colors';

/**
 * One wing of the house, on its own page: the wing's numeral, name and opening picture (or film), every piece in it,
 * then the way on to the atelier and to the next wing. Where she has written the wing up (office, outdoor), her
 * collection, signature piece, terms, highlights and commission call follow her copy.
 */
export function Wing({ room }: { room: (typeof collections)[number] }) {
  const i = collections.indexOf(room);
  const next = collections[(i + 1) % collections.length];
  const count = pieces.filter((p) => p.room === room.id).length;
  const copy = wingCopy[room.id];
  const signature = copy?.signature && pieces.find((p) => p.slug === copy.signature!.slug);

  return (
    <div className="bg-furn-linen font-text text-furn-ink">
      <FurnHeader />
      <main className="pt-[72px]">
        {/* ── the wing's opening spread ── */}
        <section className="px-5 pb-16 pt-12 md:px-[6vw] md:pb-24 md:pt-16">
          <div className="mx-auto max-w-[1600px]">
            <nav aria-label="Breadcrumb" className="text-[12px] text-[#6F6A62]">
              <Link href="/furnishings#catalogue" data-no-transition className="hover:text-furn-ink">the house</Link>
              <span className="px-2">/</span>
              <span className="text-furn-ink">{room.name.toLowerCase()}</span>
            </nav>
            <div className="mt-10 grid items-end gap-12 md:grid-cols-[1.1fr_1fr]">
              <Reveal>
                <span className="block font-furn text-[clamp(72px,10vw,184px)] leading-[0.8] text-furn-walnut">{ROMAN[i]}</span>
                <p className="mt-8 text-[12px] text-[#6F6A62]">
                  {copy ? copy.eyebrow.toLowerCase() : `wing ${ROMAN[i].toLowerCase()}`} · {count} pieces
                </p>
                <h1 className="mt-2 font-furn text-[clamp(56px,8vw,148px)] font-normal leading-[0.9]">{copy?.title ?? room.name}</h1>
                {copy ? (
                  <>
                    <p className={`mt-8 ${cap} text-furn-walnut`}>{copy.headline}</p>
                    <div className="mt-5 grid max-w-xl gap-4 text-lg font-light leading-relaxed text-[#4A4640]">
                      {copy.body.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="mt-8 max-w-md text-lg font-light leading-relaxed text-[#4A4640]">{room.intro}</p>
                )}
              </Reveal>
              <Reveal delay={0.1} className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#F6F1EA] md:aspect-[5/6]">
                {room.film ? (
                  <video autoPlay muted loop playsInline preload="metadata" poster={room.film.poster} aria-label={`The ${room.name.toLowerCase()} wing, in a garden`} className="absolute inset-0 h-full w-full object-cover">
                    <source src={room.film.src} type="video/mp4" />
                  </video>
                ) : room.cover ? (
                  <img src={room.cover} alt={`${room.name}, by Gaze Furnishings`} className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <FurnitureDrawing kind={room.drawing} className="w-[70%] text-furn-ink" />
                )}
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── the signature piece, where the wing has one ── */}
        {copy?.signature && signature?.photos && (
          <section className="bg-furn-ink px-5 py-20 text-furn-linen md:px-[6vw] md:py-28">
            <div className="mx-auto grid max-w-[1600px] items-center gap-12 md:grid-cols-[1.1fr_1fr]">
              <Reveal className="aspect-[4/3] overflow-hidden">
                <img src={signature.photos[0]} alt={`${signature.name}, the signature executive desk`} className="h-full w-full object-cover" />
              </Reveal>
              <Reveal delay={0.1}>
                <p className={`${cap} text-[rgba(238,231,223,0.6)]`}>{copy.signature.eyebrow}</p>
                <h2 className="mt-5 font-furn text-[clamp(44px,5vw,88px)] leading-[0.95]">{copy.signature.headline}</h2>
                <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-[rgba(238,231,223,0.82)]">{copy.signature.body}</p>
                <Link href={`/furnishings/${signature.slug}`} data-no-transition className={`${pill} mt-10 bg-furn-linen text-furn-ink hover:bg-white`}>
                  Buy the {signature.name.replace(/^The /, '')}
                </Link>
              </Reveal>
            </div>
          </section>
        )}

        {/* ── every piece in the wing ── */}
        <section className="bg-white px-5 py-20 md:px-[6vw] md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <WingPieces room={room.id} />
          </div>
        </section>

        {copy && (
          <>
            {/* ── her terms and highlights for the wing ── */}
            <section className="px-5 py-20 md:px-[6vw] md:py-28">
              <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-2">
                <Reveal>
                  <h2 className="border-t border-furn-ink pt-6 font-furn text-[clamp(32px,3.2vw,52px)] leading-[1.02]">{copy.termsTitle}</h2>
                  <p className="mt-5 max-w-lg text-[15px] font-light leading-relaxed text-[#4A4640]">{copy.termsIntro}</p>
                  <dl className="mt-8 border-t border-[rgba(30,30,34,0.15)]">
                    {copy.terms.map((t) => (
                      <div key={t.label} className="grid gap-2 border-b border-[rgba(30,30,34,0.15)] py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                        <dt className={`${cap} pt-1 text-furn-walnut`}>{t.label}</dt>
                        <dd className="text-[15px] font-light leading-relaxed">{t.body}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 className="border-t border-furn-ink pt-6 font-furn text-[clamp(32px,3.2vw,52px)] leading-[1.02]">Collection Highlights</h2>
                  <ul className="mt-8 border-t border-[rgba(30,30,34,0.15)]">
                    {copy.highlights.map((h) => (
                      <li key={h.name}>
                        <Link href={`/furnishings/${h.slug}`} data-no-transition className="group grid gap-2 border-b border-[rgba(30,30,34,0.15)] py-6 transition-colors hover:text-furn-walnut">
                          <span className="flex items-baseline justify-between gap-6 font-furn text-[clamp(24px,2.2vw,34px)] leading-tight">
                            {h.name}
                            <span aria-hidden="true" className="text-base transition-transform duration-500 group-hover:translate-x-1">→</span>
                          </span>
                          <span className="max-w-lg text-[15px] font-light leading-relaxed text-[#4A4640]">{h.body}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </section>

            {/* ── her call to commission ── */}
            <section className="bg-[#E4DCD1] px-5 py-20 md:px-[6vw] md:py-24">
              <Reveal className="mx-auto flex max-w-[1600px] flex-col justify-between gap-10 lg:flex-row lg:items-end">
                <div>
                  <h2 className="font-furn text-[clamp(40px,4.6vw,80px)] leading-[0.98]">{copy.commission.title}</h2>
                  <p className="mt-5 max-w-xl text-base leading-relaxed">{copy.commission.body}</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  {copy.commission.ctas.map((c, k) => (
                    <a key={c.label} href={c.href} data-no-transition className={`${pill} ${k === 0 ? 'bg-furn-ink text-furn-linen hover:bg-furn-walnut' : 'ring-1 ring-furn-ink hover:bg-furn-ink hover:text-furn-linen'}`}>
                      {c.label}
                    </a>
                  ))}
                </div>
              </Reveal>
            </section>
          </>
        )}

        {/* ── on through the house ── */}
        <section className="px-5 py-20 md:px-[6vw] md:py-28">
          <div className="mx-auto grid max-w-[1600px] gap-px bg-[rgba(30,30,34,0.15)] md:grid-cols-2">
            <Link href="/furnishings/atelier" data-no-transition className="group bg-furn-linen py-10 pr-6 transition-colors hover:text-furn-walnut md:py-14">
              <span className={`${cap} text-[#8A847A]`}>choose your fabric</span>
              <span className="mt-4 block font-furn text-[clamp(36px,4vw,64px)] leading-none">The Bespoke Atelier</span>
              <span className={`mt-6 inline-flex items-center gap-3 ${cap}`}>
                Velvet, bouclé, linen, chenille, leatherette
                <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </span>
            </Link>
            <Link href={`/furnishings/${next.id}`} data-no-transition className="group bg-furn-linen py-10 transition-colors hover:text-furn-walnut md:py-14 md:pl-10">
              <span className={`${cap} text-[#8A847A]`}>the next wing</span>
              <span className="mt-4 block font-furn text-[clamp(36px,4vw,64px)] leading-none">
                <span className="text-furn-walnut">{ROMAN[collections.indexOf(next)]}</span> {next.name}
              </span>
              <span className={`mt-6 inline-flex items-center gap-3 ${cap}`}>
                Walk on
                <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </div>
        </section>
      </main>
      <FurnFooter />
    </div>
  );
}
