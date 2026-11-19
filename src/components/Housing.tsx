import Photo from './Photo'
import SectionHead from './SectionHead'

export default function Housing({ onInquiry }: { onInquiry: () => void }) {
  return (
    <section id="stanogradnja" className="bg-paper2">
      <div className="wrap pt-16 sm:pt-28">
        <SectionHead index="06" name="Stanogradnja" />
      </div>
      <div className="mt-14 grid lg:mt-20 lg:grid-cols-12">
        <Photo
          name="stambena-zgrada"
          alt="Fasada stambene zgrade"
          className="aspect-[4/3] lg:col-span-7 lg:aspect-auto lg:min-h-[680px]"
          imgClassName="object-[50%_30%]"
          sizes="(min-width:1024px) 58vw, 100vw"
        />
        <div className="flex flex-col justify-between px-5 py-14 sm:px-8 lg:col-span-5 lg:px-14 lg:py-16 xl:pr-[max(3rem,calc((100vw-1360px)/2+3rem))]">
          <div>
            <h2 className="display text-[clamp(42px,5.6vw,88px)] text-char">Stanovi koje gradimo sami.</h2>
            <p className="body-lg mt-8 max-w-[42ch] text-char/75">
              Kao investitor i izvođač, stanove gradimo vlastitim ljudima i materijalom te ih prodajemo izravno, bez
              posrednika. Kupac zna tko gradi, čime gradi i tko stoji iza svakog kvadrata.
            </p>
          </div>

          <div className="mt-12">
            <div className="border border-dashed border-char/40 p-6">
              <p className="label text-char/50">Aktualna ponuda</p>
              <p className="mt-2 text-[15px] leading-relaxed text-char/70">
                Prostor za trenutne stambene projekte: lokacija, broj stanova, kvadrature i rok useljenja.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={onInquiry} className="btn bg-char text-paper hover:bg-rust">
                Pošaljite upit za stan
              </button>
              <a href="tel:+38730795132" className="btn border border-char/40 text-char hover:border-char">
                +387 30 795 132
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
