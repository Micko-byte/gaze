import { useId, useMemo, type CSSProperties } from 'react';
import { LOGOS, type LogoId } from './logos';
import styles from './HouseLogo.module.css';

type Props = {
  id: LogoId;
  /** Accessible name; omit for decorative use (it is then hidden from assistive tech). */
  title?: string;
  /** 'original' keeps the artwork's colours; 'mono' sets it in currentColor with white details knocked out. */
  tone?: 'original' | 'mono';
  /** Trace the outlines in order, then flood the fills (loaders, page transitions). */
  draw?: boolean;
  /** In mono, what white details show as. Default: transparent. Pass the background colour behind the logo when
   *  details sit on top of a solid shape (the Press square, the Institute shield), so they still read. */
  knock?: string;
  className?: string;
  style?: CSSProperties;
};

/** The client's logos as transparent inline SVG, exactly as traced from their artwork. */
export function HouseLogo({ id, title, tone = 'original', draw = false, knock, className = '', style }: Props) {
  const uid = useId().replace(/:/g, '');
  const { viewBox, markup } = LOGOS[id];
  // gradient ids must be unique per instance, or two logos on a page share (and fight over) one definition
  const html = useMemo(
    () => markup.replace(/id="([^"]+)"/g, `id="$1-${uid}"`).replace(/url\(#([^)]+)\)/g, `url(#$1-${uid})`),
    [markup, uid],
  );
  return (
    <svg
      viewBox={viewBox}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={`${styles.logo} ${tone === 'mono' ? styles.mono : ''} ${draw ? styles.draw : ''} ${className}`}
      style={knock ? ({ ...style, '--logo-knock': knock } as CSSProperties) : style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
