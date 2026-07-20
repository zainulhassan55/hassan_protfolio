type PortraitProps = {
  src: string
  fallback: string
  alt: string
  name: string
}

/**
 * Professional framed portrait. Uses object-cover focused on the face
 * so tightly cropped shoulders don't look accidentally cut off.
 */
export function Portrait({ src, fallback, alt, name }: PortraitProps) {
  const isPlaceholder = src.includes('placeholder') || src.endsWith('.svg')

  if (isPlaceholder) {
    return (
      <div className="portrait-card aspect-[4/5] w-full" role="img" aria-label={alt}>
        <span className="sr-only">{name}</span>
      </div>
    )
  }

  return (
    <div className="portrait-card aspect-[4/5] w-full">
      <img
        src={src}
        alt={alt}
        width={800}
        height={1000}
        className="h-full w-full object-cover object-[center_12%]"
        onError={(e) => {
          e.currentTarget.src = fallback
        }}
      />
    </div>
  )
}
