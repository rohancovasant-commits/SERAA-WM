import type { ReactNode } from 'react'
import { FileSearch, Flag, Lightbulb, type LucideIcon } from 'lucide-react'
import { statementTypes } from '../../data/decisions/page'
import type { StatementKind } from '../../data/decisions/types'

/**
 * The three statement types, one visual treatment each. Blue = evidence, teal = recommendation, amber = a pending
 * choice. Each pairs a colour with an icon and the label text, so none relies on colour alone.
 */
const style: Record<StatementKind, { icon: LucideIcon; chip: string; edge: string; wash: string }> = {
  know: { icon: FileSearch, chip: 'bg-blue text-white', edge: 'border-blue', wash: 'bg-blue-soft' },
  recommend: { icon: Lightbulb, chip: 'bg-accent text-white', edge: 'border-accent', wash: 'bg-accent-soft' },
  decide: { icon: Flag, chip: 'bg-amber text-white', edge: 'border-amber', wash: 'bg-amber-soft' },
}

export function StatementLabel({ kind, className = '' }: { kind: StatementKind; className?: string }) {
  const { icon: Icon, chip } = style[kind]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.8125rem] font-bold uppercase tracking-[0.1em] ${chip} ${className}`}>
      <Icon aria-hidden className="size-3.5" />
      {statementTypes[kind].label}
    </span>
  )
}

interface StatementProps {
  kind: StatementKind
  children: ReactNode
  /** Show the one-line meaning of the statement type beneath the label. */
  withMeaning?: boolean
  /** Larger type for the single statement that carries the page. */
  large?: boolean
}

/** One statement with its label. The text stays inside the type it belongs to. */
export function Statement({ kind, children, withMeaning = false, large = false }: StatementProps) {
  const s = style[kind]
  return (
    <div className={`rounded-card border-l-4 px-4 py-3.5 sm:px-5 ${s.edge} ${s.wash}`}>
      <StatementLabel kind={kind} />
      {withMeaning && <p className="mt-2 text-[0.9375rem] text-slate">{statementTypes[kind].meaning}</p>}
      <p className={`mt-2 leading-snug text-navy ${large ? 'text-xl font-semibold' : 'text-lg'}`}>{children}</p>
    </div>
  )
}
