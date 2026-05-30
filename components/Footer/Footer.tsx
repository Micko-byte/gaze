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
    <footer className="bg-obsidian border-t border-hairline pt-20 pb-10 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.4fr_1fr_1fr] gap-12">
        <div>
          <a href="#top" aria-label="Gaze Holdings home" className="inline-block text-ivory">
            <BrandMark variant="stacked" height={56} />
          </a>
          <p className="font-serif italic text-ivory/55 text-base mt-4">
            {footerContent.tagline}
          </p>
          <div className="flex flex-wrap gap-2 mt-8">
            {divisions.map(d => {
              const linkProps = d.external
                ? { target: '_blank' as const, rel: 'noopener noreferrer' }
                : {};
              return (
                <a
                  key={d.id}
                  href={d.href}
                  {...linkProps}
                  className="px-3 py-2 border border-hairline hover:border-rose hover:text-rose transition-colors font-display text-[0.55rem] tracking-[0.25em] uppercase text-ivory/60"
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
          <p className="font-serif italic text-ivory/45 text-xs mt-3">{footerContent.newsletter.byline}</p>
        </div>

        <div>
          <div className="font-display text-[0.55rem] tracking-[0.35em] uppercase text-rose mb-4 font-medium">
            {footerContent.legal.label}
          </div>
          <ul className="space-y-2">
            {footerContent.legal.links.map(link => (
              <li key={link.href}>
                <a href={link.href} className="font-display text-[0.7rem] tracking-[0.15em] uppercase text-ivory/55 hover:text-rose transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-ivory/35 text-xs mt-6">{footerContent.legal.copyright}</p>
        </div>
      </div>

      {/* Social row */}
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="font-display text-[0.55rem] tracking-[0.35em] uppercase text-ivory/40">
          Follow the group
        </div>
        <SocialLinks size={18} />
      </div>
    </footer>
  );
}
