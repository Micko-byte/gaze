import Image from 'next/image';
import { ScrollFloat } from '@/components/ui/ScrollFloat';

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
  note: string;
  image: string;
  imageAlt: string;
  light?: boolean;
  tiltImage?: boolean;
};

export function RouteLanding({
  eyebrow,
  title,
  subtitle,
  body,
  note,
  image,
  imageAlt,
  light = false,
  tiltImage = false,
}: Props) {
  return (
    <>
      <section className={`relative min-h-[100svh] overflow-hidden ${light ? 'bg-ivory text-obsidian' : 'bg-obsidian text-ivory'}`}>
        <div className={`absolute inset-0 overflow-hidden ${tiltImage ? 'scale-[1.02] rotate-[1.5deg] md:rotate-[2deg]' : ''}`}>
          <Image src={image} alt={imageAlt} fill sizes="100vw" className="object-cover opacity-25" />
          <div className={`absolute inset-0 ${light ? 'bg-gradient-to-b from-ivory/80 via-ivory/88 to-ivory' : 'bg-gradient-to-b from-obsidian/60 via-obsidian/75 to-obsidian'}`} />
          <div className="absolute inset-0 ethos-drift opacity-40" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-5xl items-center justify-center px-6 py-28 text-center">
          <div className="max-w-3xl">
            <div className={`font-display text-[0.7rem] tracking-[0.5em] uppercase font-medium mb-8 ${light ? 'text-rose-ink' : 'text-rose'}`}>
              {eyebrow}
            </div>
            <ScrollFloat
              containerClassName="mb-6"
              textClassName={`font-display font-extralight text-3xl md:text-5xl leading-[0.98] tracking-tight ${light ? 'text-obsidian' : 'text-ivory'}`}
            >
              {title}
            </ScrollFloat>
            <p className={`font-serif italic text-base md:text-lg mb-8 ${light ? 'text-rose-ink' : 'text-rose'}`}>
              {subtitle}
            </p>
            <p className={`mx-auto max-w-2xl text-xs md:text-sm leading-relaxed ${light ? 'text-obsidian/72' : 'text-ivory/72'}`}>
              {body}
            </p>
          </div>
        </div>
      </section>

      <section className={`px-6 py-24 ${light ? 'bg-ivory text-obsidian' : 'bg-obsidian text-ivory'}`}>
        <div className="mx-auto max-w-4xl text-center">
          <div className={`font-display text-[0.55rem] tracking-[0.4em] uppercase mb-4 ${light ? 'text-rose-ink' : 'text-champagne'}`}>
            In development
          </div>
          <p className={`font-serif italic text-base md:text-lg leading-relaxed ${light ? 'text-obsidian/65' : 'text-ivory/55'}`}>
            {note}
          </p>
        </div>
      </section>
    </>
  );
}
