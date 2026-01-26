'use client'

import { motion } from 'framer-motion'

// Cloud configuration
const clouds = [
  {
    id: 1,
    width: 384, // w-96
    height: 192, // h-48
    top: '5%',
    right: '-5%',
    opacity: 0.4,
    blur: 50,
    drift: 40,
    duration: 45,
  },
  {
    id: 2,
    width: 256, // w-64
    height: 128, // h-32
    top: '15%',
    left: '-8%',
    opacity: 0.35,
    blur: 40,
    drift: 30,
    duration: 55,
  },
  {
    id: 3,
    width: 192, // w-48
    height: 96, // h-24
    bottom: '25%',
    right: '15%',
    opacity: 0.3,
    blur: 35,
    drift: 25,
    duration: 50,
  },
  {
    id: 4,
    width: 320,
    height: 160,
    top: '30%',
    left: '20%',
    opacity: 0.25,
    blur: 45,
    drift: 35,
    duration: 60,
  },
  {
    id: 5,
    width: 224,
    height: 112,
    top: '8%',
    left: '40%',
    opacity: 0.3,
    blur: 38,
    drift: 20,
    duration: 40,
  },
]

export function CloudField() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden block dark:hidden">
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute"
          style={{
            width: cloud.width,
            height: cloud.height,
            top: cloud.top,
            bottom: cloud.bottom,
            left: cloud.left,
            right: cloud.right,
            background: 'white',
            borderRadius: '50%',
            filter: `blur(${cloud.blur}px)`,
            opacity: cloud.opacity,
          }}
          animate={{
            x: [-cloud.drift / 2, cloud.drift / 2, -cloud.drift / 2],
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default CloudField
