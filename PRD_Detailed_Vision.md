# Project Requirement Document (PRD): Sarah Graves Portfolio

## 1. Project Overview

### 1.1 Goal
Create a premium, editorial-style personal portfolio website for Sarah Graves — a Texas Women's Basketball player building at the intersection of sports, media, and technology. The site should feel like a high-end magazine meets modern tech product: atmospheric, fluid, and intentional.

### 1.2 Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Deployment:** Vercel (future)
- **Local Dev:** `localhost:3000`

### 1.3 Core Philosophy
- Every interaction feels tangible (physics-based, not linear)
- The site reacts to user presence (cursor tracking)
- Premium editorial aesthetic (think: Monocle magazine meets Stripe)
- Dark/Light mode with gold accents throughout
- Desktop-first (mobile simplified)

---

## 2. Global Design System

### 2.1 Color Palette

#### Light Mode
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#F5F5F3` | Page background (warm off-white) |
| `--bg-secondary` | `#EAEAE8` | Card backgrounds, sections |
| `--text-primary` | `#1A1A1A` | Headings, primary text |
| `--text-secondary` | `#6B6B6B` | Body text, descriptions |
| `--accent-gold` | `#C9A227` | Links, highlights, borders |
| `--accent-gold-hover` | `#B8922A` | Gold on hover (slightly darker) |

#### Dark Mode
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0F0F0F` | Page background (rich black) |
| `--bg-secondary` | `#1A1A1A` | Card backgrounds, sections |
| `--text-primary` | `#F5F5F3` | Headings, primary text |
| `--text-secondary` | `#A0A0A0` | Body text, descriptions |
| `--accent-gold` | `#D4AF37` | Links, highlights, borders |
| `--accent-gold-hover` | `#E5C04B` | Gold on hover (slightly brighter) |

**Important:** Avoid pure white (#FFFFFF) and pure black (#000000). The palette should feel premium and easy on the eyes.

### 2.2 Typography

| Element | Font | Weight | Size (Desktop) |
|---------|------|--------|----------------|
| Hero Name | Custom handwriting (video/PNG) | N/A | Full-width |
| Section Headers | Playfair Display | 700 | 48-64px |
| Category Labels | Playfair Display | 600 | 32-40px |
| Body Text | Inter | 400 | 16-18px |
| Navigation | Inter | 500 | 14-16px |
| Labels/Small | Inter | 500 | 12-14px |

### 2.3 Spacing System
Use Tailwind's default scale with these guidelines:
- Section padding: `py-24` (96px)
- Content max-width: `max-w-6xl` (1152px)
- Card gaps: `gap-8` (32px)
- Text block spacing: `space-y-6` (24px)

### 2.4 Global Interaction Physics

All hover/transition animations use Framer Motion spring physics:

```javascript
// Snappy interactions (buttons, links)
const snappySpring = { type: "spring", stiffness: 400, damping: 25 }

// Smooth following (cursor effects, backgrounds)
const smoothSpring = { type: "spring", stiffness: 150, damping: 20 }

// Gentle transitions (page elements)
const gentleSpring = { type: "spring", stiffness: 100, damping: 15 }
```

**Never use:** `transition: all 0.3s ease` or linear timing functions for interactive elements.

---

## 3. Page Structure

### 3.1 Site Map
```
/ (Home)
├── /projects (Projects grid)
│   └── #path, #operators-lens, #bosi, #redbird (anchor sections)
└── /about (About + Contact)
```

### 3.2 Navigation Component

**Position:** Fixed at top of viewport, all pages

**Appearance (Light Mode):**
- Background: `rgba(245, 245, 243, 0.8)` with `backdrop-filter: blur(12px)`
- Border-bottom: `1px solid rgba(201, 162, 39, 0.2)` (subtle gold)

**Appearance (Dark Mode):**
- Background: `rgba(15, 15, 15, 0.8)` with `backdrop-filter: blur(12px)`
- Border-bottom: `1px solid rgba(212, 175, 55, 0.2)` (subtle gold)

**Content:**
- Links: "Home", "Projects", "About"
- Font: Inter Medium, 14px
- Spacing: `gap-8` between links
- Centered horizontally with subtle pill/rounded-full background

**Hover State:**
- Text color transitions to gold
- Subtle scale: `scale(1.02)`
- Use snappy spring physics

**Mobile:** Stays the same (no hamburger needed for 3 links)

---

## 4. Home Page (`/`)

The home page is a single-scroll experience with distinct sections.

### 4.1 Hero Section (100vh)

#### Visual Foundation
- **Background:** Deep dark indigo gradient (`#0a0f1a` to `#1a1a2e`)
- **Film Grain:** Subtle noise texture overlay at 2-3% opacity for premium feel
- **Depth:** Multi-layered parallax effect creates immense perceived depth

#### The Atmospheric Elements

**Cloud Layers (3 layers minimum):**
- Layer 1 (back): Moves at 0.3x scroll speed, opacity 0.3
- Layer 2 (mid): Moves at 0.5x scroll speed, opacity 0.5  
- Layer 3 (front): Moves at 0.8x scroll speed, opacity 0.7
- All clouds drift horizontally (subtle, 20-30px over 30 seconds)
- Use CSS gradients or semi-transparent PNG overlays

**The Moon/Orb (Central Anchor):**
- Soft, glowing crescent or radial orb
- Position: Center of viewport, slight offset up
- Glow: `box-shadow: 0 0 100px 50px rgba(255, 250, 240, 0.1)`
- Acts as the "light source" for the atmospheric scene

**Dust Particles:**
- Very sparse (10-15 particles visible)
- Slowly rise upward (30-60 seconds to cross viewport)
- Size: 1-3px, soft edges
- Color: Warm white/cream, catching the "moonlight"

#### The Handwriting Video Element
- **Content:** Looping video of Sarah's hand-drawn "SARAH GRAVES!" being written
- **Format:** MP4 or WebM, muted, autoplay, loop
- **Fallback:** PNG of completed handwriting if video fails
- **Alternative:** SVG with stroke-dashoffset animation (see Appendix B.1)
- **Size:** Large, approximately 60-70% viewport width
- **Position:** Centered, slight offset from top (around 20vh from top)

#### The Scroll Transition (Curtain Lift)
- As user scrolls, clouds move UP faster than scroll speed (1.5x multiplier)
- Clouds fade out (opacity 1 → 0) over first 400px of scroll
- The white/light background of Zone B is revealed beneath
- Signature element can either:
  - Stay fixed and fade out
  - Scroll up with parallax and shrink slightly
  
#### Scroll Indicator
- Small animated chevron or line at bottom of hero
- Text: "Scroll" in Inter, small caps, `--text-secondary`
- Gentle bounce animation (translateY 0 → 8px → 0, 2s loop)
- Fades out after user scrolls past 100px

### 4.2 Category Sections

Below the hero, the page displays Sarah's content in the "I am / I work / I build / I speak / Contact" structure.

#### Section Layout
Each category is a distinct section with:
- Category label on left (e.g., "I am") — Playfair Display, 32px
- Content items on right — expandable list

#### Content Structure

**I am**
- Texas Women's Basketball player
- BBA Finance, UT McCombs (May 2026)
- Building projects in sports, media, and tech

**I work**
- RedBird Capital → comps, market mapping, college sports research
- BOSI → advisory board work and student-athlete career access projects
- Boardroom → campus program building (in progress)

**I build**
- Path → swipe-based sports career discovery app
- The Operator's Lens → short writing and frameworks
- BOSI initiatives → repeatable internships and mentorship pipelines
- Data work → NOAH shooting analytics projects

**I speak**
- NIL and college athletics economics
- Athlete to operator transition
- Sports business, media, and product thinking

**Contact**
- Email: sarahkgraves2@gmail.com
- LinkedIn: linkedin.com/in/sarahkgraves
- Instagram: @sarahkgraves
- X: @sarahkgraves

### 4.3 The Expanding List Interaction (CRUCIAL)

This is the signature interaction for the home page.

**Initial State:**
- Each list item displays as text in Playfair Display, ~24-28px
- Text color: `--text-primary`
- Items are tightly spaced (line-height: 1.3)
- No visible arrow

**Hover State (Animate with Framer Motion):**
1. **Color Shift:** Text color snaps instantly to `--accent-gold` (duration: 0)
2. **Arrow Reveal:** An arrow icon (→) fades in (opacity 0→1) and scales up (scale 0.5→1)
3. **Letter Spacing Expansion:** The text's letter-spacing increases from `0` to `0.05em`
4. **Container Width:** The entire line expands horizontally (subtle, ~10-20px)
5. **Spring Physics:** All movement uses `snappySpring` config

**Click Behavior:**
- Items in "I build" section link to `/projects#[project-id]`
- Contact items open respective links (mailto:, LinkedIn, etc.)
- Other items can link to relevant sections or stay static

**Visual Reference:** The effect should feel like the arrow is physically pushing the letters apart as it appears.

---

## 5. Projects Page (`/projects`)

### 5.1 Page Layout

**Header:**
- Title: "Projects" in Playfair Display, 48-64px
- Subtitle (optional): "Things I'm building" in Inter, 18px, `--text-secondary`

**Grid:**
- 2-column grid on desktop
- Full-width cards on mobile
- Gap: 32px

### 5.2 Project Cards

Each project gets a card with:
- Project name (Playfair Display, 28-32px)
- One-line description (Inter, 16px)
- Optional: small tag/label (e.g., "App", "Content", "Initiative")
- ID attribute for anchor linking (e.g., `id="path"`)

### 5.3 The Flashlight Reveal Effect (CRUCIAL)

This is the signature interaction for the projects page.

**Initial State:**
- Project card titles are dim/muted: `opacity: 0.3` or `color: --text-secondary`
- The cards themselves are visible but feel dormant

**Cursor Interaction:**
- A large, soft radial gradient "flashlight" follows the cursor
- Gradient specs: ~300-400px diameter, white/gold center fading to transparent
- The gradient is NOT tied to individual cards — it moves across the entire grid container seamlessly

**Reveal Effect:**
- As the flashlight passes over a project title, it illuminates to full `--text-primary` color
- The falloff is soft — partial illumination at edges
- Implementation: Use CSS `mask-image` with a radial gradient positioned at mouse coordinates, OR use `mix-blend-mode` with an overlay layer

**Performance Note:** Use `requestAnimationFrame` and CSS transforms for smooth 60fps tracking.

### 5.4 Project Detail Sections

Each project card, when expanded or scrolled to, shows:
- Full project description (2-3 sentences)
- Key highlights or features (3-4 bullet points)
- Status tag (e.g., "Active", "In Progress", "Completed")
- Optional: Screenshot or visual

**Projects Content:**

**Path** (id="path")
- Swipe-based career discovery app for students interested in sports industry careers
- Features personality quiz matching users to career paths
- Database of verified industry professionals
- Status: Active development, BOSI demo Feb 19

**The Operator's Lens** (id="operators-lens")
- Content framework for sports business analysis
- Pillars: Follow the Money, Market Inefficiencies, Texas as Laboratory
- Published on LinkedIn
- Status: Ongoing

**BOSI Initiative** (id="bosi")
- Building systematic internship access for student-athletes
- Advisory board collaboration with Kevin Durant, Rich Kleiman, Kirk Goldsberry
- Focus: repeatable mentorship pipelines
- Status: Active

**RedBird Research** (id="redbird")
- Market mapping and competitive analysis in college sports private equity
- Comps analysis, white papers, strategy research
- Completed during NYC internship
- Status: Completed

---

## 6. About Page (`/about`)

### 6.1 Page Layout

**Top Section: Video Hero**
- Widescreen video container (16:9 aspect ratio)
- Size: Full-width with max-width constraint (~900px)
- Default state: Muted, shows poster frame (thumbnail)
- Play button overlay (gold accent, centered)
- Video content: 30-60 second personal intro

**Video Placeholder Specs:**
- Background: `--bg-secondary`
- Border: `1px solid rgba(gold, 0.2)`
- Border-radius: `12px`
- Placeholder text: "Video coming soon" (until real video added)

### 6.2 Bio Section

**Headline:** "About Sarah" or just let the content speak

**Bio Paragraph (2-3 paragraphs):**
Write in first person, direct, no fluff. Example tone:

> I'm a guard on the Texas Women's Basketball team and a finance major at McCombs. I spend my time off the court building things at the intersection of sports, media, and technology.
>
> I sit on the Business of Sports Institute advisory board alongside Kevin Durant, Rich Kleiman, and Kirk Goldsberry. Last summer I interned at RedBird Capital in New York, where I learned that the most interesting problems in sports aren't on the field — they're in the business models behind them.
>
> I'm currently building Path, a career discovery app for students who want to work in sports. I write about sports business through The Operator's Lens. And I'm always looking for the next thing to figure out.

### 6.3 Background Section

**Label:** "Background"

Timeline or list format:
- **Texas Women's Basketball** — Guard, walk-on turned scholarship (2022-present)
- **BOSI Advisory Board** — Member (2024-present)
- **RedBird Capital** — Summer Analyst, NYC (2024)
- **BBA Finance** — McCombs School of Business (Expected May 2026)

### 6.4 Skills/Interests Section (Optional)

**Label:** "What I'm Into"

Casual list:
- Market mapping & competitive analysis
- Product thinking
- Sports media economics
- NIL strategy
- Building things from scratch

### 6.5 Resume Download

- Button or text link: "Download Resume (PDF)"
- Style: Gold border button or underlined text link
- File: `/resume-sarah-graves.pdf` in public folder (placeholder for now)

### 6.6 The Reactive Aura Background (CRUCIAL)

This is the signature interaction for the about page.

**Effect Description:**
- The background has a large, diffused glowing "blob" that follows the cursor
- The blob has a soft gradient edge (not hard circle)
- Movement has inertia — the blob trails behind the cursor, feels like moving through liquid

**Color Shifting:**
- The blob's color changes based on cursor position on the page
- Top-left quadrant: Deep purple/blue (`#4A3AFF`)
- Top-right quadrant: Teal (`#00CED1`)
- Bottom-left quadrant: Gold (`#D4AF37`)
- Bottom-right quadrant: Rose/coral (`#FF6B6B`)
- Colors interpolate smoothly as cursor moves between quadrants

**Implementation:**
- Use Framer Motion's `useSpring` for the trailing effect
- CSS radial gradient positioned at (smoothed) mouse coordinates
- Color values interpolated based on cursor position percentage

**Subtle Particles (Optional Enhancement):**
- Very sparse small dots (5-10 on screen)
- Slowly drift away from cursor position
- Fade in/out gently
- Gold or white colored

---

## 7. Dark/Light Mode

### 7.1 Toggle Location
- Small icon button in navigation (sun/moon icon)
- Or: Automatic based on system preference with manual override

### 7.2 Implementation
- Use `next-themes` or CSS custom properties with class toggle
- Store preference in localStorage
- Transition: `transition: background-color 0.3s ease, color 0.3s ease`

### 7.3 Considerations
- All signature effects (flashlight, aura) work in both modes
- Gold accent remains constant across modes
- Test contrast ratios for accessibility

---

## 8. Technical Requirements

### 8.1 File Structure
```
src/
├── app/
│   ├── page.tsx (Home)
│   ├── projects/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Navigation.tsx
│   ├── ExpandingListItem.tsx
│   ├── FlashlightGrid.tsx
│   ├── ProjectCard.tsx
│   ├── ReactiveAura.tsx
│   ├── VideoPlayer.tsx
│   └── ThemeToggle.tsx
├── hooks/
│   └── useMousePosition.ts
├── lib/
│   └── utils.ts
└── styles/
    └── (additional styles if needed)

public/
├── images/
│   └── sarah-graves-handwriting.png
├── videos/
│   ├── sarah-graves-animation.mp4
│   └── about-intro.mp4 (placeholder)
└── resume-sarah-graves.pdf (placeholder)
```

### 8.2 Performance Targets
- Lighthouse Performance: >90
- First Contentful Paint: <1.5s
- Cursor-tracking effects: 60fps
- Video: Lazy load, compressed

### 8.3 Browser Support
- Chrome, Safari, Firefox, Edge (latest 2 versions)
- Desktop-first; mobile is simplified but functional

---

## 9. Assets Needed from Sarah

1. **Handwriting video** — Screen recording of drawing "SARAH GRAVES!" (MP4/MOV)
2. **Handwriting PNG** — Static fallback image
3. **About video** — 30-60 second intro (when ready)
4. **Headshot** — Optional, for About page or OG image
5. **Resume PDF** — Current resume

---

## 10. Implementation Order

**Phase 1: Foundation**
1. Set up design system (colors, fonts, CSS variables)
2. Build Navigation component
3. Implement dark/light mode toggle
4. Create useMousePosition hook

**Phase 2: Home Page**
1. Hero section with video/PNG
2. Category sections layout
3. Expanding list interaction
4. Scroll indicator

**Phase 3: Projects Page**
1. Page layout and grid
2. Project cards
3. Flashlight reveal effect
4. Anchor link scrolling

**Phase 4: About Page**
1. Video placeholder section
2. Bio and background content
3. Resume download
4. Reactive aura background effect

**Phase 5: Polish**
1. Transitions between pages
2. Loading states
3. SEO and meta tags
4. Performance optimization

---

## Appendix A: Animation Reference Descriptions

### A. Expanding List Animation (Home Page)
Imagine each list item as a spring-loaded container. On hover:
- The gold color floods in instantly (no fade)
- An arrow appears from scale 0, growing to full size
- As the arrow grows, it pushes the letters apart like a physical object
- Release hover: everything springs back to original state

### B. Flashlight Effect (Projects Page)
Imagine shining a flashlight in a dark room:
- The "beam" is soft-edged, not a hard circle
- It reveals what's underneath as it passes over
- The light doesn't jump — it follows your hand smoothly
- Text outside the beam remains dim but visible

### C. Reactive Aura (About Page)
Imagine a glowing orb floating in water:
- It follows your cursor but with drag, like moving through honey
- The color shifts gradually as it moves to different areas
- Tiny particles occasionally drift away from it
- The edges are very soft and diffused

---

## Appendix B: Technical Implementation Details

### B.1 SVG Signature Animation (Alternative to Video)

If using SVG instead of video for the "SARAH GRAVES!" handwriting:

```javascript
// The signature should animate using stroke-dashoffset
// This creates a "pen drawing in real-time" effect

const signaturePath = {
  hidden: {
    pathLength: 0,
    opacity: 0
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 2.5, ease: "easeInOut" },
      opacity: { duration: 0.3 }
    }
  }
}

// In Framer Motion:
<motion.path
  d="[your SVG path data]"
  variants={signaturePath}
  initial="hidden"
  animate="visible"
  stroke="currentColor"
  strokeWidth={2}
  fill="none"
/>
```

### B.2 Atmospheric Hero - The Curtain Lift Effect

The dark sky doesn't just scroll away — it lifts FASTER than scroll speed:

```javascript
// useScroll from Framer Motion
const { scrollY } = useScroll()

// Transform scroll position to move clouds 1.5x faster
const cloudY = useTransform(scrollY, [0, 500], [0, -750])
const cloudOpacity = useTransform(scrollY, [0, 400], [1, 0])

// Apply to cloud layers
<motion.div 
  style={{ y: cloudY, opacity: cloudOpacity }}
  className="cloud-layer"
/>
```

### B.3 Film Grain Texture Overlay

Add subtle noise for premium "film" aesthetic:

```css
.grain-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
  opacity: 0.03; /* Very subtle */
  background-image: url('/images/noise.png');
  /* Or use CSS noise: */
  /* background: url("data:image/svg+xml,...") */
}
```

### B.4 Flashlight Effect - Radial Mask Implementation

This is the EXACT technique for the Projects page spotlight:

**CSS Setup:**
```css
.flashlight-container {
  --mouse-x: 50%;
  --mouse-y: 50%;
  position: relative;
}

/* The dim/inactive text layer */
.project-title-dim {
  color: rgba(255, 255, 255, 0.2); /* or #444 for light mode */
  position: absolute;
}

/* The bright/illuminated text layer - sits on top */
.project-title-bright {
  color: #FFFFFF;
  position: relative;
  /* The magic - radial gradient mask */
  mask-image: radial-gradient(
    circle 200px at var(--mouse-x) var(--mouse-y),
    black 0%,
    transparent 100%
  );
  -webkit-mask-image: radial-gradient(
    circle 200px at var(--mouse-x) var(--mouse-y),
    black 0%,
    transparent 100%
  );
}

/* The glow/halo behind the text */
.flashlight-glow {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(212, 175, 55, 0.3) 0%,  /* Gold center */
    transparent 70%
  );
  transform: translate(-50%, -50%);
  pointer-events: none;
  mix-blend-mode: screen;
  filter: blur(40px);
}
```

**JavaScript Tracking:**
```javascript
// Track mouse and update CSS variables
const handleMouseMove = (e) => {
  const container = document.querySelector('.flashlight-container')
  const rect = container.getBoundingClientRect()
  
  // Calculate position as percentage
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  
  container.style.setProperty('--mouse-x', `${x}%`)
  container.style.setProperty('--mouse-y', `${y}%`)
}

// Or in React with Framer Motion for smooth interpolation:
const mouseX = useMotionValue(0)
const mouseY = useMotionValue(0)

// Add spring for organic "lag" feel
const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 })
const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 })
```

### B.5 Cursor Lag/Interpolation

**Critical for organic feel** — the light/aura should NOT snap instantly to cursor:

```javascript
// Method 1: CSS Transition (simple)
.glow-element {
  transition: transform 0.15s ease-out;
}

// Method 2: Framer Motion Spring (better)
const smoothX = useSpring(mouseX, { 
  stiffness: 100,  // Lower = more lag
  damping: 20,     // Higher = less bounce
  mass: 0.5        // Higher = more "weight"
})

// Method 3: Manual interpolation (most control)
let currentX = 0
let currentY = 0
const lerp = (start, end, factor) => start + (end - start) * factor

function animate() {
  currentX = lerp(currentX, targetX, 0.1)  // 0.1 = 10% toward target each frame
  currentY = lerp(currentY, targetY, 0.1)
  // Apply currentX, currentY to element
  requestAnimationFrame(animate)
}
```

### B.6 Particle Repulsion System

Particles that flee from the cursor:

```javascript
// Particle class
class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.baseX = x  // Remember original position
    this.baseY = y
    this.vx = 0
    this.vy = 0
    this.size = Math.random() * 2 + 2  // 2-4px
  }

  update(mouseX, mouseY) {
    // Calculate distance from mouse
    const dx = this.x - mouseX
    const dy = this.y - mouseY
    const distance = Math.sqrt(dx * dx + dy * dy)
    const repelRadius = 100  // Pixels

    if (distance < repelRadius) {
      // Repel force (stronger when closer)
      const force = (repelRadius - distance) / repelRadius
      this.vx += (dx / distance) * force * 2
      this.vy += (dy / distance) * force * 2
    }

    // Drift back to original position
    this.vx += (this.baseX - this.x) * 0.02
    this.vy += (this.baseY - this.y) * 0.02

    // Apply friction
    this.vx *= 0.95
    this.vy *= 0.95

    // Update position
    this.x += this.vx
    this.y += this.vy
  }
}
```

### B.7 Color Interpolation for Reactive Aura

Smoothly shift colors based on cursor position:

```javascript
// Define corner colors
const colors = {
  topLeft: { r: 74, g: 58, b: 255 },     // Purple #4A3AFF
  topRight: { r: 0, g: 206, b: 209 },    // Teal #00CED1
  bottomLeft: { r: 212, g: 175, b: 55 }, // Gold #D4AF37
  bottomRight: { r: 255, g: 107, b: 107 } // Coral #FF6B6B
}

function getInterpolatedColor(xPercent, yPercent) {
  // Bilinear interpolation
  const top = lerpColor(colors.topLeft, colors.topRight, xPercent)
  const bottom = lerpColor(colors.bottomLeft, colors.bottomRight, xPercent)
  const final = lerpColor(top, bottom, yPercent)
  
  return `rgb(${final.r}, ${final.g}, ${final.b})`
}

function lerpColor(c1, c2, factor) {
  return {
    r: Math.round(c1.r + (c2.r - c1.r) * factor),
    g: Math.round(c1.g + (c2.g - c1.g) * factor),
    b: Math.round(c1.b + (c2.b - c1.b) * factor)
  }
}

// Usage: Update on mouse move
const color = getInterpolatedColor(mouseXPercent, mouseYPercent)
auraElement.style.background = `radial-gradient(circle 300px, ${color}, transparent)`
```

### B.8 Expanding List - Spring Physics Detail

The magnetic/expanding effect on hover:

```javascript
// Framer Motion variants for list item
const listItemVariants = {
  initial: {
    color: "var(--text-primary)",
    letterSpacing: "0em",
  },
  hover: {
    color: "var(--accent-gold)",
    letterSpacing: "0.05em",
    transition: {
      color: { duration: 0 },  // Instant color snap
      letterSpacing: { type: "spring", stiffness: 300, damping: 20 }
    }
  }
}

const arrowVariants = {
  initial: {
    opacity: 0,
    scale: 0.5,
    x: -10
  },
  hover: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
}

// Component structure
<motion.div
  variants={listItemVariants}
  initial="initial"
  whileHover="hover"
>
  <span>Path</span>
  <motion.span variants={arrowVariants}>→</motion.span>
</motion.div>
```

### B.9 Mobile Fallback Strategy

Since cursor effects don't work on touch:

```javascript
// Detect touch device
const isTouchDevice = 'ontouchstart' in window

// Conditional rendering
{!isTouchDevice && <FlashlightEffect />}

// Or: Use touch position instead
const handleTouch = (e) => {
  const touch = e.touches[0]
  setMousePosition({ x: touch.clientX, y: touch.clientY })
}

// CSS fallback - make text fully visible on mobile
@media (hover: none) {
  .project-title-dim { display: none; }
  .project-title-bright { 
    mask-image: none;
    -webkit-mask-image: none;
  }
}
```

### B.10 Performance Optimization

Keep animations at 60fps:

```javascript
// Use CSS transforms, not top/left
// ✅ Good
transform: translate(var(--mouse-x), var(--mouse-y))

// ❌ Bad
left: var(--mouse-x);
top: var(--mouse-y);

// Add will-change for GPU acceleration
.animated-element {
  will-change: transform, opacity;
}

// Throttle mouse events if needed
let ticking = false
window.addEventListener('mousemove', (e) => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updatePosition(e.clientX, e.clientY)
      ticking = false
    })
    ticking = true
  }
})
