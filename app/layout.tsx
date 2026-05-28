import type { Metadata } from 'next';
import { Outfit, Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/SmoothScroll/SmoothScroll';
import { Cursor } from '@/components/Cursor/Cursor';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['italic', 'normal'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Gaze Holdings — A group of brands built for legacy',
  description: 'The institutional home of Gaze Holdings Limited — a Kenya-rooted, globally-scaled House of Brands spanning interiors, publishing, leadership, broadcast, and women\'s transformation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable} ${inter.variable}`}>
      <body className="bg-obsidian text-ivory">
        <SmoothScroll>
          <Cursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
