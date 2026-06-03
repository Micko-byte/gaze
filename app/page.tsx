import { Nav } from '@/components/Nav/Nav';
import { Hero } from '@/components/Hero/Hero';
import { Ethos } from '@/components/Ethos/Ethos';
import { Divisions } from '@/components/Divisions/Divisions';
import { Leadership } from '@/components/Leadership/Leadership';
import { StatsStrip } from '@/components/StatsStrip/StatsStrip';
import { Press } from '@/components/Press/Press';
import { InstagramGallery } from '@/components/Instagram/InstagramGallery';
import { Contact } from '@/components/Contact/Contact';
import { Footer } from '@/components/Footer/Footer';
import { Intro } from '@/components/Intro/Intro';
import { organizationJsonLd } from '@/lib/seo';

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
      <Intro />
      <Nav />
      <main>
        <Hero />
        <Ethos />
        <Divisions />
        <Leadership />
        <StatsStrip />
        <Press />
        <InstagramGallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
