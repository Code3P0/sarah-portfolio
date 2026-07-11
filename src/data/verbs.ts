// "I like to [word]." — content for the interactive word switcher.
// Edit words, images, alt text, and cropping here; the component reads this
// array and needs no changes. Images should read in a WIDE (~21:9) crop.

export interface VerbItem {
  verb: string
  image: string
  /** CSS object-position so the subject stays composed in the wide crop. */
  objectPosition?: string
  alt: string
}

export const verbItems: VerbItem[] = [
  {
    verb: 'make',
    image: '/images/sarah-graves-painting.jpg',
    objectPosition: '50% 30%',
    alt: 'Sarah Graves presenting her College GameDay painting courtside',
  },
  {
    verb: 'build',
    // Stand-in wide frame until a product/prototype photo exists (noted in CHANGES.md)
    image: '/images/sarah-graves-hero.jpg',
    objectPosition: '74% 30%',
    alt: 'Sarah Graves courtside at the Moody Center',
  },
  {
    verb: 'study',
    // Team training frame; closest existing image to practice/study (noted)
    image: '/images/sarah-graves-track.jpg',
    objectPosition: '50% 40%',
    alt: 'Sarah Graves in resistance-band drills with the team at the track',
  },
  {
    verb: 'connect',
    image: '/images/sarah-graves-fans.jpg',
    objectPosition: '50% 32%',
    alt: 'Sarah Graves greeting the Texas fan section',
  },
  {
    verb: 'write',
    // Stand-in interview frame until a writing photo exists (noted in CHANGES.md)
    image: '/images/sarah-graves-media-microphone-march-madness.jpg',
    objectPosition: '50% 38%',
    alt: 'Sarah Graves speaking into a microphone at March Madness',
  },
]
