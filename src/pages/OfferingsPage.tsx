import { useEffect } from 'react'
import { DetailDrawer } from '../components/ui/DetailDrawer'
import { EvidenceLabel } from '../components/ui/EvidenceLabel'
import { PageClosing } from '../components/ui/PageClosing'
import { SectionedPage } from '../components/ui/SectionedPage'
import { SourceList } from '../components/ui/SourceEntry'
import { LaunchComparisonPanel } from '../components/overview/detailPanels'
import { WorkflowPanel } from '../components/overview/WorkflowPanel'
import { useDrawer } from '../hooks/useDrawer'
import type { PageIntro } from '../data/types'
import { SNAPSHOT_DATE } from '../data/evidence'
import { closingActions, closingStatement } from '../data/offerings/development'
import { families } from '../data/offerings/families'
import { assessmentPanel, offeringsHero, offeringsSections } from '../data/offerings/page'
import { OfferingsOverview } from './offerings/OverviewSection'
import { PortfolioSection } from './offerings/PortfolioSection'
import { FamilySection } from './offerings/FamilySection'
import { DevelopmentSection } from './offerings/DevelopmentSection'

export function OfferingsPage() {
  const assessment = useDrawer<true>()
  const workflow = useDrawer<true>()
  const compare = useDrawer<true>()

  useEffect(() => {
    document.title = 'Offerings · SERAA Wealth Management Strategy'
  }, [])

  const intro: PageIntro = {
    summary: offeringsHero.titleLines.join(' '),
    status: offeringsHero.status,
    action: { label: offeringsHero.secondaryAction, onOpen: (opener) => assessment.open(true, opener) },
  }

  return (
    <>
      <SectionedPage
        title="Offerings"
        sections={offeringsSections}
        heading={offeringsHero.titleLines.join(' ')}
        intro={intro}
        overview={({ eyebrow }) => (
          <OfferingsOverview
            eyebrow={eyebrow}
            onOpenCompare={(opener) => compare.open(true, opener)}
            onOpenWorkflow={(opener) => workflow.open(true, opener)}
          />
        )}
        closing={
          <PageClosing
            id="offerings-closing"
            eyebrow="Portfolio principle"
            statement={closingStatement}
            primary={closingActions.primary}
            secondary={closingActions.secondary}
          />
        }
      >
        <PortfolioSection />
        <FamilySection family={families[0]} />
        <FamilySection family={families[1]} reverse surface="sky" />
        <FamilySection family={families[2]} />
        <FamilySection family={families[3]} reverse surface="lilac" />
        <DevelopmentSection />
      </SectionedPage>

      <DetailDrawer open={compare.value !== null} onClose={compare.close} title="Compare launch candidates" eyebrow="Offerings · launch priority" returnFocusRef={compare.trigger}>
        <LaunchComparisonPanel />
      </DetailDrawer>

      <DetailDrawer
        open={workflow.value !== null}
        onClose={workflow.close}
        title="Worked wealth workflow: RM market intelligence"
        eyebrow="Offerings · worked example"
        returnFocusRef={workflow.trigger}
        wide
      >
        <WorkflowPanel />
      </DetailDrawer>

      <DetailDrawer
        open={assessment.value !== null}
        onClose={assessment.close}
        title={assessmentPanel.title}
        eyebrow={`Research snapshot · ${SNAPSHOT_DATE}`}
        returnFocusRef={assessment.trigger}
      >
        <div className="space-y-7">
          <p className="rounded-card bg-wash px-4 py-3 leading-snug">{assessmentPanel.intro}</p>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate">Starting evidence by family</h3>
            <ul className="mt-3 divide-y divide-line">
              {families.map((family) => (
                <li key={family.id} className="py-3 first:pt-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-lg font-semibold text-navy">{family.shortTitle}</h4>
                    <EvidenceLabel kind={family.evidenceStatus} />
                  </div>
                  <p className="mt-1 leading-snug">{family.startingLabel}</p>
                  <p className="mt-0.5 leading-snug text-slate">Next: {family.proposedPriorityAction}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="flex flex-wrap items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-slate">
              {assessmentPanel.alternativesLabel}
              <EvidenceLabel kind="vendor" />
            </h3>
            <ul className="mt-3 space-y-2.5">
              {assessmentPanel.alternatives.map((item) => (
                <li key={item.name} className="leading-snug">
                  <span className="font-semibold text-navy">{item.name}: </span>
                  {item.text}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[0.9375rem] leading-snug text-slate">{assessmentPanel.caveat}</p>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-slate">Sources</h3>
            <SourceList ids={assessmentPanel.sourceIds} />
          </section>
        </div>
      </DetailDrawer>
    </>
  )
}
