import { BookOpen, LayoutDashboard, ListChecks } from 'lucide-react'
import { Container } from '../../layouts/Container'
import { railCopy } from '../../data/readiness/page'

interface Props {
  onOpenSupporting: (opener: HTMLElement) => void
  onOpenRatings: (opener: HTMLElement) => void
}

const item =
  'flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-[1.0625rem] font-medium leading-snug text-slate transition-colors hover:bg-wash hover:text-navy'

/**
 * Readiness is a single slide, so its navigation has no chapter sequence: the Overview (current), and two buttons that
 * open the supporting assessment and the rating methodology. Same rail styling as the other pages.
 */
export function ReadinessRail({ onOpenSupporting, onOpenRatings }: Props) {
  return (
    <>
      <div className="sticky top-[var(--header-h)] z-30 border-b border-white/10 bg-navy-2 text-white xl:hidden">
        <Container>
          <nav aria-label="Readiness" className="flex flex-wrap items-center gap-x-4 gap-y-1 py-2">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">Readiness</span>
            <button type="button" aria-haspopup="dialog" onClick={(e) => onOpenSupporting(e.currentTarget)} className="rounded-md px-2 py-1.5 text-[0.9375rem] font-semibold hover:underline">
              {railCopy.supporting}
            </button>
            <button type="button" aria-haspopup="dialog" onClick={(e) => onOpenRatings(e.currentTarget)} className="rounded-md px-2 py-1.5 text-[0.9375rem] font-semibold hover:underline">
              {railCopy.ratings}
            </button>
          </nav>
        </Container>
      </div>

      <aside className="hidden w-[17rem] shrink-0 border-r border-line bg-canvas xl:block">
        <nav aria-label="Readiness" className="sticky top-[var(--header-h)] max-h-[calc(100dvh-var(--header-h))] overflow-y-auto px-6 pb-6 pt-7">
          <p aria-hidden className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
            04 / Readiness
          </p>
          <p className="mt-2 text-[1.75rem] font-bold leading-tight tracking-tight text-navy">Readiness</p>
          <ul className="mt-5 space-y-1 border-t border-line pt-5">
            <li>
              <a href="#overview" aria-current="location" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 rounded-xl bg-accent-soft px-3.5 py-2.5 text-[1.0625rem] font-bold leading-snug text-navy">
                <LayoutDashboard aria-hidden className="size-5 shrink-0 text-accent" />
                {railCopy.overview}
              </a>
            </li>
            <li>
              <button type="button" aria-haspopup="dialog" onClick={(e) => onOpenSupporting(e.currentTarget)} className={item}>
                <ListChecks aria-hidden className="size-5 shrink-0 text-slate" />
                {railCopy.supporting}
              </button>
            </li>
            <li>
              <button type="button" aria-haspopup="dialog" onClick={(e) => onOpenRatings(e.currentTarget)} className={item}>
                <BookOpen aria-hidden className="size-5 shrink-0 text-slate" />
                {railCopy.ratings}
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}
