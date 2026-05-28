import { Nav } from '@/components/Nav/Nav';
import { Hero } from '@/components/Hero/Hero';
import { Ethos } from '@/components/Ethos/Ethos';
import { Divisions } from '@/components/Divisions/Divisions';
import { Synergy } from '@/components/Synergy/Synergy';
import { Leadership } from '@/components/Leadership/Leadership';
import { Press } from '@/components/Press/Press';
import { Contact } from '@/components/Contact/Contact';
import { Footer } from '@/components/Footer/Footer';
import { organizationJsonLd } from '@/lib/seo';

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
      <Nav />
      <main>
        <Hero />
        <Ethos />
        <Divisions />
        <Synergy />
        <Leadership />
        <Press />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
