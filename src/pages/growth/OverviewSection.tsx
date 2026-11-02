import { GrowthTracks } from '../../components/overview/GrowthTracks'
import { NextAction, PanelButton } from '../../components/overview/parts'
import { ExecHeader } from '../../components/exec/ExecHeader'
import { exec } from '../../components/exec/styles'
import { growthOverview as content } from '../../data/overviews'

/**
 * Growth overview. One visual: two aligned tracks (business and credibility) across Anchor, Prove, Package and Expand,
 * as a connected journey with short outputs. Under it, the commercial line and the partnership role, and one line that
 * keeps the unestablished items visible. The plans are in the two panels; the ten directions are in the Approach chapter.
 */
export function GrowthOverview({
  eyebrow,
  onOpenCommercial,
  onOpenCredibility,
}: {
  eyebrow: string
  onOpenCommercial: (opener: HTMLElement) => void
  onOpenCredibility: (opener: HTMLElement) => void
}) {
  return (
    <>
      <ExecHeader id="introduction-title" eyebrow={eyebrow} title={content.headline} wide />

      <section aria-labelledby="tracks-label" className={`${exec.panel} mt-7 bg-white px-5 py-5 sm:px-6`}>
        <p id="tracks-label" className={`mb-3 ${exec.label}`}>
          {content.label}
        </p>
        <GrowthTracks />
        <dl className="mt-4 grid gap-x-10 gap-y-3 border-t border-hairline-soft pt-4 md:grid-cols-2">
          {[content.commercial, content.partnership].map((item) => (
            <div key={item.label}>
              <dt className={exec.label}>{item.label}</dt>
              <dd className="mt-0.5 text-base font-semibold leading-snug text-heading">{item.text}</dd>
            </div>
          ))}
        </dl>
        <p className={`mt-3 ${exec.meta}`}>{content.qualification}</p>
      </section>

      <div className="mt-6">
        <NextAction
          buttons={
            <>
              <PanelButton onOpen={onOpenCommercial}>{content.buttons[0]}</PanelButton>
              <PanelButton onOpen={onOpenCredibility}>{content.buttons[1]}</PanelButton>
            </>
          }
        >
          {content.next}
        </NextAction>
      </div>
    </>
  )
}
