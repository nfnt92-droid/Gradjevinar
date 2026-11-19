import Photo, { PlaceholderTag } from './Photo'
import TechLabel from './details/TechLabel'

/** Uska fotografska traka kao prijelaz iz svijetlog dijela u tamnu sekciju procesa. */
export default function MaterialStrip() {
  return (
    <figure className="relative bg-ink">
      <Photo
        name="detalj-armatura-zid"
        alt="Armatura zida prije betoniranja"
        className="h-[150px] sm:h-[200px] lg:h-[240px]"
        imgClassName="object-[50%_40%]"
        tag={false}
      />
      <PlaceholderTag tone="dark" className="!bottom-auto top-3" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-ink/80" />
      <figcaption className="wrap absolute inset-x-0 bottom-4 left-0 right-0">
        <TechLabel code="Detalj / 03" caption="Armatura zida prije betoniranja" dark />
      </figcaption>
    </figure>
  )
}
