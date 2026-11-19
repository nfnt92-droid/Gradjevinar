import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { company, divisionOptions } from '../data/content'

type Props = { division: string; setDivision: (d: string) => void }

const field =
  'mt-1 w-full rounded-none border-0 border-b border-paper/30 bg-transparent px-0 py-4 text-[17px] leading-snug text-paper placeholder:text-paper/40 transition-colors hover:border-paper/50 focus:border-rust focus:outline-none focus:ring-0 [&:user-invalid]:border-rust'
const fieldLabel = 'block text-[11px] font-bold uppercase tracking-[0.14em] text-paper/70'

function GroupHead({ no, title }: { no: string; title: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="grid h-7 min-w-7 place-items-center border border-paper/30 px-1.5 text-[11px] font-bold tracking-[0.1em] text-paper">
        {no}
      </span>
      <span className="text-[15px] font-bold text-paper">{title}</span>
      <span className="h-px flex-1 bg-paper/15" aria-hidden="true" />
    </div>
  )
}

export default function Contact({ division, setDivision }: Props) {
  const [status, setStatus] = useState<'idle' | 'error' | 'notice'>('idle')

  // Obrazac namjerno NE šalje poruke dok se ne poveže servis (npr. Netlify Forms).
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setStatus(form.checkValidity() ? 'notice' : 'error')
    if (!form.checkValidity()) form.reportValidity()
  }

  return (
    <section id="kontakt" className="relative overflow-hidden bg-ink pb-10 pt-16 text-paper sm:pt-28">
      <div className="wrap">
        <h2 className="display text-[clamp(44px,10.4vw,168px)]">
          Gradimo sljedeći
          <br />
          korak zajedno.
        </h2>

        <div className="mt-16 grid gap-16 border-t border-paper/20 pt-12 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          {/* Podaci */}
          <div className="lg:col-span-4">
            <p className="label text-paper/50">Sjedište</p>
            <address className="mt-3 not-italic">
              <span className="block text-xl font-semibold">{company.legalName}</span>
              <span className="mt-1 block text-paper/75">{company.address}</span>
              <span className="block text-paper/75">
                {company.city}, {company.country}
              </span>
            </address>
            <a
              href={company.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block border-b border-rust pb-0.5 text-[14px] font-semibold text-paper hover:text-rust"
            >
              Otvori u kartama
            </a>

            <p className="label mt-12 text-paper/50">Telefoni</p>
            <dl className="mt-3 border-t border-paper/15">
              {company.phones.map((p) => (
                <div key={p.label} className="flex items-baseline justify-between border-b border-paper/15 py-3">
                  <dt className="text-[14px] text-paper/60">{p.label}</dt>
                  <dd>
                    {p.label === 'Fax' ? (
                      <span className="font-semibold tabular-nums">{p.value}</span>
                    ) : (
                      <a href={`tel:${p.value.replace(/\s/g, '')}`} className="font-semibold tabular-nums hover:text-rust">
                        {p.value}
                      </a>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Obrazac */}
          <form
            noValidate
            onSubmit={onSubmit}
            className="-mx-5 border-y border-paper/15 bg-char/40 px-5 py-8 sm:mx-0 sm:border sm:p-10 lg:col-span-7 lg:col-start-6"
            aria-describedby="form-status"
          >
            <fieldset>
              <legend className="w-full">
                <GroupHead no="01" title="Područje upita" />
              </legend>
              <div className="mt-5 flex flex-wrap gap-2">
                {divisionOptions.map((d) => (
                  <label key={d} className="cursor-pointer">
                    <input
                      type="radio"
                      name="djelatnost"
                      value={d}
                      checked={division === d}
                      onChange={() => setDivision(d)}
                      className="peer sr-only"
                    />
                    <span className="block min-h-[44px] border border-paper/30 px-4 py-3 text-[14px] font-semibold text-paper/80 transition-colors hover:border-paper peer-checked:border-rustdark peer-checked:bg-rustdark peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rust">
                      {d}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-12">
              <legend className="w-full">
                <GroupHead no="02" title="Vaši podaci" />
              </legend>
              <div className="mt-4 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <label className="block">
                  <span className={fieldLabel}>Ime i prezime ili tvrtka *</span>
                  <input name="ime" required autoComplete="name" className={field} placeholder="Vaše ime" />
                </label>
                <label className="block">
                  <span className={fieldLabel}>E-mail *</span>
                  <input name="email" type="email" required autoComplete="email" className={field} placeholder="ime@tvrtka.ba" />
                </label>
                <label className="block">
                  <span className={fieldLabel}>Telefon</span>
                  <input name="telefon" type="tel" autoComplete="tel" className={field} placeholder="+387" />
                </label>
                <label className="block">
                  <span className={fieldLabel}>Predmet</span>
                  <input name="predmet" className={field} placeholder="Npr. ponuda za beton" />
                </label>
              </div>
            </fieldset>

            <fieldset className="mt-12">
              <legend className="w-full">
                <GroupHead no="03" title="Poruka" />
              </legend>
              <label className="mt-4 block">
                <span className={fieldLabel}>Opis upita *</span>
                <textarea
                  name="poruka"
                  required
                  rows={5}
                  className={`${field} resize-y`}
                  placeholder="Opišite projekt, količine ili rokove."
                />
              </label>
            </fieldset>

            <div className="mt-10 flex flex-col gap-5 border-t border-paper/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" className="btn justify-center bg-rustdark px-8 py-5 text-[12px] text-paper hover:bg-paper hover:text-ink">
                Pošaljite upit
              </button>
              <p className="text-[13px] text-paper/55">Polja označena zvjezdicom su obavezna.</p>
            </div>

            <div id="form-status" aria-live="polite">
              <AnimatePresence>
                {status === 'notice' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-8 border-l-2 border-rust bg-paper/[0.06] p-5 text-[15px] leading-relaxed text-paper/85"
                  >
                    Upit nije poslan: slanje poruka s ove stranice još nije uključeno. Nazovite nas na{' '}
                    <span className="font-semibold text-paper">{company.phones[0].value}</span>.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-8 text-[14px] text-rust"
                  >
                    Upišite ime, ispravnu e-mail adresu i poruku.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
