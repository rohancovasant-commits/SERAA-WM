import { useState } from 'react'
import { ChevronDown, CircleAlert, FileText, ListChecks, Search, UserRound } from 'lucide-react'
import { SourceReference } from '../ui/SourceReference'
import { actionClass } from '../ui/actionClass'
import { dimensions } from '../../data/readiness/dimensions'
import { proofFolders } from '../../data/readiness/proof'
import { sourceReuseNote } from '../../data/readiness/page'
import { ratingInfo } from '../../data/readiness/ratings'
import {
  actionTypeInfo,
  actionTypeNote,
  layerLabels,
  layerText,
  nonTechnicalWork,
  requirementAction,
  technicalDimensions,
} from '../../data/readiness/plan'
import { NAMED_OWNER_NOTE, requirements, type Requirement } from '../../data/readiness/requirements'
import { RatingBadge } from './RatingBadge'
import { RatingsMethod } from './RatingsMethod'
import type { Explorer, RatingFilter } from './useExplorer'

const dimensionName = (id: Requirement['dimension']) => dimensions.find((d) => d.id === id)!.name

const field =
  'w-full rounded-lg border border-line-strong bg-white px-3.5 py-2.5 text-base text-ink focus-visible:outline-accent'

function Step({
  icon: Icon,
  label,
  tone,
  last = false,
  children,
}: {
  icon: typeof FileText
  label: string
  tone: string
  last?: boolean
  children: React.ReactNode
}) {
  return (
    <li className="relative pb-8 pl-14 last:pb-0">
      {!last && <span aria-hidden className="absolute bottom-0 left-[1.1875rem] top-11 w-0.5 bg-line-strong" />}
      <span aria-hidden className={`absolute left-0 top-0 flex size-10 items-center justify-center rounded-full ${tone}`}>
        <Icon className="size-5" />
      </span>
      <h4 className="pt-1 text-sm font-semibold uppercase tracking-[0.12em] text-slate">{label}</h4>
      <div className="mt-1.5 text-[1.125rem] leading-snug text-ink">{children}</div>
    </li>
  )
}

/**
 * Planning view of one requirement: the kind of work its recorded action calls for, and where platform capability,
 * wealth adaptation and customer proof stand. Technical and offering requirements use the three layers; the others
 * show the equivalent domain, customer or commercial work. None of this is a rating.
 */
function PlanningBlock({ requirement }: { requirement: Requirement }) {
  const action = actionTypeInfo[requirementAction[requirement.id]]
  const technical = technicalDimensions.includes(requirement.dimension)
  const described = requirement.sourceIds.some((id) => id === 'S31' || id === 'S32')
  const rows = technical
    ? [
        { label: layerLabels.platform, text: described ? layerText.platformDescribed : layerText.platformUnknown },
        { label: layerLabels.adaptation, text: layerText.adaptation },
        { label: layerLabels.acceptance, text: layerText.acceptance },
      ]
    : nonTechnicalWork[requirement.dimension as 'domain' | 'customer' | 'commercial']
  return (
    <section aria-labelledby="planning-title" className="mt-8 border-t border-line pt-6">
      <h4 id="planning-title" className="text-sm font-semibold uppercase tracking-[0.12em] text-slate">
        Planning view
      </h4>
      <p className="mt-2 leading-snug">
        <span className="font-semibold text-navy">Action type: {action.label}.</span> {action.text}
      </p>
      <dl className="mt-3 divide-y divide-line">
        {rows.map((r) => (
          <div key={r.label} className="py-2.5 sm:grid sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-x-4">
            <dt className="text-[0.9375rem] font-semibold text-navy">{r.label}</dt>
            <dd className="text-[0.9375rem] leading-snug text-slate">{r.text}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-2 text-[0.875rem] leading-snug text-slate">{actionTypeNote}</p>
    </section>
  )
}

function RaiseDetail({ requirement }: { requirement: Requirement }) {
  return (
    <div id="raise-detail" className="swap-in mt-3 rounded-lg border border-line bg-wash px-4 py-4">
      <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold uppercase tracking-[0.1em] text-slate">Currently</span>
              <RatingBadge rating={requirement.rating} />
            </div>
            {requirement.rating === 'unverified' ? (
              <section>
                <h3 className="text-lg font-semibold text-navy">Evidence needed to assess</h3>
                <p className="mt-1 leading-snug">{requirement.nextAction}</p>
                <p className="mt-2 text-[0.9375rem] leading-snug text-slate">
                  Unverified is not a gap. Once the evidence is reviewed, the requirement is rated against the standards below.
                </p>
              </section>
            ) : (
              <section>
                <h3 className="text-lg font-semibold text-navy">Action needed</h3>
                <p className="mt-1 leading-snug">{requirement.nextAction}</p>
              </section>
            )}
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-slate">Proof standards</h3>
              <ul className="mt-3 space-y-4">
                {proofFolders
                  .filter((f) => requirement.rating === 'unverified' || (typeof requirement.rating === 'number' && f.rating > requirement.rating))
                  .map((folder) => (
                    <li key={folder.rating}>
                      <RatingBadge rating={folder.rating} />
                      <p className="mt-1.5 leading-snug">{folder.contents.join(' · ')}</p>
                    </li>
                  ))}
              </ul>
              <p className="mt-3 text-[0.9375rem] text-slate">Each promotion applies to this requirement and scope only.</p>
            </section>
          </div>
    </div>
  )
}

function Detail({ requirement }: { requirement: Requirement }) {
  const [raiseOpen, setRaiseOpen] = useState(false)
  const info = ratingInfo(requirement.rating)
  return (
    <article key={requirement.id} className="swap-in" aria-labelledby="requirement-title">
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate">
        {requirement.id} · {dimensionName(requirement.dimension)}
      </p>
      <h3 id="requirement-title" className="mt-1 text-[1.75rem] font-bold leading-tight text-navy">
        {requirement.title}
      </h3>
      <p className="mt-2 text-lg leading-snug text-slate">{requirement.scope}</p>

      <div className={`mt-6 flex items-start gap-4 rounded-panel px-5 py-5 ${info.soft}`}>
        <span aria-hidden className={`flex size-12 shrink-0 items-center justify-center rounded-full text-xl font-bold ${info.solid}`}>
          {info.symbol}
        </span>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate">Rating</p>
          <p className={`text-xl font-bold leading-snug ${info.text}`}>
            {info.symbol} — {info.label}
          </p>
          <p className="mt-0.5 leading-snug text-ink">{info.meaning}</p>
          <p className="mt-2 text-[0.9375rem] leading-snug text-slate">{requirement.ratingRationale}</p>
        </div>
      </div>

      <ol className="mt-8">
        <Step icon={FileText} label="Current evidence" tone="bg-blue-soft text-blue">
          {requirement.currentEvidence}
        </Step>
        <Step icon={CircleAlert} label="Limitation" tone="bg-amber-soft text-amber">
          {requirement.limitation}
        </Step>
        <Step icon={ListChecks} label="Action needed" tone="bg-accent-soft text-accent-strong">
          {requirement.nextAction}
        </Step>
        <Step icon={UserRound} label="Proposed owner" tone="bg-violet-soft text-violet" last>
          <span className="font-semibold text-navy">{requirement.proposedOwnerRole}</span>
          <span className="mt-0.5 block text-[0.9375rem] text-slate">{NAMED_OWNER_NOTE}</span>
        </Step>
      </ol>

      <PlanningBlock requirement={requirement} />

      <div className="mt-8 space-y-3 border-t border-line pt-5">
        {requirement.sourceIds.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-sm font-semibold uppercase tracking-[0.12em] text-slate">Sources</span>
            <SourceReference ids={requirement.sourceIds} />
          </div>
        )}
        <p className="text-[0.9375rem] text-slate">
          Reviewed {requirement.assessmentDate} · Provisional · Decision relevance: not assessed
        </p>
        <p className="text-[0.9375rem] text-slate">{sourceReuseNote}</p>
        <button type="button" aria-expanded={raiseOpen} aria-controls="raise-detail" onClick={() => setRaiseOpen((v) => !v)} className={actionClass('secondary')}>
          What would raise this rating?
          <ChevronDown aria-hidden className={`size-4 transition-transform ${raiseOpen ? 'rotate-180' : ''}`} />
        </button>
        {raiseOpen && <RaiseDetail requirement={requirement} />}
      </div>
    </article>
  )
}

/**
 * Master-detail explorer: one requirement at a time. Filtering never changes a rating, and nothing here
 * saves or persists. The state lives in the page so overview tiles can select a dimension.
 */
export function AssessmentExplorer({ explorer }: { explorer: Explorer }) {
  const { state, visible, selected, selectDimension, setQuery, setRating, clearFilters, select } = explorer
  const [listOpen, setListOpen] = useState(false)
  const [methodOpen, setMethodOpen] = useState(false)

  const inScope = requirements.filter((r) => state.dimension === 'all' || r.dimension === state.dimension).length
  const filtered = state.query.trim() !== '' || state.rating !== 'all'

  const ratingOptions: { value: RatingFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 1, label: 'Emerging' },
    { value: 'unverified', label: 'Unverified' },
  ]

  // Group the list by dimension only when every dimension is shown.
  const groups = (state.dimension === 'all' ? dimensions : dimensions.filter((d) => d.id === state.dimension))
    .map((d) => ({ dimension: d, items: visible.filter((r) => r.dimension === d.id) }))
    .filter((g) => g.items.length > 0)

  return (
    <div>
      <div className="mb-5">
        <button
          type="button"
          aria-expanded={methodOpen}
          aria-controls="rating-method"
          onClick={() => setMethodOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-md text-[0.9375rem] font-semibold text-accent underline-offset-4 hover:underline"
        >
          How ratings work
          <ChevronDown aria-hidden className={`size-4 transition-transform ${methodOpen ? 'rotate-180' : ''}`} />
        </button>
        {methodOpen && (
          <div id="rating-method" className="swap-in mt-3 rounded-panel border border-line bg-white px-5 py-6">
            <RatingsMethod />
          </div>
        )}
      </div>
      <div className="grid gap-x-5 gap-y-4 md:grid-cols-2 xl:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
        <div>
          <label htmlFor="dimension" className="mb-1.5 block text-sm font-semibold text-slate">
            Dimension
          </label>
          <select
            id="dimension"
            value={state.dimension}
            onChange={(event) => selectDimension(event.target.value as typeof state.dimension)}
            className={field}
          >
            {dimensions.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
            <option value="all">All dimensions</option>
          </select>
        </div>
        <div>
          <label htmlFor="search" className="mb-1.5 block text-sm font-semibold text-slate">
            Search requirement, evidence or owner
          </label>
          <div className="relative">
            <Search aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate" />
            <input
              id="search"
              type="search"
              value={state.query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="For example: security, Motilal, lead"
              className={`${field} pl-10`}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
        <div role="group" aria-label="Rating filter" className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-slate">Rating</span>
          {ratingOptions.map((option) => (
            <button
              key={String(option.value)}
              type="button"
              aria-pressed={state.rating === option.value}
              onClick={() => setRating(option.value)}
              className={`rounded-full border px-3.5 py-1.5 text-[0.9375rem] font-semibold transition-colors ${
                state.rating === option.value
                  ? 'border-navy bg-navy text-white'
                  : 'border-navy/20 bg-white text-navy hover:border-accent hover:text-accent'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={clearFilters}
          disabled={!filtered}
          className="rounded-md text-[0.9375rem] font-semibold text-accent underline-offset-4 hover:underline disabled:cursor-default disabled:text-slate/60 disabled:no-underline"
        >
          Clear filters
        </button>
        <p aria-live="polite" className="text-[0.9375rem] text-slate">
          Showing {visible.length} of {inScope} requirements.
        </p>
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-6">
        {/* requirement list */}
        <div>
          <button
            type="button"
            aria-expanded={listOpen}
            aria-controls="requirement-list"
            onClick={() => setListOpen((v) => !v)}
            className="flex w-full items-center justify-between gap-3 rounded-lg border border-line-strong bg-white px-4 py-3 text-left lg:hidden"
          >
            <span className="min-w-0">
              <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-slate">Requirement</span>
              <span className="block truncate text-base font-semibold text-navy">
                {selected ? `${selected.id} · ${selected.title}` : 'None match'}
              </span>
            </span>
            <ChevronDown aria-hidden className={`size-5 shrink-0 transition-transform ${listOpen ? 'rotate-180' : ''}`} />
          </button>

          <div
            id="requirement-list"
            className={`${listOpen ? 'block' : 'hidden'} mt-2 rounded-panel border border-line bg-white lg:mt-0 lg:block`}
          >
            {visible.length === 0 ? (
              <p className="px-5 py-6 text-slate">No requirements match. Clear the filters to see them again.</p>
            ) : (
              groups.map((group) => (
                <div key={group.dimension.id}>
                  {state.dimension === 'all' && (
                    <h4 className="sticky top-0 bg-wash px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate">
                      {group.dimension.name}
                    </h4>
                  )}
                  <ul>
                    {group.items.map((item) => {
                      const active = selected?.id === item.id
                      return (
                        <li key={item.id} className="border-b border-line last:border-b-0">
                          <button
                            type="button"
                            aria-current={active ? 'true' : undefined}
                            onClick={() => {
                              select(item.id)
                              setListOpen(false)
                            }}
                            className={`flex w-full items-start gap-3 border-l-4 px-4 py-3.5 text-left transition-colors ${
                              active ? 'border-accent bg-accent-soft/60' : 'border-transparent hover:bg-wash'
                            }`}
                          >
                            <span className="w-8 shrink-0 pt-0.5 text-sm font-bold text-accent-strong">{item.id}</span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-base font-semibold leading-snug text-navy">{item.title}</span>
                              <RatingBadge rating={item.rating} className="mt-1.5" />
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>

        {/* selected requirement */}
        <div className="rounded-panel border border-line bg-white px-5 py-6 sm:px-6 sm:py-7">
          {selected ? (
            <Detail key={selected.id} requirement={selected} />
          ) : (
            <p className="text-lg text-slate">Select a requirement to see its evidence, limitation and next action.</p>
          )}
        </div>
      </div>

    </div>
  )
}
