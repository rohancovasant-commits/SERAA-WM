import { CircleDashed } from 'lucide-react'
import { decisionStatusLabels } from '../../data/decisions/page'
import type { DecisionStatus } from '../../data/decisions/types'

/**
 * Decision status. Pending is amber with a dashed ring: visibly unresolved. There is no ticked or approved style,
 * so no state on this page can read as an approval.
 */
export function DecisionStatusBadge({ status = 'pending', className = '' }: { status?: DecisionStatus; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-dashed border-amber/60 bg-amber-soft px-2.5 py-0.5 text-[0.8125rem] font-semibold leading-5 text-amber ${className}`}
    >
      <CircleDashed aria-hidden className="size-3.5" />
      <span className="sr-only">Decision status: </span>
      {decisionStatusLabels[status]}
    </span>
  )
}

/** Execution progress against a milestone. Not assessed, which is not the same as not started. */
export function ProgressBadge({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border border-violet-mid bg-violet-soft px-2.5 py-0.5 text-[0.8125rem] font-semibold leading-5 text-violet ${className}`}>
      <span className="sr-only">Execution progress: </span>
      Not assessed
    </span>
  )
}

/** Neutral chip for a possible future status. Shown for reference only. */
export function FutureStatusChip({ status }: { status: DecisionStatus }) {
  const current = status === 'pending'
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.9375rem] font-semibold ${
        current ? 'border-amber/60 bg-amber-soft text-amber' : 'border-line-strong bg-white text-slate'
      }`}
    >
      {decisionStatusLabels[status]}
    </span>
  )
}
