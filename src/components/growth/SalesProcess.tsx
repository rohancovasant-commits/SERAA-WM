import { useId } from 'react'
import { ChevronRight } from 'lucide-react'
import { processDefault, processLabel, salesSteps } from '../../data/growth/sales'
import { useTabs } from '../../hooks/useTabs'

const ids = salesSteps.map((s) => s.id)

/** Five-step sales process. Selecting a step reveals its output; Evaluate is selected by default. */
export function SalesProcess() {
  const { selected, setSelected, onKeyDown, setRef } = useTabs(ids, processDefault)
  const base = useId()
  const current = salesSteps.find((s) => s.id === selected) ?? salesSteps[0]

  return (
    <div>
      <div role="tablist" aria-label={processLabel} className="grid gap-2.5 sm:grid-cols-5 sm:gap-4">
        {salesSteps.map((step, i) => {
          const active = step.id === selected
          return (
            <button
              key={step.id}
              ref={setRef(i)}
              id={`${base}-tab-${step.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`${base}-panel`}
              tabIndex={active ? 0 : -1}
              onClick={() => setSelected(step.id)}
              onKeyDown={(event) => onKeyDown(event, i)}
              className={`relative flex items-center gap-3 rounded-card border px-4 py-3.5 text-left text-base font-semibold transition-colors sm:flex-col sm:items-start sm:gap-2 ${
                active ? 'border-blue bg-blue text-white' : 'border-blue-mid bg-white text-navy hover:border-blue'
              }`}
            >
              <span
                aria-hidden
                className={`flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${active ? 'bg-white text-blue' : 'bg-blue-soft text-blue'}`}
              >
                {i + 1}
              </span>
              <span className="leading-tight">{step.label}</span>
              {i < salesSteps.length - 1 && (
                <ChevronRight aria-hidden className="absolute -right-[0.95rem] top-1/2 z-10 hidden size-4 -translate-y-1/2 text-slate sm:block" />
              )}
            </button>
          )
        })}
      </div>
      <div
        id={`${base}-panel`}
        role="tabpanel"
        aria-labelledby={`${base}-tab-${current.id}`}
        key={current.id}
        className="swap-in mt-4 rounded-panel border border-blue-mid bg-white px-5 py-5 sm:px-7 sm:py-6"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-blue">Output · {current.label}</p>
        <p className="mt-1.5 text-xl font-semibold leading-snug text-navy">{current.output}</p>
      </div>
    </div>
  )
}
