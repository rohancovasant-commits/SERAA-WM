import { useEffect, useRef, type RefObject } from 'react'
import { sourceList } from '../../data/sources'
import { SNAPSHOT_DATE } from '../../data/evidence'
import type { SourcesView } from '../../context/SourcesContext'
import { DetailDrawer } from './DetailDrawer'
import { SourceEntry } from './SourceEntry'

interface SourcesDrawerProps {
  view: SourcesView | null
  onClose: () => void
  onShowAll: () => void
  returnFocusRef: RefObject<HTMLElement | null>
}

export function SourcesDrawer({ view, onClose, onShowAll, returnFocusRef }: SourcesDrawerProps) {
  const single = view?.kind === 'single' ? view.id : null
  const previousKind = useRef<string | null>(null)

  // When the content swaps while open ("View all sources"), the focused button disappears.
  // Keep focus inside the dialog by moving it to the scrollable body.
  useEffect(() => {
    const kind = view?.kind ?? null
    if (previousKind.current && kind && kind !== previousKind.current) {
      document.querySelector<HTMLElement>('dialog [data-drawer-body]')?.focus()
    }
    previousKind.current = kind
  }, [view])
  const external = sourceList

  return (
    <DetailDrawer
      open={view !== null}
      onClose={onClose}
      title={single ? 'Source' : 'Sources'}
      eyebrow={`Research snapshot · ${SNAPSHOT_DATE}`}
      returnFocusRef={returnFocusRef}
    >
      {single ? (
        <div className="space-y-5">
          <SourceEntry id={single} />
          <button
            type="button"
            onClick={onShowAll}
            className="text-[0.9375rem] font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
          >
            View all sources
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <p className="text-[0.9375rem] text-slate">
            A static snapshot dated {SNAPSHOT_DATE}, not live market data. Links open the original source in a new tab.
          </p>
          <section aria-labelledby="src-research">
            <h3 id="src-research" className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-slate">
              Research and published sources
            </h3>
            <div className="space-y-3">
              {external.map((s) => (
                <SourceEntry key={s.id} id={s.id} />
              ))}
            </div>
          </section>
        </div>
      )}
    </DetailDrawer>
  )
}
