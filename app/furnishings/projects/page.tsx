/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { contract, projects, type Project } from '@/content/projects';
import { furnContact } from '@/content/furnishings';
import { FurnHeader } from '@/components/Furnishings/FurnHeader';
import { FurnFooter } from '@/components/Furnishings/FurnFooter';
import { ContractForm } from '@/components/Furnishings/ContractForm';

export const metadata: Metadata = {
  title: 'Projects & Contract · Gaze Furnishings',
  description: 'Residences, boardrooms, restaurants, lobbies and estates furnished by Gaze Furnishings, and a contract desk for architects, developers and companies.',
};

const cap = 'text-[10px] font-medium uppercase tracking-[0.28em]';

function Media({ project, className = '' }: { project: Project; className?: string }) {
  return 'video' in project.media ? (
    <video autoPlay muted loop playsInline preload="metadata" poster={project.media.poster} aria-label={project.title} className={`h-full w-full object-cover ${className}`}>
      <source src={project.media.video} type="video/mp4" />
    </video>
  ) : (
    <img src={project.media.image} alt={project.media.alt} className={`h-full w-full object-cover ${className}`} />
  );
}

/**
 * Projects & Contract, after Natuzzi's: the projects pan across the opening screen, then each takes the screen in
 * turn, the next sliding up over the last, its picture drifting in its frame. The contract desk closes the page.
 */
export default function ProjectsPage() {
  return (
    <div className="bg-furn-ink font-text text-furn-linen">
      <FurnHeader />
      <main className="pt-[72px]">
        {/* ── the opening: every project in a row, panning slowly across ── */}
        <section className="relative h-[calc(100svh-72px)] min-h-[560px] overflow-hidden">
          <div className="absolute inset-0 flex items-center">
            <div className="city-pan flex h-[78%] w-max gap-3 px-3" style={{ animation: 'city-pan 60s ease-in-out infinite alternate' }}>
              {[...projects, ...projects.slice(0, 2)].map((p, i) => (
                <div key={`${p.id}-${i}`} className="h-full aspect-[3/4] shrink-0 overflow-hidden">
                  <Media project={p} className="brightness-[0.7]" />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(30,30,34,0.7),rgba(30,30,34,0.2))]" />
          <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
            <p className={`${cap} text-[rgba(238,231,223,0.75)]`}>Gaze Furnishings · Projects &amp; Contract</p>
            <h1 className="mt-6 font-furn text-[clamp(72px,13vw,240px)] font-normal leading-[0.86] tracking-[-0.01em]">Projects</h1>
            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-[rgba(238,231,223,0.85)] md:text-lg">
              Homes, boardrooms, restaurants and estates, furnished whole.
            </p>
            <a href="#contract" data-no-transition className="mt-10 rounded-full bg-furn-linen px-8 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-furn-ink transition-colors hover:bg-white">
              Design with us
            </a>
          </div>
        </section>

        {/* ── each project takes the screen; the next slides up over it ── */}
        <div>
          {projects.map((p, i) => {
            const light = i % 2 === 1;
            return (
              <article
                key={p.id}
                id={p.id}
                className={`sticky top-[72px] flex min-h-[calc(100svh-72px)] items-center px-5 py-16 md:px-[6vw] ${light ? 'bg-furn-linen text-furn-ink' : 'bg-furn-ink text-furn-linen'}`}
              >
                <div className={`mx-auto grid w-full max-w-[1600px] items-center gap-10 md:grid-cols-2 md:gap-[6vw] ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                  <div className="relative mx-auto aspect-[4/5] h-auto w-full max-w-[560px] overflow-hidden md:h-[72svh] md:w-auto">
                    <div className="project-pan absolute inset-0">
                      <Media project={p} />
                    </div>
                  </div>
                  <div>
                    <p className={`${cap} ${light ? 'text-furn-walnut' : 'text-[rgba(238,231,223,0.6)]'}`}>
                      {String(i + 1).padStart(2, '0')} · {p.kind}
                    </p>
                    <h2 className="mt-5 font-furn text-[clamp(44px,6vw,108px)] font-normal leading-[0.94]">{p.title}</h2>
                    <p className={`mt-6 max-w-md text-base font-light leading-relaxed md:text-lg ${light ? 'text-[#4A4640]' : 'text-[rgba(238,231,223,0.8)]'}`}>{p.line}</p>
                    <div className="mt-10 flex flex-wrap items-center gap-6">
                      <a
                        href="#contract"
                        data-no-transition
                        className={`rounded-full px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.24em] transition-colors ${light ? 'bg-furn-ink text-furn-linen hover:bg-furn-walnut' : 'bg-furn-linen text-furn-ink hover:bg-white'}`}
                      >
                        Design with us
                      </a>
                      <Link href={`/furnishings/${p.wing}`} data-no-transition className={`${cap} underline underline-offset-[6px] ${light ? 'decoration-[rgba(30,30,34,0.35)]' : 'decoration-[rgba(238,231,223,0.4)]'}`}>
                        Shop the pieces
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── the contract desk ── */}
        <section id="contract" className="relative z-10 scroll-mt-[72px] bg-furn-ink px-5 py-24 md:px-[6vw] md:py-32">
          <div className="mx-auto grid max-w-[1600px] gap-14 border-t border-[rgba(238,231,223,0.25)] pt-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className={`${cap} text-[rgba(238,231,223,0.6)]`}>{contract.eyebrow}</p>
              <h2 className="mt-5 font-furn text-[clamp(56px,7vw,128px)] font-normal leading-[0.92]">{contract.title}</h2>
              <p className="mt-8 max-w-md text-base font-light leading-relaxed text-[rgba(238,231,223,0.8)] md:text-lg">{contract.body}</p>
              <div className="mt-8 grid gap-1 text-[15px]">
                {furnContact.phones.map((ph) => (
                  <a key={ph.tel} href={`tel:${ph.tel}`} className="hover:text-white">{ph.label}</a>
                ))}
                <a href={`mailto:${furnContact.email}`} className="hover:text-white">{furnContact.email}</a>
              </div>
            </div>
            <ContractForm />
          </div>
        </section>
      </main>
      <FurnFooter />
    </div>
  );
}
