import type { ReactNode } from 'react'
import { ExecBar } from '../exec/ExecBar'
import { exec } from '../exec/styles'
import { caseTags, type CaseTag } from '../../data/opportunity/case'

const tagStyles: Record<CaseTag, string> = {
  published: 'bg-ev-research-bg text-ev-research-fg',
  reported: 'bg-ev-internal-bg text-ev-internal-fg',
  proposed: 'bg-ev-proposed-bg text-ev-proposed-fg',
  hypothesis: 'bg-ev-poc-bg text-ev-poc-fg',
  unresolved: 'bg-ev-validate-bg text-ev-validate-fg',
}

/** Names the kind of statement beside a claim. The words carry the meaning; colour is secondary. */
export function CaseTagLabel({ kind, className = '' }: { kind: CaseTag; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.8125rem] font-medium leading-5 ${tagStyles[kind]} ${className}`}>
      {caseTags[kind]}
    </span>
  )
}

/** The chapter's closing line: what follows from the visual above it, with the buttons that open supporting detail. */
export function Implication({ children, buttons }: { children: ReactNode; buttons?: ReactNode }) {
  return (
    <ExecBar tag="Implication" action={buttons ? <div className="flex flex-wrap items-center gap-3">{buttons}</div> : undefined}>
      {children}
    </ExecBar>
  )
}

/** White outlined block that holds a chapter's dominant visual. */
export function VisualPanel({ children, label, className = '' }: { children: ReactNode; label: string; className?: string }) {
  return (
    <section aria-label={label} className={`${exec.panel} bg-white p-5 sm:p-6 ${className}`}>
      {children}
    </section>
  )
}

/** Small uppercase label above a block in a panel. */
export function PanelLabel({ children }: { children: ReactNode }) {
  return <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate">{children}</h3>
}
