import { directions, directionsPanelIntro } from '../../data/growth/approach'
import { SourceReference } from '../ui/SourceReference'
import { Disclosure } from './Disclosure'
import { StatusChip } from './StatusChip'

/** Body of the decision panel: the ten proposed directions, each with a status and its validation test. */
export function DirectionsPanel() {
  return (
    <div className="space-y-6">
      <p className="rounded-card bg-wash px-4 py-3 leading-snug">{directionsPanelIntro}</p>
      <ol className="divide-y divide-line">
        {directions.map((d, i) => (
          <li key={d.id} className="py-5 first:pt-0">
            <div className="flex items-start gap-3">
              <span aria-hidden className="w-6 shrink-0 pt-0.5 text-sm font-bold text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate">{d.topic}</p>
                <h3 className="mt-0.5 text-lg font-semibold leading-snug text-navy">{d.shortTag}</h3>
                <p className="mt-1 leading-snug text-ink">{d.explanation}</p>
                <StatusChip status={d.status} className="mt-2.5" />
                <Disclosure label="Evidence, validation and owner" className="mt-3">
                  <dl className="space-y-3 text-[0.9375rem] leading-snug">
                    <div>
                      <dt className="font-semibold text-navy">Supporting evidence</dt>
                      <dd className="mt-0.5 space-y-1">
                        {d.supportingEvidence.map((e) => (
                          <p key={e}>{e}</p>
                        ))}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-navy">Validation test</dt>
                      <dd className="mt-0.5">{d.validationTest}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-navy">Proposed owner role</dt>
                      <dd className="mt-0.5">{d.proposedOwnerRole}. Named owner TBC.</dd>
                    </div>
                  </dl>
                  <SourceReference ids={d.sourceIds} className="mt-3" />
                </Disclosure>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
