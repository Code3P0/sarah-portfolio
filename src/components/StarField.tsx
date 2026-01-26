'use client'

import { useMemo, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface SignatureBounds {
  x: number
  y: number
  width: number
  height: number
}

interface StarFieldProps {
  starCount?: number
  icons: string[]
  className?: string
  signatureBounds?: SignatureBounds
}

interface Star {
  id: number
  x: number
  y: number
  size: number
  baseOpacity: number
  delay: number
  duration: number
  icon: string
  parallaxFactor: number // Based on size - larger stars move more
}

export function StarField({
  starCount = 20,
  icons,
  className = '',
  signatureBounds
}: StarFieldProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null)
  const [isMouseInBounds, setIsMouseInBounds] = useState(false)

  // Smooth parallax values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  // Generate stars with random properties
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: starCount }, (_, i) => {
      const size = Math.random() * 20 + 12 // 12-32px
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        baseOpacity: Math.random() * 0.3 + 0.2, // 0.2-0.5
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3, // 2-5s twinkle
        icon: icons[Math.floor(Math.random() * icons.length)],
        parallaxFactor: (size - 12) / 20, // 0-1 based on size (larger = more movement)
      }
    })
  }, [starCount, icons])

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRect) return

      const x = e.clientX - containerRect.left
      const y = e.clientY - containerRect.top

      // Normalize to -1 to 1 range from center
      const normalizedX = (x / containerRect.width - 0.5) * 2
      const normalizedY = (y / containerRect.height - 0.5) * 2

      mouseX.set(normalizedX)
      mouseY.set(normalizedY)
      setMousePos({ x, y })

      // Check if mouse is within signature bounds
      if (signatureBounds) {
        const inBounds =
          x >= signatureBounds.x &&
          x <= signatureBounds.x + signatureBounds.width &&
          y >= signatureBounds.y &&
          y <= signatureBounds.y + signatureBounds.height
        setIsMouseInBounds(inBounds)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [containerRect, signatureBounds, mouseX, mouseY])

  // Get container rect on mount
  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setContainerRect(node.getBoundingClientRect())
    }
  }, [])

  // Calculate distance from mouse to star
  const getDistanceFromMouse = (starX: number, starY: number) => {
    if (!containerRect) return Infinity
    const starPxX = (starX / 100) * containerRect.width
    const starPxY = (starY / 100) * containerRect.height
    const dx = mousePos.x - starPxX
    const dy = mousePos.y - starPxY
    return Math.sqrt(dx * dx + dy * dy)
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {stars.map((star) => {
        const distance = getDistanceFromMouse(star.x, star.y)
        const isNearCursor = isMouseInBounds && distance < 150
        const proximityFactor = isNearCursor ? Math.max(0, 1 - distance / 150) : 0

        // Parallax offset (2-8px based on size)
        const maxOffset = 2 + star.parallaxFactor * 6

        return (
          <motion.img
            key={star.id}
            src={star.icon}
            alt=""
            className="absolute will-change-transform"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              x: smoothX.get() * -maxOffset,
              y: smoothY.get() * -maxOffset,
            }}
            animate={{
              width: star.size * (1 + proximityFactor * 0.5),
              height: star.size * (1 + proximityFactor * 0.5),
              opacity: [
                star.baseOpacity + proximityFactor * 0.2,
                star.baseOpacity * 0.4 + proximityFactor * 0.1,
                star.baseOpacity + proximityFactor * 0.2,
              ],
              scale: isNearCursor ? [1, 1.1, 1] : 1,
            }}
            transition={{
              opacity: {
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
                ease: 'easeInOut',
              },
              scale: {
                duration: 0.8,
                repeat: isNearCursor ? Infinity : 0,
                ease: 'easeInOut',
              },
              width: { duration: 0.3 },
              height: { duration: 0.3 },
            }}
          />
        )
      })}
    </div>
  )
}

export default StarField
