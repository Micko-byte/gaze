import { getInstagramPosts } from '@/lib/instagram';
import { instagram } from '@/content/social';
import { instagramSection, instagramFallback } from '@/content/instagram';
import { InstagramGrid, type GalleryTile } from './InstagramGrid';
import { Reveal } from '@/components/Reveal/Reveal';

export async function InstagramGallery() {
  const posts = await getInstagramPosts(8);

  const tiles: GalleryTile[] = posts
    ? posts.map((p, index) => ({
        key: p.id,
        image: index === 3 ? '/images/instagram/carousel-4.png' : p.mediaUrl,
        alt: index === 3 ? 'The Manor' : 'Gaze Holdings on Instagram',
        caption: index === 3 ? undefined : p.caption,
      }))
    : instagramFallback.map(t => ({
        key: t.key,
        image: t.image,
        alt: t.alt,
      }));

  return (
    <section id="instagram" className="relative py-28 px-6 bg-obsidian">
      <Reveal className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="font-display text-[0.65rem] tracking-[0.45em] uppercase text-rose font-medium mb-5">
              {instagramSection.eyebrow}
            </div>
            <h2 className="font-display font-extralight text-4xl md:text-5xl leading-[0.98] tracking-tight text-ivory">
              {instagramSection.heading.pre}
              <em className="font-serif italic font-light text-rose">{instagramSection.heading.accent}</em>
              {instagramSection.heading.post}
            </h2>
          </div>
          <a
            href={instagram.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-[0.65rem] tracking-[0.3em] uppercase text-champagne hover:text-rose transition-colors whitespace-nowrap"
          >
            {instagram.handle} · {instagramSection.cta} →
          </a>
        </div>

        <InstagramGrid tiles={tiles} profileUrl={instagram.profileUrl} />
      </Reveal>
    </section>
  );
}
