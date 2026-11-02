import { Building2, PieChart, Users } from 'lucide-react'
import { marketCase } from '../../data/opportunity/case'
import { exec } from '../exec/styles'

const icons = { buyer: Building2, users: Users, investors: PieChart } as const

/** Three populations that are easy to confuse: the buying unit, the people who use the offering and the firm's clients. */
export function Populations() {
  return (
    <section aria-label={marketCase.populationsLabel}>
      <ul className="grid gap-3 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-hairline">
        {marketCase.populations.map((p) => {
          const Icon = icons[p.id as keyof typeof icons]
          return (
            <li key={p.id} className="flex items-start gap-3 sm:px-5 sm:first:pl-0 sm:last:pr-0">
              <Icon aria-hidden strokeWidth={1.6} className="mt-0.5 size-6 shrink-0 text-accent" />
              <span className={exec.body}>
                <span className="block font-bold text-heading">{p.label}</span>
                {p.text}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
