export type GalleryTile = {
  key: string;
  image: string;
  href: string;
  alt: string;
  caption?: string;
};

type Props = {
  tiles: ReadonlyArray<GalleryTile>;
  profileUrl: string;
};

function Tile({ tile, profileUrl, hidden = false }: { tile: GalleryTile; profileUrl: string; hidden?: boolean }) {
  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={hidden ? 'true' : undefined}
      tabIndex={hidden ? -1 : undefined}
      aria-label={hidden ? undefined : (tile.caption ? `Instagram post: ${tile.caption}` : `View @gazeholdings on Instagram`)}
      className="group relative aspect-[4/5] w-[72vw] max-w-[260px] md:w-[250px] overflow-hidden bg-ink shrink-0"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tile.image}
        alt={tile.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover grayscale-[0.22] brightness-[0.92] transition duration-700 ease-reveal group-hover:scale-[1.04] group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/5 via-obsidian/25 to-obsidian/78" />
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[linear-gradient(135deg,rgba(244,239,230,0.08),transparent_35%,transparent_65%,rgba(222,186,120,0.10))]" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 text-ivory">
        <div>
          <div className="font-display text-[0.52rem] tracking-[0.35em] uppercase text-champagne/70">
            @gazeholdings
          </div>
          <div className="mt-1 text-[0.68rem] leading-tight text-ivory/80 max-w-[13ch]">
            Open on Instagram
          </div>
        </div>
        <span className="rounded-full border border-ivory/25 px-2.5 py-1 text-[0.48rem] tracking-[0.3em] uppercase text-ivory/65">
          IG
        </span>
      </div>
    </a>
  );
}

export function InstagramGrid({ tiles, profileUrl }: Props) {
  const loop = [...tiles, ...tiles];

  return (
    <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
      <div className="flex w-max gap-3 md:gap-4 motion-safe:animate-[instagram-marquee_42s_linear_infinite] will-change-transform">
        {loop.map((tile, index) => (
          <Tile
            key={`${tile.key}-${index}`}
            tile={tile}
            profileUrl={profileUrl}
            hidden={index >= tiles.length}
          />
        ))}
      </div>
    </div>
  );
}
