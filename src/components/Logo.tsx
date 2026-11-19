type Props = { light?: boolean; className?: string }

/** Znak: blok s temeljem. Wordmark u kondenziranom rezu. */
export default function Logo({ light, className = '' }: Props) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" fill={light ? '#F4F1E9' : '#242724'} />
        <rect y="23" width="32" height="9" fill="#C46A39" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[22px] font-extrabold uppercase tracking-[0.02em] ${light ? 'text-paper' : 'text-char'}`}>
          Građevinar
        </span>
        <span className={`mt-1 text-[9px] font-bold uppercase tracking-[0.2em] ${light ? 'text-paper/60' : 'text-char/55'}`}>
          Novi Travnik, od 1970.
        </span>
      </span>
    </span>
  )
}
