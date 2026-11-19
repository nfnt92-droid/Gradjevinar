import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useScroll, useSpring } from 'framer-motion'
import SectionHead from './SectionHead'
import Photo, { PlaceholderTag } from './Photo'
import { process } from '../data/content'

const ease = [0.22, 1, 0.36, 1] as const

function Step({ index, onActive, children }: { index: number; onActive: (i: number) => void; children: React.ReactNode }) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })
  useEffect(() => {
    if (inView) onActive(index)
  }, [inView, index, onActive])
  return (
    <li ref={ref} className="flex min-h-0 flex-col justify-center py-10 lg:min-h-[62vh] lg:py-0">
      {children}
    </li>
  )
}

export default function MaterialStory() {
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 55%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const current = process[active]

  return (
    <section id="proces" className="relative bg-ink pt-16 text-paper sm:pt-28">
      <div className="wrap">
        <SectionHead index="04" name="Od materijala do zgrade" dark />
        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:items-end">
          <h2 className="display text-[clamp(44px,7.6vw,118px)] lg:col-span-8">Od kamena do ključa.</h2>
          <p className="body-lg text-paper/70 lg:col-span-4">
            Najvažnije materijale proizvodimo sami, pa kontroliramo cijeli put od kamena do gotovog objekta. Pet
            koraka, jedna odgovornost.
          </p>
        </div>
      </div>

      <div className="wrap mt-6 grid pb-12 lg:mt-4 lg:grid-cols-12 lg:gap-12 lg:pb-16">
        {/* Ljepljivi kadar */}
        <div className="hidden lg:col-span-7 lg:block">
          <div className="sticky top-0 flex h-screen items-center pt-16">
            <div className="relative h-[72vh] max-h-[740px] w-full overflow-hidden bg-char">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.no}
                  className="absolute inset-0"
                  initial={{ clipPath: 'inset(100% 0 0 0)' }}
                  animate={{ clipPath: 'inset(0% 0 0 0)' }}
                  exit={{ opacity: 0.5 }}
                  transition={{ duration: 1, ease }}
                >
                  <motion.div className="h-full w-full" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease }}>
                    <Photo name={current.image} alt={current.title} className="h-full w-full" sizes="58vw" tag={false} />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
              {/* Okvir kadra */}
              <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6">
                <div className="flex items-start justify-between">
                  <span className="label bg-ink/70 px-2 py-1 text-paper">Kadar {current.no} / 05</span>
                  <span className="label bg-ink/70 px-2 py-1 text-paper">{current.title}</span>
                </div>
                <PlaceholderTag tone="dark" className="!bottom-auto !right-6 top-[3.4rem]" />
                <ol className="grid grid-cols-5 gap-1.5 bg-gradient-to-t from-ink/70 to-transparent pt-10">
                  {process.map((p, i) => (
                    <li key={p.no}>
                      <span className={`block h-[3px] transition-colors duration-500 ${i <= active ? 'bg-rust' : 'bg-paper/30'}`} />
                      <span
                        className={`mt-2 block text-[10px] font-bold uppercase tracking-[0.14em] transition-colors duration-500 ${
                          i === active ? 'text-paper' : 'text-paper/45'
                        }`}
                      >
                        {p.no} {p.title}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Koraci */}
        <div className="relative lg:col-span-5">
          <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-paper/15 lg:block" aria-hidden="true">
            <motion.div className="h-full w-full origin-top bg-rust" style={{ scaleY: progress }} />
          </div>
          <ol ref={listRef} className="lg:pl-12">
            {process.map((p, i) => (
              <Step key={p.no} index={i} onActive={setActive}>
                <Photo name={p.image} alt={p.title} className="mb-6 aspect-[4/3] lg:hidden" sizes="100vw" tagTone="dark" />
                <span className="flex items-baseline gap-3">
                  <span className={`display text-[22px] transition-colors duration-500 ${i === active ? 'text-rust' : 'text-rust lg:text-paper/35'}`}>
                    {p.no}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-paper/45">Korak {i + 1} od 5</span>
                </span>
                <h3 className={`display mt-2 text-[clamp(44px,5.2vw,84px)] transition-colors duration-500 ${i === active ? 'text-paper' : 'lg:text-paper/30'}`}>
                  {p.title}
                </h3>
                <p className={`mt-5 max-w-[40ch] text-[17px] leading-relaxed transition-colors duration-500 ${i === active ? 'text-paper/80' : 'text-paper/80 lg:text-paper/35'}`}>
                  {p.text}
                </p>
              </Step>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
