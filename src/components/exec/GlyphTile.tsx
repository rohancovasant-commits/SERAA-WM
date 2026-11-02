import type { LucideIcon } from 'lucide-react'
import type { Tone } from '../../data/opportunity/opening'
import { toneStyles } from '../../styles/tones'

interface GlyphTileProps {
  icon: LucideIcon
  tone?: Tone | 'navy'
  /** Height utility; the tile fills its container's width. */
  className?: string
}

/**
 * A calm tinted tile with one outline icon. It stands in for decorative art where a section needs a visual anchor but no
 * picture would add information. Decorative: the heading beside it carries the meaning.
 */
export function GlyphTile({ icon: Icon, tone = 'teal', className = 'h-36' }: GlyphTileProps) {
  const t = toneStyles[tone]
  return (
    <div aria-hidden className={`flex w-full items-center justify-center rounded-xl border border-hairline-soft ${t.soft} ${className}`}>
      <Icon strokeWidth={1.4} className={`size-14 ${t.text}`} />
    </div>
  )
}
