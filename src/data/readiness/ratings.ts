export type ReadinessRating = 0 | 1 | 2 | 3 | 'unverified'

export interface RatingInfo {
  rating: ReadinessRating
  label: string
  /** Shown in the badge: the numeral, or a question mark for Unverified. */
  symbol: string
  meaning: string
  /** Static class strings. Colour is always paired with the label and symbol. */
  badge: string
  soft: string
  solid: string
  text: string
}

/** The agreed scale. Unverified is not zero, and ratings are never averaged or summed. */
export const ratingScale: RatingInfo[] = [
  {
    rating: 0,
    label: 'Gap',
    symbol: '0',
    meaning: 'Assessed and currently absent.',
    badge: 'bg-gap-soft text-gap border-gap-mid',
    soft: 'bg-gap-soft',
    solid: 'bg-gap text-white',
    text: 'text-gap',
  },
  {
    rating: 1,
    label: 'Emerging',
    symbol: '1',
    meaning: 'Concept, POC or early capability.',
    badge: 'bg-amber-soft text-amber border-amber-mid',
    soft: 'bg-amber-soft',
    solid: 'bg-amber text-white',
    text: 'text-amber',
  },
  {
    rating: 2,
    label: 'Demonstrated',
    symbol: '2',
    meaning: 'Relevant implementation evidence, with limitations.',
    badge: 'bg-blue-soft text-blue border-blue-mid',
    soft: 'bg-blue-soft',
    solid: 'bg-blue text-white',
    text: 'text-blue',
  },
  {
    rating: 3,
    label: 'Repeatable',
    symbol: '3',
    meaning: 'Reusable capability with production evidence, ownership and support.',
    badge: 'bg-accent-soft text-accent-strong border-teal-bright/60',
    soft: 'bg-accent-soft',
    solid: 'bg-accent text-white',
    text: 'text-accent-strong',
  },
  {
    rating: 'unverified',
    label: 'Unverified',
    symbol: '?',
    meaning: 'Insufficient evidence to assess.',
    badge: 'bg-wash text-slate border-line-strong',
    soft: 'bg-wash',
    solid: 'bg-slate text-white',
    text: 'text-slate',
  },
]

export const ratingInfo = (rating: ReadinessRating): RatingInfo => ratingScale.find((r) => r.rating === rating)!

export const unverifiedNote = 'Unverified means insufficient evidence—not absent capability.'

/** Why a row sits at its rating. Kept generic so no row implies more than the evidence reviewed. */
export function ratingRationale(rating: ReadinessRating): string {
  if (rating === 'unverified') return unverifiedNote
  if (rating === 1) return 'Concept, discovery or POC evidence exists. Relevant implementation evidence was not reviewed.'
  if (rating === 0) return 'A scoped review confirmed the capability is absent.'
  if (rating === 2) return 'Relevant implementation evidence was reviewed, with limitations.'
  return 'Production evidence, ownership and support were reviewed.'
}
