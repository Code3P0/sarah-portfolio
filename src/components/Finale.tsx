// Subtle film-grain for the dark slot
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fin-noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fin-noise)'/%3E%3C/svg%3E\")"

/**
 * Full-bleed finale. A near-viewport-height DARK media slot, inset by the page
 * margin with a 24px radius so it never touches the browser edge. This is the
 * section that flips the nav into its dark-glass state — hence data-nav-dark.
 */
export default function Finale() {
  return (
    <section className="p-4 md:p-6">
      <div
        data-nav-dark
        role="img"
        aria-label="Placeholder for a court or film still"
        className="relative flex min-h-[88vh] items-start overflow-hidden rounded-[24px]"
        style={{
          background: 'linear-gradient(160deg, #15151b 0%, #0c0c10 60%, #08080b 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: NOISE, opacity: 0.05 }} />

        <h2
          className="relative z-10 p-8 font-serif text-4xl font-normal sm:p-12 sm:text-6xl"
          style={{ color: '#F5F5F3' }}
        >
          Watch it get built.
        </h2>

        <span className="absolute bottom-4 left-6 z-10 font-sans text-xs uppercase tracking-widest" style={{ color: 'rgba(245,245,243,0.6)' }}>
          Finale 001
        </span>
      </div>
    </section>
  )
}
