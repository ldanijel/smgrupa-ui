// Generirano iz tokens/tokens.json. Ne uređivati ručno.
export const THEMES = [
  {
    "id": "smg",
    "name": "SMGrupa"
  },
  {
    "id": "msan",
    "name": "M SAN Grupa"
  },
  {
    "id": "king",
    "name": "KING ICT"
  },
  {
    "id": "abysalto",
    "name": "Abysalto"
  },
  {
    "id": "aig",
    "name": "Agro Invest grupa"
  },
  {
    "id": "ekupi",
    "name": "eKupi"
  }
] as const;
export type ThemeId = (typeof THEMES)[number]['id'];
export const COLOR_TOKENS = ["akcent","akcent-tekst","on-akcent-tekst","akcent-tint","smg","smg-duboka","smg-linija","smg-tint","tvrtka-msan","tvrtka-king","tvrtka-abysalto","tvrtka-aig","tvrtka-aig-zlatna","tvrtka-ekupi","ink","ink-soft","muted","surface","surface-alt","surface-inverse","on-inverse","on-inverse-muted","border","border-soft","semafor-zelena","semafor-zelena-tekst","semafor-zelena-podloga","semafor-zelena-blijeda","semafor-zelena-prigusena","semafor-plava","semafor-plava-tekst","semafor-plava-podloga","semafor-plava-blijeda","semafor-plava-prigusena","semafor-zuta","semafor-zuta-tekst","semafor-zuta-podloga","semafor-zuta-blijeda","semafor-zuta-prigusena","semafor-crvena","semafor-crvena-tekst","semafor-crvena-podloga","semafor-crvena-blijeda","semafor-crvena-prigusena","semafor-neutralna","semafor-neutralna-tekst","semafor-neutralna-podloga","semafor-neutralna-blijeda","data-1","data-2","data-3","focus","akcent-hover","surface-hover","surface-selected","border-control","ink-disabled","surface-disabled","scrim","status-info-tekst","status-info-podloga","status-info-rub","status-uspjeh-tekst","status-uspjeh-podloga","status-uspjeh-rub","status-upozorenje-tekst","status-upozorenje-podloga","status-upozorenje-rub","status-greska-tekst","status-greska-podloga","status-greska-rub"] as const;
export type ColorToken = (typeof COLOR_TOKENS)[number];
