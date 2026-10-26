# CLAUDE.md — aplikacija SMGrupe

Interna aplikacija SMGrupe. Sučelje se gradi isključivo sa **SMGrupa UI** (`@smgrupa/ui`, repo `ldanijel/smgrupa-ui`).

- Prije rada na sučelju učitaj skill `smgrupa-ui` (`.claude/skills/smgrupa-ui/SKILL.md`) i drži se njegovih pravila.
- Stack: Vite + React + TypeScript. Stilovi: `@smgrupa/ui/styles.css` (uvezeno u `src/main.tsx`); Tailwind je opcionalan i tada samo s `@smgrupa/ui/tailwind.css`.
- Tema aplikacije: `<ThemeProvider theme="…">` u `src/App.tsx`.
- Jezik sučelja: hrvatski. Brojevi, valute i datumi samo kroz formatere iz `@smgrupa/ui`.
- Nikad ručne boje ni vlastiti CSS koji zamjenjuje komponente sustava.
- Podaci zaposlenika su osobni podaci (GDPR): ne logiraj ih u konzolu, ne šalji trećim servisima, ne commitaj stvarne podatke u repozitorij (samo ilustrativne u `src/data/`).
- Provjera prije predaje: `npm run build` bez grešaka.
