import { ratingInfo, ratingScale, type ReadinessRating } from '../../data/readiness/ratings'

/** Colour, symbol and label together, so no rating depends on colour alone. Unverified shows a question mark. */
export function RatingBadge({ rating, className = '' }: { rating: ReadinessRating; className?: string }) {
  const info = ratingInfo(rating)
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.8125rem] font-semibold leading-5 ${info.badge} ${className}`}
    >
      <span aria-hidden className={`flex size-4 items-center justify-center rounded-full text-[0.6875rem] font-bold ${info.solid}`}>
        {info.symbol}
      </span>
      {info.label}
    </span>
  )
}

/** The full scale, exactly as defined. */
export function RatingLegend() {
  return (
    <ul className="space-y-3">
      {ratingScale.map((info) => (
        <li key={String(info.rating)} className="flex items-start gap-3">
          <span aria-hidden className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-base font-bold ${info.solid}`}>
            {info.symbol}
          </span>
          <div>
            <p className="text-lg font-semibold leading-snug text-navy">
              {info.symbol} — {info.label}
            </p>
            <p className="leading-snug text-slate">{info.meaning}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
