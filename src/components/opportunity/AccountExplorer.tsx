import { useEffect, useId, useMemo, useRef, useState, type ReactNode, type RefObject } from 'react'
import { ChevronDown, ExternalLink, Search } from 'lucide-react'
import { DetailDrawer } from '../ui/DetailDrawer'
import { exec } from '../exec/styles'
import {
  accountFacts,
  categoryHypotheses,
  companiesInGroup,
  notEstablished,
  pursuitGroupOf,
  pursuitGroups,
  type PursuitGroupId,
} from '../../data/opportunity/case'
import {
  categoryOf,
  companyNote,
  companyStatuses,
  marketCompanies,
  qualificationFor,
  relationshipNote,
  type MarketCompany,
} from '../../data/opportunity/marketCompanies'
import { universeQualifier } from '../../data/opportunity/market'
import { sources, sourceShortLabel } from '../../data/sources'
import { CaseTagLabel } from './shared'

export interface ExplorerTarget {
  group?: PursuitGroupId
  account?: string
}

type Filter = PursuitGroupId | 'all'

function Unknown() {
  return <span className="font-medium italic text-amber">{notEstablished}</span>
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-0.5 sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:gap-4">
      <dt className="text-[0.9375rem] font-semibold text-heading">{label}</dt>
      <dd className="text-[0.9375rem] leading-snug">{children}</dd>
    </div>
  )
}

function Profile({ company }: { company: MarketCompany }) {
  const category = categoryOf(company.category)
  const hypothesis = categoryHypotheses[company.category]
  const facts = accountFacts[company.id] ?? {}
  const status = companyStatuses[company.status]
  const scoped = company.status !== 'candidate'

  return (
    <dl className="mt-3 space-y-3 border-t border-line pt-3">
      <Field label="Business model and unit">
        <p>
          {category.modelTag}. {company.relevance}
        </p>
        <p className="mt-1 text-slate">
          Listed as {company.name}. Buying unit: <Unknown />
        </p>
      </Field>
      <Field label="Potential user team">
        <p>{hypothesis.users}</p>
        <CaseTagLabel kind="proposed" className="mt-1" />
      </Field>
      <Field label="Proposed sponsor and buyer roles">
        <p>{hypothesis.sponsor}</p>
        <p className="mt-1 text-slate">
          Economic buyer: <Unknown />
        </p>
        <CaseTagLabel kind="proposed" className="mt-1" />
      </Field>
      <Field label="Known account access">
        {facts.access ? (
          <>
            <p>{facts.access}</p>
            <CaseTagLabel kind="reported" className="mt-1" />
          </>
        ) : (
          <Unknown />
        )}
        {scoped && <p className="mt-1 text-slate">{status.label}.</p>}
      </Field>
      <Field label="Existing systems">
        {facts.systems ? (
          <>
            <p>{facts.systems.text}</p>
            <p className="mt-1 text-slate">
              {facts.systems.sources.map((id) => (
                <a
                  key={id}
                  href={sources[id].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
                >
                  {sourceShortLabel[id]}
                  <ExternalLink aria-hidden className="size-3.5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
            </p>
          </>
        ) : (
          <Unknown />
        )}
      </Field>
      <Field label="Workflow hypothesis">
        <p>{facts.workflow ?? hypothesis.workflow}</p>
        <CaseTagLabel kind="proposed" className="mt-1" />
      </Field>
      <Field label="Source and unresolved inputs">
        <p>
          <a
            href={company.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
          >
            {company.sourceLabel}
            <ExternalLink aria-hidden className="size-3.5" />
            <span className="sr-only">for {company.name} (opens in a new tab)</span>
          </a>
        </p>
        <ul className="mt-2 space-y-1.5">
          {[...qualificationFor(company), 'Sponsor, budget and buying route.'].map((item) => (
            <li key={item} className="flex gap-2.5">
              <span aria-hidden className="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-amber" />
              {item}
            </li>
          ))}
        </ul>
        {scoped && <p className="mt-2 text-slate">{relationshipNote}</p>}
      </Field>
    </dl>
  )
}

function AccountRow({ company, open, onToggle }: { company: MarketCompany; open: boolean; onToggle: () => void }) {
  const panelId = useId()
  const group = pursuitGroups.find((g) => g.id === pursuitGroupOf(company))
  const ref = useRef<HTMLLIElement>(null)

  // Bring an account opened from the page into view once, inside the panel.
  useEffect(() => {
    if (open) ref.current?.scrollIntoView({ block: 'nearest' })
  }, [])

  return (
    <li ref={ref} className="rounded-card border border-line bg-white">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-3 rounded-card px-4 py-3 text-left"
        >
          <span className="min-w-0">
            <span className="block text-lg font-semibold leading-snug text-heading">{company.name}</span>
            <span className="block text-[0.875rem] leading-snug text-slate">
              {categoryOf(company.category).modelTag} · {group?.label}
            </span>
          </span>
          <ChevronDown aria-hidden className={`size-5 shrink-0 text-slate transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </h3>
      {open && (
        <div id={panelId} className="px-4 pb-4">
          <Profile company={company} />
        </div>
      )}
    </li>
  )
}

function ExplorerBody({ target }: { target: ExplorerTarget }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>(target.group ?? 'all')
  const [openId, setOpenId] = useState<string | null>(target.account ?? null)
  const searchId = useId()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return marketCompanies.filter(
      (company) =>
        (filter === 'all' || pursuitGroupOf(company) === filter) &&
        (q === '' || `${company.name} ${company.relevance} ${categoryOf(company.category).title}`.toLowerCase().includes(q)),
    )
  }, [query, filter])

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: marketCompanies.length },
    ...pursuitGroups.map((g) => ({ id: g.id, label: g.label, count: companiesInGroup(g.id).length })),
  ]

  return (
    <div className="space-y-5">
      <p className="rounded-card border-l-4 border-amber bg-amber-soft px-4 py-3 text-[0.9375rem] leading-snug">
        <span className="font-semibold">{universeQualifier}</span> {companyNote} Groups are proposed pursuit directions, not scores.
      </p>

      <div>
        <label htmlFor={searchId} className={exec.label}>
          Search organisations
        </label>
        <div className="relative mt-1.5">
          <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name, model or keyword"
            className="w-full rounded-lg border border-line-strong bg-white py-2.5 pl-9 pr-3 text-base placeholder:text-slate/70"
          />
        </div>
      </div>

      <div role="group" aria-label="Filter by pursuit group" className="flex flex-wrap gap-2">
        {filters.map((item) => {
          const active = filter === item.id
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item.id)}
              className={`rounded-full border px-3.5 py-1.5 text-[0.9375rem] font-semibold transition-colors ${
                active ? 'border-accent bg-accent text-white' : 'border-line-strong bg-white text-heading hover:border-accent hover:text-accent'
              }`}
            >
              {item.label} <span className={active ? 'text-white/85' : 'text-slate'}>{item.count}</span>
            </button>
          )
        })}
      </div>

      <p aria-live="polite" className="text-[0.9375rem] font-medium text-slate">
        Showing {results.length} of {marketCompanies.length} organisations
      </p>

      {results.length > 0 ? (
        <ul className="space-y-2.5">
          {results.map((company) => (
            <AccountRow key={company.id} company={company} open={openId === company.id} onToggle={() => setOpenId(openId === company.id ? null : company.id)} />
          ))}
        </ul>
      ) : (
        <p className="rounded-card bg-wash px-4 py-6 text-center text-slate">No organisation on the list matches that search. Clear the search or choose another group.</p>
      )}
    </div>
  )
}

interface AccountExplorerProps {
  open: boolean
  target: ExplorerTarget
  onClose: () => void
  returnFocusRef: RefObject<HTMLElement | null>
}

/**
 * Wide panel listing every organisation on the research list. A selected account shows what the research establishes
 * (access, known systems, source) apart from what is proposed (user team, sponsor roles, workflow) and what is not
 * established. Nothing here is account intelligence beyond the records; gaps say so.
 */
export function AccountExplorer({ open, target, onClose, returnFocusRef }: AccountExplorerProps) {
  return (
    <DetailDrawer open={open} onClose={onClose} title="Account explorer" eyebrow="Selected research list" returnFocusRef={returnFocusRef} wide>
      {/* Mounted only while open, so search, filter and the open account reset each time. */}
      <ExplorerBody target={target} />
    </DetailDrawer>
  )
}
