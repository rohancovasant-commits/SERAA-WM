interface ShareBarProps {
  /** Two or more parts of a whole that sum to 100. */
  segments: { label: string; value: number }[]
  /** Describes the bar for assistive technology. */
  summary: string
}

/** A horizontal 100% bar. The first segment is emphasised; every segment is labelled in text. */
export function ShareBar({ segments, summary }: ShareBarProps) {
  return (
    <div>
      <div role="img" aria-label={summary} className="flex h-11 w-full overflow-hidden rounded-lg border border-hairline">
        {segments.map((segment, i) => (
          <div
            key={segment.label}
            style={{ width: `${segment.value}%` }}
            className={`flex items-center px-3 text-[0.9375rem] font-semibold ${
              i === 0 ? 'bg-accent text-white' : 'bg-wash text-ink'
            }`}
          >
            {segment.value}%
          </div>
        ))}
      </div>
      <ul className="mt-2.5 flex flex-wrap gap-x-6 gap-y-1 text-[0.9375rem]">
        {segments.map((segment, i) => (
          <li key={segment.label} className="flex items-center gap-2">
            <span
              aria-hidden
              className={`size-3 rounded-sm border ${i === 0 ? 'border-accent bg-accent' : 'border-line-strong bg-wash'}`}
            />
            {segment.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
