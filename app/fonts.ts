import localFont from 'next/font/local';
import { Anton, Merriweather, Montserrat } from 'next/font/google';

/*
 * The agreed brand faces. Licences live in app/fonts/licences. The 1001fonts FFC faces (Valkyrie, Chopin Script)
 * may not be modified, so they are served as the original files.
 *
 *   Gaze Holdings ........ Thegralke (headlines) + Metropolis (text, every house)
 *   Gaze Furnishings ..... FogtwoNo5
 *   Leadership Institute . Glacial Indifference (house mark); its own site follows the GLI brand book (below)
 *   Her Gaze Global ...... Valkyrie (headlines), Chopin Script (accent), Chillax (text)
 *   Gaze Press Global .... Bodonio (titles), Thesignature (accent)
 */
const thegralke = localFont({ src: './fonts/Thegralke.ttf', variable: '--font-thegralke', display: 'swap' });

const metropolis = localFont({
  src: [
    { path: './fonts/Metropolis-Light.otf', weight: '300' },
    { path: './fonts/Metropolis-Regular.otf', weight: '400' },
    { path: './fonts/Metropolis-Medium.otf', weight: '500' },
    { path: './fonts/Metropolis-SemiBold.otf', weight: '600' },
  ],
  variable: '--font-metropolis',
  display: 'swap',
});

const fogtwo = localFont({ src: './fonts/FogtwoNo5.otf', variable: '--font-fogtwo', display: 'swap' });

const glacial = localFont({
  src: [
    { path: './fonts/GlacialIndifference-Regular.otf', weight: '400' },
    { path: './fonts/GlacialIndifference-Bold.otf', weight: '700' },
  ],
  variable: '--font-glacial',
  display: 'swap',
});

const valkyrie = localFont({
  src: [
    { path: './fonts/Valkyrie-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/Valkyrie-Italic.ttf', weight: '400', style: 'italic' },
  ],
  variable: '--font-valkyrie',
  display: 'swap',
});

const chopin = localFont({ src: './fonts/ChopinScript.ttf', variable: '--font-chopin', display: 'swap' });

const chillax = localFont({
  src: [
    { path: './fonts/Chillax-Light.woff2', weight: '300' },
    { path: './fonts/Chillax-Regular.woff2', weight: '400' },
    { path: './fonts/Chillax-Medium.woff2', weight: '500' },
    { path: './fonts/Chillax-Semibold.woff2', weight: '600' },
  ],
  variable: '--font-chillax',
  display: 'swap',
});

const bodonio = localFont({ src: './fonts/Bodonio.ttf', variable: '--font-bodonio', display: 'swap' });

const thesignature = localFont({ src: './fonts/Thesignature.otf', variable: '--font-thesignature', display: 'swap' });

/*
 * Gaze Leadership Institute: the faces of its own brand book (GLI Brand Book V1), all SIL Open Font Licence and
 * self-hosted by next/font at build. Anton for headings, Merriweather Black for the name, Montserrat for text.
 */
const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton', display: 'swap' });

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '900'],
  style: ['normal', 'italic'],
  variable: '--font-merriweather',
  display: 'swap',
});

const montserrat = Montserrat({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-montserrat', display: 'swap' });

export const fontVariables = [thegralke, metropolis, fogtwo, glacial, valkyrie, chopin, chillax, bodonio, thesignature, anton, merriweather, montserrat]
  .map((f) => f.variable)
  .join(' ');
