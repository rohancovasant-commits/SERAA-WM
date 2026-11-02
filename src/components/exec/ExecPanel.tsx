import type { ReactNode } from 'react'
import { exec } from './styles'

interface ExecPanelProps {
  /** id of the panel heading, for aria-labelledby. */
  id: string
  title: string
  /** Small uppercase tag above the title. */
  tag?: string
  /** Right-hand slot in the heading row: a count, a legend, a link. */
  aside?: ReactNode
  /** `plain` is a white block; `tint` is the single teal-tinted block, used for the recommendation. */
  variant?: 'plain' | 'tint'
  className?: string
  children: ReactNode
}

/** One block of an overview: flat outline, one heading, content. */
export function ExecPanel({ id, title, tag, aside, variant = 'plain', className = '', children }: ExecPanelProps) {
  const surface = variant === 'tint' ? 'border-t-[3px] border-t-accent bg-tint' : 'bg-white'
  return (
    <section aria-labelledby={id} className={`${exec.panel} ${surface} p-5 sm:p-6 ${className}`}>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
        <div>
          {tag && <p className={`text-[0.75rem] font-bold uppercase tracking-[0.14em] ${variant === 'tint' ? 'text-accent-strong' : 'text-accent'}`}>{tag}</p>}
          <h3 id={id} className={`${tag ? 'mt-1.5' : ''} ${exec.h3}`}>
            {title}
          </h3>
        </div>
        {aside}
      </div>
      {children}
    </section>
  )
}
