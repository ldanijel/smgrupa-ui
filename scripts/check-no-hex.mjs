// Pravilo sustava: komponente i stilovi koriste samo tokene (var(--…)), nikad ručne boje.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
const roots = process.argv.slice(2).length ? process.argv.slice(2) : ['src/components', 'src/styles'];
const re = /#[0-9a-fA-F]{3,8}\b|rgba?\(\s*\d/g;
let bad = 0;
function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (!/\.(tsx?|css)$/.test(p)) continue;
    readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
      if (/^\s*(\/\/|\/\*|\*)/.test(line)) return;
      const m = line.match(re);
      if (m) { bad++; console.log(`✗ ${p}:${i + 1}  ${m.join(', ')}  → koristi token`); }
    });
  }
}
roots.forEach(walk);
console.log(bad ? `${bad} ručnih boja.` : '✓ Nema ručnih boja — samo tokeni.');
process.exit(bad ? 1 : 0);
