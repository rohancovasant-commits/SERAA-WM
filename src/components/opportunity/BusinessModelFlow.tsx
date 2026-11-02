import { ArrowDown, ArrowRight, PackageCheck, TrendingUp, Users } from 'lucide-react'
import { overview } from '../../data/opportunity/case'
import { exec } from '../exec/styles'
import { CaseTagLabel } from './shared'

const icons = { problem: Users, offering: PackageCheck, value: TrendingUp } as const

/**
 * The overview's dominant visual: the proposed business model as three connected steps. It describes the
 * proposition, not existing sales, and says so beside the title.
 */
export function BusinessModelFlow() {
  return (
    <section aria-labelledby="model-label" className={`${exec.panel} bg-white p-4 sm:p-5`}>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <h2 id="model-label" className="text-xl font-bold leading-tight text-heading">
          {overview.modelLabel}
        </h2>
        <CaseTagLabel kind="proposed" />
      </div>

      <ol className="mt-4 grid items-stretch gap-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-3">
        {overview.model.flatMap((step, i) => {
          const Icon = icons[step.id as keyof typeof icons]
          const last = i === overview.model.length - 1
          const node = (
            <li key={step.id} className={`flex items-start gap-4 rounded-xl border px-4 py-3.5 ${last ? 'border-accent bg-tint' : 'border-hairline bg-quiet'}`}>
              <span aria-hidden className={`flex size-12 shrink-0 items-center justify-center rounded-full ${last ? 'bg-accent text-white' : 'bg-white text-accent ring-1 ring-hairline'}`}>
                <Icon strokeWidth={1.6} className="size-6" />
              </span>
              <span>
                <span className="block text-[1.1875rem] font-bold leading-snug text-heading">{step.label}</span>
                <span className="mt-1 block text-[1.0625rem] leading-snug text-slate">{step.text}</span>
              </span>
            </li>
          )
          if (last) return [node]
          return [
            node,
            <li key={`${step.id}-arrow`} aria-hidden className="flex items-center justify-center text-accent">
              <ArrowRight strokeWidth={2} className="hidden size-7 lg:block" />
              <ArrowDown strokeWidth={2} className="size-6 lg:hidden" />
            </li>,
          ]
        })}
      </ol>
      <p className={`mt-2.5 ${exec.meta}`}>{overview.modelNote}</p>
    </section>
  )
}
