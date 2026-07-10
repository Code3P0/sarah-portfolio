'use client'

import { useEffect, useRef, useState } from 'react'
import Placeholder from '@/components/Placeholder'

interface VideoSlotProps {
  ratio?: '4:3' | '16:9' | '4:5' | string
  caption?: string
  alt: string
  className?: string
  /** Self-hosted/embedded source. When absent a placeholder is rendered. */
  src?: string
  poster?: string
}

/**
 * Media slot built for a video to drop in later. With no `src` it shows the
 * standard placeholder. With a `src` it renders a muted, inline video that
 * autoplays only while in the viewport, pauses offscreen, exposes a visible
 * pause/play control, and supports a poster. Respects reduced-motion (no
 * autoplay).
 */
export default function VideoSlot({ ratio = '4:5', caption, alt, className = '', src, poster }: VideoSlotProps) {
  const ref = useRef<HTMLVideoElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v || !src) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const obs = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting)
        if (e.isIntersecting && !reduce) {
          v.play().then(() => setPlaying(true)).catch(() => {})
        } else {
          v.pause()
          setPlaying(false)
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(v)
    return () => obs.disconnect()
  }, [src])

  if (!src) {
    return <Placeholder ratio={ratio} caption={caption} alt={alt} className={className} />
  }

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {})
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  const preset = ratio === '4:3' ? 'aspect-[4/3]' : ratio === '16:9' ? 'aspect-video' : ratio === '4:5' ? 'aspect-[4/5]' : ''

  return (
    <div
      className={`relative overflow-hidden rounded-[24px] ${preset} ${className}`}
      style={{
        background: 'var(--canvas-raised)',
        border: '1px solid var(--line)',
        ...(preset ? null : { aspectRatio: ratio.replace(':', '/') }),
      }}
    >
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        poster={poster}
        aria-label={alt}
        preload="metadata"
      >
        <source src={src} />
      </video>

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause video' : 'Play video'}
        aria-pressed={playing}
        className="absolute bottom-3 right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full text-sm"
        style={{ background: 'rgba(12,12,14,0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.18)', color: '#F5F5F3' }}
      >
        {playing && inView ? '❚❚' : '▶'}
      </button>

      {caption && (
        <span className="absolute bottom-3 left-4 z-10 font-sans text-xs uppercase tracking-widest" style={{ color: '#F5F5F3' }}>
          {caption}
        </span>
      )}
    </div>
  )
}
