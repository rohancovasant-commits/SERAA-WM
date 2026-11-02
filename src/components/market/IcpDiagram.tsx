import { useId, useState } from 'react'
import { ChevronDown, Info } from 'lucide-react'
import { wealthImages } from '../../assets/wealth'
import { icpConditions, icpLabel, icpStatement, icpTakeaway, type IcpCondition } from '../../data/opportunity/market'
import { StatementLabel } from '../decisions/StatementLabel'

function ConditionCard({ condition, number }: { condition: IcpCondition; number: number }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const left = condition.side === 'left'

  return (
    <li className="relative">
      {/* Connector stub toward the firm, wide screens only. */}
      <span
        aria-hidden
        className={`absolute top-8 hidden h-px w-10 bg-accent/45 md:block ${left ? '-right-10' : '-left-10'}`}
      />
      <span
        aria-hidden
        className={`absolute top-[1.8125rem] hidden size-1.5 rounded-full bg-accent md:block ${left ? '-right-10' : '-left-10'}`}
      />
      <div className="rounded-card border border-line bg-white shadow-[0_1px_2px_rgb(13_26_53/0.04)]">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center gap-3.5 rounded-card px-4 py-3.5 text-left"
        >
          <span
            aria-hidden
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-base font-bold text-white"
          >
            {number}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[1.0625rem] font-bold leading-snug text-navy">{condition.title}</span>
            <span className="block text-[0.9375rem] leading-snug text-slate">{condition.cue}</span>
          </span>
          <ChevronDown aria-hidden className={`size-5 shrink-0 text-accent transition-transform ${open ? 'rotate-180' : ''}`} />
          <span className="sr-only">{open ? 'Hide detail' : 'Show detail'}</span>
        </button>
        {open && (
          <div id={panelId} className="swap-in border-t border-line px-4 pb-4 pt-3.5">
            <p className="leading-snug">{condition.detail}</p>
            <p className="mt-3 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-slate">Test in account discovery</p>
            <ul className="mt-1.5 space-y-1.5">
              {condition.tests.map((test) => (
                <li key={test} className="flex gap-2.5 text-[0.9375rem] leading-snug">
                  <span aria-hidden className="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-accent" />
                  {test}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </li>
  )
}

/**
 * The working ICP and a schematic of one wealth business surrounded by six qualification conditions. The conditions
 * are criteria to test, not scores: nothing here rates, ranks or weights any named company.
 */
export function IcpDiagram() {
  const left = icpConditions.filter((c) => c.side === 'left')
  const right = icpConditions.filter((c) => c.side === 'right')

  return (
    <div>
      <div className="rounded-panel border-l-[6px] border-accent bg-accent-soft px-5 py-5 sm:px-8 sm:py-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <StatementLabel kind="recommend" />
          <span className="rounded-full bg-amber-soft px-3 py-1 text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-amber ring-1 ring-amber-mid">
            {icpLabel}
          </span>
        </div>
        <p className="mt-3.5 text-xl font-semibold leading-snug text-navy sm:text-[1.5rem] sm:leading-[1.35]">{icpStatement}</p>
      </div>

      <div className="mt-8 grid items-start gap-5 md:grid-cols-[1fr_11rem_1fr] md:gap-x-10">
        <ul className="space-y-3.5 md:order-1">
          {left.map((condition) => (
            <ConditionCard key={condition.id} condition={condition} number={icpConditions.indexOf(condition) + 1} />
          ))}
        </ul>

        <div className="order-first flex flex-col items-center self-center text-center md:order-2">
          <img src={wealthImages.wealthFirm} alt="" loading="lazy" className="h-36 w-auto max-w-full object-contain md:h-44" />
          <p className="mt-2 text-lg font-bold text-navy">A wealth business</p>
          <p className="text-[0.9375rem] text-slate">Tested against six conditions</p>
        </div>

        <ul className="space-y-3.5 md:order-3">
          {right.map((condition) => (
            <ConditionCard key={condition.id} condition={condition} number={icpConditions.indexOf(condition) + 1} />
          ))}
        </ul>
      </div>

      <p className="mt-7 flex items-start gap-2.5 rounded-card bg-white px-4 py-3 text-[1.0625rem] font-semibold leading-snug text-navy ring-1 ring-line">
        <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
        {icpTakeaway}
      </p>
    </div>
  )
}
