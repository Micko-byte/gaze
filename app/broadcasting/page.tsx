import type { Metadata } from 'next';
import { Nav } from '@/components/Nav/Nav';
import { Footer } from '@/components/Footer/Footer';
import { RouteLanding } from '@/components/RouteLanding/RouteLanding';

export const metadata: Metadata = {
  title: 'Broadcasting',
  description: 'Broadcast, design, and media production by Gaze Holdings.',
};

export default function BroadcastingPage() {
  return (
    <>
      <Nav />
      <main>
        <RouteLanding
          eyebrow="04 - Broadcasting"
          title="Media. Design. Broadcast."
          subtitle="A single estate."
          body="Film, broadcast, and editorial work produced under one roof for the brands of the group and select external partners."
          note="The broadcasting portfolio, services catalogue, and booking flow will launch here next."
          image="/images/divisions/manor.jpg"
          imageAlt="The Gaze Manor"
        />
      </main>
      <Footer />
    </>
  );
}
