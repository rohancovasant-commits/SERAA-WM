import { CircleDashed, Layers, Plug } from 'lucide-react'
import { BusinessModelFlow } from '../../components/opportunity/BusinessModelFlow'
import { NextAction, PanelButton } from '../../components/overview/parts'
import { ExecHeader } from '../../components/exec/ExecHeader'
import { exec } from '../../components/exec/styles'
import { overview } from '../../data/opportunity/case'
import { opportunityOverview } from '../../data/overviews'

const considerationIcons = { alternatives: Layers, dependencies: Plug } as const

/**
 * Opportunity overview, and the landing page: the business judgement. One dominant visual (the proposed business model),
 * the entry evidence under it, two strategic considerations and the material boundary. The market map and the evidence
 * behind the judgement open in panels.
 */
export function OpportunityOverview({
  eyebrow,
  onOpenAccountMap,
  onOpenEvidence,
}: {
  eyebrow: string
  onOpenAccountMap: (opener: HTMLElement) => void
  onOpenEvidence: (opener: HTMLElement) => void
}) {
  return (
    <>
      <ExecHeader id="introduction-title" eyebrow={eyebrow} title={opportunityOverview.headline} wide />
      <p className="mt-2 max-w-5xl text-lg font-semibold leading-snug text-accent-strong sm:text-xl">{overview.entry}</p>

      <div className="mt-5 space-y-4">
        <BusinessModelFlow />

        <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <section aria-labelledby="entry-evidence-label" className={`${exec.panel} bg-white px-5 py-4 sm:px-6`}>
            <h2 id="entry-evidence-label" className={exec.label}>
              {overview.evidenceLabel}
            </h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-3 sm:divide-x sm:divide-hairline-soft">
              {overview.evidence.map((item) => (
                <li key={item.name} className="sm:px-4 sm:first:pl-0 sm:last:pr-0">
                  <span className="block text-lg font-bold leading-snug text-heading">{item.name}</span>
                  <span className={`block ${exec.body}`}>{item.basis}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="considerations-label" className={`${exec.panel} bg-white px-5 py-4 sm:px-6`}>
            <h2 id="considerations-label" className={exec.label}>
              {overview.considerationsLabel}
            </h2>
            <ul className="mt-3 space-y-3">
              {overview.considerations.map((item) => {
                const Icon = considerationIcons[item.id as keyof typeof considerationIcons]
                return (
                  <li key={item.id} className="flex items-start gap-3">
                    <Icon aria-hidden strokeWidth={1.6} className="mt-0.5 size-6 shrink-0 text-blue" />
                    <span className={exec.body}>
                      <span className="font-bold text-heading">{item.label}. </span>
                      {item.text}
                    </span>
                  </li>
                )
              })}
            </ul>
          </section>
        </div>

        <p className="flex items-start gap-2.5 rounded-xl border-l-4 border-amber bg-amber-soft px-4 py-3 text-[1.0625rem] font-semibold leading-snug text-heading">
          <CircleDashed aria-hidden className="mt-0.5 size-5 shrink-0 text-amber" />
          {overview.boundary}
        </p>
      </div>

      <div className="mt-4">
        <NextAction
          buttons={
            <>
              <PanelButton onOpen={onOpenAccountMap}>Market map</PanelButton>
              <PanelButton onOpen={onOpenEvidence}>Evidence</PanelButton>
            </>
          }
        >
          {overview.next}
        </NextAction>
      </div>
    </>
  )
}
