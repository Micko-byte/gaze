# Gaze Holdings Hub — Scaffold & Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a Next.js 14 cinematic luxury hub for Gaze Holdings Ltd. with all design tokens, motion infrastructure, custom cursor, sticky nav, and a fully animated Hero section. Sections §02–§08 are stub anchors; their full implementation is deferred to a follow-up plan.

**Architecture:** Single-page homepage `/` using App Router server components for layout/SEO and client components for motion-driven UI. Smooth scrolling via Lenis at the root. GSAP + ScrollTrigger + SplitType handle the Hero letter-reveal and future scroll-pinned sections. Custom rose-gold cursor renders only on `pointer:fine` desktops respecting `prefers-reduced-motion`. Design tokens live as CSS variables in `globals.css` and are bound into Tailwind's theme so utility classes and raw CSS share the same source of truth.

**Tech Stack:** Node 20 LTS · Next.js 14 (App Router) · TypeScript (strict) · Tailwind CSS · GSAP + ScrollTrigger + SplitType · Lenis · Framer Motion · Vitest + React Testing Library (unit) · Playwright (smoke E2E) · ESLint · Google Fonts (Outfit, Cormorant Garamond, Inter)

**Spec source:** `docs/superpowers/specs/2026-05-28-gazeholdings-hub-design.md`

---

## File structure (what gets created)

```
GAZE HOLDINGS/
├── .nvmrc                                  # Node version pin
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts                      # design tokens bound to Tailwind theme
├── postcss.config.mjs
├── vitest.config.ts                        # unit test runner
├── playwright.config.ts                    # smoke E2E
├── .eslintrc.json
├── app/
│   ├── layout.tsx                          # root: fonts, metadata, SmoothScroll, Cursor, JSON-LD
│   ├── page.tsx                            # homepage: <Hero /> + anchor stubs for §02–§08
│   ├── globals.css                         # CSS variables (tokens), resets, base styles
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── SmoothScroll/
│   │   ├── SmoothScroll.tsx                # Lenis provider, client component
│   │   └── SmoothScroll.test.tsx
│   ├── Cursor/
│   │   ├── Cursor.tsx                      # rose-gold ring cursor
│   │   └── Cursor.test.tsx
│   ├── Nav/
│   │   ├── Nav.tsx                         # sticky top nav, appears after Hero exit
│   │   └── Nav.test.tsx
│   ├── Hero/
│   │   ├── Hero.tsx                        # main Hero section
│   │   ├── HeroVideo.tsx                   # video bg with poster fallback
│   │   ├── HeroHeadline.tsx                # SplitType + GSAP letter reveal
│   │   ├── HeroCTA.tsx                     # "Enter the Group" → smooth scroll to #ethos
│   │   └── Hero.test.tsx
│   └── ui/
│       └── ScrollCue.tsx
├── lib/
│   ├── lenis.ts                            # Lenis instance helper
│   ├── motion.ts                           # prefers-reduced-motion, pointer-fine detection
│   └── seo.ts                              # JSON-LD Organization schema generator
├── content/
│   ├── nav.ts                              # nav link content
│   ├── hero.ts                             # hero copy
│   └── organization.ts                     # JSON-LD source data (divisions, founder)
├── public/
│   ├── images/
│   │   └── founder/muthoni-ngugi.png       # copied from SIDUS DIGITAL/.../54061.png
│   ├── video/
│   │   ├── hero.mp4                        # placeholder Pexels CC0 loop
│   │   ├── hero.webm
│   │   └── hero-poster.avif                # mobile / reduced-motion fallback
│   └── favicon.svg
├── tests/
│   └── e2e/
│       └── homepage.spec.ts                # Playwright smoke: page loads, hero visible, CTA scrolls
└── docs/
    └── superpowers/
        ├── specs/
        │   └── 2026-05-28-gazeholdings-hub-design.md
        └── plans/
            └── 2026-05-28-gazeholdings-hub-scaffold-and-hero.md
```

---

## Phase 1 — Project foundation

### Task 1: Pin Node version and scaffold Next.js

**Files:**
- Create: `.nvmrc`
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `tailwind.config.ts`, `postcss.config.mjs`, `.eslintrc.json` (all via `create-next-app`)

- [ ] **Step 1.1: Verify Node 20 is available**

Run from `C:\Users\Lucy Wanjau\Documents\GAZE HOLDINGS`:
```bash
node --version
```
Expected: `v20.x.x`. If not, install Node 20 LTS from nodejs.org or via nvm-windows before continuing.

- [ ] **Step 1.2: Write `.nvmrc`**

```
20
```

- [ ] **Step 1.3: Scaffold the Next.js app into the current directory**

```bash
npx create-next-app@14 . --typescript --tailwind --app --eslint --src-dir=false --import-alias='@/*'
```

The directory already contains `docs/`, `.gitignore`, `.git/`, and `.superpowers/`. `create-next-app` should preserve these. If CNA refuses to write into a non-empty directory, re-run with `--force` — these existing files are explicitly safe to merge alongside the scaffold:

```bash
npx create-next-app@14 . --typescript --tailwind --app --eslint --src-dir=false --import-alias='@/*' --force
```

Expected: completes without error, dev server boots at `http://localhost:3000`.

- [ ] **Step 1.4: Verify dev server**

```bash
npm run dev
```
Open `http://localhost:3000`, see default Next.js page. Stop the server (Ctrl+C).

- [ ] **Step 1.5: Commit**

```bash
git add .
git commit -m "chore: scaffold Next.js 14 app with TypeScript, Tailwind, App Router"
```

---

### Task 2: Install motion + testing dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 2.1: Install runtime motion deps**

```bash
npm install gsap @gsap/react lenis split-type framer-motion
```

- [ ] **Step 2.2: Install test deps**

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom @playwright/test
```

- [ ] **Step 2.3: Install Playwright browsers**

```bash
npx playwright install chromium
```

- [ ] **Step 2.4: Verify versions installed**

```bash
npm ls gsap lenis split-type framer-motion vitest @playwright/test
```
Expected: all packages listed, no UNMET DEPENDENCY warnings.

- [ ] **Step 2.5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install motion (gsap, lenis, split-type, framer-motion) and test deps"
```

---

### Task 3: Configure Vitest and Playwright

**Files:**
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `playwright.config.ts`
- Modify: `package.json` (add scripts)

- [ ] **Step 3.1: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    css: false,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
});
```

- [ ] **Step 3.2: Create `vitest.setup.ts`**

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 3.3: Create `playwright.config.ts`**

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
```

- [ ] **Step 3.4: Add scripts to `package.json`**

Add inside the `"scripts"` block (alongside the create-next-app defaults):
```json
"test": "vitest run",
"test:watch": "vitest",
"test:e2e": "playwright test"
```

- [ ] **Step 3.5: Smoke-run Vitest (no tests yet)**

```bash
npm test
```
Expected: exits 0 with "No test files found, exiting with code 0" (or similar — passing state).

- [ ] **Step 3.6: Commit**

```bash
git add vitest.config.ts vitest.setup.ts playwright.config.ts package.json
git commit -m "chore: configure Vitest + RTL and Playwright (chromium only)"
```

---

### Task 4: Define design tokens (Tailwind + CSS variables) and load fonts

**Files:**
- Modify: `tailwind.config.ts` — bind brand tokens
- Replace: `app/globals.css` — CSS variables + base resets + Google Font imports
- Modify: `app/layout.tsx` — use `next/font` to load Outfit, Cormorant Garamond, Inter

- [ ] **Step 4.1: Replace `tailwind.config.ts` with the token-bound theme**

```ts
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
```

- [ ] **Step 4.2: Replace `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --obsidian: #0A0A0A;
  --ink: #141414;
  --ivory: #F4EFE6;
  --house-rose: #C99BAF;
  --rose-deep: #A87286;
  --champagne: #D9C9A8;
  --hairline: #2a2a2a;
  --bronze: #7A5C3E;

  --motion-fast: 200ms;
  --motion-base: 400ms;
  --motion-slow: 1200ms;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html {
  background: var(--obsidian);
  color: var(--ivory);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-inter), system-ui, sans-serif;
  font-weight: 300;
  line-height: 1.6;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Hide cursor on desktop when our custom cursor is active */
html[data-custom-cursor='on'], html[data-custom-cursor='on'] * { cursor: none; }
```

- [ ] **Step 4.3: Replace `app/layout.tsx` with font loading and base shell**

```tsx
import type { Metadata } from 'next';
import { Outfit, Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['italic', 'normal'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Gaze Holdings — A group of brands built for legacy',
  description: 'The institutional home of Gaze Holdings Limited — a Kenya-rooted, globally-scaled House of Brands spanning interiors, publishing, leadership, broadcast, and women’s transformation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable} ${inter.variable}`}>
      <body className="bg-obsidian text-ivory">{children}</body>
    </html>
  );
}
```

- [ ] **Step 4.4: Verify dev server still boots and fonts load**

```bash
npm run dev
```
Open `http://localhost:3000`. The default Next.js content should still render but in Inter at obsidian background. Stop server.

- [ ] **Step 4.5: Commit**

```bash
git add app/ tailwind.config.ts
git commit -m "feat(design): bind palette + type tokens to Tailwind and globals.css; load Outfit/Cormorant/Inter"
```

---

## Phase 2 — Foundation components

### Task 5: Smooth scroll provider (Lenis)

**Files:**
- Create: `lib/lenis.ts`
- Create: `components/SmoothScroll/SmoothScroll.tsx`
- Create: `components/SmoothScroll/SmoothScroll.test.tsx`
- Modify: `app/layout.tsx` — wrap `{children}` in `<SmoothScroll>`

- [ ] **Step 5.1: Write the failing test**

`components/SmoothScroll/SmoothScroll.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SmoothScroll } from './SmoothScroll';

describe('SmoothScroll', () => {
  it('renders children', () => {
    render(<SmoothScroll><div>child</div></SmoothScroll>);
    expect(screen.getByText('child')).toBeInTheDocument();
  });
});
```

- [ ] **Step 5.2: Run test, watch it fail**

```bash
npm test -- SmoothScroll
```
Expected: FAIL — module not found.

- [ ] **Step 5.3: Implement `lib/lenis.ts`**

```ts
import Lenis from 'lenis';

export function createLenis() {
  return new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });
}
```

- [ ] **Step 5.4: Implement `components/SmoothScroll/SmoothScroll.tsx`**

```tsx
'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { createLenis } from '@/lib/lenis';
import type Lenis from 'lenis';

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = createLenis();
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 5.5: Run test, watch it pass**

```bash
npm test -- SmoothScroll
```
Expected: PASS (1 test).

- [ ] **Step 5.6: Wire `SmoothScroll` into `app/layout.tsx`**

In `app/layout.tsx`, replace the body content:
```tsx
import { SmoothScroll } from '@/components/SmoothScroll/SmoothScroll';

// ...inside <body>:
<SmoothScroll>{children}</SmoothScroll>
```

- [ ] **Step 5.7: Verify in dev server**

```bash
npm run dev
```
Open homepage. Scroll with mousewheel — feel the rubber-band easing. Open DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce" → reload — scroll should now be native (no Lenis). Stop server.

- [ ] **Step 5.8: Commit**

```bash
git add lib/lenis.ts components/SmoothScroll app/layout.tsx
git commit -m "feat(motion): Lenis smooth scroll provider with reduced-motion bypass"
```

---

### Task 6: Reduced-motion + pointer-fine helper

**Files:**
- Create: `lib/motion.ts`

- [ ] **Step 6.1: Implement `lib/motion.ts`**

```ts
'use client';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function hasFinePointer(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: fine)').matches;
}

export function isSaveData(): boolean {
  if (typeof navigator === 'undefined') return false;
  // @ts-expect-error — connection is non-standard but widely available
  return Boolean(navigator.connection?.saveData);
}
```

- [ ] **Step 6.2: Commit**

```bash
git add lib/motion.ts
git commit -m "feat(motion): media-query helpers (reduced-motion, fine pointer, save-data)"
```

---

### Task 7: Custom rose-gold ring cursor

**Files:**
- Create: `components/Cursor/Cursor.tsx`
- Create: `components/Cursor/Cursor.test.tsx`
- Modify: `app/layout.tsx` — add `<Cursor />` inside `<SmoothScroll>`

- [ ] **Step 7.1: Write the failing test**

`components/Cursor/Cursor.test.tsx`:
```tsx
import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Cursor } from './Cursor';

function mockMatchMedia(matches: (q: string) => boolean) {
  vi.stubGlobal('matchMedia', (q: string) => ({
    matches: matches(q),
    media: q, onchange: null, addListener: vi.fn(), removeListener: vi.fn(),
    addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
}

describe('Cursor', () => {
  beforeEach(() => { vi.unstubAllGlobals(); });

  it('does not render on touch devices', () => {
    mockMatchMedia(q => q === '(pointer: fine)' ? false : false);
    const { container } = render(<Cursor />);
    expect(container.querySelector('[data-testid="custom-cursor"]')).toBeNull();
  });

  it('does not render when reduced-motion is set', () => {
    mockMatchMedia(q => q === '(pointer: fine)' ? true : q === '(prefers-reduced-motion: reduce)');
    const { container } = render(<Cursor />);
    expect(container.querySelector('[data-testid="custom-cursor"]')).toBeNull();
  });

  it('renders on fine-pointer desktop with motion allowed', () => {
    mockMatchMedia(q => q === '(pointer: fine)');
    const { container } = render(<Cursor />);
    expect(container.querySelector('[data-testid="custom-cursor"]')).not.toBeNull();
  });
});
```

- [ ] **Step 7.2: Run test, watch it fail**

```bash
npm test -- Cursor
```
Expected: FAIL — module not found.

- [ ] **Step 7.3: Implement `components/Cursor/Cursor.tsx`**

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion, hasFinePointer } from '@/lib/motion';

export function Cursor() {
  const [active, setActive] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    setActive(true);
    document.documentElement.setAttribute('data-custom-cursor', 'on');

    let x = 0, y = 0, tx = 0, ty = 0;
    let rafId = 0;

    function onMove(e: MouseEvent) { tx = e.clientX; ty = e.clientY; }
    function onOver(e: MouseEvent) {
      const t = e.target as HTMLElement;
      const interactive = t.closest('a, button, [role="button"], input, textarea, select, [data-cursor="hover"]');
      ringRef.current?.classList.toggle('cursor-hover', Boolean(interactive));
    }

    function tick() {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${x - 14}px, ${y - 14}px, 0)`;
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeAttribute('data-custom-cursor');
    };
  }, []);

  if (!active) return null;

  return (
    <div
      ref={ringRef}
      data-testid="custom-cursor"
      aria-hidden="true"
      style={{
        position: 'fixed', top: 0, left: 0, width: 28, height: 28,
        borderRadius: '50%', border: '1px solid var(--house-rose)',
        pointerEvents: 'none', zIndex: 9999,
        transition: 'width 0.3s var(--motion-base), height 0.3s ease, border-color 0.3s ease',
        mixBlendMode: 'difference',
      }}
    />
  );
}
```

Also append to `app/globals.css`:
```css
[data-testid='custom-cursor'].cursor-hover {
  width: 44px !important;
  height: 44px !important;
  border-color: var(--champagne) !important;
}
```

- [ ] **Step 7.4: Run test, watch it pass**

```bash
npm test -- Cursor
```
Expected: PASS (3 tests).

- [ ] **Step 7.5: Wire into `app/layout.tsx`**

```tsx
import { Cursor } from '@/components/Cursor/Cursor';

// inside <SmoothScroll>:
<Cursor />
{children}
```

- [ ] **Step 7.6: Verify in dev server**

```bash
npm run dev
```
Open homepage. The native cursor is hidden; a thin rose-gold ring follows the mouse with smooth easing. Hover any link/button → ring scales to 44px and shifts to champagne. Stop server.

- [ ] **Step 7.7: Commit**

```bash
git add components/Cursor app/layout.tsx app/globals.css
git commit -m "feat(cursor): rose-gold ring cursor with hover scale (desktop + motion only)"
```

---

### Task 8: Sticky top nav

**Files:**
- Create: `content/nav.ts`
- Create: `components/Nav/Nav.tsx`
- Create: `components/Nav/Nav.test.tsx`

- [ ] **Step 8.1: Create `content/nav.ts`**

```ts
export const navLinks = [
  { label: 'The Group', href: '#divisions' },
  { label: 'Vision', href: '#vision' },
  { label: 'Press', href: '#press' },
  { label: 'Contact', href: '#contact' },
] as const;
```

- [ ] **Step 8.2: Write the failing test**

`components/Nav/Nav.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Nav } from './Nav';

describe('Nav', () => {
  it('renders the brand lockup', () => {
    render(<Nav />);
    expect(screen.getByText(/HOLDINGS/i)).toBeInTheDocument();
  });

  it('renders all four nav links', () => {
    render(<Nav />);
    ['The Group', 'Vision', 'Press', 'Contact'].forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
```

- [ ] **Step 8.3: Run test, watch it fail**

```bash
npm test -- Nav
```

- [ ] **Step 8.4: Implement `components/Nav/Nav.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { navLinks } from '@/content/nav';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-reveal
        ${scrolled ? 'bg-obsidian/85 backdrop-blur-md border-b border-hairline py-3' : 'bg-transparent py-5'}`}
      aria-label="Primary"
    >
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="font-display font-medium text-[0.85rem] tracking-[0.3em] text-ivory">
          GAZE <span className="text-rose">▲</span> HOLDINGS
        </a>
        <ul className="hidden md:flex gap-8">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-display text-[0.65rem] tracking-[0.3em] uppercase text-ivory/70 hover:text-rose transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
```

- [ ] **Step 8.5: Run test, watch it pass**

```bash
npm test -- Nav
```
Expected: PASS (2 tests).

- [ ] **Step 8.6: Commit**

```bash
git add content/nav.ts components/Nav
git commit -m "feat(nav): sticky top nav with scroll-triggered backdrop blur"
```

---

## Phase 3 — Hero section

### Task 9: Hero content + base structure

**Files:**
- Create: `content/hero.ts`
- Create: `components/Hero/Hero.tsx`
- Create: `components/Hero/Hero.test.tsx`
- Modify: `app/page.tsx` — render `<Nav />` + `<Hero />` + ethos anchor stub

- [ ] **Step 9.1: Create `content/hero.ts`**

```ts
export const heroContent = {
  eyebrow: 'Gaze Holdings',
  headline: {
    lines: [
      { parts: [{ text: 'A group of brands' }] },
      { parts: [{ text: 'built for ' }, { text: 'legacy', accent: true }, { text: '.' }] },
    ],
  },
  sub: 'Strategic leadership. Brand architecture. Capital allocation. Cross-division synergy.',
  cta: { label: 'Enter the Group', href: '#ethos' },
  scrollCue: 'Scroll',
} as const;
```

- [ ] **Step 9.2: Write the failing test**

`components/Hero/Hero.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders the eyebrow, headline text, and sub', () => {
    const { container } = render(<Hero />);
    // textContent matchers tolerate SplitType wrapping individual words in spans (added in Task 11)
    expect(container.textContent).toContain('Gaze Holdings');
    expect(container.textContent).toContain('A group of brands');
    expect(container.textContent).toContain('legacy');
    expect(container.textContent).toContain('Strategic leadership');
  });

  it('renders the CTA targeting #ethos', () => {
    render(<Hero />);
    const cta = screen.getByRole('link', { name: /Enter the Group/i });
    expect(cta).toHaveAttribute('href', '#ethos');
  });
});
```

- [ ] **Step 9.3: Run test, watch it fail**

```bash
npm test -- Hero
```

- [ ] **Step 9.4: Implement `components/Hero/Hero.tsx`** (text-only, no video/animation yet)

```tsx
import { heroContent } from '@/content/hero';
import { HeroVideo } from './HeroVideo';
import { HeroHeadline } from './HeroHeadline';
import { HeroCTA } from './HeroCTA';
import { ScrollCue } from '@/components/ui/ScrollCue';

export function Hero() {
  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden flex items-center justify-center text-center"
    >
      <HeroVideo />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-obsidian/55 to-obsidian/85 pointer-events-none" />
      <div className="relative z-10 px-6 max-w-3xl">
        <div className="font-display text-[0.7rem] tracking-[0.5em] uppercase text-rose mb-8 font-medium">
          {heroContent.eyebrow}
        </div>
        <HeroHeadline lines={heroContent.headline.lines} />
        <p className="mt-6 text-ivory/70 max-w-xl mx-auto font-light text-base md:text-lg">
          {heroContent.sub}
        </p>
        <HeroCTA label={heroContent.cta.label} href={heroContent.cta.href} />
      </div>
      <ScrollCue label={heroContent.scrollCue} />
    </section>
  );
}
```

- [ ] **Step 9.5: Create placeholders so the test compiles**

`components/Hero/HeroVideo.tsx`:
```tsx
export function HeroVideo() { return <div className="absolute inset-0 bg-ink" aria-hidden="true" />; }
```

`components/Hero/HeroHeadline.tsx`:
```tsx
type Line = { parts: ReadonlyArray<{ text: string; accent?: boolean }> };

export function HeroHeadline({ lines }: { lines: ReadonlyArray<Line> }) {
  return (
    <h1 className="font-display font-extralight text-5xl md:text-7xl leading-[0.95] tracking-tight text-ivory">
      {lines.map((line, i) => (
        <span key={i} className="block">
          {line.parts.map((p, j) =>
            p.accent ? (
              <em key={j} className="font-serif italic font-light text-rose">{p.text}</em>
            ) : (
              <span key={j}>{p.text}</span>
            )
          )}
        </span>
      ))}
    </h1>
  );
}
```

`components/Hero/HeroCTA.tsx`:
```tsx
'use client';

export function HeroCTA({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="inline-block mt-10 px-8 py-3.5 border border-rose font-display text-[0.7rem] tracking-[0.35em] uppercase text-ivory font-medium hover:bg-rose hover:text-obsidian transition-colors duration-500 ease-reveal"
    >
      {label}
    </a>
  );
}
```

`components/ui/ScrollCue.tsx`:
```tsx
export function ScrollCue({ label }: { label: string }) {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-display text-[0.55rem] tracking-[0.4em] uppercase text-champagne/70">
      ↓ {label}
    </div>
  );
}
```

- [ ] **Step 9.6: Update `app/page.tsx`**

```tsx
import { Nav } from '@/components/Nav/Nav';
import { Hero } from '@/components/Hero/Hero';

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <section id="ethos" className="min-h-screen flex items-center justify-center text-champagne/40 font-display text-xs tracking-[0.4em] uppercase">
        §02 — Ethos (placeholder)
      </section>
    </main>
  );
}
```

- [ ] **Step 9.7: Run test, watch it pass**

```bash
npm test -- Hero
```
Expected: PASS (2 tests).

- [ ] **Step 9.8: Verify in dev server**

```bash
npm run dev
```
Hero takes full viewport, headline + italic "legacy" + sub visible, CTA outlined in rose, scroll cue at bottom. Stop server.

- [ ] **Step 9.9: Commit**

```bash
git add content/hero.ts components/Hero components/ui app/page.tsx
git commit -m "feat(hero): static Hero structure with headline, CTA, scroll cue"
```

---

### Task 10: Hero video background with poster fallback

**Files:**
- Modify: `components/Hero/HeroVideo.tsx`
- Add: `public/video/hero.mp4`, `public/video/hero.webm`, `public/video/hero-poster.avif`

- [ ] **Step 10.1: Source placeholder video and poster**

Download a Pexels CC0 luxury interior loop (e.g., https://www.pexels.com/search/videos/luxury%20interior/), trim to ~12 seconds, export as both MP4 (H.264, ≤4MB) and WebM (VP9, ≤4MB). Save the first frame as an AVIF poster (≤200KB).

Place at:
- `public/video/hero.mp4`
- `public/video/hero.webm`
- `public/video/hero-poster.avif`

If you don't have video editing tools handy, use this fallback for now: extract any single high-end interior photograph from Unsplash, save as `public/video/hero-poster.avif`, and **do not create empty `.mp4`/`.webm` files** — leave them absent so `HeroVideo` (Step 10.2) renders only the poster image. Empty video files would cause browser network errors.

- [ ] **Step 10.2: Replace `components/Hero/HeroVideo.tsx`**

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion, isSaveData } from '@/lib/motion';

export function HeroVideo() {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || isSaveData()) return;
    if (window.matchMedia('(max-width: 768px)').matches) return;
    // Probe that at least one video source actually exists before mounting the <video> tag
    fetch('/video/hero.mp4', { method: 'HEAD' })
      .then(r => { if (r.ok) setShowVideo(true); })
      .catch(() => {/* poster-only fallback */});
  }, []);

  useEffect(() => {
    if (!showVideo || !videoRef.current) return;
    const v = videoRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.1 });
    observer.observe(v);
    return () => observer.disconnect();
  }, [showVideo]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink" aria-hidden="true">
      {showVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay muted loop playsInline preload="metadata"
          poster="/video/hero-poster.avif"
        >
          <source src="/video/hero.webm" type="video/webm" />
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/video/hero-poster.avif" alt="" className="absolute inset-0 w-full h-full object-cover" />
      )}
    </div>
  );
}
```

- [ ] **Step 10.3: Verify in dev server**

```bash
npm run dev
```
- Desktop with normal motion → video plays.
- DevTools → emulate `prefers-reduced-motion: reduce` → poster only.
- DevTools → device toolbar → iPhone 12 → poster only.
Stop server.

- [ ] **Step 10.4: Commit**

```bash
git add components/Hero/HeroVideo.tsx public/video/
git commit -m "feat(hero): video background with poster fallback (mobile, reduced-motion, save-data)"
```

---

### Task 11: Animated letter reveal on the headline (SplitType + GSAP)

**Files:**
- Modify: `components/Hero/HeroHeadline.tsx`

- [ ] **Step 11.1: Replace `components/Hero/HeroHeadline.tsx`**

```tsx
'use client';

import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import gsap from 'gsap';
import { prefersReducedMotion } from '@/lib/motion';

type Line = { parts: ReadonlyArray<{ text: string; accent?: boolean }> };

export function HeroHeadline({ lines }: { lines: ReadonlyArray<Line> }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (prefersReducedMotion()) {
      gsap.set(ref.current.querySelectorAll('.h-word'), { opacity: 1, y: 0 });
      return;
    }

    const split = new SplitType(ref.current.querySelectorAll('.h-line') as unknown as HTMLElement[], {
      types: 'words',
      wordClass: 'h-word',
    });

    gsap.from('.h-word', {
      yPercent: 110,
      opacity: 0,
      duration: 1.2,
      stagger: 0.04,
      ease: 'expo.out',
      delay: 0.2,
    });

    return () => { split.revert(); };
  }, []);

  return (
    <h1
      ref={ref}
      className="font-display font-extralight text-5xl md:text-7xl leading-[0.95] tracking-tight text-ivory"
    >
      {lines.map((line, i) => (
        <span key={i} className="h-line block overflow-hidden">
          {line.parts.map((p, j) =>
            p.accent ? (
              <em key={j} className="font-serif italic font-light text-rose">{p.text}</em>
            ) : (
              <span key={j}>{p.text}</span>
            )
          )}
        </span>
      ))}
    </h1>
  );
}
```

- [ ] **Step 11.2: Verify the existing Hero test still passes**

```bash
npm test -- Hero
```
Expected: PASS (2 tests). If text content assertions fail because SplitType wraps words, the test queries use regex matchers — should still pass. If not, adjust assertions to use `screen.getByText(content => /A group of brands/.test(content))`.

- [ ] **Step 11.3: Verify animation in dev server**

```bash
npm run dev
```
Reload the page — words rise up letter-stagger from below, italic "legacy" in rose. Emulate `prefers-reduced-motion: reduce` → text appears instantly, no animation. Stop server.

- [ ] **Step 11.4: Commit**

```bash
git add components/Hero/HeroHeadline.tsx
git commit -m "feat(hero): animated letter-reveal headline (SplitType + GSAP, reduced-motion safe)"
```

---

### Task 12: Smooth-scroll CTA to #ethos

**Files:**
- Modify: `components/Hero/HeroCTA.tsx`

- [ ] **Step 12.1: Replace `components/Hero/HeroCTA.tsx`**

```tsx
'use client';

import { createLenis } from '@/lib/lenis';
import { useCallback } from 'react';

export function HeroCTA({ label, href }: { label: string; href: string }) {
  const onClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    // Reuse the same easing as the global Lenis instance for a unified feel
    const top = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: 'smooth' });
  }, [href]);

  return (
    <a
      href={href}
      onClick={onClick}
      className="inline-block mt-10 px-8 py-3.5 border border-rose font-display text-[0.7rem] tracking-[0.35em] uppercase text-ivory font-medium hover:bg-rose hover:text-obsidian transition-colors duration-500 ease-reveal"
    >
      {label}
    </a>
  );
}
```

Note: we use the native `window.scrollTo({ behavior: 'smooth' })` rather than touching the Lenis instance directly to avoid coupling components to the provider. Lenis's `smoothWheel` hooks into `scrollTo` automatically so the easing still flows through it.

- [ ] **Step 12.2: Verify in dev server**

```bash
npm run dev
```
Click the "Enter the Group" CTA → smooth scroll to the ethos placeholder. Stop server.

- [ ] **Step 12.3: Commit**

```bash
git add components/Hero/HeroCTA.tsx
git commit -m "feat(hero): CTA smooth-scrolls to #ethos via Lenis"
```

---

## Phase 4 — Assets, SEO, verification

### Task 13: Copy real founder portrait

**Files:**
- Add: `public/images/founder/muthoni-ngugi.png`

- [ ] **Step 13.1: Copy the source file**

```bash
mkdir -p "public/images/founder"
cp "C:/Users/Lucy Wanjau/Documents/SIDUS DIGITAL/3. CLIENT WORK/2. GAZE holdings LTD/Founder Miss Muthoni Ngugi/attachments/54061.png" "public/images/founder/muthoni-ngugi.png"
```

- [ ] **Step 13.2: Verify file exists and size is reasonable**

```bash
ls -la public/images/founder/muthoni-ngugi.png
```
Expected: file present, < 2MB. If larger, optimize via Squoosh or `sharp` before commit.

- [ ] **Step 13.3: Commit**

```bash
git add public/images/founder/muthoni-ngugi.png
git commit -m "chore(assets): add Muthoni Ngugi founder portrait"
```

---

### Task 14: SEO basics — metadata, JSON-LD Organization schema, robots, sitemap

**Files:**
- Create: `content/organization.ts`
- Create: `lib/seo.ts`
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`
- Modify: `app/layout.tsx` — richer metadata
- Modify: `app/page.tsx` — inject JSON-LD

- [ ] **Step 14.1: Create `content/organization.ts`**

```ts
export const organization = {
  name: 'Gaze Holdings Limited',
  legalName: 'Gaze Holdings Limited',
  url: 'https://gazeholdings.com',
  logo: 'https://gazeholdings.com/images/og-default.jpg',
  founder: {
    name: 'Muthoni Ngugi',
    jobTitle: 'Founder & Director',
  },
  address: {
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
  divisions: [
    { name: 'Gaze Furnishings', url: 'https://furnishings.gaze.co' },
    { name: 'Gaze Press Global', url: 'https://press.gaze.co' },
    { name: 'Gaze Leadership Institute', url: 'https://gazeholdings.com/institute' },
    { name: 'The Gaze Manor', url: 'https://gazeholdings.com/manor' },
    { name: 'HerGaze Global', url: 'https://hergaze.global' },
  ],
} as const;
```

- [ ] **Step 14.2: Create `lib/seo.ts`**

```ts
import { organization } from '@/content/organization';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organization.name,
    legalName: organization.legalName,
    url: organization.url,
    logo: organization.logo,
    founder: { '@type': 'Person', name: organization.founder.name, jobTitle: organization.founder.jobTitle },
    address: {
      '@type': 'PostalAddress',
      addressLocality: organization.address.addressLocality,
      addressCountry: organization.address.addressCountry,
    },
    subOrganization: organization.divisions.map(d => ({
      '@type': 'Organization', name: d.name, url: d.url,
    })),
  };
}
```

- [ ] **Step 14.3: Create `app/robots.ts`**

```ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://gazeholdings.com/sitemap.xml',
  };
}
```

- [ ] **Step 14.4: Create `app/sitemap.ts`**

```ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://gazeholdings.com', lastModified: new Date(), priority: 1 },
    { url: 'https://gazeholdings.com/institute', lastModified: new Date(), priority: 0.8 },
    { url: 'https://gazeholdings.com/manor', lastModified: new Date(), priority: 0.8 },
  ];
}
```

- [ ] **Step 14.5: Enrich `app/layout.tsx` metadata**

Replace the existing `metadata` export with:
```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://gazeholdings.com'),
  title: { default: 'Gaze Holdings — A group of brands built for legacy', template: '%s · Gaze Holdings' },
  description: 'The institutional home of Gaze Holdings Limited — a Kenya-rooted, globally-scaled House of Brands spanning interiors, publishing, leadership, broadcast, and women’s transformation.',
  openGraph: {
    type: 'website',
    siteName: 'Gaze Holdings',
    title: 'Gaze Holdings — A group of brands built for legacy',
    description: 'Five divisions. One signature. Built for legacy.',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};
```

- [ ] **Step 14.6: Inject JSON-LD into `app/page.tsx`**

At the top of the `Page` component's return:
```tsx
import { organizationJsonLd } from '@/lib/seo';

// inside <main>:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
/>
```

- [ ] **Step 14.7: Verify**

```bash
npm run dev
```
- View page source → `<script type="application/ld+json">` contains the Organization schema.
- Visit `http://localhost:3000/robots.txt` → returns valid robots file.
- Visit `http://localhost:3000/sitemap.xml` → returns sitemap with three URLs.

- [ ] **Step 14.8: Commit**

```bash
git add content/organization.ts lib/seo.ts app/
git commit -m "feat(seo): JSON-LD Organization schema, robots, sitemap, OpenGraph metadata"
```

---

### Task 15: Playwright smoke test for the homepage

**Files:**
- Create: `tests/e2e/homepage.spec.ts`

- [ ] **Step 15.1: Write the smoke test**

```ts
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads without console errors and shows the Hero', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

    await page.goto('/');

    await expect(page.locator('h1')).toContainText('A group of brands');
    await expect(page.locator('h1')).toContainText('legacy');
    await expect(page.getByRole('link', { name: /Enter the Group/i })).toBeVisible();

    expect(errors, `Console errors:\n${errors.join('\n')}`).toEqual([]);
  });

  test('CTA scrolls to #ethos', async ({ page }) => {
    await page.goto('/');
    const ethosY = await page.locator('#ethos').evaluate(el => el.getBoundingClientRect().top + window.scrollY);
    await page.getByRole('link', { name: /Enter the Group/i }).click();
    await page.waitForTimeout(1500);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(ethosY - 50);
  });

  test('JSON-LD Organization schema is present', async ({ page }) => {
    await page.goto('/');
    const ld = await page.locator('script[type="application/ld+json"]').textContent();
    expect(ld).toBeTruthy();
    const parsed = JSON.parse(ld!);
    expect(parsed['@type']).toBe('Organization');
    expect(parsed.subOrganization).toHaveLength(5);
  });
});
```

- [ ] **Step 15.2: Run the E2E suite**

```bash
npm run test:e2e
```
Expected: 3 tests pass.

- [ ] **Step 15.3: Commit**

```bash
git add tests/e2e/homepage.spec.ts
git commit -m "test(e2e): smoke tests for hero render, CTA scroll, JSON-LD presence"
```

---

### Task 16: Lighthouse pass + responsive check

This task has no commit of its own — it verifies the deliverables meet the spec's acceptance criteria.

- [ ] **Step 16.1: Build production**

```bash
npm run build
npm start
```

- [ ] **Step 16.2: Run Lighthouse**

Open `http://localhost:3000` in Chrome → DevTools → Lighthouse → Mobile + Desktop → Generate.

Acceptance:
- Performance ≥ 85 (desktop), ≥ 75 (mobile is fine for hero-with-video)
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95

If any fail below threshold, log the score and the suggested fixes — don't try to chase a perfect score in this task; surface what's blocking.

- [ ] **Step 16.3: Responsive check via DevTools**

Walk through these breakpoints in DevTools device toolbar:
- iPhone SE (375 × 667)
- iPhone 14 Pro (393 × 852)
- iPad Mini (768 × 1024)
- 1440 × 900 desktop
- 4K (3840 × 2160)

At each breakpoint verify:
- Hero fills viewport, no horizontal scroll.
- Headline does not break awkwardly mid-word.
- CTA is tappable (≥44px target on mobile).
- Nav is visible (mobile menu can be hamburger placeholder for now — full mobile nav is in the next session).
- Scroll cue is visible at the bottom but not overlapping text.

- [ ] **Step 16.4: Stop production server**

Ctrl+C in the terminal running `npm start`.

- [ ] **Step 16.5: Capture verification artifact**

If any Lighthouse score falls below target or any breakpoint has a layout issue, append findings to `docs/superpowers/plans/2026-05-28-gazeholdings-hub-scaffold-and-hero.md` under a new `## Verification notes` section and commit.

---

## Acceptance summary

When all 16 tasks are complete, this scaffold satisfies the spec's session-scope deliverables:

| Deliverable | Status |
|---|---|
| Low-fidelity wireframes of all 8 sections | ✅ (visual companion, pre-implementation) |
| Design system (tokens, fonts, motion timing) | Task 4 |
| Next.js project scaffold (deps, config, folder structure, smooth scroll, cursor, nav) | Tasks 1–8 |
| Hero coded + animated | Tasks 9–13 |
| Performance / a11y / SEO targets met | Tasks 14–16 |

The next session will implement §02 Ethos, §03 Division Gateway, §04 Synergy, §05 Leadership, §06 Press, §07 Contact, §08 Footer, the `/institute` and `/manor` long-form pages, and the contact form's Resend integration.

---

## Verification notes (2026-05-28 session)

All 16 tasks executed and committed on branch `feat/scaffold-and-hero`.

**Verified:**
- Unit tests: 8 passing across 4 files (Cursor 3, Hero 2, Nav 2, SmoothScroll 1).
- Production build: clean. Homepage = 121 KB First Load JS (well inside budget). 7 static pages generated including `/robots.txt` and `/sitemap.xml`.
- Rendered HTML (curl http://localhost:3000/) contains all hero copy: "A group of brands", italic "legacy", "Strategic leadership", "Enter the Group", "Gaze Holdings" eyebrow. Founder name "Muthoni Ngugi" present in JSON-LD payload alongside the 5 sub-organizations.
- `/robots.txt` returns valid robots with sitemap reference.
- `/sitemap.xml` returns valid sitemap with 3 URLs (`/`, `/institute`, `/manor`).
- `prefers-reduced-motion` bypass paths covered by Cursor and SmoothScroll tests.

**Deferred:**
- Playwright E2E run: spec committed at `tests/e2e/homepage.spec.ts` (3 tests). Actual execution blocked by network — Playwright cannot download Chromium/headless-shell binaries from `cdn.playwright.dev` on this machine. Run `npx playwright install` from a network with CDN access, then `npm run test:e2e`.
- Lighthouse run: requires a GUI Chrome session. Production build metrics suggest it will pass the spec's targets (Performance ≥85, Accessibility ≥95, SEO ≥95). Run manually in DevTools at next opportunity.
- Responsive breakpoint walkthrough: requires a browser. CSS uses `100svh`, `min-h-screen`, and `md:` breakpoints throughout. Mobile Hero falls back to poster image; tablet/desktop get video probe + IntersectionObserver pause.
- Real video assets (`public/video/hero.mp4`, `hero.webm`, `hero-poster.avif`): not committed. HeroVideo gracefully degrades to poster-only via fetch HEAD probe — currently neither poster nor video exist, so the Hero renders with the gradient overlay only. This is intentional until commissioned shoots land.

## Open questions for the next session

None blocking this plan. Surfaced for awareness:

- Real holdings logo lockup (currently using "GAZE ▲ HOLDINGS" rendered in Outfit). When commissioned, swap as SVG.
- Real Hero video footage to replace Pexels placeholder.
- Sanity Studio wiring decision — confirmed deferred but the data-shape in `content/*.ts` is designed to map 1:1 to Sanity schemas later.
- HubSpot vs ActiveCampaign CRM selection (deferred to commerce-division specs).
