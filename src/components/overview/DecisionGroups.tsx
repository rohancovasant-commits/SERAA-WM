import { ChevronRight } from 'lucide-react'
import { decisionsOverview } from '../../data/overviews'
import { exec } from '../exec/styles'

/**
 * The five decisions as the picture: one dashed square per decision (D1 to D5), grouped 1 + 2 + 2 into the three
 * proposals, each beside its concrete proposed direction. The count comes from the groups, not a typed number. Every
 * square is dashed amber, so all five read as Pending; there is no ticked or approved style and nothing is assigned.
 */
export function DecisionGroups() {
  const { groups, label } = decisionsOverview
  const total = groups.reduce((n, g) => n + g.refs.length, 0)
  return (
    <div>
      <p className="flex items-end gap-4 px-1">
        <span className="text-5xl font-semibold leading-none tracking-tight text-amber sm:text-6xl">{total}</span>
        <span className="max-w-[15rem] pb-1 text-lg font-medium leading-snug text-heading">decisions for leadership, in three proposals.</span>
      </p>
      <ol aria-label={label} className="mt-4 space-y-2.5">
        {groups.map((group) => (
          <li key={group.id} className="grid items-center gap-x-5 gap-y-2 rounded-xl border border-hairline-soft bg-quiet px-4 py-2.5 sm:grid-cols-[6.5rem_minmax(0,1fr)]">
            <span className="flex gap-2" aria-hidden>
              {group.refs.map((ref) => (
                <span key={ref} className="flex size-[2.75rem] items-center justify-center rounded-lg border-2 border-dashed border-amber/70 bg-amber-soft text-lg font-bold text-amber">
                  {ref}
                </span>
              ))}
            </span>
            <div className="min-w-0">
              <p className="text-xl font-bold leading-tight text-heading">
                {group.title}
                <span className="sr-only"> (decisions {group.refs.join(' and ')})</span>
              </p>
              <p className="mt-1 text-lg leading-snug text-slate">{group.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

/** The compact roadmap as one horizontal track with a single shared status line; no step is marked done. */
export function RoadmapTrack() {
  const { roadmap, roadmapCaption } = decisionsOverview
  return (
    <div>
      <ol aria-label="Roadmap" className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
        {roadmap.map((step, i) => (
          <li key={step} className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-2 rounded-lg bg-navy-3 px-3 py-2 text-base font-bold text-white">
              <span aria-hidden className="text-[0.9375rem] text-teal-bright">
                {i + 1}
              </span>
              {step}
            </span>
            {i < roadmap.length - 1 && <ChevronRight aria-hidden className="size-4 shrink-0 text-slate" />}
          </li>
        ))}
      </ol>
      <p className={`mt-2 font-medium ${exec.meta}`}>{roadmapCaption}</p>
    </div>
  )
}
