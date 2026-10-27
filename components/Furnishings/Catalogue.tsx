/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { collections, colours, pieces, type Piece } from '@/content/furnishings';
import { FurnitureDrawing } from './FurnitureDrawing';
import { Reveal } from '@/components/Reveal/Reveal';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

const cap = 'text-[10px] font-medium uppercase tracking-[0.28em]';

/**
 * One plate of the catalogue, after Natuzzi's product listings: the photograph held in a linen mount, the second
 * plate fading in on hover with a quiet call to view; then the plate number, the name, the palette it comes in, and
 * the price, which reads "on request" until the client sets it.
 */
function PieceCard({ piece, no, tall }: { piece: Piece; no: number; tall?: boolean }) {
  const plates = piece.photos?.length ?? 0;
  return (
    <Link href={`/furnishings/${piece.slug}`} data-no-transition className="group block">
      <div className="bg-[#F3EDE4] p-3 transition-colors duration-700 group-hover:bg-[#EADFD2] md:p-4">
        <div className={`relative flex items-center justify-center overflow-hidden bg-[#F6F1EA] ${tall ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
          {piece.photos ? (
            <>
              <img
                src={piece.photos[0]}
                alt={`${piece.name}, made by Gaze Furnishings`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-[50%_70%] transition-transform duration-[1600ms] ease-reveal group-hover:scale-[1.06]"
              />
              {/* the second photograph fades in on hover, as on Natuzzi's product plates */}
              {piece.photos[1] && (
                <img
                  src={piece.photos[1]}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full scale-[1.04] object-cover object-[50%_70%] opacity-0 transition-[opacity,transform] duration-[1200ms] ease-reveal group-hover:scale-100 group-hover:opacity-100"
                />
              )}
              {/* a soft floor of shade so the labels always read */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,rgba(30,30,34,0.38),transparent)]" />
            </>
          ) : (
            <FurnitureDrawing kind={piece.drawing} className="w-[70%] text-furn-ink transition-transform duration-[900ms] ease-reveal group-hover:scale-[1.05]" />
          )}
          {piece.decided && (
            <span className={`absolute left-4 top-4 rounded-full border border-[rgba(255,255,255,0.7)] bg-[rgba(238,231,223,0.85)] px-3 py-1.5 text-furn-ink backdrop-blur-sm ${cap}`}>
              Signature
            </span>
          )}
          {plates > 1 && (
            <span aria-hidden="true" className="absolute bottom-4 left-4 flex gap-1.5">
              {Array.from({ length: plates }, (_, i) => (
                <span key={i} className={`h-px w-5 transition-colors duration-700 ${i === 0 ? 'bg-white group-hover:bg-[rgba(255,255,255,0.45)]' : i === 1 ? 'bg-[rgba(255,255,255,0.45)] group-hover:bg-white' : 'bg-[rgba(255,255,255,0.45)]'}`} />
              ))}
            </span>
          )}
          <span
            className={`absolute bottom-4 right-4 translate-y-3 rounded-full bg-furn-linen px-5 py-2.5 text-furn-ink opacity-0 transition-[opacity,transform] duration-500 ease-reveal group-hover:translate-y-0 group-hover:opacity-100 ${cap}`}
          >
            Discover the piece
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-[1fr_auto] items-end gap-6">
        <div>
          <p className={`${cap} text-furn-walnut`}>No. {String(no).padStart(2, '0')}</p>
          <h3 className="mt-3 font-furn text-[clamp(30px,2.6vw,44px)] leading-[0.95]">{piece.name}</h3>
          <p className="mt-2 font-furn text-[17px] italic text-[#6F6A62]">
            {piece.kind}, named for the {piece.animal}
          </p>
        </div>
        <p className="text-right">
          <span className={`block ${cap} text-[#8A847A]`}>Price</span>
          <span className="mt-1.5 block font-furn text-[20px] leading-none">{piece.price ?? 'On request'}</span>
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-6 border-y border-[rgba(30,30,34,0.12)] py-3.5">
        <span className="flex items-center gap-1.5" aria-label={`Made in ${colours.length} house colours, or yours`}>
          {colours.slice(0, 6).map((c) => (
            <span key={c.name} title={c.name} className="h-3.5 w-3.5 rounded-full ring-1 ring-inset ring-[rgba(30,30,34,0.15)]" style={{ background: c.hex }} />
          ))}
          <span className="ml-1.5 text-[12px] text-[#6F6A62]">+{colours.length - 6} &amp; bespoke</span>
        </span>
        <span className={`${cap} text-[#6F6A62]`}>Made to order · 14–21 days</span>
      </div>

      <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-[#4A4640]">{piece.line}</p>
      <span className={`mt-5 inline-flex items-center gap-3 ${cap}`}>
        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
          Commission this piece
        </span>
        <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}

/**
 * The catalogue, read like a magazine: a contents page, then one chapter per room, each opening on a spread with
 * its numeral and name, followed by the room's named pieces set in an asymmetric grid.
 */
export function Catalogue() {
  return (
    <>
      {/* ── contents ── */}
      <section id="catalogue" className="scroll-mt-[72px] bg-furn-linen px-5 py-24 md:px-[6vw] md:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-14 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <p className="text-[12px] text-[#6F6A62]">the catalogue · collection 2026</p>
            <h2 className="mt-4 font-furn text-[clamp(56px,8vw,148px)] leading-[0.92]">Contents</h2>
            <p className="mt-8 max-w-sm text-base font-light leading-relaxed text-[#4A4640]">
              Seven rooms, each piece named in Swahili for a creature of Africa and made to commission for the room it will live in.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ol className="border-t border-furn-ink">
              {collections.map((c, i) => (
                <li key={c.id}>
                  <a href={`#${c.id}`} data-no-transition className="group grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-4 border-b border-[rgba(30,30,34,0.15)] py-5 transition-colors hover:text-furn-walnut">
                    <span className="font-furn text-xl text-furn-walnut">{ROMAN[i]}</span>
                    <span className="font-furn text-[clamp(26px,2.4vw,40px)] leading-none transition-transform duration-500 group-hover:translate-x-1">{c.name}</span>
                    <span className="text-[12px] text-[#6F6A62]">{pieces.filter((p) => p.room === c.id).length} pieces</span>
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ── one chapter per room ── */}
      {collections.map((c, i) => {
        const roomPieces = pieces.filter((p) => p.room === c.id);
        const mirror = i % 2 === 1;
        return (
          <section key={c.id} id={c.id} className={`scroll-mt-[72px] px-5 py-24 md:px-[6vw] md:py-32 ${mirror ? 'bg-furn-linen' : 'bg-white'}`}>
            <div className="mx-auto max-w-[1600px]">
              <Reveal className={`flex flex-col gap-8 border-t border-furn-ink pt-8 md:flex-row md:items-end md:justify-between ${mirror ? 'md:flex-row-reverse md:text-right' : ''}`}>
                <div className={`flex items-end gap-6 md:gap-10 ${mirror ? 'md:flex-row-reverse' : ''}`}>
                  <span className="font-furn text-[clamp(72px,10vw,184px)] leading-[0.8] text-furn-walnut">{ROMAN[i]}</span>
                  <div>
                    <p className="text-[12px] text-[#6F6A62]">chapter {ROMAN[i].toLowerCase()} · {roomPieces.length} pieces</p>
                    <h2 className="mt-2 font-furn text-[clamp(48px,6.4vw,116px)] leading-[0.92]">{c.name}</h2>
                  </div>
                </div>
                <p className="max-w-sm text-base font-light leading-relaxed text-[#4A4640]">{c.intro}</p>
              </Reveal>

              <div className="mt-16 grid gap-14 md:grid-cols-12 md:gap-x-10">
                {roomPieces.map((p, j) => {
                  const lead = j === 0;
                  const span = lead
                    ? mirror ? 'md:col-span-7 md:col-start-6' : 'md:col-span-7'
                    : j === 1
                      ? mirror ? 'md:col-span-5 md:col-start-1 md:row-start-1 md:mt-32' : 'md:col-span-5 md:mt-32'
                      : j % 2 === 0 ? 'md:col-span-6' : 'md:col-span-6 md:mt-24';
                  return (
                    <Reveal key={p.slug} delay={j * 0.08} className={span}>
                      <PieceCard piece={p} no={pieces.indexOf(p) + 1} tall={j === 1} />
                    </Reveal>
                  );
                })}
              </div>

            </div>
          </section>
        );
      })}
    </>
  );
}
