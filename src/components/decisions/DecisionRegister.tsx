import { Fragment } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { leadershipDecisions } from '../../data/decisions/decisions'
import { recordDisclosure, registerCaption, registerOwnerTbc } from '../../data/decisions/record'
import { Disclosure } from '../growth/Disclosure'
import { DecisionStatusBadge, FutureStatusChip } from './StatusBadges'

const th = 'px-4 py-3 text-left text-sm font-bold uppercase tracking-[0.1em] text-slate'

/**
 * Read-only register: five decisions, each Pending with an owner of TBC. On narrow screens each row becomes a
 * labelled list. It has no controls that change a status.
 */
export function DecisionRegister() {
  return (
    <div>
      <div className="hidden overflow-hidden rounded-panel border border-line-strong bg-white md:block">
        <table className="w-full border-collapse">
          <caption className="sr-only">{registerCaption}</caption>
          <thead className="bg-wash">
            <tr>
              <th scope="col" className={th}>Decision</th>
              <th scope="col" className={th}>Recommendation</th>
              <th scope="col" className={th}>Status</th>
              <th scope="col" className={th}>Accountable owner</th>
              <th scope="col" className={th}>Next output</th>
            </tr>
          </thead>
          <tbody>
            {leadershipDecisions.map((d) => (
              <tr key={d.id} className="border-t border-line align-top">
                <th scope="row" className="px-4 py-4 text-left text-[1.0625rem] font-bold leading-snug text-navy">
                  <span className="mr-1.5 text-accent">{d.number}</span>
                  {d.title}
                </th>
                <td className="px-4 py-4 text-[0.9375rem] leading-snug">{d.shortRecommendation}</td>
                <td className="px-4 py-4">
                  <DecisionStatusBadge status={d.actualDecisionStatus} />
                </td>
                <td className="px-4 py-4 text-[0.9375rem] font-semibold text-amber">{registerOwnerTbc}</td>
                <td className="px-4 py-4 text-[0.9375rem] leading-snug">{d.nextReviewableOutput}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="space-y-3 md:hidden" aria-label={registerCaption}>
        {leadershipDecisions.map((d) => (
          <li key={d.id} className="rounded-card border border-line-strong bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold leading-tight text-navy">
                <span className="mr-1.5 text-accent">{d.number}</span>
                {d.title}
              </h3>
              <DecisionStatusBadge status={d.actualDecisionStatus} className="shrink-0" />
            </div>
            <dl className="mt-3 space-y-2 text-[0.9375rem]">
              <div>
                <dt className="font-semibold text-slate">Recommendation</dt>
                <dd className="leading-snug">{d.shortRecommendation}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate">Accountable owner</dt>
                <dd className="font-semibold text-amber">{registerOwnerTbc}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate">Next output</dt>
                <dd className="leading-snug">{d.nextReviewableOutput}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-[0.9375rem] italic text-slate">{registerCaption}</p>

      <Disclosure label={recordDisclosure.label} className="mt-6">
        <div className="space-y-7">
          <section>
            <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-slate">{recordDisclosure.fieldsLabel}</h3>
            <ol className="mt-3 flex flex-col items-start gap-1.5 md:flex-row md:flex-wrap md:items-center md:gap-y-2.5">
              {recordDisclosure.fields.map((field, i) => (
                <Fragment key={field}>
                  {i > 0 && (
                    <li aria-hidden className="text-slate">
                      <ArrowRight className="hidden size-4 md:block" />
                      <ArrowDown className="ml-4 size-4 md:hidden" />
                    </li>
                  )}
                  <li className="rounded-lg border border-violet-mid bg-violet-soft px-3 py-1.5 text-[0.9375rem] font-semibold text-navy">{field}</li>
                </Fragment>
              ))}
            </ol>
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-slate">{recordDisclosure.statusesLabel}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {recordDisclosure.statuses.map((s) => (
                <li key={s}>
                  <FutureStatusChip status={s} />
                </li>
              ))}
            </ul>
            <p className="mt-2.5 text-[0.9375rem] text-slate">{recordDisclosure.statusNote}</p>
            <p className="mt-1 text-[0.9375rem] font-semibold text-navy">{recordDisclosure.partialNote}</p>
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-slate">{recordDisclosure.separationLabel}</h3>
            <dl className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {recordDisclosure.separation.map((s) => (
                <div key={s.name}>
                  <dt className="font-bold text-navy">{s.name}</dt>
                  <dd className="text-[0.9375rem] leading-snug text-slate">{s.text}</dd>
                </div>
              ))}
            </dl>
          </section>

          <p className="rounded-card bg-wash px-4 py-3 text-[0.9375rem] leading-snug text-slate">{recordDisclosure.noWorkflowNote}</p>
        </div>
      </Disclosure>
    </div>
  )
}
