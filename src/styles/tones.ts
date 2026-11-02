import type { Tone } from '../data/opportunity/opening'

/** Static class strings per tone so Tailwind can see them. Colours group information; they carry no score. */
export const toneStyles: Record<
  Tone | 'navy',
  { soft: string; mid: string; solid: string; text: string; onSolid: string; ring: string; dot: string }
> = {
  teal: {
    soft: 'bg-accent-soft',
    mid: 'bg-[#bfe5df]',
    solid: 'bg-accent',
    text: 'text-accent-strong',
    onSolid: 'text-white',
    ring: 'border-accent',
    dot: 'bg-accent',
  },
  blue: {
    soft: 'bg-blue-soft',
    mid: 'bg-blue-mid',
    solid: 'bg-blue',
    text: 'text-blue',
    onSolid: 'text-white',
    ring: 'border-blue',
    dot: 'bg-blue',
  },
  violet: {
    soft: 'bg-violet-soft',
    mid: 'bg-violet-mid',
    solid: 'bg-violet',
    text: 'text-violet',
    onSolid: 'text-white',
    ring: 'border-violet',
    dot: 'bg-violet',
  },
  amber: {
    soft: 'bg-amber-soft',
    mid: 'bg-amber-mid',
    solid: 'bg-amber',
    text: 'text-amber',
    onSolid: 'text-white',
    ring: 'border-amber',
    dot: 'bg-amber',
  },
  navy: {
    soft: 'bg-wash',
    mid: 'bg-line',
    solid: 'bg-navy-3',
    text: 'text-ink',
    onSolid: 'text-white',
    ring: 'border-navy-3',
    dot: 'bg-navy-3',
  },
}
