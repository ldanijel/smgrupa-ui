---
name: smgrupa-ui
description: Izrada sučelja internih aplikacija SMGrupe (HR alati, dashboardi) sa SMGrupa UI design systemom — koje komponente, tokeni, teme i pravila koristiti. Učitaj prije svakog rada na ekranima, komponentama, stilovima, tablicama, grafikonima ili formatiranju brojeva u aplikaciji koja koristi @smgrupa/ui.
---

# SMGrupa UI — kako graditi sučelje

Aplikacija koristi `@smgrupa/ui` (repo `ldanijel/smgrupa-ui`). Vizualni jezik: grafit `ink` na bijelom, Inter, ravne plohe, pill gumbi, **jedan akcent** (petrolej-plava SMGrupe ili boja društva — bira se temom).

## Prije pisanja koda

1. Postoji li komponenta? Uvijek prvo `@smgrupa/ui`: `AppShell`, `NavItem`, `NavSection`, `PageHeader`, `Button`, `Field` + `Input` / `Select` / `Textarea` / `Checkbox`, `Toolbar`, `Card`, `KpiGrid` + `KpiCard`, `DataTable`, `SemaforBadge`, `Alert`, `Tag`, `CompanyTag`, `Tabs`, `EmptyState`, `Icon`.
2. Tipovi i propsi: `node_modules/@smgrupa/ui/src/index.ts` i datoteke u `src/components/`.
3. Tokeni (nazivi i namjena): `node_modules/@smgrupa/ui/tokens/tokens.json` — svaki token ima `usage`.

## Pravila (obvezna)

- **Nikad ručne boje** (hex, rgb, Tailwind paleta poput `red-500`). Samo `var(--token)` ili Tailwind klase iz `@smgrupa/ui/tailwind.css` (`bg-surface-alt`, `text-ink-soft`, `border-border` …).
- **Tema** se postavlja jednom: `<ThemeProvider theme="smg">` u `App`. Teme: `smg`, `msan`, `king`, `abysalto`, `aig`, `ekupi`. Tema mijenja samo akcent; ne piši uvjetni CSS po društvu.
- **Akcent** (`--akcent`, `--akcent-tekst`) samo za kromu: gumbi, aktivna navigacija, linije, kartice. **Nikad u podacima** (brojke, stupci grafikona) — tri društva imaju crveni akcent koji bi se čitao kao „loše”.
- **Semafor** je za ocjene i stanja u podacima: ljestvica A–D = `SemaforBadge kategorija` (zeleno–plavo–žuto–crveno); tri stanja = `SemaforBadge stanje` (dobro/oprez/loše, bez plave). Ista kategorija na dvije razine (npr. ocjena voditelja uz objektivnu): `razina="prigusena"` za usporednu razinu — nikad druga boja. Boja nikad bez slova ili riječi.
- **Statusne poruke** sučelja (spremljeno, greška, upozorenje) = `Alert`, nikad semafor oznaka.
- **Grafikoni**: boje iz `chartColors` (`serije` za podatke bez stanja, `semafor` za ocjene). Akcent i semafor ne u istom grafikonu. Knjižnice koje ne čitaju CSS varijable: `resolveColor()`.
- **Brojevi i datumi** samo kroz `formatBroj`, `formatPostotak`, `formatEUR`, `formatEURKratko`, `formatDatum`, `formatPromjenaPB`, `formatPromjenaPosto` (hr-HR: `1.842`, `12,4 %`, `26. 10. 2026.`). Brojčani stupci tablice: `align: 'right'`.
- **KPI**: `ocjena` određuje boju promjene (`bolje`/`losije`/`neutralno`), ne predznak — pad fluktuacije je „bolje”. Najviše jedna `istaknuto` kartica po retku.
- **Tekst sučelja** na hrvatskom, rečenični stil; gumbi glagolom (2–3 riječi); naslov stranice je zaključak ili jasna tema; svaka tablica/grafikon ima izvor i datum (`source` / `footer`).
- **Jedan primarni gumb** po ekranu. Ostalo `secondary` ili `ghost`; brisanje `danger`.
- **Pristupačnost**: svako polje u `Field` (oznaka + greška), ikonični gumbi s `aria-label`, ne uklanjaj fokus prsten.
- **Bez**: sjena na karticama, zaobljenih ploha (zaobljeni su samo gumbi i oznake), gradijenata, emojija, druge akcentne boje.

## Nova komponenta

Ako `@smgrupa/ui` nema što trebaš: napravi je u aplikaciji (`src/components/`) samo od tokena i postojećih klasa, a ako će trebati i drugima — predloži je za `smgrupa-ui` (vlasnik: Danijel).

## Tamna tema

Još ne postoji. Ne piši vlastite tamne stilove; korištenje isključivo semantičkih tokena (`surface`, `ink`, `border` …) jamči da će tamna tema raditi kad se doda.
