/* eslint-disable @next/next/no-img-element */
import { board } from '@/content/board';
import { Reveal } from '@/components/Reveal/Reveal';

/**
 * The Board of Gaze Holdings Limited, after the Chairperson: each director's portrait, office and overview, with the
 * full profile folding out beneath. Portraits turn from monochrome to colour as they are approached.
 */
export function Board() {
  return (
    <section id="board" data-nav-theme="light" className="bg-gaze-parchment px-6 py-28 text-gaze-deep md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col justify-between gap-6 border-t border-[rgba(6,18,42,0.2)] pt-8 md:flex-row md:items-end">
          <div>
            <p className="font-text text-[12px] font-medium uppercase tracking-[0.4em] text-rose-ink">The Board</p>
            <h2 className="mt-4 font-headline text-[clamp(44px,5vw,80px)] leading-none">Directors of Gaze Holdings Limited</h2>
          </div>
          <p className="max-w-sm font-text text-[15px] font-light leading-relaxed text-[rgba(6,18,42,0.72)]">
            Governance across faith, enterprise and technology, alongside the Chairperson.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-16 md:grid-cols-2 md:gap-12">
          {board.map((d, i) => (
            <li key={d.slug} id={d.slug} className={i % 2 ? 'md:mt-28' : ''}>
              <Reveal delay={i * 0.1}>
                <div className="group relative aspect-[4/5] overflow-hidden bg-[#E2DACB]">
                  <img
                    src={d.portrait}
                    alt={`${d.name}, ${d.role}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top grayscale transition-[filter,transform] duration-[1200ms] ease-reveal group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,rgba(6,18,42,0.55),transparent)]" />
                  <p className="absolute bottom-5 left-6 right-6 font-text text-[11px] uppercase tracking-[0.3em] text-[#F3EFE6]">{d.role}</p>
                </div>
                <h3 className="mt-7 font-headline text-[clamp(32px,3vw,48px)] leading-none">{d.name}</h3>
                <p className="mt-5 font-text text-[16px] font-light leading-relaxed text-[rgba(6,18,42,0.82)]">{d.overview}</p>
                <details className="group/d mt-6 border-t border-[rgba(6,18,42,0.2)] pt-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-text text-[12px] uppercase tracking-[0.26em] text-rose-ink [&::-webkit-details-marker]:hidden">
                    Full profile
                    <span aria-hidden="true" className="text-lg transition-transform duration-300 group-open/d:rotate-45">+</span>
                  </summary>
                  <div className="mt-6 grid gap-8">
                    {d.sections.map((s) => (
                      <div key={s.heading}>
                        <p className="font-headline text-[22px] leading-tight">{s.heading}</p>
                        <ul className="mt-4 grid gap-4">
                          {s.points.map((p) => (
                            <li key={p.title || p.body.slice(0, 24)} className="font-text text-[15px] font-light leading-relaxed text-[rgba(6,18,42,0.82)]">
                              {p.title && <span className="block font-medium text-gaze-deep">{p.title}</span>}
                              {p.body}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </details>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
