// Sav vidljivi sadržaj na jednom mjestu.
// Podaci označeni s VERIFY preuzeti su s postojeće stranice gradjevinarnt.com
// i trebaju potvrdu uprave prije objave (vidi README.md).

export const img = (name: string, w: 1000 | 2000 = 2000) =>
  `${import.meta.env.BASE_URL}img/${name}-${w}.webp`

export const company = {
  name: 'Građevinar d.o.o.',
  legalName: 'GP Građevinar d.o.o.',
  founded: 1970, // VERIFY
  employees: 'više od 100', // VERIFY
  address: 'Kralja Tvrtka 42',
  city: '72290 Novi Travnik',
  country: 'Bosna i Hercegovina',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kralja+Tvrtka+42+Novi+Travnik',
  phones: [
    { label: 'Uredi', value: '+387 30 795 132' },
    { label: 'Betonara', value: '+387 30 795 138' },
    { label: 'Pješčara', value: '+387 30 790 027' },
    { label: 'Fax', value: '+387 30 795 135' },
  ],
}

export const nav = [
  { label: 'Naslovnica', href: '#top' },
  { label: 'O nama', href: '#o-nama' },
  { label: 'Djelatnosti', href: '#djelatnosti' },
  { label: 'Projekti', href: '#projekti' },
  { label: 'Stanogradnja', href: '#stanogradnja' },
  { label: 'Kontakt', href: '#kontakt' },
]

export type Division = {
  no: string
  key: string
  title: string
  short: string
  text: string
  facts: string[]
  image: string
  alt: string
  href: string
}

export const divisions: Division[] = [
  {
    no: '01',
    key: 'gradnja',
    title: 'Visokogradnja i niskogradnja',
    short: 'Objekti, infrastruktura i zanatski radovi',
    text: 'Izvodimo objekte visokogradnje i radove niskogradnje vlastitim ljudima i mehanizacijom. Uz to preuzimamo i zanatske radove u građevinarstvu, pa projekt vodimo od zemljanih radova do završne obrade.',
    facts: ['Visokogradnja', 'Niskogradnja', 'Zanatski radovi'],
    image: 'gradiliste-zrak',
    alt: 'Gradilište snimljeno iz zraka',
    href: '#projekti',
  },
  {
    no: '02',
    key: 'beton',
    title: 'Proizvodnja betona',
    short: 'Svježi beton iz vlastite betonare',
    text: 'Vlastita betonara proizvodi svježi beton za naša gradilišta i za vanjske kupce. Agregat dolazi iz našeg kamenoloma, pa kvalitetu kontroliramo od sirovine do mješavine.',
    facts: ['Vlastita betonara', 'Svježi beton', 'Prodaja kupcima'],
    image: 'betonara',
    alt: 'Betonara s kamionom i deponijom agregata',
    href: '#kontakt',
  },
  {
    no: '03',
    key: 'kamenolom',
    title: 'Kamenolom i agregati',
    short: 'Dolomit iz kamenoloma Bučići',
    text: 'U kamenolomu na lokaciji Bučići eksploatiramo građevinski kamen, dolomit. Vlastita pješčara od njega proizvodi dolomitne agregate svih granulacija, za naše potrebe i za druga pravna i fizička lica.',
    facts: ['Kamenolom Bučići', 'Dolomit', 'Agregati svih granulacija'],
    image: 'kamenolom-etaze',
    alt: 'Kamenolom s etažama i bagerom',
    href: '#kontakt',
  },
  {
    no: '04',
    key: 'stanogradnja',
    title: 'Stanogradnja',
    short: 'Izgradnja i prodaja stanova',
    text: 'Stambene zgrade gradimo u vlastitoj izvedbi i stanove prodajemo izravno kupcima. Isti tim, isti materijal i ista odgovornost, od temelja do predaje ključeva.',
    facts: ['Vlastita izvedba', 'Prodaja stanova', 'Izravno od investitora'],
    image: 'stambena-fasada',
    alt: 'Fasada stambene zgrade',
    href: '#stanogradnja',
  },
]

export const divisionOptions = [
  'Visokogradnja i niskogradnja',
  'Proizvodnja betona',
  'Kamenolom i agregati',
  'Stanogradnja',
  'Ostalo',
]

// VERIFY: 2020 i 2022 su datumi objava na staroj stranici, ne nužno godine početka.
export const timeline = [
  { year: 1970, title: 'Osnivanje', text: 'Građevinsko poduzeće Građevinar osnovano je u Novom Travniku.' },
  { year: 2020, title: 'Kamenolom Bučići', text: 'Eksploatacija dolomita za vlastitu betonaru i tržište.' },
  { year: 2022, title: 'Nove tehnologije', text: 'Uvođenje ISO SPAN blokova s ugrađenom toplinskom izolacijom.' },
  { year: 2026, title: 'Danas', text: 'Više od 100 djelatnika i zaokružen lanac, od kamena do zgrade.' },
]

export type Project = {
  code: string
  category: string
  image: string
  alt: string
  /** Fotografije za galeriju u prozoru projekta (prva je naslovna). */
  gallery: { image: string; alt: string }[]
}

// Sva polja projekata su za unos: nazivi, lokacije, godine i opisi dolaze od Građevinara.
export const projects: Project[] = [
  {
    code: '001',
    category: 'Visokogradnja',
    image: 'projekt-konstrukcija',
    alt: 'Armiranobetonska konstrukcija u izgradnji',
    gallery: [
      { image: 'projekt-konstrukcija', alt: 'Armiranobetonska konstrukcija u izgradnji' },
      { image: 'gradiliste-dizalice', alt: 'Gradilište s dizalicama odozgo' },
      { image: 'detalj-armatura-zid', alt: 'Armatura zida prije betoniranja' },
    ],
  },
  {
    code: '002',
    category: 'Stanogradnja',
    image: 'projekt-skela',
    alt: 'Stambena zgrada sa skelom',
    gallery: [
      { image: 'projekt-skela', alt: 'Stambena zgrada sa skelom' },
      { image: 'stambena-zgrada', alt: 'Završena stambena zgrada' },
      { image: 'detalj-beton', alt: 'Površina vidljivog betona' },
    ],
  },
  {
    code: '003',
    category: 'Niskogradnja',
    image: 'projekt-temelji',
    alt: 'Temelji i oplata na gradilištu',
    gallery: [
      { image: 'projekt-temelji', alt: 'Temelji i oplata na gradilištu' },
      { image: 'beton-ugradnja', alt: 'Ugradnja betona u temelj' },
      { image: 'detalj-armatura', alt: 'Rebrasta armatura' },
    ],
  },
  {
    code: '004',
    category: 'Infrastruktura',
    image: 'projekt-cesta',
    alt: 'Asfaltiranje ceste',
    gallery: [
      { image: 'projekt-cesta', alt: 'Asfaltiranje ceste' },
      { image: 'mehanizacija-bager', alt: 'Bager na gradilištu' },
      { image: 'agregat-deponija', alt: 'Deponija agregata' },
    ],
  },
  {
    code: '005',
    category: 'Visokogradnja',
    image: 'projekt-okvir',
    alt: 'Betonski okvir višekatnice',
    gallery: [
      { image: 'projekt-okvir', alt: 'Betonski okvir višekatnice' },
      { image: 'gradiliste-tlocrt', alt: 'Gradilište iz zraka' },
      { image: 'detalj-armatura-zid', alt: 'Armatura zida' },
    ],
  },
]

export const process = [
  {
    no: '01',
    title: 'Kamenolom',
    text: 'Sve počinje u kamenolomu Bučići. Dolomit koji ondje vadimo prvi je materijal u lancu i temelj svega što gradimo.',
    image: 'kamenolom-drobilica',
  },
  {
    no: '02',
    title: 'Agregati',
    text: 'Drobljenjem i separacijom kamen postaje agregat svih granulacija, za beton, podloge, nasipe i tržište.',
    image: 'agregat-drobilica',
  },
  {
    no: '03',
    title: 'Beton',
    text: 'U vlastitoj betonari agregat postaje svježi beton. Recepturu, mješavinu i isporuku držimo u svojim rukama.',
    image: 'betonara',
  },
  {
    no: '04',
    title: 'Gradnja',
    text: 'Naši ljudi i naša mehanizacija ugrađuju taj materijal na gradilištu, od temeljne ploče do krova.',
    image: 'gradiliste-tlocrt',
  },
  {
    no: '05',
    title: 'Zgrada',
    text: 'Završen objekt izgrađen materijalom čije porijeklo poznajemo. Jedan lanac i jedna odgovornost.',
    image: 'stambena-fasada',
  },
]
