import { ArrowRight, Building2, FileText, FileWarning } from 'lucide-react'
import { reasoningLabel } from '../../data/decisions/decisions'
import type { LeadershipDecision } from '../../data/decisions/types'
import { BulletList, Disclosure } from '../growth/Disclosure'
import { SourceReference } from '../ui/SourceReference'
import { Statement } from './StatementLabel'
import { DecisionStatusBadge } from './StatusBadges'

/** D4 is the one decision with a mechanism worth drawing: a target account, its real dependency, then a proposed pursuit brief. */
function PartnershipPursuit() {
  const steps = [
    { icon: Building2, label: 'Target account', tone: 'bg-blue-soft text-blue' },
    { icon: FileWarning, label: 'Dependency', tone: 'bg-amber-soft text-amber' },
    { icon: FileText, label: 'Proposed brief', tone: 'bg-violet-soft text-violet' },
  ]
  return (
    <ol aria-label="From target account to proposed pursuit brief" className="flex items-center justify-center gap-2 sm:gap-4">
      {steps.map(({ icon: Icon, label, tone }, i) => (
        <li key={label} className="flex items-center gap-2 sm:gap-4">
          <span className={`flex min-w-[6.5rem] flex-col items-center rounded-xl border border-hairline-soft px-3 py-4 text-center ${tone}`}>
            <Icon aria-hidden strokeWidth={1.4} className="size-9" />
            <span className="mt-1.5 text-[0.8125rem] font-bold uppercase leading-tight tracking-[0.08em]">{label}</span>
          </span>
          {i < steps.length - 1 && <ArrowRight aria-hidden className="size-5 shrink-0 text-slate" />}
        </li>
      ))}
    </ol>
  )
}

/**
 * One decision, inspected. Three statement types in fixed order, then the output, the proposed role and the
 * recommended disposition beside an actual status that stays Pending. Nothing here records an approval.
 */
export function DecisionDetail({ decision, headingId }: { decision: LeadershipDecision; headingId?: string }) {
  return (
    <article className="rounded-panel border border-line bg-white p-5 sm:p-8">
      <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h3 id={headingId} className="text-2xl font-bold leading-tight text-navy sm:text-[1.75rem]">
          <span className="mr-2 text-accent">{decision.number}</span>
          {decision.title}
        </h3>
        <DecisionStatusBadge status={decision.actualDecisionStatus} />
      </header>

      {decision.id === 'd4' && (
        <div className="mt-5 rounded-card border border-hairline bg-quiet px-3 py-5 sm:px-6">
          <PartnershipPursuit />
        </div>
      )}

      <div className="mt-6 space-y-3.5">
        <Statement kind="know">{decision.whatWeKnow}</Statement>
        <Statement kind="recommend">{decision.whatWeRecommend}</Statement>
        <Statement kind="decide">{decision.leadershipDecisionNeeded}</Statement>
      </div>

      <dl className="mt-7 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-semibold uppercase tracking-[0.1em] text-slate">Next reviewable output</dt>
          <dd className="mt-1 text-lg font-semibold leading-snug text-navy">{decision.nextReviewableOutput}</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold uppercase tracking-[0.1em] text-slate">Proposed accountable role</dt>
          <dd className="mt-1 text-lg leading-snug text-navy">
            {decision.proposedOwnerRole}
            <span className="mt-0.5 block text-[0.9375rem] font-semibold text-amber">{decision.ownerNote}</span>
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm font-semibold uppercase tracking-[0.1em] text-slate">Recommended disposition</dt>
          <dd className="mt-1 text-lg font-semibold leading-snug text-navy">
            {decision.recommendedDisposition}
            <span className="mt-2 flex flex-wrap items-center gap-2 text-[0.9375rem] font-normal text-slate">
              Actual decision status: <DecisionStatusBadge status={decision.actualDecisionStatus} />
              {decision.statusNote && <span>{decision.statusNote}</span>}
            </span>
          </dd>
        </div>
      </dl>

      {decision.sourceIds.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-sm font-semibold uppercase tracking-[0.1em] text-slate">Evidence</span>
          <SourceReference ids={decision.sourceIds} />
        </div>
      )}

      <Disclosure label={reasoningLabel} className="mt-6">
        <div className="space-y-6">
          <section>
            <h4 className="text-sm font-bold uppercase tracking-[0.1em] text-blue">Evidence limitations</h4>
            <BulletList items={decision.evidenceLimitations} className="mt-2.5 text-[0.9375rem]" />
          </section>
          {decision.reasoning.map((group, i) => (
            <section key={group.heading ?? i}>
              {group.heading && <h4 className="text-sm font-bold uppercase tracking-[0.1em] text-accent-strong">{group.heading}</h4>}
              {group.ordered ? (
                <ol className="mt-2.5 list-decimal space-y-2 pl-5 text-[0.9375rem] leading-snug marker:font-semibold marker:text-accent">
                  {group.items.map((item) => (
                    <li key={item} className="pl-1">
                      {item}
                    </li>
                  ))}
                </ol>
              ) : (
                <BulletList items={group.items} className="mt-2.5 text-[0.9375rem]" />
              )}
            </section>
          ))}
          <section>
            <h4 className="text-sm font-bold uppercase tracking-[0.1em] text-amber">Alternatives leadership could choose</h4>
            <BulletList items={decision.alternatives} className="mt-2.5 text-[0.9375rem]" />
          </section>
        </div>
      </Disclosure>
    </article>
  )
}
