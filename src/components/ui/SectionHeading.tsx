interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: string
  sentence?: string
  /** Let the title run wider than the default measure, so a short headline stays on one line. */
  wide?: boolean
}

/** Short heading with at most one supporting sentence. */
export function SectionHeading({ id, eyebrow, title, sentence, wide = false }: SectionHeadingProps) {
  return (
    <header className={wide ? 'max-w-5xl' : 'max-w-3xl'}>
      <p aria-hidden className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
        {eyebrow}
      </p>
      <h2 id={id} className="mt-2 text-[2rem] font-bold leading-[1.1] tracking-tight text-navy sm:text-[2.5rem] lg:text-[3rem]">
        {title}
      </h2>
      {sentence && <p className="mt-3 text-lg leading-snug text-slate sm:text-xl">{sentence}</p>}
    </header>
  )
}
