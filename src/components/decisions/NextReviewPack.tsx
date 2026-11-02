import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { reviewDocuments, reviewLabel, reviewListLabel } from '../../data/decisions/review'
import { ProposedOutputPreview } from './ProposedOutputPreview'

/**
 * Six proposed documents, one opened at a time. They are
 * descriptions of proposed outputs: nothing here is a file, a download or a completed document.
 */
export function NextReviewPack() {
  const [selected, setSelected] = useState(0)
  const base = useId()

  return (
    <div className="max-w-4xl">
      <p className="text-sm font-bold uppercase tracking-[0.1em] text-accent-strong">{reviewLabel}</p>
      <div>
        <h3 className="mt-1 text-sm font-bold uppercase tracking-[0.1em] text-slate">{reviewListLabel}</h3>
        <ol className="mt-3 space-y-2.5">
          {reviewDocuments.map((doc, i) => {
            const open = i === selected
            return (
              <li key={doc.id} className={`overflow-hidden rounded-card border-2 bg-white transition-colors ${open ? 'border-accent' : 'border-line hover:border-accent/60'}`}>
                <h4>
                  <button
                    type="button"
                    id={`${base}-btn-${doc.id}`}
                    aria-expanded={open}
                    aria-controls={`${base}-panel-${doc.id}`}
                    onClick={() => setSelected(i)}
                    className="flex w-full items-center gap-3.5 px-4 py-3.5 text-left sm:px-5"
                  >
                    <span
                      aria-hidden
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[0.9375rem] font-bold ${open ? 'bg-accent text-white' : 'bg-wash text-navy'}`}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1 text-[1.0625rem] font-bold uppercase leading-tight tracking-[0.04em] text-navy">{doc.title}</span>
                    <ChevronDown aria-hidden className={`size-5 shrink-0 text-slate transition-transform ${open ? 'rotate-180' : ''}`} />
                  </button>
                </h4>
                {open && <ProposedOutputPreview document={doc} id={`${base}-panel-${doc.id}`} labelledBy={`${base}-btn-${doc.id}`} />}
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
