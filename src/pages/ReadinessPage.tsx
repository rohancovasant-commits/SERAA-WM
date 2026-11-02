import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DetailDrawer } from '../components/ui/DetailDrawer'
import { PageClosing } from '../components/ui/PageClosing'
import { SectionedPage } from '../components/ui/SectionedPage'
import { AssessmentExplorer } from '../components/readiness/AssessmentExplorer'
import { RatingsMethod } from '../components/readiness/RatingsMethod'
import { StartingPointsPanel } from '../components/overview/StartingPointsPanel'
import { useExplorer } from '../components/readiness/useExplorer'
import { exec } from '../components/exec/styles'
import { useDrawer } from '../hooks/useDrawer'
import type { PageIntro } from '../data/types'
import { SNAPSHOT_DATE } from '../data/evidence'
import { assessmentCopy, legacyAnchors, overviewCopy, ratingsPanel, readinessClosing, readinessHero, readinessSections } from '../data/readiness/page'
import { requirements, type DimensionId } from '../data/readiness/requirements'
import { ReadinessOverview } from './readiness/ReadinessOverview'
import { AssessmentSection } from './readiness/AssessmentSection'
import { CommitmentSection } from './readiness/CommitmentSection'
import { ActionsSection } from './readiness/ActionsSection'

export function ReadinessPage() {
  const navigate = useNavigate()
  const { hash } = useLocation()
  const ratings = useDrawer<true>()
  const startingPoints = useDrawer<string>()
  const requirementsPanel = useDrawer<true>()
  const explorer = useExplorer()

  useEffect(() => {
    document.title = 'Readiness · SERAA Wealth Management Strategy'
  }, [])

  // Old chapter anchors land on the chapter that now carries their content.
  useEffect(() => {
    const target = legacyAnchors[hash.slice(1)]
    if (target) navigate({ hash: target }, { replace: true })
  }, [hash, navigate])

  // Opening from a named starting point scrolls the panel to that entry.
  const startId = startingPoints.value
  useEffect(() => {
    if (!startId) return
    const timer = window.setTimeout(() => document.getElementById(`start-${startId}`)?.scrollIntoView({ block: 'start' }), 60)
    return () => window.clearTimeout(timer)
  }, [startId])

  const goTo = (id: string) => {
    navigate({ hash: id }, { replace: true })
  }

  // One requirements panel serves the capability areas and the commitment checks.
  const inspectArea = (dimension: DimensionId, opener: HTMLElement) => {
    explorer.selectDimension(dimension)
    requirementsPanel.open(true, opener)
  }
  const openRequirement = (id: string, opener?: HTMLElement) => {
    const requirement = requirements.find((r) => r.id === id)
    if (!requirement) return
    explorer.selectDimension(requirement.dimension)
    explorer.select(id)
    requirementsPanel.open(true, opener)
  }

  const intro: PageIntro = {
    summary: readinessHero.title,
    status: readinessHero.status,
    note: readinessHero.note,
    action: { label: readinessHero.secondaryAction, onOpen: (opener) => ratings.open(true, opener) },
  }

  return (
    <>
      <SectionedPage
        title="Readiness"
        sections={readinessSections}
        heading={readinessHero.title}
        intro={intro}
        overview={({ eyebrow, select }) => (
          <ReadinessOverview eyebrow={eyebrow} onOpenStartingPoints={(opener, id) => startingPoints.open(id ?? '', opener)} onGo={select} />
        )}
        closing={
          <PageClosing
            id="readiness-closing"
            eyebrow="Readiness principle"
            statement={readinessClosing.statement}
            primary={readinessClosing.primary}
            secondary={readinessClosing.secondary}
          />
        }
      >
        <AssessmentSection onInspect={inspectArea} />
        <CommitmentSection onOpenRequirement={openRequirement} />
        <ActionsSection />
      </SectionedPage>

      <DetailDrawer
        open={startingPoints.value !== null}
        onClose={startingPoints.close}
        title="Starting-point evidence"
        eyebrow={`Initial evidence review · ${SNAPSHOT_DATE}`}
        returnFocusRef={startingPoints.trigger}
      >
        <StartingPointsPanel
          onGoToRequests={() => {
            startingPoints.close()
            goTo('actions')
          }}
        />
        <section className="mt-8 border-t border-line pt-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate">{overviewCopy.panelNotes.label}</h3>
          <ul className="mt-3 space-y-2">
            {overviewCopy.panelNotes.items.map((item) => (
              <li key={item} className="flex gap-2.5 leading-snug">
                <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </DetailDrawer>

      <DetailDrawer
        open={requirementsPanel.value !== null}
        onClose={requirementsPanel.close}
        title={assessmentCopy.panelTitle}
        eyebrow={`Initial evidence review · ${SNAPSHOT_DATE}`}
        returnFocusRef={requirementsPanel.trigger}
        wide
      >
        <p className={`mb-5 ${exec.meta}`}>{requirements.length} requirements, each rated on its own evidence. Ratings are never averaged or scored.</p>
        <AssessmentExplorer explorer={explorer} />
      </DetailDrawer>

      <DetailDrawer
        open={ratings.value !== null}
        onClose={ratings.close}
        title={ratingsPanel.title}
        eyebrow={`Initial evidence review · ${SNAPSHOT_DATE}`}
        returnFocusRef={ratings.trigger}
        wide
      >
        <RatingsMethod />
      </DetailDrawer>
    </>
  )
}
