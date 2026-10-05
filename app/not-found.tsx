import type { Metadata } from 'next';
import Link from 'next/link';
import { HouseLogo } from '@/components/Logo/HouseLogo';

export const metadata: Metadata = {
  title: 'Not in the catalogue',
  description: 'The page you were looking for does not exist on gazeholdings.com.',
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-16 bg-obsidian overflow-hidden">
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none ethos-drift opacity-50" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-obsidian/40 via-obsidian/60 to-obsidian" />

      <div className="relative z-10 max-w-2xl">
        <div className="mb-12 flex justify-center text-ivory">
          <HouseLogo id="holdings" title="Gaze Holdings" className="h-[80px] w-auto" />
        </div>

        <div className="font-display text-[0.65rem] tracking-[0.5em] uppercase text-rose font-medium mb-8">
          Error 404
        </div>

        <h1 className="font-display font-extralight text-4xl md:text-6xl leading-[0.98] tracking-tight text-ivory mb-6">
          Not in the <em className="font-serif italic font-light text-rose">catalogue</em>.
        </h1>

        <p className="text-ivory/65 max-w-md mx-auto font-light text-base md:text-lg leading-relaxed mb-12">
          The link you followed may have been mistaken. Or this door has been quietly closed. Either way, the work is still here &mdash; just somewhere else.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/"
            className="inline-block px-8 py-3.5 border border-rose font-display text-[0.7rem] tracking-[0.35em] uppercase text-ivory font-medium hover:bg-rose hover:text-obsidian transition-colors duration-500 ease-reveal"
          >
            Back to the group
          </Link>
          <Link
            href="/#contact"
            className="inline-block px-8 py-3.5 font-display text-[0.7rem] tracking-[0.35em] uppercase text-ivory/65 hover:text-rose transition-colors"
          >
            Or get in touch →
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="font-serif italic text-ivory/30 text-sm">
          Nairobi, Kenya. Global scale.
        </p>
      </div>
    </main>
  );
}
