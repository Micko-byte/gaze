import { getInstagramPosts } from '@/lib/instagram';
import { instagram } from '@/content/social';
import { instagramSection, instagramFallback } from '@/content/instagram';
import { InstagramGrid, type GalleryTile } from './InstagramGrid';
import { Reveal } from '@/components/Reveal/Reveal';
import { KineticText } from '@/components/ui/KineticText';

export async function InstagramGallery() {
  const posts = await getInstagramPosts(8);

  const tiles: GalleryTile[] = posts
    ? posts.map((p, index) => ({
        key: p.id,
        image: index === 3 ? '/images/founder/muthoni-ngugi-new.webp' : p.mediaUrl,
        alt: index === 3 ? 'The founder' : 'Gaze Holdings on Instagram',
        href: instagram.profileUrl,
        caption: index === 3 ? undefined : p.caption,
      }))
    : instagramFallback.map(t => ({
        key: t.key,
        image: t.image,
        alt: t.alt,
        href: instagram.profileUrl,
      }));

  return (
    <section id="instagram" data-nav-theme="light" className="relative bg-[#C99DC2] px-6 py-28 text-[#06122A]">
      <Reveal className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="font-display text-[11px] tracking-[0.45em] uppercase font-medium mb-5">
              {instagramSection.eyebrow}
            </div>
            <KineticText
              className="font-headline text-[clamp(52px,7vw,112px)] leading-[0.95]"
              parts={[
                { text: instagramSection.heading.pre },
                { text: instagramSection.heading.accent, className: 'text-[#7B5232]' },
                { text: instagramSection.heading.post },
              ]}
            />
          </div>
          <a
            href={instagram.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-[11px] tracking-[0.3em] uppercase whitespace-nowrap underline underline-offset-4 transition-colors hover:text-[#7B5232]"
          >
            {instagram.handle} · {instagramSection.cta} →
          </a>
        </div>

        <InstagramGrid tiles={tiles} profileUrl={instagram.profileUrl} />
      </Reveal>
    </section>
  );
}
