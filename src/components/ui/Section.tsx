import type { ReactNode } from 'react'

type Surface = 'canvas' | 'sky' | 'lilac' | 'warm'

const surfaces: Record<Surface, string> = {
  canvas: 'bg-canvas',
  sky: 'bg-blue-soft',
  lilac: 'bg-violet-soft',
  warm: 'bg-[#f5f5f2]',
}

interface SectionProps {
  id: string
  /** id of the heading inside the section, for aria-labelledby. */
  headingId: string
  surface?: Surface
  children: ReactNode
}

/**
 * Full-width band with its own surface colour. The band starts exactly under the sticky chrome
 * when navigated to (scroll-mt), and its top padding then clears the heading.
 */
export function Section({ id, headingId, surface = 'canvas', children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={headingId} className={`scroll-mt-[var(--anchor-offset)] ${surfaces[surface]}`}>
      <div className="mx-auto w-full max-w-[1280px] px-4 py-14 sm:px-6 sm:py-[4.5rem] lg:px-8 xl:max-w-[1560px] xl:px-10">
        {children}
      </div>
    </section>
  )
}
