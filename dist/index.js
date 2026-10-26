// src/components/ThemeProvider.tsx
import { createContext, useContext, useEffect } from "react";
import { jsx } from "react/jsx-runtime";
var ThemeCtx = createContext("smg");
function ThemeProvider({ theme = "smg", global = true, children }) {
  useEffect(() => {
    if (!global) return;
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    html.setAttribute("lang", html.getAttribute("lang") || "hr");
  }, [theme, global]);
  return /* @__PURE__ */ jsx(ThemeCtx.Provider, { value: theme, children: /* @__PURE__ */ jsx("div", { className: "smg-root", "data-theme": theme, children }) });
}
var useTheme = () => useContext(ThemeCtx);

// src/components/AppShell.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function AppShell({ appName, brand = "SMGrupa", nav, header, footer, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "smg-shell", children: [
    /* @__PURE__ */ jsxs("aside", { className: "smg-sidebar", "aria-label": "Glavni izbornik", children: [
      /* @__PURE__ */ jsxs("div", { className: "smg-sidebar__brand", children: [
        /* @__PURE__ */ jsx2("span", { className: "smg-sidebar__mark", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx2("div", { className: "smg-sidebar__name", children: brand }),
          /* @__PURE__ */ jsx2("div", { className: "smg-sidebar__app", children: appName })
        ] })
      ] }),
      /* @__PURE__ */ jsx2("nav", { className: "smg-sidebar__nav", children: nav }),
      footer && /* @__PURE__ */ jsx2("div", { className: "smg-sidebar__foot", children: footer })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "smg-main", children: [
      header && /* @__PURE__ */ jsx2("header", { className: "smg-header", children: header }),
      /* @__PURE__ */ jsx2("main", { className: "smg-content", children })
    ] })
  ] });
}
function NavSection({ children }) {
  return /* @__PURE__ */ jsx2("div", { className: "smg-sidebar__section", children });
}
function NavItem({ children, icon, active, href, onClick }) {
  const props = { className: "smg-nav-item", "aria-current": active ? "page" : void 0, onClick };
  return href ? /* @__PURE__ */ jsxs("a", { href, ...props, children: [
    icon,
    children
  ] }) : /* @__PURE__ */ jsxs("button", { type: "button", ...props, children: [
    icon,
    children
  ] });
}
function PageHeader({ title, eyebrow, description, actions }) {
  return /* @__PURE__ */ jsxs("div", { className: "smg-page-header", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      eyebrow && /* @__PURE__ */ jsx2("p", { className: "smg-page-header__eyebrow", children: eyebrow }),
      /* @__PURE__ */ jsx2("h1", { className: "smg-page-header__title", children: title }),
      description && /* @__PURE__ */ jsx2("p", { className: "smg-page-header__desc", children: description })
    ] }),
    actions && /* @__PURE__ */ jsx2("div", { className: "smg-page-header__actions", children: actions })
  ] });
}

// src/components/Button.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function Button({ variant = "primary", size = "md", loading, icon, children, className = "", disabled, type = "button", ...rest }) {
  const cls = ["smg-btn", `smg-btn--${variant}`, size === "sm" && "smg-btn--sm", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs2("button", { type, className: cls, disabled: disabled || loading, "aria-busy": loading || void 0, ...rest, children: [
    loading ? /* @__PURE__ */ jsx3("span", { className: "smg-btn__spinner", "aria-hidden": "true" }) : icon,
    children
  ] });
}

// src/components/Form.tsx
import { useId, cloneElement, isValidElement } from "react";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function Field({ label, hint, error, required, children }) {
  const id = useId();
  const descId = `${id}-opis`;
  const control = isValidElement(children) ? cloneElement(children, {
    id,
    required,
    "aria-invalid": error ? true : void 0,
    "aria-describedby": error || hint ? descId : void 0
  }) : children;
  return /* @__PURE__ */ jsxs3("div", { className: "smg-field", children: [
    /* @__PURE__ */ jsxs3("label", { className: "smg-field__label", htmlFor: id, children: [
      label,
      required && /* @__PURE__ */ jsx4("span", { className: "smg-field__req", "aria-hidden": "true", children: "*" })
    ] }),
    control,
    error ? /* @__PURE__ */ jsx4("span", { id: descId, className: "smg-field__error", children: error }) : hint ? /* @__PURE__ */ jsx4("span", { id: descId, className: "smg-field__hint", children: hint }) : null
  ] });
}
function Input({ size = "md", className = "", ...rest }) {
  return /* @__PURE__ */ jsx4("input", { className: `smg-input ${size === "sm" ? "smg-input--sm" : ""} ${className}`.trim(), ...rest });
}
function Select({ options, placeholder, size = "md", className = "", ...rest }) {
  return /* @__PURE__ */ jsxs3("select", { className: `smg-select ${size === "sm" ? "smg-select--sm" : ""} ${className}`.trim(), ...rest, children: [
    placeholder && /* @__PURE__ */ jsx4("option", { value: "", children: placeholder }),
    options.map((o) => /* @__PURE__ */ jsx4("option", { value: o.value, children: o.label }, o.value))
  ] });
}
function Textarea({ className = "", ...rest }) {
  return /* @__PURE__ */ jsx4("textarea", { className: `smg-textarea ${className}`.trim(), ...rest });
}
function Checkbox({ label, ...rest }) {
  return /* @__PURE__ */ jsxs3("label", { className: "smg-check", children: [
    /* @__PURE__ */ jsx4("input", { type: "checkbox", ...rest }),
    /* @__PURE__ */ jsx4("span", { children: label })
  ] });
}
function Toolbar({ children }) {
  return /* @__PURE__ */ jsx4("div", { className: "smg-toolbar", role: "group", "aria-label": "Filtri", children });
}

// src/components/Data.tsx
import { useMemo, useState } from "react";

// src/components/Icon.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var paths = {
  info: "M12 16v-5m0-3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  uspjeh: "m8 12.5 2.5 2.5L16 9.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  upozorenje: "M12 9v4m0 3h.01M10.3 3.9 2.4 17.5A2 2 0 0 0 4.1 20.5h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z",
  greska: "m15 9-6 6m0-6 6 6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  gore: "m6 15 6-6 6 6",
  dolje: "m6 9 6 6 6-6",
  sort: "m8 9 4-4 4 4m0 6-4 4-4-4"
};
function Icon({ name, size = 20, ...rest }) {
  return /* @__PURE__ */ jsx5("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", ...rest, children: /* @__PURE__ */ jsx5("path", { d: paths[name] }) });
}

// src/components/Data.tsx
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
function Card({ title, subtitle, actions, footer, children }) {
  return /* @__PURE__ */ jsxs4("section", { className: "smg-card", children: [
    (title || actions) && /* @__PURE__ */ jsxs4("div", { className: "smg-card__head", children: [
      /* @__PURE__ */ jsxs4("div", { children: [
        title && /* @__PURE__ */ jsx6("h2", { className: "smg-card__title", children: title }),
        subtitle && /* @__PURE__ */ jsx6("p", { className: "smg-card__sub", children: subtitle })
      ] }),
      actions
    ] }),
    /* @__PURE__ */ jsx6("div", { className: "smg-card__body", children }),
    footer && /* @__PURE__ */ jsx6("div", { className: "smg-card__foot", children: footer })
  ] });
}
function KpiCard({ label, value, delta, ocjena = "neutralno", note, istaknuto }) {
  const rijec = ocjena === "bolje" ? "bolje" : ocjena === "losije" ? "lo\u0161ije" : null;
  return /* @__PURE__ */ jsxs4("div", { className: `smg-kpi ${istaknuto ? "smg-kpi--istaknuto" : ""}`.trim(), children: [
    /* @__PURE__ */ jsx6("p", { className: "smg-kpi__label", children: label }),
    /* @__PURE__ */ jsx6("p", { className: "smg-kpi__value", children: value }),
    (delta || note) && /* @__PURE__ */ jsxs4("div", { className: "smg-kpi__meta", children: [
      delta && /* @__PURE__ */ jsxs4("span", { className: `smg-delta smg-delta--${ocjena}`, children: [
        delta,
        rijec && ` \u2014 ${rijec}`
      ] }),
      note && /* @__PURE__ */ jsx6("span", { className: "smg-kpi__note", children: note })
    ] })
  ] });
}
function KpiGrid({ children }) {
  return /* @__PURE__ */ jsx6("div", { className: "smg-kpi-grid", children });
}
var bojaKategorije = { A: "zelena", B: "plava", C: "zuta", D: "crvena" };
var bojaStanja = { dobro: "zelena", oprez: "zuta", lose: "crvena" };
var tekstStanja = { dobro: "Dobro", oprez: "Oprez", lose: "Lo\u0161e" };
function SemaforBadge({ kategorija, stanje, razina = "puna", varijanta = "ispuna", size = "md", children }) {
  const boja = stanje ? bojaStanja[stanje] : kategorija ? bojaKategorije[kategorija] : "neutralna";
  const oznaka = children ?? (stanje ? tekstStanja[stanje] : kategorija ?? "n.p.");
  const cls = ["smg-sem", `smg-sem--${boja}`, razina === "prigusena" && "smg-sem--prigusena", varijanta === "tekst" && "smg-sem--tekst", size === "lg" && "smg-sem--lg"].filter(Boolean).join(" ");
  const opis = stanje ? `Stanje: ${tekstStanja[stanje]}` : `Kategorija ${kategorija ?? "nije primjenjivo"}${razina === "prigusena" ? " (usporedna razina)" : ""}`;
  return /* @__PURE__ */ jsx6("span", { className: cls, title: opis, children: oznaka });
}
function Alert({ tip = "info", title, children }) {
  return /* @__PURE__ */ jsxs4("div", { className: `smg-alert smg-alert--${tip}`, role: tip === "greska" ? "alert" : "status", children: [
    /* @__PURE__ */ jsx6(Icon, { name: tip, className: "smg-alert__icon" }),
    /* @__PURE__ */ jsxs4("div", { children: [
      /* @__PURE__ */ jsx6("p", { className: "smg-alert__title", children: title }),
      children && /* @__PURE__ */ jsx6("p", { className: "smg-alert__body", children })
    ] })
  ] });
}
function Tag({ children, variant = "neutral" }) {
  return /* @__PURE__ */ jsx6("span", { className: `smg-tag ${variant !== "neutral" ? `smg-tag--${variant}` : ""}`.trim(), children });
}
var DRUSTVA = { msan: "M SAN Grupa", king: "KING ICT", abysalto: "Abysalto", aig: "Agro Invest grupa", ekupi: "eKupi" };
function CompanyTag({ drustvo, label }) {
  return /* @__PURE__ */ jsxs4("span", { className: "smg-company", children: [
    /* @__PURE__ */ jsx6("span", { className: "smg-company__dot", style: { background: `var(--tvrtka-${drustvo})` }, "aria-hidden": "true" }),
    label ?? DRUSTVA[drustvo]
  ] });
}
function Tabs({ tabs, value, onChange, label = "Prikaz" }) {
  return /* @__PURE__ */ jsx6("div", { className: "smg-tabs", role: "tablist", "aria-label": label, children: tabs.map((t) => /* @__PURE__ */ jsx6(
    "button",
    {
      type: "button",
      role: "tab",
      className: "smg-tab",
      "aria-selected": t.id === value,
      tabIndex: t.id === value ? 0 : -1,
      onClick: () => onChange(t.id),
      onKeyDown: (e) => {
        const i = tabs.findIndex((x) => x.id === value);
        if (e.key === "ArrowRight") onChange(tabs[(i + 1) % tabs.length].id);
        if (e.key === "ArrowLeft") onChange(tabs[(i - 1 + tabs.length) % tabs.length].id);
      },
      children: t.label
    },
    t.id
  )) });
}
function EmptyState({ title, children, action }) {
  return /* @__PURE__ */ jsxs4("div", { className: "smg-empty", children: [
    /* @__PURE__ */ jsx6("p", { className: "smg-empty__title", children: title }),
    children && /* @__PURE__ */ jsx6("p", { style: { margin: 0 }, children }),
    action && /* @__PURE__ */ jsx6("div", { style: { marginTop: 16 }, children: action })
  ] });
}
var collator = new Intl.Collator("hr", { numeric: true, sensitivity: "base" });
function DataTable({ columns, rows, rowKey, caption, compact, empty, onRowClick, selectedKey, source }) {
  const [sort, setSort] = useState(null);
  const sorted = useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return rows;
    const get = col.sortValue ?? ((r) => r[col.key]);
    return [...rows].sort((a, b) => {
      const x = get(a), y = get(b);
      if (x == null && y == null) return 0;
      if (x == null) return 1;
      if (y == null) return -1;
      return (typeof x === "number" && typeof y === "number" ? x - y : collator.compare(String(x), String(y))) * sort.dir;
    });
  }, [rows, columns, sort]);
  const alignCls = (a) => a === "right" ? "smg-num" : a === "center" ? "smg-center" : void 0;
  return /* @__PURE__ */ jsxs4("div", { children: [
    /* @__PURE__ */ jsx6("div", { className: "smg-table-wrap", children: /* @__PURE__ */ jsxs4("table", { className: `smg-table ${compact ? "smg-table--compact" : ""}`.trim(), children: [
      caption && /* @__PURE__ */ jsx6("caption", { className: "smg-visually-hidden", children: caption }),
      /* @__PURE__ */ jsx6("thead", { children: /* @__PURE__ */ jsx6("tr", { children: columns.map((c) => {
        const active = sort?.key === c.key;
        const ariaSort = active ? sort.dir === 1 ? "ascending" : "descending" : void 0;
        return /* @__PURE__ */ jsx6("th", { className: alignCls(c.align), style: c.width ? { width: c.width } : void 0, "aria-sort": ariaSort, scope: "col", children: c.sortable ? /* @__PURE__ */ jsxs4("button", { type: "button", onClick: () => setSort(active && sort.dir === -1 ? null : { key: c.key, dir: active ? -1 : 1 }), children: [
          c.header,
          /* @__PURE__ */ jsx6(Icon, { name: active ? sort.dir === 1 ? "gore" : "dolje" : "sort", size: 14 })
        ] }) : c.header }, c.key);
      }) }) }),
      /* @__PURE__ */ jsx6("tbody", { children: sorted.length === 0 ? /* @__PURE__ */ jsx6("tr", { children: /* @__PURE__ */ jsx6("td", { colSpan: columns.length, className: "smg-table__empty", children: empty ?? "Nema podataka za odabrane filtre." }) }) : sorted.map((r) => {
        const k = rowKey(r);
        return /* @__PURE__ */ jsx6("tr", { "aria-selected": selectedKey === k || void 0, onClick: onRowClick ? () => onRowClick(r) : void 0, style: onRowClick ? { cursor: "pointer" } : void 0, children: columns.map((c) => /* @__PURE__ */ jsx6("td", { className: alignCls(c.align), children: c.render ? c.render(r) : String(r[c.key] ?? "\u2014") }, c.key)) }, k);
      }) })
    ] }) }),
    source && /* @__PURE__ */ jsx6("p", { className: "smg-source", children: source })
  ] });
}

// src/lib/format.ts
var NBSP = "\xA0";
function formatBroj(v, decimale = 0) {
  if (v == null || Number.isNaN(v)) return "\u2014";
  return new Intl.NumberFormat("hr-HR", { minimumFractionDigits: decimale, maximumFractionDigits: decimale }).format(v);
}
function formatPostotak(v, decimale = 1, { udio = true } = {}) {
  if (v == null || Number.isNaN(v)) return "\u2014";
  return `${formatBroj(udio ? v * 100 : v, decimale)}${NBSP}%`;
}
function formatEUR(v, decimale = 2) {
  if (v == null || Number.isNaN(v)) return "\u2014";
  return `${formatBroj(v, decimale)}${NBSP}\u20AC`;
}
function formatEURKratko(v) {
  if (v == null || Number.isNaN(v)) return "\u2014";
  const a = Math.abs(v);
  if (a >= 1e9) return `${formatBroj(v / 1e9, 2)}${NBSP}mlrd. EUR`;
  if (a >= 1e6) return `${formatBroj(v / 1e6, 2)}${NBSP}mil. EUR`;
  if (a >= 1e4) return `${formatBroj(v / 1e3, 0)}${NBSP}tis. EUR`;
  return formatEUR(v, 0);
}
function formatDatum(d) {
  if (!d) return "\u2014";
  const x = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(x.getTime())) return "\u2014";
  return `${x.getDate()}.${NBSP}${x.getMonth() + 1}.${NBSP}${x.getFullYear()}.`;
}
function formatPromjenaPB(v, decimale = 1) {
  if (v == null || Number.isNaN(v)) return "\u2014";
  const z = v > 0 ? "+" : v < 0 ? "\u2212" : "\xB1";
  return `${z}${formatBroj(Math.abs(v), decimale)}${NBSP}p.b.`;
}
function formatPromjenaPosto(v, decimale = 1) {
  if (v == null || Number.isNaN(v)) return "\u2014";
  const z = v > 0 ? "+" : v < 0 ? "\u2212" : "\xB1";
  return `${z}${formatBroj(Math.abs(v) * 100, decimale)}${NBSP}%`;
}

// src/lib/charts.ts
var chartColors = {
  /** Kategorijski grafikon bez stanja: SMG petrolej-plava u svim temama, zatim svjetlija i siva. Nikad crvena akcenta društva. */
  serije: ["var(--data-1)", "var(--data-2)", "var(--data-3)"],
  semafor: {
    A: "var(--semafor-zelena)",
    B: "var(--semafor-plava)",
    C: "var(--semafor-zuta)",
    D: "var(--semafor-crvena)",
    np: "var(--semafor-neutralna)"
  },
  /** Sporedni niz (benchmark, prethodno razdoblje) uz primarni semafor. */
  semaforBlijeda: {
    A: "var(--semafor-zelena-blijeda)",
    B: "var(--semafor-plava-blijeda)",
    C: "var(--semafor-zuta-blijeda)",
    D: "var(--semafor-crvena-blijeda)",
    np: "var(--semafor-neutralna-blijeda)"
  },
  os: "var(--muted)",
  mreza: "var(--border-soft)",
  tekst: "var(--ink-soft)"
};
function resolveColor(cssVar, el = document.documentElement) {
  const m = cssVar.match(/^var\((--[^)]+)\)$/);
  return m ? getComputedStyle(el).getPropertyValue(m[1]).trim() : cssVar;
}

// src/lib/tokens.generated.ts
var THEMES = [
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
];
export {
  Alert,
  AppShell,
  Button,
  Card,
  Checkbox,
  CompanyTag,
  DRUSTVA,
  DataTable,
  EmptyState,
  Field,
  Icon,
  Input,
  KpiCard,
  KpiGrid,
  NavItem,
  NavSection,
  PageHeader,
  Select,
  SemaforBadge,
  THEMES,
  Tabs,
  Tag,
  Textarea,
  ThemeProvider,
  Toolbar,
  chartColors,
  formatBroj,
  formatDatum,
  formatEUR,
  formatEURKratko,
  formatPostotak,
  formatPromjenaPB,
  formatPromjenaPosto,
  resolveColor,
  useTheme
};
