import type { ReactNode } from 'react'
import { exec } from '../exec/styles'

/** The compact teal band that closes a chapter: one statement, an optional supporting line, and the buttons. */
export function ClosingBand({ tag, children, support, buttons }: { tag?: string; children: ReactNode; support?: ReactNode; buttons?: ReactNode }) {
  return (
    <section className={`${exec.panel} border-l-[6px] border-l-accent bg-tint px-5 py-4 sm:px-6`}>
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
        <p className="min-w-0 flex-1 basis-[22rem]">
          {tag && <span className="block text-[0.75rem] font-bold uppercase tracking-[0.14em] text-accent-strong">{tag}</span>}
          <span className="block text-xl font-bold leading-snug text-heading">{children}</span>
          {support && <span className="mt-1 block text-base leading-snug text-slate">{support}</span>}
        </p>
        {buttons && <div className="flex flex-wrap items-center gap-3">{buttons}</div>}
      </div>
    </section>
  )
}

/** Small uppercase caption used above blocks. */
export function Caption({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`${exec.label} ${className}`}>{children}</p>
}
