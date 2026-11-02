import type { ReactNode } from 'react'
import { ArrowRight, CalendarCheck, FileCheck, FileSearch, FileText, Target, UserRound, type LucideIcon } from 'lucide-react'
import { useTabs } from '../../hooks/useTabs'
import { useDrawer } from '../../hooks/useDrawer'
import { DetailDrawer } from '../ui/DetailDrawer'
import { PanelButton, PanelBullets } from '../overview/parts'
import { demandCase, demandProblems, type DemandProblem } from '../../data/opportunity/case'
import { exec } from '../exec/styles'
import { PanelLabel } from './shared'

/** One simple line icon per problem; the same icon is the motif in the example's middle area. */
const icons: Record<DemandProblem['id'], LucideIcon> = {
  briefing: FileText,
  information: FileSearch,
  processing: FileCheck,
  oversight: CalendarCheck,
}
const ids = demandProblems.map((p) => p.id) as readonly DemandProblem['id'][]

/**
 * Four customer problems; selecting one shows a single proposed change to the work (today, possible SERAA support,
 * value to test), one evidence/status line and a button for the supporting detail. Opportunity hypotheses, not outcomes.
 */
export function DemandDrivers() {
  const tabs = useTabs(ids, 'briefing')
  const detail = useDrawer<true>()
  const current = demandProblems.find((p) => p.id === tabs.selected) ?? demandProblems[0]
  const Motif = icons[current.id]
  const { columns } = demandCase

  return (
    <section aria-labelledby="demand-help-title">
      <h3 id="demand-help-title" className="text-xl font-bold leading-tight text-heading">
        {demandCase.heading}
      </h3>
      <p className={`mt-1 ${exec.meta}`}>{demandCase.subheading}</p>

      <div role="tablist" aria-label={demandCase.selectorLabel} className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {demandProblems.map((problem, index) => {
          const active = problem.id === tabs.selected
          const Icon = icons[problem.id]
          return (
            <button
              key={problem.id}
              ref={tabs.setRef(index)}
              type="button"
              role="tab"
              id={`problem-tab-${problem.id}`}
              aria-selected={active}
              aria-controls="problem-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => tabs.setSelected(problem.id)}
              onKeyDown={(event) => tabs.onKeyDown(event, index)}
              className={`flex items-start gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition-colors ${
                active ? 'border-accent bg-accent-soft' : 'border-hairline bg-white hover:border-line-strong'
              }`}
            >
              <span
                aria-hidden
                className={`flex size-10 shrink-0 items-center justify-center rounded-full ${active ? 'bg-accent text-white' : 'bg-wash text-accent-strong'}`}
              >
                <Icon strokeWidth={1.6} className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[1.0625rem] font-bold leading-tight text-heading">{problem.title}</span>
                <span className="mt-1 block text-[0.9375rem] leading-snug text-slate">{problem.role}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div
        id="problem-panel"
        role="tabpanel"
        aria-labelledby={`problem-tab-${current.id}`}
        className="mt-4 rounded-xl bg-white px-5 py-5 ring-1 ring-hairline sm:px-6"
      >
        <p className={exec.label}>{demandCase.relationshipLabel}</p>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto_1.5fr_auto_1fr] lg:items-stretch lg:gap-3">
          <Area label={columns.today} icon={UserRound}>
            {current.today}
          </Area>
          <Connector />
          <Area label={columns.support} icon={Motif} emphasis>
            {current.support}
          </Area>
          <Connector />
          <Area label={columns.value} icon={Target}>
            {current.value}
          </Area>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <p className="max-w-3xl text-[0.9375rem] font-medium leading-snug text-heading">{current.evidenceLine}</p>
          <PanelButton onOpen={(opener) => detail.open(true, opener)}>{demandCase.evidenceButton}</PanelButton>
        </div>
      </div>

      <DetailDrawer open={detail.value !== null} onClose={detail.close} title={current.title} eyebrow="Evidence & measures" returnFocusRef={detail.trigger}>
        <div className="space-y-8">
          <section>
            <PanelLabel>Business problem and intended users</PanelLabel>
            <p className="mt-2 leading-snug">{current.detail.problem}</p>
            <p className={`mt-1 ${exec.meta}`}>Intended users: {current.detail.users}</p>
          </section>
          <section>
            <PanelLabel>Available evidence, source and date</PanelLabel>
            <p className="mt-2 leading-snug">{current.detail.evidence}</p>
          </section>
          <section>
            <PanelLabel>Existing asset versus proposed functionality</PanelLabel>
            <p className="mt-2 leading-snug">{current.detail.existing}</p>
            <p className="mt-1 leading-snug">{current.detail.proposed}</p>
          </section>
          <section>
            <PanelLabel>Dependencies and limitations</PanelLabel>
            <div className="mt-2">
              <PanelBullets items={current.detail.dependencies} />
            </div>
          </section>
          <section>
            <PanelLabel>Measures to establish</PanelLabel>
            <div className="mt-2">
              <PanelBullets items={current.detail.measures} />
            </div>
            <p className={`mt-3 ${exec.meta}`}>No baselines, target improvements or realised benefits are established.</p>
          </section>
        </div>
      </DetailDrawer>
    </section>
  )
}

function Area({ label, icon: Icon, emphasis = false, children }: { label: string; icon: LucideIcon; emphasis?: boolean; children: ReactNode }) {
  return (
    <div
      className={`min-w-0 rounded-xl px-5 py-4 ${emphasis ? 'border-2 border-accent bg-accent-soft' : 'border border-hairline bg-wash'}`}
    >
      <p className={`flex items-center gap-2 ${emphasis ? 'text-sm font-bold uppercase tracking-[0.08em] text-accent-strong' : exec.label}`}>
        <Icon aria-hidden strokeWidth={1.6} className="size-5 shrink-0" />
        {label}
      </p>
      <p className={`mt-2 leading-snug text-heading ${emphasis ? 'text-lg font-semibold' : 'text-base'}`}>{children}</p>
    </div>
  )
}

function Connector() {
  return (
    <div aria-hidden className="hidden items-center text-slate lg:flex">
      <ArrowRight className="size-5" />
    </div>
  )
}
