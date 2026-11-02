import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Section } from '../../components/ui/Section'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { exec } from '../../components/exec/styles'
import { families } from '../../data/offerings/families'
import { portfolioHeading, segmentNote } from '../../data/offerings/page'
import { toneStyles } from '../../styles/tones'

/** How each kind of starting asset is drawn: filled for built work (an existing POC, or AI agents developed), dashed outline for discovery only. */
const assetStyle = {
  poc: 'border-ev-poc-fg bg-ev-poc-fg text-white',
  built: 'border-navy-3 bg-navy-3 text-white',
  internal: 'border-navy-3/50 bg-white text-heading',
} as const

/**
 * Portfolio chapter. One message: what actually stands behind each family. Each family is a column with its starting
 * asset drawn by the kind of evidence it is: filled for built work (an existing POC for Intelligence, AI agents
 * developed for Operations) and a outline for Centrum, where discovery is done and options are sent. The kind is stated in
 * text on every asset, and none of it is a score. The functions each family serves, and the functions-versus-segments note, are behind a click; the candidate
 * solutions are in each family chapter.
 */
export function PortfolioSection() {
  const [open, setOpen] = useState(false)
  const noteId = useId()
  return (
    <Section id="portfolio" headingId="portfolio-title">
      <SectionHeading id="portfolio-title" eyebrow="Portfolio" title={portfolioHeading} />

      <p className={`mt-10 ${exec.label}`}>Starting asset behind each family</p>
      <ul className="mt-3 grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
        {families.map((family) => {
          const tone = toneStyles[family.tone]
          const asset = family.startingAssets[0]
          const built = asset.evidence === 'poc' || /built|developed/i.test(asset.status)
          const style = asset.evidence === 'poc' ? assetStyle.poc : built ? assetStyle.built : assetStyle.internal
          const discoveryOnly = !built && !/options sent/i.test(asset.status)
          return (
            <li key={family.id}>
              <span aria-hidden className={`mb-3 block h-1.5 w-full rounded-full ${tone.solid}`} />
              <h3 className="text-2xl font-bold leading-tight text-heading">{family.shortTitle}</h3>
              <div className={`mt-4 rounded-xl border-2 px-5 py-5 ${style} ${discoveryOnly ? 'border-dashed' : ''}`}>
                <p className="text-2xl font-bold leading-tight">{asset.name}</p>
                <p className={`mt-1 text-lg font-medium ${built ? 'text-white/90' : 'text-slate'}`}>{asset.status}</p>
              </div>
            </li>
          )
        })}
      </ul>

      <p className={`mt-6 ${exec.meta}`}>Built work, discovery and proposals, as described by the team. Scope, production status and acceptance are not yet verified, and no SOW has been sent.</p>

      <div className="mt-5">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={noteId}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-md text-base font-semibold text-accent underline-offset-4 hover:underline"
        >
          {segmentNote.label}
          <ChevronDown aria-hidden className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div id={noteId} className="swap-in mt-3 max-w-3xl space-y-4 rounded-card bg-wash px-5 py-4 leading-snug">
            <ul aria-label="Business functions served" className="space-y-1">
              {families.map((f) => (
                <li key={f.id}>
                  <span className="font-semibold text-heading">{f.shortTitle}: </span>
                  {f.businessFunctions.join(' · ')}
                </li>
              ))}
            </ul>
            <p className={exec.meta}>{segmentNote.text}</p>
          </div>
        )}
      </div>
    </Section>
  )
}
