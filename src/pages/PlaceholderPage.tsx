import { useEffect } from 'react'
import { Hourglass } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { Container } from '../layouts/Container'
import type { NavItem } from '../data/types'

/** Shared stand-in for pages that are still to be written. Deliberately carries no substantive content. */
export function PlaceholderPage({ item }: { item: NavItem }) {
  useEffect(() => {
    document.title = `${item.label} · SERAA Wealth Management Strategy`
  }, [item.label])

  return (
    <Container className="py-14 sm:py-20">
      <PageHeader eyebrow={`${item.number} / ${item.label.toUpperCase()}`} title={item.label} />
      <div className="mt-8 flex max-w-xl items-start gap-3 rounded-card border border-dashed border-line-strong bg-surface px-5 py-4">
        <Hourglass aria-hidden className="mt-1 size-5 shrink-0 text-slate" />
        <p className="text-lg">Content for this section will be developed next.</p>
      </div>
    </Container>
  )
}
