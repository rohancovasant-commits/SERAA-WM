import { ArrowDown, ArrowRight, Handshake, Landmark, Layers, type LucideIcon } from 'lucide-react'
import { marketCompanies, type MarketCompany } from '../../data/opportunity/marketCompanies'
import { companiesInGroup, groupExamples, marketCase, pursuitGroups, type PursuitGroupId } from '../../data/opportunity/case'
import { exec } from '../exec/styles'

const zone: Record<PursuitGroupId, { card: string; band: string; badge: string; heading: string; icon: LucideIcon; stage: string; chip: string }> = {
  start: {
    card: 'bg-tint border-accent/40',
    band: 'bg-accent',
    badge: 'bg-accent text-white',
    heading: 'text-accent-strong',
    icon: Handshake,
    stage: 'Existing access',
    chip: 'hover:border-accent hover:text-accent',
  },
  expand: {
    card: 'bg-blue-soft border-blue-mid',
    band: 'bg-blue',
    badge: 'bg-blue text-white',
    heading: 'text-blue',
    icon: Layers,
    stage: 'Similar workflows',
    chip: 'hover:border-blue hover:text-blue',
  },
  dependent: {
    card: 'bg-quiet border-hairline',
    band: 'bg-navy-3/60',
    badge: 'bg-navy-3 text-white',
    heading: 'text-heading',
    icon: Landmark,
    stage: 'Sponsor and route to establish',
    chip: 'hover:border-navy-3 hover:text-navy-3',
  },
}

interface PursuitLandscapeProps {
  onOpenGroup: (group: PursuitGroupId, opener: HTMLElement) => void
  onOpenAccount: (accountId: string, opener: HTMLElement) => void
}

/**
 * The Market chapter's dominant visual: three proposed pursuit groups in order, each with the businesses it contains.
 * Cards are equal width and height on purpose. They show a proposed order of pursuit, not size, share or
 * attractiveness, and the caption says so. Account chips open the account explorer on that account.
 */
export function PursuitLandscape({ onOpenGroup, onOpenAccount }: PursuitLandscapeProps) {
  return (
    <section aria-labelledby="landscape-label" className={`${exec.panel} bg-white p-4 sm:p-6`}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pb-4">
        <h3 id="landscape-label" className="text-xl font-bold leading-tight text-heading">
          {marketCase.landscapeLabel}
        </h3>
      </div>

      <ol className="grid gap-3 lg:grid-cols-3 lg:gap-6">
        {pursuitGroups.map((group, i) => {
          const z = zone[group.id]
          const Icon = z.icon
          const all = companiesInGroup(group.id)
          const examples = groupExamples[group.id]
            .map((id) => marketCompanies.find((c) => c.id === id))
            .filter((c): c is MarketCompany => c !== undefined)
          const more = all.length - examples.length
          const card = (
            <li key={group.id} className={`flex flex-col relative rounded-xl border ${z.card}`}>
              <span aria-hidden className={`h-1.5 w-full rounded-t-[10px] ${z.band}`} />
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <p className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-slate">
                  <span className="mr-1.5 text-accent">{group.step}</span>
                  {z.stage}
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <span aria-hidden className={`flex size-10 shrink-0 items-center justify-center rounded-full ${z.badge}`}>
                    <Icon strokeWidth={1.7} className="size-5" />
                  </span>
                  <h4 className={`text-[1.375rem] font-bold leading-tight ${z.heading}`}>{group.label}</h4>
                </div>

                <div className="mt-3 flex-1">
                  <p className="text-[1.0625rem] font-semibold leading-snug text-heading">{group.who}</p>
                  <p className={`mt-1.5 ${exec.body}`}>{group.why}</p>
                </div>

                <div className="mt-4 rounded-lg bg-white/70 px-3 py-3 ring-1 ring-black/5">
                  <p className={exec.label}>On the research list · {all.length}</p>
                  <ul className="mt-2 flex flex-wrap items-center gap-1.5">
                    {examples.map((company) => (
                      <li key={company.id}>
                        <button
                          type="button"
                          aria-haspopup="dialog"
                          onClick={(event) => onOpenAccount(company.id, event.currentTarget)}
                          className={`rounded-full border border-line-strong bg-white px-3 py-1 text-[0.9375rem] font-semibold text-heading transition-colors ${z.chip}`}
                        >
                          {company.name.split(' / ')[0]}
                        </button>
                      </li>
                    ))}
                    {more > 0 && (
                      <li>
                        <button
                          type="button"
                          aria-haspopup="dialog"
                          onClick={(event) => onOpenGroup(group.id, event.currentTarget)}
                          className="rounded-full px-2 py-1 text-[0.9375rem] font-semibold text-accent underline-offset-4 hover:underline"
                        >
                          +{more} more
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              {i < pursuitGroups.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -bottom-[1.375rem] left-1/2 z-10 flex size-8 -translate-x-1/2 items-center justify-center rounded-full bg-white text-accent shadow-sm ring-1 ring-hairline lg:-right-7 lg:bottom-auto lg:left-auto lg:top-1/2 lg:translate-x-0 lg:-translate-y-1/2"
                >
                  <ArrowRight strokeWidth={2.2} className="hidden size-4 lg:block" />
                  <ArrowDown strokeWidth={2.2} className="size-4 lg:hidden" />
                </span>
              )}
            </li>
          )
          return card
        })}
      </ol>

      <p className={`mt-4 ${exec.meta}`}>{marketCase.landscapeNote}</p>
    </section>
  )
}
