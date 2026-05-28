import type { Metadata } from 'next';
import { Nav } from '@/components/Nav/Nav';
import { Footer } from '@/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'The Gaze Manor',
  description: 'The Gaze Manor — media production, design, broadcast. Built on a single estate.',
};

export default function ManorPage() {
  return (
    <>
      <Nav />
      <main className="bg-obsidian">
        <section className="relative h-[100svh] min-h-[600px] flex items-center justify-center text-center px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/70 to-obsidian pointer-events-none" />
          <div className="absolute inset-0 ethos-drift opacity-50" />
          <div className="relative z-10 max-w-3xl">
            <div className="font-display text-[0.7rem] tracking-[0.5em] uppercase text-rose font-medium mb-8">
              The Gaze Manor
            </div>
            <h1 className="font-display font-extralight text-5xl md:text-7xl leading-[0.95] tracking-tight text-ivory mb-6">
              Media. Design. <em className="font-serif italic font-light text-rose">Broadcast</em>.
            </h1>
            <p className="text-ivory/70 max-w-xl mx-auto font-light text-base md:text-lg leading-relaxed mb-10">
              A single estate. Film, broadcast, and editorial work produced under one roof for the brands of the group and select external partners.
            </p>
            <a
              href="/#contact"
              className="inline-block px-8 py-3.5 border border-rose font-display text-[0.7rem] tracking-[0.35em] uppercase text-ivory font-medium hover:bg-rose hover:text-obsidian transition-colors duration-500 ease-reveal"
            >
              Make enquiry
            </a>
          </div>
        </section>
        <section className="py-32 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="font-display text-[0.6rem] tracking-[0.4em] uppercase text-champagne mb-4">In development</div>
            <p className="font-serif italic text-ivory/55 text-xl md:text-2xl leading-relaxed">
              Portfolio reel, services catalogue, and booking flow launching next.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
