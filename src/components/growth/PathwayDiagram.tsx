import { RotateCcw } from 'lucide-react'
import { feedbackLabel, pathNote, pathStages } from '../../data/growth/approach'
import { FlowNode, FlowRow } from '../exec/diagram'
import { exec } from '../exec/styles'

const stageTones = ['blue', 'teal', 'violet', 'navy'] as const

/**
 * The growth path: four stages left to right, with the feedback from delivery learning back to the package. Editable
 * boxes and text, shared by the Growth overview and the Approach chapter. A proposed mechanism, not compounding growth.
 */
export function PathwayDiagram() {
  return (
    <div>
      <FlowRow label="Growth pathway">
        {pathStages.map((stage, i) => (
          <FlowNode
            key={stage.id}
            mark={String(i + 1)}
            title={stage.label}
            caption={stage.caption}
            tone={stageTones[i]}
            arrow={i < pathStages.length - 1}
          />
        ))}
      </FlowRow>
      <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="inline-flex items-center gap-2 rounded-full bg-quiet px-3.5 py-1 text-[0.9375rem] font-semibold text-heading ring-1 ring-hairline">
          <RotateCcw aria-hidden className="size-4 text-accent" />
          {feedbackLabel}
        </span>
        <span className={exec.meta}>{pathNote}</span>
      </p>
    </div>
  )
}
