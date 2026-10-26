import { useMemo, useState, type ReactNode } from 'react';
import { Icon } from './Icon';

/* ---------------- Card ---------------- */
export interface CardProps { title?: string; subtitle?: ReactNode; actions?: ReactNode; footer?: ReactNode; children: ReactNode }

/** Ravna kartica s 1px rubom, bez sjene. Footer za izvor i datum podataka. */
export function Card({ title, subtitle, actions, footer, children }: CardProps) {
  return (
    <section className="smg-card">
      {(title || actions) && (
        <div className="smg-card__head">
          <div>
            {title && <h2 className="smg-card__title">{title}</h2>}
            {subtitle && <p className="smg-card__sub">{subtitle}</p>}
          </div>
          {actions}
        </div>
      )}
      <div className="smg-card__body">{children}</div>
      {footer && <div className="smg-card__foot">{footer}</div>}
    </section>
  );
}

/* ---------------- KPI ---------------- */
export interface KpiCardProps {
  label: string;
  /** Već formatirana vrijednost (formatBroj, formatPostotak…). */
  value: string;
  /** Promjena, već formatirana: „−1,8 p.b.” */
  delta?: string;
  /** Je li promjena dobra. Smjer brojke ne određuje boju — pad fluktuacije je dobar. */
  ocjena?: 'bolje' | 'losije' | 'neutralno';
  note?: ReactNode;
  /** Najviše jedna istaknuta kartica po retku (podloga akcent-tint; brojka ostaje ink). */
  istaknuto?: boolean;
}

export function KpiCard({ label, value, delta, ocjena = 'neutralno', note, istaknuto }: KpiCardProps) {
  const rijec = ocjena === 'bolje' ? 'bolje' : ocjena === 'losije' ? 'lošije' : null;
  return (
    <div className={`smg-kpi ${istaknuto ? 'smg-kpi--istaknuto' : ''}`.trim()}>
      <p className="smg-kpi__label">{label}</p>
      <p className="smg-kpi__value">{value}</p>
      {(delta || note) && (
        <div className="smg-kpi__meta">
          {delta && <span className={`smg-delta smg-delta--${ocjena}`}>{delta}{rijec && ` — ${rijec}`}</span>}
          {note && <span className="smg-kpi__note">{note}</span>}
        </div>
      )}
    </div>
  );
}

export function KpiGrid({ children }: { children: ReactNode }) {
  return <div className="smg-kpi-grid">{children}</div>;
}

/* ---------------- Semafor ---------------- */
export type Kategorija = 'A' | 'B' | 'C' | 'D' | null | undefined;
export type Stanje3 = 'dobro' | 'oprez' | 'lose';

const bojaKategorije = { A: 'zelena', B: 'plava', C: 'zuta', D: 'crvena' } as const;
const bojaStanja = { dobro: 'zelena', oprez: 'zuta', lose: 'crvena' } as const;
const tekstStanja = { dobro: 'Dobro', oprez: 'Oprez', lose: 'Loše' } as const;

export interface SemaforProps {
  /** Ljestvica A–D (zeleno — plavo — žuto — crveno). null = n.p. */
  kategorija?: Kategorija;
  /** Tri kategorije (zeleno — žuto — crveno, bez plave). Koristi ili kategorija ili stanje. */
  stanje?: Stanje3;
  /** puna = razina koja nosi odluku; prigusena = usporedna razina iste kategorije. */
  razina?: 'puna' | 'prigusena';
  /** ispuna (zadano) ili tekst na blagoj podlozi (gusti retci tablice). */
  varijanta?: 'ispuna' | 'tekst';
  size?: 'md' | 'lg';
  /** Prilagođena oznaka; zadano slovo ili riječ. Boja nikad ne stoji bez oznake. */
  children?: ReactNode;
}

export function SemaforBadge({ kategorija, stanje, razina = 'puna', varijanta = 'ispuna', size = 'md', children }: SemaforProps) {
  const boja = stanje ? bojaStanja[stanje] : kategorija ? bojaKategorije[kategorija] : 'neutralna';
  const oznaka = children ?? (stanje ? tekstStanja[stanje] : kategorija ?? 'n.p.');
  const cls = ['smg-sem', `smg-sem--${boja}`, razina === 'prigusena' && 'smg-sem--prigusena', varijanta === 'tekst' && 'smg-sem--tekst', size === 'lg' && 'smg-sem--lg'].filter(Boolean).join(' ');
  const opis = stanje ? `Stanje: ${tekstStanja[stanje]}` : `Kategorija ${kategorija ?? 'nije primjenjivo'}${razina === 'prigusena' ? ' (usporedna razina)' : ''}`;
  return <span className={cls} title={opis}>{oznaka}</span>;
}

/* ---------------- Alert ---------------- */
export interface AlertProps { tip?: 'info' | 'uspjeh' | 'upozorenje' | 'greska'; title: string; children?: ReactNode }

/** Statusna poruka sučelja (ikona + rečenica). Nije semafor: ne koristi se za ocjene A–D. */
export function Alert({ tip = 'info', title, children }: AlertProps) {
  return (
    <div className={`smg-alert smg-alert--${tip}`} role={tip === 'greska' ? 'alert' : 'status'}>
      <Icon name={tip} className="smg-alert__icon" />
      <div>
        <p className="smg-alert__title">{title}</p>
        {children && <p className="smg-alert__body">{children}</p>}
      </div>
    </div>
  );
}

/* ---------------- Tag, CompanyTag ---------------- */
export function Tag({ children, variant = 'neutral' }: { children: ReactNode; variant?: 'neutral' | 'akcent' | 'outline' }) {
  return <span className={`smg-tag ${variant !== 'neutral' ? `smg-tag--${variant}` : ''}`.trim()}>{children}</span>;
}

export type Drustvo = 'msan' | 'king' | 'abysalto' | 'aig' | 'ekupi';
export const DRUSTVA: Record<Drustvo, string> = { msan: 'M SAN Grupa', king: 'KING ICT', abysalto: 'Abysalto', aig: 'Agro Invest grupa', ekupi: 'eKupi' };

/** Naziv društva s točkom u boji društva — za grupne preglede (tema SMGrupa). Uvijek s nazivom. */
export function CompanyTag({ drustvo, label }: { drustvo: Drustvo; label?: string }) {
  return (
    <span className="smg-company">
      <span className="smg-company__dot" style={{ background: `var(--tvrtka-${drustvo})` }} aria-hidden="true" />
      {label ?? DRUSTVA[drustvo]}
    </span>
  );
}

/* ---------------- Tabs ---------------- */
export interface TabsProps { tabs: { id: string; label: string }[]; value: string; onChange: (id: string) => void; label?: string }

export function Tabs({ tabs, value, onChange, label = 'Prikaz' }: TabsProps) {
  return (
    <div className="smg-tabs" role="tablist" aria-label={label}>
      {tabs.map((t) => (
        <button key={t.id} type="button" role="tab" className="smg-tab" aria-selected={t.id === value} tabIndex={t.id === value ? 0 : -1} onClick={() => onChange(t.id)}
          onKeyDown={(e: { key: string }) => {
            const i = tabs.findIndex((x) => x.id === value);
            if (e.key === 'ArrowRight') onChange(tabs[(i + 1) % tabs.length].id);
            if (e.key === 'ArrowLeft') onChange(tabs[(i - 1 + tabs.length) % tabs.length].id);
          }}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ---------------- EmptyState ---------------- */
export function EmptyState({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="smg-empty">
      <p className="smg-empty__title">{title}</p>
      {children && <p style={{ margin: 0 }}>{children}</p>}
      {action && <div style={{ marginTop: 16 }}>{action}</div>}
    </div>
  );
}

/* ---------------- DataTable ---------------- */
export interface Column<T> {
  key: string;
  header: string;
  /** Prikaz ćelije; zadano String(row[key]). */
  render?: (row: T) => ReactNode;
  /** Vrijednost za sortiranje; zadano row[key]. */
  sortValue?: (row: T) => string | number | null | undefined;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
  width?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  caption?: string;
  compact?: boolean;
  empty?: ReactNode;
  onRowClick?: (row: T) => void;
  selectedKey?: string;
  /** Izvor i datum podataka ispod tablice. */
  source?: ReactNode;
}

const collator = new Intl.Collator('hr', { numeric: true, sensitivity: 'base' });

/** Tablica za izvještaje: brojke desno (align: 'right'), sortiranje po klikom na zaglavlje, izvor ispod. */
export function DataTable<T>({ columns, rows, rowKey, caption, compact, empty, onRowClick, selectedKey, source }: DataTableProps<T>) {
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 } | null>(null);
  const sorted = useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return rows;
    const get = col.sortValue ?? ((r: T) => (r as Record<string, unknown>)[col.key] as string | number | null | undefined);
    return [...rows].sort((a, b) => {
      const x = get(a), y = get(b);
      if (x == null && y == null) return 0;
      if (x == null) return 1;
      if (y == null) return -1;
      return (typeof x === 'number' && typeof y === 'number' ? x - y : collator.compare(String(x), String(y))) * sort.dir;
    });
  }, [rows, columns, sort]);
  const alignCls = (a?: string) => (a === 'right' ? 'smg-num' : a === 'center' ? 'smg-center' : undefined);
  return (
    <div>
      <div className="smg-table-wrap">
        <table className={`smg-table ${compact ? 'smg-table--compact' : ''}`.trim()}>
          {caption && <caption className="smg-visually-hidden">{caption}</caption>}
          <thead>
            <tr>
              {columns.map((c) => {
                const active = sort?.key === c.key;
                const ariaSort = active ? (sort!.dir === 1 ? 'ascending' : 'descending') : undefined;
                return (
                  <th key={c.key} className={alignCls(c.align)} style={c.width ? { width: c.width } : undefined} aria-sort={ariaSort} scope="col">
                    {c.sortable ? (
                      <button type="button" onClick={() => setSort(active && sort!.dir === -1 ? null : { key: c.key, dir: active ? -1 : 1 })}>
                        {c.header}
                        <Icon name={active ? (sort!.dir === 1 ? 'gore' : 'dolje') : 'sort'} size={14} />
                      </button>
                    ) : c.header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr><td colSpan={columns.length} className="smg-table__empty">{empty ?? 'Nema podataka za odabrane filtre.'}</td></tr>
            ) : sorted.map((r) => {
              const k = rowKey(r);
              return (
                <tr key={k} aria-selected={selectedKey === k || undefined} onClick={onRowClick ? () => onRowClick(r) : undefined} style={onRowClick ? { cursor: 'pointer' } : undefined}>
                  {columns.map((c) => (
                    <td key={c.key} className={alignCls(c.align)}>
                      {c.render ? c.render(r) : String((r as Record<string, unknown>)[c.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {source && <p className="smg-source">{source}</p>}
    </div>
  );
}
