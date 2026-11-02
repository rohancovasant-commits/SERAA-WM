import { Section } from '../../components/ui/Section'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { MilestoneRoadmap } from '../../components/decisions/MilestoneRoadmap'
import { roadmapHeading } from '../../data/decisions/roadmap'

export function RoadmapSection() {
  return (
    <Section id="roadmap" headingId="roadmap-title" surface="lilac">
      <SectionHeading id="roadmap-title" eyebrow="Roadmap" title={roadmapHeading} />
      <div className="mt-10">
        <MilestoneRoadmap />
      </div>
    </Section>
  )
}
