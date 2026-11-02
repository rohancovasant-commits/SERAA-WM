import { useId } from 'react'
import { pricingFamilies, pricingFamiliesLabel, pricingUnitsNote } from '../../data/growth/commercial'
import { useTabs } from '../../hooks/useTabs'

const ids = pricingFamilies.map((f) => f.id)

/** One candidate pricing unit at a time. Units to test, not a rate card, and nothing here carries a price. */
export function PricingFamilies() {
  const { selected, setSelected, onKeyDown, setRef } = useTabs(ids, ids[0])
  const base = useId()
  const current = pricingFamilies.find((f) => f.id === selected) ?? pricingFamilies[0]

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-[17rem_1fr] lg:gap-8">
        <div role="tablist" aria-label={pricingFamiliesLabel} aria-orientation="vertical" className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
          {pricingFamilies.map((family, i) => {
            const active = family.id === selected
            return (
              <button
                key={family.id}
                ref={setRef(i)}
                id={`${base}-tab-${family.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`${base}-panel`}
                tabIndex={active ? 0 : -1}
                onClick={() => setSelected(family.id)}
                onKeyDown={(event) => onKeyDown(event, i)}
                className={`rounded-card border px-4 py-3.5 text-left text-sm font-bold uppercase tracking-[0.12em] break-words transition-colors ${
                  active ? 'border-violet bg-violet text-white' : 'border-violet-mid bg-white text-navy hover:border-violet'
                }`}
              >
                {family.label}
              </button>
            )
          })}
        </div>
        <div
          id={`${base}-panel`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${current.id}`}
          key={current.id}
          className="swap-in flex flex-col justify-center rounded-panel border border-violet-mid bg-white px-6 py-8 sm:px-9"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-slate">Candidate pricing unit</p>
          <p className="mt-1.5 text-[1.75rem] font-bold leading-tight text-navy sm:text-[2.25rem]">{current.unit}</p>
          <p className="mt-3 text-xl leading-snug text-ink">{current.define}</p>
        </div>
      </div>
      <p className="mt-3 text-[0.9375rem] font-semibold italic text-slate">{pricingUnitsNote}</p>
    </div>
  )
}
