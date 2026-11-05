import { footerContent } from '@/content/footer';
import { HouseLogo } from '@/components/Logo/HouseLogo';
import { Reveal } from '@/components/Reveal/Reveal';
import { NewsletterForm } from './NewsletterForm';

/**
 * The Quarterly: her report on what the group did each quarter, above the footer on every Holdings page, as she asked
 * on the review call. The cover is drawn here until her first issue's own cover arrives; the sign-up is one underlined
 * line, after ESR Bespoke's footer.
 */
export function Quarterly() {
  return (
    <section id="quarterly" data-nav-theme="light" aria-labelledby="quarterly-title" className="scroll-mt-20 bg-gaze-parchment px-6 py-24 text-gaze-deep md:px-10 md:py-32">
      <Reveal className="mx-auto grid max-w-[1280px] items-center gap-12 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-20">
        <div aria-hidden="true" className="mx-auto flex aspect-[3/4] w-full max-w-[320px] flex-col justify-between bg-gaze-navy p-7 text-[#F3EFE6] shadow-[0_40px_70px_-35px_rgba(6,18,42,0.75)] md:mx-0">
          <HouseLogo id="holdings" className="h-10 w-auto self-start" />
          <div>
            <span className="block h-px w-10 bg-gaze-champagne" />
            <p className="mt-5 font-text text-[clamp(30px,3.2vw,42px)] font-semibold uppercase leading-[0.95] tracking-[-0.05em]">The<br />Quarterly</p>
            <p className="mt-4 font-text text-[10px] font-medium uppercase tracking-[0.3em] text-gaze-champagne">Gaze Holdings Ltd.</p>
          </div>
        </div>
        <div>
          <p className="font-text text-[11px] font-semibold uppercase tracking-[0.36em] text-rose-ink">{footerContent.newsletter.byline}</p>
          <h2 id="quarterly-title" className="mt-6 max-w-[16ch] font-text text-[clamp(36px,5vw,76px)] font-semibold uppercase leading-[0.98] tracking-[-0.05em]">The Quarterly</h2>
          <p className="mt-6 max-w-[52ch] font-text text-[17px] font-light leading-relaxed md:text-lg">
            Each quarter, what the five houses built, delivered and learned. One report for our clients, partners and investors.
          </p>
          <div className="mt-10 max-w-md">
            <NewsletterForm />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
