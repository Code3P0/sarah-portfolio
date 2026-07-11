# CHANGES

## Cinematic hero + refinement pass

### Pre-flight (important)
- origin/main had diverged again (your `4705146` hero upload vs 10 unpushed local
  redesign commits). A `reset --hard` would have destroyed the redesign, so I
  **merged** (`5d09344`) — hero plates + full redesign both preserved.
- **Front-hero matte is rough** (an opaque rectangle of original background +
  white blob artifacts around the silhouette — reported before the build). The
  composition hides it: both plates render position-identical, share ONE
  drifting wrapper (so they can never shear), and the day/night treatment
  grades both uniformly. Verified in screenshots: no visible seams in either
  mode. A clean re-cut PNG would still be better; drop it in at the same path
  and nothing else needs to change.

### Hero (`src/app/page.tsx`)
- Layered composition, bottom→top: back plate → front cutout → night/day
  treatment (crossfaded 600ms) → animated film grain → wordmark → one Contact
  button. Clouds and their motion removed (PNGs remain in repo, unreferenced).
- Night: espresso grade derived from the dark canvas + localized amber
  (`--hero-amber`) wrapping Sarah's edge. Day: the existing light canvas with a
  quiet lift for the wordmark — same world, different temperature.
- Ambient motion: 1.5% scale drift over 16s on the composite; moving
  monochrome grain (SVG noise tile, stepped background-position, blend overlay,
  `--grain-opacity` 0.04 light / 0.06 dark). Both `aria-hidden`,
  pointer-events-none, frozen under prefers-reduced-motion.
- Wordmark: `black_signature.gif`, inverted to white in dark with a 600ms filter
  crossfade. **Note:** `white_signature.gif` is still a dark-ink duplicate, so
  the spec'd white file can't be used directly; invert is visually identical.
- next/Image, `priority`, no lazy on hero plates; no CLS (absolute fill).

### Identity statement (`EditorialStatement.tsx`)
- New copy: **"I am an MBA student playing basketball and building."**
  - *MBA student* → LinkedIn; hovering grows the speaking photo dramatically
    (scale 3.4, slight rotate, shadow — transform-only, no reflow; pattern from
    editorial link-preview interactions), link turns gold with growing underline.
  - *basketball* → grows the original court photo; links to the previously-used
    Texas WBB post. TODO(sarah): confirm this is the destination you want.
  - *building* → `/projects` (the four live domains).
- Old sentence + retired "Currently" copy preserved in `src/data/draft-copy.ts`
  (labelled TODO, not rendered). No references to Path/Operator's Lens/BOSI/
  NOAH remain anywhere.

### Press strip (audit only — design kept)
- Hover is now deliberately dramatic per request: **scale 1.08, saturate 1.18,
  brightness 1.07**, deeper shadow (measured in verification). Work cards keep
  the calmer 1.04 recipe.
- Right-edge fade mask removed (it cut cards mid-body and read as a bug); the
  visible card sliver is the scroll cue. Keyboard scroll re-verified (8→352px
  on ArrowRight). Labels/URLs/images untouched — exactly as in `press.ts`.

### Theme system
- First visit now respects `prefers-color-scheme`; explicit choice persists.
- Global 600ms token crossfade (`--dur-theme`) for background/border/text;
  elements with their own transitions are unaffected. Verified with a
  mid-transition screenshot: temperature shift, no layout movement.

### A11y / audits
- Skip link added (`layout.tsx` → `#main-content` on the route wrapper).
- Top-left "SARAH GRAVES" nav metadata was clipping under the pill at 390 —
  now hidden below `md` (the hero signature is the identity there).
- Footer vertical space reduced (`!py-14 md:!py-20`, sign-off `mt-14`); contact
  email wraps safely (`overflow-wrap:anywhere`). About video pause control
  re-verified functional earlier this session; resume is the secondary button.
- No horizontal overflow at 320/375/768/1024/1440/1920 (measured).

### Verified
- `tsc` + production build clean; all routes prerender.
- Hero screenshots light+dark at 1440 and 390 + one mid-transition frame.
- Reduced motion: drift + grain report `animation: none`; theme snaps.
- Identity hover, press hover, press keyboard all captured/measured.

### Still needed from you
1. A **clean front-hero cutout** (tight alpha, no background rectangle/blobs) —
   optional but recommended; same path swap.
2. A **lighter signature asset** (the GIFs are ~38 MB each — the main LCP cost).
3. Confirm the *basketball* link destination (currently the Texas WBB post).
4. Real `NEXT_PUBLIC_SITE_URL` for OG metadata.

## VerbIntro prototype + Newsletter

- **VerbIntro** (`src/components/VerbIntro.tsx`, data `src/data/verbs.ts`): "I like
  to [make/ask/study/connect/build/edit]." — word cycles every 3s (rise/fade,
  600ms), one 4:3 artifact crossfades in step. Inline-grid word slot = zero
  horizontal shift (measured). Pauses on hover/focus/hidden tab/manual select
  (12s resume); reduced motion = manual only (verified no cycling). aria-hidden
  animated sentence + static sr-only sentence; real buttons with aria-pressed.
  Only prev/current/next artifacts mounted. Assets: make=painting, ask=mic
  interview, connect=fans, edit=film-set still; **study + build = labelled
  placeholders (assets TBD)**. Toggle `useChangingVerbIntro` in `page.tsx`
  restores the previous EditorialStatement in one line.
- **Newsletter** (`src/components/NewsletterSection.tsx`, copy in
  `src/data/newsletter.ts` with TODO on final wording): pill email form posting
  to `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` via fetch; idle/submitting/success/error
  states (200ms fades), honeypot, plausibility validation gating submit,
  aria-live announcements, sr-only label. **Renders nothing when the env var is
  unset** (verified) — set it in production to enable; a gitignored `.env.local`
  placeholder exists locally for development only. Success + error states both
  exercised (error via CORS-blocked mock; form stayed usable).
