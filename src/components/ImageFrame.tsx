'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface ImageFrameProps {
  src: string
  alt: string
  className?: string
  /** Fill the parent frame (parent must set size/aspect + radius). Default true. */
  fill?: boolean
  /** Intrinsic size when not using fill (e.g. inline glyphs). */
  width?: number
  height?: number
  /** Responsive sizes hint for next/Image. */
  sizes?: string
  /** object-fit when filling. */
  objectClassName?: string
}

/**
 * Single grade wrapper for all site photography. Applies the grain + slight
 * desaturation at rest, and (on hover OR while centered in the viewport, via
 * IntersectionObserver so touch devices feel alive) fades the grain and brings
 * the image to full saturation with a 1.03 scale contained by overflow-hidden.
 * Uses next/Image (lazy by default). See `.img-frame` in globals.css.
 */
export default function ImageFrame({
  src,
  alt,
  className = '',
  fill = true,
  width,
  height,
  sizes,
  objectClassName = 'object-cover',
}: ImageFrameProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Only drives the "alive" state on touch/no-hover; harmless on desktop.
    const obs = new IntersectionObserver(
      ([e]) => setActive(e.isIntersecting && e.intersectionRatio > 0.6),
      { threshold: [0, 0.6, 1] }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <span ref={ref} className={`img-frame ${active ? 'is-active' : ''} ${className}`}>
      {fill ? (
        <Image src={src} alt={alt} fill sizes={sizes ?? '(max-width: 768px) 90vw, 33vw'} className={objectClassName} />
      ) : (
        <Image src={src} alt={alt} width={width ?? 64} height={height ?? 40} className={objectClassName} />
      )}
    </span>
  )
}
