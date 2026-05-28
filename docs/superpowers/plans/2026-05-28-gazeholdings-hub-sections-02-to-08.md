# Gaze Holdings Hub — Sections §02–§08 + Route Stubs Implementation Plan

> **For agentic workers:** This plan continues from `2026-05-28-gazeholdings-hub-scaffold-and-hero.md` on branch `feat/scaffold-and-hero` (or new branch `feat/sections-02-08`). Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the remaining 7 sections of the cinematic homepage (§02 Ethos → §08 Footer), plus `/institute` and `/manor` Phase 1 route stubs with black-curtain-wipe transitions.

**Architecture:** Each section is a self-contained client/server component under `components/SectionXxx/`. Scroll-pinned scenes (§02 Ethos, §04 Synergy line-draw) use GSAP ScrollTrigger registered in a global module. Route transitions use Framer Motion `AnimatePresence` wrapped at the app shell level. GSAP DrawSVG is paid-only — line-draw is implemented manually via `stroke-dasharray` + `stroke-dashoffset` animated by GSAP.

**Tech additions:** GSAP ScrollTrigger plugin (free, bundled with GSAP). Unsplash placeholder images for §03 division cards and §07 contact backdrop. No new npm dependencies.

**Spec source:** `docs/superpowers/specs/2026-05-28-gazeholdings-hub-design.md` §§5.2–5.8.

---

## File structure additions

```
GAZE HOLDINGS/
├── app/
│   ├── page.tsx                            # wire in all 7 new sections + Footer
│   ├── institute/
│   │   └── page.tsx                        # Phase 1 stub
│   ├── manor/
│   │   └── page.tsx                        # Phase 1 stub
│   └── template.tsx                        # Framer Motion AnimatePresence for route transitions
├── components/
│   ├── Ethos/Ethos.tsx + .test.tsx
│   ├── Divisions/
│   │   ├── Divisions.tsx
│   │   ├── DivisionCard.tsx
│   │   └── Divisions.test.tsx
│   ├── Synergy/Synergy.tsx + .test.tsx
│   ├── Leadership/
│   │   ├── Leadership.tsx
│   │   ├── StatCountUp.tsx
│   │   └── Leadership.test.tsx
│   ├── Press/Press.tsx + .test.tsx
│   ├── Contact/
│   │   ├── Contact.tsx
│   │   ├── ContactForm.tsx                 # client component
│   │   └── Contact.test.tsx
│   ├── Footer/Footer.tsx + .test.tsx
│   └── RouteCurtain/RouteCurtain.tsx       # curtain transition wrapper
├── content/
│   ├── ethos.ts                            # manifesto sentences + pullquote
│   ├── divisions.ts                        # 5 division descriptors
│   ├── synergy.ts                          # node positions + relationship captions
│   ├── leadership.ts                       # bio + stats
│   ├── press.ts                            # logos + award badge
│   └── contact.ts                          # form copy + division options
├── lib/
│   └── gsap.ts                             # ScrollTrigger registration
└── public/
    └── images/
        ├── divisions/                      # 5 placeholder division cards
        └── contact-backdrop.jpg            # cinematic interior dusk shot
```

---

## Phase A — Shared motion infrastructure

### Task A1: Register GSAP ScrollTrigger globally

**Files:**
- Create: `lib/gsap.ts`

- [ ] **Step A1.1:** Write `lib/gsap.ts`:

```ts
'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
```

- [ ] **Step A1.2:** Commit:

```bash
git add lib/gsap.ts
git commit -m "feat(motion): register GSAP ScrollTrigger plugin"
```

---

## Phase B — Sections §02 → §08

### Task B1: §02 Founding Ethos

**Files:** `content/ethos.ts`, `components/Ethos/Ethos.tsx`, `components/Ethos/Ethos.test.tsx`, modify `app/page.tsx`

Content:
- Manifesto (3 sentences):
  1. "We started in interiors. We stayed because the work asked us to."
  2. "Five disciplines now. One signature across all of them."
  3. "African enterprise, told at the volume it deserves."
- Pullquote: *"We build companies that outlive us."*

Component:
- ScrollTrigger pin on the section for 100vh.
- Two-column grid (`md:grid-cols-2`) inside the pinned wrapper.
- Sentences fade-in one-by-one as scroll progress crosses 0.25, 0.5, 0.75.
- Pullquote opacity + slight y-translate on scroll progress 0.4 → 0.8.
- Background: Champagne radial gradient drift (CSS keyframe `@keyframes drift`).

Test (with reduced-motion mock): renders manifesto + pullquote text contiguously.

Commit: `feat(sections): §02 founding ethos with scroll-pinned reveal`

### Task B2: §03 Division Gateway

**Files:** `content/divisions.ts`, `components/Divisions/Divisions.tsx`, `components/Divisions/DivisionCard.tsx`, `components/Divisions/Divisions.test.tsx`, `public/images/divisions/{furnishings,press,institute,manor,hergaze}.jpg`, modify `app/page.tsx`

Content: 5 division descriptors with name, tagline (one line), category label (e.g. "01 / Lifestyle"), href (external for furnishings/press/hergaze, internal for institute/manor), external boolean.

Component:
- Section id `divisions`. Heading: "The Group" with italic *"five divisions"*.
- Banner strip: "Parent: Gaze Holdings Ltd. — House of Brands."
- Desktop: horizontal scroll-snap row of 5 cards (`flex overflow-x-auto snap-x`). Mobile: vertical stack.
- Each card 3:4 aspect, image + hover scale + gold-line draw + "Step inside →" CTA.
- External cards open in new tab (`target="_blank" rel="noopener"`); internal cards plain hrefs.

Asset note: For now, use Unsplash placeholder URLs directly in `next/image` `src` (with `images.remotePatterns` in `next.config.mjs` allowing `images.unsplash.com`). Real commissioned imagery replaces in a later session.

Test: all 5 division names rendered, external cards have correct `target="_blank"`.

Commit: `feat(sections): §03 division gateway (5 cards, hierarchy banner)`

### Task B3: §04 Cross-Division Synergy

**Files:** `content/synergy.ts`, `components/Synergy/Synergy.tsx`, `components/Synergy/Synergy.test.tsx`, modify `app/page.tsx`

Content: 5 division nodes with id, label, x/y position percentages, and relationship caption.

Component:
- SVG 1200×600 with central "Gaze Holdings" filled circle + 5 outlined division circles.
- Lines from center to each node use `stroke-dasharray: 1000; stroke-dashoffset: 1000` initially; GSAP ScrollTrigger animates `stroke-dashoffset → 0` over scroll progress.
- On node hover (desktop) or tap (mobile), caption fades in below the diagram.
- Mobile fallback: vertical stack of 5 caption rows, no diagram.

Test (reduced-motion mock): all 5 division labels rendered, central "Gaze Holdings" rendered.

Commit: `feat(sections): §04 synergy diagram with line-draw-on-scroll`

### Task B4: §05 Leadership & Vision

**Files:** `content/leadership.ts`, `components/Leadership/Leadership.tsx`, `components/Leadership/StatCountUp.tsx`, `components/Leadership/Leadership.test.tsx`, modify `app/page.tsx`

Content:
- Founder bio (approved verbatim, from session 1's brand voice work).
- Stats: 5 / 3 / 10+ (Divisions / Countries / Years in market).

Component:
- Two-column grid. Left: `<Image>` of `/images/founder/muthoni-ngugi.png` with rose-tinted overlay (multiply blend at 6%). Right: eyebrow + name + role + bio + StatCountUp grid.
- `StatCountUp` uses GSAP `to` on a `count` value with ScrollTrigger `start: 'top 80%'`. The "+" suffix on "10+" stays static.

Test (reduced-motion mock): renders "Muthoni Ngugi" name, role, bio sentences, all three stats labels.

Commit: `feat(sections): §05 leadership & vision with count-up stats`

### Task B5: §06 Press & Recognition

**Files:** `content/press.ts`, `components/Press/Press.tsx`, `components/Press/Press.test.tsx`, modify `app/page.tsx`

Content:
- Eyebrow: "As seen in."
- Awards: She Millionaire 2024 (Businesswoman of the Year) — real.
- 7 placeholder logo-blocks labeled "Logo 01" … "Logo 07".

Component:
- Section id `press`. Marquee row uses CSS `@keyframes slide` (duplicate logos, translate -50%, 30s linear infinite).
- Pause on hover.
- Logos render at 40% opacity, transition to 100% with House Rose tint on hover.
- The She Millionaire badge is styled differently — Champagne hairline border, two lines of text.

Test: heading "As seen in" rendered, She Millionaire badge text present, ≥ 7 logo blocks.

Commit: `feat(sections): §06 press & recognition marquee`

### Task B6: §07 Contact the Group

**Files:** `content/contact.ts`, `components/Contact/Contact.tsx`, `components/Contact/ContactForm.tsx`, `components/Contact/Contact.test.tsx`, `public/images/contact-backdrop.jpg`, modify `app/page.tsx`

Content:
- Heading: "Step into the *conversation*."
- Sub: "We respond to every enquiry within two working days. No automation. No templates."
- Division options: Furnishings, Press, Institute, Manor, HerGaze, Investor, Media.

Component:
- Section id `contact`. Two-column grid: editorial left + form right.
- Form: 5 underline-only fields (full name, email, phone, division select, message), Outfit small-caps "Send enquiry" submit button.
- Form behavior in this session: client-side `onSubmit` writes to console + shows a placeholder "Thank you" message. Real Resend webhook deferred to a follow-up.
- Background: full-bleed Unsplash placeholder image (dimmed gradient overlay).

Test: form has all 5 expected fields by `name` attribute, submit button labeled "Send enquiry".

Commit: `feat(sections): §07 contact (client-side submit placeholder)`

### Task B7: §08 Footer

**Files:** `content/footer.ts`, `components/Footer/Footer.tsx`, `components/Footer/Footer.test.tsx`, modify `app/page.tsx`

Content:
- Brand lockup + tagline "Nairobi, Kenya. Global scale." in Cormorant italic.
- 5 division mark links (same hrefs as §03 cards).
- Newsletter mini-form: single email field + arrow submit + "Quarterly. No noise." byline.
- Legal stack: Privacy / Terms / Cookies / © 2026 Gaze Holdings Ltd.

Component:
- Three-column grid on desktop, stacked on mobile.
- Newsletter submit: client-side console log only (real wiring deferred).

Test: brand lockup rendered, all 5 division marks present, "Quarterly. No noise." rendered.

Commit: `feat(sections): §08 footer with newsletter and legal stack`

---

## Phase C — Routes + transitions

### Task C1: /institute and /manor Phase 1 stubs

**Files:** `app/institute/page.tsx`, `app/manor/page.tsx`

Each is a server component that renders:
- Full-viewport hero (similar to homepage Hero but with division-specific copy):
  - Institute: "Training Kingdom Leaders."
  - Manor: "Media. Design. Broadcast."
- Eyebrow "Gaze Leadership Institute" / "The Gaze Manor"
- Short manifesto paragraph (2–3 sentences each)
- A single CTA: "Make enquiry" → routes back to homepage `#contact`.
- Below the hero, an "In development — full programme overview launching next." text strip.

These are Phase 1 stubs per spec — full long-form content is deferred.

Commit: `feat(routes): /institute and /manor Phase 1 stubs`

### Task C2: Curtain-wipe route transitions

**Files:** `app/template.tsx`, `components/RouteCurtain/RouteCurtain.tsx`

- `app/template.tsx` re-renders on every navigation. It wraps `{children}` in a Framer Motion component that fades the page in from opacity 0 → 1 with a 0.6s curtain pull-up (a black overlay that translates from 0% to -100% Y after a brief hold).
- A centred House Rose ▲ mark sits in the middle of the curtain during the hold.
- Respects `prefers-reduced-motion` — instant page swap when reduced.

Test: snapshot-render the RouteCurtain to verify it renders a child + overlay element. Animation behavior is browser-only.

Commit: `feat(routes): curtain-wipe transition between routes (reduced-motion safe)`

---

## Phase D — Verification

### Task D1: Wire-up + verify

- [ ] **Step D1.1:** Update `app/page.tsx` to include all 7 new sections in order: `<Ethos />`, `<Divisions />`, `<Synergy />`, `<Leadership />`, `<Press />`, `<Contact />`, `<Footer />`. Remove the temporary ethos placeholder.
- [ ] **Step D1.2:** Update Nav's `content/nav.ts` href targets if needed — `#divisions`, `#vision`, `#press`, `#contact` should now resolve.
- [ ] **Step D1.3:** Add Unsplash to `next.config.mjs` `images.remotePatterns`:
  ```js
  images: { remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }] }
  ```
- [ ] **Step D1.4:** Run unit tests: `npm test` — all should pass.
- [ ] **Step D1.5:** Production build: `npm run build` — should succeed.
- [ ] **Step D1.6:** Append verification notes to this plan and commit.

---

## Verification notes (2026-05-28 session)

All tasks executed and committed on branch `feat/scaffold-and-hero`.

**Verified:**
- Unit tests: **22 passing across 11 files** (added Ethos 2, Divisions 3, Synergy 1, Leadership 1, Press 2, Contact 2, Footer 3 — total +14 tests since Session 1).
- Production build: clean across **9 static pages**.
  - `/` = 129 KB First Load JS (was 121 KB pre-sections, +8 KB for all 7 sections).
  - `/institute` and `/manor` = 88.6 KB each.
  - `/robots.txt`, `/sitemap.xml` continue to generate correctly.
- All sections render in correct order in `app/page.tsx`: Hero → Ethos → Divisions → Synergy → Leadership → Press → Contact → Footer.
- Nav anchors resolve: `#divisions`, `#vision`, `#press`, `#contact` are now valid scroll targets.
- Route stubs `/institute` and `/manor` render their own Nav + hero + "Make enquiry" CTA + Footer.
- Curtain-wipe `RouteCurtain` is wired via `app/template.tsx`. Reduced-motion bypass returns children directly.
- Unsplash placeholder imagery configured in `next.config.mjs` `images.remotePatterns`.

**Known visual quirks (deferred polish, not blockers):**
- `§04 Synergy` SVG node hover captions only show on desktop. Mobile uses a vertical caption stack instead — by design.
- `§02 Ethos` ScrollTrigger pin requires real scroll to test — jsdom can't simulate. Reduced-motion path is unit-tested.
- `§06 Press` marquee animation pauses on hover via CSS only.

**Deferred to next session:**
- Real Resend wiring for `§07 Contact` form submission (currently `console.log` + success message).
- Real Klaviyo wiring for `§08 Footer` newsletter (same).
- Real division card imagery + holdings-specific logo SVG.
- `/legal/privacy`, `/legal/terms`, `/legal/cookies` placeholder pages.
- The four microsites (Furnishings, Press Global, HerGaze, plus Kenya commerce layer).

## Out of scope (deferred to subsequent sessions)

- Real Resend integration for §07 form submissions.
- Real Klaviyo / Mailchimp wiring for §08 newsletter.
- Commissioned division card imagery (currently Unsplash placeholders).
- Real Press logos / partnerships.
- Full `/institute` and `/manor` long-form content (programmes, cohort dates, faculty grid, application form).
- The four microsites (Furnishings/Shopify, Press/Next.js+PA-API, HerGaze/Framer).
- The Kenya commerce layer (M-Pesa STK, VAT engine, KRA receipting, ActiveCampaign CRM).
- Sanity Studio wiring (content currently in typed TS).
