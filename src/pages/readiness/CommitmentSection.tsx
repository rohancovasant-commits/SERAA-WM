import { useState, type ReactNode } from 'react'
import { Section } from '../../components/ui/Section'
import { DetailDrawer } from '../../components/ui/DetailDrawer'
import { ExecHeader } from '../../components/exec/ExecHeader'
import { exec } from '../../components/exec/styles'
import { PanelButton } from '../../components/overview/parts'
import { RatingBadge } from '../../components/readiness/RatingBadge'
import { useDrawer } from '../../hooks/useDrawer'
import { criticalExamples, criticalSteps } from '../../data/readiness/page'
import { commitmentCopy as c, commitmentGates, stages, type CommitmentGate, type StageId } from '../../data/readiness/plan'
import { ratingScale } from '../../data/readiness/ratings'
import { requirements } from '../../data/readiness/requirements'

const label = 'text-[0.75rem] font-bold uppercase tracking-[0.1em] text-slate'

/** Plain counts of the referenced requirements' existing ratings. A summary of evidence, never a score or a verdict. */
function evidenceSummary(refs: string[]) {
  const own = requirements.filter((r) => refs.includes(r.id))
  return ratingScale
    .map((s) => ({ s, n: own.filter((r) => r.rating === s.rating).length }))
    .filter((x) => x.n > 0)
    .map(({ s, n }) => `${n} ${s.label}`)
    .join(' · ')
}

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

/** Small schematics. Decorative: approved sources through an access boundary; a draft to a human reviewer; a service with an owner and cost boundary. */
function Schematic({ id }: { id: CommitmentGate['id'] }) {
  return (
    <svg aria-hidden viewBox="0 0 200 72" className="h-[4.5rem] w-full max-w-[16rem] text-accent" {...stroke}>
      {id === 'information' && (
        <>
          <circle cx="16" cy="14" r="6" />
          <circle cx="16" cy="36" r="6" />
          <circle cx="16" cy="58" r="6" />
          <path d="M24 14h56M24 36h56M24 58h56" />
          <path d="M96 4v64" strokeDasharray="4 4" />
          <rect x="86" y="28" width="20" height="16" rx="3" fill="var(--color-canvas, #fff)" />
          <path d="M91 28v-4a5 5 0 0 1 10 0v4" />
          <path d="M112 36h40" />
          <rect x="156" y="22" width="30" height="28" rx="4" />
        </>
      )}
      {id === 'acceptable' && (
        <>
          <rect x="14" y="12" width="54" height="48" rx="4" />
          <path d="M24 28h34M24 38h22" />
          <path d="M76 36h46" />
          <path d="M116 30l6 6-6 6" />
          <circle cx="152" cy="26" r="9" />
          <path d="M134 62a18 14 0 0 1 36 0" />
        </>
      )}
      {id === 'operate' && (
        <>
          <rect x="14" y="14" width="76" height="44" rx="4" />
          <path d="M26 30h30M26 42h18" />
          <circle cx="76" cy="36" r="6" />
          <circle cx="126" cy="22" r="8" />
          <path d="M110 48a16 12 0 0 1 32 0" />
          <path d="M96 36h14" />
          <rect x="150" y="12" width="38" height="48" rx="6" strokeDasharray="4 4" />
        </>
      )}
    </svg>
  )
}

/**
 * Before customer commitment: three assessment categories side by side, not a completed sequence. Every gate reads
 * "To assess" because no workflow-specific assessment exists; unverified evidence is never shown as failed, missing or
 * blocked. Stage applicability is a proposed filter and never a progress tracker.
 */
export function CommitmentSection({ onOpenRequirement }: { onOpenRequirement: (id: string, opener?: HTMLElement) => void }) {
  const gateDrawer = useDrawer<CommitmentGate>()
  const stageDrawer = useDrawer<true>()
  const [stage, setStage] = useState<StageId | null>(null)

  const gate = gateDrawer.value
  const openRequirement = (id: string, opener: HTMLElement) => {
    gateDrawer.close()
    onOpenRequirement(id, opener)
  }

  const requirementList = (refs: string[], open: (id: string, el: HTMLElement) => void): ReactNode => (
    <ul className="divide-y divide-line-soft border-y border-line">
      {requirements
        .filter((r) => refs.includes(r.id))
        .map((r) => (
          <li key={r.id}>
            <button type="button" onClick={(e) => open(r.id, e.currentTarget)} className="flex w-full flex-wrap items-center gap-x-3 gap-y-1.5 py-2.5 text-left hover:bg-wash">
              <span className="w-8 shrink-0 text-sm font-bold text-accent-strong">{r.id}</span>
              <span className="min-w-0 flex-1 basis-48 text-[0.9375rem] font-semibold leading-snug text-heading">{r.title}</span>
              <RatingBadge rating={r.rating} />
            </button>
          </li>
        ))}
    </ul>
  )

  return (
    <Section id="before-commitment" headingId="commitment-title">
      <ExecHeader id="commitment-title" as="h2" eyebrow="Readiness · Before customer commitment" title={c.headline} wide />

      <ul className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-line">
        {commitmentGates.map((g) => (
          <li key={g.id} className="flex flex-col lg:px-8 lg:first:pl-0 lg:last:pr-0">
            <Schematic id={g.id} />
            <h3 className="mt-5 text-2xl font-bold leading-tight text-heading">{g.question}</h3>
            <ul className="mt-4 divide-y divide-line-soft border-y border-line-soft">
              {g.checks.map((chk) => (
                <li key={chk.id} className="py-2.5 text-lg font-semibold leading-snug text-heading">
                  {chk.title}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              <span className={label}>Evidence status</span>
              <span className="mt-0.5 block text-lg font-semibold text-heading">{c.status}</span>
              <span className="block text-[0.875rem] leading-snug text-slate">{evidenceSummary(g.checks.flatMap((x) => x.refs))} in existing records</span>
            </p>
            <div className="mt-5">
              <PanelButton onOpen={(opener) => gateDrawer.open(g, opener)}>Checks and evidence</PanelButton>
            </div>
          </li>
        ))}
      </ul>

      <p className={`mt-10 ${exec.meta}`}>{c.qualification}</p>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <p className="max-w-3xl border-l-4 border-amber pl-5 text-xl font-bold leading-snug text-heading">{c.closing}</p>
        <PanelButton onOpen={(opener) => stageDrawer.open(true, opener)}>{c.stageButton}</PanelButton>
      </div>

      <DetailDrawer open={gate !== null} onClose={gateDrawer.close} title={gate?.question ?? ''} eyebrow="Before customer commitment" returnFocusRef={gateDrawer.trigger}>
        {gate && (
          <div className="space-y-8">
            <p className="rounded-card bg-wash px-4 py-3 leading-snug">
              {c.status}. {c.statusNote} Existing records are shown as they stand; nothing here is a gate rating.
            </p>
            {gate.checks.map((chk) => (
              <section key={chk.id} aria-labelledby={`chk-${chk.id}`}>
                <h3 id={`chk-${chk.id}`} className="text-xl font-bold text-heading">
                  {chk.title}
                </h3>
                <p className={`mt-1 ${exec.meta}`}>Existing evidence: {evidenceSummary(chk.refs)}.</p>
                <p className="mt-3 leading-snug">
                  <span className="font-semibold text-heading">Next action: </span>
                  {chk.next}
                </p>
                <div className="mt-3">{requirementList(chk.refs, openRequirement)}</div>
              </section>
            ))}
          </div>
        )}
      </DetailDrawer>

      <DetailDrawer open={stageDrawer.value !== null} onClose={stageDrawer.close} title={c.stageButton} eyebrow="Before customer commitment" returnFocusRef={stageDrawer.trigger}>
        <div className="space-y-8">
          <p className="rounded-card bg-wash px-4 py-3 leading-snug">{c.stageNote}</p>

          <section aria-labelledby="stage-filter">
            <h3 id="stage-filter" className={label}>
              Show checks that may apply at
            </h3>
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
            <ul aria-live="polite" className="mt-4 divide-y divide-line">
              {commitmentGates.flatMap((g) =>
                g.checks
                  .filter((chk) => stage === null || chk.stages.includes(stage))
                  .map((chk) => (
                    <li key={chk.id} className="py-2.5 leading-snug">
                      <span className="font-semibold text-heading">{chk.title}</span>
                      <span className="block text-[0.9375rem] text-slate">{g.question}</span>
                    </li>
                  )),
              )}
            </ul>
          </section>

          <section>
            <h3 className={label}>Stage definitions</h3>
            <ul className="mt-2 divide-y divide-line">
              {criticalSteps.map((s) => (
                <li key={s.name} className="py-2.5 first:pt-0 leading-snug">
                  <span className="font-semibold text-heading">{s.name}: </span>
                  {s.criterion}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className={label}>{criticalExamples.label}</h3>
            <ul className="mt-2 space-y-2">
              {criticalExamples.items.map((item) => (
                <li key={item} className="flex gap-2.5 leading-snug">
                  <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-amber" />
                  {item}
                </li>
              ))}
            </ul>
            <ul className={`mt-4 space-y-1.5 ${exec.meta}`}>
              {criticalExamples.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
          <p className="font-semibold leading-snug text-navy">A strong result elsewhere cannot waive an unresolved critical requirement.</p>
        </div>
      </DetailDrawer>
    </Section>
  )
}
