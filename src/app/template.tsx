'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import type { ReactNode } from 'react'

// Fixed nav order so we can infer forward/back direction on this small site.
const order = ['/', '/projects', '/about']
let lastPath: string | null = null

/**
 * Restrained directional page transition. The nav lives in the persistent
 * layout (outside this template) so it never moves; only the page content
 * animates — incoming content translateX 48→0 + fade in (reversed on back
 * navigation). First load just fades. Reduced motion → fast crossfade only.
 * Scroll resets to top on entry.
 *
 * Note: App Router unmounts the outgoing route before an exit animation can
 * play, so only the incoming half is animated (the enter covers the swap).
 */
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const isFirst = lastPath === null
  const prevIdx = lastPath ? order.indexOf(lastPath) : -1
  const curIdx = order.indexOf(pathname)
  const back = prevIdx > -1 && curIdx > -1 && curIdx < prevIdx
  lastPath = pathname

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const reduce =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const x = reduce || isFirst ? 0 : back ? -48 : 48

  return (
    <motion.div
      className="page-anim"
      style={{ overflowX: 'clip' }}
      initial={{ opacity: 0, x }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: reduce ? 0.2 : 0.46, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
