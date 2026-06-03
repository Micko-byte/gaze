import type { Metadata } from 'next';
import { Nav } from '@/components/Nav/Nav';
import { Footer } from '@/components/Footer/Footer';
import { RouteLanding } from '@/components/RouteLanding/RouteLanding';

export const metadata: Metadata = {
  title: 'HerGaze Global',
  description: 'Women\'s transformation, convenings, and enterprise leadership across markets.',
};

export default function HerGazePage() {
  return (
    <>
      <Nav />
      <main>
        <RouteLanding
          eyebrow="05 - HerGaze"
          title="Women, called higher."
          subtitle="Transformation and enterprise."
          body="Corporate, ministry, and transformation work designed to convene, equip, and elevate women across markets."
          note="HerGaze programming and convenings will land here as the platform expands."
          image="/images/divisions/hergaze.jpg"
          imageAlt="HerGaze Global"
        />
      </main>
      <Footer />
    </>
  );
}
