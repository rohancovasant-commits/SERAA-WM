import type { EvidenceKind } from '../../data/types'
import { EvidenceLabel } from '../ui/EvidenceLabel'
import { exec } from './styles'

export interface EvidenceItem {
  /** Column label in plain words, such as "Published by others". */
  label: string
  /** The kind of evidence behind it. Colour is secondary to the label. */
  kind: EvidenceKind
  text: string
}

/**
 * Keeps what is published, what is internal and what is still unproven side by side, so a hypothesis is never read as
 * a finding. Two or three columns.
 */
export function EvidenceStrip({ label, items }: { label: string; items: EvidenceItem[] }) {
  return (
    <section aria-label={label} className={`${exec.panel} bg-white px-5 py-4 sm:px-6`}>
      <ul className={`grid gap-4 sm:divide-x sm:divide-hairline-soft ${items.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
        {items.map((item) => (
          <li key={item.label} className="sm:px-5 sm:first:pl-0 sm:last:pr-0">
            <span className={`block ${exec.label}`}>{item.label}</span>
            <EvidenceLabel kind={item.kind} className="mt-1" />
            <span className={`mt-1 block ${exec.meta} !text-heading`}>{item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
