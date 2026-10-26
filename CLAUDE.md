# CLAUDE.md — repozitorij SMGrupa UI

Ovo je **izvor istine** grupacijskog design systema SMGrupe za interne aplikacije (HR alati, dashboardi). Vlasnik: Danijel (ldanijel).

## Struktura
- `tokens/tokens.json` — JEDINI izvor tokena (boje × 6 tema, tipografija, razmaci, sjene, z-index, veličine). Svaki token ima `usage`.
- `tokens/contrast-pairs.json` — parovi koji moraju proći kontrast u svim temama.
- `src/components/*.tsx` — React komponente; `src/styles/components.css` — njihovi stilovi (klase `smg-*`).
- `src/lib/` — formateri (hr-HR), boje grafikona, generirani tipovi tema.
- `dist/` — GENERIRANO (`npm run build`) i commitano, da aplikacije mogu instalirati paket iz gita bez builda. Ne uređivati ručno.
- `template/` — predložak nove aplikacije (Vite + React) s `CLAUDE.md` i skillom.
- `.claude/skills/smgrupa-ui/SKILL.md` — pravila za Claude Code u aplikacijama (kopija u `template/`). `CLAUDE.app.md` — CLAUDE.md za aplikacije.

## Pravila za izmjene
1. Promjena boje, veličine ili teme = izmjena `tokens/tokens.json`, nikad generiranih datoteka.
2. Komponente i CSS koriste samo `var(--token)` — `npm run check` to provjerava (kontrast + bez ručnih boja).
3. Nakon izmjene: `npm run build && npm run check`; oba moraju proći. Commitaj i `dist/`.
4. Kad se mijenja SKILL.md, kopiraj ga i u `template/.claude/skills/smgrupa-ui/`.
5. Verzije: semver u `package.json` + git tag `vX.Y.Z` + zapis u `CHANGELOG.md`. Aplikacije pinaju tag.
6. Semantika boja: akcent društva samo za kromu (gumbi, navigacija, linije); podaci = semafor ili `data-*` (SMG petrolej-plava). Semafor A–D: zeleno–plavo–žuto–crveno; 3 stanja bez plave; druga razina iste kategorije = `-prigusena`.
7. Tamna tema: planirana kao druga os (`data-mode="dark"`) koja mijenja samo neutralne i status tokene — zato komponente ne smiju koristiti brend ni `tvrtka-*` tokene za plohe i tekst.
8. Jezik koda: nazivi komponenti engleski (React konvencija), propsi i tekstovi sučelja hrvatski gdje su domenski (`kategorija`, `razina`, `ocjena`).

## Veza s Claude Design System artefaktom
Artefakt „SMGrupa” na claude.ai (Design System) sadrži iste tokene za dokumente i prezentacije. Ovaj repo je izvor za aplikacije; nakon većih izmjena tokena uskladi artefakt (ili ga objavi iz repoa s `/design-sync` u Claude Codeu).
