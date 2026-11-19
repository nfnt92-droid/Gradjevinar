import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'
import { company, nav } from '../data/content'

export default function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.85)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const light = !solid || open

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
          solid && !open ? 'border-b border-char/10 bg-paper/95 backdrop-blur' : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="wrap flex h-[72px] items-center justify-between">
          <a href="#top" aria-label="Građevinar, naslovnica" onClick={() => setOpen(false)}>
            <Logo light={light} />
          </a>

          <nav aria-label="Glavna navigacija" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {nav.slice(1, -1).map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className={`group relative py-2 text-[13px] font-semibold tracking-[0.02em] transition-colors ${
                      light ? 'text-paper/85 hover:text-paper' : 'text-char/75 hover:text-char'
                    }`}
                  >
                    {n.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-rust transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#kontakt"
              className={`btn hidden py-3 lg:inline-flex ${
                light ? 'bg-paper text-ink hover:bg-rust hover:text-paper' : 'bg-char text-paper hover:bg-rust'
              }`}
            >
              Kontakt
            </a>
            <button
              type="button"
              className={`relative grid h-11 w-11 place-items-center lg:hidden ${light ? 'text-paper' : 'text-char'}`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Zatvori izbornik' : 'Otvori izbornik'}
              onClick={() => setOpen((o) => !o)}
            >
              <span className={`absolute h-[2px] w-6 bg-current transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-[5px]'}`} />
              <span className={`absolute h-[2px] w-6 bg-current transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-[5px]'}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink pt-[72px] text-paper lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobilna navigacija" className="wrap flex-1 overflow-y-auto pt-8">
              <ul className="border-t border-paper/15">
                {nav.map((n, i) => (
                  <motion.li
                    key={n.href}
                    className="border-b border-paper/15"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-4"
                    >
                      <span className="display text-[44px] leading-none">{n.label}</span>
                      <span className="label text-paper/40">{String(i + 1).padStart(2, '0')}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="wrap border-t border-paper/15 py-6">
              <p className="label text-paper/50">Uredi</p>
              <a href={`tel:${company.phones[0].value.replace(/\s/g, '')}`} className="mt-1 block text-lg font-semibold">
                {company.phones[0].value}
              </a>
              <p className="mt-1 text-sm text-paper/60">
                {company.address}, {company.city}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
