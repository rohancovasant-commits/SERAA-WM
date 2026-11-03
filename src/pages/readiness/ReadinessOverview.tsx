import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { ExecHeader } from '../../components/exec/ExecHeader'
import { exec } from '../../components/exec/styles'
import { actionClass } from '../../components/ui/actionClass'
import { overviewCopy as c } from '../../data/readiness/page'

const label = 'text-[0.75rem] font-bold uppercase tracking-[0.14em]'
const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

/** Line symbols: an existing component, an adjustable one, and a new one drawn as a dashed outline. */
function Symbol({ id }: { id: string }) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className="size-9 text-accent-strong" {...stroke}>
      <rect x="6" y="10" width="28" height="20" rx="3" strokeDasharray={id === 'build' ? '4 3' : undefined} />
      {id === 'reuse' && <path d="M14 20h12" />}
      {id === 'adapt' && (
        <>
          <path d="M12 17h10M26 17h2M12 23h2M18 23h10" />
          <circle cx="24" cy="17" r="2" />
          <circle cx="16" cy="23" r="2" />
        </>
      )}
      {id === 'build' && <path d="M20 16v8M16 20h8" />}
    </svg>
  )
}

/**
 * Readiness as one executive slide: the finding, the three questions the capability review must answer, the concrete
 * next deliverable, and a small starting-evidence strip. Reuse / Adapt / Build are questions, not classifications:
 * nothing is populated or counted, and no investment, capacity or date is implied.
 */
export function ReadinessOverview({
  eyebrow,
  onOpenStartingPoints,
  onOpenQuestions,
  onOpenSupporting,
}: {
  eyebrow: string
  onOpenStartingPoints: (opener: HTMLElement, id?: string) => void
  onOpenQuestions: (opener: HTMLElement) => void
  onOpenSupporting: (opener: HTMLElement) => void
}) {
  return (
    <>
      <ExecHeader id="introduction-title" eyebrow={eyebrow} title={c.headline} wide />
      <p className="mt-4 max-w-4xl border-l-4 border-navy pl-5 text-xl font-bold leading-snug text-heading">{c.finding}</p>

      <section aria-labelledby="board-label" className="mt-8 rounded-[12px] bg-tint px-6 py-5 sm:px-8">
        <h2 id="board-label" className={`${label} text-accent-strong`}>
          {c.board.label}
        </h2>
        <ul className="mt-4 grid gap-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-accent/25">
          {c.board.columns.map((col) => (
            <li key={col.id} className="sm:px-6 sm:first:pl-0 sm:last:pr-0">
              <Symbol id={col.id} />
              <p className="mt-2 text-2xl font-bold leading-tight text-heading">{col.label}</p>
              <p className="mt-1 text-lg leading-snug text-heading">{col.question}</p>
            </li>
          ))}
        </ul>
      </section>
      <p className={`mt-2 ${exec.meta}`}>{c.board.note}</p>

      <section aria-labelledby="deliverable-label" className="mt-6 rounded-[12px] bg-navy px-6 py-5 text-white sm:px-8">
        <div className="grid gap-x-10 gap-y-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div>
            <h2 id="deliverable-label" className={`${label} text-teal-bright`}>
              {c.deliverable.tag}
            </h2>
            <p className="mt-2 text-2xl font-bold leading-snug">{c.deliverable.title}</p>
            <p className="mt-3 text-[0.9375rem] leading-snug text-white/80">{c.deliverable.support}</p>
          </div>
          <div>
            <ul className="space-y-1.5">
              {c.deliverable.outputs.map((o) => (
                <li key={o} className="flex items-center gap-2.5 text-lg leading-snug">
                  <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-teal-bright" />
                  {o}
                </li>
              ))}
            </ul>
            <p className="mt-3 border-t border-white/20 pt-3 text-[0.9375rem] leading-snug">
              <span className="text-white/70">{c.deliverable.participantsLabel}: </span>
              <span className="font-semibold">{c.deliverable.participants}</span>
            </p>
          </div>
        </div>
      </section>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <section aria-labelledby="starting-evidence">
          <h2 id="starting-evidence" className={`${label} text-slate`}>
            {c.starts.label}
          </h2>
          <ul className="mt-1 flex flex-wrap gap-x-6">
            {c.starts.items.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={(event) => onOpenStartingPoints(event.currentTarget, p.id)}
                  className="rounded-md py-0.5 text-left text-[0.9375rem] text-slate underline-offset-4 hover:text-accent hover:underline"
                >
                  <span className="font-semibold text-heading">{p.name}</span> — {p.status}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-0.5 text-[0.875rem] leading-snug text-slate">{c.starts.note}</p>
        </section>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" aria-haspopup="dialog" onClick={(event) => onOpenQuestions(event.currentTarget)} className={actionClass('secondary')}>
            {c.buttons[0]}
            <ArrowUpRight aria-hidden className="size-4" />
          </button>
          <button type="button" aria-haspopup="dialog" onClick={(event) => onOpenSupporting(event.currentTarget)} className={actionClass('primary')}>
            {c.buttons[1]}
            <ArrowRight aria-hidden className="size-4" />
          </button>
        </div>
      </div>
    </>
  )
}
