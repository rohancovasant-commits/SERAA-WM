import { Section } from '../../components/ui/Section'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { NextReviewPack } from '../../components/decisions/NextReviewPack'
import { ReviewOutcomes } from '../../components/decisions/ReviewOutcomes'
import { reviewHeading } from '../../data/decisions/review'

export function NextReviewSection() {
  return (
    <Section id="next-review" headingId="next-review-title">
      <SectionHeading id="next-review-title" eyebrow="Next review" title={reviewHeading} />
      <div className="mt-10">
        <NextReviewPack />
      </div>
      <div className="mt-16">
        <ReviewOutcomes />
      </div>
    </Section>
  )
}
