import type { ReactNode } from 'react'

interface PageHeaderProps {
  eyebrow: string
  title: string
  /** Supporting text under the title. */
  children?: ReactNode
  /** Optional prominent block beside the title on wide screens. */
  aside?: ReactNode
}

export function PageHeader({ eyebrow, title, children, aside }: PageHeaderProps) {
  return (
    <div className={aside ? 'grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12' : ''}>
      <div className={aside ? 'lg:col-span-7' : 'max-w-3xl'}>
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">{eyebrow}</p>
        <h1 className="mt-3 text-[2rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.5rem] lg:text-[2.875rem] xl:text-[3.125rem]">
          {title}
        </h1>
        {children && <div className="mt-4 max-w-2xl text-lg leading-relaxed text-slate">{children}</div>}
      </div>
      {aside && <div className="lg:col-span-5">{aside}</div>}
    </div>
  )
}
