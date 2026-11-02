import { Section } from '../../components/ui/Section'
import { ExecHeader } from '../../components/exec/ExecHeader'
import { RouteButton } from '../../components/overview/parts'
import { DetailDrawer } from '../../components/ui/DetailDrawer'
import { EvidenceLabel } from '../../components/ui/EvidenceLabel'
import { SourceList } from '../../components/ui/SourceEntry'
import { FitMap } from '../../components/opportunity/FitMap'
import { PanelLabel } from '../../components/opportunity/shared'
import { exec } from '../../components/exec/styles'
import { useDrawer } from '../../hooks/useDrawer'
import { fitCase } from '../../data/opportunity/case'
import { launchPriority } from '../../data/shared/launchPriority'
import { fitRows } from '../../data/opportunity/case'
import { startingPointRegister, startingPoints } from '../../data/shared/startingPoints'

/**
 * Covasant fit chapter: what existing activity supports and what must be established before it counts as a right to
 * win. Platform capability, wealth-specific adaptation and customer acceptance stay separate, and the full capability
 * assessment lives on the Readiness page. The three starting points are not three customers.
 */
export function StartingPositionSection() {
  const detail = useDrawer<string>()
  const point = startingPoints.find((p) => p.id === detail.value)
  const row = fitRows.find((r) => r.id === detail.value)

  return (
    <Section id="covasant-fit" headingId="fit-title">
      <ExecHeader id="fit-title" as="h2" eyebrow={fitCase.eyebrow} title={fitCase.headline} lede={fitCase.support} wide />

      <div className="mt-6">
        <FitMap onOpenDetail={(id, opener) => detail.open(id, opener)} />
        <p className={`mt-3 ${exec.meta}`}>{fitCase.qualification}</p>
      </div>

      <section aria-labelledby="route-title" className="mt-8">
        <p className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-accent-strong">{fitCase.routeLabel}</p>
        <h3 id="route-title" className="mt-1 text-xl font-bold leading-tight text-heading">
          {fitCase.routeHeading}
        </h3>
        <ol className="mt-4 grid gap-4 md:grid-cols-4 md:gap-0">
          {fitCase.route.map((step, i) => (
            <li key={step.id} className="relative flex gap-3 md:block md:pr-4">
              {i < fitCase.route.length - 1 && (
                <span aria-hidden className="absolute left-4 top-9 h-[calc(100%-1rem)] w-px bg-line-strong md:left-9 md:top-4 md:h-px md:w-[calc(100%-2.75rem)]" />
              )}
              <span aria-hidden className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-white text-sm font-bold text-accent-strong">
                {i + 1}
              </span>
              <span className="block md:mt-3">
                <span className="block text-lg font-bold leading-snug text-heading">{step.title}</span>
                <span className="block text-base leading-snug text-slate">{step.label}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className={`mt-3 ${exec.meta}`}>{fitCase.routeNote}</p>
      </section>

      <section aria-label="Proposed recommendation" className={`mt-8 ${exec.panel} border-l-[6px] border-l-accent bg-tint px-5 py-4 sm:px-6`}>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <p className="min-w-0 flex-1 basis-[22rem]">
            <span className="block text-xl font-bold leading-snug text-heading">{fitCase.recommendation}</span>
            <span className="mt-1 block text-base leading-snug text-slate">{fitCase.recommendationSupport}</span>
          </p>
          <RouteButton to="/readiness">{fitCase.readinessLabel}</RouteButton>
        </div>
      </section>

      <DetailDrawer
        open={detail.value !== null}
        onClose={detail.close}
        title={point?.name ?? ''}
        eyebrow={point?.activityType}
        returnFocusRef={detail.trigger}
      >
        {point && (
          <div className="space-y-6">
            <p className="flex flex-wrap items-center gap-2">
              <EvidenceLabel kind={point.evidenceKind} />
            </p>
            <section>
              <PanelLabel>Reported activity</PanelLabel>
              <p className="mt-2 leading-snug">{point.reportedStatus}</p>
            </section>
            <section>
              <PanelLabel>{startingPointRegister.columns.evidence}</PanelLabel>
              <ul className="mt-2 space-y-1.5 leading-snug">
                {point.evidenceReviewed.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
              <p className={`mt-2 ${exec.meta}`}>{startingPointRegister.reviewBasis} Missing evidence does not mean missing capability.</p>
            </section>
            <section>
              <PanelLabel>Potential strategic value</PanelLabel>
              <p className="mt-2 leading-snug">{row?.supports}</p>
            </section>
            <section>
              <PanelLabel>To be confirmed</PanelLabel>
              <p className="mt-2 font-semibold leading-snug text-heading">{row?.establish}</p>
              <p className="mt-2 rounded-card bg-ev-validate-bg/60 px-4 py-3 leading-snug text-ev-validate-fg">{point.materialLimitation}</p>
            </section>
            <section>
              <PanelLabel>{startingPointRegister.columns.next}</PanelLabel>
              <p className="mt-2 leading-snug">{point.nextAction}</p>
              <p className={`mt-2 ${exec.meta}`}>Proposed owner role: {point.proposedOwnerRole}. Named owner TBC.</p>
            </section>
            <p className={exec.meta}>{launchPriority.statement} Relationship and service support remains the lead candidate for package qualification; the comparison is pending.</p>
            {point.sourceIds.length > 0 && (
              <section>
                <PanelLabel>Sources</PanelLabel>
                <div className="mt-3">
                  <SourceList ids={point.sourceIds} />
                </div>
              </section>
            )}
          </div>
        )}
      </DetailDrawer>
    </Section>
  )
}
