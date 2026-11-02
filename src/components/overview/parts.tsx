import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { DetailFinding } from '../../data/overviews'
import { actionClass } from '../ui/actionClass'
import { EvidenceLabel } from '../ui/EvidenceLabel'
import { ExecBar } from '../exec/ExecBar'
import { exec } from '../exec/styles'

/** The row of one or two detail buttons under an overview. */
export function OverviewButtons({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>
}

/** Button that opens a panel. The opener is passed back so focus returns to it on close. */
export function PanelButton({ children, onOpen }: { children: ReactNode; onOpen: (opener: HTMLElement) => void }) {
  return (
    <button type="button" aria-haspopup="dialog" onClick={(event) => onOpen(event.currentTarget)} className={actionClass('secondary')}>
      {children}
      <ArrowUpRight aria-hidden className="size-4" />
    </button>
  )
}

/** Button that moves to another chapter of the same page. */
export function ChapterButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={actionClass('secondary')}>
      {children}
      <ArrowRight aria-hidden className="size-4" />
    </button>
  )
}

/** Button that goes to another page. */
export function RouteButton({ children, to }: { children: ReactNode; to: string }) {
  return (
    <Link to={to} className={actionClass('secondary')}>
      {children}
      <ArrowRight aria-hidden className="size-4" />
    </Link>
  )
}

/** A short, always-visible qualification that changes how the visual above it should be read. */
export function Qualification({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`${exec.meta} ${className}`}>{children}</p>
}

const panelHeading = 'text-sm font-semibold uppercase tracking-[0.08em] text-slate'

/** A titled block inside a detail panel. */
export function PanelBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className={panelHeading}>{title}</h3>
      <div className="mt-2">{children}</div>
    </section>
  )
}

/** Plain bullet list for detail panels. */
export function PanelBullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 leading-snug">
          <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  )
}

/**
 * Findings moved off an overview into a detail panel: a ruled list with a label, an optional evidence label and the full
 * sentence. Source chips are not used here (they would open a second overlay); panels list their sources inline.
 */
export function FindingList({ items }: { items: DetailFinding[] }) {
  return (
    <ul className="divide-y divide-line">
      {items.map((item) => (
        <li key={item.label} className="py-3 first:pt-0">
          <p className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-navy">{item.label}</span>
            {item.evidence && <EvidenceLabel kind={item.evidence} />}
          </p>
          <p className="mt-1 leading-snug">{item.text}</p>
        </li>
      ))}
    </ul>
  )
}

/** What follows: one next-action line with the one or two evidence buttons beside it. The same closing bar on every overview. */
export function NextAction({ children, buttons }: { children: ReactNode; buttons: ReactNode }) {
  return (
    <ExecBar tag="Next action" action={<OverviewButtons>{buttons}</OverviewButtons>}>
      {children}
    </ExecBar>
  )
}
