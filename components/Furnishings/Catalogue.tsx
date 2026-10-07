import Link from 'next/link';
import { collections, pieces, type Piece } from '@/content/furnishings';
import { FurnitureDrawing } from './FurnitureDrawing';
import { Reveal } from '@/components/Reveal/Reveal';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

/** One plate of the catalogue: the piece, its name, and the slot its price will fill. */
function PieceCard({ piece, tall }: { piece: Piece; tall?: boolean }) {
  return (
    <Link href={`/furnishings/${piece.slug}`} data-no-transition className="group block">
      <div className={`relative flex items-center justify-center overflow-hidden bg-[#F6F1EA] transition-colors duration-700 group-hover:bg-[#EADFD2] ${tall ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
        <FurnitureDrawing kind={piece.drawing} className="w-[70%] text-furn-ink transition-transform duration-[900ms] ease-reveal group-hover:scale-[1.05]" />
        {piece.decided && <span className="absolute left-4 top-4 rounded-full bg-furn-lilac px-3 py-1 text-[11px]">signature</span>}
      </div>
      <div className="mt-5 flex items-start justify-between gap-6 border-b border-[rgba(30,30,34,0.15)] pb-5">
        <div>
          <h3 className="font-furn text-[clamp(26px,2.2vw,38px)] leading-none">{piece.name}</h3>
          <p className="mt-2 text-[13px] text-[#6F6A62]">{piece.kind} · named for the {piece.animal}</p>
        </div>
        <p className="shrink-0 text-right">
          <span className="block text-[11px] text-[#8A847A]">price</span>
          <span className="mt-1 inline-block min-w-[96px] border-b border-dashed border-[rgba(30,30,34,0.35)] pb-0.5 text-[14px]">
            {piece.price ?? 'to follow'}
          </span>
        </p>
      </div>
      <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-[#4A4640]">{piece.line}</p>
      <span className="mt-4 inline-block text-[13px] transition-transform duration-500 group-hover:translate-x-1">commission this piece →</span>
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
              Seven rooms, each piece named for an animal of the plains and made to commission for the room it will live in.
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
                      : mirror ? 'md:col-span-6 md:col-start-7' : 'md:col-span-6 md:col-start-2';
                  return (
                    <Reveal key={p.slug} delay={j * 0.08} className={span}>
                      <PieceCard piece={p} tall={j === 1} />
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
