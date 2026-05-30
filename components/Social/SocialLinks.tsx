import { socialLinks } from '@/content/social';
import { socialGlyphs } from '@/components/icons/SocialIcons';

type Props = {
  className?: string;
  /** Icon size in px. */
  size?: number;
};

export function SocialLinks({ className, size = 18 }: Props) {
  return (
    <ul className={`flex items-center gap-5 ${className ?? ''}`}>
      {socialLinks.map(link => {
        const Glyph = socialGlyphs[link.id];
        return (
          <li key={link.id}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="block text-ivory/55 hover:text-rose transition-colors duration-300"
            >
              <Glyph width={size} height={size} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
