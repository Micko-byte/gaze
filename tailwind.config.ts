import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: 'var(--obsidian)',
        ink: 'var(--ink)',
        ivory: 'var(--ivory)',
        rose: {
          DEFAULT: 'var(--house-rose)',
          deep: 'var(--rose-deep)',
          ink: 'var(--rose-ink)',
        },
        champagne: 'var(--champagne)',
        hairline: 'var(--hairline)',
        /* brand system: Gaze Holdings and Gaze Furnishings */
        gaze: {
          navy: 'var(--gaze-navy)',
          deep: 'var(--gaze-deep)',
          antique: 'var(--gaze-antique)',
          champagne: 'var(--gaze-champagne)',
          parchment: 'var(--gaze-parchment)',
        },
        furn: {
          lilac: 'var(--furn-lilac)',
          ink: 'var(--furn-ink)',
          linen: 'var(--furn-linen)',
          walnut: 'var(--furn-walnut)',
        },
        inst: {
          midnight: 'var(--inst-midnight)',
          maroon: 'var(--inst-maroon)',
          sky: 'var(--inst-sky)',
          paper: 'var(--inst-paper)',
        },
        her: {
          magenta: 'var(--her-magenta)',
          terracotta: 'var(--her-terracotta)',
          blush: 'var(--her-blush)',
          noir: 'var(--her-noir)',
        },
        press: {
          ink: 'var(--press-ink)',
          paper: 'var(--press-paper)',
          rose: 'var(--press-rose)',
        },
      },
      fontFamily: {
        display: ['var(--font-outfit)', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        headline: ['var(--font-thegralke)', '"Arial Narrow"', 'sans-serif'],
        text: ['var(--font-metropolis)', 'system-ui', 'sans-serif'],
        furn: ['var(--font-fogtwo)', 'Georgia', 'serif'],
        inst: ['var(--font-glacial)', 'system-ui', 'sans-serif'],
        'her-head': ['var(--font-valkyrie)', 'Georgia', 'serif'],
        'her-script': ['var(--font-chopin)', 'cursive'],
        'her-text': ['var(--font-chillax)', 'system-ui', 'sans-serif'],
        'press-head': ['var(--font-bodonio)', 'Georgia', 'serif'],
        'press-script': ['var(--font-thesignature)', 'cursive'],
      },
      letterSpacing: {
        widest2: '0.3em',
        widest3: '0.5em',
      },
      transitionTimingFunction: {
        'reveal': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
