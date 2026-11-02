import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BookOpen, Menu, X } from 'lucide-react'
import { navItems, PROJECT_NAME } from '../../data/navigation'
import { useSources } from '../../context/SourcesContext'
import { Container } from '../../layouts/Container'

export function TopNav() {
  const { openAll } = useSources()
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const menuButton = useRef<HTMLButtonElement>(null)

  // Close the compact menu after navigating.
  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-[0.9375rem] font-medium transition-colors ${
      isActive ? 'bg-accent text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy text-white">
      <Container className="flex h-[var(--header-h)] items-center gap-4">
        <Link
          to="/intro"
          className="flex shrink-0 items-center gap-3 rounded-md focus-visible:outline-white"
          aria-label="SERAA Wealth Management Strategy, home"
        >
          <span className="text-lg font-bold tracking-[0.2em]">SERAA</span>
          <span aria-hidden className="hidden h-5 w-px bg-white/25 sm:block lg:hidden xl:block" />
          <span className="hidden text-[0.9375rem] font-medium text-white/70 sm:block lg:hidden xl:block">{PROJECT_NAME}</span>
        </Link>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <button
            type="button"
            onClick={(event) => openAll(event.currentTarget)}
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-3 py-2 text-[0.9375rem] font-medium text-white transition-colors hover:border-teal-bright hover:text-teal-bright"
          >
            <BookOpen aria-hidden className="size-4" />
            Sources
          </button>
          <button
            ref={menuButton}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-3 py-2 text-[0.9375rem] font-medium lg:hidden"
          >
            {menuOpen ? <X aria-hidden className="size-4" /> : <Menu aria-hidden className="size-4" />}
            Menu
          </button>
        </div>
      </Container>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-white/10 bg-navy-2 shadow-lift lg:hidden">
          <Container className="py-3">
            <ul className="grid gap-1 sm:grid-cols-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium ${
                        isActive ? 'bg-white/12 text-white' : 'text-white/80 hover:bg-white/8'
                      }`
                    }
                  >
                    <span>{item.label}</span>
                    <span className="text-sm font-normal text-white/50">{item.number}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  )
}
