import { useRef, useState, type KeyboardEvent } from 'react'

/** Selection state and roving-tabindex keyboard handling for a set of tabs or a single-select button group. */
export function useTabs<T extends string>(ids: readonly T[], initial: T) {
  const [selected, setSelected] = useState<T>(initial)
  const refs = useRef<(HTMLElement | null)[]>([])

  const onKeyDown = (event: KeyboardEvent<HTMLElement>, index: number) => {
    const last = ids.length - 1
    let next = index
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = index === last ? 0 : index + 1
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = index === 0 ? last : index - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last
    else return
    event.preventDefault()
    setSelected(ids[next])
    refs.current[next]?.focus()
  }

  const setRef = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el
  }

  return { selected, setSelected, onKeyDown, setRef }
}
