import type { Metadata } from 'next';
import { Nav } from '@/components/Nav/Nav';
import { Footer } from '@/components/Footer/Footer';
import { RouteLanding } from '@/components/RouteLanding/RouteLanding';

export const metadata: Metadata = {
  title: 'Gaze Press Global',
  description: 'Editorial strategy, cultural publishing, and long-form thought leadership.',
};

export default function PressPage() {
  return (
    <>
      <Nav />
      <main>
        <RouteLanding
          eyebrow="02 - Press"
          title="Stories that outlive trends."
          subtitle="Publishing with purpose."
          body="Editorial strategy, cultural publishing, and long-form work built to shape leaders and stay relevant beyond the moment."
          note="The press catalogue will host titles, editorials, and media features as the library grows."
          image="/images/divisions/press.jpg"
          imageAlt="Gaze Press Global"
        />
      </main>
      <Footer />
    </>
  );
}
