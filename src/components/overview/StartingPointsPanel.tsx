import { ArrowRight } from 'lucide-react'
import { initiativeSummary } from '../../data/readiness/initiatives'
import { readinessOverview } from '../../data/overviews'
import { startingPointRegister, startingPoints } from '../../data/shared/startingPoints'
import { exec } from '../exec/styles'
import { EvidenceLabel } from '../ui/EvidenceLabel'
import { SourceList } from '../ui/SourceEntry'
import type { SourceId } from '../../data/types'
import { FindingList } from './parts'

const heading = 'text-sm font-semibold uppercase tracking-[0.08em] text-slate'

/**
 * Body of the starting-point evidence panel: the one full statement of Motilal, Centrum and Liquidity Pulse. Other pages
 * refer to it briefly. It rests on team descriptions and discovery material, and claims no customers or deployments.
 */
export function StartingPointsPanel({ onGoToRequests }: { onGoToRequests: () => void }) {
  const sourceIds = Array.from(new Set<SourceId>(startingPoints.flatMap((p) => p.sourceIds)))
  return (
    <div className="space-y-7">
      <p className="rounded-card bg-wash px-4 py-3 leading-snug">{startingPointRegister.statement}</p>
      <p className="font-semibold leading-snug text-navy">{readinessOverview.detail.qualification}</p>
      <FindingList items={readinessOverview.detail.findings.filter((f) => f.label === 'Starting assets')} />
      <p className={exec.meta}>{startingPointRegister.reviewBasis}</p>

      <ul className="divide-y divide-line">
        {startingPoints.map((point) => (
          <li key={point.id} id={`start-${point.id}`} className="scroll-mt-4 py-5 first:pt-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="text-lg font-semibold text-navy">{point.name}</h3>
              <EvidenceLabel kind={point.evidenceKind} />
            </div>
            <p className="mt-0.5 text-sm font-semibold uppercase tracking-[0.08em] text-slate">{point.activityType}</p>
            <dl className="mt-3 space-y-3 text-[0.9375rem] leading-snug">
              <div>
                <dt className="font-semibold text-navy">{startingPointRegister.columns.status}</dt>
                <dd className="mt-0.5">{point.reportedStatus}</dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">{startingPointRegister.columns.evidence}</dt>
                <dd className="mt-0.5 space-y-1">
                  {point.evidenceReviewed.map((e) => (
                    <p key={e}>{e}</p>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">{startingPointRegister.columns.limitation}</dt>
                <dd className="mt-0.5">{point.materialLimitation}</dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">{startingPointRegister.columns.next}</dt>
                <dd className="mt-0.5">{point.nextAction}</dd>
              </div>
              <div className="text-slate">
                Proposed owner role: {point.proposedOwnerRole}. Named owner TBC. Related requirements: {point.readinessRefs.join(', ')}.
              </div>
            </dl>
          </li>
        ))}
      </ul>

      <section>
        <h3 className={heading}>Not established</h3>
        <ul className="mt-2 space-y-1.5">
          {startingPointRegister.notEstablished.map((item) => (
            <li key={item} className="flex gap-2.5 leading-snug">
              <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <ul className="space-y-2.5">
        {initiativeSummary.drawer.rules.map((rule) => (
          <li key={rule} className="flex gap-2.5 text-[0.9375rem] leading-snug text-slate">
            <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
            {rule}
          </li>
        ))}
      </ul>

      <button type="button" onClick={onGoToRequests} className={exec.link}>
        {startingPointRegister.evidenceRegisterLink.label}
        <ArrowRight aria-hidden className="size-4" />
      </button>

      {sourceIds.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-slate">Sources</h3>
          <SourceList ids={sourceIds} />
        </section>
      )}
    </div>
  )
}
