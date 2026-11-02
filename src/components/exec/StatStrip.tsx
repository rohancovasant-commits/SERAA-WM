import { exec } from './styles'

export interface Stat {
  /** The number, already formatted: "41%", "30". */
  value: string
  /** A few words. Name the scope (global, our list) here, not in a footnote. */
  label: string
}

/**
 * A row or grid of headline numbers with a few words each. Use only for sourced or counted figures.
 * `columns` is the column count from `sm` up; below that the grid is two across.
 */
export function StatStrip({ items, columns = 3, className = '' }: { items: Stat[]; columns?: 2 | 3 | 4; className?: string }) {
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4' }[columns]
  return (
    <dl className={`grid grid-cols-2 gap-x-6 gap-y-5 ${cols} ${className}`}>
      {items.map((item) => (
        <div key={item.label} className="min-w-0">
          <dd className={`${exec.figure} text-[2.25rem]`}>{item.value}</dd>
          <dt className={`mt-1.5 ${exec.body}`}>{item.label}</dt>
        </div>
      ))}
    </dl>
  )
}
