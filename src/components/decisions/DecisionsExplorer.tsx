import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { leadershipDecisions } from '../../data/decisions/decisions'
import type { LeadershipDecision } from '../../data/decisions/types'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useTabs } from '../../hooks/useTabs'
import { DecisionDetail } from './DecisionDetail'
import { DecisionStatusBadge } from './StatusBadges'

const ids = leadershipDecisions.map((d) => d.id)

/** Number, title, one-line recommended direction and Pending status. Shared by the rail and the accordion. */
function SummaryBody({ decision, active }: { decision: LeadershipDecision; active: boolean }) {
  return (
    <>
      <span
        aria-hidden
        className={`flex size-10 shrink-0 items-center justify-center rounded-full text-[0.9375rem] font-bold ${active ? 'bg-accent text-white' : 'bg-wash text-navy'}`}
      >
        {decision.number}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-lg font-bold leading-tight text-navy">{decision.title}</span>
        <span className="mt-0.5 block text-[0.9375rem] leading-snug text-ink">{decision.shortRecommendation}</span>
        <DecisionStatusBadge status={decision.actualDecisionStatus} className="mt-2" />
      </span>
    </>
  )
}

/**
 * Master-detail on wide screens (vertical tabs beside one large panel); an accordion on narrow screens with only
 * D1 open by default. Selecting inspects a proposal. It never records an approval.
 */
export function DecisionsExplorer() {
  const wide = useMediaQuery('(min-width: 1024px)')
  const { selected, setSelected, onKeyDown, setRef } = useTabs(ids, 'd1')
  const [collapsed, setCollapsed] = useState(false)
  const base = useId()
  const current = leadershipDecisions.find((d) => d.id === selected) ?? leadershipDecisions[0]

  if (wide) {
    return (
      <div className="grid items-start gap-8 lg:grid-cols-[19.5rem_1fr]">
        <div role="tablist" aria-label="Leadership decisions" aria-orientation="vertical" className="space-y-3 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
          {leadershipDecisions.map((d, i) => {
            const active = d.id === selected
            return (
              <button
                key={d.id}
                ref={setRef(i)}
                id={`${base}-tab-${d.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`${base}-panel`}
                tabIndex={active ? 0 : -1}
                onClick={() => setSelected(d.id)}
                onKeyDown={(event) => onKeyDown(event, i)}
                className={`flex w-full items-start gap-3.5 rounded-card border-2 bg-white px-4 py-4 text-left transition-colors ${
                  active ? 'border-accent bg-accent-soft/50 shadow-sm' : 'border-line hover:border-accent/60'
                }`}
              >
                <SummaryBody decision={d} active={active} />
              </button>
            )
          })}
        </div>
        <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${current.id}`} key={current.id} className="swap-in min-w-0">
          <DecisionDetail decision={current} />
        </div>
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {leadershipDecisions.map((d) => {
        const open = d.id === selected && !collapsed
        return (
          <li key={d.id}>
            <h3>
              <button
                type="button"
                id={`${base}-acc-${d.id}`}
                aria-expanded={open}
                aria-controls={`${base}-acc-panel-${d.id}`}
                onClick={() => {
                  if (d.id === selected) setCollapsed((v) => !v)
                  else {
                    setSelected(d.id)
                    setCollapsed(false)
                  }
                }}
                className={`flex w-full items-start gap-3 rounded-card border-2 bg-white px-4 py-4 text-left transition-colors ${
                  open ? 'border-accent bg-accent-soft/50' : 'border-line'
                }`}
              >
                <SummaryBody decision={d} active={open} />
                <ChevronDown aria-hidden className={`mt-1 size-5 shrink-0 text-slate transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>
            </h3>
            {open && (
              <div id={`${base}-acc-panel-${d.id}`} role="region" aria-labelledby={`${base}-acc-${d.id}`} className="swap-in mt-3">
                <DecisionDetail decision={d} />
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
