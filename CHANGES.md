# Real-asset population pass — CHANGES

Populated the homepage + About page with the uploaded photography and video,
on top of the committed design system. Verified in light AND dark at 1440 and
390. Production build + typecheck clean; no hydration errors.

## Done
- **Recovered work:** origin/main only had the asset uploads on an old base; the
  entire redesign lived in un-pushed local commits. A `git reset --hard` (as
  requested) would have destroyed 6 commits, so I **merged** origin/main instead
  (merge commit) — assets + redesign both preserved.
- **ImageFrame** (`src/components/ImageFrame.tsx`): single grade wrapper for all
  site photography via `next/Image`. Rest = grain (~9% via `::after`) +
  saturate 88% / brightness 93%; hover **or** in-view (IntersectionObserver, so
  touch feels alive) = grain→3%, full sat/bright, `scale(1.03)` inside an
  `overflow-hidden` frame. 400ms `cubic-bezier(.22,1,.36,1)`; reduced-motion
  drops the scale. Grade CSS lives in `@layer components` so `absolute`/
  `lg:absolute` utilities can still override the frame's position.
  Applied to: inline glyphs, all press cards, the contact/About headshot.
- **Hero:** clean canvas (warm paper / flat dark ink), no clouds/gradient. Script
  wordmark centered, full width (no clip), single glassy **Contact** button that
  jumps to the contact panel. Also flattened the dark `body` (removed the
  leftover indigo gradient) so the dark canvas is clean.
- **Glyphs:** three real photos (bball / speaking / painting) inline at 8px
  radius, graded like everything else.
- **Press:** `press.ts` populated with the 6 entries in order (Forbes, NYT, AP,
  ESPN, UT, Statesman); static grid (4-up / 2-up / 1-up), photo fills each card
  via ImageFrame with a scrim, whole card links out in a new tab. Section now
  renders (was hidden while empty).
- **Video:** `VideoSlot` now takes a `.webm` source; wired the real portrait
  video (mp4 + webm, poster) into the homepage feature story **and** the About
  page (replaced the placeholder). Muted, loop, playsInline, autoplays only in
  view (IO), pauses offscreen, visible pause control, poster under reduced-motion.
  Verified autoplaying (muted) in view; `muted` set via ref to avoid the SSR
  hydration mismatch.
- **Favicon + OG:** `src/app/icon.jpg` (512² app/icon convention) + metadata
  `og:image`/`twitter:image` = `sarah-graves-face-main.jpg` (already exactly
  1200×630, so no crop needed), `og:title` "Sarah Graves", `og:description`
  "Guard at Texas. Building in sports, media, and AI."
- **Alt text:** descriptive, name + context on every image (glyphs, press,
  headshot, video).

## Notes / things to be aware of
1. **`white_signature.gif` is a dark asset** (same 38 MB as `black_signature.gif`
   — looks like a duplicate). Rendered as dark ink on dark. To guarantee a white
   wordmark on dark I used `black_signature.gif` + `dark:invert` (the proven
   approach) — visually matches the intent. If you have a true white-ink asset,
   drop it in and I'll switch back to the two-file approach.
2. **Signature GIFs are ~38 MB each** — very heavy for a hero LCP. Strongly
   recommend exporting a lighter asset (optimized GIF/APNG, a short muted video,
   or ideally an SVG/PNG of the signature). Not changed this pass.
3. **Work cards have no photos** — the prompt assigned photos only to glyphs and
   press, so the four work cards (+ "More in progress") still use the design-
   system Placeholder. Unused uploaded photos are available to fill them if you
   want: `sarah-graves-basketball-photo.jpg`, `-desert-set.jpg`, `-hero.jpg`,
   `-track.jpg`, `-face-main.jpg`. Tell me the mapping and I'll wire them.
4. **`metadataBase`** defaults to a placeholder `https://sarahgraves.com`. Set
   `NEXT_PUBLIC_SITE_URL` (or edit the default in `layout.tsx`) to the real
   domain so OG/Twitter image URLs are correct in production.
5. The homepage feature story and the About page currently show the **same**
   portrait video. If you want different clips, give me a second file.
6. ESLint still reports the pre-existing `react-hooks/set-state-in-effect`
   warnings (client-init/observer effects) and `no-img-element` on the signature
   GIF (kept as `<img>` deliberately — next/Image on a 38 MB GIF would be worse).
   Build is unaffected.

## Verified
- Hero: signature correct per theme (black light / white dark), never clips,
  clean background both modes; single Contact button.
- All 6 press cards render photos in correct order (Forbes → NYT → AP → ESPN →
  UT → Statesman).
- Glyphs show real photos; grade + hover work on mouse, and in-view brightening
  works (for touch).
- About video autoplays in view (muted), pauses offscreen, has a pause control.
- No "coming soon" / "Video coming soon" strings anywhere.
- `next build` + `tsc --noEmit` clean; no console/hydration errors.
