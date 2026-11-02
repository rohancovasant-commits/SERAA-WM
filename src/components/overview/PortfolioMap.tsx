import { ChevronRight, CircleDashed } from 'lucide-react'
import { businessFunctions, families } from '../../data/offerings/families'
import { offeringsOverview } from '../../data/overviews'
import { toneStyles } from '../../styles/tones'

/** The statement and the sequence under the map share this two-column template. */
export const portfolioColumns = 'lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]'

const rowColumns = 'grid grid-cols-[15rem_repeat(10,minmax(0,1fr))] items-center gap-x-1 px-4'

function Tag({ focus, children }: { focus: boolean; children: string }) {
  return (
    <span
      className={`rounded px-1.5 py-px text-[0.6875rem] font-bold uppercase tracking-[0.06em] ${
        focus ? 'bg-accent text-white' : 'bg-ev-poc-bg text-ev-poc-fg ring-1 ring-ev-poc-fg/25'
      }`}
    >
      {children}
    </span>
  )
}

/**
 * Portfolio map: which business functions each proposed family serves. Rows are the four families (the raised, tinted
 * row is Relationships, the proposed first-focus candidate, a recommendation only; Intelligence carries the distinct
 * "POC starting point" label); columns are the ten business functions from the family data. A dot means the family is
 * proposed to serve that function. It shows overlap, not rank or phase, so a common function (RMs, Operations) reads as
 * shared ground. Live text and CSS: a grid on wide screens, a list of functions per family below that.
 */
export function PortfolioMap() {
  const { families: rows, caption } = offeringsOverview
  const ordered = families.map((family) => ({ family, row: rows.find((r) => r.id === family.id)! }))
  return (
    <div>
      <div role="table" aria-label={caption} className="hidden lg:block">
        <div role="row" className={`${rowColumns} pb-2`}>
          <span role="columnheader" className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-slate">
            {caption}
          </span>
          {businessFunctions.map((fn) => (
            <span key={fn} role="columnheader" className="text-center text-[0.8125rem] font-semibold leading-tight text-slate">
              {fn}
            </span>
          ))}
        </div>
        <div className="space-y-2">
          {ordered.map(({ family, row }) => {
            const tone = toneStyles[family.tone]
            const focus = row.id === 'relationships'
            return (
              <div
                key={row.id}
                role="row"
                className={`${rowColumns} rounded-xl ${focus ? 'border-2 border-accent bg-tint py-4 shadow-lift' : 'border border-hairline bg-white py-3'}`}
              >
                <div role="rowheader" className="pr-3">
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className={`font-bold leading-tight text-heading ${focus ? 'text-xl' : 'text-lg'}`}>{row.name}</span>
                    {row.tag && <Tag focus={focus}>{row.tag}</Tag>}
                  </p>
                  <p className="text-[0.9375rem] leading-snug text-slate">{row.text}</p>
                </div>
                {businessFunctions.map((fn) => (
                  <span key={fn} role="cell" className="flex justify-center">
                    {family.businessFunctions.includes(fn) ? (
                      <>
                        <span aria-hidden className={`size-5 rounded-full ${tone.solid}`} />
                        <span className="sr-only">Serves {fn}</span>
                      </>
                    ) : (
                      <span aria-hidden className="size-1.5 rounded-full bg-line-strong" />
                    )}
                  </span>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      <ul aria-label={caption} className="space-y-2 lg:hidden">
        {ordered.map(({ family, row }) => {
          const focus = row.id === 'relationships'
          return (
            <li key={row.id} className={`rounded-xl px-4 py-3 ${focus ? 'border-2 border-accent bg-tint' : 'border border-hairline bg-white'}`}>
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-lg font-bold text-heading">{row.name}</span>
                {row.tag && <Tag focus={focus}>{row.tag}</Tag>}
              </p>
              <p className="text-base text-slate">{row.text}</p>
              <p className="mt-1 text-[0.9375rem] leading-snug text-heading">Serves: {family.businessFunctions.join(' · ')}</p>
            </li>
          )
        })}
      </ul>
      <p className="mt-2 text-[0.9375rem] leading-snug text-slate">A dot means the family is proposed to serve that function. Families overlap; they are not phases.</p>
    </div>
  )
}

/** The development path of the one selected scope. It is not a sequence of families, and the caption says so. */
export function DevelopmentSequence() {
  const { sequence } = offeringsOverview
  return (
    <div>
      <p className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-slate">{sequence.label}</p>
      <ol className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-2">
        {sequence.steps.map((step, i) => (
          <li key={step} className="flex items-center gap-1.5">
            <span className={`rounded-lg px-3 py-2 text-base font-semibold ${i === 0 ? 'bg-accent text-white' : 'border border-hairline bg-white text-heading'}`}>{step}</span>
            {i < sequence.steps.length - 1 && <ChevronRight aria-hidden className="size-4 shrink-0 text-slate" />}
          </li>
        ))}
      </ol>
      <p className="mt-2 text-[0.9375rem] leading-snug text-slate">{sequence.note}</p>
    </div>
  )
}

/** The recommendation line, kept beside the map and visibly not a decision. */
export function FirstFocusStatement() {
  const { recommendation, statusNote } = offeringsOverview
  return (
    <div className="border-l-4 border-accent pl-4">
      <p className="text-lg font-bold leading-snug text-heading">{recommendation}</p>
      <p className="mt-1 flex items-center gap-1.5 text-[0.9375rem] font-semibold leading-snug text-amber">
        <CircleDashed aria-hidden className="size-4 shrink-0" />
        {statusNote}
      </p>
    </div>
  )
}
