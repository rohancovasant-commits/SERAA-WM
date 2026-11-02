import type { ReactNode } from 'react'
import { exec } from './styles'

interface ExecHeaderProps {
  id: string
  eyebrow: string
  /** The conclusion. One line where possible. */
  title: string
  /** One supporting sentence. */
  lede?: string
  /** h1 on an overview, h2 on a chapter. */
  as?: 'h1' | 'h2'
  /** A text link kept at the top right on wide screens, such as "Research & sources". */
  action?: ReactNode
  /** Let a longer conclusion run wider than the default measure. */
  wide?: boolean
}

/** Eyebrow, conclusion and one sentence. The same header opens every executive overview. */
export function ExecHeader({ id, eyebrow, title, lede, as: Tag = 'h1', action, wide = false }: ExecHeaderProps) {
  return (
    <div className="relative">
      <header className={wide ? 'max-w-4xl' : 'max-w-3xl'}>
        <p aria-hidden className={exec.eyebrow}>
          {eyebrow}
        </p>
        <Tag id={id} className={`mt-2 ${exec.title}`}>
          {title}
        </Tag>
        {lede && <p className={`mt-2 ${exec.lede}`}>{lede}</p>}
      </header>
      {action && <div className="mt-3 lg:absolute lg:right-0 lg:top-1 lg:mt-0">{action}</div>}
    </div>
  )
}
