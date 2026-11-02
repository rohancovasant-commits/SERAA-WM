import { DecisionGroups, RoadmapTrack } from '../../components/overview/DecisionGroups'
import { ChapterButton, NextAction, PanelButton } from '../../components/overview/parts'
import { DecisionStatusBadge } from '../../components/decisions/StatusBadges'
import { ExecHeader } from '../../components/exec/ExecHeader'
import { exec } from '../../components/exec/styles'
import { decisionsOverview as content } from '../../data/overviews'

/**
 * Decisions overview. Three decision groups, each with a concrete proposed direction and the decisions it covers, beside
 * the compact roadmap with one shared status. The one qualification that matters stays visible: funding needs a reviewed
 * estimate. Nothing here reads as selected, assigned or approved. The five decisions, the outputs and the assumptions
 * are in the chapter and the outputs panel.
 */
export function DecisionsOverview({
  eyebrow,
  select,
  onOpenOutputs,
}: {
  eyebrow: string
  select: (id: string) => void
  onOpenOutputs: (opener: HTMLElement) => void
}) {
  return (
    <>
      <ExecHeader id="introduction-title" eyebrow={eyebrow} title={content.headline} wide />

      <div className="mt-7 space-y-4">
        <section aria-labelledby="choices-label" className={`${exec.panel} bg-white px-5 py-5 sm:px-6`}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
            <p id="choices-label" className={exec.label}>
              {content.label}
            </p>
            <DecisionStatusBadge />
          </div>
          <DecisionGroups />
        </section>

        <section aria-labelledby="roadmap-label" className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-hairline pt-4">
          <p id="roadmap-label" className="sr-only">
            Roadmap
          </p>
          <RoadmapTrack />
          <p className="max-w-sm text-base font-bold leading-snug text-accent-strong">{content.qualification}</p>
        </section>
      </div>

      <div className="mt-6">
        <NextAction
          buttons={
            <>
              <ChapterButton onClick={() => select('decisions')}>{content.buttons[0]}</ChapterButton>
              <PanelButton onOpen={onOpenOutputs}>{content.buttons[1]}</PanelButton>
            </>
          }
        >
          {content.next}
        </NextAction>
      </div>
    </>
  )
}
