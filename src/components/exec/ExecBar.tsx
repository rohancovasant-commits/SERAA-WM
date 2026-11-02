import type { ReactNode } from 'react'
import { exec } from './styles'

/**
 * The one-line recommendation that closes an overview: a small tag, one sentence, an optional link. It is the only
 * teal block on the page.
 */
export function ExecBar({ tag, children, action }: { tag: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className={`${exec.panel} flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t-[3px] border-t-accent bg-tint px-5 py-4 sm:px-6`}>
      <p className="min-w-0 flex-1 basis-[18rem]">
        <span className="block text-[0.75rem] font-bold uppercase tracking-[0.14em] text-accent-strong">{tag}</span>
        <span className="mt-1 block text-xl font-bold leading-snug text-heading">{children}</span>
      </p>
      {action}
    </div>
  )
}
