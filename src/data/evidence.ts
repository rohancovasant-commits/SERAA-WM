import type { EvidenceKind } from './types'

/** Short labels that keep research, internal description and recommendation distinct. */
export const evidenceLabels: Record<EvidenceKind, { label: string; hint: string }> = {
  research: { label: 'Public research', hint: 'Published research or disclosure' },
  vendor: { label: 'Vendor-published capability', hint: 'Described by the vendor, not independently verified' },
  internal: { label: 'Internal discovery', hint: 'Described by the Covasant team' },
  poc: { label: 'POC', hint: 'Proof of concept' },
  proposed: { label: 'Proposed direction', hint: 'A recommendation, not an established fact' },
  validate: { label: 'To validate', hint: 'Needs confirmation before it is relied on' },
}

export const SNAPSHOT_DATE = '28 October 2026'
