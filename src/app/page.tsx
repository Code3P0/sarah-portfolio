'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { AuroraEffect } from '@/components/AuroraEffect'
import { useState, useRef, useCallback } from 'react'

// Burst particle type for signature hover effect
interface BurstParticle {
  id: string
  x: number
  y: number
  icon: string
  direction: number
  distance: number
  duration: number
}

// Available icons for burst effect
const burstIcons = ['/images/icon1.png', '/images/icon2.png', '/images/icon4.png']

// Animation variants for the arrow effect
const containerVariants = {
  hover: {
    color: "#D4AF37",
    textShadow: "0 0 20px rgba(212,175,55,0.4)",
  }
}

const textVariants = {
  hover: {
    letterSpacing: "0.02em",
  }
}

const arrowVariants = {
  initial: { opacity: 0, x: -8, scale: 0.5 },
  hover: { opacity: 1, x: 0, scale: 1 }
}

const springTransition = { type: "spring", stiffness: 400, damping: 25 }

// Reusable hover item component
function HoverItem({ children }: { children: string }) {
  return (
    <motion.span
      className="cursor-pointer font-bold inline-flex items-center"
      style={{ color: 'var(--text-primary)' }}
      initial="initial"
      whileHover="hover"
      variants={containerVariants}
      transition={springTransition}
    >
      <motion.span variants={textVariants} transition={springTransition}>
        {children}
      </motion.span>
      <motion.span
        className="ml-1 text-[#D4AF37]"
        variants={arrowVariants}
        transition={springTransition}
      >
        →
      </motion.span>
    </motion.span>
  )
}

// Hover item with Link wrapper
function HoverLink({ href, children, external = false }: { href: string; children: string; external?: boolean }) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <motion.span
        className="cursor-pointer font-bold inline-flex items-center"
        style={{ color: 'var(--text-primary)' }}
        initial="initial"
        whileHover="hover"
        variants={containerVariants}
        transition={springTransition}
      >
        <motion.span variants={textVariants} transition={springTransition}>
          {children}
        </motion.span>
        <motion.span
          className="ml-1 text-[#D4AF37]"
          variants={arrowVariants}
          transition={springTransition}
        >
          →
        </motion.span>
      </motion.span>
    </Link>
  )
}

// Project link with dramatic glow effect
function ProjectLink({ href, children }: { href: string; children: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={href}>
      <motion.span
        className="cursor-pointer font-bold inline-block relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Glow orb behind text */}
        <motion.span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[60px] pointer-events-none -z-10"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.6) 0%, rgba(255,182,193,0.4) 30%, transparent 70%)',
            filter: 'blur(20px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />

        {/* Text with glow */}
        <span
          className="relative z-10 transition-[text-shadow] duration-200"
          style={{
            color: isHovered ? 'var(--project-hover-text)' : 'var(--text-primary)',
            textShadow: isHovered ? 'var(--project-hover-glow)' : 'none',
          }}
        >
          {children}
        </span>

        {/* Underline */}
        <motion.span
          className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left"
          style={{
            background: 'var(--project-hover-text)',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      </motion.span>
    </Link>
  )
}

export default function Home() {
  // State for burst particles on signature hover
  const [particles, setParticles] = useState<BurstParticle[]>([])
  const signatureRef = useRef<HTMLDivElement>(null)
  const lastPosRef = useRef({ x: 0, y: 0 })
  const distanceTraveledRef = useRef(0)

  // Handle mouse move over signature
  const handleSignatureMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!signatureRef.current) return

    const rect = signatureRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate distance traveled since last position
    const dx = x - lastPosRef.current.x
    const dy = y - lastPosRef.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    distanceTraveledRef.current += distance
    lastPosRef.current = { x, y }

    // Spawn particles every 100-150px of movement
    const spawnThreshold = 100 + Math.random() * 50
    if (distanceTraveledRef.current >= spawnThreshold) {
      distanceTraveledRef.current = 0

      // Spawn 1-2 particles
      const numParticles = Math.random() > 0.5 ? 2 : 1
      const newParticles: BurstParticle[] = []

      for (let i = 0; i < numParticles; i++) {
        newParticles.push({
          id: `${Date.now()}-${i}-${Math.random()}`,
          x,
          y,
          icon: burstIcons[Math.floor(Math.random() * burstIcons.length)],
          direction: Math.random() * Math.PI * 2,
          distance: 30 + Math.random() * 30, // 30-60px
          duration: 0.8 + Math.random() * 0.4, // 0.8-1.2s
        })
      }

      setParticles(prev => [...prev, ...newParticles])
    }
  }, [])

  // Remove particle after animation completes
  const removeParticle = useCallback((id: string) => {
    setParticles(prev => prev.filter(p => p.id !== id))
  }, [])

  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Light mode sky gradient - deep blue fading to content bg */}
        <div
          className="absolute inset-0 block dark:hidden"
          style={{
            background: 'linear-gradient(to bottom, #4A90D9 0%, #87CEEB 30%, #B8D4E8 60%, #F5F5F3 100%)',
          }}
        />

        {/* Dark mode night sky gradient - deep indigo fading to content bg */}
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            background: 'linear-gradient(to bottom, #0a0f1a 0%, #0F0F0F 100%)',
          }}
        />

        {/* Aurora/Nebula effect - dark mode only */}
        <AuroraEffect />

        {/* Real cloud images - light mode only */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden block dark:hidden">
          {/* Cloud 1 - large, top right */}
          <img
            src="/images/cloud1.png"
            alt=""
            className="absolute w-[450px] md:w-[600px] opacity-60 animate-cloud-drift"
            style={{ top: '5%', right: '-10%' }}
          />

          {/* Cloud 2 - large, left side */}
          <img
            src="/images/cloud2.png"
            alt=""
            className="absolute w-[400px] md:w-[550px] opacity-55 animate-cloud-drift"
            style={{ top: '20%', left: '-15%', animationDelay: '-8s' }}
          />

          {/* Cloud 3 - medium, top center */}
          <img
            src="/images/cloud3.png"
            alt=""
            className="absolute w-[300px] md:w-[420px] opacity-50 animate-cloud-drift"
            style={{ top: '2%', left: '25%', animationDelay: '-15s' }}
          />

          {/* Cloud 4 - medium, lower area */}
          <img
            src="/images/cloud4.png"
            alt=""
            className="absolute w-[320px] md:w-[450px] opacity-45 animate-cloud-drift"
            style={{ top: '45%', left: '0%', animationDelay: '-22s' }}
          />

          {/* Cloud 1 duplicate - far right, staggered */}
          <img
            src="/images/cloud1.png"
            alt=""
            className="absolute w-[380px] md:w-[520px] opacity-50 animate-cloud-drift"
            style={{ top: '30%', right: '-20%', animationDelay: '-30s' }}
          />
        </div>

        {/* Signature with burst effect */}
        <div
          ref={signatureRef}
          className="relative w-full max-w-3xl px-6 z-10"
          onMouseMove={handleSignatureMouseMove}
        >
          {/* Burst particles */}
          <AnimatePresence>
            {particles.map(particle => {
              const endX = Math.cos(particle.direction) * particle.distance
              const endY = Math.sin(particle.direction) * particle.distance

              return (
                <motion.img
                  key={particle.id}
                  src={particle.icon}
                  alt=""
                  className="absolute w-3 h-3 md:w-4 md:h-4 pointer-events-none z-20"
                  style={{
                    left: particle.x,
                    top: particle.y,
                    filter: 'invert(75%) sepia(60%) saturate(600%) hue-rotate(5deg) brightness(105%)',
                  }}
                  initial={{ opacity: 1, scale: 1, x: -6, y: -6 }}
                  animate={{
                    opacity: 0,
                    scale: 0.5,
                    x: endX - 6,
                    y: endY - 6,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: particle.duration, ease: 'easeOut' }}
                  onAnimationComplete={() => removeParticle(particle.id)}
                />
              )
            })}
          </AnimatePresence>

          {/* Signature image */}
          <img
            src="/images/black_signature.gif"
            alt="Sarah Graves"
            className="w-full dark:invert transition-[filter] duration-200"
          />
        </div>

        {/* Welcome text */}
        <div className="mt-6 max-w-3xl mx-auto text-center z-10 px-6">
          <p
            className="font-serif text-2xl md:text-3xl font-medium leading-relaxed"
            style={{ color: 'var(--text-primary)' }}
          >
            Welcome to my corner of the internet! This is my personal brand — please explore.
          </p>
          <p
            className="font-serif text-2xl md:text-3xl font-medium leading-relaxed mt-2"
            style={{ color: 'var(--text-primary)' }}
          >
            <Link
              href="mailto:sarahkgraves2@gmail.com"
              className="underline decoration-2 underline-offset-4 transition-colors duration-200 hover:text-[var(--accent-gold)]"
            >
              Contact
            </Link>
            {' '}me with any offers or questions :)
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 flex flex-col items-center z-10">
          <span
            className="text-xs tracking-[0.3em] mb-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            SCROLL
          </span>
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: 'var(--text-secondary)' }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-6">
        {/* I am */}
        <section className="py-16">
          <p className="text-2xl md:text-3xl font-serif">
            <span style={{ color: 'var(--text-secondary)' }} className="mr-2">I am</span>
            <HoverItem>Texas Women's Basketball</HoverItem>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverItem>BBA Finance, McCombs '26</HoverItem>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverItem>Sports, media, and tech</HoverItem>
          </p>
        </section>

        {/* I work */}
        <section className="py-16">
          <p className="text-2xl md:text-3xl font-serif">
            <span style={{ color: 'var(--text-secondary)' }} className="mr-2">I work</span>
            <HoverItem>RedBird Capital</HoverItem>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverItem>BOSI Advisory Board</HoverItem>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverItem>Boardroom</HoverItem>
          </p>
        </section>

        {/* I build */}
        <section className="py-16">
          <p className="text-2xl md:text-3xl font-serif">
            <span style={{ color: 'var(--text-secondary)' }} className="mr-2">I build</span>
            <ProjectLink href="/projects#path">Path</ProjectLink>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <ProjectLink href="/projects#operators-lens">The Operator's Lens</ProjectLink>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <ProjectLink href="/projects#bosi">BOSI Initiatives</ProjectLink>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <ProjectLink href="/projects#noah">NOAH Analytics</ProjectLink>
          </p>
        </section>

        {/* I speak */}
        <section className="py-16">
          <p className="text-2xl md:text-3xl font-serif">
            <span style={{ color: 'var(--text-secondary)' }} className="mr-2">I speak</span>
            <HoverItem>NIL Economics</HoverItem>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverItem>Athlete to Operator</HoverItem>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverItem>Sports Business & Media</HoverItem>
          </p>
        </section>

        {/* Contact */}
        <section className="py-16">
          <p className="text-2xl md:text-3xl font-serif">
            <span style={{ color: 'var(--text-secondary)' }} className="mr-2">Contact</span>
            <HoverLink href="mailto:sarahkgraves2@gmail.com">Email</HoverLink>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverLink href="https://linkedin.com/in/sarahkgraves" external>LinkedIn</HoverLink>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverLink href="https://instagram.com/sarahkgraves" external>Instagram</HoverLink>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverLink href="https://x.com/sarahkgraves" external>X</HoverLink>
          </p>
        </section>

        {/* Featured Section */}
        <section className="py-16">
          <h2
            className="uppercase tracking-widest text-xs mb-6"
            style={{ color: 'var(--text-secondary)' }}
          >
            FEATURED
          </h2>

          <Link href="/projects#operators-lens">
            <motion.div
              className="rounded-2xl p-8 border-2 border-transparent cursor-pointer"
              style={{ background: 'var(--text-primary)' }}
              whileHover={{
                scale: 1.02,
                borderColor: 'var(--accent-gold)',
              }}
              transition={{ duration: 0.3 }}
            >
              <p
                className="text-sm mb-3 opacity-70"
                style={{ color: 'var(--bg-primary)' }}
              >
                Jan 2026 · Basketball, Content
              </p>
              <h3
                className="font-serif text-3xl font-bold mb-2"
                style={{ color: 'var(--bg-primary)' }}
              >
                The Operator's Lens: Follow the Money
              </h3>
              <p
                className="text-lg opacity-80"
                style={{ color: 'var(--bg-primary)' }}
              >
                Breaking down sports business through market analysis
              </p>
            </motion.div>
          </Link>
        </section>
      </div>

      <Footer />
    </main>
  )
}
