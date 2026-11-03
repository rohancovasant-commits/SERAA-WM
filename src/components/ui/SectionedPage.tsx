import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { PageIntro, SectionLink } from '../../data/types'
import { navItems } from '../../data/navigation'
import { SectionDropdown } from '../navigation/SectionDropdown'
import { SectionRail } from '../navigation/SectionRail'
import { ChapterPager } from './ChapterPager'
import { PageOpening } from './PageOpening'
import { Section } from './Section'

/** Length of each half of the cross-fade, in milliseconds. */
const FADE_MS = 200

interface SectionedPageProps {
  /** Page name shown at the top of the left rail. */
  title: string
  /** The content chapters, in the same order as the children. */
  sections: SectionLink[]
  /** Content of the introduction chapter (summary, status, note, points) and the evidence action shown in the rail. */
  intro?: PageIntro
  /**
   * Executive overview, shown as the first chapter in place of the plain opening. It receives the page eyebrow and a
   * chapter selector, and must render the page h1 with id "introduction-title".
   */
  overview?: (api: { eyebrow: string; select: (id: string) => void }) => ReactNode
  /** Label for the first chapter when it is the overview (default "Overview"). */
  introLabel?: string
  /** Page headline: the h1 of the opening, and a visually hidden h1 on other chapters. */
  heading?: string
  /** Chapter ids whose view keeps only the bottom Previous/Next pair, so the left rail does not repeat it. */
  railPagerHiddenOn?: string[]
  /** Band shown under the last chapter (closing statement, next-page navigation). */
  closing?: ReactNode
  /** One element per content chapter, in the order of `sections`. The introduction is added before them. */
  children: ReactNode
}

/**
 * Shared page frame. Shows one chapter at a time: the left rail, the small-screen menu and the Previous/Next buttons
 * all change chapter, with a short fade. The chapter is kept in the URL hash, so links and reloads land on it.
 */
export function SectionedPage({ title, sections: contentSections, intro, overview, introLabel, heading, railPagerHiddenOn: hiddenOn, closing, children }: SectionedPageProps) {
  const number = navItems.find((item) => item.label === title)?.number
  // With an intro, the page's first chapter is the introduction itself, ahead of the content chapters.
  const sections: SectionLink[] = intro ? [{ id: 'introduction', label: overview ? (introLabel ?? 'Overview') : 'Introduction' }, ...contentSections] : contentSections
  // An executive overview is a whole screen with its own next-action bar, so the rail does not repeat Previous/Next there.
  const railPagerHiddenOn = overview ? ['introduction', ...(hiddenOn ?? [])] : hiddenOn
  const content = Children.toArray(children)
  const { hash } = useLocation()
  const navigate = useNavigate()
  const hashIndex = sections.findIndex((s) => s.id === hash.slice(1))

  // `index` is the chapter asked for; `shown` is the one on screen, which lags by the fade-out.
  const [index, setIndex] = useState(Math.max(0, hashIndex))
  const [shown, setShown] = useState(index)
  const [visible, setVisible] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)

  // A link or reload with a chapter hash (including links from inside the page) selects that chapter.
  useEffect(() => {
    if (hashIndex >= 0) setIndex(hashIndex)
  }, [hashIndex])

  // Fade the old chapter out, then swap it for the requested one.
  useEffect(() => {
    if (index === shown) {
      setVisible(true) // asked to go back to the chapter still on screen
      return
    }
    const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setVisible(false)
    const timer = window.setTimeout(
      () => {
        setShown(index)
        // Bring the new chapter's start into view if the reader had scrolled past it.
        const el = contentRef.current
        if (el && el.getBoundingClientRect().top < 70) el.scrollIntoView({ block: 'start', behavior: 'instant' })
      },
      instant ? 0 : FADE_MS,
    )
    return () => window.clearTimeout(timer)
  }, [index, shown])

  // Fade the new chapter in. Kept apart from the effect above so a further change cannot cancel it.
  const firstShown = useRef(true)
  useEffect(() => {
    if (firstShown.current) {
      firstShown.current = false
      return
    }
    const frame = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [shown])

  const select = useCallback(
    (id: string) => {
      navigate({ hash: id }, { replace: true })
      const i = sections.findIndex((s) => s.id === id)
      if (i >= 0) setIndex(i)
    },
    [navigate, sections],
  )

  const eyebrow = `${number ? `${number} / ` : ''}${title}`
  const opening = overview ? (
    <Section key="introduction" id="introduction" headingId="introduction-title" surface="warm">
      {overview({ eyebrow, select })}
    </Section>
  ) : (
    intro && <PageOpening key="introduction" eyebrow={eyebrow} heading={heading ?? title} intro={intro} chapters={contentSections} onSelect={select} />
  )
  const chapters = intro ? [opening, ...content] : content
  const active = sections[index]
  const lastShown = shown === sections.length - 1

  return (
    <>
      <SectionDropdown title={title} sections={sections} activeId={active.id} label={`${title} sections`} action={intro?.action} onSelect={select} />
      {!(intro && shown === 0) && <h1 className="sr-only">{heading ?? title}</h1>}
      <div className="xl:flex">
        <SectionRail title={title} number={number} intro={intro} sections={sections} activeId={active.id} label="On this page" onSelect={select} hidePager={railPagerHiddenOn?.includes(active.id)} />
        <div className="min-w-0 flex-1">
          <div ref={contentRef} className="min-h-[70vh] scroll-mt-[var(--anchor-offset)]">
            <div className={`transition-opacity duration-200 ease-out motion-reduce:transition-none ${visible ? 'opacity-100' : 'opacity-0'}`}>
              {chapters[shown]}
            </div>
          </div>
          <ChapterPager sections={sections} index={index} onSelect={select} />
          <p aria-live="polite" className="sr-only">
            {`Chapter ${index + 1} of ${sections.length}: ${active.label}`}
          </p>
        </div>
      </div>
      {lastShown && closing}
    </>
  )
}
