import { ratingInfo, type ReadinessRating } from '../../data/readiness/ratings'

interface RequirementSquareProps {
  /** Requirement id such as "D1". Omitted in the legend. */
  id?: string
  rating: ReadinessRating
  legend?: boolean
}

/**
 * One requirement as a small square. Shade comes from its provisional rating; the text (id and rating name) is always
 * present for assistive technology. Unverified is drawn hollow so it never reads as a low score.
 */
export function RequirementSquare({ id, rating, legend = false }: RequirementSquareProps) {
  const info = ratingInfo(rating)
  const look = rating === 'unverified' ? 'border-2 border-dashed border-line-strong bg-white' : `border border-transparent ${info.solid}`
  return (
    <span aria-hidden={legend || undefined} className={`inline-block ${legend ? 'size-3.5' : 'size-5'} rounded-[4px] ${look}`}>
      {!legend && <span className="sr-only">{id ? `${id}: ${info.label}` : info.label}</span>}
    </span>
  )
}
