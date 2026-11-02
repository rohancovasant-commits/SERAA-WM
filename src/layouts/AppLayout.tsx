import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { TopNav } from '../components/navigation/TopNav'
import { SourcesProvider, useSources } from '../context/SourcesContext'
import { SNAPSHOT_DATE } from '../data/evidence'
import { scrollToId } from '../utils/scroll'
import { Container } from './Container'

function Footer() {
  const { openAll } = useSources()
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="flex flex-col gap-3 py-8 text-[0.9375rem] text-slate sm:flex-row sm:items-center sm:justify-between">
        <p>
          Internal strategy site for Covasant leadership. Research snapshot dated {SNAPSHOT_DATE}; static evidence, not
          live market data.
        </p>
        <button
          type="button"
          onClick={(event) => openAll(event.currentTarget)}
          className="self-start rounded-md font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
        >
          View all sources
        </button>
      </Container>
    </footer>
  )
}

function Shell() {
  const { pathname, hash } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const first = useRef(true)

  // New page: go to the top (or to its anchor) and move focus to the content for keyboard and screen-reader users.
  useEffect(() => {
    const id = hash.slice(1)
    if (id) {
      // Wait a frame so the target page has rendered.
      const frame = requestAnimationFrame(() => scrollToId(id))
      return () => cancelAnimationFrame(frame)
    }
    window.scrollTo(0, 0)
    if (first.current) first.current = false
    else mainRef.current?.focus({ preventScroll: true })
    // Only a change of page should reset scroll, not a change of hash within the page.
  }, [pathname])

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <TopNav />
      <main id="main" ref={mainRef} tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export function AppLayout() {
  return (
    <SourcesProvider>
      <Shell />
    </SourcesProvider>
  )
}
