import { useState } from 'react'
import SectionHead from './SectionHead'
import ProjectModal from './ProjectModal'
import Photo from './Photo'
import Framed from './details/Framed'
import TechLabel from './details/TechLabel'
import { DrawingLayer, FoundationDetail } from './drawings/Drawings'
import { projects } from '../data/content'

// Ritam mreže: veliki par (8 + 4), zatim trojka (4 + 4 + 4).
const cell = [
  'sm:col-span-2 lg:col-span-8',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4',
  'sm:col-span-2 lg:col-span-4',
]
const media = [
  'aspect-[4/3] lg:aspect-auto lg:h-[560px]',
  'aspect-[4/3] sm:aspect-[4/5] lg:aspect-auto lg:h-[560px]',
  'aspect-[4/3] lg:aspect-auto lg:h-[360px]',
  'aspect-[4/3] lg:aspect-auto lg:h-[360px]',
  'aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-[360px]',
]

export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const inquiry = () => {
    setOpenIndex(null)
    window.setTimeout(() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' }), 80)
  }

  return (
    <section id="projekti" className="paper-grain relative overflow-hidden bg-paper py-16 sm:py-28">
      <div className="wrap">
        <SectionHead index="03" name="Projekti" />

        <div className="relative mt-12 grid gap-8 lg:mt-20 lg:grid-cols-12">
          {/* Detalj temelja u praznom prostoru desno od naslova */}
          <DrawingLayer
            className="left-[38%] top-[-36px] w-[30%]"
            opacity={0.08}
            fade="radial-gradient(ellipse 70% 70% at 50% 45%, #000 45%, transparent 80%)"
          >
            <FoundationDetail className="h-auto w-full" />
          </DrawingLayer>

          <h2 className="display relative text-[clamp(44px,7.6vw,118px)] text-char lg:col-span-6">
            Odabrani
            <br />
            projekti.
          </h2>
          <div className="relative lg:col-span-4 lg:col-start-9">
            <p className="body-lg text-char/75">
              Izbor objekata i infrastrukture koje smo izveli. Svaki projekt prikazujemo s lokacijom, kategorijom i
              godinom završetka.
            </p>
            <p className="mt-4 border-l-2 border-rust pl-4 text-[13px] leading-relaxed text-char/60">
              Prijedlog izgleda: polja ispod čekaju potvrđene podatke i fotografije projekata.
            </p>
            <figure className="mt-10">
              <Framed>
                <Photo
                  name="detalj-beton"
                  alt="Površina vidljivog betona s otiskom oplate"
                  className="aspect-[16/9]"
                  sizes="(min-width:1024px) 30vw, 100vw"
                />
              </Framed>
              <figcaption className="mt-5">
                <TechLabel code="Detalj / 02" caption="Vidljivi beton, otisak oplate" />
              </figcaption>
            </figure>
          </div>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-24 lg:grid-cols-12 lg:gap-y-20">
          {projects.map((p, i) => (
            <li key={p.code} className={cell[i]}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group block w-full text-left focus-visible:outline-offset-8"
                aria-haspopup="dialog"
                aria-label={`Otvori projekt ${p.code}, ${p.category}`}
              >
                <div className={`relative overflow-hidden ${media[i]}`}>
                  <Photo
                    name={p.image}
                    alt={p.alt}
                    className="absolute inset-0"
                    imgClassName="grayscale-[0.55] transition-[transform,filter] duration-[1100ms] ease-out group-hover:scale-[1.035] group-hover:grayscale-0"
                    sizes={i === 0 ? '(min-width:1024px) 62vw, 100vw' : '(min-width:1024px) 31vw, 50vw'}
                  />
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <TechLabel code={`Projekt / ${p.code}`} />
                  <span className="border border-char/25 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-char/50">
                    Za unos
                  </span>
                </div>

                <h3 className="display mt-3 text-[clamp(28px,2.4vw,36px)] text-char">
                  <span className="relative">
                    Naziv projekta
                    <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-rust transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  </span>
                </h3>

                <dl className="mt-4 grid grid-cols-3 border-y border-char/15 text-[13px]">
                  <div className="py-3 pr-3">
                    <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-char/45">Lokacija</dt>
                    <dd className="mt-1 font-semibold text-char/45">Unijeti</dd>
                  </div>
                  <div className="border-l border-char/15 py-3 pl-3 pr-3">
                    <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-char/45">Kategorija</dt>
                    <dd className="mt-1 font-semibold text-char">{p.category}</dd>
                  </div>
                  <div className="border-l border-char/15 py-3 pl-3">
                    <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-char/45">Godina</dt>
                    <dd className="mt-1 font-semibold text-char/45">Unijeti</dd>
                  </div>
                </dl>

                <p className="mt-4 max-w-[52ch] text-[14px] leading-relaxed text-char/60">
                  Kratak opis: obim radova, uloga Građevinara i ključne karakteristike objekta.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-char transition-colors group-hover:text-rustdark">
                  Detalji projekta
                  <span className="h-px w-6 bg-current transition-all duration-300 group-hover:w-10" aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ProjectModal
        projects={projects}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
        onInquiry={inquiry}
      />
    </section>
  )
}
