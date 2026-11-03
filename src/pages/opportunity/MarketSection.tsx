import { ArrowUpRight, Landmark, Search, Users } from 'lucide-react'
import { Section } from '../../components/ui/Section'
import { AccountExplorer, type ExplorerTarget } from '../../components/opportunity/AccountExplorer'
import { MarketSupport } from '../../components/opportunity/MarketSupport'
import { exec } from '../../components/exec/styles'
import { useSources } from '../../context/SourcesContext'
import { useDrawer } from '../../hooks/useDrawer'
import { sourcesLinkLabel } from '../../data/opportunity/market'

const copy = {
  eyebrow: 'Market · Proposed customer focus',
  tag: '03 / Focused entry',
  headline: ['Start with firms we can reach.', 'Expand where the same need exists.'],
  first: {
    label: 'Start here',
    title: 'Existing relationships',
    names: 'Motilal Oswal · Centrum Wealth',
    text: 'Confirm the buyer and a problem worth solving.',
  },
  next: [
    { id: 'firms', label: 'Explore next', title: 'Other wealth firms', text: 'Similar needs in wealth, advisory and selected PMS businesses.' },
    { id: 'banks', label: 'Pursue selectively', title: 'Bank wealth units & distribution platforms', text: 'Proceed where a sponsor and buying route are clear.' },
  ],
  qualification: 'Proposed focus—not qualified pipeline or a market-size estimate.',
  buyer: 'Our buyer is the wealth firm or business unit.',
  users: 'RMs, service and operations teams use the solution.',
  accounts: 'Explore accounts',
  support: 'Supporting evidence',
}

const nextIcon = { firms: Search, banks: Landmark } as const

/**
 * Market chapter: who to pursue first. One start-here banner above two later directions, then who buys. These are
 * proposed pursuit directions, not measured attractiveness, a qualified pipeline or a market size. The account
 * explorer, the pursuit-direction detail, the three populations and the sizing evidence open in panels.
 */
export function MarketSection() {
  const { openAll } = useSources()
  const explorer = useDrawer<ExplorerTarget>()
  const support = useDrawer<true>()

  return (
    <Section id="market" headingId="market-title" surface="warm">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p aria-hidden className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-slate">
          {copy.eyebrow}
        </p>
        <p aria-hidden className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-slate">
          {copy.tag}
        </p>
      </div>
      <h2 id="market-title" className={`mt-3 max-w-5xl ${exec.title}`}>
        {copy.headline[0]} <span className="block sm:inline lg:block">{copy.headline[1]}</span>
      </h2>

      <section aria-labelledby="focus-first" className="mt-8 grid items-center gap-x-10 gap-y-4 rounded-[12px] bg-navy px-6 py-6 text-white sm:px-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="flex items-center gap-6">
          <Users aria-hidden strokeWidth={1.5} className="size-12 shrink-0 text-teal-bright" />
          <div>
            <p className="text-[0.8125rem] font-bold uppercase tracking-[0.2em] text-teal-bright">{copy.first.label}</p>
            <h3 id="focus-first" className="mt-1 text-3xl font-bold leading-tight sm:text-4xl">
              {copy.first.title}
            </h3>
            <p className="mt-1 text-lg text-white/85">{copy.first.names}</p>
          </div>
        </div>
        <p className="max-w-xs text-lg leading-snug text-white/90 lg:border-l lg:border-white/20 lg:pl-10">{copy.first.text}</p>
      </section>

      <ol className="mt-8 grid gap-8 md:grid-cols-2 md:gap-0 md:divide-x md:divide-line">
        {copy.next.map((item) => {
          const Icon = nextIcon[item.id as keyof typeof nextIcon]
          return (
            <li key={item.id} className="flex items-start gap-5 md:px-10 md:first:pl-4 md:last:pr-4">
              <Icon aria-hidden strokeWidth={1.5} className="mt-1 size-9 shrink-0 text-blue" />
              <div>
                <p className="text-[0.8125rem] font-bold uppercase tracking-[0.2em] text-slate">{item.label}</p>
                <h3 className="mt-1 text-2xl font-bold leading-snug text-heading">{item.title}</h3>
                <p className="mt-2 max-w-sm text-lg leading-snug text-slate">{item.text}</p>
              </div>
            </li>
          )
        })}
      </ol>

      <div className="mt-10">
        <p className="text-[0.875rem] text-slate">{copy.qualification}</p>
        <p className="mt-2 text-2xl font-bold leading-snug text-heading sm:text-[1.75rem]">{copy.buyer}</p>
        <p className="mt-1 text-lg text-slate">{copy.users}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={(event) => explorer.open({}, event.currentTarget)}
            className="inline-flex items-center gap-1.5 border-b border-accent pb-0.5 text-base font-medium text-accent hover:text-accent-strong"
          >
            {copy.accounts}
            <ArrowUpRight aria-hidden className="size-4" />
          </button>
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={(event) => support.open(true, event.currentTarget)}
            className="inline-flex items-center gap-1.5 text-base font-medium text-accent underline-offset-4 hover:underline"
          >
            {copy.support}
            <ArrowUpRight aria-hidden className="size-4" />
          </button>
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={(event) => openAll(event.currentTarget)}
            className="inline-flex items-center gap-1.5 text-base font-medium text-slate underline-offset-4 hover:underline"
          >
            {sourcesLinkLabel}
          </button>
        </div>
      </div>

      <AccountExplorer open={explorer.value !== null} target={explorer.value ?? {}} onClose={explorer.close} returnFocusRef={explorer.trigger} />
      <MarketSupport open={support.value !== null} onClose={support.close} returnFocusRef={support.trigger} />
    </Section>
  )
}
