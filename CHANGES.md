# CHANGES

## Projects rebuild — domain index + four detail routes

- **Projects index** (`/projects`): replaced Path/Operator's Lens/BOSI/NOAH with
  four domain cards in a 2×2 grid — Strategy, Data Analytics, Media, Writing —
  each a full link to its route, with the designed placeholder media (clean
  tonal field + uppercase domain tag, no photo) and the shared work-card
  hover/brighten recipe.
- **Four detail routes** `/projects/{strategy,data,media,writing}`: all render
  the shared `ProjectDetail` component, so they stay structurally identical and
  are populated by editing data. Each has a header (large serif title +
  descriptor + `← Projects` back link) and a vertical, image-alternating stack
  of project entries.
- **Data** `src/data/projects.ts`: object keyed by domain; each entry is
  `{ role, year, context, title, summary, body, image?, url? }`. Ships with two
  clearly-labelled placeholder entries per domain ("Project one/two", "Summary
  in progress.", "Details in progress.") so pages look intentional and full.
  Missing `image` → designed placeholder ("CASE STUDY · IN PROGRESS"); missing
  `url` → the "View →" link is hidden. No "coming soon" strings anywhere.
- **Dead references removed**: the homepage Selected Work (WorkRail) and the
  Footer "Work" column now point at the four domain routes. WorkRail reads from
  the same `domains` data. No links to the old project names/anchors remain.
- **Page transitions** now cover nested routes: `/projects → /projects/strategy`
  reads as forward, the reverse (and any ancestor navigation) as back; nav stays
  fixed; reduced-motion is an opacity crossfade.

### Fixed a real bug while here
The route transition read `prefers-reduced-motion` via `typeof window` **during
render**, which caused an SSR/client **hydration mismatch** on every page under
reduced motion. Reworked `template.tsx` to apply the directional x-offset
client-side via animation controls (SSR always renders `x:0`) and wrapped it in
`MotionConfig reducedMotion="user"`. Verified hydration is now clean on `/`,
`/projects`, `/projects/strategy`, `/about` in both normal and reduced motion.

## (Same session) Fix pass — hero, press, About, hover

- **Hero**: layered — hero photo (`object-position` biased right so Sarah stays
  framed), theme scrim, slow drifting clouds (46–60s, freeze under reduced
  motion), white inverted wordmark, Contact button. Removed the Feature Story,
  Currently, and Finale sections from the homepage.
- **Press**: horizontal scroll strip (snap, drag, wheel, keyboard, right-edge
  fade + next-card sliver; no arrows/pagination/loop). New card: outlet eyebrow
  top, bold serif headline on a bottom scrim, whole card is the link
  (`aria-label`), no "Read →". 8 entries; ESPN label corrected to the Schaefer
  quote; AP image reassigned; **per-entry `objectPosition`** — verified in
  rendered screenshots that **Sarah is visible in all 8 crops** (notably
  `march-picture` at `85%`, which was previously cropping her out).
- **Card hover/focus**: unified recipe on press + work cards — scale 1.04, deeper
  shadow, photo brightens above neighbours; `@media (hover: hover)` so touch
  doesn't stick; in-view brightening handles touch. ImageFrame gained an
  `objectPosition` prop.
- **About**: two-column — constrained portrait video left, bio right; resume is
  now a secondary pill button; mobile stacks video first.

## Verified
- Projects index (2×2) + all four detail routes render; light + dark, 1440 + 390.
- Each detail route shows 2 designed placeholder entries, alternating image
  side, no "coming soon", empty slots look intentional.
- All 8 press cards: correct outlet order (Forbes, NYT, AP, ESPN, UT, Statesman,
  X, X), correct labels, Sarah visible in every crop.
- Hydration clean (normal + reduced motion); `next build` + `tsc` clean.

## Notes / open items (unchanged from prior passes)
- `white_signature.gif` is a duplicate dark asset → wordmark uses `black_signature.gif` + `invert`.
- Signature GIFs are ~38 MB each — recommend a lighter asset for hero LCP.
- `metadataBase` defaults to a placeholder domain — set `NEXT_PUBLIC_SITE_URL`.
- Orphaned components now unused: `FeatureStory`, `Finale`, `Rail` (kept, not imported).
