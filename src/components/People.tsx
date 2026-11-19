import SectionHead from './SectionHead'
import Photo from './Photo'
import { DrawingLayer, StructuralGrid } from './drawings/Drawings'

const points = [
  { title: 'Više od 100 djelatnika', text: 'Inženjeri, majstori, rukovatelji strojevima i proizvodni tim, svih profila i specijalnosti.' },
  { title: 'Vlastita mehanizacija', text: 'Provjereni i suvremeni strojevi za zemljane radove, proizvodnju i transport.' },
  { title: 'Stalna edukacija', text: 'Ulažemo u znanje ljudi jer nove tehnologije traže nove vještine.' },
]

export default function People() {
  return (
    <section id="ljudi" className="paper-grain relative overflow-hidden bg-paper py-16 sm:py-28">
      {/* Rešetka stupova: jedva vidljiva, u donjem lijevom praznom prostoru */}
      <DrawingLayer
        className="-bottom-24 -left-16 w-[min(40vw,620px)]"
        opacity={0.06}
        fade="linear-gradient(to top, #000 0%, #000 40%, transparent 85%)"
      >
        <StructuralGrid className="h-auto w-full" />
      </DrawingLayer>
      <div className="wrap relative">
        <SectionHead index="05" name="Ljudi i oprema" />

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:pr-6">
            <h2 className="display text-[clamp(42px,6.8vw,104px)] text-char">Iza svakog projekta stoje ljudi.</h2>
            <p className="body-lg mt-8 max-w-[44ch] text-char/75">
              Strojevi, betonara i kamenolom vrijede onoliko koliko i ljudi koji s njima rade. Naš uspjeh je njihov
              rast, a njihovo zadovoljstvo jedan je od naših unutarnjih ciljeva.
            </p>
            <ul className="mt-12 border-t border-char">
              {points.map((p) => (
                <li key={p.title} className="grid grid-cols-[1fr] gap-1 border-b border-char/20 py-5 sm:grid-cols-[200px_1fr] sm:gap-6">
                  <span className="text-[15px] font-bold text-char">{p.title}</span>
                  <span className="text-[15px] leading-relaxed text-char/65">{p.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 grid grid-cols-6 gap-3 sm:gap-4 lg:col-span-7 lg:mt-0 lg:gap-5">
            <Photo
              name="beton-ugradnja"
              alt="Ugradnja betona u temelj"
              className="col-span-6 aspect-[4/3] sm:col-span-3 sm:row-span-2 sm:aspect-auto"
              sizes="(min-width:1024px) 30vw, 50vw"
            />
            <Photo
              name="mehanizacija-bager"
              alt="Bager na gradilištu"
              className="col-span-3 aspect-square sm:aspect-[4/3]"
              sizes="(min-width:1024px) 30vw, 50vw"
            />
            <Photo
              name="mehanizacija-utovarivac"
              alt="Utovarivač kod deponije agregata"
              className="col-span-3 aspect-square sm:aspect-[4/3]"
              sizes="(min-width:1024px) 30vw, 50vw"
            />
            <Photo
              name="agregat-deponija"
              alt="Deponija agregata s bagerom"
              className="col-span-6 aspect-[16/9] sm:aspect-[21/9]"
              sizes="(min-width:1024px) 58vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
