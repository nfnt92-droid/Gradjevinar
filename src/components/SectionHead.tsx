type Props = { index: string; name: string; dark?: boolean }

/** Tehnička traka na vrhu sekcije: redni broj sekcije, linija, naziv. */
export default function SectionHead({ index, name, dark }: Props) {
  return (
    <div className={`flex items-center gap-4 ${dark ? 'text-paper/60' : 'text-char/60'}`}>
      <span
        className={`label grid h-7 min-w-7 place-items-center border px-1.5 ${
          dark ? 'border-paper/30 text-paper' : 'border-char/30 text-char'
        }`}
      >
        {index}
      </span>
      <span className={`h-px flex-1 ${dark ? 'bg-paper/20' : 'bg-char/20'}`} />
      <span className="label">{name}</span>
    </div>
  )
}
