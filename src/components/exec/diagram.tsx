import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import type { Tone } from '../../data/opportunity/opening'
import { toneStyles } from '../../styles/tones'
import { exec } from './styles'

/**
 * Editable business diagram parts: boxes, labels and arrows are live text and CSS, not pictures. Used for sequences
 * and compositions. Colour groups steps; it never scores them.
 */
export function FlowRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <ol aria-label={label} className="flex flex-col gap-7 md:flex-row md:gap-8">
      {children}
    </ol>
  )
}

interface FlowNodeProps {
  /** Step number, or a short mark such as "+". Decorative. */
  mark: string
  title: string
  caption?: string
  tone?: Tone | 'navy'
  /** Small status line under the caption, such as "Proposed". */
  status?: string
  /** Draw a connector to the next node. */
  arrow?: boolean
  /** Draw a plus instead of an arrow, for a composition. */
  plus?: boolean
}

export function FlowNode({ mark, title, caption, tone = 'teal', status, arrow = true, plus = false }: FlowNodeProps) {
  const t = toneStyles[tone]
  return (
    <li className="relative flex-1">
      <div className={`h-full rounded-lg border border-hairline-soft p-4 ${t.soft}`}>
        <span aria-hidden className={`inline-flex size-8 items-center justify-center rounded-full text-sm font-bold ${t.solid} ${t.onSolid}`}>
          {mark}
        </span>
        <p className={`mt-2 ${exec.strong} text-[1.0625rem]`}>{title}</p>
        {caption && <p className={`mt-0.5 ${exec.body}`}>{caption}</p>}
        {status && <p className={`mt-2 text-[0.8125rem] font-semibold ${t.text}`}>{status}</p>}
      </div>
      {arrow && (
        <span
          aria-hidden
          className="absolute -bottom-[1.375rem] left-1/2 z-10 flex size-6 -translate-x-1/2 items-center justify-center rounded-full bg-white text-slate ring-1 ring-hairline md:-right-[1.1875rem] md:bottom-auto md:left-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0"
        >
          {plus ? <span className="text-base font-bold leading-none">+</span> : <ArrowRight className="size-3.5 rotate-90 md:rotate-0" />}
        </span>
      )}
    </li>
  )
}
