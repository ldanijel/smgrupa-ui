// Provjera kontrasta (WCAG 2) za sve parove iz tokens/contrast-pairs.json u svim temama.
// Pokretanje: npm run check:contrast   — izlaz 1 ako ijedan par padne.
import { readFileSync } from 'node:fs';
const T = JSON.parse(readFileSync(new URL('../tokens/tokens.json', import.meta.url), 'utf8'));
const { pairs } = JSON.parse(readFileSync(new URL('../tokens/contrast-pairs.json', import.meta.url), 'utf8'));
const themes = T.color.themes.map((t) => t.id);
const byName = Object.fromEntries(T.color.tokens.map((t) => [t.name, t]));
function resolve(name, theme, depth = 0) {
  const tok = byName[name];
  if (!tok || depth > 16) throw new Error(`Nepoznat ili cikličan token: ${name}`);
  const v = typeof tok.value === 'string' ? tok.value : tok.value[theme] ?? tok.value[themes[0]];
  return /^\{.+\}$/.test(v) ? resolve(v.slice(1, -1), theme, depth + 1) : v;
}
function lum(hex) {
  const m = hex.match(/^#([0-9a-f]{6})$/i);
  if (!m) throw new Error(`Provjera podržava samo #rrggbb: ${hex}`);
  const c = [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16) / 255).map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
let fails = 0;
for (const theme of themes)
  for (const [fg, bg, min] of pairs) {
    const r = ratio(resolve(fg, theme), resolve(bg, theme));
    if (r < min) { fails++; console.log(`✗ [${theme}] ${fg} na ${bg}: ${r.toFixed(2)}:1 (minimum ${min}:1)`); }
  }
console.log(fails ? `${fails} parova ispod praga.` : `✓ Svi parovi prolaze u ${themes.length} tema (${pairs.length} parova po temi).`);
process.exit(fails ? 1 : 0);
