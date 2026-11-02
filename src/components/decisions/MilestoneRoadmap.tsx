import { Fragment, useId } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { milestones, roadmapNotes, roadmapProgressNote } from '../../data/decisions/roadmap'
import { useTabs } from '../../hooks/useTabs'
import { MilestoneDetail } from './MilestoneDetail'
import { ProgressBadge } from './StatusBadges'

const ids = milestones.map((m) => m.id)

/**
 * The page's main visual: four large stages joined by review points. Selecting a stage opens its detail beneath.
 * No dates, no completion figures and no launch promises: every stage is Not assessed.
 */
export function MilestoneRoadmap() {
  const { selected, setSelected, onKeyDown, setRef } = useTabs(ids, 'm1')
  const base = useId()
  const current = milestones.find((m) => m.id === selected) ?? milestones[0]

  return (
    <div>
      <div
        role="tablist"
        aria-label="Execution milestones"
        className="flex flex-col items-stretch gap-2 lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch lg:gap-x-2"
      >
        {milestones.map((m, i) => {
          const active = m.id === selected
          return (
            <Fragment key={m.id}>
              {i > 0 && (
                <div aria-hidden className="flex items-center justify-center gap-2 py-0.5 text-violet lg:flex-col lg:px-0.5 lg:py-0">
                  <span className="text-[0.75rem] font-bold uppercase tracking-[0.12em]">Review</span>
                  <ArrowRight className="hidden size-5 lg:block" />
                  <ArrowDown className="size-5 lg:hidden" />
                </div>
              )}
              <button
                ref={setRef(i)}
                id={`${base}-tab-${m.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`${base}-panel`}
                tabIndex={active ? 0 : -1}
                onClick={() => setSelected(m.id)}
                onKeyDown={(event) => onKeyDown(event, i)}
                className={`flex min-w-0 flex-row items-center gap-4 rounded-panel border-2 px-4 py-4 text-left transition-colors lg:flex-col lg:items-stretch lg:gap-0 lg:px-5 lg:py-5 ${
                  active ? 'border-violet bg-white shadow-sm' : 'border-hairline bg-white/70 hover:border-violet-mid'
                }`}
              >
                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[0.9375rem] font-bold ${active ? 'bg-violet text-white' : 'bg-violet-soft text-violet'}`}
                    >
                      {m.number}
                    </span>
                    <span className="whitespace-nowrap text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-violet">Milestone {m.number}</span>
                  </span>
                  <span className="mt-2 block text-lg font-bold leading-tight text-navy">{m.title}</span>
                  <ProgressBadge className="mt-3" />
                </span>
              </button>
            </Fragment>
          )
        })}
      </div>

      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-1.5 text-[0.9375rem] font-semibold italic text-slate">
        {roadmapNotes.map((note) => (
          <li key={note} className="flex items-center gap-2">
            <span aria-hidden className="size-1.5 rounded-full bg-violet" />
            {note}
          </li>
        ))}
      </ul>

      <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${current.id}`} key={current.id} className="swap-in mt-8">
        <MilestoneDetail milestone={current} />
      </div>

      <p className="mt-5 max-w-3xl text-[0.9375rem] leading-snug text-slate">{roadmapProgressNote}</p>
    </div>
  )
}
