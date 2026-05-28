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
        },
        champagne: 'var(--champagne)',
        hairline: 'var(--hairline)',
      },
      fontFamily: {
        display: ['var(--font-outfit)', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
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
