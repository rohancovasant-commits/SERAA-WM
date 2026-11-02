import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { leadershipDecisions } from '../../data/decisions/decisions'
import { nextStage } from '../../data/decisions/page'
import { commercialComponents, pricingFamilies, pricingUnitsNote } from '../../data/growth/commercial'
import { relationshipTypes } from '../../data/growth/partnerships'
import { decisionsOverview, growthOverview, offeringsOverview, positionOverview } from '../../data/overviews'
import { launchPriority } from '../../data/shared/launchPriority'
import type { SourceId } from '../../data/types'
import { exec } from '../exec/styles'
import { DecisionStatusBadge } from '../decisions/StatusBadges'
import { SourceList } from '../ui/SourceEntry'
import { FindingList, PanelBlock, PanelBullets } from './parts'

/**
 * Detail panels behind the six overviews. They hold what the overviews no longer show: findings, recommendations,
 * qualifications and the full sentences. Each is plain content with an inline source list, so nothing opens on top of it.
 * A chapter link closes the panel first (the page owns that), then moves to the chapter.
 */

function ChapterJump({ children, onClick }: { children: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={exec.link}>
      {children}
      <ArrowRight aria-hidden className="size-4" />
    </button>
  )
}

function Lead({ children }: { children: string }) {
  return <p className="rounded-card bg-wash px-4 py-3 font-semibold leading-snug text-navy">{children}</p>
}

function Sources({ ids }: { ids: SourceId[] }) {
  if (ids.length === 0) return null
  return (
    <section>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-slate">Sources</h3>
      <SourceList ids={ids} />
    </section>
  )
}

/* ---------------------------------------------------------------- Position */

export function PositionWhyPanel({ onGo }: { onGo: (chapter: string) => void }) {
  const { detail } = positionOverview
  return (
    <div className="space-y-7">
      <Lead>{detail.direction.text}</Lead>
      <PanelBlock title={detail.advantagesLabel}>
        <PanelBullets items={detail.advantages} />
        <p className={`mt-3 ${exec.meta}`}>{detail.advantagesNote}</p>
      </PanelBlock>
      <ChapterJump onClick={() => onGo('reasons-to-choose')}>Open Reasons to choose, with competitive context</ChapterJump>
    </div>
  )
}

export function PositionModelPanel({ onGo }: { onGo: (chapter: string) => void }) {
  const { detail, layers, label } = positionOverview
  return (
    <div className="space-y-7">
      <p className="rounded-card bg-wash px-4 py-3 font-semibold leading-snug text-navy">{label}</p>
      <ol className="divide-y divide-line">
        {layers.map((layer) => (
          <li key={layer.id} className="py-3 first:pt-0">
            <p className="font-semibold text-navy">{layer.title}</p>
            <p className="mt-0.5 leading-snug">{detail.layerNotes.find((n) => n.id === layer.id)?.text}</p>
          </li>
        ))}
      </ol>
      <p className={exec.meta}>{detail.modelCaption}</p>
      <FindingList items={detail.findings} />
      <ChapterJump onClick={() => onGo('system-fit')}>Open System fit</ChapterJump>
      <Sources ids={['S31', 'S32']} />
    </div>
  )
}

/* ---------------------------------------------------------------- Offerings */

export function LaunchComparisonPanel() {
  const { detail } = offeringsOverview
  return (
    <div className="space-y-7">
      <Lead>{launchPriority.statement}</Lead>
      <PanelBlock title="Existing positions, unchanged">
        <ul className="divide-y divide-line">
          {launchPriority.currentPositions.map((p) => (
            <li key={p.family} className="py-3 first:pt-0">
              <p className="font-semibold text-navy">
                {p.label} <span className="font-normal text-slate">· {p.position}</span>
              </p>
              <p className="mt-0.5 leading-snug">{p.basis}</p>
            </li>
          ))}
        </ul>
        <p className={`mt-3 ${exec.meta}`}>{launchPriority.note}</p>
      </PanelBlock>
      <PanelBlock title={detail.criteriaLabel}>
        <ul className="divide-y divide-line">
          {launchPriority.comparisonCriteria.map((c) => (
            <li key={c.id} className="py-2.5 first:pt-0">
              <span className="font-semibold text-navy">{c.label}. </span>
              {c.question}
            </li>
          ))}
        </ul>
      </PanelBlock>
      <FindingList items={detail.findings} />
      <p className="font-semibold leading-snug text-navy">{detail.recommendation}</p>
      <p className={exec.meta}>
        The choice is recorded under{' '}
        <Link to={launchPriority.decision.to} className="font-medium text-accent underline underline-offset-4">
          {launchPriority.decision.label}
        </Link>
        .
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ Growth */

export function GrowthCommercialPanel({ onGo }: { onGo: (chapter: string) => void }) {
  const { detail } = growthOverview
  return (
    <div className="space-y-7">
      <Lead>{detail.commercial}</Lead>
      <PanelBlock title="Commercial components">
        <ul className="divide-y divide-line">
          {commercialComponents.map((c) => (
            <li key={c.id} className="py-2.5 first:pt-0">
              <span className="font-semibold text-navy">{c.label}. </span>
              {c.text}
            </li>
          ))}
        </ul>
      </PanelBlock>
      <PanelBlock title="Pricing units to test">
        <ul className="divide-y divide-line">
          {pricingFamilies.map((f) => (
            <li key={f.id} className="py-2.5 first:pt-0">
              <span className="font-semibold text-navy">{f.label}: </span>
              {f.unit}
            </li>
          ))}
        </ul>
        <p className={`mt-2 ${exec.meta}`}>{pricingUnitsNote}</p>
      </PanelBlock>
      <PanelBlock title="Partnerships">
        <p className="font-semibold leading-snug text-navy">{detail.partnership}</p>
        <ul className="mt-3 divide-y divide-line">
          {relationshipTypes.map((r) => (
            <li key={r.id} className="py-2.5 first:pt-0">
              <span className="font-semibold text-navy">{r.label} · </span>
              <span className="text-slate">{r.status}. </span>
              {r.nextAction}
            </li>
          ))}
        </ul>
      </PanelBlock>
      <FindingList items={detail.findings} />
      <p className="font-semibold leading-snug text-navy">{detail.recommendation}</p>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <ChapterJump onClick={() => onGo('commercial-model')}>Open Commercial model</ChapterJump>
        <ChapterJump onClick={() => onGo('partnerships')}>Open Partnerships</ChapterJump>
      </div>
      <Sources ids={['S34', 'S40', 'S12', 'S17', 'S31', 'S32']} />
    </div>
  )
}

export function GrowthCredibilityPanel({ onGo }: { onGo: (chapter: string) => void }) {
  const { detail } = growthOverview
  return (
    <div className="space-y-7">
      <Lead>Proposed: two tracks move together. The business track proves value; the credibility track makes it visible.</Lead>
      <ol className="divide-y divide-line">
        {detail.stages.map((stage, i) => (
          <li key={stage.id} className="py-4 first:pt-0">
            <p className="font-semibold text-navy">
              <span aria-hidden className="mr-2 text-sm text-accent">
                {i + 1}
              </span>
              {stage.label}
            </p>
            <dl className="mt-1.5 space-y-1 leading-snug">
              <div>
                <dt className="inline font-semibold text-slate">Business: </dt>
                <dd className="inline">{stage.business}</dd>
              </div>
              <div>
                <dt className="inline font-semibold text-slate">Credibility: </dt>
                <dd className="inline">{stage.credibility}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
      <FindingList items={detail.findings.filter((f) => f.label === 'Not assumed')} />
      <ChapterJump onClick={() => onGo('approach')}>Open Approach, with the ten proposed directions</ChapterJump>
    </div>
  )
}

/* --------------------------------------------------------------- Decisions */

export function DecisionsOutputsPanel() {
  const { detail } = decisionsOverview
  return (
    <div className="space-y-7">
      <Lead>{detail.cost}</Lead>
      <PanelBlock title={detail.scope.title}>
        <PanelBullets items={detail.scope.items} />
      </PanelBlock>
      <PanelBlock title="The estimate should identify">
        <PanelBullets items={nextStage.costItems} />
        <p className="mt-3 font-semibold leading-snug text-navy">{nextStage.estimateStatement}</p>
      </PanelBlock>
      <PanelBlock title="Milestone outputs · progress not assessed">
        <ol className="divide-y divide-line">
          {detail.milestones.map((m, i) => (
            <li key={m.id} className="py-2.5 first:pt-0">
              <span className="font-semibold text-navy">
                {i + 1}. {m.label}:{' '}
              </span>
              {m.output}
            </li>
          ))}
        </ol>
      </PanelBlock>
      <PanelBlock title="The five decisions">
        <ul className="divide-y divide-line">
          {detail.decisions.map((d) => {
            const full = leadershipDecisions.find((x) => x.id === d.id)
            return (
              <li key={d.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5 first:pt-0">
                <span>
                  <span className="font-semibold text-navy">{d.number}. </span>
                  {full?.shortRecommendation ?? d.label}
                </span>
                <DecisionStatusBadge />
              </li>
            )
          })}
        </ul>
      </PanelBlock>
      <FindingList items={detail.findings} />
      <p>
        <Link to={nextStage.registerTo} className={exec.link}>
          {nextStage.registerLink}
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      </p>
    </div>
  )
}
