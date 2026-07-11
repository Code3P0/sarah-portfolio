'use client'

import { MotionConfig, motion, useAnimationControls } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import type { ReactNode } from 'react'

// Fixed nav order so we can infer forward/back direction on this small site.
const order = ['/', '/projects', '/about']
let lastPath: string | null = null

/**
 * Restrained directional page transition. The nav lives in the persistent
 * layout (outside this template) so it never moves; only the page content
 * animates — incoming content translateX 48→0 + fade in (reversed on back /
 * ancestor navigation). First load just fades.
 *
 * The x-offset is applied entirely on the client via animation controls (never
 * in the SSR `initial`) so the server-rendered markup is always x:0 — this
 * avoids a hydration mismatch, and MotionConfig reducedMotion="user" turns the
 * slide into an opacity-only crossfade for reduced-motion users.
 */
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const controls = useAnimationControls()

  useEffect(() => {
    const isFirst = lastPath === null
    const prevIdx = lastPath ? order.indexOf(lastPath) : -1
    const curIdx = order.indexOf(pathname)
    const isAncestor = lastPath !== null && pathname !== lastPath && lastPath.startsWith(pathname + '/')
    const back = isAncestor || (prevIdx > -1 && curIdx > -1 && curIdx < prevIdx)
    const x = isFirst ? 0 : back ? -48 : 48
    lastPath = pathname

    window.scrollTo(0, 0)
    controls.set({ opacity: 0, x })
    controls.start({ opacity: 1, x: 0, transition: { duration: 0.46, ease: [0.22, 1, 0.36, 1] } })
  }, [pathname, controls])

  return (
    <MotionConfig reducedMotion="user">
      <motion.div id="main-content" className="page-anim" style={{ overflowX: 'clip' }} initial={{ opacity: 0 }} animate={controls}>
        {children}
      </motion.div>
    </MotionConfig>
  )
}
