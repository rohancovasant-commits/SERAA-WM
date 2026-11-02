import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import type { PageIntro, SectionLink } from '../../data/types'
import { Container } from '../../layouts/Container'

interface SectionDropdownProps {
  title: string
  action?: PageIntro['action']
  sections: SectionLink[]
  activeId: string | null
  label: string
  onSelect: (id: string) => void
}

/** "On this page" dropdown for screens narrower than the left rail. Sticky under the header. */
export function SectionDropdown({ title, sections, activeId, label, action, onSelect }: SectionDropdownProps) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const active = sections.find((s) => s.id === activeId)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        button.current?.focus()
      }
    }
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <div ref={root} className="sticky top-[var(--header-h)] z-30 border-b border-white/10 bg-navy-2 text-white xl:hidden">
      <Container>
        <nav aria-label={label} className="relative">
          <button
            ref={button}
            type="button"
            aria-expanded={open}
            aria-controls="section-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-[var(--subnav-h)] w-full items-center gap-3 text-left text-[0.9375rem] focus-visible:outline-white"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">{title}</span>
            <span className="flex-1 truncate font-semibold">{active?.label ?? sections[0]?.label}</span>
            <ChevronDown aria-hidden className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          {open && (
            <ul
              id="section-menu"
              className="absolute inset-x-0 top-full z-40 mt-px overflow-hidden rounded-b-xl border border-line bg-white py-1.5 text-ink shadow-lift"
            >
              {sections.map((section, i) => {
                const current = section.id === activeId
                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      aria-current={current ? 'location' : undefined}
                      onClick={(event) => {
                        event.preventDefault()
                        setOpen(false)
                        onSelect(section.id)
                      }}
                      className={`flex items-center gap-3 px-4 py-3 text-base ${
                        current ? 'bg-accent-soft font-semibold text-navy' : 'font-medium text-slate hover:bg-wash'
                      }`}
                    >
                      <span aria-hidden className="w-6 text-xs font-semibold text-slate/80">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1">{section.label}</span>
                      {current && <Check aria-hidden className="size-4 text-accent" />}
                    </a>
                  </li>
                )
              })}
              {action && (
                <li className="mt-1 border-t border-line px-4 pb-2 pt-3">
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={(event) => {
                      setOpen(false)
                      action.onOpen(button.current ?? event.currentTarget)
                    }}
                    className="w-full rounded-lg border border-navy/25 px-4 py-2.5 text-base font-semibold text-navy hover:border-accent hover:text-accent"
                  >
                    {action.label}
                  </button>
                </li>
              )}
            </ul>
          )}
        </nav>
      </Container>
    </div>
  )
}
