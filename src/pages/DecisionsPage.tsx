import { useEffect } from 'react'
import { DecisionsOutputsPanel } from '../components/overview/detailPanels'
import { DetailDrawer } from '../components/ui/DetailDrawer'
import { PageClosing } from '../components/ui/PageClosing'
import { SectionedPage } from '../components/ui/SectionedPage'
import { SourceList } from '../components/ui/SourceEntry'
import { useDrawer } from '../hooks/useDrawer'
import type { PageIntro } from '../data/types'
import { SNAPSHOT_DATE } from '../data/evidence'
import { decisionsClosing, decisionsHero, decisionsSections, evidencePanel } from '../data/decisions/page'
import { DecisionsOverview } from './decisions/DecisionsOverview'
import { OverviewSection } from './decisions/OverviewSection'
import { DecisionsSection } from './decisions/DecisionsSection'
import { RoadmapSection } from './decisions/RoadmapSection'
import { NextReviewSection } from './decisions/NextReviewSection'
import { RecordSection } from './decisions/RecordSection'

export function DecisionsPage() {
  const evidence = useDrawer<true>()
  const outputs = useDrawer<true>()

  useEffect(() => {
    document.title = 'Decisions · SERAA Wealth Management Strategy'
  }, [])

  const intro: PageIntro = {
    summary: decisionsHero.title,
    status: decisionsHero.status,
    note: decisionsHero.note,
    action: { label: evidencePanel.button, onOpen: (opener) => evidence.open(true, opener) },
  }

  return (
    <>
      <SectionedPage
        title="Decisions"
        sections={decisionsSections}
        heading={decisionsHero.title}
        intro={intro}
        overview={({ eyebrow, select }) => (
          <DecisionsOverview eyebrow={eyebrow} select={select} onOpenOutputs={(opener) => outputs.open(true, opener)} />
        )}
        closing={
          <PageClosing
            id="decisions-closing"
            eyebrow={decisionsClosing.eyebrow}
            statement={decisionsClosing.statement}
            primary={decisionsClosing.primary}
            secondary={decisionsClosing.secondary}
          />
        }
      >
        <OverviewSection onOpenEvidence={(opener) => evidence.open(true, opener)} />
        <DecisionsSection />
        <RoadmapSection />
        <NextReviewSection />
        <RecordSection />
      </SectionedPage>

      <DetailDrawer open={outputs.value !== null} onClose={outputs.close} title="Outputs & assumptions" eyebrow="Decisions · proposed next stage" returnFocusRef={outputs.trigger}>
        <DecisionsOutputsPanel />
      </DetailDrawer>

      <DetailDrawer
        open={evidence.value !== null}
        onClose={evidence.close}
        title={evidencePanel.title}
        eyebrow={`Research date · ${SNAPSHOT_DATE}`}
        returnFocusRef={evidence.trigger}
      >
        <div className="space-y-7">
          <p className="rounded-card bg-wash px-4 py-3 leading-snug">{evidencePanel.intro}</p>
          <ul className="space-y-2">
            {evidencePanel.notes.map((note) => (
              <li key={note} className="flex gap-2.5 leading-snug">
                <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
                {note}
              </li>
            ))}
          </ul>
          {evidencePanel.sourceGroups.map((group) => (
            <section key={group.title}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-slate">{group.title}</h3>
              <SourceList ids={group.ids} />
            </section>
          ))}
        </div>
      </DetailDrawer>
    </>
  )
}
