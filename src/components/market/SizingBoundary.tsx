import { ArrowRight, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { sizingLink, sizingNote, sizingStageNote, sizingStages } from '../../data/opportunity/market'

/**
 * Four equal stages, deliberately not a proportional funnel: no conversion rate has been measured, so the shapes
 * must not imply one. Only the first stage has a number, and it is a count of named organisations.
 */
export function SizingBoundary({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div>
      <ol className="grid gap-7 sm:grid-cols-2">
        {sizingStages.map((stage, index) => (
          <li key={stage.title} className="relative flex">
            <div
              className={`flex w-full flex-col rounded-panel border p-4 ${
                index === 0 ? 'border-accent bg-accent-soft' : 'border-dashed border-amber/60 bg-white'
              }`}
            >
              <p className={`text-sm font-bold uppercase tracking-[0.1em] ${index === 0 ? 'text-accent-strong' : 'text-amber'}`}>
                Stage {index + 1}
              </p>
              <h4 className="mt-1 text-lg font-bold leading-snug text-navy">{stage.title}</h4>
              <p className="mt-1 leading-snug">{stage.text}</p>
            </div>
            {index < sizingStages.length - 1 && (
              <ChevronDown aria-hidden className="absolute -bottom-[1.375rem] left-1/2 size-5 -translate-x-1/2 text-accent sm:hidden" />
            )}
          </li>
        ))}
      </ol>
      <p className="mt-3 text-[0.9375rem] text-slate">{sizingStageNote}</p>

      <p className="mt-4 text-lg font-medium leading-snug text-navy">{sizingNote}</p>
      <Link
        to={{ hash: sizingLink.hash }}
        onClick={onNavigate}
        className="group mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-accent bg-white px-4 py-2.5 text-[0.9375rem] font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
      >
        {sizingLink.label}
        <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  )
}
