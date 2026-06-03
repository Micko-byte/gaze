import type { Metadata } from 'next';
import { Nav } from '@/components/Nav/Nav';
import { Footer } from '@/components/Footer/Footer';
import { RouteLanding } from '@/components/RouteLanding/RouteLanding';

export const metadata: Metadata = {
  title: 'Leadership',
  description: 'Leadership formation and training by Gaze Holdings.',
};

export default function LeadershipPage() {
  return (
    <>
      <Nav />
      <main>
        <RouteLanding
          eyebrow="03 - Leadership"
          title="Training kingdom leaders."
          subtitle="Formation and mentorship."
          body="Cohort programmes, mentorship circles, and executive formation designed for leaders who refuse the shortcut."
          note="The leadership programmes page will expand with cohorts, schedules, and faculty profiles."
          image="/images/divisions/institute.jpg"
          imageAlt="Gaze Leadership Institute"
        />
      </main>
      <Footer />
    </>
  );
}
