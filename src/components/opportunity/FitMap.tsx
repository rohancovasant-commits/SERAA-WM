import { ArrowUpRight } from 'lucide-react'
import { fitCase, fitRows } from '../../data/opportunity/case'
import { startingPoints } from '../../data/shared/startingPoints'
import { exec } from '../exec/styles'

const grid = 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1.1fr)]'

/**
 * One comparison surface: each starting point, why it matters and the next proof needed. The columns compare; they are
 * not workflow steps. The three rows are different kinds of activity, not three customers.
 */
export function FitMap({ onOpenDetail }: { onOpenDetail: (id: string, opener: HTMLElement) => void }) {
  const { columns } = fitCase
  return (
    <section aria-label="Starting points, why they matter and the next proof needed">
      <div aria-hidden className={`hidden items-end border-b border-line pb-2 lg:grid lg:gap-x-6 ${grid}`}>
        <span className={exec.label}>{columns.asset}</span>
        <span className={`${exec.label} bg-tint px-4 pt-2 -mt-2`}>{columns.supports}</span>
        <span className={exec.label}>{columns.establish}</span>
      </div>

      <ul className="divide-y divide-line border-b border-line">
        {fitRows.map((row) => {
          const point = startingPoints.find((p) => p.id === row.id)
          if (!point) return null
          return (
            <li key={row.id} className={`grid gap-x-6 gap-y-3 py-4 lg:items-stretch lg:py-0 ${grid}`}>
              <div className="lg:py-4 lg:self-center">
                <p className="text-2xl font-bold leading-tight text-heading">{point.name}</p>
                <p className="mt-0.5 text-base font-medium text-slate">{row.basis}</p>
                <button type="button" aria-haspopup="dialog" onClick={(event) => onOpenDetail(row.id, event.currentTarget)} className={`mt-1 ${exec.link}`}>
                  Evidence
                  <ArrowUpRight aria-hidden className="size-4" />
                  <span className="sr-only"> for {point.name}</span>
                </button>
              </div>
              <p className="rounded-lg bg-tint px-4 py-3 text-lg font-semibold leading-snug text-heading lg:flex lg:flex-col lg:justify-center lg:rounded-none lg:py-4">
                <span className={`${exec.label} mb-1 block lg:hidden`}>{columns.supports}</span>
                {row.supports}
              </p>
              <p className="text-base leading-snug text-slate lg:self-center lg:py-4">
                <span className={`${exec.label} mb-0.5 block lg:hidden`}>{columns.establish}</span>
                {row.establish}
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
