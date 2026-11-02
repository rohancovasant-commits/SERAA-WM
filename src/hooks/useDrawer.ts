import { useCallback, useRef, useState } from 'react'

/**
 * State for a single-instance drawer. Remembers the element that opened it so focus
 * can return there even in browsers that do not focus a button on click.
 */
export function useDrawer<T>() {
  const [value, setValue] = useState<T | null>(null)
  const trigger = useRef<HTMLElement | null>(null)

  const open = useCallback((next: T, opener?: HTMLElement | null) => {
    trigger.current = opener ?? (document.activeElement as HTMLElement | null)
    setValue(next)
  }, [])
  const close = useCallback(() => setValue(null), [])

  return { value, open, close, trigger }
}
