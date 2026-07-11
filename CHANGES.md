# CHANGES — Art direction pass + copy fixes

## Copy fixes (before / after)
1. Projects subtitle: "Four domains I work across — strategy, data, media, and
   writing." → **deleted** (cards carry it; header gap closed).
2. Newsletter (`src/data/newsletter.ts`):
   - "Notes from the build." → "Newsletter"
   - "Occasional letters on sports, business, and what I'm making. No noise."
     → "Occasional emails about what I'm working on." (kills a "No X." pattern)
   - "You're in. Talk soon." → "You're in."
   - "Something broke. Try again or email me." → "That didn't go through. Try again."
   - "ONCE IN A WHILE · UNSUBSCRIBE ANYTIME" (uppercase eyebrow) →
     "Unsubscribe anytime" (sentence case, small muted sans)
3. Identity section: **Option B** (user-confirmed). Rotating word fixed-width
   slot (sized to longest word), words now make / build / study / connect /
   write in the gold accent, 2.5s per word, 300ms crossfade, static first word
   under reduced motion, and the small MAKE/ASK/... button row **removed** (it
   was ticker nav). Artifacts: make=painting, connect=fans; build/study/write
   are labelled placeholder slots (no assets exist yet).
   Note: with the slot sized to the longest word ("connect"), shorter words
   show a gap before the period; that is the specified fixed-slot behavior.
4. Em-dash sweep (rendered copy only; code comments untouched):
   - Four projects route `<title>`s: "Strategy — Sarah Graves" → "Strategy ·
     Sarah Graves" (and data/media/writing)
   - About Background separator " — " → layout-separated index list (no dash)
   - ProjectDetail placeholder alt "… — case study in progress" → comma
   - ProjectDetail image alt "Sarah Graves — {title}" → comma
   - Press aria/alt strings: " — opens in a new tab" → comma; "guard —
     {headline}" → period
   No exclamation marks in rendered copy (the hand-drawn signature artwork
   contains one; it is the identity mark, not typed copy). No "No X. Just Y."
   patterns remain.

## PASS 1 — Hero (screenshot self-review notes)
- **Wordmark**: extracted the fully-drawn frame of the 38MB animated
  `black_signature.gif` via headless capture → `public/images/signature.png`
  (1600×364, transparent, 251KB). The "clipping mid-word" was the GIF's
  draw-on animation caught mid-stroke; the static complete mark fixes it at
  every width, and the "stray mark" was the signature's own pen flourish (now
  reads as part of the complete mark). Rendered via next/Image, `priority`,
  `w-[min(63%,900px)] h-auto`, no cropping container. Footer sign-off swapped
  to the same PNG.
- **Killed the full-canvas veils.** Night: localized espresso falloff (left
  third) + floor fade + amber radial (screen blend) wrapping Sarah's edge;
  plates take a slight `brightness(.85) saturate(1.06)` pull so the photo sits
  in the theme but keeps warmth. Day: existing canvas, quiet left lift only —
  the photo reads as day at full richness.
- **Depth move**: a duplicate of the front plate, masked to a feathered band
  through Sarah's torso and drifting in sync, sits above the wordmark so the
  signature's tail tucks BEHIND her (type behind subject, subject in front).
  Iterated three times from screenshots: (1) tail didn't reach her → widened
  mark + band; (2) hard band edge rendered a vertical seam in dark (scrims
  were being skipped inside the band, then filter-order mismatch, then matte
  feathering double-composited) → replicated night treatments inside the band
  with image-only brightness; (3) residual hairline → replaced the hard
  clip-path with a **feathered mask** (transparent 57% → solid 62–68% →
  transparent 73%), after which no seam renders in either mode.
- Grain moved to z-30 so the film sits on one plane above all layers.
- No orphan band below the hero; section fills to its rounded bounds.

## PASS 2 — Projects
- **Film banner** (`FilmBanner.tsx`, data `src/data/film.ts`): ~21:9 strip,
  max-h 280/160, ImageFrame grade, poster `sarah-graves-march-picture.jpg`.
  With no videoUrl/youtubeUrl set it renders the poster + "FILM · IN
  PRODUCTION" caption and **no play control**. Self-review: first crop cut
  Sarah's head (85% 45%) → corrected to 85% 18% (she now reads smiling,
  mid-frame right).
- **Domain cards → typographic covers**: index numeral (01–04), entry count
  ("2 studies"), the domain word LARGE in the display serif bleeding off the
  card's right edge, descriptor in muted sans, and the base two-line pattern
  (muted domain label + "Inside the work →"). Distinct warm tonal field per
  card (gold/burnt-orange/umber/espresso mixes over --canvas-raised, both
  modes). Hover: existing lift+brighten recipe. Self-review: the giant word
  initially collided with descriptors → anchored to the upper area and sized
  down one step; clean at 1440 and 390.
- Detail-page empty media slots: crosshair removed (`mark={false}`) → tonal
  field + caption, no skeleton read.

## PASS 3 — About
- Resume action moved to the TOP under the heading as a secondary pill
  ("Resume ↓"); removed from the lower position.
- Background and What I'm Into restyled as designed index lists (org in ink,
  detail in muted, hairline separators, no dashes).
- "Currently building Path…" line moved out of rendered copy to
  `src/data/draft-copy.ts` with a TODO (not replaced with invented copy).
- **Video pause control verified functionally**: playing → click → paused
  (measured, not assumed).

## PASS 4 — Photo audit (every rendered image)
| Image | Where | Verdict |
|---|---|---|
| back-hero.png / front-hero-sarah-graves.png | hero | ✓ 1440+390 both modes; objectPosition 74% 32% keeps Sarah framed at mobile |
| signature.png | hero + footer | ✓ complete at all widths |
| sarah-graves-painting.jpg | verb "make" | ✓ 50% 35% |
| sarah-graves-fans.jpg | verb "connect" + press X | ✓ 50% 30% |
| sarah-graves-speaking.jpg | press Forbes | ✓ 50% 28% |
| sarah-graves-media-photo-basketball.jpg | press NYT | ✓ native 3:4 |
| sarah-graves-basketball-photo.jpg | press AP | ✓ native 3:4 |
| sarah-graves-bball.jpg | press ESPN | ✓ 50% 26% |
| sarah-graves-march-picture.jpg | press UT + film banner | ✓ 85% 50% card; **adjusted 85% 18%** banner |
| sarah-graves-media-microphone-march-madness.jpg | press Statesman | ✓ native 3:4 |
| sarah-graves-desert-set.jpg | press X try-hard | ✓ 50% 32% |
| sarah-graves-texas-portrait-poster.jpg | About video poster | ✓ native ratio, no crop |
| sarah-headshot.jpg | contact band | ✓ circular crop centered |
- **front-hero alpha flag**: the cutout's edges are rough (an opaque
  background rectangle + feathered matte debris; hair edges not clean). The
  feathered-band composition renders seam-free, but the source should be
  re-exported with tight alpha for robustness. Not repainted per instruction.

## Verification
- tsc + production build clean; ESLint down to the 2 pre-existing
  `set-state-in-effect` items (ScrollReveal/ThemeToggle, documented policy
  question) — no new lint issues; the two `<img>` warnings resolved by moving
  the wordmark to next/Image.
- Screenshots reviewed: hero 1440+390 light+dark (5 iterations), projects
  1440 light+dark + 390, about 1440 light+dark + 390 + pause check, home 390
  both modes.
- No horizontal overflow at 390 (spot) — full width matrix was measured in the
  prior pass; hero/nav/wordmark never clip.
- Theme: system preference on first visit + 600ms crossfade (from prior pass,
  unchanged). Reduced motion: hero drift/grain `animation: none`, verb ticker
  static first word.

## Not verified / needs you
1. **Real Buttondown endpoint** (`NEXT_PUBLIC_NEWSLETTER_ENDPOINT`) — section
   stays hidden in production until set.
2. **Clean front-hero re-export** (tight alpha) — recommended, drop-in.
3. Assets for the build / study / write verb slots, and real project entries
   (all six domain entries are labelled placeholders).
4. Film URL (videoUrl or youtubeUrl in `src/data/film.ts`) when the film exists.
5. Real `NEXT_PUBLIC_SITE_URL` for OG metadata.
6. Basketball link destination in the retired EditorialStatement (only rendered
   if the VerbIntro toggle is turned off).

## Identity section: click-driven word switcher
- No auto-rotate: the word changes only on user input. Default "make".
- Sentence: fixed-width slot sized to the longest word (invisible sizer,
  text-left) — measured zero layout shift across all five switches (sentence
  box and document height identical). Word swap 280ms up/down fade-slide;
  outgoing exits upward, incoming rises from below; instant under reduced
  motion. The gold word itself is a button that advances to the next word
  (aria-label, hover state); a polite sr-only live region announces changes.
- Image: single wide low strip (21:9, clamped 180/300px, 24px radius,
  ImageFrame grade) inside the content container; all five frames stay
  mounted in one fixed-aspect box (instant, opacity-only 400ms crossfades,
  zero CLS; frames load once the section is near the viewport).
- Word index: MAKE · BUILD · STUDY · CONNECT · WRITE as real buttons in the
  eyebrow style; active gold at full opacity, inactive ink at 40% (70% on
  hover); slim gold underline slides beneath the active word (fixed a bug
  where the underline sat on the wrong row when the index wraps on mobile);
  aria-pressed, 44px targets, arrow-key navigation, visible focus.
- Word-to-image map (wide crops visually verified at 1440 and 390):
  make → sarah-graves-painting.jpg (50% 30%)
  build → sarah-graves-hero.jpg (74% 30%) STAND-IN until a product photo exists
  study → sarah-graves-track.jpg (50% 40%) team training; closest true image
  connect → sarah-graves-fans.jpg (50% 32%)
  write → sarah-graves-media-microphone-march-madness.jpg (50% 38%) STAND-IN;
    the speaking.jpg source was too low-res for the wide crop (blurry, cropped
    forehead) and was replaced after visual review
- Known spec'd behavior: with the slot sized to "connect", shorter words show
  a gap before the stationary period.

## Hero wordmark revert + hidden identity + SEO + bold parallax
- **Wordmark revert**: plain animated signature GIF (draw-on), no mask/cutout/
  compositing on the mark itself; capped at 46% hero width (640px, well under
  the GIF's 2914px native), left over the seats, Contact aligned below. Mobile
  shifts the group up into the open wall area so it stays clear of Sarah.
  NOTE: white_signature.gif is byte-identical (MD5) to black_signature.gif, so
  dark mode inverts the black GIF; drop in a true white file to remove the invert.
- **Identity section hidden** (not deleted): `showIdentitySection = false` in
  page.tsx; VerbIntro component + verbs data intact for later. Homepage flows
  Hero -> Newsletter (env-gated) -> Selected Work with normal rhythm; verified
  no empty band.
- **SEO**: Metadata API only. Root: title "Sarah Graves" + template
  "%s - Sarah Graves" (hyphen), 150-char factual description, canonical,
  OG (type/url/title/description/image = sarah-graves-face-main.jpg, natively
  1200x630) and twitter summary_large_image. Per-route metadata: Projects,
  About (via new about/layout.tsx since the page is a client component), and
  the four domain routes (short titles + their real descriptors). JSON-LD
  Person on the homepage with only verifiable fields (guard/Texas, McCombs)
  and the real profile URLs already used in the footer. Verified in rendered
  head; no noindex anywhere. metadataBase still falls back to the placeholder
  domain until NEXT_PUBLIC_SITE_URL is set.
- **Bold scroll parallax** (final, after depth fix below): named view-timeline
  on the hero, exit range; translate-only wordmark so it never distorts; front
  cutout also scales to 1.05. Gated behind @supports (animation-timeline) —
  non-supporting browsers get the static hero — and prefers-reduced-motion
  (verified animation: none).

## Projects: hover photo reveal on domain cards
- Each of the 4 domain cards now fades in a correlating photo at very low
  opacity behind the typography on hover/keyboard focus (250ms, opacity 0.14
  light / 0.20 dark), replacing "random color only" as the hover surface; the
  tonal tint stays as the resting state. Instant (no transition) under
  reduced motion; never triggers on touch (inside the hover-capable gate).
- PLACEHOLDER images, swap in `hoverPhotos` in src/app/projects/page.tsx:
  strategy=speaking, data=basketball-photo, media=microphone-march-madness,
  writing=painting.
- Verified by screenshots at 1440 light+dark: rest state unchanged, hovered
  cards keep fully legible type over the ghosted photo.

## Hero depth fix + amber removal
- **Amber glow removed**: the warm radial (rgba(255,158,66,.38), screen blend)
  existed TWICE — once on the hero section, once replicated inside the front
  parallax plane — which doubled into the "yellow mask" over the dark-mode
  photo. Both deleted; the night grade is now just the espresso scrims +
  brightness/saturate pull. Verified in all dark frames: no yellow cast.
- **True layer separation**: previously the front (full photo with Sarah) rode
  the back plane too, so Sarah was baked into the slow plate and the planes
  looked locked. Now PLANE 1 renders ONLY back-hero.png (Sarah edited out) and
  PLANE 3 is the ONLY Sarah (front cutout), feather-masked
  (37>43% left, 80>90% right, 92>100% bottom fade, maskComposite: intersect)
  so the rough matte rectangle never shows and her bottom edge dissolves as
  she rises.
- **Final per-layer speeds** (hero ~86vh travel over the exit range):
  | Plane | Delta (desktop) | Effective speed | Mobile delta |
  |---|---|---|---|
  | Back plate (seats) | lags 52vh | ~40% of scroll | 26vh |
  | Wordmark | lags 26vh | ~70% of scroll | 12vh |
  | Front cutout (Sarah) | leads -16vh + scale 1.05 | ~118% of scroll | -8vh |
- Verified BY LOOKING at scroll sequences: 1440 dark 4 positions
  (top/quarter/half/exit), 1440 light + 390 dark 3 positions each. Between
  top and quarter frames Sarah's crossed arms travel ~420px while the seat
  backs behind her travel ~200px — she visibly rises away from the lagging
  seats, exits first, wordmark second, seats linger. No seams, no raw page
  behind her, overflowX=0 at both widths, nav + Contact static.
