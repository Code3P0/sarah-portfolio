'use client'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useState, useCallback } from 'react'
import type { ReactNode } from 'react'

const icons = ['/images/icon1.png', '/images/icon2.png', '/images/icon4.png']

interface Particle {
  id: string
  x: number
  y: number
  icon: string
  dir: number
  dist: number
  dur: number
}

/**
 * The site's single signature moment. Wraps ONE area (the Projects grid) with
 * a gold cursor-following aura and sparkle-particle bursts. Deliberately not
 * used anywhere else — concentrating the delight keeps the rest Samara-calm.
 * Ambient animation is disabled under prefers-reduced-motion (handled globally).
 */
export default function SignatureField({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 120, damping: 25 })
  const sy = useSpring(my, { stiffness: 120, damping: 25 })
  const [particles, setParticles] = useState<Particle[]>([])
  const [active, setActive] = useState(false)
  const last = useRef({ x: 0, y: 0 })
  const traveled = useRef(0)

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      mx.set(x)
      my.set(y)

      traveled.current += Math.hypot(x - last.current.x, y - last.current.y)
      last.current = { x, y }

      if (traveled.current >= 90 + Math.random() * 40) {
        traveled.current = 0
        const count = Math.random() > 0.6 ? 2 : 1
        const next: Particle[] = []
        for (let i = 0; i < count; i++) {
          next.push({
            id: `${Date.now()}-${i}-${Math.random()}`,
            x,
            y,
            icon: icons[Math.floor(Math.random() * icons.length)],
            dir: Math.random() * Math.PI * 2,
            dist: 30 + Math.random() * 40,
            dur: 0.8 + Math.random() * 0.5,
          })
        }
        setParticles((p) => [...p, ...next])
      }
    },
    [mx, my]
  )

  const remove = useCallback((id: string) => {
    setParticles((p) => p.filter((x) => x.id !== id))
  }, [])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {/* Gold cursor aura (desktop only) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-0 hidden md:block"
        style={{
          x: sx,
          y: sy,
          width: 340,
          height: 340,
          marginLeft: -170,
          marginTop: -170,
          borderRadius: '50%',
          filter: 'blur(45px)',
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--accent) 24%, transparent) 0%, transparent 70%)',
        }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Sparkle bursts trailing the cursor */}
      <AnimatePresence>
        {particles.map((p) => {
          const ex = Math.cos(p.dir) * p.dist
          const ey = Math.sin(p.dir) * p.dist
          return (
            <motion.img
              key={p.id}
              src={p.icon}
              alt=""
              className="pointer-events-none absolute z-20 h-3 w-3 md:h-4 md:w-4"
              style={{
                left: p.x,
                top: p.y,
                filter: 'invert(75%) sepia(60%) saturate(600%) hue-rotate(5deg) brightness(105%)',
              }}
              initial={{ opacity: 1, scale: 1, x: -6, y: -6 }}
              animate={{ opacity: 0, scale: 0.5, x: ex - 6, y: ey - 6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: p.dur, ease: 'easeOut' }}
              onAnimationComplete={() => remove(p.id)}
            />
          )
        })}
      </AnimatePresence>

      <div className="relative z-10">{children}</div>
    </div>
  )
}
