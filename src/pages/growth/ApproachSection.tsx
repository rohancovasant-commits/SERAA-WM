import { ArrowRight } from 'lucide-react'
import { Section } from '../../components/ui/Section'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { DetailDrawer } from '../../components/ui/DetailDrawer'
import { actionClass } from '../../components/ui/actionClass'
import { PathwayDiagram } from '../../components/growth/PathwayDiagram'
import { DirectionsPanel } from '../../components/growth/DirectionsPanel'
import { useDrawer } from '../../hooks/useDrawer'
import { approachHeading, approachStatement, directionsButton, pathNote } from '../../data/growth/approach'

export function ApproachSection() {
  const drawer = useDrawer<true>()
  return (
    <Section id="approach" headingId="approach-title">
      <SectionHeading id="approach-title" eyebrow="Approach" title={approachHeading} />

      <div className="mt-10">
        <PathwayDiagram />
        <p className="mt-3 text-[0.9375rem] italic text-slate">{pathNote}</p>
      </div>

      <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-2xl border-l-4 border-accent pl-6 text-2xl font-bold leading-snug text-navy sm:text-[1.75rem]">{approachStatement}</p>
        <button
          type="button"
          aria-haspopup="dialog"
          className={`${actionClass('secondary')} self-start lg:self-auto`}
          onClick={(event) => drawer.open(true, event.currentTarget)}
        >
          {directionsButton}
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <DetailDrawer
        open={drawer.value !== null}
        onClose={drawer.close}
        title={directionsButton}
        eyebrow="Proposed directions · Strategic status"
        returnFocusRef={drawer.trigger}
      >
        <DirectionsPanel />
      </DetailDrawer>
    </Section>
  )
}
