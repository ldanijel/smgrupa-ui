// Boje za grafikone (Recharts, Chart.js, ECharts…) — vrijednosti kao CSS varijable, pa prate temu.
// Pravilo: akcent (data-*) i semafor ne idu u isti grafikon.
export const chartColors = {
  /** Kategorijski grafikon bez stanja: SMG petrolej-plava u svim temama, zatim svjetlija i siva. Nikad crvena akcenta društva. */
  serije: ['var(--data-1)', 'var(--data-2)', 'var(--data-3)'],
  semafor: {
    A: 'var(--semafor-zelena)', B: 'var(--semafor-plava)', C: 'var(--semafor-zuta)', D: 'var(--semafor-crvena)', np: 'var(--semafor-neutralna)',
  },
  /** Sporedni niz (benchmark, prethodno razdoblje) uz primarni semafor. */
  semaforBlijeda: {
    A: 'var(--semafor-zelena-blijeda)', B: 'var(--semafor-plava-blijeda)', C: 'var(--semafor-zuta-blijeda)', D: 'var(--semafor-crvena-blijeda)', np: 'var(--semafor-neutralna-blijeda)',
  },
  os: 'var(--muted)',
  mreza: 'var(--border-soft)',
  tekst: 'var(--ink-soft)',
} as const;

/** Neke knjižnice (npr. canvas grafikoni) ne razumiju var(--…): pročitaj stvarnu vrijednost s elementa. */
export function resolveColor(cssVar: string, el: Element = document.documentElement): string {
  const m = cssVar.match(/^var\((--[^)]+)\)$/);
  return m ? getComputedStyle(el).getPropertyValue(m[1]).trim() : cssVar;
}
