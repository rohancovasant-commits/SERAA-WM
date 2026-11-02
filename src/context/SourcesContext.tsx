import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react'
import type { SourceId } from '../data/types'
import { useDrawer } from '../hooks/useDrawer'
import { SourcesDrawer } from '../components/ui/SourcesDrawer'

export type SourcesView = { kind: 'single'; id: SourceId } | { kind: 'all' }

interface SourcesContextValue {
  openSource: (id: SourceId, opener?: HTMLElement | null) => void
  openAll: (opener?: HTMLElement | null) => void
}

const SourcesContext = createContext<SourcesContextValue | null>(null)

/** Owns the one global source drawer so any reference can open it. */
export function SourcesProvider({ children }: { children: ReactNode }) {
  const drawer = useDrawer<SourcesView>()
  const { open: openDrawer } = drawer

  const openSource = useCallback((id: SourceId, opener?: HTMLElement | null) => openDrawer({ kind: 'single', id }, opener), [openDrawer])
  const openAll = useCallback((opener?: HTMLElement | null) => openDrawer({ kind: 'all' }, opener), [openDrawer])
  const value = useMemo(() => ({ openSource, openAll }), [openSource, openAll])

  return (
    <SourcesContext.Provider value={value}>
      {children}
      <SourcesDrawer
        view={drawer.value}
        onClose={drawer.close}
        onShowAll={() => drawer.open({ kind: 'all' }, drawer.trigger.current)}
        returnFocusRef={drawer.trigger}
      />
    </SourcesContext.Provider>
  )
}

export function useSources() {
  const ctx = useContext(SourcesContext)
  if (!ctx) throw new Error('useSources must be used inside SourcesProvider')
  return ctx
}
