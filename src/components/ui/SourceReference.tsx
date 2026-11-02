import type { SourceId } from '../../data/types'
import { sources, sourceShortLabel } from '../../data/sources'
import { useSources } from '../../context/SourcesContext'

interface SourceReferenceProps {
  ids: SourceId[]
  className?: string
  /** Use on navy surfaces. */
  onDark?: boolean
}

/** Readable source chips ("Capgemini 2026"). Each opens the shared source drawer. */
export function SourceReference({ ids, className = '', onDark = false }: SourceReferenceProps) {
  const { openSource } = useSources()
  if (ids.length === 0) return null
  const tone = onDark
    ? 'border-white/25 text-white/90 hover:border-teal-bright hover:text-teal-bright'
    : 'border-line-strong bg-surface/70 text-slate hover:border-accent hover:text-accent'
  return (
    <span className={`inline-flex flex-wrap items-center gap-1.5 align-middle ${className}`}>
      {ids.map((id) => (
        <button
          key={id}
          type="button"
          onClick={(event) => openSource(id, event.currentTarget)}
          aria-label={`Source: ${sources[id].title}. Opens evidence details.`}
          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[0.8125rem] font-medium leading-5 transition-colors ${tone}`}
        >
          <svg aria-hidden viewBox="0 0 16 16" className="size-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 2.5h7l3 3v8H3z M10 2.5v3h3" strokeLinejoin="round" />
          </svg>
          {sourceShortLabel[id]}
        </button>
      ))}
    </span>
  )
}
