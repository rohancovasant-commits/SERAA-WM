import { useId } from 'react'
import { workedWorkflow, workflowSteps } from '../../data/shared/workedWorkflow'
import { wealthCapabilities } from '../../data/shared/capabilityMap'
import { offeringsOverview } from '../../data/overviews'
import { useTabs } from '../../hooks/useTabs'
import { exec } from '../exec/styles'
import { EvidenceLabel } from '../ui/EvidenceLabel'
import { SourceList } from '../ui/SourceEntry'

const heading = 'text-sm font-semibold uppercase tracking-[0.08em] text-slate'

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-1.5 space-y-1.5">
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
 * Body of the worked-workflow panel: RM market intelligence as an illustrative proposed workflow. A step is chosen in
 * place, so nothing opens on top of the panel. Described POC functionality and proposed extensions stay in separate columns.
 */
export function WorkflowPanel() {
  const ids = workflowSteps.map((s) => s.id)
  const tabs = useTabs(ids, workflowSteps[0].id)
  const baseId = useId()
  const step = workflowSteps.find((s) => s.id === tabs.selected) ?? workflowSteps[0]

  return (
    <div className="space-y-6">
      <p className="rounded-card bg-wash px-4 py-3 font-semibold leading-snug text-navy">{offeringsOverview.workflowLabel}</p>
      <p className="leading-snug">{workedWorkflow.separationNote}</p>

      <div role="tablist" aria-label="Workflow steps" className="grid gap-2 sm:grid-cols-5">
        {workflowSteps.map((s, i) => {
          const selected = s.id === tabs.selected
          return (
            <button
              key={s.id}
              ref={tabs.setRef(i)}
              role="tab"
              type="button"
              id={`${baseId}-tab-${s.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => tabs.setSelected(s.id)}
              onKeyDown={(event) => tabs.onKeyDown(event, i)}
              className={`flex h-full flex-col items-start gap-1.5 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                selected ? 'border-accent bg-tint' : 'border-hairline bg-white hover:border-accent'
              }`}
            >
              <span
                aria-hidden
                className={`inline-flex size-6 items-center justify-center rounded-full text-[0.8125rem] font-bold ${selected ? 'bg-accent text-white' : 'bg-quiet text-slate'}`}
              >
                {s.order}
              </span>
              <span className="text-[0.9375rem] font-semibold leading-snug text-heading">{s.label}</span>
            </button>
          )
        })}
      </div>

      <div role="tabpanel" id={`${baseId}-panel`} aria-labelledby={`${baseId}-tab-${step.id}`} tabIndex={0} className="space-y-6 outline-none">
        <p className="font-semibold leading-snug text-navy">{step.purpose}</p>

        <div className="grid gap-4 md:grid-cols-2">
          <section className="rounded-card border border-line px-4 py-3.5">
            <h3 className="flex flex-wrap items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-slate">
              Described current POC functionality
              <EvidenceLabel kind="poc" />
            </h3>
            {step.described.length > 0 ? <Bullets items={step.described} /> : <p className="mt-1.5 leading-snug text-slate">Nothing is described for this step in the material reviewed.</p>}
          </section>
          <section className="rounded-card border border-dashed border-line-strong px-4 py-3.5">
            <h3 className="flex flex-wrap items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-slate">
              Proposed enterprise extension
              <EvidenceLabel kind="proposed" />
            </h3>
            <Bullets items={step.proposedExtension} />
          </section>
        </div>

        <dl className="grid gap-x-8 gap-y-5 md:grid-cols-2">
          {[
            { term: 'Inputs', items: step.inputs },
            { term: 'Dependencies', items: step.dependencies },
            { term: 'Domain judgement', items: step.domainJudgement },
            { term: 'Quality requirements and risks', items: step.qualityRisks },
          ].map((group) => (
            <div key={group.term}>
              <dt className={heading}>{group.term}</dt>
              <dd>
                <Bullets items={group.items} />
              </dd>
            </div>
          ))}
        </dl>

        <section>
          <h3 className={heading}>Outcome measures · to be defined</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {step.outcomeMeasures.map((m) => (
              <li key={m} className="rounded-full border border-hairline bg-quiet px-3 py-0.5 text-[0.9375rem] font-medium text-heading">
                {m}
              </li>
            ))}
          </ul>
          <p className={`mt-2 ${exec.meta}`}>No baseline, target value or result exists. Definitions and baselines come before any target.</p>
        </section>

        <p className={exec.meta}>
          <span className="font-semibold text-heading">Draws on: </span>
          {step.capabilities.map((id) => wealthCapabilities.find((c) => c.id === id)?.name).join(' · ')}
        </p>
      </div>

      <section className="border-t border-line pt-5">
        <h3 className={heading}>Not established</h3>
        <Bullets items={workedWorkflow.notEstablished} />
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-slate">Sources</h3>
        <SourceList ids={workedWorkflow.sourceIds} />
      </section>
    </div>
  )
}
