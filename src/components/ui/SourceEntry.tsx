import { ExternalLink } from 'lucide-react'
import type { SourceId } from '../../data/types'
import { sources, sourceShortLabel } from '../../data/sources'
import { EvidenceLabel } from './EvidenceLabel'

/** Full description of one source: title, date, note and original link. */
export function SourceEntry({ id }: { id: SourceId }) {
  const source = sources[id]
  return (
    <article className="rounded-card border border-line bg-canvas p-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="rounded-md bg-navy px-2 py-0.5 text-sm font-semibold text-white">{sourceShortLabel[source.id]}</span>
        <EvidenceLabel kind={source.evidence} />
        {source.sourceType && (
          <span className="rounded-full border border-line-strong px-2.5 py-0.5 text-[0.8125rem] font-medium leading-5 text-slate">
            {source.sourceType}
          </span>
        )}
      </div>
      <h3 className="mt-3 text-base font-semibold leading-snug">{source.title}</h3>
      {(source.publisher || source.date) && (
        <p className="mt-0.5 text-[0.9375rem] text-slate">
          {[source.publisher, source.date].filter(Boolean).join(' · ')}
        </p>
      )}
      <p className="mt-2 text-[0.9375rem] leading-relaxed">{source.note}</p>
      {source.url ? (
        <>
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
          >
            Open original source
            <ExternalLink aria-hidden className="size-4" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <p className="mt-1.5 break-all text-sm text-slate">{source.url}</p>
        </>
      ) : null}
    </article>
  )
}

export function SourceList({ ids }: { ids: SourceId[] }) {
  if (ids.length === 0) return null
  return (
    <div className="space-y-3">
      {ids.map((id) => (
        <SourceEntry key={id} id={id} />
      ))}
    </div>
  )
}
