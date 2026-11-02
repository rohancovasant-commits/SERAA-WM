import { Fragment } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { overview } from '../../data/decisions/page'
import { DecisionStatusBadge } from './StatusBadges'

const tone = {
  evidence: { bar: 'bg-blue', text: 'text-blue', line: 'bg-blue-mid', stack: 'shadow-[5px_5px_0_-1px_#cfe0f6,10px_10px_0_-2px_#e8f0fb]' },
  recommendation: { bar: 'bg-accent', text: 'text-accent-strong', line: 'bg-[#bfe5df]', stack: 'shadow-[5px_5px_0_-1px_#bfe5df,10px_10px_0_-2px_#dff2ef]' },
  decision: { bar: 'bg-amber', text: 'text-amber', line: 'bg-amber-mid', stack: 'shadow-[5px_5px_0_-1px_#f3deaa,10px_10px_0_-2px_#fbf0d8]' },
} as const

/**
 * Three documents and how they relate: evidence informs a recommendation, and a recommendation is put to a
 * decision. The decision document has an empty, dashed disposition box: it is blank by design, never ticked.
 */
export function DocumentTrio() {
  return (
    <div className="rounded-panel border border-line bg-white px-5 py-9 sm:px-9 sm:py-12">
      <ol className="grid items-stretch gap-x-3 gap-y-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {overview.documents.map((doc, i) => {
          const t = tone[doc.id as keyof typeof tone]
          const isDecision = doc.id === 'decision'
          return (
            <Fragment key={doc.id}>
              {i > 0 && (
                <li aria-hidden className="flex flex-col items-center justify-center gap-1 py-1 text-slate lg:px-1 lg:py-0">
                  <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em]">{i === 1 ? 'informs' : 'put to'}</span>
                  <ArrowRight className="hidden size-6 lg:block" />
                  <ArrowDown className="size-6 lg:hidden" />
                </li>
              )}
              <li className="mr-3 mb-3 flex min-w-0 flex-col lg:mr-0 lg:mb-0">
                <div className={`flex flex-1 flex-col overflow-hidden rounded-xl border border-line-strong bg-white ${t.stack}`}>
                  <div className={`px-5 py-3 ${t.bar}`}>
                    <h3 className="text-base font-bold uppercase tracking-[0.08em] text-white">{doc.title}</h3>
                  </div>
                  <div className="flex flex-1 flex-col px-5 py-5">
                    <ul className="space-y-3.5">
                      {doc.lines.map((line, n) => (
                        <li key={line} className="flex items-center gap-3">
                          <span className="w-[5.5rem] shrink-0 text-[0.9375rem] font-semibold text-slate">{line}</span>
                          <span aria-hidden className={`h-2 rounded-full ${t.line}`} style={{ width: `${78 - n * 14}%` }} />
                        </li>
                      ))}
                    </ul>
                    {isDecision && (
                      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 rounded-lg border-2 border-dashed border-amber/50 bg-amber-soft/50 px-3.5 py-2.5">
                        <span className="text-[0.9375rem] font-semibold text-slate">Disposition</span>
                        <DecisionStatusBadge />
                      </div>
                    )}
                    <p className={`mt-auto pt-5 text-sm font-bold uppercase tracking-[0.1em] ${t.text}`}>{doc.caption}</p>
                  </div>
                </div>
              </li>
            </Fragment>
          )
        })}
      </ol>
    </div>
  )
}
