import type { Metadata } from 'next';
import { LegalPage } from '@/components/Legal/LegalPage';
import { legalContent } from '@/content/legal';

export const metadata: Metadata = {
  title: legalContent.cookies.title,
  description: legalContent.cookies.summary,
};

export default function CookiesPage() {
  return <LegalPage doc="cookies" />;
}
