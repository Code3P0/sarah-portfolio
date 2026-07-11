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
