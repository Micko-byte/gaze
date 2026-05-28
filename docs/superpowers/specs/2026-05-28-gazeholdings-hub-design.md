# Gaze Holdings — Hub Site Design Specification

**Date:** 2026-05-28
**Status:** Approved through brainstorming · awaiting spec review and user sign-off
**Author:** Brainstorming session (drafted from project brief + Founder strategy doc + visual companion)
**Project root:** `C:\Users\Lucy Wanjau\Documents\GAZE HOLDINGS`

---

## 1. Purpose

Build the cinematic master portal for Gaze Holdings Limited — the "House of Brands" landing that unifies five divisions under one continuous brand framework. The hub functions as the institutional lobby for high-net-worth investors, executive clients, B2B stakeholders, and consumers entering the group's ecosystem.

This spec covers **only the hub site** at the apex domain (`gazeholdings.com`). It does not cover the four other microsites — those are separate specs:

| Site | Domain | Stack | Spec status |
|---|---|---|---|
| **Holdings hub (this spec)** | gazeholdings.com | Next.js 14 | In progress |
| Gaze Furnishings | furnishings.gaze.co | Shopify | Not started |
| Gaze Press Global | press.gaze.co | Next.js + Amazon PA-API | Not started |
| HerGaze Global | hergaze.global | Framer or Webflow | Not started |
| Institute & Manor (Phase 1) | /institute and /manor under hub | Same Next.js app | In this spec |

## 2. Session scope

This brainstorming session targets **four deliverables** before the next pause for review:

1. Low-fidelity wireframes of all eight hub sections — **complete, approved in visual companion**.
2. Design system (colors, typography, motion timing) — **defined in this spec**.
3. Next.js project scaffolding — **to be implemented in the plan that follows this spec**.
4. The Hero section, fully coded and animated — **to be implemented in the plan that follows this spec**.

Anything beyond these four deliverables — Sanity wiring, real CMS content, the seven sections beneath the Hero, the Vercel deploy, the M-Pesa / VAT / KRA engine, the CRM integration — is **explicitly deferred** to subsequent specs. See §10.

## 3. Brand foundation

### 3.1 Voice

Confident, restrained, editorial. Short sentences. Periods land like footsteps. No marketing fluff — no "world-class," "cutting-edge," "leveraging synergies." Borrowed cadence: Aman Resorts, The Row, Bottega Veneta editorial. Faith-aware where appropriate, never preachy.

### 3.2 Palette (logo-led)

| Token | Hex | Role |
|---|---|---|
| `--obsidian` | `#0A0A0A` | Primary canvas. Dominates the site. |
| `--ivory` | `#F4EFE6` | Body copy on dark, secondary surfaces. |
| `--house-rose` | `#C99BAF` | The only saturated accent. Drawn directly from the Gaze Furnishings logo. Used sparingly for italics, division markers, and the gold-ring cursor. |
| `--rose-deep` | `#A87286` | Hover / pressed state for House Rose. |
| `--champagne` | `#D9C9A8` | Quiet metallic. Hairlines, dividers, secondary accent. |
| `--ink` | `#141414` | Inset surfaces (cards, code blocks). |
| `--hairline` | `#2a2a2a` | Borders on dark. |

Old brief proposed gold-and-bronze heritage palette; rejected in favor of the logo-led direction (Bottega / The Row / Le Labo editorial tilt).

### 3.3 Typography

| Use | Font | Weight | Source |
|---|---|---|---|
| Display headlines | Outfit | 200, 300 | Google Fonts (free) |
| Editorial accent (italic words inside headlines, founder name, pull-quotes) | Cormorant Garamond | 300 italic | Google Fonts (free) |
| Body, labels, navigation, buttons | Inter | 300, 400, 500 | Google Fonts (free) |

Outfit was chosen for geometric-sans continuity with the existing GAZE logo wordmark. Cormorant italic is the editorial counterpoint for accented words inside otherwise-sans headlines (e.g., "built for *legacy*"). All-caps tracking-wide labels use Outfit at 500 with `letter-spacing: 0.3–0.5em`.

Type scale:

```
Display XL  : clamp(2.5rem, 5.5vw, 4.5rem)  — Hero, section opens
Display L   : clamp(2rem, 4vw, 3.25rem)     — Subsequent sections
Display M   : 1.5rem                         — Section titles within cards
Body L      : 1rem                            — Lede
Body        : 0.92rem                         — Default copy
Body S      : 0.78rem                         — Captions, footnotes
Label UC    : 0.65–0.7rem, tracking 0.3–0.5em — Eyebrows and section numbers
```

### 3.4 Motion language

- **Smooth scroll**: Lenis with rubber-band easing. Respects `prefers-reduced-motion`.
- **Reveal**: SplitType letter/word reveals on display headlines (stagger 30ms, ease `expo.out`, duration 1.2s).
- **Scroll-pinned scenes**: GSAP ScrollTrigger on §02 Ethos and §04 Synergy.
- **Section transitions**: Masked clip-path reveals at section boundaries.
- **Route transitions** (to `/institute`, `/manor`): Black curtain wipe with a centred House Rose mark.
- **Custom cursor**: Thin rose-gold ring on desktop, scales 1.5× on interactive elements, hidden on touch devices.
- **Hover micro-interactions**: Framer Motion for division card lift / scale; CSS for the rest.
- **Reduced-motion fallback**: All transforms become instant; opacity transitions retained; cursor disabled; video swapped for poster.

## 4. Architecture

### 4.1 Routes

- `/` — Single long cinematic scroll containing all eight hub sections.
- `/institute` — Leadership Institute long-form page (Phase 1; may graduate to subdomain later).
- `/manor` — The Gaze Manor long-form page (Phase 1).
- `/legal/privacy`, `/legal/terms`, `/legal/cookies` — Standard pages.

External division destinations open in new tab:

- `furnishings.gaze.co`
- `press.gaze.co`
- `hergaze.global`

### 4.2 Information architecture (homepage)

```
01 Hero / Opening Film
02 The Founding Ethos
03 The Group — Division Gateway (5 cards; doubles as "interactive hierarchy chart")
04 Cross-Division Synergy (animated SVG, hub-and-spoke)
05 Leadership & Vision (Muthoni Ngugi)
06 Press & Recognition (logo marquee)
07 Contact the Group (form + cinematic backdrop)
08 Footer
```

### 4.3 Hierarchy chart resolution

The strategy doc requires an "interactive hierarchy chart" on the landing. Two adjacent sections satisfy this:

- **§03 Division Gateway** — five horizontally-arranged cards under a banner naming Gaze Holdings as parent. Each card is a clickable transition into that division's environment. This is the *hierarchy*.
- **§04 Cross-Division Synergy** — an animated SVG hub-and-spoke diagram (Gaze Holdings at center, five division nodes around it, House Rose lines drawing on scroll). This is the *visual interconnection*.

Together they fulfil the strategy doc requirement while preserving the brief's cinematic-scroll cadence.

## 5. Section specifications

### 5.1 §01 Hero / Opening Film

- Full-viewport (100vh) on desktop, 100svh on mobile to handle iOS Safari chrome.
- Background: lazy-loaded MP4 + WebM video loop (≤4MB, ≤12s, silent, muted, autoplay, playsinline). Placeholder source: Pexels CC0 luxury interior B-roll until commissioned footage replaces.
- Mobile / Save-Data / `prefers-reduced-motion`: video is swapped for a high-quality static poster (≤200KB AVIF, blurhash placeholder).
- Top nav (sticky after hero exit): GAZE ▲ HOLDINGS logo · Group · Vision · Press · Contact.
- Headline: "A group of brands built for *legacy*." — Outfit 200 + Cormorant italic on the word "legacy," letter-reveal on load.
- Subhead: "Strategic leadership. Brand architecture. Capital allocation. Cross-division synergy."
- CTA: "Enter the Group" — outlined button in House Rose border, soft fade to §02 on click (scroll-to anchor with Lenis).
- Scroll cue: small Outfit "↓ Scroll" in Champagne at the bottom, slow vertical drift.
- Custom cursor active here on desktop.

### 5.2 §02 The Founding Ethos

- Scroll-pinned for 100vh of scroll distance.
- Slow-tracking video background at 60% opacity, or static Ken Burns image if no video.
- Two-column layout on desktop, stacked on mobile.
- Left column: 3–4 sentence manifesto (sentence-by-sentence reveal on scroll progress).
- Right column: Cormorant italic pullquote — *"We build companies that outlive us."*
- Subtle Champagne particle drift in background (Canvas, <100 particles, paused on offscreen).

### 5.3 §03 The Group — Division Gateway

- Banner: "Parent: **Gaze Holdings Ltd.** — House of Brands. Five divisions." in a House-Rose-accented strip.
- Five division cards, horizontally arranged on desktop, stacked vertically on mobile.
- Each card:
  - Aspect ratio 3:4.
  - Top: division number + category label (e.g., "01 / Lifestyle").
  - Middle: full-bleed division image with subtle Ken Burns zoom on hover.
  - Bottom: division name + "Step inside →" CTA.
  - Hover: border becomes House Rose, image scales 1.04×, gold-line draws across the top.
- Division destinations:
  | # | Division | Destination |
  |---|---|---|
  | 01 | Gaze Furnishings | `furnishings.gaze.co` (external, new tab) |
  | 02 | Gaze Press Global | `press.gaze.co` (external, new tab) |
  | 03 | Gaze Leadership Institute | `/institute` (in-site, curtain wipe) |
  | 04 | The Gaze Manor | `/manor` (in-site, curtain wipe) |
  | 05 | HerGaze Global | `hergaze.global` (external, new tab) |

### 5.4 §04 Cross-Division Synergy

- Centered animated SVG diagram, 1200px max width.
- Central node: "Gaze Holdings" in a filled House Rose circle (110×110px).
- Five surrounding nodes (one per division), each 90×90px, outlined in `--rose-deep`.
- House Rose lines connect center to each division, drawing on scroll using GSAP DrawSVG.
- Hover each division node → caption fades in describing the cross-division relationship (e.g., "Interiors furnish the Manor. Press publishes the Institute's curriculum.").
- Mobile: SVG collapses to a vertical stack of relationship statements; no diagram.

### 5.5 §05 Leadership & Vision

- Two-column on desktop, stacked on mobile.
- Left: portrait of Muthoni Ngugi (purple satin + book — Option A from visual companion), 4:5 aspect, with subtle overlay (multiply blend of House Rose at 6% to harmonize with palette).
- Right (content stack):
  - Eyebrow: "05 — Vision" in House Rose Outfit.
  - Name: "Muthoni *Ngugi*" — Outfit 200 with Cormorant italic on surname.
  - Role: "Founder & Director, Gaze Holdings Ltd." in Cormorant italic.
  - Bio:
    > Muthoni Ngugi built Gaze Holdings around a single conviction: African enterprise deserves to be told at the same volume as anyone else's. Five divisions — interiors, publishing, leadership formation, broadcast, women's transformation — operating with a gender-balanced team of forty across Kenya and beyond. In 2024 she was named Businesswoman of the Year at the She Millionaire Business Summit in Limpopo, South Africa. The work is restrained. The intention is not.
  - Stats grid (3 cells, hairline top borders, count-up animation on enter):
    - **5** Divisions
    - **3** Countries
    - **10+** Years in market

### 5.6 §06 Press & Recognition

- Eyebrow: "As seen in."
- Horizontal marquee of recognition logos and badges, infinite loop (30s duration, pauseable on hover).
- Includes a "Businesswoman of the Year 2024 — She Millionaire Summit" badge with Champagne hairline border, alongside placeholder logos until real partnership/press logos are confirmed.
- Logos render in `--ivory` at 40% opacity, transition to 100% + `--house-rose` tint on hover.

### 5.7 §07 Contact the Group

- Two-column on desktop, stacked on mobile.
- Left: editorial heading "Step into the *conversation*." + 1–2 sentence prompt.
- Right: minimal form, underline-only fields (no boxes):
  - Full name (text, required)
  - Email address (email, required)
  - Phone (international format, optional — required for division=Investor)
  - Division of interest (select: Furnishings / Press / Institute / Manor / HerGaze / Investor / Media, required)
  - Message (textarea, required)
  - Submit: "Send enquiry" — Outfit small-caps in House Rose border.
- Background: full-bleed cinematic photograph (Unsplash placeholder — quiet luxury interior at dusk).
- Submission target: Resend → `info@gazeholdings.com` with `[Division] ` subject prefix. CRM webhook to HubSpot/ActiveCampaign is **deferred to a later session**, not in this scaffold.

### 5.8 §08 Footer

- Three-column on desktop, stacked on mobile.
- Column 1: Logo lockup + Cormorant italic "Nairobi, Kenya. Global scale." + row of five division mark links.
- Column 2: Newsletter — single email field + arrow submit, with the line "Quarterly. No noise." beneath.
- Column 3: Legal stack — Privacy / Terms / Cookies / © 2026 Gaze Holdings Ltd.

## 6. Technical stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 14 (App Router) | Spec'd in brief; supports server components, route transitions, ISR for future Sanity wiring. |
| Language | TypeScript (strict) | Brief requirement. |
| Styling | Tailwind CSS + CSS variables for design tokens | Tokens in CSS so they work outside the React tree (e.g., custom cursor canvas). |
| Animation | GSAP + ScrollTrigger + SplitType + DrawSVG | Industry-standard for the scroll-pinned + draw-on-scroll patterns required. |
| Smooth scroll | Lenis | Brief requirement; pairs natively with GSAP. |
| Micro-interactions | Framer Motion | For card hover lifts and small state animations where GSAP would be overkill. |
| Content | Hardcoded TypeScript constants in `/content/*.ts` | Defer Sanity wiring to a follow-up session per session-scope decision. |
| Email | Resend | Lightweight, free tier sufficient for launch volume. |
| Analytics | GA4 + Plausible (both, dual-tag) | Brief requirement. |
| Image optimization | `next/image` with AVIF + WebP, blurhash placeholders | Brief requirement. |
| Video | `<video>` MP4 + WebM, intersection-observer pause | Brief requirement. |
| Hosting | Vercel (deferred to follow-up session) | Brief requirement; not part of this scaffold's deliverables. |

## 7. Performance, accessibility, SEO targets

- Lighthouse Performance ≥85, Accessibility ≥95, SEO ≥95, Best Practices ≥95.
- WCAG 2.1 AA. All interactive elements keyboard-navigable. Focus states visible (House Rose ring).
- All motion respects `prefers-reduced-motion`.
- Hero video ≤4MB combined MP4 + WebM. Poster ≤200KB AVIF.
- LCP ≤2.5s on a fast 4G connection.
- JSON-LD `Organization` schema on `/` with all five divisions as `subOrganization`.
- Per-page Open Graph cinematic images, Twitter Card large image.
- `robots.txt`, `sitemap.xml`, canonical URLs.
- Cookie banner (GDPR + Kenya Data Protection Act compliant). Defer to follow-up — placeholder banner in scaffold.

## 8. Asset strategy

No real video, photography, or non-Furnishings logo files exist yet. Strategy for this scaffold:

- **Hero video**: Pexels CC0 luxury interior B-roll, ≤4MB. Replace at launch with commissioned footage.
- **Division card images**: Unsplash editorial photography per division category, ≤300KB AVIF each.
- **Ethos background**: Unsplash neutral texture or interior, Ken Burns zoom.
- **Founder portrait**: Real — Muthoni Ngugi purple-satin-with-book (locked in §5.5). Copy to `public/images/founder/muthoni-ngugi.png`.
- **Press logos**: Placeholder gray tiles labeled "Logo 01"–"Logo 08" + the She Millionaire 2024 award badge as real recognition.
- **Contact backdrop**: Unsplash quiet-luxury interior at dusk.
- **Brand logo lockup**: Use the existing Gaze Furnishings logo character (geometric "GAZE" wordmark) as a basis, with "HOLDINGS" set in Outfit small-caps below, separated by a House Rose ▲ — to be refined when the holdings-specific logo is commissioned.

All placeholders to be replaced before public launch. The codebase isolates assets in `public/images/` and `public/video/` so swaps are a 1-line change.

## 9. Brand voice rules (for §5 copywriting)

When generating any homepage copy:

1. Sentences average 8–14 words. Some shorter for cadence.
2. No words on the bullshit-list: world-class, cutting-edge, synergies, leveraging, seamless, revolutionary, innovative (without specifics), best-in-class, robust, holistic.
3. Specifics over claims: "a gender-balanced team of forty" beats "a diverse and talented team."
4. Italic Cormorant inside otherwise-sans headlines for one accented noun per headline maximum (e.g., *legacy*, *vision*, *conversation*, *interiors*).
5. CTAs are imperative + restrained: "Enter the Group," "Step inside," "Send enquiry." Never "Click here," "Learn more," or exclamation marks.

## 10. Out of scope for this spec

Deferred to subsequent specs / sessions:

- Sanity Studio setup and content modeling.
- Vercel deployment, DNS configuration, environment variables.
- M-Pesa STK Push, Visa/MC/AmEx merchant integration, EFT/RTGS.
- Kenya VAT (16%) tax engine, KRA receipting, geo-IP tax rules.
- HubSpot / ActiveCampaign CRM integration, cart-abandonment automation.
- Furnishings (Shopify), Press Global (Next.js + PA-API), HerGaze (Framer/Webflow) microsites.
- `/institute` and `/manor` long-form content (Phase 1 stubs only in this scaffold).
- Real video and photography (commissioned shoots).
- Final holdings-specific logo (using lockup of existing wordmark + Outfit "HOLDINGS").
- Three rounds of design revisions (will run after the first review pass).

## 11. Acceptance criteria for this session's deliverables

The next implementation plan (writing-plans skill, immediately following this spec) must satisfy:

1. **Wireframes**: Already captured in `.superpowers/brainstorm/564-1779973925/wireframe.html`. ✅
2. **Design system**: Tailwind config + `globals.css` define every token in §3.2 and §3.3. The hero already uses the tokens.
3. **Next.js scaffold**:
   - `npx create-next-app@latest` with TypeScript, Tailwind, App Router, ESLint.
   - Folder structure: `app/` (routes), `components/` (UI), `content/` (typed TS content), `lib/` (utils), `public/` (assets).
   - Lenis installed and initialized in the root layout.
   - GSAP + ScrollTrigger + SplitType + DrawSVG installed.
   - Framer Motion installed.
   - Custom cursor component built and toggled via `prefers-reduced-motion` and `pointer: fine`.
4. **Hero coded + animated**:
   - Full §5.1 implementation.
   - Letter-reveal headline animation (SplitType + GSAP).
   - Lazy-loaded video with poster fallback.
   - "Enter the Group" CTA scrolls smoothly to §02 anchor (which can be a placeholder section for now).
   - Sticky top nav appears after Hero exit.
   - Mobile-first responsive (verified at iPhone SE, iPhone 14 Pro, iPad, 1440px desktop, 4K).
   - Lighthouse Performance ≥85 on the Hero alone.

When all four are demonstrably true, this session pauses for user review and the next session covers §§02–08.

## 12. Open questions

None. All decisions locked through the visual-companion brainstorming flow. Ready for spec review.

---

*This spec was produced through the superpowers brainstorming flow with visual companion at `http://localhost:54283`. Source artefacts persist in `.superpowers/brainstorm/564-1779973925/`.*
