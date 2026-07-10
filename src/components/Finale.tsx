/**
 * Full-bleed finale — a clean typographic close, not a media box. Sits on a
 * distinct dark surface (clearly lifted above the dark canvas), inset by the
 * page margin with a 24px radius so it never touches the browser edge. Carries
 * data-nav-dark so the nav switches to its dark-glass state here.
 */
export default function Finale() {
  return (
    <section className="p-4 md:p-6">
      <div
        data-nav-dark
        className="relative flex min-h-[58vh] items-end overflow-hidden rounded-[24px] p-8 sm:p-14"
        style={{
          background: 'linear-gradient(155deg, #26262E 0%, #1B1B21 55%, #141419 100%)',
          border: '1px solid rgba(255,255,255,0.10)',
        }}
      >
        <h2 className="font-serif text-5xl font-normal leading-tight sm:text-7xl" style={{ color: '#F5F5F3' }}>
          See what I&apos;m building.
        </h2>
      </div>
    </section>
  )
}
