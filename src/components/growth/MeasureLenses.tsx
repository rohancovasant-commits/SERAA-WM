import { measureLenses, measuresHeading, type MeasureLens } from '../../data/growth/scaling'

const tone: Record<MeasureLens['id'], { dot: string; label: string; edge: string }> = {
  value: { dot: 'bg-accent', label: 'text-accent-strong', edge: 'border-accent' },
  reuse: { dot: 'bg-violet', label: 'text-violet', edge: 'border-violet' },
  viability: { dot: 'bg-blue', label: 'text-blue', edge: 'border-blue' },
}

/** The three lenses as overlapping circles with live text labels. The overlap is the point: all three must hold. */
function LensVenn() {
  return (
    <svg viewBox="0 0 240 220" role="img" aria-label="Three overlapping lenses: customer value, reuse and commercial viability" className="mx-auto h-auto w-full max-w-[17rem]">
      <circle cx="120" cy="72" r="58" fill="#0f766e" fillOpacity="0.22" stroke="#0f766e" strokeWidth="1.5" />
      <circle cx="80" cy="140" r="58" fill="#6644b8" fillOpacity="0.22" stroke="#6644b8" strokeWidth="1.5" />
      <circle cx="160" cy="140" r="58" fill="#2b5ab0" fillOpacity="0.22" stroke="#2b5ab0" strokeWidth="1.5" />
      <g fontFamily="inherit" fontSize="13" fontWeight="700" textAnchor="middle" fill="#132139">
        <text x="120" y="48">Value</text>
        <text x="58" y="158">Reuse</text>
        <text x="182" y="158">Viability</text>
      </g>
    </svg>
  )
}

/** Three lenses as an overlapping diagram beside readable measure labels. No dashboard figures. */
export function MeasureLenses() {
  return (
    <div className="grid items-center gap-8 rounded-panel border border-hairline bg-white px-5 py-8 sm:px-9 sm:py-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-14">
      <LensVenn />
      <div>
        <h3 className="text-2xl font-bold leading-tight text-navy">{measuresHeading}</h3>
        <ul className="mt-5 space-y-4">
          {measureLenses.map((lens) => (
            <li key={lens.id} className={`border-l-4 pl-5 ${tone[lens.id].edge}`}>
              <p className={`flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] ${tone[lens.id].label}`}>
                <span aria-hidden className={`size-2.5 rounded-full ${tone[lens.id].dot}`} />
                {lens.lens}
              </p>
              <p className="mt-1 text-xl font-semibold leading-snug text-navy">{lens.measures[0]}</p>
              <p className="text-lg leading-snug text-slate">{lens.measures[1]}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
