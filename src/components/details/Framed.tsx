import type { ReactNode } from 'react'

type Props = { children: ReactNode; className?: string; dark?: boolean }

/** Okvir s oznakama reza u kutovima, kao na tiskarskom ili arhitektonskom listu. */
export default function Framed({ children, className = '', dark }: Props) {
  const c = dark ? 'border-paper/35' : 'border-char/35'
  const mark = `pointer-events-none absolute h-4 w-4 ${c}`
  return (
    <div className={`relative ${className}`}>
      {children}
      <span aria-hidden="true" className={`${mark} -left-3 -top-3 border-l border-t`} />
      <span aria-hidden="true" className={`${mark} -right-3 -top-3 border-r border-t`} />
      <span aria-hidden="true" className={`${mark} -bottom-3 -left-3 border-b border-l`} />
      <span aria-hidden="true" className={`${mark} -bottom-3 -right-3 border-b border-r`} />
    </div>
  )
}
