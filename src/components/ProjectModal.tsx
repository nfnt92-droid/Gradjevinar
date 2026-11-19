import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '../data/content'
import { img } from '../data/content'
import { PlaceholderTag } from './Photo'
import TechLabel from './details/TechLabel'

type Props = {
  projects: Project[]
  index: number | null
  onClose: () => void
  onNavigate: (i: number) => void
  onInquiry: () => void
}

const ease = [0.22, 1, 0.36, 1] as const

const facts = [
  'Lokacija',
  'Kategorija',
  'Godina završetka',
  'Investitor',
  'Uloga Građevinara',
  'Površina / obim',
] as const

export default function ProjectModal({ projects, index, onClose, onNavigate, onInquiry }: Props) {
  const open = index !== null
  const project = open ? projects[index] : null
  const [photo, setPhoto] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)

  // Nova fotografija pri promjeni projekta
  useEffect(() => setPhoto(0), [index])

  // Zaključavanje pozadine, fokus i povratak fokusa
  useEffect(() => {
    if (!open) return
    lastFocus.current = document.activeElement as HTMLElement
    document.body.style.overflow = 'hidden'
    const t = window.setTimeout(() => closeRef.current?.focus(), 50)
    return () => {
      window.clearTimeout(t)
      document.body.style.overflow = ''
      lastFocus.current?.focus({ preventScroll: true })
    }
  }, [open])

  const count = project?.gallery.length ?? 0
  const step = useCallback((d: number) => setPhoto((p) => (p + d + count) % count), [count])

  // Tipkovnica: Esc, strelice, zadržavanje fokusa u prozoru
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
      else if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])')
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, step])

  const prev = index !== null ? (index - 1 + projects.length) % projects.length : 0
  const next = index !== null ? (index + 1) % projects.length : 0

  return (
    <AnimatePresence>
      {project && index !== null && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-stretch justify-center bg-ink/85 backdrop-blur-sm lg:items-center lg:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            className="relative flex h-full w-full max-w-site flex-col overflow-hidden bg-paper lg:h-[min(92vh,900px)]"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            {/* Zaglavlje prozora */}
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-char/15 px-5 sm:px-8">
              <TechLabel code={`Projekt / ${project.code}`} caption={project.category} />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="flex h-11 items-center gap-3 pl-3 text-[12px] font-bold uppercase tracking-[0.14em] text-char hover:text-rustdark"
              >
                Zatvori
                <span className="relative block h-4 w-4" aria-hidden="true">
                  <span className="absolute left-0 top-1/2 h-[2px] w-4 rotate-45 bg-current" />
                  <span className="absolute left-0 top-1/2 h-[2px] w-4 -rotate-45 bg-current" />
                </span>
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto lg:grid lg:grid-cols-12 lg:overflow-hidden">
              {/* Galerija */}
              <div className="flex flex-col bg-char lg:col-span-7 lg:min-h-0">
                <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:flex-1">
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={`${project.code}-${photo}`}
                      src={img(project.gallery[photo].image, 2000)}
                      srcSet={`${img(project.gallery[photo].image, 1000)} 1000w, ${img(project.gallery[photo].image, 2000)} 2000w`}
                      sizes="(min-width:1024px) 58vw, 100vw"
                      alt={project.gallery[photo].alt}
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease }}
                    />
                  </AnimatePresence>
                  <PlaceholderTag tone="dark" />
                  <span className="absolute left-4 top-4 z-10 bg-ink/70 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-paper">
                    {String(photo + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                  </span>
                  <div className="absolute inset-y-0 left-0 right-0 z-10 flex items-center justify-between px-3">
                    <GalleryArrow dir="prev" onClick={() => step(-1)} />
                    <GalleryArrow dir="next" onClick={() => step(1)} />
                  </div>
                </div>

                {/* Sličice */}
                <div className="grid shrink-0 grid-cols-3 gap-2 p-2 sm:gap-3 sm:p-3">
                  {project.gallery.map((g, i) => (
                    <button
                      key={g.image + i}
                      type="button"
                      onClick={() => setPhoto(i)}
                      aria-label={`Fotografija ${i + 1}: ${g.alt}`}
                      aria-current={i === photo}
                      className={`relative aspect-[16/10] overflow-hidden outline-offset-2 transition-opacity ${
                        i === photo ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                      }`}
                    >
                      <img src={img(g.image, 1000)} alt="" className="h-full w-full object-cover" loading="lazy" />
                      {i === photo && <span className="absolute inset-x-0 bottom-0 h-[3px] bg-rust" aria-hidden="true" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Podaci i tekst */}
              <div className="flex flex-col lg:col-span-5 lg:min-h-0 lg:overflow-y-auto">
                <div className="flex-1 px-5 py-8 sm:px-10 sm:py-10">
                  <div className="flex items-start justify-between gap-4">
                    <h2 id="project-title" className="display text-[clamp(40px,4.2vw,64px)] text-char">
                      Naziv projekta
                    </h2>
                    <span className="mt-2 shrink-0 border border-char/25 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-char/50">
                      Za unos
                    </span>
                  </div>

                  <dl className="mt-8 grid grid-cols-2 border-t border-char/15">
                    {facts.map((f, i) => (
                      <div
                        key={f}
                        className={`border-b border-char/15 py-3.5 ${i % 2 === 1 ? 'border-l pl-4' : 'pr-4'}`}
                      >
                        <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-char/45">{f}</dt>
                        <dd className={`mt-1 text-[14px] font-semibold ${f === 'Kategorija' ? 'text-char' : 'text-char/45'}`}>
                          {f === 'Kategorija' ? project.category : 'Unijeti'}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <section className="mt-10">
                    <h3 className="text-[15px] font-bold text-char">O projektu</h3>
                    <p className="mt-3 leading-relaxed text-char/65">
                      Ovdje dolazi opis projekta: što je izgrađeno, gdje i za koga, koji su bili zahtjevi investitora i
                      po čemu je projekt poseban. Preporučena duljina je dva do tri kratka odlomka.
                    </p>
                  </section>

                  <section className="mt-8">
                    <h3 className="text-[15px] font-bold text-char">Obim radova</h3>
                    <ul className="mt-3 border-t border-char/15">
                      {['Prva skupina radova', 'Druga skupina radova', 'Treća skupina radova'].map((w) => (
                        <li key={w} className="flex items-center gap-3 border-b border-char/15 py-2.5 text-[14px] text-char/50">
                          <span className="h-1.5 w-1.5 bg-rust" aria-hidden="true" />
                          {w}: unijeti
                        </li>
                      ))}
                    </ul>
                  </section>

                  <p className="mt-8 border-l-2 border-rust pl-4 text-[13px] leading-relaxed text-char/55">
                    Fotografije su privremene. Za svaki projekt predviđeno je do deset vlastitih fotografija.
                  </p>
                </div>

                {/* Dno prozora: upit i navigacija */}
                <div className="sticky bottom-0 shrink-0 border-t border-char/15 bg-paper px-5 py-4 sm:px-10">
                  <div className="flex items-center justify-between gap-3">
                    <button type="button" onClick={onInquiry} className="btn bg-char px-5 py-3.5 text-paper hover:bg-rustdark">
                      Pošaljite upit
                    </button>
                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => onNavigate(prev)}
                        className="grid h-11 min-w-11 place-items-center border border-char/25 px-4 text-[12px] font-bold uppercase tracking-[0.12em] text-char hover:border-char"
                        aria-label={`Prethodni projekt, ${projects[prev].code}`}
                      >
                        <span className="hidden sm:inline">Prethodni</span>
                        <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" className="sm:hidden rotate-180">
                          <path d="M5 2l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigate(next)}
                        className="-ml-px grid h-11 min-w-11 place-items-center border border-char/25 px-4 text-[12px] font-bold uppercase tracking-[0.12em] text-char hover:border-char"
                        aria-label={`Sljedeći projekt, ${projects[next].code}`}
                      >
                        <span className="hidden sm:inline">Sljedeći</span>
                        <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" className="sm:hidden ">
                          <path d="M5 2l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function GalleryArrow({ dir, onClick }: { dir: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 'prev' ? 'Prethodna fotografija' : 'Sljedeća fotografija'}
      className="grid h-11 w-11 place-items-center bg-ink/60 text-paper backdrop-blur-sm transition-colors hover:bg-rustdark"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className={dir === 'prev' ? 'rotate-180' : ''}>
        <path d="M5 2l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    </button>
  )
}
