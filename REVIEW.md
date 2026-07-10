# Homepage Rebuild — Audit & Review Handoff

Purpose: give a reviewing LLM everything needed to check this work independently.
Scope of this change set: a pre-launch rebuild of the **homepage** (`src/app/page.tsx`)
into 8 editorial sections, layered on an existing "Samara-style" design system.
Other pages (`/projects`, `/about`) were only touched indirectly (shared components).

Stack: Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4 ·
Framer Motion. Everything renders as static (all 4 routes prerender).

---

## 1. How to run & verify

```bash
npm run dev                 # http://localhost:3000
npx tsc --noEmit            # types
npx next build              # production build (also type-checks)
npx eslint src --ext .ts,.tsx
```

Verification status as of this handoff (measured, not asserted):

| Check | Result |
|---|---|
| `next build` | ✅ passes — all 4 routes prerender static |
| `tsc --noEmit` | ✅ clean (exit 0) |
| ESLint | ⚠️ 11 errors, 8 warnings — see F3 (build does **not** fail on these) |
| Header state machine | ✅ verified programmatically (hero glass / solid / dark glass) |
| Keyboard rail nav | ✅ ArrowRight/Left scroll the focused rail; arrows have aria-labels |
| Screenshots 1440+390, light+dark | ✅ all sections render, dark parity, no pure #000/#FFF |
| No "coming soon" copy | ✅ (only appears in a rule comment) |

Screenshots were taken with a headless Chrome via puppeteer-core, emulating
`prefers-reduced-motion: reduce` so scroll-reveals show (see F2).

---

## 2. Git state ⚠️ (read first)

Only the **earlier** Samara refactor is committed (`140b186`). **All of this
homepage rebuild is UNCOMMITTED**:

- Modified: `globals.css`, `app/page.tsx`, `Navigation.tsx`, `Placeholder.tsx`, `ThemeToggle.tsx`
- New: `EditorialStatement`, `WorkRail`, `Rail`, `PressSection`, `FeatureStory`, `Finale`, `ScrollReveal`, `VideoSlot`, `data/press.ts`

Review against the working tree, not `git show HEAD`.

---

## 3. Architecture / file map

- `app/page.tsx` — assembles the 8 sections; owns the hero (kept) + `data-hero`; defines the "Currently" section inline.
- `components/Section.tsx` — the single owner of vertical rhythm (120/72px) + 1120px container + 24px gutters. Every section wraps in this.
- `components/Navigation.tsx` — **header state machine**. Global scroll listener reads `[data-hero]` / `[data-nav-dark]` from the DOM and sets `hero | solid | dark`. Passes `overDark` to `ThemeToggle`.
- `components/ScrollReveal.tsx` — IntersectionObserver; toggles `.reveal → .is-visible` (opacity + 20px rise, optional media scale). No-op under reduced-motion.
- `components/Rail.tsx` — center-focus carousel: arrows, drag, wheel/native scroll, keyboard, scroll-snap, one-time swipe hint. `loop` renders 3 copies and wraps scroll in the middle copy.
- `components/WorkRail.tsx` — Section 3. 4 work cards (link to `/projects#id`) + a "MORE IN PROGRESS" placeholder card. Uses `Rail loop`.
- `components/PressSection.tsx` + `data/press.ts` — Section 4. Logo capsule (renders nothing if empty) + article rail. Data-driven; ships empty with two commented examples.
- `components/FeatureStory.tsx` + `components/VideoSlot.tsx` — Section 5. Portrait media (video-ready) + overlaid title + floating caption card.
- `components/Finale.tsx` — Section 7. Dark full-bleed inset slot, carries `data-nav-dark`.
- `components/Placeholder.tsx` — aspect-ratio slot, hairline border, grain, crosshair, eyebrow caption, `alt`.
- Unchanged/shared: `ContactBand`, `Footer`, `AuroraEffect` (hero), `SignatureField` (projects page only), `ThemeToggle`.

Design tokens & utilities live in `app/globals.css`: `--canvas/--canvas-raised/--ink/--ink-muted/--line/--accent`, three radii (24/12/pill), motion tokens (`--ease`, `--dur-*`), `.type-*` scale, `.reveal`, `.card-lift`, `.link-accent`, `.no-scrollbar`, focus-visible, reduced-motion.

---

## 4. Design-system contract (what to check compliance against)

- **Three radii only**: 24px (image containers/large cards), 12px (nested images), 999px (pills/nav/avatars). One deliberate exception: 8px inline glyphs (F9).
- **Type scale**: `.type-h1/h2/h3/body/caption`; serif 400 only, sans 400/500 only — **no bold/semibold**. Hierarchy from size.
- **Color discipline**: gold `--accent` only on links/buttons/resume — never headings or backgrounds.
- **Spacing**: all rhythm via `Section`; multiples of 8.
- **Motion**: hover-only + scroll reveals (opacity + 20px, media 1.015→1) + one hero fade; easing `cubic-bezier(.22,1,.36,1)`; native scroll only; all disabled under reduced-motion.
- **Dark mode**: token pairs invert, gold identical; no pure #000/#FFF.
- **Placeholders**: aspect box + hairline + raised tone + grain + uppercase caption; never "coming soon".

---

## 5. Findings to review (ranked)

**F1 — Rail loop duplicates interactive cards (a11y/keyboard).** `Rail` with `loop`
renders 3 copies, so the Work rail exposes 15 focusable card links / DOM nodes for 5
real items. Screen readers announce duplicates; keyboard tab order walks all 15.
Recommend marking clone copies `aria-hidden` + making their links non-focusable
(`tabindex=-1`/inert), keeping only the middle copy in the a11y tree. `Rail.tsx`.

**F2 — Scroll-reveal hides content until JS runs.** `.reveal` starts `opacity:0`;
`ScrollReveal` reveals via IntersectionObserver after hydration. Text IS in the SSR
HTML (crawlable), but with JS disabled or if hydration fails, Sections 2–6 are
invisible. Consider a `<noscript>` reveal-off fallback or revealing above-the-fold
content immediately. `ScrollReveal.tsx`, `globals.css .reveal`.

**F3 — ESLint: 11 errors, 8 warnings (build still passes).** Categorize before acting:
- `react-hooks/set-state-in-effect` on `ThemeToggle`, `useStars` (page.tsx), `ScrollReveal`, `Rail` — legitimate client-init / observer patterns, not bugs, but the repo's flat config flags them as errors. Decide: refactor, or scope-disable the rule.
- `react-hooks/purity` (7×) on `StarField.tsx` — `Math.random()` in render. **`StarField` is dead code** (0 imports) — deleting it removes these.
- `@next/next/no-img-element` (8×) — see F5.

**F4 — Everything is uncommitted.** Commit before handoff so the reviewer sees a clean diff (see §2).

**F5 — `<img>` everywhere, no `next/Image`.** LCP/bandwidth cost; hero signature GIF is the LCP element. Spec asked for lazy-load + explicit dims: placeholders are `<div>`s with `aspect-ratio` (no CLS ✅), but real images dropped in later need `loading="lazy"` + width/height. Consider `next/Image` or add attributes when wiring real assets.

**F6 — Nav initial-state flash.** `Navigation` defaults to `solid` then switches to `hero` after first scroll/compute on mount → a brief pill-style flash on the home hero. Consider computing initial state before paint (or defaulting to `hero` when a `[data-hero]` exists at top).

**F7 — Muted-text contrast.** `--ink-muted` (#6B6B64 on #F5F5F3 light; #A0A0A0 on #0F0F0F dark) for captions/descriptions is ~4.5:1 — borderline WCAG AA for small text. Verify with a contrast checker; captions are 13px.

**F8 — Orphaned components.** `Button`, `StarField`, `CloudField`, `hooks/useMousePosition` have 0 references. `Button` is intentional (design-system primitive kept for later); the others are stale from before the refactor and can be deleted. `StarField` also causes F3 errors.

**F9 — Glyph radius exception.** Inline editorial glyphs use 8px radius (spec-mandated), deviating from the three-radii rule. Intentional; flagging for the record.

**F10 — Drag may swallow clicks.** `Rail.onClickCapture` cancels a click if the pointer moved >4px during a mouse drag. Trackpad users who nudge while clicking a card could get a no-op. Verify the 4px threshold feels right.

**F11 — VideoSlot path unexercised.** The muted-autoplay-in-viewport / pause-offscreen / pause-control logic only runs when a real `src` is passed; currently every slot is a placeholder. Test when a video is added.

**F12 — Feature floating card overflow.** `FeatureStory` floating card uses `md:-right-10`; it relies on `main`'s `overflow-x-hidden` to avoid horizontal scroll. Check it isn't clipped awkwardly at ~1024–1280px.

**F13 — TS cast hack.** `Rail` sets `opacity: 'var(--focus-opacity,1)' as unknown as number` to pass a CSS var through the style object. Works; cosmetically ugly.

---

## 6. Spec-compliance checklist

| Spec item | Status | Notes |
|---|---|---|
| Header: hero glass / solid / dark glass; toggle always visible | ✅ | Verified programmatically |
| Motion tokens (durations, easing, reveals, media scale, native scroll, reduced-motion) | ✅ | `globals.css` |
| Dark-mode parity, gold constant, no #000/#FFF | ✅ | Verified in screenshots |
| S1 Hero kept + glass nav + load fade | ✅ | `data-hero`, `.hero-fade` |
| S2 Editorial statement w/ inline glyphs, clamp size, no glyph orphan | ✅ | nowrap groups; F9 radius |
| S3 Work rail: eyebrow, 4 cards + MORE, center focus, arrows/drag/wheel/keyboard/snap, 4:3 media, View→, aria | ✅ | Now loops (F1) |
| S4 Press: logo capsule (empty→nothing), article rail, `press.ts` w/ 2 commented + empty | ✅ | Placeholder card shown while empty |
| S5 Feature: raised band, 4:5 media left-of-center, overlaid title+rule, floating caption card, video-ready, mobile stack | ✅ | F11, F12 |
| S6 Currently two-column, reveal + spacing tokens | ✅ | Built fresh (none existed) |
| S7 Finale: dark inset, not touching edges, white headline, engages dark nav | ✅ | `data-nav-dark` |
| S8 Contact band + footer, wordmark sign-off last | ✅ | Unchanged |
| Rails → swipe + snap + sliver; arrows hidden on touch; swipe hint once | ✅ | localStorage-gated hint |
| Touch targets ≥44px | ⚠️ | Rail arrows + toggle = 44px; nav pill links ~36px (pre-existing) |
| Lazy-load below-fold media, explicit dims, CLS <0.1 | ⚠️ | Aspect boxes reserve space; real imgs need lazy+dims (F5) |
| Alt text on every image slot | ✅ | `Placeholder alt`, `VideoSlot alt` |
| Keyboard rails, visible focus rings | ✅ | Rail focusable + focus-visible outline |

---

## 7. Suggested review plan

1. Skim `globals.css` tokens/utilities, then `Section`, then each section component top-to-bottom.
2. Exercise the Work rail: keyboard (Tab to it, Arrow keys), mouse drag, wheel, and mobile swipe; confirm the loop has no visible seam and the a11y duplication (F1).
3. Scroll the whole homepage watching the nav pill switch states over the hero and finale.
4. Toggle light/dark on every section; check contrast (F7) and that no section breaks the Section rhythm.
5. Disable JS and reload — confirm/quantify the reveal-hidden content (F2).
6. Resize 360→1440 continuously; watch the feature floating card (F12) and editorial glyphs.
7. Decide the lint policy (F3) and delete orphaned components (F8).
