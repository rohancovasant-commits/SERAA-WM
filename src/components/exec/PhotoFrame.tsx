interface PhotoFrameProps {
  src: string
  /** Empty for scene-setting photographs that imply no organisation. */
  alt?: string
  caption?: string
  aspect?: string
  className?: string
}

/** A supplied photograph, cropped to a fixed ratio with a quiet caption. Never carries a claim. */
export function PhotoFrame({ src, alt = '', caption, aspect = 'aspect-[4/3]', className = '' }: PhotoFrameProps) {
  return (
    <figure className={`m-0 ${className}`}>
      <div className={`relative ${aspect} w-full overflow-hidden rounded-xl bg-hairline-soft`}>
        <img src={src} alt={alt} aria-hidden={alt ? undefined : true} loading="lazy" className="absolute inset-0 size-full object-cover saturate-[0.92]" />
      </div>
      {caption && <figcaption className="mt-2 text-[0.9375rem] leading-snug text-slate">{caption}</figcaption>}
    </figure>
  )
}
