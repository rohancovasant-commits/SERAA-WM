import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { exec } from './styles'

/** Text link that opens a drawer. The opener is passed back so focus returns to it on close. */
export function DrawerLink({ children, onOpen, className = '' }: { children: ReactNode; onOpen: (opener: HTMLElement) => void; className?: string }) {
  return (
    <button type="button" onClick={(event) => onOpen(event.currentTarget)} aria-haspopup="dialog" className={`${exec.link} ${className}`}>
      {children}
      <ArrowUpRight aria-hidden className="size-4" />
    </button>
  )
}

/** Text link that moves to another chapter of the page. */
export function ChapterLink({ children, onClick, className = '' }: { children: ReactNode; onClick: () => void; className?: string }) {
  return (
    <button type="button" onClick={onClick} className={`${exec.link} ${className}`}>
      {children}
      <ArrowRight aria-hidden className="size-4" />
    </button>
  )
}
