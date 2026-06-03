'use client';

import { useRef } from 'react';
import { divisions } from '@/content/divisions';
import { footerContent } from '@/content/footer';
import { instaProfileUrl } from '@/content/social';
import { NewsletterForm } from './NewsletterForm';
import { BrandMark } from '@/components/BrandMark/BrandMark';
import { SocialLinks } from '@/components/Social/SocialLinks';
import VariableProximity from '@/components/ui/VariableProximity';

const SHORT: Record<string, string> = {
  furnishings: 'Furnishings',
  press: 'Press',
  institute: 'Institute',
  manor: 'Manor',
  hergaze: 'HerGaze',
};

export function Footer() {
  const taglineRef = useRef<HTMLDivElement>(null);

  return (
    <footer className="relative bg-obsidian overflow-hidden">
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose/50 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-[10%] top-[15%] h-72 w-72 rounded-full bg-rose/4 blur-[100px]" />
        <div className="absolute right-[8%] bottom-[20%] h-64 w-64 rounded-full bg-champagne/3 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-12">
        {/* Top: brand statement */}
        <div className="mb-16 pb-16 border-b border-hairline flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <a href="#top" aria-label="Gaze Holdings home" className="inline-block text-ivory mb-6">
              <BrandMark variant="stacked" height={60} />
            </a>
            <div
              ref={taglineRef}
              className="max-w-sm"
            >
              <p className="font-serif italic text-ivory/50 text-base leading-relaxed">
                <VariableProximity
                  label={footerContent.tagline}
                  containerRef={taglineRef}
                  radius={120}
                  className="font-serif italic text-ivory/50 text-base leading-relaxed"
                />
              </p>
            </div>
          </div>

          {/* Divisions pill row */}
          <div className="flex flex-wrap gap-2 max-w-lg">
            {divisions.map(d => {
              const linkProps = d.external
                ? { target: '_blank' as const, rel: 'noopener noreferrer' }
                : {};
              return (
                <a
                  key={d.id}
                  href={d.href}
                  {...linkProps}
                  className="group relative px-4 py-2 border border-hairline hover:border-rose/60 transition-all duration-500 font-display text-[0.52rem] tracking-[0.28em] uppercase text-ivory/50 hover:text-rose overflow-hidden"
                >
                  <span className="absolute inset-0 bg-rose/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative">{SHORT[d.id] ?? d.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Main grid */}
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr_0.9fr]">
          {/* Newsletter */}
          <div>
            <div className="font-display text-[0.52rem] tracking-[0.38em] uppercase text-rose mb-5 font-medium flex items-center gap-3">
              <span>{footerContent.newsletter.label}</span>
              <span className="flex-1 h-px bg-rose/20" />
            </div>
            <NewsletterForm />
            <p className="font-serif italic text-ivory/35 text-xs mt-5 leading-relaxed max-w-xs">
              {footerContent.newsletter.byline}
            </p>
          </div>

          {/* Legal */}
          <div>
            <div className="font-display text-[0.52rem] tracking-[0.38em] uppercase text-rose mb-5 font-medium flex items-center gap-3">
              <span>{footerContent.legal.label}</span>
              <span className="flex-1 h-px bg-rose/20" />
            </div>
            <ul className="space-y-3">
              {footerContent.legal.links.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-display text-[0.65rem] tracking-[0.18em] uppercase text-ivory/45 hover:text-rose transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <div className="font-display text-[0.52rem] tracking-[0.38em] uppercase text-rose mb-5 font-medium flex items-center gap-3">
              <span>Follow</span>
              <span className="flex-1 h-px bg-rose/20" />
            </div>
            <SocialLinks size={18} />
            <a
              href={instaProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-display text-[0.52rem] tracking-[0.3em] uppercase text-ivory/45 hover:text-rose transition-colors duration-300"
            >
              <span>Instagram</span>
              <span className="text-rose/40">↗</span>
            </a>
            <p className="text-ivory/28 text-xs mt-5 max-w-[180px] leading-relaxed">
              Follow the group across the channels where the story is unfolding.
            </p>
          </div>

          {/* Location / identity */}
          <div>
            <div className="font-display text-[0.52rem] tracking-[0.38em] uppercase text-rose mb-5 font-medium flex items-center gap-3">
              <span>Home</span>
              <span className="flex-1 h-px bg-rose/20" />
            </div>
            <div className="space-y-3">
              <p className="font-display text-[0.62rem] tracking-[0.2em] uppercase text-ivory/50">
                Nairobi, Kenya
              </p>
              <p className="font-display text-[0.62rem] tracking-[0.2em] uppercase text-ivory/30">
                Global scale.
              </p>
              <div className="pt-4">
                <div className="h-px w-10 bg-rose/30 mb-3" />
                <p className="font-serif italic text-ivory/30 text-xs leading-relaxed">
                  Five disciplines.<br />One signature.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-hairline/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-display text-[0.48rem] tracking-[0.38em] uppercase text-ivory/28 flex items-center gap-3">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose/40" />
            Gaze Holdings Limited
            <span className="text-ivory/15">·</span>
            Registered in Kenya
          </div>
          <div className="text-ivory/25 text-[0.65rem] tracking-wide">
            {footerContent.legal.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
