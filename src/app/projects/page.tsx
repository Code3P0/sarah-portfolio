'use client'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState, useMemo } from 'react'
import Footer from '@/components/Footer'

const projects = [
  {
    id: 'path',
    title: 'Path',
    description: 'Swipe-based career discovery app for students interested in sports industry careers',
  },
  {
    id: 'operators-lens',
    title: "The Operator's Lens",
    description: 'Content framework exploring sports business through market analysis',
  },
  {
    id: 'bosi',
    title: 'BOSI Initiatives',
    description: 'Building systematic internship access for student-athletes',
  },
  {
    id: 'noah',
    title: 'NOAH Analytics',
    description: 'Shooting analytics and data visualization projects',
  },
]

// Icon paths for particles
const icons = ['/images/icon1.png', '/images/icon2.png', '/images/icon3.png', '/images/icon4.png']

// Generate particles with random properties
function generateParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100, // percentage across card width
    y: 20 + Math.random() * 60, // percentage from top (20-80%)
    size: 32 + Math.random() * 24, // 32-56px (bigger)
    delay: Math.random() * 0.3,
    duration: 1.2 + Math.random() * 0.6,
    opacity: 0.5 + Math.random() * 0.4, // 0.5-0.9
    rotation: Math.random() * 360,
    icon: icons[Math.floor(Math.random() * icons.length)],
  }))
}

// Particle Field Component
function ParticleField({ isHovered }: { isHovered: boolean }) {
  const particles = useMemo(() => generateParticles(12), [])

  return (
    <AnimatePresence>
      {isHovered && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
          {particles.map((particle) => (
            <motion.img
              key={particle.id}
              src={particle.icon}
              alt=""
              className="absolute pointer-events-none"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
                filter: 'invert(75%) sepia(60%) saturate(600%) hue-rotate(5deg) brightness(105%)',
              }}
              initial={{ opacity: 0, y: 0, scale: 0, rotate: 0 }}
              animate={{
                opacity: [0, particle.opacity, 0],
                y: -100,
                scale: [0, 1, 0.5],
                rotate: particle.rotation,
                x: (Math.random() - 0.5) * 40,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [cardRefs, setCardRefs] = useState<(HTMLDivElement | null)[]>([])
  const [illumination, setIllumination] = useState<number[]>([0, 0, 0, 0])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Raw mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring-based following
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      mouseX.set(x)
      mouseY.set(y)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [mouseX, mouseY])

  // Calculate illumination based on distance from each card title
  useEffect(() => {
    const unsubscribeX = smoothX.on('change', () => updateIllumination())
    const unsubscribeY = smoothY.on('change', () => updateIllumination())

    function updateIllumination() {
      if (!containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const x = smoothX.get()
      const y = smoothY.get()

      const newIllumination = cardRefs.map((cardRef) => {
        if (!cardRef) return 0

        const cardRect = cardRef.getBoundingClientRect()
        // Calculate center of the card title area (top portion of card)
        const cardCenterX = cardRect.left - containerRect.left + cardRect.width / 2
        const cardCenterY = cardRect.top - containerRect.top + 40 // Title is near the top

        const distance = Math.sqrt(
          Math.pow(x - cardCenterX, 2) + Math.pow(y - cardCenterY, 2)
        )

        // Illuminate within 150px radius, smooth falloff
        const maxDistance = 150
        if (distance > maxDistance) return 0
        return 1 - distance / maxDistance
      })

      setIllumination(newIllumination)
    }

    return () => {
      unsubscribeX()
      unsubscribeY()
    }
  }, [smoothX, smoothY, cardRefs])

  // Initialize card refs array
  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    setCardRefs((prev) => {
      const newRefs = [...prev]
      newRefs[index] = el
      return newRefs
    })
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <header className="pt-32 pb-16 text-center">
        <h1
          className="font-serif text-5xl md:text-6xl font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          Projects
        </h1>
      </header>

      {/* Project Grid with Flashlight Effect */}
      <div
        ref={containerRef}
        className="relative max-w-5xl mx-auto px-6 pb-24"
      >
        {/* Flashlight glow that follows cursor */}
        <motion.div
          className="pointer-events-none absolute z-10"
          style={{
            x: smoothX,
            y: smoothY,
            width: 350,
            height: 350,
            marginLeft: -175,
            marginTop: -175,
            background: `radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 40%, transparent 70%)`,
            filter: 'blur(20px)',
          }}
        />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const isHovered = hoveredIndex === index

            return (
              <motion.div
                key={project.id}
                id={project.id}
                ref={setCardRef(index)}
                className="relative p-8 rounded-xl border cursor-pointer overflow-hidden"
                style={{
                  background: 'var(--bg-secondary)',
                  borderColor: isHovered
                    ? 'var(--accent-gold)'
                    : 'rgba(var(--text-secondary), 0.1)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: isHovered ? 1.02 : 1,
                  boxShadow: isHovered
                    ? '0 0 40px rgba(212, 175, 55, 0.2), 0 0 80px rgba(212, 175, 55, 0.1)'
                    : '0 0 0px rgba(212, 175, 55, 0)',
                }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  scale: { type: 'spring', stiffness: 400, damping: 25 },
                  boxShadow: { duration: 0.3 },
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Particle Effect */}
                <ParticleField isHovered={isHovered} />

                {/* Title with illumination effect */}
                <h2
                  className="font-serif text-2xl font-bold mb-3 transition-all duration-150 relative z-10"
                  style={{
                    color: isHovered
                      ? 'var(--accent-gold)'
                      : `color-mix(in srgb, var(--text-primary) ${30 + illumination[index] * 70}%, var(--text-secondary) ${70 - illumination[index] * 70}%)`,
                    textShadow: isHovered
                      ? '0 0 20px rgba(212, 175, 55, 0.5)'
                      : illumination[index] > 0.3
                        ? `0 0 ${illumination[index] * 30}px rgba(212, 175, 55, ${illumination[index] * 0.5})`
                        : 'none',
                  }}
                >
                  {project.title}
                </h2>

                {/* Description */}
                <p
                  className="font-sans text-base relative z-10"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {project.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile fallback note - titles are always visible on touch */}
        <style jsx global>{`
          @media (hover: none) {
            .font-serif.text-2xl {
              color: var(--text-primary) !important;
              opacity: 1 !important;
            }
          }
        `}</style>
      </div>

      <Footer />
    </main>
  )
}
