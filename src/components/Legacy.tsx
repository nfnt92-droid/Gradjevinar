import { motion } from 'framer-motion'
import SectionHead from './SectionHead'
import Photo from './Photo'
import Framed from './details/Framed'
import { DrawingLayer, Elevation } from './drawings/Drawings'
import { timeline } from '../data/content'

const START = 1970
const END = 2026
const span = END - START
const pos = (year: number) => ((year - START) / span) * 100
const ease = [0.22, 1, 0.36, 1] as const

export default function Legacy() {
  const years = Array.from({ length: span + 1 }, (_, i) => START + i)

  return (
    <section id="o-nama" className="paper-grain relative overflow-hidden bg-paper pb-24 pt-16 sm:pb-32 sm:pt-28">
      <div className="wrap">
        <SectionHead index="01" name="O nama" />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12">
          <h2 className="display text-[clamp(42px,7.6vw,118px)] text-char lg:col-span-7">
            Iskustvo koje se gradi desetljećima.
          </h2>
          <div className="space-y-5 text-char/80 lg:col-span-4 lg:col-start-9 lg:pt-3">
            <p className="body-lg">
              Građevinar Novi Travnik osnovan je 1970. godine i jedno je od najstarijih građevinskih poduzeća na ovom
              području. Kroz desetljeća smo rasli zajedno s gradom, regijom i zahtjevima naših partnera.
            </p>
            <p className="leading-relaxed">
              Danas objedinjujemo visokogradnju, niskogradnju, proizvodnju i prodaju građevinskog materijala te
              izgradnju i prodaju stanova. Vlastiti kamenolom, pješčara i betonara znače da najvažnije materijale
              proizvodimo sami.
            </p>
          </div>
        </div>
      </div>

      {/* Mjerna traka: 1970 → danas (desktop). Na traku su vezane samo potvrđene godine. */}
      <div className="wrap mt-20 hidden md:block lg:mt-28">
        <div className="grid grid-cols-4">
          {timeline.map((t, i) => (
            <motion.div
              key={t.label}
              className="flex flex-col pr-8"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.7, ease }}
            >
              <span className={`display block text-[clamp(38px,4.1vw,60px)] ${t.year === null ? 'text-char/80' : 'text-char'}`}>
                {t.label}
              </span>
              <span className="mt-3 block text-[14px] font-bold text-char">{t.title}</span>
              <span className="mt-1 block max-w-[30ch] text-[14px] leading-snug text-char/65">{t.text}</span>
              {t.note && (
                <span className="mt-3 inline-flex w-fit items-center gap-2 border border-dashed border-char/35 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-char/55">
                  {t.note}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <svg className="mt-6 block h-16 w-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
          {timeline.map((t, i) => {
            const x0 = i * 25
            return t.year !== null ? (
              <motion.polyline
                key={t.label}
                points={`${x0},0 ${x0},14 ${pos(t.year)},40`}
                fill="none"
                stroke="#C46A39"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0.9 + i * 0.12, duration: 0.6 }}
              />
            ) : (
              // Nepotvrđena godina: kratka isprekidana linija bez veze s trakom
              <line
                key={t.label}
                x1={x0}
                y1={0}
                x2={x0}
                y2={14}
                stroke="#242724"
                strokeOpacity="0.35"
                strokeWidth="1"
                strokeDasharray="3 3"
                vectorEffect="non-scaling-stroke"
              />
            )
          })}
        </svg>

        <motion.div
          className="relative h-px origin-left bg-char"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.4, ease }}
        />
        <div className="relative flex justify-between pb-10" aria-hidden="true">
          {years.map((y) => {
            const decade = y % 10 === 0
            const event = timeline.some((t) => t.year === y)
            return (
              <div key={y} className="relative flex w-px flex-col items-center">
                <span className={`${event ? 'h-5 w-[3px] bg-rust' : decade ? 'h-4 w-px bg-char' : 'h-2 w-px bg-char/35'}`} />
                {decade && <span className="label absolute top-7 text-char/50">{y}</span>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobilna verzija: okomita traka */}
      <ol className="wrap mt-14 md:hidden">
        {timeline.map((t) => (
          <li
            key={t.label}
            className={`relative border-l pb-9 pl-6 last:pb-0 ${t.year === null ? 'border-dashed border-char/40' : 'border-char'}`}
          >
            <span className={`absolute -left-[2px] top-2.5 h-5 w-[3px] ${t.year === null ? 'bg-char/30' : 'bg-rust'}`} />
            <span className={`display block text-[44px] ${t.year === null ? 'text-char/80' : 'text-char'}`}>{t.label}</span>
            <span className="mt-2 block text-[15px] font-bold text-char">{t.title}</span>
            <span className="mt-1 block text-[15px] leading-snug text-char/65">{t.text}</span>
            {t.note && (
              <span className="mt-3 inline-block border border-dashed border-char/35 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-char/55">
                {t.note}
              </span>
            )}
          </li>
        ))}
      </ol>

      <div className="relative">
        {/* Pročelje: u praznom prostoru desno, izblijeđeno prema tekstu ispod */}
        <DrawingLayer
          className="-right-[6vw] top-[-70px] w-[min(46vw,760px)]"
          opacity={0.07}
          fade="linear-gradient(to bottom, #000 0%, #000 24%, transparent 46%)"
        >
          <Elevation className="h-auto w-full" />
        </DrawingLayer>

        <div className="wrap relative mt-20 grid gap-10 lg:mt-32 lg:grid-cols-12 lg:items-end">
          <Framed className="lg:col-span-8">
            <Photo
              name="gradiliste-dizalice"
              alt="Gradilište s toranjskim dizalicama snimljeno odozgo"
              className="aspect-[4/3] sm:aspect-[16/10]"
              sizes="(min-width:1024px) 66vw, 100vw"
            />
          </Framed>
          <div className="lg:col-span-4 lg:pb-2">
            <p className="display text-[clamp(28px,3vw,42px)] leading-[0.95] text-char">
              Prilagođavamo se novim tehnologijama, a ne mijenjamo ono što nas je dovelo ovdje.
            </p>
            <p className="mt-5 leading-relaxed text-char/70">
              Stalnom edukacijom zaposlenika i nabavom suvremenih strojeva pratimo nove materijale i tehnologije u
              građevinarstvu. Kvalitetu i sigurnost rada osiguravaju provjerena mehanizacija i iskusni ljudi.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
