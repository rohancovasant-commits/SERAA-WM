import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DetailDrawer } from '../components/ui/DetailDrawer'
import { EvidenceLabel } from '../components/ui/EvidenceLabel'
import { SectionedPage } from '../components/ui/SectionedPage'
import { SourceList } from '../components/ui/SourceEntry'
import { useDrawer } from '../hooks/useDrawer'
import type { PageIntro } from '../data/types'
import { SNAPSHOT_DATE } from '../data/evidence'
import { legacyAnchors, positionHero, positionSections, researchPanel } from '../data/position/page'
import { modelComparison, overview as overviewCopy } from '../data/position/content'
import { alternatives, directionResearch } from '../data/position/direction'
import { exec } from '../components/exec/styles'
import { PositionOverview } from './position/OverviewSection'
import { CustomersSection } from './position/CustomersSection'
import { OfferSection } from './position/OfferSection'
import { SystemFitSection } from './position/SystemFitSection'
import { ReasonsSection } from './position/ReasonsSection'

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

export function PositionPage() {
  const research = useDrawer<true>()
  const model = useDrawer<true>()
  const navigate = useNavigate()
  const { hash } = useLocation()

  useEffect(() => {
    document.title = 'Position · SERAA Wealth Management Strategy'
  }, [])

  // Old chapter anchors land on the chapter that now carries their content.
  useEffect(() => {
    const target = legacyAnchors[hash.slice(1)]
    if (target) navigate({ hash: target }, { replace: true })
  }, [hash, navigate])

  const intro: PageIntro = {
    summary: positionHero.titleLines.join(' '),
    status: positionHero.status,
    action: { label: positionHero.secondaryAction, onOpen: (opener) => research.open(true, opener) },
  }

  return (
    <>
      <SectionedPage
        title="Position"
        sections={positionSections}
        heading={positionHero.titleLines.join(' ')}
        intro={intro}
        overview={({ eyebrow }) => (
          <PositionOverview eyebrow={eyebrow} onOpenModel={(opener) => model.open(true, opener)} onOpenEvidence={(opener) => research.open(true, opener)} />
        )}
      >
        <CustomersSection />
        <OfferSection />
        <SystemFitSection />
        <ReasonsSection />
      </SectionedPage>

      <DetailDrawer open={model.value !== null} onClose={model.close} title={overviewCopy.buttons.model} eyebrow="Position · delivery model" returnFocusRef={model.trigger}>
        <div className="space-y-8">
          <p className="rounded-card bg-wash px-4 py-3 leading-snug">{modelComparison.intro}</p>
          <ul className="divide-y divide-line">
            {modelComparison.options.map((o) => (
              <li key={o.id} className="py-3 first:pt-0">
                <p className="font-semibold text-heading">{o.title}</p>
                <p className="mt-1 leading-snug">
                  <span className="font-semibold">Gains: </span>
                  {o.gains}
                </p>
                <p className="mt-0.5 leading-snug">
                  <span className="font-semibold">Trade-off: </span>
                  {o.costs}
                </p>
              </li>
            ))}
          </ul>
          <p className={exec.meta}>{modelComparison.note}</p>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate">Wider alternatives</h3>
            <ul className="mt-2 divide-y divide-line">
              {alternatives.map((a) => (
                <li key={a.id} className="py-3 first:pt-0">
                  <p className="font-semibold text-heading">{a.title}</p>
                  <p className="mt-0.5 leading-snug">{a.purchase}</p>
                  <p className={`mt-0.5 ${exec.meta}`}>{a.tradeoff}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate">{directionResearch.heading}</h3>
            <ul className="mt-2 space-y-1.5">
              {directionResearch.points.map((p) => (
                <li key={p} className="flex gap-2.5 leading-snug">
                  <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[0.9375rem] font-medium leading-snug">{directionResearch.caveat}</p>
            <div className="mt-3">
              <SourceList ids={directionResearch.sourceIds} />
            </div>
          </section>
        </div>
      </DetailDrawer>

      <DetailDrawer
        open={research.value !== null}
        onClose={research.close}
        title={researchPanel.title}
        eyebrow={`Research snapshot · ${SNAPSHOT_DATE}`}
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
