import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const alt = 'Gaze Holdings — A group of brands built for legacy';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Branded social share card. Rendered to PNG by next/og (Satori) on demand.
 * Used automatically by LinkedIn / Facebook / WhatsApp / iMessage / Twitter.
 *
 * Design notes:
 *   - Custom fonts (Outfit + Cormorant) are fetched at build/runtime from
 *     Google Fonts. We pin them by version so the design is reproducible.
 *   - Satori only supports a subset of CSS. Tailwind classes do NOT work
 *     here — everything is inline styles. SVG is supported.
 */

const OUTFIT_LIGHT_URL =
  'https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4Q.woff2';
const CORMORANT_ITALIC_URL =
  'https://fonts.gstatic.com/s/cormorantgaramond/v16/lyu8gdmu4yhhqzL8Y2j9rqIFnGdcMlw.woff2';

async function loadFont(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [outfit, cormorant] = await Promise.all([
    loadFont(OUTFIT_LIGHT_URL),
    loadFont(CORMORANT_ITALIC_URL),
  ]);

  const fonts: { name: string; data: ArrayBuffer; weight: 200 | 300 | 400; style?: 'italic' | 'normal' }[] = [];
  if (outfit) fonts.push({ name: 'Outfit', data: outfit, weight: 300, style: 'normal' });
  if (cormorant) fonts.push({ name: 'Cormorant', data: cormorant, weight: 300, style: 'italic' });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#06122A',
          color: '#F4EFE6',
          padding: '72px 88px',
          fontFamily: 'Outfit, sans-serif',
          position: 'relative',
        }}
      >
        {/* Atmospheric rose glow, top-left */}
        <div
          style={{
            position: 'absolute',
            top: -180,
            left: -180,
            width: 600,
            height: 600,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(222,186,120,0.22), rgba(6,18,42,0) 70%)',
          }}
        />
        {/* Champagne glow, bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: -240,
            right: -180,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(217,201,168,0.14), rgba(6,18,42,0) 70%)',
          }}
        />

        {/* Top — brand lockup */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: '0.5em',
              fontWeight: 500,
              color: '#F4EFE6',
            }}
          >
            GAZE
          </div>
          <svg width="22" height="20" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg">
            <polygon points="11,2 21,18 1,18" fill="#DEBA78" />
          </svg>
          <div
            style={{
              fontSize: 22,
              letterSpacing: '0.5em',
              fontWeight: 500,
              color: '#F4EFE6',
            }}
          >
            HOLDINGS
          </div>
        </div>

        {/* Middle — editorial headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 900 }}>
          <div
            style={{
              fontSize: 18,
              letterSpacing: '0.45em',
              color: '#DEBA78',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
          >
            A House of Brands
          </div>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.0,
              letterSpacing: '-0.015em',
              color: '#F4EFE6',
              fontWeight: 300,
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <span>A group of brands built for&nbsp;</span>
            <span
              style={{
                fontFamily: 'Cormorant, serif',
                fontStyle: 'italic',
                fontWeight: 300,
                color: '#DEBA78',
              }}
            >
              legacy
            </span>
            <span>.</span>
          </div>
          <div
            style={{
              fontSize: 24,
              color: 'rgba(244,239,230,0.65)',
              fontWeight: 300,
              maxWidth: 760,
            }}
          >
            Strategic leadership. Brand architecture. Capital allocation. Cross-division synergy.
          </div>
        </div>

        {/* Bottom — division strip + domain */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #2a2a2a',
            paddingTop: 28,
          }}
        >
          <div
            style={{
              fontSize: 16,
              letterSpacing: '0.35em',
              color: 'rgba(244,239,230,0.55)',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
          >
            Furnishings &nbsp;·&nbsp; Press &nbsp;·&nbsp; Institute &nbsp;·&nbsp; Manor &nbsp;·&nbsp; HerGaze
          </div>
          <div
            style={{
              fontSize: 18,
              letterSpacing: '0.3em',
              color: '#D9C9A8',
              fontWeight: 500,
            }}
          >
            gazeholdings.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    },
  );
}
