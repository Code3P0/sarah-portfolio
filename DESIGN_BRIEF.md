# Sarah Graves — Personal Portfolio Site: Design Brief

## 1. Who this is for
Sarah Graves — a guard on the Texas Women's Basketball team and a finance/MBA student at
McCombs (BBA Finance, May 2026). Off the court she builds at the intersection of **sports,
media, and technology**. Credentials she leads with: BOSI advisory board member (alongside
Kevin Durant, Rich Kleiman, Kirk Goldsberry), former RedBird Capital summer analyst (NYC),
and founder of "Path," a career-discovery app for students who want to work in sports.

The site is her **personal brand hub** — a place to send investors, recruiters, media, and
collaborators. Tone: accomplished, credible, warm, a little playful. Athlete-operator, not
corporate.

## 2. Tech stack (for the designer's awareness)
- **Next.js (App Router) + React + TypeScript**
- **Tailwind CSS v4** (utility classes; theme tokens as CSS variables)
- **Framer Motion** for all animation/interaction
- Fonts loaded via next/font (Google Fonts)
- Deploys as a static-ish SPA; everything is client-rendered with motion.

## 3. Current typography
- **Serif (display):** Instrument Serif, weight 400 — used for headings, the "I am / I build"
  statement lines, and hero welcome copy. This is the personality font.
- **Sans (body/UI):** DM Sans, weights 400/500 — body copy, nav, labels, buttons.
- Small labels use uppercase + wide letter-spacing (tracking-widest), tiny size, in the
  muted secondary color (e.g. "FEATURED", "BACKGROUND", "WHAT I'M INTO").

## 4. Color system (light + dark mode, toggleable)
The site has a **full light/dark mode toggle** (button fixed top-right). Tokens:

LIGHT MODE
- bg-primary:      #F5F5F3  (warm off-white / paper)
- bg-secondary:    #EAEAE8  (cards, nav pill)
- text-primary:    #1A1A1A  (near-black)
- text-secondary:  #6B6B6B  (muted gray)
- accent-gold:     #C9A227  (primary accent, links/hover)
- accent-hover:    #B8922A

DARK MODE
- bg-primary:      #0F0F0F  (near-black)
- bg gradient:     linear indigo→black (#0a0f1a → #0d1122 → #0f1019 → #0F0F0F), fixed
- bg-secondary:    #1A1A1A
- text-primary:    #F5F5F3
- text-secondary:  #A0A0A0
- accent-gold:     #D4AF37  (brighter gold)
- accent-hover:    #E5C04B

Gold (#C9A227 / #D4AF37) is THE brand accent — every hover, glow, active state, and CTA
uses it. Think "burnt orange adjacent but gold" — a nod to Texas without being literal.
There is also a secondary decorative palette used only in the About page's reactive
background blob: purple #4A3AFF, teal #00CED1, gold #D4AF37, coral #FF6B6B.

## 5. Signature aesthetic & interaction language
This is the heart of the brand — please preserve the *spirit* even if you restyle:

- **Handwritten signature** as the hero centerpiece: a GIF of Sarah's actual signature
  ("black_signature.gif" in light, inverted to white in dark). It animates/draws in.
- **Particle bursts:** hovering/moving over the signature and the featured card spawns tiny
  gold star/sparkle icons that drift out and fade. Playful, tactile, "magic wand" feeling.
- **Aurora ribbons (dark mode):** slow-flowing aurora-borealis gradient waves behind the
  hero, with scattered twinkling stars. 35–55s ultra-slow loops. Dreamy night sky.
- **Drifting clouds (light mode):** real cloud PNGs slowly drifting across a blue-sky
  gradient hero (sky blue #4A90D9 → #87CEEB → fading to paper). Daytime counterpart to the
  dark aurora sky.
- **Gold glow hovers everywhere:** links scale up slightly, glow gold, and reveal a gold "→"
  arrow or an underline. Project names get a dramatic radial gold glow-orb behind them.
- **Reactive cursor aura (About page):** a large blurred color blob follows the mouse,
  shifting hue based on cursor position (bilinear interpolation across 4 corner colors).
- **Flashlight effect (Projects page):** a soft gold radial glow follows the cursor and
  "illuminates" the nearest project title (titles are dim until the light passes over them).
- **Nav:** floating pill, centered top, with a spring-animated active-tab indicator that
  slides between Home/Projects/About. "SARAH GRAVES" wordmark top-left, theme toggle top-right.
- **Grain overlay** (light mode only, 3% opacity) for a subtle paper texture.
- Motion feel throughout: **springy** (stiffness ~400, damping ~25), quick but soft.

## 6. Page-by-page inventory

### HOME ( / )
- **Hero:** animated sky/aurora background → handwritten signature → two lines of welcome
  copy in serif: "Welcome to my corner of the internet!" / "I love helping people. Contact me
  with any questions or offers :)". Hero is only min-height 60vh.
- **Statement stack:** a vertical list of big serif "verb" lines, each with hoverable,
  glowing linked terms separated by middots:
    - I am · MBA Student · Basketball Player · Artist
    - I create · Podcast · YouTube   (placeholders — channels not launched yet)
    - I build · Path · The Operator's Lens · BOSI Initiatives · NOAH Analytics
    - I speak · NIL Economics · Athlete to Operator · Sports Business & Media
    - I work · RedBird Capital · BOSI Advisory Board · Boardroom
    - Contact · Email · LinkedIn · Instagram · X
- **Featured card:** a single gold-outlined card linking to an Instagram reel — "My
  conversation with Kevin Durant about sports, business, and building." Particle burst on hover.
- Footer.

### PROJECTS ( /projects )
- Centered "Projects" serif header.
- 2-column card grid (4 projects): Path, The Operator's Lens, BOSI Initiatives, NOAH
  Analytics. Each card = title + one-line description. Flashlight-illuminates-titles effect
  and gold hover glow + rising particles. Cards deep-link from the home "I build" line.
- Footer.

### ABOUT ( /about )
- Reactive color-aura background follows cursor.
- **Video placeholder** ("Video coming soon") at top — an aspect-video card.
- Bio (3 short serif/sans paragraphs), a "Background" résumé list (team, BOSI, RedBird,
  McCombs), a "What I'm Into" list (Market mapping, Product thinking, Sports media economics,
  NIL strategy, Building from scratch), and a "Download Resume (PDF)" gold link.
- **Contact card** at the bottom: a wide rounded panel with Sarah's circular headshot on the
  left and "Get in Touch" + email + LinkedIn/Instagram/X. Gold border-glow on hover.
- Footer.

## 7. What Sarah wants improved (the actual ask)
1. **The aesthetics need to be meaningfully elevated.** It currently reads as a nicely-animated
   but somewhat generic dark portfolio. She wants it to feel more distinctive, more premium,
   more "designed" — a real visual point of view, not defaults.
2. **Too much empty space.** The layout is sparse — big vertical gaps between the statement
   lines, a short hero, lots of dead room. She wants tighter, more intentional composition and
   better use of the canvas (imagery, structure, rhythm) without losing the airy elegance.
3. Keep the **signature moment, the gold accent, the light/dark duality (sky ↔ aurora), and the
   playful particle/hover magic** — these are the brand. Elevate them; don't strip them.

## 8. Constraints / notes for the designer
- Must work in **both light and dark mode** — every screen has a day (sky/clouds) and night
  (aurora/stars) treatment. Any new design needs both.
- Must stay **responsive** (mobile → desktop). Several current effects are desktop-hover-only
  and fall back gracefully on touch.
- Gold is the single accent — introducing a second accent is possible but should be deliberate.
- Real assets available: signature GIFs (black/white), 4 cloud PNGs, 4 sparkle icon PNGs,
  several headshots. New photography/illustration is welcome and probably needed to fill space.
- Placeholders currently live: Podcast/YouTube links, the "Video coming soon" block, and the
  featured reel URL.
