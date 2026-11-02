export type ActionVariant = 'primary' | 'secondary' | 'quiet' | 'onDarkPrimary' | 'onDarkSecondary'

const base =
  'group inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-base font-semibold transition-colors'

const variants: Record<ActionVariant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-strong',
  secondary: 'border border-navy/25 bg-white text-navy hover:border-accent hover:text-accent',
  quiet: 'border border-accent px-4 py-2.5 text-[0.9375rem] text-accent hover:bg-accent hover:text-white',
  onDarkPrimary: 'bg-white text-navy hover:bg-teal-bright focus-visible:outline-white',
  onDarkSecondary: 'border border-white/40 text-white hover:border-teal-bright hover:text-teal-bright focus-visible:outline-white',
}

/** Class string for buttons and links that look like buttons. */
export function actionClass(variant: ActionVariant = 'primary') {
  return `${base} ${variants[variant]}`
}
