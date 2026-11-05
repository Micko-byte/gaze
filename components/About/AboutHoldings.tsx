import Link from 'next/link';
import { ethosContent } from '@/content/ethos';

/**
 * Who Gaze Holdings is, straight after the landing, before the houses: on the review call she asked for this so the
 * site reads as investor-ready. The words are her Master Ecosystem Profile.
 */
export function AboutHoldings() {
  return (
    <section id="about" data-nav-theme="light" className="scroll-mt-20 bg-gaze-parchment px-6 py-24 text-gaze-deep md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-[1fr_2.4fr] md:gap-16">
        <p className="font-text text-[11px] font-semibold uppercase tracking-[0.36em] text-rose-ink">About Gaze Holdings</p>
        <div>
          <p className="max-w-[26ch] font-text text-[clamp(28px,3.6vw,54px)] font-semibold leading-[1.08] tracking-[-0.035em] [text-wrap:balance]">{ethosContent.manifesto[0]}</p>
          <p className="mt-8 max-w-[58ch] font-text text-[17px] font-light leading-relaxed md:text-lg">{ethosContent.manifesto[2]}</p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-text text-[11px] font-medium uppercase tracking-[0.26em]">
            <a href="#houses" className="underline decoration-[rgba(10,22,49,0.3)] underline-offset-[6px] transition-colors hover:text-rose-ink">The five houses</a>
            <Link href="/meet-the-director" className="underline decoration-[rgba(10,22,49,0.3)] underline-offset-[6px] transition-colors hover:text-rose-ink">Meet the director</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
