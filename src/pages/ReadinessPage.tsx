import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DetailDrawer } from '../components/ui/DetailDrawer'
import { PageClosing } from '../components/ui/PageClosing'
import { Section } from '../components/ui/Section'
import { SourceList } from '../components/ui/SourceEntry'
import { RatingBadge } from '../components/readiness/RatingBadge'
import { RatingsMethod } from '../components/readiness/RatingsMethod'
import { ReadinessRail } from '../components/readiness/ReadinessRail'
import { SupportingAssessment } from '../components/readiness/SupportingAssessment'
import { StartingPointsPanel } from '../components/overview/StartingPointsPanel'
import { useExplorer } from '../components/readiness/useExplorer'
import { exec } from '../components/exec/styles'
import { useDrawer } from '../hooks/useDrawer'
import type { SourceId } from '../data/types'
import { SNAPSHOT_DATE } from '../data/evidence'
import { capabilityQuestions as cq, legacyAnchors, overviewCopy, ratingsPanel, readinessClosing, type SupportingTab } from '../data/readiness/page'
import { requirements } from '../data/readiness/requirements'
import { ReadinessOverview } from './readiness/ReadinessOverview'

const label = 'text-sm font-semibold uppercase tracking-[0.08em] text-slate'

/**
 * Readiness: one executive slide. The detailed assessment, the five capability questions and the rating methodology
 * are separate panels; each opens from the slide or the rail, and none opens from inside another (so no nested dialogs).
 */
export function ReadinessPage() {
  const navigate = useNavigate()
  const { hash } = useLocation()
  const startingPoints = useDrawer<string>()
  const questions = useDrawer<true>()
  const supporting = useDrawer<true>()
  const ratings = useDrawer<true>()
  const [tab, setTab] = useState<SupportingTab>('areas')
  const explorer = useExplorer()

  useEffect(() => {
    document.title = 'Readiness · SERAA Wealth Management Strategy'
  }, [])

  // Old chapter anchors (and links from other pages) open the supporting assessment on the tab that now carries them.
  useEffect(() => {
    const target = legacyAnchors[hash.slice(1)]
    if (!target) return
    setTab(target)
    supporting.open(true, document.activeElement as HTMLElement | null)
    navigate({ hash: '' }, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, navigate])

  // Opening from a named starting point scrolls the panel to that entry.
  const startId = startingPoints.value
  useEffect(() => {
    if (!startId) return
    const timer = window.setTimeout(() => document.getElementById(`start-${startId}`)?.scrollIntoView({ block: 'start' }), 60)
    return () => window.clearTimeout(timer)
  }, [startId])

  const openSupporting = (opener?: HTMLElement | null, next?: SupportingTab) => {
    if (next) setTab(next)
    supporting.open(true, opener)
  }

  // From the questions panel: close it, then open the supporting assessment on that requirement.
  const openRequirement = (id: string) => {
    const requirement = requirements.find((r) => r.id === id)
    if (!requirement) return
    explorer.selectDimension(requirement.dimension)
    explorer.select(id)
    const opener = questions.trigger.current
    questions.close()
    openSupporting(opener, 'requirements')
  }

  const questionSources = Array.from(
    new Set<SourceId>(requirements.filter((r) => cq.items.some((q) => q.refs.includes(r.id))).flatMap((r) => r.sourceIds)),
  )

  return (
    <>
      <div className="xl:flex">
        <ReadinessRail onOpenSupporting={(opener) => openSupporting(opener, 'areas')} onOpenRatings={(opener) => ratings.open(true, opener)} />
        <div className="min-w-0 flex-1">
          <Section id="introduction" headingId="introduction-title" surface="warm">
            <ReadinessOverview
              eyebrow="04 / Readiness"
              onOpenStartingPoints={(opener, id) => startingPoints.open(id ?? '', opener)}
              onOpenQuestions={(opener) => questions.open(true, opener)}
              onOpenSupporting={(opener) => openSupporting(opener, 'areas')}
            />
          </Section>
        </div>
      </div>

      <PageClosing
        id="readiness-closing"
        eyebrow="Readiness principle"
        statement={readinessClosing.statement}
        primary={readinessClosing.primary}
        secondary={readinessClosing.secondary}
      />

      <DetailDrawer
        open={startingPoints.value !== null}
        onClose={startingPoints.close}
        title="Starting-point evidence"
        eyebrow={`Initial evidence review · ${SNAPSHOT_DATE}`}
        returnFocusRef={startingPoints.trigger}
      >
        <StartingPointsPanel
          onGoToRequests={() => {
            const opener = startingPoints.trigger.current
            startingPoints.close()
            openSupporting(opener, 'requests')
          }}
        />
        {overviewCopy.panelNotes.map((group) => (
          <section key={group.label} className="mt-8 border-t border-line pt-6">
            <h3 className={label}>{group.label}</h3>
            <ul className="mt-3 space-y-2">
              {group.items.map((item) => (
                <li key={item} className="flex gap-2.5 leading-snug">
                  <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </DetailDrawer>

      <DetailDrawer open={questions.value !== null} onClose={questions.close} title={cq.title} eyebrow={cq.eyebrow} returnFocusRef={questions.trigger}>
        <div className="space-y-8">
          <p className="rounded-card bg-wash px-4 py-3 leading-snug">{cq.intro}</p>
          <ol className="divide-y divide-line border-y border-line">
            {cq.items.map((q, i) => {
              const refs = requirements.filter((r) => q.refs.includes(r.id))
              return (
                <li key={q.id} className="py-5">
                  <h3 className="text-lg font-bold leading-snug text-heading">
                    {i + 1}. {q.title}
                  </h3>
                  <p className="mt-1 leading-snug">{q.question}</p>
                  <p className="mt-2 text-[0.9375rem] font-semibold text-heading">
                    Status: {cq.status}
                    <span className="font-normal text-slate"> · evidence is insufficient to answer for a selected workflow</span>
                  </p>
                  <p className={`mt-2 ${exec.meta}`}>Existing evidence</p>
                  <ul className="mt-1 space-y-1">
                    {refs.map((r) => (
                      <li key={r.id} className="text-[0.9375rem] leading-snug">
                        <span className="font-semibold text-accent-strong">{r.id}</span> {r.currentEvidence}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-3 divide-y divide-line-soft border-y border-line">
                    {refs.map((r) => (
                      <li key={r.id}>
                        <button
                          type="button"
                          onClick={() => openRequirement(r.id)}
                          className="flex w-full flex-wrap items-center gap-x-3 gap-y-1.5 py-2.5 text-left hover:bg-wash"
                        >
                          <span className="w-8 shrink-0 text-sm font-bold text-accent-strong">{r.id}</span>
                          <span className="min-w-0 flex-1 basis-48 text-[0.9375rem] font-semibold leading-snug text-heading">{r.title}</span>
                          <RatingBadge rating={r.rating} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
          <section>
            <h3 className={label}>{cq.outcomesLabel}</h3>
            <ul className="mt-2 space-y-2">
              {cq.outcomes.map((o) => (
                <li key={o} className="flex gap-2.5 leading-snug">
                  <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
                  {o}
                </li>
              ))}
            </ul>
          </section>
          {questionSources.length > 0 && (
            <section>
              <h3 className={label}>Sources</h3>
              <div className="mt-3">
                <SourceList ids={questionSources} />
              </div>
            </section>
          )}
        </div>
      </DetailDrawer>

      <DetailDrawer
        open={supporting.value !== null}
        onClose={supporting.close}
        title="Supporting assessment"
        eyebrow={`Initial evidence review · ${SNAPSHOT_DATE}`}
        returnFocusRef={supporting.trigger}
        wide
      >
        <SupportingAssessment explorer={explorer} tab={tab} onTab={setTab} />
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
