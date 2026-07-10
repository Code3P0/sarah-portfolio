# Homepage revision pass — before / after

Subtraction + identity work on top of the committed Samara system. Verified in
both light and dark at 1440px, plus one Home→Projects transition. Build + tsc clean.

## Bugs
- **Old hero copy** — *Before:* hero showed "Welcome to my corner of the internet" / "I love helping people… offers :)". *After:* removed entirely; the hero is identical in structure across both modes (wordmark + one action). The "I am a guard at Texas…" positioning lives in the editorial statement below.

## Hero / identity
- **Script wordmark promoted** — now the large central focal point of the hero in both modes; the small uppercase "SARAH GRAVES" stays as nav metadata only.
- **Clouds kept** (per your call — reversed the original "remove light gradient panel" ask). Light keeps sky + clouds; dark keeps aurora + stars.
- **Primary action added** — one ink pill, "View selected work" → `#work`.

## Subtraction
- **Press kept** (per your call). Adapted it to the new rail API; it shows a single placeholder card until `press.ts` is populated. Send me the articles (outlet, headline, date, URL) and they'll replace the placeholder.
- **Finale** — *Before:* dark "Watch it get built." box that read as an unloaded video (crosshair + grain + "FINALE 001"). *After:* clean typographic close, copy now **"See what I'm building."**, on a distinct lifted dark surface with a hairline border (no media cues).

## De-theatricalize
- **Work rail** — *Before:* infinite loop, 3 cloned copies (aria-hidden), center-focus scale/opacity. *After:* stable pager — one active card, neighbour peeks ~15%, decisive snap, **no clones** (verified 5 cards / 0 inert), arrows + "02 / 05" progress in one fixed row **below** the cards. Rail is now reusable (dynamic gutter + `viewportClassName`) for both work and press.
- **Feature story** — *Before:* title/media/floating card revealed independently; media scaled (drift); dark gradient title bar. *After:* one coordinated reveal (single opacity + 12px rise, no scale), title sits **above** the media with a thin rule (bar removed), floating card no longer drifts.

## Dark mode as a designed theme
- Lifted `--canvas-raised` (#1A1A1A → **#1E1E24**) and strengthened `--line` (0.14 → **0.20**); nudged `--canvas` to #0E0E10. Placeholder cards, the feature band, the contact band, and the finale now clearly separate from the canvas (figure-ground restored) — not a straight token inversion.
- `--ink-muted` lifted to **#ABABB2**. Contrast on canvas ≈ 8.4:1, on raised ≈ 7.2:1 — passes WCAG AA (and AAA) at 13px.

## Page transitions
- Directional enter on Home/Projects/About via `app/template.tsx`: incoming content translateX 48→0 + fade (reversed on back navigation, inferred from nav order). Nav is in the persistent layout, so it never moves. First load just fades (no slide). Reduced motion → 200ms crossfade only. Scroll resets to top on entry. `<noscript>` fallback added so `.page-anim`/`.reveal` content is visible without JS.

## Spacing
- Untouched — the shared `Section` rhythm is unchanged everywhere. (The finale is already full-bleed via the page margin; the hero kept its inset sky box per the clouds decision, rather than going full-bleed.)

---

## Findings I chose NOT to fix (and why)

1. **Page-transition exit half not animated.** The spec asked for outgoing content to translateX 0→-32 + fade too. App Router unmounts the outgoing route before an exit animation can run; doing it properly needs the fragile `FrozenRouter` internal-import hack, which is risky on Next 16. I implemented the incoming half only (it covers the swap) and documented it in `template.tsx`.
2. **"Coverage lands here" placeholder remains.** It's the Press empty-state, kept because you're keeping Press. It disappears once `press.ts` has entries.
3. **Dev overlay "1 Issue".** Stale Fast-Refresh/lint surfacing from the mid-refactor; a fresh load has **no console errors**, and `next build` + `tsc` are clean. Dev-only; not in production.
4. **4 ESLint errors remain** (`react-hooks/set-state-in-effect` on legitimate client-init/observer effects in ThemeToggle, useStars, ScrollReveal, Rail). Not bugs; still an open lint-policy decision (see `REVIEW.md` F3).
5. **Rail leaves calm empty space left of the active card** at rest (centered scroller, first card has no left neighbour). Intentional trade for a stable, non-looping pager.
6. **`<img>` not `next/Image`** across the site (8 lint warnings) — pre-existing; real images will need `loading="lazy"` + dimensions. Deferred, not in scope this pass.
