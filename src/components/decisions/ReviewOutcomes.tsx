import { useId, useState, type ComponentType } from 'react'
import { ArrowRight, PauseCircle, RefreshCw, StopCircle } from 'lucide-react'
import { outcomesHeading, outcomesNote, reviewOutcomes } from '../../data/decisions/review'
import type { ReviewOutcome } from '../../data/decisions/types'

const icons: Record<ReviewOutcome['id'], ComponentType<{ className?: string; 'aria-hidden'?: boolean }>> = {
  proceed: ArrowRight,
  revise: RefreshCw,
  pause: PauseCircle,
  stop: StopCircle,
}

/**
 * Four possible outcomes of a review. They explain; they do not decide. All four are shown with their one-line
 * meaning; none is preselected, coloured as a pass or fail, or wired to any decision status.
 */
export function ReviewOutcomes() {
  const [selected, setSelected] = useState<ReviewOutcome['id'] | null>(null)
  const base = useId()

  return (
    <div>
      <h3 className="text-2xl font-bold text-navy">{outcomesHeading}</h3>
      <p className="mt-2 text-[0.9375rem] text-slate">{outcomesNote}</p>

      <ul className="mt-6 grid items-start gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {reviewOutcomes.map((o) => {
          const open = selected === o.id
          const Icon = icons[o.id]
          return (
            <li key={o.id} className={`rounded-card border-2 bg-white transition-colors ${open ? 'border-navy' : 'border-line hover:border-navy/40'}`}>
              <h4>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`${base}-${o.id}`}
                  onClick={() => setSelected(open ? null : o.id)}
                  className="flex w-full flex-col items-start gap-2 px-4 py-4 text-left"
                >
                  <span className="flex items-center gap-2 text-lg font-bold uppercase tracking-[0.1em] text-navy">
                    <Icon aria-hidden className="size-5 text-slate" />
                    {o.label}
                  </span>
                  <span className="text-[1.0625rem] leading-snug text-ink">{o.summary}</span>
                  <span className="text-sm font-semibold text-accent">{open ? 'Hide what is recorded' : 'What is recorded'}</span>
                </button>
              </h4>
              {open && (
                <div id={`${base}-${o.id}`} className="swap-in border-t border-line px-4 pb-4 pt-3">
                  <p className="text-sm font-bold uppercase tracking-[0.1em] text-slate">Record</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {o.record.map((r) => (
                      <li key={r} className="rounded-full border border-line-strong bg-wash px-3 py-1 text-[0.9375rem] font-semibold text-navy">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
