interface QualificationDiagramProps {
  stages: { name: string; criterion: string }[]
}

/** Four equal stages with one short criterion each. Schematic only: no counts or conversion rates. */
export function QualificationDiagram({ stages }: QualificationDiagramProps) {
  // Progressive tint suggests narrowing without implying any quantity.
  const fills = ['#c9e9e4', '#8fd2c8', '#3ba59a', '#0f766e']
  const dark = [false, false, true, true]
  const chevron =
    'lg:[clip-path:polygon(0_0,calc(100%-22px)_0,100%_50%,calc(100%-22px)_100%,0_100%,22px_50%)] lg:first:[clip-path:polygon(0_0,calc(100%-22px)_0,100%_50%,calc(100%-22px)_100%,0_100%)]'
  return (
    <figure>
      <ol className="grid gap-3 lg:grid-cols-4 lg:gap-0">
        {stages.map((stage, i) => (
          <li key={stage.name} className="lg:-ml-1.5 lg:first:ml-0">
            <div
              className={`flex min-h-[5rem] items-center gap-3 rounded-card px-5 py-4 lg:rounded-none lg:px-9 lg:first:pl-5 ${chevron} ${dark[i] ? 'text-white' : 'text-ink'}`}
              style={{ background: fills[i] }}
            >
              <span
                aria-hidden
                className={`flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${dark[i] ? 'bg-white text-accent-strong' : 'bg-white/70'}`}
              >
                {i + 1}
              </span>
              <span className="text-lg font-semibold leading-snug">{stage.name}</span>
            </div>
            <p className="mt-2.5 px-1 text-[0.9375rem] font-semibold text-accent-strong lg:px-5 lg:first:pl-5">
              <span className="sr-only">Criterion: </span>
              {stage.criterion}
            </p>
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 text-sm text-slate">Schematic; no counts or rates.</figcaption>
    </figure>
  )
}
