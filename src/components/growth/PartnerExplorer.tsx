import { useState } from 'react'
import { ArrowRight, Building2, FileWarning } from 'lucide-react'
import {
  dependencyLabel,
  relationshipRecord,
  relationshipRecordLabel,
  relationshipTypes,
  relationshipTypesLabel,
  targetAccountLabel,
  type RelationshipType,
} from '../../data/growth/partnerships'
import { QualifierPill } from './StatusChip'

/** Grid placement of each relationship type around the account, on wide screens. */
const placement: Record<RelationshipType['id'], string> = {
  cloud: 'lg:col-start-1 lg:row-start-1',
  crm: 'lg:col-start-1 lg:row-start-2',
  supplier: 'lg:col-start-3 lg:row-start-1',
  domain: 'lg:col-start-3 lg:row-start-2',
}

/**
 * An account at the centre, its adjacent dependency beside it, and four relationship types around it. Selecting
 * a type opens its assessment. Every type is tied to the account rather than listed as a logo.
 */
export function PartnerExplorer() {
  const [selected, setSelected] = useState<RelationshipType['id']>('cloud')
  const current = relationshipTypes.find((t) => t.id === selected) ?? relationshipTypes[0]

  return (
    <div>
      <div className="relative rounded-panel border border-line bg-white px-4 py-8 sm:px-8 sm:py-10">
        {/* Dashed links from the account to each relationship type (wide screens). */}
        <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block">
          {[
            [50, 50, 27, 27],
            [50, 50, 27, 73],
            [50, 50, 73, 27],
            [50, 50, 73, 73],
          ].map(([x1, y1, x2, y2]) => (
            <line key={`${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9aa5b4" strokeWidth="1.6" strokeDasharray="2 5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>

        <div className="relative grid gap-6 lg:grid-cols-[0.8fr_1.6fr_0.8fr] lg:gap-x-8 lg:gap-y-10">
          <div className="order-first flex items-center justify-center gap-3 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <figure className="m-0 flex min-w-0 flex-1 flex-col items-center rounded-xl border border-hairline-soft bg-blue-soft px-4 py-6 text-center">
              <Building2 aria-hidden strokeWidth={1.4} className="size-12 text-blue" />
              <figcaption className="mt-2 text-sm font-bold uppercase tracking-[0.1em] text-blue">{targetAccountLabel}</figcaption>
            </figure>
            <ArrowRight aria-hidden className="size-5 shrink-0 text-slate" />
            <figure className="m-0 flex min-w-0 flex-1 flex-col items-center rounded-xl border border-hairline-soft bg-amber-soft px-4 py-6 text-center">
              <FileWarning aria-hidden strokeWidth={1.4} className="size-12 text-amber" />
              <figcaption className="mt-2 text-sm font-bold uppercase leading-tight tracking-[0.1em] text-amber">{dependencyLabel}</figcaption>
            </figure>
          </div>

          <div role="group" aria-label={relationshipTypesLabel} className="contents">
            {relationshipTypes.map((type, i) => {
              const active = type.id === selected
              return (
                <button
                  key={type.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelected(type.id)}
                  className={`relative flex items-center gap-3 rounded-card border-2 bg-white px-4 py-4 text-left transition-colors lg:self-center ${placement[type.id]} ${
                    active ? 'border-accent bg-accent-soft shadow-sm' : 'border-line-strong hover:border-accent'
                  }`}
                >
                  <span
                    aria-hidden
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${active ? 'bg-accent text-white' : 'bg-wash text-slate'}`}
                  >
                    {i + 1}
                  </span>
                  <span className="text-lg font-semibold leading-tight text-navy">{type.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div aria-live="polite" className="swap-in mt-4 rounded-panel border border-accent/30 bg-accent-soft/50 px-5 py-6 sm:px-8" key={current.id}>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-accent-strong">{current.label}</h3>
          <QualifierPill tone="teal">{current.status}</QualifierPill>
        </div>
        <dl className="mt-4 grid gap-5 md:grid-cols-2 md:gap-10">
          <div>
            <dt className="text-sm font-semibold uppercase tracking-[0.1em] text-slate">Mutual value</dt>
            <dd className="mt-1 text-xl font-semibold leading-snug text-navy">{current.mutualValue}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold uppercase tracking-[0.1em] text-slate">Next action</dt>
            <dd className="mt-1 text-xl font-semibold leading-snug text-navy">{current.nextAction}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-slate">{relationshipRecordLabel}</p>
        <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2.5">
          {relationshipRecord.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className="rounded-full border border-navy/20 bg-white px-4 py-1.5 text-base font-semibold text-navy">{step}</span>
              {i < relationshipRecord.length - 1 && <ArrowRight aria-hidden className="size-4 shrink-0 text-slate" />}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
