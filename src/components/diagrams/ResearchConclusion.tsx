import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../../layouts/Container'

interface ResearchConclusionProps {
  heading: string
  text: string
  actionsLabel: string
  actions: string[]
  next: { label: string; path: string }
}

/** Compact closing assessment on deep navy. */
export function ResearchConclusion({ heading, text, actionsLabel, actions, next }: ResearchConclusionProps) {
  const dots = ['#5eead4', '#7aa7f5', '#f5c15c']
  return (
    <section aria-labelledby="conclusion-title" className="scroll-mt-[var(--anchor-offset)] bg-navy text-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-7">
            <h2 id="conclusion-title" className="text-[2rem] font-semibold leading-[1.1] sm:text-[2.5rem] lg:text-5xl">
              {heading.split(". ").map((part, i, all) => (
                <span key={part} className="block">
                  {i < all.length - 1 ? part + "." : part}
                </span>
              ))}
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-snug text-white/85">{text}</p>
          </div>
          <div className="lg:col-span-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-white/75">{actionsLabel}</h3>
            <ol className="mt-3 flex flex-wrap gap-2.5">
              {actions.map((action, i) => (
                <li key={action} className="flex items-center gap-2.5 rounded-full bg-white/10 py-2 pl-2.5 pr-4 text-base font-semibold">
                  <span
                    aria-hidden
                    className="flex size-6 items-center justify-center rounded-full text-sm font-bold text-navy"
                    style={{ background: dots[i] }}
                  >
                    {i + 1}
                  </span>
                  {action}
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to={next.path}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-base font-semibold text-navy transition-colors hover:bg-teal-bright focus-visible:outline-white"
              >
                {next.label}
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
