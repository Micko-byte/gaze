/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { collections, pieces } from '@/content/furnishings';
import { FurnHeader } from './FurnHeader';
import { FurnFooter } from './FurnFooter';
import { FurnitureDrawing } from './FurnitureDrawing';
import { ROMAN, WingPieces } from './Catalogue';
import { Reveal } from '@/components/Reveal/Reveal';

const cap = 'text-[10px] font-medium uppercase tracking-[0.28em]';

/**
 * One wing of the house, on its own page: the wing's numeral, name and opening picture (or film), every piece in it,
 * then the way on to the atelier and to the next wing.
 */
export function Wing({ room }: { room: (typeof collections)[number] }) {
  const i = collections.indexOf(room);
  const next = collections[(i + 1) % collections.length];
  const count = pieces.filter((p) => p.room === room.id).length;

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
                  wing {ROMAN[i].toLowerCase()} · {count} pieces
                </p>
                <h1 className="mt-2 font-furn text-[clamp(56px,8vw,148px)] font-normal leading-[0.9]">{room.name}</h1>
                <p className="mt-8 max-w-md text-lg font-light leading-relaxed text-[#4A4640]">{room.intro}</p>
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

        {/* ── every piece in the wing ── */}
        <section className="bg-white px-5 py-20 md:px-[6vw] md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <WingPieces room={room.id} />
          </div>
        </section>

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
