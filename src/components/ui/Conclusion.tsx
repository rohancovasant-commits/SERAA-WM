/** One short conclusion. Used sparingly: only where a section needs a stated implication. */
export function Conclusion({ children }: { children: string }) {
  return (
    <p className="mt-8 max-w-3xl border-l-4 border-accent pl-5 text-xl font-semibold leading-snug sm:text-2xl">
      {children}
    </p>
  )
}
