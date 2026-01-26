'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'

// Corner colors for interpolation
const colors = {
  topLeft: { r: 74, g: 58, b: 255 },     // Purple #4A3AFF
  topRight: { r: 0, g: 206, b: 209 },    // Teal #00CED1
  bottomLeft: { r: 212, g: 175, b: 55 }, // Gold #D4AF37
  bottomRight: { r: 255, g: 107, b: 107 } // Coral #FF6B6B
}

function lerpColor(c1: typeof colors.topLeft, c2: typeof colors.topLeft, factor: number) {
  return {
    r: Math.round(c1.r + (c2.r - c1.r) * factor),
    g: Math.round(c1.g + (c2.g - c1.g) * factor),
    b: Math.round(c1.b + (c2.b - c1.b) * factor)
  }
}

function getInterpolatedColor(xPercent: number, yPercent: number) {
  // Bilinear interpolation across four corners
  const top = lerpColor(colors.topLeft, colors.topRight, xPercent)
  const bottom = lerpColor(colors.bottomLeft, colors.bottomRight, xPercent)
  const final = lerpColor(top, bottom, yPercent)
  return `rgb(${final.r}, ${final.g}, ${final.b})`
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Raw mouse position (as percentage 0-1)
  const mouseXPercent = useMotionValue(0.5)
  const mouseYPercent = useMotionValue(0.5)

  // Raw pixel position for blob placement
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring-based following with liquid drag feel
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 25, mass: 0.5 })
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 25, mass: 0.5 })

  // Smooth color transitions
  const smoothXPercent = useSpring(mouseXPercent, { stiffness: 80, damping: 30 })
  const smoothYPercent = useSpring(mouseYPercent, { stiffness: 80, damping: 30 })

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()

      // Pixel position
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)

      // Percentage position (clamped 0-1)
      const xPct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      const yPct = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))

      mouseXPercent.set(xPct)
      mouseYPercent.set(yPct)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, mouseXPercent, mouseYPercent])

  // Derive color from smoothed percentages
  const auraColor = useTransform(
    [smoothXPercent, smoothYPercent],
    ([x, y]) => getInterpolatedColor(x as number, y as number)
  )

  // Pre-compute gradient backgrounds as motion values
  const auraGradient = useTransform(
    auraColor,
    (color) => `radial-gradient(circle, ${color} 0%, transparent 70%)`
  )

  const secondaryGradient = useTransform(
    auraColor,
    (color) => `radial-gradient(circle, ${color} 0%, transparent 60%)`
  )

  return (
    <main
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Reactive Aura Background */}
      <motion.div
        className="pointer-events-none absolute z-0"
        style={{
          x: smoothX,
          y: smoothY,
          width: 500,
          height: 500,
          marginLeft: -250,
          marginTop: -250,
          borderRadius: '50%',
          filter: 'blur(80px)',
          opacity: 0.4,
          background: auraGradient,
        }}
      />

      {/* Secondary subtle glow for depth */}
      <motion.div
        className="pointer-events-none absolute z-0"
        style={{
          x: smoothX,
          y: smoothY,
          width: 300,
          height: 300,
          marginLeft: -150,
          marginTop: -150,
          borderRadius: '50%',
          filter: 'blur(60px)',
          opacity: 0.25,
          background: secondaryGradient,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-32 pb-20">
        {/* Video Placeholder */}
        <div
          className="aspect-video rounded-xl mb-12 flex items-center justify-center border border-[var(--text-secondary)]/20"
          style={{ background: 'var(--bg-secondary)' }}
        >
          <span
            className="text-lg"
            style={{ color: 'var(--text-secondary)' }}
          >
            Video coming soon
          </span>
        </div>

        {/* Bio Section */}
        <section>
          <h1
            className="font-serif text-4xl font-bold mb-8"
            style={{ color: 'var(--text-primary)' }}
          >
            About
          </h1>

          <div className="space-y-6">
            <p
              className="font-sans text-lg leading-relaxed"
              style={{ color: 'var(--text-primary)' }}
            >
              I'm a guard on the Texas Women's Basketball team and a finance major at McCombs. Off the court, I build things at the intersection of sports, media, and technology.
            </p>

            <p
              className="font-sans text-lg leading-relaxed"
              style={{ color: 'var(--text-primary)' }}
            >
              I sit on the BOSI advisory board alongside Kevin Durant, Rich Kleiman, and Kirk Goldsberry. Last summer I interned at RedBird Capital in New York.
            </p>

            <p
              className="font-sans text-lg leading-relaxed"
              style={{ color: 'var(--text-primary)' }}
            >
              Currently building Path, a career discovery app for students who want to work in sports.
            </p>
          </div>
        </section>

        {/* Background Section */}
        <section className="mt-16">
          <h2
            className="uppercase tracking-widest text-xs mb-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            Background
          </h2>
          <ul className="space-y-3">
            <li
              className="font-sans text-lg"
              style={{ color: 'var(--text-primary)' }}
            >
              <span className="font-semibold">Texas Women's Basketball</span>
              <span style={{ color: 'var(--text-secondary)' }}> — Guard (2022-present)</span>
            </li>
            <li
              className="font-sans text-lg"
              style={{ color: 'var(--text-primary)' }}
            >
              <span className="font-semibold">BOSI Advisory Board</span>
              <span style={{ color: 'var(--text-secondary)' }}> — Member (2024-present)</span>
            </li>
            <li
              className="font-sans text-lg"
              style={{ color: 'var(--text-primary)' }}
            >
              <span className="font-semibold">RedBird Capital</span>
              <span style={{ color: 'var(--text-secondary)' }}> — Summer Analyst, NYC (2024)</span>
            </li>
            <li
              className="font-sans text-lg"
              style={{ color: 'var(--text-primary)' }}
            >
              <span className="font-semibold">McCombs School of Business</span>
              <span style={{ color: 'var(--text-secondary)' }}> — BBA Finance (May 2026)</span>
            </li>
          </ul>
        </section>

        {/* What I'm Into Section */}
        <section className="mt-16">
          <h2
            className="uppercase tracking-widest text-xs mb-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            What I'm Into
          </h2>
          <ul className="space-y-2">
            {['Market mapping', 'Product thinking', 'Sports media economics', 'NIL strategy', 'Building from scratch'].map((item) => (
              <li
                key={item}
                className="font-sans text-lg"
                style={{ color: 'var(--text-primary)' }}
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Resume Link */}
        <div className="mt-16">
          <Link
            href="/resume.pdf"
            className="text-lg transition-all hover:underline"
            style={{ color: 'var(--accent-gold)' }}
          >
            Download Resume (PDF) ↓
          </Link>
        </div>

        {/* Contact Section */}
        <section id="contact" className="mt-16 scroll-mt-24">
          <h2
            className="uppercase tracking-widest text-xs mb-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            Contact
          </h2>
          <div className="space-y-3">
            <a
              href="mailto:sarahkgraves2@gmail.com"
              className="block font-sans text-lg transition-colors hover:text-[var(--accent-gold)]"
              style={{ color: 'var(--text-primary)' }}
            >
              sarahkgraves2@gmail.com
            </a>
            <div className="flex gap-6">
              <a
                href="https://linkedin.com/in/sarahkgraves"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-lg transition-colors hover:text-[var(--accent-gold)]"
                style={{ color: 'var(--text-primary)' }}
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com/sarahkgraves"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-lg transition-colors hover:text-[var(--accent-gold)]"
                style={{ color: 'var(--text-primary)' }}
              >
                Instagram
              </a>
              <a
                href="https://x.com/sarahkgraves"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-lg transition-colors hover:text-[var(--accent-gold)]"
                style={{ color: 'var(--text-primary)' }}
              >
                X
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile fallback - hide aura on touch devices */}
      <style jsx global>{`
        @media (hover: none) {
          .pointer-events-none.absolute.z-0 {
            display: none;
          }
        }
      `}</style>

      <Footer />
    </main>
  )
}
