import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ExpansionDetails, OwnershipDetails, PursuitDetails } from '../components/growth/GrowthDetails'
import { DetailDrawer } from '../components/ui/DetailDrawer'
import { EvidenceLabel } from '../components/ui/EvidenceLabel'
import { PageClosing } from '../components/ui/PageClosing'
import { Section } from '../components/ui/Section'
import { SectionedPage } from '../components/ui/SectionedPage'
import { SourceList } from '../components/ui/SourceEntry'
import { useDrawer } from '../hooks/useDrawer'
import type { PageIntro } from '../data/types'
import { SNAPSHOT_DATE } from '../data/evidence'
import { firstSlideLabel, growthClosing, growthHero, growthSections, legacyAnchors, researchPanel } from '../data/growth/page'
import { growthPanels } from '../data/growth/slides'
import { ExpandWhatWorks, OrganiseToGrow, WinFirstOffer } from './growth/GrowthSlides'

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

/**
 * Growth: three slides (win the first offer, expand what works, organise to grow). Supporting material for each slide
 * is one click away in its own panel; no panel opens from inside another.
 */
export function GrowthPage() {
  const research = useDrawer<true>()
  const pursuit = useDrawer<true>()
  const expansion = useDrawer<true>()
  const ownership = useDrawer<true>()
  const navigate = useNavigate()
  const { hash } = useLocation()

  useEffect(() => {
    document.title = 'Growth · SERAA Wealth Management Strategy'
  }, [])

  // Old chapter anchors land on the slide that now carries their content.
  useEffect(() => {
    const target = legacyAnchors[hash.slice(1)]
    if (target) navigate({ hash: target }, { replace: true })
  }, [hash, navigate])

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
        introLabel={firstSlideLabel}
        overview={({ eyebrow }) => (
          <Section id="introduction" headingId="introduction-title" surface="warm">
            <WinFirstOffer eyebrow={eyebrow} onOpenDetails={(opener) => pursuit.open(true, opener)} />
          </Section>
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
        <ExpandWhatWorks onOpenDetails={(opener) => expansion.open(true, opener)} />
        <OrganiseToGrow onOpenDetails={(opener) => ownership.open(true, opener)} />
      </SectionedPage>

      <DetailDrawer open={pursuit.value !== null} onClose={pursuit.close} title={growthPanels.pursuit.title} eyebrow={growthPanels.pursuit.eyebrow} returnFocusRef={pursuit.trigger}>
        <PursuitDetails />
      </DetailDrawer>

      <DetailDrawer open={expansion.value !== null} onClose={expansion.close} title={growthPanels.expansion.title} eyebrow={growthPanels.expansion.eyebrow} returnFocusRef={expansion.trigger}>
        <ExpansionDetails />
      </DetailDrawer>

      <DetailDrawer open={ownership.value !== null} onClose={ownership.close} title={growthPanels.ownership.title} eyebrow={growthPanels.ownership.eyebrow} returnFocusRef={ownership.trigger}>
        <OwnershipDetails />
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
