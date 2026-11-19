import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { img } from '../data/content'
import { PlaceholderTag } from './Photo'

const ease = [0.22, 1, 0.36, 1] as const

function Line({ children, delay }: { children: string; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <motion.span
        className="block"
        initial={{ y: '105%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-paper">
      <motion.div className="absolute inset-0" style={{ y }}>
        <motion.img
          src={img('hero-kamenolom', 2000)}
          srcSet={`${img('hero-kamenolom', 1000)} 1000w, ${img('hero-kamenolom', 2000)} 2000w`}
          sizes="100vw"
          alt="Kamenolom s drobilicom u šumovitom krajoliku"
          className="h-[118%] w-full object-cover object-[50%_60%] [filter:contrast(1.12)_brightness(0.9)_saturate(0.92)]"
          initial={{ scale: 1.14, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease }}
        />
      </motion.div>
      {/* Zatamnjenje samo radi čitljivosti naslova */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,24,23,0.6)_0%,rgba(22,24,23,0.05)_28%,rgba(22,24,23,0.2)_52%,rgba(22,24,23,0.92)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,24,23,0.55)_0%,rgba(22,24,23,0.15)_45%,transparent_70%)]" />

      {/* Okomita industrijska oznaka */}
      <motion.div
        className="absolute right-5 top-1/2 hidden -translate-y-1/2 sm:block lg:right-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <p className="label whitespace-nowrap text-paper/70 [writing-mode:vertical-rl]">
          Građevinar <span className="mx-2 text-rust">/</span> Novi Travnik <span className="mx-2 text-rust">/</span> BiH
        </p>
      </motion.div>

      <motion.div style={{ opacity: fade }} className="wrap relative flex h-full flex-col justify-end pb-10 sm:pb-14">
        <h1 className="display text-[clamp(44px,12.6vw,212px)] text-paper [text-shadow:0_2px_40px_rgba(22,24,23,0.35)]">
          <Line delay={0.35}>Od temelja.</Line>
          <Line delay={0.5}>Generacijama.</Line>
        </h1>

        <div className="mt-8 grid gap-8 border-t border-paper/30 pt-6 md:grid-cols-12 md:items-end">
          <motion.p
            className="body-lg max-w-[34ch] text-paper/90 md:col-span-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.9, ease }}
          >
            Više od pola stoljeća graditeljskog iskustva. Od proizvodnje materijala do realizacije zahtjevnih
            građevinskih projekata.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-3 md:col-span-7 md:justify-end"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.9, ease }}
          >
            <a href="#projekti" className="btn bg-rustdark text-paper shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] hover:bg-paper hover:text-ink">
              Naši projekti
            </a>
            <a href="#djelatnosti" className="btn border border-paper/70 bg-ink/30 text-paper backdrop-blur-sm hover:border-paper hover:bg-paper hover:text-ink">
              Naše djelatnosti
            </a>
          </motion.div>
        </div>
      </motion.div>

      <PlaceholderTag tone="dark" className="!bottom-auto top-[88px]" />
    </section>
  )
}
