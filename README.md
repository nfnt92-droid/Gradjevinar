# Građevinar d.o.o. Novi Travnik: prijedlog nove web stranice

React + TypeScript + Tailwind CSS + Framer Motion (Vite). Bez backenda.

## Pokretanje

```bash
npm install
npm run dev       # lokalni razvoj
npm run build     # produkcijski build u /dist
```

## Objava na Netlify

Povežite repozitorij s Netlifyjem ili povucite mapu `dist` na app.netlify.com/drop.
Postavke su već u `netlify.toml` (build: `npm run build`, publish: `dist`).

## Struktura

- `src/data/content.ts`: SAV tekst, kontakti, djelatnosti, vremenska crta, projekti i koraci procesa. Sadržaj se mijenja ovdje.
- `src/components/`: jedna komponenta po sekciji (Hero, Legacy, Divisions, Projects, MaterialStory, People, Housing, Contact).
- `public/img/`: fotografije u dvije veličine (`-1000.webp`, `-2000.webp`). Novu fotografiju dodajte u obje veličine pod istim imenom.

## Prije objave: popis za potvrdu

Podaci preuzeti sa stare stranice gradjevinarnt.com, označeni s `VERIFY` u `content.ts`:

- [ ] Godina osnivanja 1970. (hero, O nama, logo "od 1970.", schema.org)
- [ ] "Više od 100 djelatnika" (vremenska crta, Ljudi i oprema)
- [ ] Vremenska crta: Kamenolom Bučići i ISO SPAN prikazani su BEZ godine, s oznakom "u provjeri" (2020. i 2022. su samo datumi objava na staroj stranici). Kad uprava potvrdi godine, upisati ih u `timeline` u `content.ts` (polje `year`) i ukloniti `note`
- [ ] Adresa: Kralja Tvrtka 42, 72290 Novi Travnik
- [ ] Telefoni: Uredi +387 30 795 132, Betonara +387 30 795 138, Pješčara +387 30 790 027, Fax +387 30 795 135
- [ ] E-mail adresa (nije pronađena na staroj stranici, nije dodana)
- [ ] Tekst "Prodaja kupcima" za betonaru i agregate

## Tehnički crteži i detalji

- `src/components/drawings/Drawings.tsx`: ručno crtani SVG crteži (pročelje, tlocrt, detalj temelja, rešetka stupova) i omotač `DrawingLayer` (pointer-events isključen, aria-hidden, skriven ispod 1024 px). Crteži su ilustrativni, bez brojčanih kota, i ne prikazuju stvarne objekte.
- `src/components/details/`: `TechLabel` (oznake tipa "Detalj / 01", "Projekt / 001") i `Framed` (oznake reza u kutovima slike).
- Klasa `.paper-grain` u `index.css`: vrlo blaga zrnatost papira na svijetlim sekcijama.

## Fotografije

Sve trenutne fotografije su privremene (Pexels, besplatna licenca), tonski ujednačene,
i NE prikazuju Građevinarove objekte. Svaka nosi oznaku "Privremena fotografija".
Zamijeniti stvarnim fotografijama kamenoloma Bučići, betonare, pješčare, gradilišta, ljudi i stambenih zgrada.
Nakon zamjene uklonite oznaku: `tag={false}` na komponenti `Photo` i rečenicu u podnožju (`Footer.tsx`).

## Projekti

Sekcija "Odabrani projekti" ima 5 označenih polja (A–E) bez izmišljenih podataka.
Za svaki projekt treba: naziv, lokacija, kategorija, godina, kratak opis, 1–3 fotografije.

## Kontakt obrazac

Obrazac je vizualno dovršen, ali NE šalje poruke: korisniku jasno javlja da slanje nije uključeno i nudi telefon.
Za uključivanje s Netlify Forms: dodajte `name="kontakt" data-netlify="true"` na `<form>` u `Contact.tsx`,
skriveno polje `form-name`, i u `onSubmit` pošaljite `fetch('/', { method: 'POST', body: new URLSearchParams(new FormData(form)) })`.
