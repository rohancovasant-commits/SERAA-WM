import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../../layouts/Container'
import { actionClass } from './actionClass'

interface PageClosingProps {
  id: string
  eyebrow: string
  statement: string
  primary: { label: string; path: string }
  secondary: { label: string; path: string }
}

/** Closing strip on navy: one statement, then the way on. Shared by the strategy pages. */
export function PageClosing({ id, eyebrow, statement, primary, secondary }: PageClosingProps) {
  return (
    <section aria-labelledby={id} className="scroll-mt-[var(--anchor-offset)] bg-navy text-white">
      <Container className="py-16 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-bright">{eyebrow}</p>
        <h2 id={id} className="mt-3 max-w-4xl text-[2rem] font-bold leading-[1.12] tracking-tight sm:text-5xl">
          {statement}
        </h2>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link to={primary.path} className={actionClass('onDarkPrimary')}>
            {primary.label}
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link to={secondary.path} className={actionClass('onDarkSecondary')}>
            {secondary.label}
          </Link>
        </div>
      </Container>
    </section>
  )
}
