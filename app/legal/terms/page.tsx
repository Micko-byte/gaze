import type { Metadata } from 'next';
import { LegalPage } from '@/components/Legal/LegalPage';
import { legalContent } from '@/content/legal';

export const metadata: Metadata = {
  title: legalContent.terms.title,
  description: legalContent.terms.summary,
};

export default function TermsPage() {
  return <LegalPage doc="terms" />;
}
