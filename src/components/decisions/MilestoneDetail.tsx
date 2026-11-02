import { ArrowRight } from 'lucide-react'
import type { Milestone } from '../../data/decisions/types'
import { Statement } from './StatementLabel'
import { ProgressBadge } from './StatusBadges'

/**
 * One milestone, inspected: purpose, reviewable outputs, the evidence needed to advance, and the next leadership
 * decision. Progress is shown as Not assessed, never as a percentage or a date.
 */
export function MilestoneDetail({ milestone, headingId }: { milestone: Milestone; headingId?: string }) {
  return (
    <article className="rounded-panel border border-line bg-white p-5 sm:p-8">
      <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h3 id={headingId} className="text-2xl font-bold leading-tight text-navy sm:text-[1.75rem]">
          <span className="mr-2 text-violet">M{milestone.number}</span>
          {milestone.title}
        </h3>
        <ProgressBadge />
      </header>

      <div className="mt-6 grid gap-x-10 gap-y-7 lg:grid-cols-2">
        <section>
          <h4 className="text-sm font-bold uppercase tracking-[0.1em] text-violet">Purpose</h4>
          <p className="mt-2 text-xl font-semibold leading-snug text-navy">{milestone.purpose}</p>

          <h4 className="mt-7 text-sm font-bold uppercase tracking-[0.1em] text-violet">Evidence required to advance</h4>
          <p className="mt-2 text-lg leading-snug text-ink">{milestone.advancementEvidence}</p>
        </section>

        <section>
          <h4 className="text-sm font-bold uppercase tracking-[0.1em] text-violet">Reviewable outputs</h4>
          <p className="mt-1 text-[0.9375rem] text-slate">Proposed. None is a completed document.</p>
          <ul className="mt-3 space-y-2.5">
            {milestone.reviewableOutputs.map((output, i) => (
              <li key={output} className="flex items-start gap-3 rounded-lg border border-violet-mid bg-violet-soft/60 px-3.5 py-2.5 text-[1.0625rem] leading-snug text-navy">
                <span aria-hidden className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded bg-violet text-xs font-bold text-white">
                  {i + 1}
                </span>
                {output}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-7">
        <Statement kind="decide">
          <span className="inline-flex items-start gap-2">
            <ArrowRight aria-hidden className="mt-1.5 size-4 shrink-0 text-amber" />
            {milestone.nextLeadershipDecision}
          </span>
        </Statement>
      </div>
    </article>
  )
}
