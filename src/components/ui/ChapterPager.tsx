import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { SectionLink } from '../../data/types'

interface ChapterPagerProps {
  sections: SectionLink[]
  index: number
  onSelect: (id: string) => void
}

const base =
  'group inline-flex min-w-0 items-center gap-3 rounded-xl border-2 px-5 py-3.5 text-left transition-colors disabled:cursor-not-allowed'

/**
 * Previous and next chapter. Each button names the chapter it leads to, so the order is always visible. The next
 * button is replaced by a note on the last chapter, where the page's closing statement carries on.
 */
export function ChapterPager({ sections, index, onSelect }: ChapterPagerProps) {
  const prev = sections[index - 1]
  const next = sections[index + 1]
  return (
    <nav aria-label="Chapters" className="border-t border-line bg-canvas">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-6 sm:px-6 lg:px-8 xl:max-w-[1560px] xl:px-10">
        {prev ? (
          <button type="button" onClick={() => onSelect(prev.id)} className={`${base} justify-self-start border-line-strong bg-white text-navy hover:border-accent`}>
            <ArrowLeft aria-hidden className="size-5 shrink-0 text-accent transition-transform group-hover:-translate-x-0.5" />
            <span className="min-w-0">
              <span className="block text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-slate">Previous</span>
              <span className="block text-lg font-bold leading-tight">{prev.label}</span>
            </span>
          </button>
        ) : (
          <span />
        )}
        <span className="hidden text-sm font-semibold text-slate sm:inline">
          {index + 1} of {sections.length}
        </span>
        {next ? (
          <button type="button" onClick={() => onSelect(next.id)} className={`${base} justify-self-end border-accent bg-accent text-white hover:bg-accent-strong`}>
            <span className="min-w-0 text-right">
              <span className="block text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-white/80">Next</span>
              <span className="block text-lg font-bold leading-tight">{next.label}</span>
            </span>
            <ArrowRight aria-hidden className="size-5 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </button>
        ) : (
          <span />
        )}
      </div>
    </nav>
  )
}
