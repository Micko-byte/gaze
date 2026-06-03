import type { Metadata } from 'next';
import { Nav } from '@/components/Nav/Nav';
import { Footer } from '@/components/Footer/Footer';
import { RouteLanding } from '@/components/RouteLanding/RouteLanding';
import { leadershipContent } from '@/content/leadership';

export const metadata: Metadata = {
  title: 'Vision',
  description: 'Gaze Holdings vision and leadership.',
};

export default function VisionPage() {
  return (
    <>
      <Nav theme="light" />
      <main>
        <RouteLanding
          light
          eyebrow="04 - Vision"
          title={`${leadershipContent.name.first} ${leadershipContent.name.last}`}
          subtitle={leadershipContent.role}
          body={leadershipContent.bio[0]}
          note="Founder vision, team philosophy, and leadership perspective will continue here as this page expands."
          image="/images/founder/muthoni-ngugi-new.webp"
          imageAlt={`${leadershipContent.name.first} ${leadershipContent.name.last}`}
        />
      </main>
      <Footer />
    </>
  );
}
