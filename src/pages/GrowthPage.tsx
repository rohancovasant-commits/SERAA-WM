import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GrowthCommercialPanel, GrowthCredibilityPanel } from '../components/overview/detailPanels'
import { DetailDrawer } from '../components/ui/DetailDrawer'
import { EvidenceLabel } from '../components/ui/EvidenceLabel'
import { PageClosing } from '../components/ui/PageClosing'
import { SectionedPage } from '../components/ui/SectionedPage'
import { SourceList } from '../components/ui/SourceEntry'
import { useDrawer } from '../hooks/useDrawer'
import type { PageIntro } from '../data/types'
import { SNAPSHOT_DATE } from '../data/evidence'
import { growthClosing, growthHero, growthSections, researchPanel } from '../data/growth/page'
import { GrowthOverview } from './growth/OverviewSection'
import { ApproachSection } from './growth/ApproachSection'
import { SalesSection } from './growth/SalesSection'
import { CommercialSection } from './growth/CommercialSection'
import { PartnershipsSection } from './growth/PartnershipsSection'
import { OwnershipSection } from './growth/OwnershipSection'
import { ScalingSection } from './growth/ScalingSection'

function ResearchList({ title, items, kind }: { title: string; items: string[]; kind: Parameters<typeof EvidenceLabel>[0]['kind'] }) {
  return (
    <section>
      <h3 className="flex flex-wrap items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-slate">
        {title}
        <EvidenceLabel kind={kind} />
      </h3>
      <ul className="mt-2.5 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 leading-snug">
            <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function GrowthPage() {
  const research = useDrawer<true>()
  const commercial = useDrawer<true>()
  const credibility = useDrawer<true>()
  const navigate = useNavigate()

  // A panel closes first, then the page moves to the chapter.
  const goTo = (chapter: string) => {
    commercial.close()
    credibility.close()
    navigate({ hash: chapter }, { replace: true })
  }

  useEffect(() => {
    document.title = 'Growth · SERAA Wealth Management Strategy'
  }, [])

  const intro: PageIntro = {
    summary: growthHero.title,
    status: growthHero.status,
    note: growthHero.note,
    action: { label: growthHero.secondaryAction, onOpen: (opener) => research.open(true, opener) },
  }

  return (
    <>
      <SectionedPage
        title="Growth"
        sections={growthSections}
        heading={growthHero.title}
        intro={intro}
        overview={({ eyebrow }) => (
          <GrowthOverview eyebrow={eyebrow} onOpenCommercial={(opener) => commercial.open(true, opener)} onOpenCredibility={(opener) => credibility.open(true, opener)} />
        )}
        closing={
          <PageClosing
            id="growth-closing"
            eyebrow={growthClosing.eyebrow}
            statement={growthClosing.statement}
            primary={growthClosing.primary}
            secondary={growthClosing.secondary}
          />
        }
      >
        <ApproachSection />
        <SalesSection />
        <CommercialSection />
        <PartnershipsSection />
        <OwnershipSection />
        <ScalingSection />
      </SectionedPage>

      <DetailDrawer open={commercial.value !== null} onClose={commercial.close} title="Commercial & partnership plan" eyebrow="Growth · pricing hypothesis" returnFocusRef={commercial.trigger}>
        <GrowthCommercialPanel onGo={goTo} />
      </DetailDrawer>

      <DetailDrawer open={credibility.value !== null} onClose={credibility.close} title="Credibility plan" eyebrow="Growth · proposed" returnFocusRef={credibility.trigger}>
        <GrowthCredibilityPanel onGo={goTo} />
      </DetailDrawer>

      <DetailDrawer
        open={research.value !== null}
        onClose={research.close}
        title={researchPanel.title}
        eyebrow={`Research date · ${SNAPSHOT_DATE}`}
        returnFocusRef={research.trigger}
      >
        <div className="space-y-7">
          <p className="rounded-card bg-wash px-4 py-3 leading-snug">{researchPanel.intro}</p>
          <ResearchList title="Published by others" items={researchPanel.published} kind="vendor" />
          <ResearchList title="Our own starting points" items={researchPanel.internal} kind="internal" />
          <ResearchList title="Still to prove" items={researchPanel.toValidate} kind="validate" />
          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-slate">Sources</h3>
            <SourceList ids={researchPanel.sourceIds} />
          </section>
        </div>
      </DetailDrawer>
    </>
  )
}
