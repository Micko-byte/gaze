import { divisions } from '@/content/divisions';
import { footerContent } from '@/content/footer';
import { NewsletterForm } from './NewsletterForm';
import { BrandMark } from '@/components/BrandMark/BrandMark';
import { SocialLinks } from '@/components/Social/SocialLinks';

const SHORT: Record<string, string> = {
  furnishings: 'Furnishings',
  press: 'Press',
  institute: 'Institute',
  manor: 'Manor',
  hergaze: 'HerGaze',
};

export function Footer() {
  return (
    <footer className="bg-obsidian border-t border-hairline px-6 pt-24 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-14 md:grid-cols-[1.2fr_0.88fr_0.88fr_0.82fr]">
          <div className="space-y-6">
            <a href="#top" aria-label="Gaze Holdings home" className="inline-block text-ivory">
              <BrandMark variant="stacked" height={56} />
            </a>
            <p className="font-serif italic text-ivory/55 text-base max-w-sm leading-relaxed">
              {footerContent.tagline}
            </p>
            <div className="h-px w-24 bg-rose/30" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-xl">
              {divisions.map(d => {
                const linkProps = d.external
                  ? { target: '_blank' as const, rel: 'noopener noreferrer' }
                  : {};
                return (
                  <a
                    key={d.id}
                    href={d.href}
                    {...linkProps}
                    className="px-3 py-2 border border-hairline hover:border-rose hover:text-rose transition-colors font-display text-[0.55rem] tracking-[0.25em] uppercase text-ivory/60 text-center"
                  >
                    {SHORT[d.id] ?? d.name}
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <div className="font-display text-[0.55rem] tracking-[0.35em] uppercase text-rose mb-4 font-medium">
              {footerContent.newsletter.label}
            </div>
            <NewsletterForm />
            <p className="font-serif italic text-ivory/45 text-xs mt-4 leading-relaxed">{footerContent.newsletter.byline}</p>
          </div>

          <div>
            <div className="font-display text-[0.55rem] tracking-[0.35em] uppercase text-rose mb-4 font-medium">
              {footerContent.legal.label}
            </div>
            <ul className="space-y-3">
              {footerContent.legal.links.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-display text-[0.7rem] tracking-[0.15em] uppercase text-ivory/55 hover:text-rose transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-display text-[0.55rem] tracking-[0.35em] uppercase text-rose mb-4 font-medium">
              Social
            </div>
            <SocialLinks size={18} />
            <p className="text-ivory/35 text-xs mt-6 max-w-xs leading-relaxed">
              Follow the group across the channels where the story is unfolding.
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-display text-[0.55rem] tracking-[0.35em] uppercase text-ivory/40">
            Nairobi, Kenya. Global scale.
          </div>
          <div className="text-ivory/30 text-xs">
            {footerContent.legal.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
