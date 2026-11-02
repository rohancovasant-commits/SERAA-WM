import type { PageIntro, SectionLink } from '../../data/types'
import { Section } from './Section'

interface PageOpeningProps {
  /** Page number and name, for example "06 / Decisions". */
  eyebrow: string
  heading: string
  intro: PageIntro
  /** The chapters that follow, listed so the reader can see the page at a glance. */
  chapters: SectionLink[]
  onSelect: (id: string) => void
}

/**
 * A page's introduction, as a chapter of its own: headline, summary, status, caveat and headline points, then the
 * chapters that follow. It carries the page's h1.
 */
export function PageOpening({ eyebrow, heading, intro, chapters, onSelect }: PageOpeningProps) {
  const sub = intro.summary && intro.summary !== heading ? intro.summary : null
  return (
    <Section id="introduction" headingId="introduction-title">
      <p aria-hidden className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
        {eyebrow}
      </p>
      <h1 id="introduction-title" className="mt-3 max-w-4xl text-[2.5rem] font-bold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-[3.5rem]">
        {heading}
      </h1>
      {sub && <p className="mt-4 max-w-3xl text-xl leading-snug text-slate sm:text-2xl">{sub}</p>}

      {(intro.status || intro.points) && (
        <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
          {intro.status && (
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-1.5 text-base font-semibold text-accent-strong">
              <span aria-hidden className="size-2 shrink-0 rounded-full bg-accent" />
              {intro.status}
            </p>
          )}
          {intro.points && (
            <ul className="flex flex-wrap gap-x-7 gap-y-2">
              {intro.points.map((point) => (
                <li key={point.text} className="flex items-center gap-2.5 text-lg font-semibold text-ink">
                  <span aria-hidden className={`size-3 shrink-0 rounded-full ${point.dotClass}`} />
                  {point.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {intro.note && <p className="mt-5 text-base italic text-slate">{intro.note}</p>}

      <div className="mt-12 border-t border-line pt-8">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate">In this page</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {chapters.map((chapter, i) => (
            <li key={chapter.id}>
              <button
                type="button"
                onClick={() => onSelect(chapter.id)}
                className="group flex w-full items-center gap-3.5 rounded-card border border-line-strong bg-white px-4 py-3.5 text-left transition-colors hover:border-accent"
              >
                <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-full bg-wash text-sm font-bold text-navy group-hover:bg-accent group-hover:text-white">
                  {i + 2}
                </span>
                <span className="text-lg font-semibold leading-snug text-navy">{chapter.label}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
