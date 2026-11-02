import { useId } from 'react'
import { accountExamples } from '../../data/growth/sales'
import { useTabs } from '../../hooks/useTabs'
import { SourceReference } from '../ui/SourceReference'
import { QualifierPill } from './StatusChip'

const ids = accountExamples.map((a) => a.id)

/**
 * Three account examples in accessible tabs. The maturity qualifier sits in the tab itself, so it stays visible
 * whichever example is selected.
 */
export function AccountExamples() {
  const { selected, setSelected, onKeyDown, setRef } = useTabs(ids, ids[0])
  const base = useId()
  const current = accountExamples.find((a) => a.id === selected) ?? accountExamples[0]

  return (
    <div>
      <div role="tablist" aria-label="Selected-account examples" className="grid gap-2.5 sm:grid-cols-3">
        {accountExamples.map((account, i) => {
          const active = account.id === selected
          return (
            <button
              key={account.id}
              ref={setRef(i)}
              id={`${base}-tab-${account.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`${base}-panel`}
              tabIndex={active ? 0 : -1}
              onClick={() => setSelected(account.id)}
              onKeyDown={(event) => onKeyDown(event, i)}
              className={`rounded-card border px-4 py-3 text-left transition-colors ${
                active ? 'border-navy bg-navy text-white' : 'border-navy/20 bg-white text-navy hover:border-accent'
              }`}
            >
              <span className="block text-sm font-bold uppercase tracking-[0.12em]">{account.name}</span>
              <span className={`mt-0.5 block text-[0.9375rem] font-medium ${active ? 'text-teal-bright' : 'text-amber'}`}>{account.status}</span>
            </button>
          )
        })}
      </div>

      <div
        id={`${base}-panel`}
        role="tabpanel"
        aria-labelledby={`${base}-tab-${current.id}`}
        className="swap-in mt-4 grid gap-6 rounded-panel border border-line bg-white p-5 sm:p-7 lg:grid-cols-[1.1fr_1fr] lg:gap-10"
        key={current.id}
      >
        <div>
          <QualifierPill>{current.status}</QualifierPill>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.1em] text-slate">Proposed action</p>
          <p className="mt-1 text-xl font-semibold leading-snug text-navy">{current.action}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-slate">Evidence needed</p>
          <ul className="mt-2.5 flex flex-wrap gap-2">
            {current.evidenceNeeded.map((item) => (
              <li key={item} className="rounded-full border border-line-strong bg-canvas px-3 py-1 text-[0.9375rem] font-medium text-ink">
                {item}
              </li>
            ))}
          </ul>
          <SourceReference ids={current.sourceIds} className="mt-4" />
        </div>
      </div>
    </div>
  )
}
