import type { Config } from 'tailwindcss';

/* Colours are channel variables from globals.css (e.g. --obsidian-rgb: 6 18 42), so opacity classes like
   bg-obsidian/85 work. A plain var(--obsidian) gives Tailwind no way to add the alpha, and those classes silently
   generate nothing. */
const c = (name: string) => `rgb(var(--${name}-rgb) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      /* the in-between steps the site's colour classes use (text-ivory/72 and the like) */
      opacity: { 3: '0.03', 12: '0.12', 28: '0.28', 52: '0.52', 72: '0.72', 76: '0.76', 78: '0.78', 88: '0.88' },
      colors: {
        obsidian: c('obsidian'),
        ink: c('ink'),
        ivory: c('ivory'),
        rose: {
          DEFAULT: c('house-rose'),
          deep: c('rose-deep'),
          ink: c('rose-ink'),
        },
        champagne: c('champagne'),
        hairline: c('hairline'),
        /* brand system: Gaze Holdings and Gaze Furnishings */
        gaze: {
          navy: c('gaze-navy'),
          deep: c('gaze-deep'),
          antique: c('gaze-antique'),
          champagne: c('gaze-champagne'),
          parchment: c('gaze-parchment'),
        },
        furn: {
          lilac: c('furn-lilac'),
          ink: c('furn-ink'),
          linen: c('furn-linen'),
          walnut: c('furn-walnut'),
        },
        inst: {
          midnight: c('inst-midnight'),
          maroon: c('inst-maroon'),
          sky: c('inst-sky'),
          paper: c('inst-paper'),
        },
        manor: {
          stone: c('manor-stone'),
          ink: c('manor-ink'),
          bronze: c('manor-bronze'),
          umber: c('manor-umber'),
        },
        gli: {
          navy: c('gli-navy'),
          ink: c('gli-ink'),
          red: c('gli-red'),
          gold: c('gli-gold'),
          mist: c('gli-mist'),
        },
        her: {
          magenta: c('her-magenta'),
          terracotta: c('her-terracotta'),
          blush: c('her-blush'),
          noir: c('her-noir'),
        },
        press: {
          ink: c('press-ink'),
          paper: c('press-paper'),
          rose: c('press-rose'),
        },
      },
      fontFamily: {
        display: [c('font-outfit'), 'sans-serif'],
        serif: [c('font-cormorant'), 'serif'],
        sans: [c('font-inter'), 'system-ui', 'sans-serif'],
        headline: [c('font-thegralke'), '"Arial Narrow"', 'sans-serif'],
        text: [c('font-metropolis'), 'system-ui', 'sans-serif'],
        furn: [c('font-fogtwo'), 'Georgia', 'serif'],
        inst: [c('font-glacial'), 'system-ui', 'sans-serif'],
        'manor-head': [c('font-cormorant-garamond'), 'Georgia', 'serif'],
        'manor-text': [c('font-montserrat'), 'system-ui', 'sans-serif'],
        'gli-head': [c('font-anton'), 'Impact', 'sans-serif'],
        'gli-serif': [c('font-merriweather'), 'Georgia', 'serif'],
        'gli-text': [c('font-montserrat'), 'system-ui', 'sans-serif'],
        'her-head':[c('font-valkyrie'), 'Georgia', 'serif'],
        'her-script': [c('font-chopin'), 'cursive'],
        'her-text': [c('font-chillax'), 'system-ui', 'sans-serif'],
        'press-head': [c('font-bodonio'), 'Georgia', 'serif'],
        'press-script': [c('font-thesignature'), 'cursive'],
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
