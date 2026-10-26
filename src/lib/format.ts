// Formatiranje po hrvatskom standardu (hr-HR): 1.842 · 12,4 % · 1.250,00 € · 26. 10. 2026.
const NBSP = ' ';

export function formatBroj(v: number | null | undefined, decimale = 0): string {
  if (v == null || Number.isNaN(v)) return '—';
  return new Intl.NumberFormat('hr-HR', { minimumFractionDigits: decimale, maximumFractionDigits: decimale }).format(v);
}

/** Vrijednost kao udio (0,124) ili kao postotak (12,4) — zadano udio. */
export function formatPostotak(v: number | null | undefined, decimale = 1, { udio = true } = {}): string {
  if (v == null || Number.isNaN(v)) return '—';
  return `${formatBroj(udio ? v * 100 : v, decimale)}${NBSP}%`;
}

export function formatEUR(v: number | null | undefined, decimale = 2): string {
  if (v == null || Number.isNaN(v)) return '—';
  return `${formatBroj(v, decimale)}${NBSP}€`;
}

/** Skraćeno za velike iznose: 1,25 mil. EUR · 850 tis. EUR */
export function formatEURKratko(v: number | null | undefined): string {
  if (v == null || Number.isNaN(v)) return '—';
  const a = Math.abs(v);
  if (a >= 1e9) return `${formatBroj(v / 1e9, 2)}${NBSP}mlrd. EUR`;
  if (a >= 1e6) return `${formatBroj(v / 1e6, 2)}${NBSP}mil. EUR`;
  if (a >= 1e4) return `${formatBroj(v / 1e3, 0)}${NBSP}tis. EUR`;
  return formatEUR(v, 0);
}

/** 26. 10. 2026. (s razmacima, točka na kraju) */
export function formatDatum(d: Date | string | null | undefined): string {
  if (!d) return '—';
  const x = typeof d === 'string' ? new Date(d) : d;
  if (Number.isNaN(x.getTime())) return '—';
  return `${x.getDate()}.${NBSP}${x.getMonth() + 1}.${NBSP}${x.getFullYear()}.`;
}

/** Promjena u postotnim bodovima: +1,8 p.b. / −1,8 p.b. */
export function formatPromjenaPB(v: number | null | undefined, decimale = 1): string {
  if (v == null || Number.isNaN(v)) return '—';
  const z = v > 0 ? '+' : v < 0 ? '−' : '±';
  return `${z}${formatBroj(Math.abs(v), decimale)}${NBSP}p.b.`;
}

/** Relativna promjena: +3,1 % / −3,1 % (ulaz kao udio: 0,031) */
export function formatPromjenaPosto(v: number | null | undefined, decimale = 1): string {
  if (v == null || Number.isNaN(v)) return '—';
  const z = v > 0 ? '+' : v < 0 ? '−' : '±';
  return `${z}${formatBroj(Math.abs(v) * 100, decimale)}${NBSP}%`;
}
