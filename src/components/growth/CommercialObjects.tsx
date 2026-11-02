import { commercialComponents, type CommercialComponent } from '../../data/growth/commercial'
import type { Tone } from '../../data/opportunity/opening'
import { FlowNode, FlowRow } from '../exec/diagram'

const tones: Record<CommercialComponent['id'], Tone> = {
  implementation: 'blue',
  recurring: 'violet',
  operation: 'teal',
}

/** Three separately scoped components, combined to fit the customer. Editable boxes; no amounts appear on any of them. */
export function CommercialObjects() {
  return (
    <div className="rounded-panel border border-hairline bg-white px-5 py-7 sm:px-8">
      <FlowRow label="Components of the proposed commercial offer">
        {commercialComponents.map((component, i) => (
          <FlowNode
            key={component.id}
            mark={String(i + 1)}
            title={component.label}
            caption={component.text}
            tone={tones[component.id]}
            arrow={i < commercialComponents.length - 1}
            plus
          />
        ))}
      </FlowRow>
    </div>
  )
}
