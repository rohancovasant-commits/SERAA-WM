import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { capabilityClasses, capabilityMap, wealthCapabilities, type CapabilityClass, type WealthCapability } from '../../data/shared/capabilityMap'
import { exec } from '../exec/styles'

/**
 * Classification chip. Text is the signal. The styles are deliberately neutral and unlike the readiness rating colours,
 * so a class is never read as a score; "Not yet classified" is dashed because it is not a verdict.
 */
const classStyle: Record<CapabilityClass, string> = {
  Available: 'border-accent bg-accent-soft text-accent-strong',
  'Needs verification': 'border-line-strong bg-white text-heading',
  'Needs adaptation': 'border-line-strong bg-white text-heading',
  'Needs development': 'border-line-strong bg-white text-heading',
  'Not yet classified': 'border-dashed border-slate bg-white text-slate',
}

function ClassChip({ value }: { value: CapabilityClass }) {
  return (
    <span className={`inline-block whitespace-nowrap rounded-md border px-2.5 py-0.5 text-[0.8125rem] font-semibold leading-5 ${classStyle[value]}`}>
      {value}
    </span>
  )
}

function Detail({ capability }: { capability: WealthCapability }) {
  const meaning = capabilityClasses.find((c) => c.label === capability.classification)?.meaning
  const { splitLabels } = capabilityMap
  return (
    <div className="space-y-4 border-t border-hairline-soft bg-quiet px-4 py-4 sm:px-5">
      <p className="leading-snug text-heading">
        <span className="font-semibold">Next action: </span>
        {capability.nextAction}
      </p>
      <p className="leading-snug text-slate">{capability.businessPurpose}</p>
      <dl className="grid gap-3 md:grid-cols-3">
        {(['platform', 'adaptation', 'acceptance'] as const).map((key) => (
          <div key={key} className="rounded-lg border border-hairline-soft bg-white px-3 py-2.5">
            <dt className={exec.label}>{splitLabels[key]}</dt>
            <dd className={`mt-1 ${exec.meta} !text-heading`}>{capability.evidenceSplit[key]}</dd>
          </div>
        ))}
      </dl>
      <div>
        <p className={exec.label}>Required work</p>
        <ul className="mt-1.5 space-y-1">
          {capability.requiredWork.map((item) => (
            <li key={item} className="flex gap-2.5 text-[0.9375rem] leading-snug text-heading">
              <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <p className={exec.meta}>
        <span className="font-semibold text-heading">Why {capability.classification}:</span> {capability.classificationBasis}
        {meaning && <span className="block pt-1">{capability.classification} means: {meaning}</span>}
      </p>
      <p className={exec.meta}>
        <span className="font-semibold text-heading">Proposed owner role:</span> {capability.proposedOwnerRole}. Named owner TBC.
        <span className="font-semibold text-heading"> Related requirements:</span> {capability.readinessRefs.join(', ')}.
      </p>
    </div>
  )
}

/**
 * The six-capability map: capability, current classification, short next action. A row opens in place to show the
 * platform / wealth-specific / acceptance split and the required work. No count, average or score is shown.
 */
export function CapabilityRows() {
  const [openId, setOpenId] = useState<WealthCapability['id'] | null>(null)
  const baseId = useId()
  // Group by classification, in the order of the class list. A class with no capability is still shown, because an empty
  // "Available" group is itself the finding: nothing reviewed shows an accepted, supported capability.
  const groups = capabilityClasses
    .map((c) => ({ ...c, items: wealthCapabilities.filter((w) => w.classification === c.label) }))
    .filter((g) => g.items.length > 0 || g.label === 'Available')
    // The empty Available group goes last: it is a statement about the others, not a place to start.
    .sort((a, b) => Number(a.label === 'Available') - Number(b.label === 'Available'))
  return (
    <div role="group" aria-label={capabilityMap.title} className="space-y-3">
      {groups.map((group) => (
        <section key={group.label} aria-label={group.label}>
          <p className="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5">
            <ClassChip value={group.label} />
            <span className={exec.meta}>{group.meaning}</span>
          </p>
          {group.items.length === 0 ? (
            <p className="rounded-lg border border-dashed border-line-strong bg-white px-4 py-3 text-base font-medium text-slate">None on the evidence reviewed.</p>
          ) : (
            <ul className="divide-y divide-hairline-soft overflow-hidden rounded-lg border border-hairline-soft">
              {group.items.map((capability) => {
                const open = openId === capability.id
                const panelId = `${baseId}-${capability.id}`
                return (
                  <li key={capability.id}>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      aria-label={`${capability.name}: ${capability.classification}`}
                      onClick={() => setOpenId(open ? null : capability.id)}
                      className="flex w-full items-center gap-x-4 bg-white px-4 py-2.5 text-left transition-colors hover:bg-quiet sm:px-5"
                    >
                      <span className={`min-w-0 flex-1 ${exec.strong} text-[1.0625rem]`}>{capability.name}</span>
                      <ChevronDown aria-hidden className={`size-4 shrink-0 text-slate transition-transform ${open ? 'rotate-180' : ''}`} />
                    </button>
                    {open && (
                      <div id={panelId} role="region" aria-label={`${capability.name} detail`}>
                        <Detail capability={capability} />
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      ))}
    </div>
  )
}
