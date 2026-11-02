/**
 * The executive type scale and surfaces, taken from the Market chapter. Every overview builds from these strings,
 * so a change here changes all six pages. Class strings are complete so Tailwind can see them.
 */
export const exec = {
  /** Small uppercase label above a title. */
  eyebrow: 'text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-accent',
  /** Page conclusion (h1). */
  title: 'text-[2rem] font-bold leading-[1.2] tracking-tight text-heading sm:text-[2.125rem] lg:text-[2.25rem]',
  /** The one supporting sentence under the title. */
  lede: 'text-[1.0625rem] leading-relaxed text-slate sm:text-lg',
  /** Panel heading (h3). */
  h3: 'text-xl font-bold leading-tight text-heading',
  /** Body copy inside panels. */
  body: 'text-base leading-snug text-slate',
  /** Strong body line (a recommendation, a row label). */
  strong: 'text-base font-semibold leading-snug text-heading',
  /** Smallest readable text: footnotes, limits. */
  meta: 'text-[0.9375rem] leading-snug text-slate',
  /** Large figure in a stat. */
  figure: 'font-bold leading-none tabular-nums text-accent-strong',
  /** Flat neutral outline shared by every block. */
  panel: 'rounded-[12px] border border-hairline',
  /** Text link that opens a drawer or moves to a chapter. */
  link: 'inline-flex items-center gap-1 rounded-md text-[0.9375rem] font-medium text-accent underline-offset-4 hover:underline',
  /** Uppercase micro-label for a column or a row. */
  label: 'text-[0.75rem] font-bold uppercase tracking-[0.1em] text-slate',
} as const

/** Spacing rhythm between blocks on an overview. */
export const execGap = 'space-y-6'
