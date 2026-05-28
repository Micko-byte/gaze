import { heroContent } from '@/content/hero';
import { HeroVideo } from './HeroVideo';
import { HeroHeadline } from './HeroHeadline';
import { HeroCTA } from './HeroCTA';
import { ScrollCue } from '@/components/ui/ScrollCue';

export function Hero() {
  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden flex items-center justify-center text-center"
    >
      <HeroVideo />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-obsidian/55 to-obsidian/85 pointer-events-none" />
      <div className="relative z-10 px-6 max-w-3xl">
        <div className="font-display text-[0.7rem] tracking-[0.5em] uppercase text-rose mb-8 font-medium">
          {heroContent.eyebrow}
        </div>
        <HeroHeadline lines={heroContent.headline.lines} />
        <p className="mt-6 text-ivory/70 max-w-xl mx-auto font-light text-base md:text-lg">
          {heroContent.sub}
        </p>
        <HeroCTA label={heroContent.cta.label} href={heroContent.cta.href} />
      </div>
      <ScrollCue label={heroContent.scrollCue} />
    </section>
  );
}
