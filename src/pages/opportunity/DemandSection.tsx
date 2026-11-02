import { Section } from '../../components/ui/Section'
import { ExecHeader } from '../../components/exec/ExecHeader'
import { PanelButton } from '../../components/overview/parts'
import { DetailDrawer } from '../../components/ui/DetailDrawer'
import { EvidenceLabel } from '../../components/ui/EvidenceLabel'
import { SourceList } from '../../components/ui/SourceEntry'
import { SourceReference } from '../../components/ui/SourceReference'
import { ShareBar } from '../../components/diagrams/ShareBar'
import { DemandDrivers } from '../../components/opportunity/DemandDrivers'
import { Implication, PanelLabel } from '../../components/opportunity/shared'
import { exec } from '../../components/exec/styles'
import { useDrawer } from '../../hooks/useDrawer'
import { demandCase } from '../../data/opportunity/case'
import { demandFigures, demandFootnote, demandHeading, demandQualifier, demandScope, nuvamaLimits, nuvamaLine } from '../../data/opportunity/demand'
import { startingPoints } from '../../data/shared/startingPoints'

/**
 * Demand chapter. The benchmark for the other chapters: a dominant finding, a meaningful bar, supporting statistics with
 * their source and global scope, then the four business drivers tied to a possible SERAA entry. Global survey findings
 * are not India-specific demand, achievable savings or purchase intent, and the scope line says so beside them.
 */
export function DemandSection() {
  const { operational, automation, unifiedView } = demandFigures
  const evidence = useDrawer<true>()

  return (
    <Section id="demand" headingId="demand-title" surface="sky">
      <ExecHeader id="demand-title" as="h2" eyebrow={demandCase.eyebrow} title={demandHeading} wide />

      <div className="mt-6 rounded-panel bg-white shadow-[0_1px_2px_rgb(13_26_53/0.06)]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-3 sm:px-7">
          <p className="text-sm font-semibold text-accent-strong">{demandScope}</p>
          <SourceReference ids={['S03']} />
        </div>

        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.35fr_1fr] lg:gap-0">
          <div className="lg:pr-10">
            <p className="text-6xl font-semibold leading-none tracking-tight text-accent sm:text-7xl">{operational.value}%</p>
            <p className="mt-3 text-lg font-medium leading-snug">{operational.caption}</p>
            <div className="mt-5">
              <ShareBar
                segments={operational.segments}
                summary={`Operational tasks ${operational.segments[0].value} percent; other activities ${operational.segments[1].value} percent of advisors' time.`}
              />
            </div>
          </div>

          <div className="grid gap-5 border-t border-line pt-5 sm:grid-cols-2 lg:grid-cols-1 lg:gap-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div>
              <p className="text-5xl font-semibold leading-none tracking-tight text-accent">{automation.value}</p>
              <p className="mt-2 leading-snug">{automation.caption}</p>
            </div>
            <div>
              <p className="text-5xl font-semibold leading-none tracking-tight text-accent">{unifiedView.value}</p>
              <p className="mt-2 leading-snug">{unifiedView.caption}</p>
            </div>
          </div>
        </div>

        <p className="border-t border-line px-5 py-3 text-[0.9375rem] font-medium text-slate sm:px-7">{demandFootnote}</p>
      </div>

      <div className="mt-5">
        <DemandDrivers />
      </div>

      <div className="mt-5">
        <Implication buttons={<PanelButton onOpen={(opener) => evidence.open(true, opener)}>Evidence and limits</PanelButton>}>
          {demandCase.implication}
        </Implication>
      </div>

      <DetailDrawer open={evidence.value !== null} onClose={evidence.close} title="Demand evidence and limits" eyebrow="Supporting evidence" returnFocusRef={evidence.trigger}>
        <div className="space-y-8">
          <section>
            <PanelLabel>Global research</PanelLabel>
            <p className="mt-2 rounded-card bg-wash px-4 py-3 leading-snug">{demandQualifier}</p>
            <ul className="mt-3 space-y-1.5 leading-snug">
              <li>{operational.value}% of advisors’ time on operational tasks.</li>
              <li>{automation.value} of advisors want AI-enabled systems to automate routine work.</li>
              <li>{unifiedView.value} of wealth executives acknowledge lacking a unified client view.</li>
            </ul>
          </section>

          <section>
            <PanelLabel>Nuvama</PanelLabel>
            <p className="mt-2 font-semibold leading-snug text-heading">{nuvamaLine}</p>
            <p className={`mt-1 ${exec.meta}`}>{nuvamaLimits}</p>
          </section>

          <section>
            <PanelLabel>Covasant starting points, within their status</PanelLabel>
            <ul className="mt-2 divide-y divide-line">
              {startingPoints.map((point) => (
                <li key={point.id} className="py-3 first:pt-0">
                  <p className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-heading">{point.name}</span>
                    <EvidenceLabel kind={point.evidenceKind} />
                  </p>
                  <p className="mt-1 leading-snug">{point.reportedStatus}</p>
                  <p className={`mt-1 ${exec.meta}`}>{point.materialLimitation}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <PanelLabel>Sources</PanelLabel>
            <div className="mt-3">
              <SourceList ids={['S03', 'S04']} />
            </div>
          </section>
        </div>
      </DetailDrawer>
    </Section>
  )
}
