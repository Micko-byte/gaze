import type { Metadata } from 'next';
import { Nav } from '@/components/Nav/Nav';
import { Footer } from '@/components/Footer/Footer';
import { RouteLanding } from '@/components/RouteLanding/RouteLanding';

export const metadata: Metadata = {
  title: 'Lifestyle',
  description: 'Lifestyle and interiors by Gaze Holdings.',
};

export default function LifestylePage() {
  return (
    <>
      <Nav />
      <main>
        <RouteLanding
          eyebrow="01 - Lifestyle"
          title="Spaces with a signature."
          subtitle="Bespoke interiors."
          body="Luxury residential commissions, material direction, and tactile environments designed for the homes people live in every day."
          note="The lifestyle catalogue and commerce flow will expand here as the product library is finalized."
          image="/images/divisions/furnishings.jpg"
          imageAlt="Gaze Furnishings"
        />
      </main>
      <Footer />
    </>
  );
}
