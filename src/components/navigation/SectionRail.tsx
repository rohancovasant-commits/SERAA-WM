import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { PageIntro, SectionLink } from '../../data/types'
import { actionClass } from '../ui/actionClass'

interface SectionRailProps {
  title: string
  /** Page number in the main navigation, for example "02". */
  number?: string
  intro?: PageIntro
  sections: SectionLink[]
  activeId: string | null
  label: string
  onSelect: (id: string) => void
  /** Hide the rail's Previous/Next pair, where the chapter's own bottom pager is the only one wanted. */
  hidePager?: boolean
}

/**
 * Left rail for wide screens. It carries the page identity (number, title, one-line summary, status), then the
 * numbered sections joined by a vertical line, then the page's evidence action. Sticky under the header.
 */
export function SectionRail({ title, number, intro, sections, activeId, label, onSelect, hidePager = false }: SectionRailProps) {
  const activeIndex = sections.findIndex((s) => s.id === activeId)
  return (
    <aside className="hidden w-[17rem] shrink-0 border-r border-line bg-canvas xl:block">
      <nav aria-label={label} className="sticky top-[var(--header-h)] max-h-[calc(100dvh-var(--header-h))] overflow-y-auto px-6 pb-6 pt-7">
        {number && (
          <p aria-hidden className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
            {number} / {title}
          </p>
        )}
        <p className="mt-2 text-[1.75rem] font-bold leading-tight tracking-tight text-navy">{title}</p>
        <div className="mt-5 border-t border-line pt-5">
          <p className="flex items-baseline justify-between text-sm font-bold uppercase tracking-[0.12em] text-slate">
            On this page
            <span className="text-[0.8125rem] font-semibold normal-case tracking-normal text-slate/80">
              {activeIndex >= 0 ? `${activeIndex + 1} of ${sections.length}` : `${sections.length} sections`}
            </span>
          </p>
          <ol className="relative mt-3">
            <span aria-hidden className="absolute bottom-5 left-[1.125rem] top-5 w-px bg-line-strong" />
            {sections.map((section, i) => {
              const active = section.id === activeId
              return (
                <li key={section.id} className="relative">
                  <a
                    href={`#${section.id}`}
                    aria-current={active ? 'location' : undefined}
                    onClick={(event) => {
                      event.preventDefault()
                      onSelect(section.id)
                    }}
                    className="group flex items-center gap-3 py-1"
                  >
                    <span
                      aria-hidden
                      className={`relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                        active
                          ? 'border-accent bg-accent text-white'
                          : 'border-line-strong bg-canvas text-slate group-hover:border-accent group-hover:text-accent'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={`flex-1 rounded-xl px-3.5 py-2 text-[1.0625rem] leading-snug transition-colors ${
                        active ? 'bg-accent-soft font-bold text-navy' : 'font-medium text-slate group-hover:bg-wash group-hover:text-navy'
                      }`}
                    >
                      {section.label}
                    </span>
                  </a>
                </li>
              )
            })}
          </ol>
        </div>

        {!hidePager && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={activeIndex <= 0}
            onClick={() => onSelect(sections[activeIndex - 1].id)}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-navy/25 bg-white px-3 py-2.5 text-[0.9375rem] font-semibold text-navy transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-navy/25 disabled:hover:text-navy"
          >
            <ArrowLeft aria-hidden className="size-4" />
            Previous
          </button>
          <button
            type="button"
            disabled={activeIndex < 0 || activeIndex >= sections.length - 1}
            onClick={() => onSelect(sections[activeIndex + 1].id)}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent px-3 py-2.5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-accent"
          >
            Next
            <ArrowRight aria-hidden className="size-4" />
          </button>
        </div>
        )}

        {intro?.action && (
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={(event) => intro.action?.onOpen(event.currentTarget)}
            className={`${actionClass('secondary')} mt-3 w-full`}
          >
            {intro.action.label}
          </button>
        )}
      </nav>
    </aside>
  )
}
