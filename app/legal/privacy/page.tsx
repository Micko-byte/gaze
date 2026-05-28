import type { Metadata } from 'next';
import { LegalPage } from '@/components/Legal/LegalPage';
import { legalContent } from '@/content/legal';

export const metadata: Metadata = {
  title: legalContent.privacy.title,
  description: legalContent.privacy.summary,
};

export default function PrivacyPage() {
  return <LegalPage doc="privacy" />;
}
