import { img } from '../data/content'

type Props = {
  name: string
  alt: string
  className?: string
  imgClassName?: string
  eager?: boolean
  sizes?: string
  /** Oznaka da fotografija nije Građevinarova (privremena). */
  tag?: boolean
  tagTone?: 'light' | 'dark'
}

export default function Photo({
  name,
  alt,
  className = '',
  imgClassName = '',
  eager,
  sizes = '100vw',
  tag = true,
  tagTone = 'light',
}: Props) {
  return (
    <div className={`relative overflow-hidden bg-concrete ${className}`}>
      <img
        src={img(name, 2000)}
        srcSet={`${img(name, 1000)} 1000w, ${img(name, 2000)} 2000w`}
        sizes={sizes}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`h-full w-full object-cover ${imgClassName}`}
      />
      {tag && <PlaceholderTag tone={tagTone} />}
    </div>
  )
}

export function PlaceholderTag({ tone = 'light', className = '' }: { tone?: 'light' | 'dark'; className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute bottom-3 right-3 z-10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] ${
        tone === 'light' ? 'bg-paper/85 text-char' : 'bg-ink/80 text-paper/80'
      } ${className}`}
    >
      Privremena fotografija
    </span>
  )
}
