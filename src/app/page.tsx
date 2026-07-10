'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { AuroraEffect } from '@/components/AuroraEffect'
import { useState, useRef, useCallback, useMemo } from 'react'

// Star configuration for dark mode background
interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  duration: number
  delay: number
}

// Generate scattered stars
function useStars(count: number): Star[] {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 12 + Math.random() * 16, // 12-28px
      opacity: 0.15 + Math.random() * 0.25, // 0.15-0.4 (subtle)
      duration: 4 + Math.random() * 4, // 4-8s float cycle
      delay: Math.random() * 4, // 0-4s delay
    }))
  }, [count])
}

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

const springTransition = { type: "spring" as const, stiffness: 400, damping: 25 }

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

// Featured card particle type
interface FeaturedParticle {
  id: string
  x: number
  y: number
  icon: string
  direction: number
  distance: number
  duration: number
}

// Featured card with gold outline and particle effect
function FeaturedCard() {
  const [isHovered, setIsHovered] = useState(false)
  const [cardParticles, setCardParticles] = useState<FeaturedParticle[]>([])
  const cardRef = useRef<HTMLAnchorElement>(null)
  const lastCardPosRef = useRef({ x: 0, y: 0 })
  const cardDistanceRef = useRef(0)

  const featuredIcons = ['/images/icon1.png', '/images/icon2.png', '/images/icon3.png', '/images/icon4.png']

  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const dx = x - lastCardPosRef.current.x
    const dy = y - lastCardPosRef.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    cardDistanceRef.current += distance
    lastCardPosRef.current = { x, y }

    const spawnThreshold = 80 + Math.random() * 40
    if (cardDistanceRef.current >= spawnThreshold) {
      cardDistanceRef.current = 0

      const numParticles = Math.random() > 0.6 ? 2 : 1
      const newParticles: FeaturedParticle[] = []

      for (let i = 0; i < numParticles; i++) {
        newParticles.push({
          id: `card-${Date.now()}-${i}-${Math.random()}`,
          x,
          y,
          icon: featuredIcons[Math.floor(Math.random() * featuredIcons.length)],
          direction: Math.random() * Math.PI * 2,
          distance: 40 + Math.random() * 40,
          duration: 0.9 + Math.random() * 0.5,
        })
      }

      setCardParticles(prev => [...prev, ...newParticles])
    }
  }, [])

  const removeCardParticle = useCallback((id: string) => {
    setCardParticles(prev => prev.filter(p => p.id !== id))
  }, [])

  return (
    <motion.a
      ref={cardRef}
      href="https://www.instagram.com/reel/example/"
      target="_blank"
      rel="noopener noreferrer"
      className="block relative p-6 rounded-xl overflow-hidden transition-colors"
      style={{
        background: 'var(--bg-secondary)',
        border: '2px solid transparent',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleCardMouseMove}
      animate={{
        borderColor: isHovered ? 'var(--accent-gold)' : 'transparent',
        scale: isHovered ? 1.02 : 1,
        boxShadow: isHovered
          ? '0 0 30px rgba(212,175,55,0.4), 0 0 60px rgba(212,175,55,0.2)'
          : '0 0 0 rgba(212,175,55,0)',
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* Particle effects */}
      <AnimatePresence>
        {cardParticles.map(particle => {
          const endX = Math.cos(particle.direction) * particle.distance
          const endY = Math.sin(particle.direction) * particle.distance

          return (
            <motion.img
              key={particle.id}
              src={particle.icon}
              alt=""
              className="absolute w-4 h-4 md:w-5 md:h-5 pointer-events-none z-20 dark:invert"
              style={{
                left: particle.x,
                top: particle.y,
                filter: 'sepia(100%) saturate(300%) brightness(90%) hue-rotate(10deg)',
              }}
              initial={{ opacity: 1, scale: 1, x: -8, y: -8 }}
              animate={{
                opacity: 0,
                scale: 0.4,
                x: endX - 8,
                y: endY - 8,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: particle.duration, ease: 'easeOut' }}
              onAnimationComplete={() => removeCardParticle(particle.id)}
            />
          )
        })}
      </AnimatePresence>

      {/* Card content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span
            className="uppercase tracking-widest text-xs"
            style={{ color: 'var(--text-secondary)' }}
          >
            Instagram Reel
          </span>
          <motion.span
            className="text-xs"
            animate={{ color: isHovered ? 'var(--accent-gold)' : 'var(--text-secondary)' }}
          >
            ↗
          </motion.span>
        </div>
        <motion.h3
          className="font-serif text-xl md:text-2xl font-semibold"
          animate={{ color: isHovered ? 'var(--accent-gold)' : 'var(--text-primary)' }}
          transition={{ duration: 0.2 }}
        >
          My conversation with Kevin Durant about sports, business, and building
        </motion.h3>
        <p
          className="mt-2 text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          A candid talk about the intersection of athletics and entrepreneurship
        </p>
      </div>
    </motion.a>
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
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Glow orb behind text - brighter for light mode visibility */}
        <motion.span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[80px] pointer-events-none -z-10"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,215,0,0.7) 0%, rgba(212,175,55,0.5) 40%, transparent 70%)',
            filter: 'blur(25px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />

        {/* Text with glow - brighter gold for light mode */}
        <span
          className="relative z-10 transition-all duration-200"
          style={{
            color: isHovered ? '#B8860B' : 'var(--text-primary)',
            textShadow: isHovered ? '0 0 30px rgba(255,215,0,0.8), 0 0 60px rgba(212,175,55,0.6)' : 'none',
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
  // Generate scattered stars for dark mode
  const stars = useStars(18)

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
    <main className="relative">
      {/* Aurora lives here — outside overflow-hidden hero — so it bleeds past the section boundary */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none hidden dark:block" style={{ height: '120vh', zIndex: 0 }}>
        <AuroraEffect />
      </div>

      {/* Hero Section */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center relative overflow-hidden pb-8" style={{ zIndex: 1 }}>
        {/* Light mode sky gradient */}
        <div
          className="absolute inset-0 block dark:hidden"
          style={{
            background: 'linear-gradient(to bottom, #4A90D9 0%, #87CEEB 28%, #C8DCE8 52%, #DDE8EE 70%, #F5F5F3 90%)',
          }}
        />

        {/* Light mode bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none block dark:hidden"
          style={{
            height: '180px',
            background: 'linear-gradient(to bottom, transparent 0%, #F5F5F3 100%)',
          }}
        />

        {/* Aurora/Nebula effect - dark mode only */}
        {/* Scattered stars - dark mode only */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden dark:block z-[1]">
          {stars.map((star) => (
            <motion.img
              key={star.id}
              src="/images/icon4.png"
              alt=""
              className="absolute"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
                filter: 'invert(1) brightness(2) drop-shadow(0 0 6px rgba(255,255,255,0.4)) drop-shadow(0 0 12px rgba(200,180,255,0.3))',
                opacity: star.opacity * 0.6,
              }}
              animate={{
                y: [0, -8, 0, 6, 0],
                x: [0, 4, 0, -3, 0],
                opacity: [star.opacity * 0.5, star.opacity * 0.7, star.opacity * 0.5, star.opacity * 0.4, star.opacity * 0.5],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Real cloud images - light mode only */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden block dark:hidden">
          {/* Cloud 1 - large, top right - slow majestic drift */}
          <img
            src="/images/cloud1.png"
            alt=""
            className="absolute w-[600px] md:w-[850px] opacity-40 animate-cloud-drift"
            style={{ top: '0%', right: '-15%' }}
          />

          {/* Cloud 2 - large, left side - reverse direction drift */}
          <img
            src="/images/cloud2.png"
            alt=""
            className="absolute w-[550px] md:w-[750px] opacity-35 animate-cloud-drift-2"
            style={{ top: '15%', left: '-20%', animationDelay: '-12s' }}
          />

          {/* Cloud 3 - top center - gentle bobbing */}
          <img
            src="/images/cloud3.png"
            alt=""
            className="absolute w-[450px] md:w-[650px] opacity-35 animate-cloud-drift-3"
            style={{ top: '-5%', left: '20%', animationDelay: '-20s' }}
          />

          {/* Cloud 4 - lower area - slow background drift */}
          <img
            src="/images/cloud4.png"
            alt=""
            className="absolute w-[500px] md:w-[700px] opacity-30 animate-cloud-drift-4"
            style={{ top: '40%', left: '-10%', animationDelay: '-35s' }}
          />

          {/* Cloud 5 - far right background - very slow */}
          <img
            src="/images/cloud1.png"
            alt=""
            className="absolute w-[550px] md:w-[750px] opacity-25 animate-cloud-drift-4"
            style={{ top: '25%', right: '-25%', animationDelay: '-50s' }}
          />

          {/* Cloud 6 - additional depth layer */}
          <img
            src="/images/cloud2.png"
            alt=""
            className="absolute w-[400px] md:w-[550px] opacity-20 animate-cloud-drift-3"
            style={{ top: '50%', right: '10%', animationDelay: '-40s' }}
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
        <div className="mt-6 max-w-5xl mx-auto text-center z-10 px-6">
          <p
            className="font-serif text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed whitespace-nowrap"
            style={{ color: 'var(--text-primary)' }}
          >
            Welcome to my corner of the internet! This is my personal brand — please explore.
          </p>
          <p
            className="font-serif text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed mt-3"
            style={{ color: 'var(--text-primary)' }}
          >
            <Link
              href="/about#contact"
              className="underline decoration-2 underline-offset-4 transition-colors duration-200 hover:text-[var(--accent-gold)]"
            >
              Contact
            </Link>
            {' '}me with any offers or questions :)
          </p>
        </div>

        </section>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-6">
        {/* I am */}
        <section className="py-8">
          <p className="text-3xl md:text-4xl lg:text-5xl font-serif">
            <span style={{ color: 'var(--text-secondary)' }} className="mr-2">I am</span>
            <HoverItem>Texas Women's Basketball</HoverItem>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverItem>BBA Finance, McCombs '26</HoverItem>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverItem>Sports, media, and tech</HoverItem>
          </p>
        </section>

        {/* I work */}
        <section className="py-8">
          <p className="text-3xl md:text-4xl lg:text-5xl font-serif">
            <span style={{ color: 'var(--text-secondary)' }} className="mr-2">I work</span>
            <HoverItem>RedBird Capital</HoverItem>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverItem>BOSI Advisory Board</HoverItem>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverItem>Boardroom</HoverItem>
          </p>
        </section>

        {/* I build */}
        <section className="py-8">
          <p className="text-3xl md:text-4xl lg:text-5xl font-serif">
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
        <section className="py-8">
          <p className="text-3xl md:text-4xl lg:text-5xl font-serif">
            <span style={{ color: 'var(--text-secondary)' }} className="mr-2">I speak</span>
            <HoverItem>NIL Economics</HoverItem>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverItem>Athlete to Operator</HoverItem>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverItem>Sports Business & Media</HoverItem>
          </p>
        </section>

        {/* Contact */}
        <section className="py-8">
          <p className="text-3xl md:text-4xl lg:text-5xl font-serif">
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
        <section className="py-8">
          <h2
            className="uppercase tracking-widest text-xs mb-6"
            style={{ color: 'var(--text-secondary)' }}
          >
            FEATURED
          </h2>

          <FeaturedCard />
        </section>
      </div>

      <Footer />
    </main>
  )
}
