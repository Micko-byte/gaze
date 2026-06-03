import { InstagramGlyph } from '@/components/icons/SocialIcons';

export type GalleryTile = {
  key: string;
  image: string;
  alt: string;
  caption?: string;
};

type Props = {
  tiles: ReadonlyArray<GalleryTile>;
  profileUrl: string;
};

/**
 * Presentational grid of Instagram tiles. Pure — fed by InstagramGallery with
 * either live posts or curated fallback tiles. Uses a plain <img> (lazy) so the
 * same markup handles both local fallback images and remote IG CDN media
 * without per-domain next/image config.
 */
export function InstagramGrid({ tiles, profileUrl }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
      {tiles.map(tile => (
        <a
          key={tile.key}
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={tile.caption ? `Open @gazeholdings on Instagram: ${tile.caption}` : `Open @gazeholdings on Instagram — ${tile.alt}`}
          className="group relative aspect-square overflow-hidden bg-ink"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tile.image}
            alt={tile.alt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover grayscale-[0.35] transition-all duration-500 ease-reveal group-hover:grayscale-0 group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/55 transition-colors duration-500 flex items-center justify-center">
            <InstagramGlyph
              width={26}
              height={26}
              className="text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        </a>
      ))}
    </div>
  );
}
