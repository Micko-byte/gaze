import { Nav } from '@/components/Nav/Nav';
import { Hero } from '@/components/Hero/Hero';
import { organizationJsonLd } from '@/lib/seo';

export default function Page() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
      <Nav />
      <Hero />
      <section id="ethos" className="min-h-screen flex items-center justify-center text-champagne/40 font-display text-xs tracking-[0.4em] uppercase">
        §02 — Ethos (placeholder)
      </section>
    </main>
  );
}
