type Props = { code: string; caption?: string; dark?: boolean; className?: string }

/** Mala oznaka u stilu arhitektonskog lista, npr. "DETALJ / 01". */
export default function TechLabel({ code, caption, dark, className = '' }: Props) {
  return (
    <span className={`flex items-center gap-3 ${dark ? 'text-paper/60' : 'text-char/55'} ${className}`}>
      <span className="text-[10px] font-bold uppercase tracking-[0.18em]">{code}</span>
      <span className={`h-px w-6 ${dark ? 'bg-paper/30' : 'bg-char/30'}`} aria-hidden="true" />
      {caption && <span className="text-[12px] font-semibold">{caption}</span>}
    </span>
  )
}
