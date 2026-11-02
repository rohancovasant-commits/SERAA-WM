import { useId, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface DisclosureProps {
  label: string
  children: ReactNode
  /** Panel surface. Defaults to white with a strong border, as on the Readiness page. */
  className?: string
  defaultOpen?: boolean
}

/** Expandable panel: a text button that toggles a bordered panel. State is announced with aria-expanded. */
export function Disclosure({ label, children, className = '', defaultOpen = false }: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()
  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-md text-left text-base font-semibold text-accent underline-offset-4 hover:underline"
      >
        {label}
        <ChevronDown aria-hidden className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div id={panelId} className="swap-in mt-3 rounded-panel border border-line-strong bg-white px-5 py-5 sm:px-6">
          {children}
        </div>
      )}
    </div>
  )
}

export function BulletList({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 leading-snug">
          <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  )
}
