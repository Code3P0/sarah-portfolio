'use client'

import { useRef, useState } from 'react'
import ImageFrame from '@/components/ImageFrame'
import { projectsFilm } from '@/data/film'

/**
 * Thin cinematic banner under the Projects header: ~21:9, capped height,
 * ImageFrame grade. With a videoUrl it plays inline (muted start) behind a
 * minimal play affordance; with a youtubeUrl it links out; with neither it is
 * a designed poster strip with its caption and no controls at all.
 */
export default function FilmBanner() {
  const { videoUrl, youtubeUrl, poster, posterPosition, posterAlt, caption } = projectsFilm
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const hasAction = Boolean(videoUrl || youtubeUrl)

  const start = () => {
    if (videoUrl) {
      setPlaying(true)
      requestAnimationFrame(() => {
        const v = videoRef.current
        if (v) {
          v.muted = true
          v.play().catch(() => {})
        }
      })
    } else if (youtubeUrl) {
      window.open(youtubeUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="relative max-h-[160px] w-full overflow-hidden rounded-[24px] md:max-h-[280px]" style={{ aspectRatio: '21 / 9' }}>
      {playing && videoUrl ? (
        <video ref={videoRef} src={videoUrl} className="absolute inset-0 h-full w-full object-cover" controls playsInline loop />
      ) : (
        <>
          <ImageFrame
            src={poster}
            alt={posterAlt}
            className="absolute inset-0 h-full w-full"
            objectPosition={posterPosition}
            sizes="(max-width: 768px) 92vw, 1120px"
          />
          {/* floor scrim for the caption */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-16"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)' }}
          />
          <span className="type-caption absolute bottom-4 left-5 z-[3]" style={{ color: 'rgba(255,255,255,0.9)' }}>
            {caption}
          </span>
          {hasAction && (
            <button
              type="button"
              onClick={start}
              aria-label={videoUrl ? 'Play film' : 'Watch on YouTube, opens in a new tab'}
              className="absolute inset-0 z-[4] flex items-center justify-center"
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full text-xl transition-transform duration-200 hover:scale-105"
                style={{ background: 'rgba(12,12,14,0.55)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', color: '#F5F5F3' }}
              >
                ▶
              </span>
            </button>
          )}
        </>
      )}
    </div>
  )
}
