import type { EvidenceKind } from '../../data/types'
import { evidenceLabels } from '../../data/evidence'

const styles: Record<EvidenceKind, string> = {
  research: 'bg-ev-research-bg text-ev-research-fg',
  vendor: 'bg-ev-vendor-bg text-ev-vendor-fg',
  internal: 'bg-ev-internal-bg text-ev-internal-fg',
  poc: 'bg-ev-poc-bg text-ev-poc-fg',
  proposed: 'bg-ev-proposed-bg text-ev-proposed-fg',
  validate: 'bg-ev-validate-bg text-ev-validate-fg',
}

interface EvidenceLabelProps {
  kind: EvidenceKind
  className?: string
}

/** Names the type of evidence behind a claim. Colour is secondary to the text. */
export function EvidenceLabel({ kind, className = '' }: EvidenceLabelProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.8125rem] font-medium leading-5 ${styles[kind]} ${className}`}
    >
      {evidenceLabels[kind].label}
    </span>
  )
}
