// "I like to [verb]." — configuration for the VerbIntro section.
// Edit verbs, media, alt text, cropping, and links here; the animation
// component reads this array and needs no changes.

export interface VerbItem {
  verb: string
  /** Omit to render the design-system placeholder (clearly labelled, no fake asset). */
  mediaSrc?: string
  mediaAlt?: string
  /** CSS object-position so the subject stays composed in the 4:3 crop. */
  objectPosition?: string
  /** Optional verified destination. Omit until a real one exists. */
  href?: string
  /** Caption for the placeholder treatment when mediaSrc is absent. */
  placeholderCaption?: string
}

export const verbItems: VerbItem[] = [
  {
    verb: 'make',
    mediaSrc: '/images/sarah-graves-painting.jpg',
    mediaAlt: 'Sarah Graves presenting her College GameDay painting courtside',
    objectPosition: '50% 35%',
  },
  {
    verb: 'build',
    // TODO(sarah): no product/prototype asset in the repo yet.
    placeholderCaption: 'BUILD · ASSET TBD',
  },
  {
    verb: 'study',
    // TODO(sarah): no suitable research/notebook asset in the repo yet.
    placeholderCaption: 'STUDY · ASSET TBD',
  },
  {
    verb: 'connect',
    mediaSrc: '/images/sarah-graves-fans.jpg',
    mediaAlt: 'Sarah Graves greeting the Texas fan section',
    objectPosition: '50% 30%',
  },
  {
    verb: 'write',
    // TODO(sarah): no writing/essay asset in the repo yet.
    placeholderCaption: 'WRITE · ASSET TBD',
  },
]
