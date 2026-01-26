'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative">
        <h1
          className="font-serif text-6xl md:text-8xl font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          SARAH GRAVES!
        </h1>

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
            <motion.span
              style={{ color: 'var(--text-primary)' }}
              whileHover={{ color: "#D4AF37", textShadow: "0 0 30px rgba(212,175,55,0.5)" }}
              transition={{ duration: 0 }}
              className="cursor-pointer font-bold"
            >
              Texas Women's Basketball
            </motion.span>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <motion.span
              style={{ color: 'var(--text-primary)' }}
              whileHover={{ color: "#D4AF37", textShadow: "0 0 30px rgba(212,175,55,0.5)" }}
              transition={{ duration: 0 }}
              className="cursor-pointer font-bold"
            >
              BBA Finance, McCombs '26
            </motion.span>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <motion.span
              style={{ color: 'var(--text-primary)' }}
              whileHover={{ color: "#D4AF37", textShadow: "0 0 30px rgba(212,175,55,0.5)" }}
              transition={{ duration: 0 }}
              className="cursor-pointer font-bold"
            >
              Sports, media, and tech
            </motion.span>
          </p>
        </section>

        {/* I work */}
        <section className="py-16">
          <p className="text-2xl md:text-3xl font-serif">
            <span style={{ color: 'var(--text-secondary)' }} className="mr-2">I work</span>
            <motion.span
              style={{ color: 'var(--text-primary)' }}
              whileHover={{ color: "#D4AF37", textShadow: "0 0 30px rgba(212,175,55,0.5)" }}
              transition={{ duration: 0 }}
              className="cursor-pointer font-bold"
            >
              RedBird Capital
            </motion.span>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <motion.span
              style={{ color: 'var(--text-primary)' }}
              whileHover={{ color: "#D4AF37", textShadow: "0 0 30px rgba(212,175,55,0.5)" }}
              transition={{ duration: 0 }}
              className="cursor-pointer font-bold"
            >
              BOSI Advisory Board
            </motion.span>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <motion.span
              style={{ color: 'var(--text-primary)' }}
              whileHover={{ color: "#D4AF37", textShadow: "0 0 30px rgba(212,175,55,0.5)" }}
              transition={{ duration: 0 }}
              className="cursor-pointer font-bold"
            >
              Boardroom
            </motion.span>
          </p>
        </section>

        {/* I build */}
        <section className="py-16">
          <p className="text-2xl md:text-3xl font-serif">
            <span style={{ color: 'var(--text-secondary)' }} className="mr-2">I build</span>
            <motion.span
              style={{ color: 'var(--text-primary)' }}
              whileHover={{ color: "#D4AF37", textShadow: "0 0 30px rgba(212,175,55,0.5)" }}
              transition={{ duration: 0 }}
              className="cursor-pointer font-bold"
            >
              Path
            </motion.span>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <motion.span
              style={{ color: 'var(--text-primary)' }}
              whileHover={{ color: "#D4AF37", textShadow: "0 0 30px rgba(212,175,55,0.5)" }}
              transition={{ duration: 0 }}
              className="cursor-pointer font-bold"
            >
              The Operator's Lens
            </motion.span>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <motion.span
              style={{ color: 'var(--text-primary)' }}
              whileHover={{ color: "#D4AF37", textShadow: "0 0 30px rgba(212,175,55,0.5)" }}
              transition={{ duration: 0 }}
              className="cursor-pointer font-bold"
            >
              BOSI Initiatives
            </motion.span>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <motion.span
              style={{ color: 'var(--text-primary)' }}
              whileHover={{ color: "#D4AF37", textShadow: "0 0 30px rgba(212,175,55,0.5)" }}
              transition={{ duration: 0 }}
              className="cursor-pointer font-bold"
            >
              NOAH Analytics
            </motion.span>
          </p>
        </section>

        {/* I speak */}
        <section className="py-16">
          <p className="text-2xl md:text-3xl font-serif">
            <span style={{ color: 'var(--text-secondary)' }} className="mr-2">I speak</span>
            <motion.span
              style={{ color: 'var(--text-primary)' }}
              whileHover={{ color: "#D4AF37", textShadow: "0 0 30px rgba(212,175,55,0.5)" }}
              transition={{ duration: 0 }}
              className="cursor-pointer font-bold"
            >
              NIL Economics
            </motion.span>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <motion.span
              style={{ color: 'var(--text-primary)' }}
              whileHover={{ color: "#D4AF37", textShadow: "0 0 30px rgba(212,175,55,0.5)" }}
              transition={{ duration: 0 }}
              className="cursor-pointer font-bold"
            >
              Athlete to Operator
            </motion.span>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <motion.span
              style={{ color: 'var(--text-primary)' }}
              whileHover={{ color: "#D4AF37", textShadow: "0 0 30px rgba(212,175,55,0.5)" }}
              transition={{ duration: 0 }}
              className="cursor-pointer font-bold"
            >
              Sports Business & Media
            </motion.span>
          </p>
        </section>

        {/* Contact */}
        <section className="py-16">
          <p className="text-2xl md:text-3xl font-serif">
            <span style={{ color: 'var(--text-secondary)' }} className="mr-2">Contact</span>
            <Link href="mailto:sarahkgraves2@gmail.com">
              <motion.span
                style={{ color: 'var(--text-primary)' }}
                whileHover={{ color: "#D4AF37", textShadow: "0 0 30px rgba(212,175,55,0.5)" }}
                transition={{ duration: 0 }}
                className="cursor-pointer font-bold"
              >
                Email
              </motion.span>
            </Link>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <Link href="https://linkedin.com/in/sarahkgraves" target="_blank" rel="noopener noreferrer">
              <motion.span
                style={{ color: 'var(--text-primary)' }}
                whileHover={{ color: "#D4AF37", textShadow: "0 0 30px rgba(212,175,55,0.5)" }}
                transition={{ duration: 0 }}
                className="cursor-pointer font-bold"
              >
                LinkedIn
              </motion.span>
            </Link>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <Link href="https://instagram.com/sarahkgraves" target="_blank" rel="noopener noreferrer">
              <motion.span
                style={{ color: 'var(--text-primary)' }}
                whileHover={{ color: "#D4AF37", textShadow: "0 0 30px rgba(212,175,55,0.5)" }}
                transition={{ duration: 0 }}
                className="cursor-pointer font-bold"
              >
                Instagram
              </motion.span>
            </Link>
            <span style={{ color: 'var(--text-secondary)' }} className="mx-2">·</span>
            <Link href="https://x.com/sarahkgraves" target="_blank" rel="noopener noreferrer">
              <motion.span
                style={{ color: 'var(--text-primary)' }}
                whileHover={{ color: "#D4AF37", textShadow: "0 0 30px rgba(212,175,55,0.5)" }}
                transition={{ duration: 0 }}
                className="cursor-pointer font-bold"
              >
                X
              </motion.span>
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}
