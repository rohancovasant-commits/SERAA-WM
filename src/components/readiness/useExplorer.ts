import { useCallback, useMemo, useState } from 'react'
import { requirements, type DimensionId, type Requirement } from '../../data/readiness/requirements'

export type RatingFilter = 'all' | 1 | 'unverified'

export interface ExplorerState {
  dimension: DimensionId | 'all'
  query: string
  rating: RatingFilter
  selectedId: string
}

/** The default view: Relevant offerings, O1 (RM market-intelligence product). */
const initial: ExplorerState = { dimension: 'offerings', query: '', rating: 'all', selectedId: 'O1' }

export function filterRequirements({ dimension, query, rating }: ExplorerState): Requirement[] {
  const needle = query.trim().toLowerCase()
  return requirements.filter((r) => {
    if (dimension !== 'all' && r.dimension !== dimension) return false
    if (rating !== 'all' && r.rating !== rating) return false
    if (!needle) return true
    return [r.id, r.title, r.scope, r.currentEvidence, r.proposedOwnerRole].some((text) => text.toLowerCase().includes(needle))
  })
}

/** Explorer state shared by the overview tiles and the explorer, so a tile can drive it. */
export function useExplorer() {
  const [state, setState] = useState<ExplorerState>(initial)

  const selectDimension = useCallback((dimension: DimensionId | 'all') => {
    setState((s) => {
      const first = dimension === 'all' ? requirements.find((r) => r.id === s.selectedId) : requirements.find((r) => r.dimension === dimension)
      return { dimension, query: '', rating: 'all', selectedId: first?.id ?? s.selectedId }
    })
  }, [])
  const setQuery = useCallback((query: string) => setState((s) => ({ ...s, query })), [])
  const setRating = useCallback((rating: RatingFilter) => setState((s) => ({ ...s, rating })), [])
  const clearFilters = useCallback(() => setState((s) => ({ ...s, query: '', rating: 'all' })), [])
  const select = useCallback((selectedId: string) => setState((s) => ({ ...s, selectedId })), [])

  const visible = useMemo(() => filterRequirements(state), [state])
  /** The selected requirement if it is still listed, otherwise the first listed one. */
  const selected = visible.find((r) => r.id === state.selectedId) ?? visible[0] ?? null

  return { state, visible, selected, selectDimension, setQuery, setRating, clearFilters, select }
}

export type Explorer = ReturnType<typeof useExplorer>
