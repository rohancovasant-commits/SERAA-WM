import { overview } from '../data/opportunity/case'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AccountExplorer, type ExplorerTarget } from '../components/opportunity/AccountExplorer'
import { DemandAlternativesPanel } from '../components/overview/DemandAlternativesPanel'
import { ResearchConclusion } from '../components/diagrams/ResearchConclusion'
import { DetailDrawer } from '../components/ui/DetailDrawer'
import { SectionedPage } from '../components/ui/SectionedPage'
import { useDrawer } from '../hooks/useDrawer'
import { SNAPSHOT_DATE } from '../data/evidence'
import type { PageIntro } from '../data/types'
import { closing } from '../data/opportunity/closing'
import { opening, sectionLinks } from '../data/opportunity/opening'
import { toneStyles } from '../styles/tones'
import { OpportunityOverview } from './opportunity/OverviewSection'
import { MarketSection } from './opportunity/MarketSection'
import { DemandSection } from './opportunity/DemandSection'
import { CompetitionSection } from './opportunity/CompetitionSection'
import { PartnershipsSection } from './opportunity/PartnershipsSection'
import { StartingPositionSection } from './opportunity/StartingPositionSection'
import { CommercialSection } from './opportunity/CommercialSection'

const panelLabel = 'text-sm font-semibold uppercase tracking-[0.08em] text-slate'

const intro: PageIntro = {
  summary: opening.subtitle,
  status: 'Research snapshot',
  points: opening.assessment.map((line) => ({ text: line.text, dotClass: toneStyles[line.tone].dot })),
}

export function OpportunityPage() {
  useEffect(() => {
    document.title = 'Opportunity · SERAA Wealth Management Strategy'
  }, [])

  const navigate = useNavigate()
  const accountMap = useDrawer<ExplorerTarget>()
  const evidence = useDrawer<true>()

  // The panel closes first, then the page moves to the chapter.
  const goTo = (chapter: string) => {
    evidence.close()
    navigate({ hash: chapter }, { replace: true })
  }

  return (
    <>
      <SectionedPage
        title="Opportunity"
        sections={sectionLinks}
        heading={opening.title}
        intro={intro}
        overview={({ eyebrow }) => (
          <OpportunityOverview
            eyebrow={eyebrow}
            onOpenAccountMap={(opener) => accountMap.open({}, opener)}
            onOpenEvidence={(opener) => evidence.open(true, opener)}
          />
        )}
        railPagerHiddenOn={['market']}
        closing={<ResearchConclusion {...closing} />}
      >
        <MarketSection />
        <DemandSection />
        <CompetitionSection />
        <PartnershipsSection />
        <StartingPositionSection />
        <CommercialSection />
      </SectionedPage>

      <AccountExplorer open={accountMap.value !== null} target={accountMap.value ?? {}} onClose={accountMap.close} returnFocusRef={accountMap.trigger} />

      <DetailDrawer
        open={evidence.value !== null}
        onClose={evidence.close}
        title="Evidence behind the judgement"
        eyebrow={`Supporting evidence · ${SNAPSHOT_DATE}`}
        returnFocusRef={evidence.trigger}
      >
        <div className="space-y-8">
          <section>
            <h3 className={panelLabel}>{overview.evidenceLabel}</h3>
            <ul className="mt-2 divide-y divide-line">
              {overview.evidence.map((item) => (
                <li key={item.name} className="py-2.5 first:pt-0 leading-snug">
                  <span className="font-semibold text-heading">{item.name}: </span>
                  {item.basis}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[0.9375rem] text-slate">{overview.modelNote}</p>
          </section>
          <section>
            <h3 className={panelLabel}>{overview.considerationsLabel}</h3>
            <ul className="mt-2 divide-y divide-line">
              {overview.considerations.map((item) => (
                <li key={item.id} className="py-2.5 first:pt-0 leading-snug">
                  <span className="font-semibold text-heading">{item.label}. </span>
                  {item.text}
                </li>
              ))}
            </ul>
            <p className="mt-3 font-semibold leading-snug text-heading">{overview.boundary}</p>
          </section>
          <DemandAlternativesPanel onGo={goTo} />
        </div>
      </DetailDrawer>
    </>
  )
}
