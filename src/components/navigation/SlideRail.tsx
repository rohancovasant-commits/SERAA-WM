import type { LucideIcon } from 'lucide-react'
import { LayoutDashboard } from 'lucide-react'
import { Container } from '../../layouts/Container'

export interface SlideAction {
  label: string
  icon: LucideIcon
  onOpen: (opener: HTMLElement) => void
}

const item =
  'flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-[1.0625rem] font-medium leading-snug text-slate transition-colors hover:bg-wash hover:text-navy'

/**
 * Navigation for a page that is one slide: the slide itself (current) and buttons that open its supporting panels.
 * There is no chapter sequence, count or Previous/Next. Same rail styling as the other pages.
 */
export function SlideRail({ number, title, overviewLabel = 'Overview', actions }: { number: string; title: string; overviewLabel?: string; actions: SlideAction[] }) {
  return (
    <>
      <div className="sticky top-[var(--header-h)] z-30 border-b border-white/10 bg-navy-2 text-white xl:hidden">
        <Container>
          <nav aria-label={title} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-2">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">{title}</span>
            {actions.map((a) => (
              <button key={a.label} type="button" aria-haspopup="dialog" onClick={(e) => a.onOpen(e.currentTarget)} className="rounded-md px-2 py-1.5 text-[0.9375rem] font-semibold hover:underline">
                {a.label}
              </button>
            ))}
          </nav>
        </Container>
      </div>

      <aside className="hidden w-[17rem] shrink-0 border-r border-line bg-canvas xl:block">
        <nav aria-label={title} className="sticky top-[var(--header-h)] max-h-[calc(100dvh-var(--header-h))] overflow-y-auto px-6 pb-6 pt-7">
          <p aria-hidden className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
            {number} / {title}
          </p>
          <p className="mt-2 text-[1.75rem] font-bold leading-tight tracking-tight text-navy">{title}</p>
          <ul className="mt-5 space-y-1 border-t border-line pt-5">
            <li>
              <a href="#overview" aria-current="location" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 rounded-xl bg-accent-soft px-3.5 py-2.5 text-[1.0625rem] font-bold leading-snug text-navy">
                <LayoutDashboard aria-hidden className="size-5 shrink-0 text-accent" />
                {overviewLabel}
              </a>
            </li>
            {actions.map((a) => (
              <li key={a.label}>
                <button type="button" aria-haspopup="dialog" onClick={(e) => a.onOpen(e.currentTarget)} className={item}>
                  <a.icon aria-hidden className="size-5 shrink-0 text-slate" />
                  {a.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}
