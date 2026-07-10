import Link from 'next/link'
import ImageFrame from '@/components/ImageFrame'

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/sarahkgraves' },
  { label: 'Instagram', href: 'https://instagram.com/sarahkgraves' },
  { label: 'X', href: 'https://x.com/sarahkgraves' },
]

/**
 * Rounded contact band. Aligns to the page container (no full-bleed),
 * 24px radius, hairline border, raised tone. The portrait hangs off the
 * left of the centered text on wide screens as a circular adornment.
 */
export default function ContactBand() {
  return (
    <div
      id="contact"
      className="w-full rounded-[24px] border px-6 py-16 text-center md:px-16"
      style={{ background: 'var(--canvas-raised)', borderColor: 'var(--line)' }}
    >
      <div className="relative inline-block">
        <ImageFrame
          src="/images/sarah-headshot.jpg"
          alt="Sarah Graves, Texas Women's Basketball guard, headshot"
          sizes="144px"
          className="mx-auto mb-8 block h-32 w-32 rounded-full sm:h-36 sm:w-36 lg:absolute lg:right-full lg:top-1/2 lg:mb-0 lg:mr-10 lg:h-36 lg:w-36 lg:-translate-y-1/2"
        />
        <div>
          <h2 className="type-h2">Get in Touch</h2>
          <Link href="mailto:sarahkgraves2@gmail.com" className="link-accent type-body mt-6 inline-block">
            sarahkgraves2@gmail.com
          </Link>
          <div className="mt-4 flex justify-center gap-8">
            {socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-accent type-body"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
