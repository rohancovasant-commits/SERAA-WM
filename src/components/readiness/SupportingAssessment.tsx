import { useState, type KeyboardEvent } from 'react'
import { ChevronDown } from 'lucide-react'
import { exec } from '../exec/styles'
import { AssessmentExplorer } from './AssessmentExplorer'
import { RatingBadge } from './RatingBadge'
import type { Explorer } from './useExplorer'
import { dimensions } from '../../data/readiness/dimensions'
import {
  actionsNote,
  criticalExamples,
  criticalSteps,
  evidenceRegister as reg,
  evidenceRequests,
  supportingTabs,
  type SupportingTab,
} from '../../data/readiness/page'
import {
  actionTypeInfo,
  actionTypeNote,
  areaPanel,
  areaPanelLabels,
  areaTiles,
  commitmentCopy as cc,
  commitmentGates,
  stages,
  type ActionType,
  type StageId,
} from '../../data/readiness/plan'
import { ratingScale, unverifiedNote } from '../../data/readiness/ratings'
import { NAMED_OWNER_NOTE, requirements } from '../../data/readiness/requirements'

const label = 'text-[0.75rem] font-bold uppercase tracking-[0.1em] text-slate'
const actionOrder: ActionType[] = ['retrieve', 'validate', 'adapt', 'develop', 'decide']

/** Plain counts of existing ratings for the referenced requirements. They describe assessment coverage, never a score. */
function evidenceSummary(refs: string[]) {
  const own = requirements.filter((r) => refs.includes(r.id))
  return ratingScale
    .map((s) => ({ s, n: own.filter((r) => r.rating === s.rating).length }))
    .filter((x) => x.n > 0)
    .map(({ s, n }) => `${n} ${s.label}`)
    .join(' · ')
}

function AreasTab({ onInspect }: { onInspect: (dimension: (typeof dimensions)[number]['id']) => void }) {
  return (
    <div className="space-y-8">
      <p className={exec.meta}>{unverifiedNote} “Not yet established” refers to this review, not to a confirmed absence.</p>
      <ul className="divide-y divide-line border-y border-line">
        {dimensions.map((d) => {
          const panel = areaPanel[d.id]
          return (
            <li key={d.id} className="py-5">
              <h3 className="text-xl font-bold text-heading">{areaTiles[d.id].title}</h3>
              <p className={`mt-0.5 ${exec.body}`}>{areaTiles[d.id].finding}</p>
              <dl className="mt-3 space-y-2 text-[0.9375rem] leading-snug">
                <div>
                  <dt className="font-semibold text-heading">{areaPanelLabels.basis}</dt>
                  <dd>{panel.basis}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-heading">{areaPanelLabels.notYet}</dt>
                  <dd className="text-slate">{panel.notYet}</dd>
                </div>
                <div className="rounded-lg bg-tint px-3.5 py-2.5">
                  <dt className="font-semibold text-accent-strong">{areaPanelLabels.action}</dt>
                  <dd className="font-semibold text-heading">{panel.action}</dd>
                  <dd className="mt-1">
                    <span className="font-semibold text-accent-strong">{areaPanelLabels.output}</span> {panel.output}
                  </dd>
                </div>
              </dl>
              <button type="button" onClick={() => onInspect(d.id)} className={`${exec.link} mt-3`}>
                Inspect {requirements.filter((r) => r.dimension === d.id).length} requirements
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function CommitmentTab({ onOpenRequirement }: { onOpenRequirement: (id: string) => void }) {
  const [stage, setStage] = useState<StageId | null>(null)
  const [defsOpen, setDefsOpen] = useState(false)
  return (
    <div className="space-y-8">
      <p className="text-lg font-semibold leading-snug text-heading">{cc.headline}</p>
      <p className={exec.meta}>
        {cc.qualification} {cc.statusNote} Assessment categories, not a completed sequence.
      </p>

      <section aria-labelledby="stage-filter">
        <h3 id="stage-filter" className={label}>
          {cc.stageButton}
        </h3>
        <p className={`mt-1 ${exec.meta}`}>{cc.stageNote}</p>
        <div role="group" aria-label="Deployment stage" className="mt-3 flex flex-wrap gap-2">
          {stages.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={stage === s.id}
              onClick={() => setStage(stage === s.id ? null : s.id)}
              className={`rounded-full border px-3.5 py-1.5 text-[0.9375rem] font-semibold transition-colors ${
                stage === s.id ? 'border-navy bg-navy text-white' : 'border-navy/20 bg-white text-navy hover:border-accent hover:text-accent'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </section>

      <div aria-live="polite" className="space-y-8">
        {commitmentGates.map((g) => {
          const checks = g.checks.filter((chk) => stage === null || chk.stages.includes(stage))
          if (checks.length === 0) return null
          return (
            <section key={g.id} aria-labelledby={`gate-${g.id}`}>
              <h3 id={`gate-${g.id}`} className="text-xl font-bold text-heading">
                {g.question}
              </h3>
              <p className={`mt-0.5 ${exec.meta}`}>
                {cc.status} · existing records: {evidenceSummary(g.checks.flatMap((x) => x.refs))}
              </p>
              <ul className="mt-3 space-y-5">
                {checks.map((chk) => (
                  <li key={chk.id}>
                    <p className="font-semibold text-heading">{chk.title}</p>
                    <p className="mt-0.5 leading-snug">
                      <span className="font-semibold">Next action: </span>
                      {chk.next}
                    </p>
                    <ul className="mt-2 divide-y divide-line-soft border-y border-line">
                      {requirements
                        .filter((r) => chk.refs.includes(r.id))
                        .map((r) => (
                          <li key={r.id}>
                            <button
                              type="button"
                              onClick={() => onOpenRequirement(r.id)}
                              className="flex w-full flex-wrap items-center gap-x-3 gap-y-1.5 py-2.5 text-left hover:bg-wash"
                            >
                              <span className="w-8 shrink-0 text-sm font-bold text-accent-strong">{r.id}</span>
                              <span className="min-w-0 flex-1 basis-48 text-[0.9375rem] font-semibold leading-snug text-heading">{r.title}</span>
                              <RatingBadge rating={r.rating} />
                            </button>
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>

      <p className="border-l-4 border-amber pl-4 text-lg font-bold leading-snug text-heading">{cc.closing}</p>

      <section>
        <button type="button" aria-expanded={defsOpen} aria-controls="stage-defs" onClick={() => setDefsOpen((v) => !v)} className={exec.link}>
          Stage definitions and examples
          <ChevronDown aria-hidden className={`size-4 transition-transform ${defsOpen ? 'rotate-180' : ''}`} />
        </button>
        {defsOpen && (
          <div id="stage-defs" className="swap-in mt-3 space-y-5">
            <ul className="divide-y divide-line">
              {criticalSteps.map((s) => (
                <li key={s.name} className="py-2 first:pt-0 leading-snug">
                  <span className="font-semibold text-heading">{s.name}: </span>
                  {s.criterion}
                </li>
              ))}
            </ul>
            <div>
              <p className={label}>{criticalExamples.label}</p>
              <ul className="mt-2 space-y-1.5">
                {criticalExamples.items.map((item) => (
                  <li key={item} className="flex gap-2.5 leading-snug">
                    <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-amber" />
                    {item}
                  </li>
                ))}
              </ul>
              <ul className={`mt-3 space-y-1 ${exec.meta}`}>
                {criticalExamples.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
            <p className="font-semibold leading-snug text-navy">A strong result elsewhere cannot waive an unresolved critical requirement.</p>
          </div>
        )}
      </section>
    </div>
  )
}

function RequestsTab() {
  return (
    <div id="evidence-register" className="space-y-8">
      <p className="rounded-card bg-wash px-4 py-3 leading-snug">{reg.ownerStatus}</p>

      <section>
        <h3 className={label}>{reg.heading}</h3>
        <ul className="mt-2 divide-y divide-line border-y border-line">
          {reg.rows.map((row) => (
            <li key={row.id} className="py-4">
              <p className="text-lg font-bold text-heading">{row.title}</p>
              <p className="mt-0.5 leading-snug text-slate">{row.preview.question}</p>
              <dl className="mt-2 space-y-1.5 text-[0.9375rem] leading-snug">
                <div>
                  <dt className="inline font-semibold text-heading">What it should resolve: </dt>
                  <dd className="inline">{row.resolves}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-heading">Minimum reviewable output: </dt>
                  <dd className="inline">{row.output}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-heading">Proposed owner: </dt>
                  <dd className="inline">
                    {row.owner}. {NAMED_OWNER_NOTE}
                  </dd>
                </div>
              </dl>
              {row.id === 'seraa' && (
                <div className="mt-3">
                  <p className="text-[0.9375rem] font-semibold text-heading">{reg.seraaRequires.label}</p>
                  <ul className="mt-1.5 space-y-1.5">
                    {reg.seraaRequires.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[0.9375rem] leading-snug">
                        <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className={label}>Action types</h3>
        <ul className="mt-2 divide-y divide-line">
          {actionOrder.map((id) => (
            <li key={id} className="py-2.5 first:pt-0 leading-snug">
              <span className="font-semibold text-heading">{actionTypeInfo[id].label}: </span>
              {actionTypeInfo[id].text}
            </li>
          ))}
        </ul>
        <p className={`mt-2 ${exec.meta}`}>
          {actionTypeNote} {actionsNote}
        </p>
      </section>

      <section>
        <h3 className={label}>{evidenceRequests.label}</h3>
        <ul className="mt-2 divide-y divide-line">
          {evidenceRequests.items.map((item) => (
            <li key={item.title} className="py-2.5 first:pt-0 leading-snug">
              <span className="font-semibold text-heading">{item.title}</span>
              <span className="block text-slate">
                {item.owner} · {NAMED_OWNER_NOTE}
              </span>
            </li>
          ))}
        </ul>
        <p className={`mt-2 ${exec.meta}`}>{evidenceRequests.note}</p>
      </section>
    </div>
  )
}

/**
 * The complete supporting assessment as one surface with four tabs (one dialog, no nested dialogs): the six capability
 * areas, all requirement records with filters, the commitment checks, and the evidence requests. Nothing is rated,
 * averaged or reclassified by the presentation.
 */
export function SupportingAssessment({
  explorer,
  tab,
  onTab,
}: {
  explorer: Explorer
  tab: SupportingTab
  onTab: (tab: SupportingTab) => void
}) {
  const onKey = (event: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = supportingTabs.length - 1
    const next = event.key === 'ArrowRight' ? (i + 1) % (last + 1) : event.key === 'ArrowLeft' ? (i + last) % (last + 1) : event.key === 'Home' ? 0 : event.key === 'End' ? last : -1
    if (next < 0) return
    event.preventDefault()
    onTab(supportingTabs[next].id)
    document.getElementById(`tab-${supportingTabs[next].id}`)?.focus()
  }

  const toRequirement = (id: string) => {
    const requirement = requirements.find((r) => r.id === id)
    if (!requirement) return
    explorer.selectDimension(requirement.dimension)
    explorer.select(id)
    onTab('requirements')
  }

  return (
    <div>
      <p className={`mb-4 ${exec.meta}`}>
        {requirements.length} requirements, each rated on its own evidence. Ratings are never averaged or scored, and platform capability, wealth adaptation and customer acceptance stay distinct.
      </p>
      <div role="tablist" aria-label="Supporting assessment" className="flex flex-wrap gap-2 border-b border-line pb-3">
        {supportingTabs.map((t, i) => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => onTab(t.id)}
            onKeyDown={(event) => onKey(event, i)}
            className={`rounded-full border px-4 py-1.5 text-[0.9375rem] font-semibold transition-colors ${
              tab === t.id ? 'border-navy bg-navy text-white' : 'border-navy/20 bg-white text-navy hover:border-accent hover:text-accent'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-6">
        {tab === 'areas' && (
          <AreasTab
            onInspect={(dimension) => {
              explorer.selectDimension(dimension)
              onTab('requirements')
            }}
          />
        )}
        {tab === 'requirements' && <AssessmentExplorer explorer={explorer} />}
        {tab === 'commitment' && <CommitmentTab onOpenRequirement={toRequirement} />}
        {tab === 'requests' && <RequestsTab />}
      </div>
    </div>
  )
}
