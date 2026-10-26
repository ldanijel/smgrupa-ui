// Generira dist/tokens.css, dist/tailwind.css i src/lib/tokens.generated.ts iz tokens/tokens.json.
// Pokretanje: npm run build:tokens   (bez vanjskih paketa)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const T = JSON.parse(readFileSync(new URL('../tokens/tokens.json', import.meta.url), 'utf8'));
const themes = T.color.themes.map((t) => t.id);
const first = themes[0];
const isAlias = (v) => typeof v === 'string' && /^\{[^}]+\}$/.test(v);
const css = (v) => (isAlias(v) ? `var(--${v.slice(1, -1)})` : v);
const valueFor = (tok, id) => (typeof tok.value === 'string' ? tok.value : tok.value[id] ?? tok.value[first]);
const head = `/* SMGrupa UI — generirano iz tokens/tokens.json. Ne uređivati ručno. */\n`;

let out = head;
// 1) Boje: prva tema na :root, ostale teme samo s razlikama (+ ponovno deklarirani aliasi, da se razriješe unutar teme)
out += `:root,\n[data-theme="${first}"] {\n`;
for (const tok of T.color.tokens) out += `  --${tok.name}: ${css(valueFor(tok, first))};\n`;
for (const tok of T.shadow?.tokens ?? []) out += `  --${tok.name}: ${tok.value};\n`;
out += `}\n`;
for (const id of themes.slice(1)) {
  out += `[data-theme="${id}"] {\n`;
  for (const tok of T.color.tokens) {
    const v = valueFor(tok, id);
    const differs = typeof tok.value !== 'string' && v !== valueFor(tok, first);
    if (differs || isAlias(v)) out += `  --${tok.name}: ${css(v)};\n`;
  }
  out += `}\n`;
}
// 2) Ne-boje
out += `:root {\n`;
for (const fam of ['spacing', 'radius', 'layout', 'size', 'zIndex']) for (const tok of T[fam]?.tokens ?? []) out += `  --${tok.name}: ${tok.value};\n`;
for (const [k, v] of Object.entries(T.type.families)) out += `  --font-${k}: ${v};\n`;
out += `}\n`;
// 3) Tipografske klase
for (const g of T.type.groups)
  for (const s of g.styles) {
    out += `.smg-type-${s.name} { font-family: var(--font-${s.family ?? g.family}); font-size: ${s.fontSize}; line-height: ${s.lineHeight}; font-weight: ${s.fontWeight};`;
    if (s.letterSpacing) out += ` letter-spacing: ${s.letterSpacing};`;
    out += ` }\n`;
  }
mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });
writeFileSync(new URL('../dist/tokens.css', import.meta.url), out);

// Tailwind v4 (opcionalno za aplikacije): mapira tokene u utility klase (bg-akcent, text-ink, p-16 …)
let tw = head + `@theme inline {\n`;
for (const tok of T.color.tokens) tw += `  --color-${tok.name}: var(--${tok.name});\n`;
for (const tok of T.spacing.tokens) tw += `  --spacing-${tok.name.replace('space-', '')}: var(--${tok.name});\n`;
for (const tok of T.radius.tokens) tw += `  --radius-${tok.name.replace('radius-', '')}: var(--${tok.name});\n`;
for (const tok of T.shadow?.tokens ?? []) tw += `  --shadow-${tok.name.replace('shadow-', '')}: var(--${tok.name});\n`;
tw += `  --font-sans: var(--font-sans);\n}\n`;
writeFileSync(new URL('../dist/tailwind.css', import.meta.url), tw);

// TS: nazivi tema i tokena (za ThemeProvider i grafikone)
const ts = `// Generirano iz tokens/tokens.json. Ne uređivati ručno.\n` +
  `export const THEMES = ${JSON.stringify(T.color.themes, null, 2)} as const;\n` +
  `export type ThemeId = (typeof THEMES)[number]['id'];\n` +
  `export const COLOR_TOKENS = ${JSON.stringify(T.color.tokens.map((t) => t.name))} as const;\n` +
  `export type ColorToken = (typeof COLOR_TOKENS)[number];\n`;
writeFileSync(new URL('../src/lib/tokens.generated.ts', import.meta.url), ts);
console.log(`tokens.css: ${T.color.tokens.length} boja × ${themes.length} tema`);
