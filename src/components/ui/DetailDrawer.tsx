import { useEffect, useId, useRef, type ReactNode, type RefObject } from 'react'
import { X } from 'lucide-react'

interface DetailDrawerProps {
  open: boolean
  onClose: () => void
  title: string
  eyebrow?: string
  /** Element that opened the drawer; focus returns here on close. */
  returnFocusRef?: RefObject<HTMLElement | null>
  /** A wider panel for drawers that hold a list or table, such as the company explorer. */
  wide?: boolean
  children: ReactNode
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Right-hand drawer built on a native modal <dialog>: the browser makes the rest of
 * the page inert, supplies the backdrop and handles Escape. We add a focus cycle,
 * scroll lock and explicit focus return.
 */
export function DetailDrawer({ open, onClose, title, eyebrow, returnFocusRef, wide = false, children }: DetailDrawerProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const fallbackReturn = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!open || !dialog) return

    fallbackReturn.current = document.activeElement as HTMLElement | null
    const returnTo = returnFocusRef?.current ?? fallbackReturn.current
    if (!dialog.open) dialog.showModal()

    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'

    return () => {
      root.style.overflow = previousOverflow
      if (dialog.open) dialog.close()
      returnTo?.focus({ preventScroll: true })
    }
  }, [open, returnFocusRef])

  if (!open) return null

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== 'Tab') return
    const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE))
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className={`drawer-panel fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none max-w-none border-l border-line bg-surface p-0 text-ink shadow-lift ${wide ? 'w-[min(56rem,100vw)]' : 'w-[min(32rem,100vw)]'}`}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      onKeyDown={handleKeyDown}
    >
      <div className="flex h-full flex-col">
        <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-5 sm:px-7">
          <div className="min-w-0">
            {eyebrow && (
              <p className="mb-1 text-sm font-medium uppercase tracking-[0.08em] text-slate">{eyebrow}</p>
            )}
            <h2 id={titleId} className="text-2xl font-semibold leading-snug">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-slate transition-colors hover:bg-wash hover:text-ink"
          >
            <X aria-hidden className="size-4" />
            Close
          </button>
        </header>
        <div
          data-drawer-body
          tabIndex={-1}
          className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 outline-none sm:px-7"
        >
          {children}
        </div>
      </div>
    </dialog>
  )
}
