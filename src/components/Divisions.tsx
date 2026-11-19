import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHead from './SectionHead'
import Photo from './Photo'
import { divisions } from '../data/content'
import Framed from './details/Framed'
import TechLabel from './details/TechLabel'

const ease = [0.22, 1, 0.36, 1] as const

export default function Divisions() {
  const [active, setActive] = useState(0)
  const current = divisions[active]

  return (
    <section id="djelatnosti" className="paper-grain bg-paper2 py-16 sm:py-28">
      <div className="wrap">
        <SectionHead index="02" name="Djelatnosti" />

        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:items-end">
          <h2 className="display text-[clamp(40px,6.4vw,100px)] text-char lg:col-span-7">
            Četiri djelatnosti. Jedan lanac.
          </h2>
          <p className="body-lg text-char/75 lg:col-span-4 lg:col-start-9">
            Od kamena iz vlastitog kamenoloma do ključeva novog stana. Svaka djelatnost oslanja se na drugu, i zato
            projekte vodimo bez posrednika.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* Indeks djelatnosti */}
          <div className="lg:col-span-5">
          <ul className="border-t border-char/20" role="tablist" aria-label="Djelatnosti">
            {divisions.map((d, i) => {
              const on = i === active
              return (
                <li key={d.key} className="border-b border-char/20">
                  <button
                    type="button"
                    role="tab"
                    id={`tab-${d.key}`}
                    aria-selected={on}
                    aria-controls="division-panel"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex w-full items-start gap-5 py-6 text-left sm:gap-7"
                  >
                    <span
                      className={`display mt-1 text-[22px] transition-colors duration-300 ${on ? 'text-rust' : 'text-char/35'}`}
                    >
                      {d.no}
                    </span>
                    <span className="flex-1">
                      <span
                        className={`display block text-[clamp(32px,3.4vw,50px)] transition-colors duration-300 ${
                          on ? 'text-char' : 'text-char/45 group-hover:text-char/80'
                        }`}
                      >
                        {d.title}
                      </span>
                      <span className="mt-2 block text-[14px] font-semibold text-char/60">{d.short}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-4 h-px w-10 shrink-0 origin-right bg-rust transition-transform duration-500 ease-out ${
                        on ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </button>

                  {/* Mobilno: sadržaj ispod aktivne stavke */}
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        className="overflow-hidden lg:hidden"
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.5, ease }}
                      >
                        <div className="pb-8">
                          <Photo name={d.image} alt={d.alt} className="aspect-[4/3]" sizes="100vw" />
                          <p className="mt-5 leading-relaxed text-char/80">{d.text}</p>
                          <Facts facts={d.facts} />
                          <a href={d.href} className="btn mt-6 bg-char px-5 text-paper hover:bg-rust">
                            Saznajte više
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>

          {/* Detalj materijala: sekundarni vizual uz navigaciju */}
          <figure className="mt-12 hidden lg:block">
            <Framed>
              <Photo
                name="detalj-armatura"
                alt="Rebrasta armatura, detalj"
                className="aspect-[16/7]"
                imgClassName="object-[50%_45%]"
                sizes="36vw"
              />
            </Framed>
            <figcaption className="mt-5">
              <TechLabel code="Detalj / 01" caption="Rebrasta armatura" />
            </figcaption>
          </figure>
          </div>

          {/* Desktop: velika slika i opis */}
          <div
            id="division-panel"
            role="tabpanel"
            aria-labelledby={`tab-${current.key}`}
            className="hidden lg:col-span-7 lg:block"
          >
            <div className="sticky top-24">
              <div className="relative aspect-[5/4] overflow-hidden bg-char">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={current.key}
                    className="absolute inset-0"
                    initial={{ clipPath: 'inset(0 0 0 100%)' }}
                    animate={{ clipPath: 'inset(0 0 0 0%)' }}
                    exit={{ opacity: 0.6 }}
                    transition={{ duration: 0.9, ease }}
                  >
                    <motion.div
                      className="h-full w-full"
                      initial={{ scale: 1.12 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.4, ease }}
                    >
                      <Photo name={current.image} alt={current.alt} className="h-full w-full" sizes="58vw" eager />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
                <span className="display pointer-events-none absolute left-6 top-4 z-10 text-[120px] leading-none text-paper/90 mix-blend-overlay">
                  {current.no}
                </span>
              </div>

              <div className="mt-8 grid grid-cols-7 gap-8">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={current.key}
                    className="col-span-4 leading-relaxed text-char/80"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    {current.text}
                  </motion.p>
                </AnimatePresence>
                <div className="col-span-3">
                  <Facts facts={current.facts} />
                  <a href={current.href} className="btn mt-6 bg-char px-5 text-paper hover:bg-rust">
                    Saznajte više
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Facts({ facts }: { facts: string[] }) {
  return (
    <ul className="mt-5 border-t border-char/20 lg:mt-0">
      {facts.map((f) => (
        <li key={f} className="flex items-center gap-3 border-b border-char/20 py-2.5 text-[14px] font-semibold text-char">
          <span className="h-1.5 w-1.5 bg-rust" aria-hidden="true" />
          {f}
        </li>
      ))}
    </ul>
  )
}
