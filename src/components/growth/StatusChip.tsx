import type { StrategicStatus } from '../../data/growth/types'

/**
 * Strategic status, always text-labelled. Teal = recommended direction, amber = hypothesis or decision still open,
 * navy = leadership decision. This is not the Readiness numerical scale and says nothing about technical maturity.
 */
const styles: Record<StrategicStatus, string> = {
  Proposed: 'bg-accent-soft text-accent-strong',
  'Proposed positioning': 'bg-accent-soft text-accent-strong',
  'Priority hypothesis': 'bg-amber-soft text-amber',
  Hypothesis: 'bg-amber-soft text-amber',
  'Leadership decision': 'bg-navy text-white',
  'Proposed decision rule': 'bg-accent-soft text-accent-strong',
}

export function StatusChip({ status, className = '' }: { status: StrategicStatus; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.8125rem] font-semibold leading-5 ${styles[status]} ${className}`}>
      {status}
    </span>
  )
}

/** Free-text pill for a maturity or status qualifier that is not one of the six strategic statuses. */
export function QualifierPill({ children, tone = 'amber', className = '' }: { children: string; tone?: 'amber' | 'teal' | 'blue'; className?: string }) {
  const t = { amber: 'bg-amber-soft text-amber', teal: 'bg-accent-soft text-accent-strong', blue: 'bg-blue-soft text-blue' }[tone]
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.8125rem] font-semibold leading-5 ${t} ${className}`}>{children}</span>
}
