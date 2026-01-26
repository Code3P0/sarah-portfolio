'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Footer from '@/components/Footer'

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

const springTransition = { type: "spring", stiffness: 400, damping: 25 }

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

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center relative">
        {/* Single image, inverted in dark mode */}
        <img
          src="/images/black_signature.gif"
          alt="Sarah Graves"
          className="w-full max-w-3xl px-6 dark:invert transition-[filter] duration-200"
        />

        {/* Scroll indicator */}
        <div className="absolute bottom-12 flex flex-col items-center">
          <span
            className="text-xs tracking-[0.3em] mb-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            SCROLL
          </span>
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: 'var(--text-secondary)' }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-6">
        {/* I am */}
        <section className="py-16">
          <p className="text-2xl md:text-3xl font-serif">
            <span style={{ color: 'var(--text-secondary)' }} className="mr-2">I am</span>
            <HoverItem>Texas Women's Basketball</HoverItem>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverItem>BBA Finance, McCombs '26</HoverItem>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverItem>Sports, media, and tech</HoverItem>
          </p>
        </section>

        {/* I work */}
        <section className="py-16">
          <p className="text-2xl md:text-3xl font-serif">
            <span style={{ color: 'var(--text-secondary)' }} className="mr-2">I work</span>
            <HoverItem>RedBird Capital</HoverItem>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverItem>BOSI Advisory Board</HoverItem>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverItem>Boardroom</HoverItem>
          </p>
        </section>

        {/* I build */}
        <section className="py-16">
          <p className="text-2xl md:text-3xl font-serif">
            <span style={{ color: 'var(--text-secondary)' }} className="mr-2">I build</span>
            <HoverLink href="/projects#path">Path</HoverLink>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverLink href="/projects#operators-lens">The Operator's Lens</HoverLink>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverLink href="/projects#bosi">BOSI Initiatives</HoverLink>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverLink href="/projects#noah">NOAH Analytics</HoverLink>
          </p>
        </section>

        {/* I speak */}
        <section className="py-16">
          <p className="text-2xl md:text-3xl font-serif">
            <span style={{ color: 'var(--text-secondary)' }} className="mr-2">I speak</span>
            <HoverItem>NIL Economics</HoverItem>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverItem>Athlete to Operator</HoverItem>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <HoverItem>Sports Business & Media</HoverItem>
          </p>
        </section>

        {/* Contact */}
        <section className="py-16">
          <p className="text-2xl md:text-3xl font-serif">
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
      </div>

      <Footer />
    </main>
  )
}
