import { useEffect, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BookOpen, ListChecks } from 'lucide-react'
import { DecisionRegister } from '../components/decisions/DecisionRegister'
import { DecisionsExplorer } from '../components/decisions/DecisionsExplorer'
import { DocumentTrio } from '../components/decisions/DocumentTrio'
import { MilestoneRoadmap } from '../components/decisions/MilestoneRoadmap'
import { NextReviewPack } from '../components/decisions/NextReviewPack'
import { ReviewOutcomes } from '../components/decisions/ReviewOutcomes'
import { Statement } from '../components/decisions/StatementLabel'
import { exec } from '../components/exec/styles'
import { SlideRail } from '../components/navigation/SlideRail'
import { actionClass } from '../components/ui/actionClass'
import { DetailDrawer } from '../components/ui/DetailDrawer'
import { Section } from '../components/ui/Section'
import { SourceList } from '../components/ui/SourceEntry'
import { ExecHeader } from '../components/exec/ExecHeader'
import { useDrawer } from '../hooks/useDrawer'
import { SNAPSHOT_DATE } from '../data/evidence'
import { evidencePanel, nextStage, overview } from '../data/decisions/page'
import { detailsTabs, legacyAnchors, roadmapTabs, slide, type DetailsTab, type RoadmapTab } from '../data/decisions/slide'
import type { StatementKind } from '../data/decisions/types'

const kinds: StatementKind[] = ['know', 'recommend', 'decide']
const label = 'text-[0.75rem] font-bold uppercase tracking-[0.14em]'

/** Accessible tabs inside one panel (arrow keys, Home and End). Keeps each panel a single dialog. */
function Tabs<T extends string>({ name, tabs, tab, onTab, children }: { name: string; tabs: { id: T; label: string }[]; tab: T; onTab: (t: T) => void; children: ReactNode }) {
  const onKey = (event: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = tabs.length - 1
    const next = event.key === 'ArrowRight' ? (i + 1) % (last + 1) : event.key === 'ArrowLeft' ? (i + last) % (last + 1) : event.key === 'Home' ? 0 : event.key === 'End' ? last : -1
    if (next < 0) return
    event.preventDefault()
    onTab(tabs[next].id)
    document.getElementById(`${name}-tab-${tabs[next].id}`)?.focus()
  }
  return (
    <div>
      <div role="tablist" aria-label={name} className="flex flex-wrap gap-2 border-b border-line pb-3">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            id={`${name}-tab-${t.id}`}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            aria-controls={`${name}-panel`}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => onTab(t.id)}
            onKeyDown={(event) => onKey(event, i)}
            className={`rounded-full border px-4 py-1.5 text-[0.9375rem] font-semibold transition-colors ${
              tab === t.id ? 'border-navy bg-navy text-white' : 'border-navy/20 bg-white text-navy hover:border-accent hover:text-accent'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div id={`${name}-panel`} role="tabpanel" aria-labelledby={`${name}-tab-${tab}`} className="mt-6">
        {children}
      </div>
    </div>
  )
}

/**
 * Decisions: one closing slide. The three requests are the main visual; the proposals, record, roadmap and next-review
 * requirements sit in two supporting panels. Viewing a proposal records nothing, and there is no approval control.
 */
export function DecisionsPage() {
  const navigate = useNavigate()
  const { hash } = useLocation()
  const details = useDrawer<true>()
  const roadmap = useDrawer<true>()
  const [detailsTab, setDetailsTab] = useState<DetailsTab>('proposals')
  const [roadmapTab, setRoadmapTab] = useState<RoadmapTab>('roadmap')

  useEffect(() => {
    document.title = 'Decisions · SERAA Wealth Management Strategy'
  }, [])

  // Old chapter anchors open the supporting panel that now carries their content.
  useEffect(() => {
    const target = legacyAnchors[hash.slice(1)]
    if (!target) return
    const opener = document.activeElement as HTMLElement | null
    if (target.panel === 'details') {
      setDetailsTab(target.tab as DetailsTab)
      details.open(true, opener)
    } else {
      setRoadmapTab(target.tab as RoadmapTab)
      roadmap.open(true, opener)
    }
    navigate({ hash: '' }, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, navigate])

  const openDetails = (opener: HTMLElement) => {
    setDetailsTab('proposals')
    details.open(true, opener)
  }
  const openRoadmap = (opener: HTMLElement) => {
    setRoadmapTab('roadmap')
    roadmap.open(true, opener)
  }

  return (
    <>
      <div className="xl:flex">
        <SlideRail
          number="06"
          title="Decisions"
          actions={[
            { label: slide.buttons.details, icon: ListChecks, onOpen: openDetails },
            { label: slide.buttons.roadmap, icon: BookOpen, onOpen: openRoadmap },
          ]}
        />
        <div className="min-w-0 flex-1">
          <Section id="introduction" headingId="introduction-title" surface="warm">
            <ExecHeader id="introduction-title" eyebrow="06 / Decisions" title={slide.headline} wide />

            <ol className="mt-8 grid gap-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
              {slide.asks.map((a, i) => (
                <li key={a.id} className="md:px-8 md:first:pl-0 md:last:pr-0">
                  <span aria-hidden className="text-5xl font-bold leading-none text-accent">
                    {i + 1}
                  </span>
                  <h2 className={`mt-3 ${label} text-slate`}>{a.label}</h2>
                  <p className="mt-2 text-xl font-semibold leading-snug text-heading">{a.text}</p>
                </li>
              ))}
            </ol>

            <section aria-labelledby="review-label" className="mt-8 border-t border-line pt-5">
              <h2 id="review-label" className={`${label} text-slate`}>
                {slide.reviewLabel}
              </h2>
              <ul className="mt-3 grid gap-3 md:grid-cols-3 md:gap-8">
                {slide.questions.map((q) => (
                  <li key={q} className="flex gap-2.5 text-lg leading-snug text-heading">
                    <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" />
                    {q}
                  </li>
                ))}
              </ul>
            </section>

            <p className="mt-8 rounded-[12px] bg-navy px-6 py-5 text-xl font-bold leading-snug text-white sm:px-8">{slide.takeaway}</p>
            <p className={`mt-3 ${exec.meta}`}>{slide.note}</p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button type="button" aria-haspopup="dialog" onClick={(event) => openDetails(event.currentTarget)} className={actionClass('secondary')}>
                {slide.buttons.details}
              </button>
              <button type="button" aria-haspopup="dialog" onClick={(event) => openRoadmap(event.currentTarget)} className={actionClass('secondary')}>
                {slide.buttons.roadmap}
              </button>
            </div>
          </Section>
        </div>
      </div>

      <DetailDrawer open={details.value !== null} onClose={details.close} title={slide.buttons.details} eyebrow="Decisions · proposals for review" returnFocusRef={details.trigger} wide>
        <p className="mb-5 rounded-card bg-wash px-4 py-3 leading-snug">Proposals only. Viewing a proposal records nothing, and no endorsement or funding is implied.</p>
        <Tabs name="Decision details" tabs={detailsTabs} tab={detailsTab} onTab={setDetailsTab}>
          {detailsTab === 'proposals' && <DecisionsExplorer />}
          {detailsTab === 'record' && <DecisionRegister />}
          {detailsTab === 'read' && (
            <div className="space-y-8">
              <p className="border-l-4 border-accent pl-5 text-xl font-bold leading-snug text-navy">{overview.recommendation}</p>
              <DocumentTrio />
              <div>
                <h3 className="text-xl font-bold text-navy">{overview.exampleHeading}</h3>
                <div className="mt-4 grid gap-4">
                  {kinds.map((kind) => (
                    <Statement key={kind} kind={kind} withMeaning>
                      {overview.example[kind]}
                    </Statement>
                  ))}
                </div>
              </div>
              <p className={exec.meta}>{overview.note}</p>
            </div>
          )}
          {detailsTab === 'sources' && (
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
              <p className={exec.meta}>Research date {SNAPSHOT_DATE}.</p>
              {evidencePanel.sourceGroups.map((group) => (
                <section key={group.title}>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-slate">{group.title}</h3>
                  <SourceList ids={group.ids} />
                </section>
              ))}
            </div>
          )}
        </Tabs>
      </DetailDrawer>

      <DetailDrawer open={roadmap.value !== null} onClose={roadmap.close} title={slide.buttons.roadmap} eyebrow="Decisions · proposed next stage" returnFocusRef={roadmap.trigger} wide>
        <Tabs name="Roadmap and next review" tabs={roadmapTabs} tab={roadmapTab} onTab={setRoadmapTab}>
          {roadmapTab === 'roadmap' && <MilestoneRoadmap />}
          {roadmapTab === 'review' && (
            <div className="space-y-10">
              <section className="space-y-4">
                <p className="rounded-card bg-wash px-4 py-3 leading-snug">{nextStage.sponsorship}</p>
                <h3 className="text-lg font-bold text-heading">{nextStage.title}</h3>
                <ul className="space-y-2">
                  {nextStage.outputs.map((o) => (
                    <li key={o} className="flex gap-2.5 leading-snug">
                      <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
                      {o}
                    </li>
                  ))}
                </ul>
                <h3 className="text-lg font-bold text-heading">{nextStage.costLabel}</h3>
                <ul className="space-y-2">
                  {nextStage.costItems.map((o) => (
                    <li key={o} className="flex gap-2.5 leading-snug">
                      <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
                      {o}
                    </li>
                  ))}
                </ul>
                <p className="font-semibold leading-snug text-navy">{nextStage.estimateStatement}</p>
                <Link to={nextStage.registerTo} className={exec.link}>
                  {nextStage.registerLink}
                </Link>
              </section>
              <NextReviewPack />
              <ReviewOutcomes />
            </div>
          )}
        </Tabs>
      </DetailDrawer>
    </>
  )
}
