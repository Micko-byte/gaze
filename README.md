# Gaze Holdings — Hub (gazeholdings.com)

The cinematic master portal for Gaze Holdings Ltd. — a Kenya-rooted "House of
Brands" with five divisions. This repository is **Phase 1: the holdings hub**.
The four microsites (Furnishings/Shopify, Press Global, HerGaze, and the
Institute/Manor build-out) are separate, later phases.

Built by **Sidus Digital**.

---

## Quick start (developer)

**Prerequisites:** Node 20 LTS (see `.nvmrc`), npm.

```bash
npm install        # install dependencies
npm run dev        # start dev server → http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm start          # serve the production build
npm test           # unit tests (Vitest)
npm run test:e2e   # end-to-end smoke tests (Playwright)
npm run lint       # ESLint
```

> If the dev server ever throws a stale-cache error ("missing required error
> components" / vendor-chunk errors), delete the `.next` folder and restart:
> `rm -rf .next && npm run dev` (PowerShell: `Remove-Item -Recurse -Force .next; npm run dev`).

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router), TypeScript (strict) |
| Styling | Tailwind CSS + CSS-variable design tokens |
| Animation | GSAP + ScrollTrigger + SplitType, Framer Motion |
| Smooth scroll | Lenis (integrated with GSAP ticker) |
| Fonts | Outfit, Cormorant Garamond, Inter (`next/font`) |
| Testing | Vitest + React Testing Library, Playwright |
| Hosting (target) | Vercel |

---

## Project structure

```
app/                     # routes (App Router)
  page.tsx               # homepage — composes all 8 sections
  institute/, manor/     # Phase 1 division route stubs
  legal/                 # privacy, terms, cookies
  opengraph-image.tsx    # dynamic social share card
  not-found.tsx          # branded 404
  layout.tsx             # fonts, SmoothScroll, Cursor, ShopButton, CookieBanner
  globals.css            # design tokens (CSS variables) + keyframes
components/              # one folder per UI unit (Hero, Divisions, Synergy, …)
  icons/                 # monochrome social brand glyphs
content/                 # all copy + data in typed TS (no CMS yet)
lib/                     # lenis, gsap, motion helpers, seo, instagram
public/images/           # self-hosted imagery (founder, divisions, etc.)
public/video/            # hero poster (drop hero.mp4 here to enable video)
docs/superpowers/        # design SPEC + implementation PLANS (read these!)
design-mockups/          # static HTML mockups from the design phase
proposals/               # client budget + branded Sidus deposit proposal
```

**Start here:** read `docs/superpowers/specs/` (the design spec) and
`docs/superpowers/plans/` (the step-by-step build plans). They explain every
decision.

---

## Content & configuration

All copy and data live in `/content/*.ts` (typed constants — Sanity CMS wiring
is deferred to a later phase). Key files a developer/client will edit:

- `content/social.ts` — **replace the placeholder social handles** with the real
  Gaze Holdings accounts.
- `content/shop.ts` — the Shopify storefront URL (Furnishings).
- `content/divisions.ts`, `content/hero.ts`, `content/leadership.ts`, etc.

### Environment variables

Copy `.env.example` → `.env.local` and fill in:

- `INSTAGRAM_ACCESS_TOKEN` — optional. With no token, the Instagram gallery shows
  curated fallback tiles. With a token (Meta app + Instagram Business account),
  it pulls live recent posts, cached nightly.

---

## What's done vs. pending

**Done (this repo):**
- All 8 homepage sections, fully animated, mobile-first, AA-contrast verified.
- `/institute` + `/manor` route stubs with curtain-wipe transitions.
- Legal pages + GDPR/Kenya-DPA cookie banner.
- Brand mark (SVG), branded 404, dynamic OG share image.
- Shopify "Shop" entry points (nav + floating button + Furnishings card).
- Instagram gallery (live-ready) + footer social links.
- 47 passing unit tests + Playwright smoke tests.

**Pending (later phases / needs client input):**
- Real hero video (`public/video/hero.mp4` — auto-activates when present).
- Real commissioned photography (current imagery is curated placeholder).
- Resend wiring for the contact form (currently logs + success state).
- Klaviyo wiring for the newsletter.
- Sanity CMS (content currently in typed TS).
- Vercel deploy + DNS for gazeholdings.com / gaze.co / hergaze.global.
- PayOnTime CRM + payment gateway integration.
- The four microsites.

See `docs/superpowers/plans/` for the deferred-scope notes on each.

---

## Git

- Active branch: **`feat/scaffold-and-hero`** (all work is here).
- `master` holds the docs-only baseline.
- To merge when ready: open a PR from `feat/scaffold-and-hero` → `master`, or
  `git checkout master && git merge feat/scaffold-and-hero`.
