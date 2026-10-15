import type { ReactNode } from 'react';
import { GliNav } from '@/components/Institute/GliNav';
import { GliFooter } from '@/components/Institute/GliFooter';
import { GliMotion } from '@/components/Institute/GliMotion';

/** Every Gaze Leadership Institute page shares the GLI bar, footer and scroll motion. */
export default function InstituteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white font-gli-text text-gli-navy">
      <GliNav />
      <main>{children}</main>
      <GliFooter />
      <GliMotion />
    </div>
  );
}
