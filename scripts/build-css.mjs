// dist/styles.css = tokens.css + components.css (jedna datoteka za uvoz u aplikaciju).
import { readFileSync, writeFileSync } from 'node:fs';
const r = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
writeFileSync(new URL('../dist/styles.css', import.meta.url), r('../dist/tokens.css') + '\n' + r('../src/styles/components.css'));
console.log('dist/styles.css');
