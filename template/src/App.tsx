import { useMemo, useState } from 'react';
import {
  ThemeProvider, AppShell, NavItem, NavSection, PageHeader, Button, Alert, KpiGrid, KpiCard, Card, Toolbar, Field, Select, Input,
  DataTable, SemaforBadge, CompanyTag, Tabs, Tag, DRUSTVA, THEMES, formatBroj, formatPostotak, formatPromjenaPB, formatDatum,
  type Column, type ThemeId, type Drustvo,
} from '@smgrupa/ui';
import { uloge, fluktuacija, type Uloga } from './data/primjer';

const verzija = 'v0.1.0';

export function App() {
  // Tema = izdavatelj aplikacije. Kasnije se može vezati uz društvo prijavljenog korisnika.
  const [tema, setTema] = useState<ThemeId>('smg');
  const [drustvo, setDrustvo] = useState('');
  const [trazi, setTrazi] = useState('');
  const [tab, setTab] = useState('uloge');

  const redovi = useMemo(
    () => uloge.filter((u) => (!drustvo || u.drustvo === drustvo) && u.pozicija.toLowerCase().includes(trazi.toLowerCase())),
    [drustvo, trazi],
  );

  const stupci: Column<Uloga>[] = [
    { key: 'pozicija', header: 'Pozicija', sortable: true },
    { key: 'drustvo', header: 'Društvo', sortable: true, render: (r) => <CompanyTag drustvo={r.drustvo} />, sortValue: (r) => DRUSTVA[r.drustvo] },
    { key: 'ocjena', header: 'Ocjena', align: 'right', sortable: true, render: (r) => formatBroj(r.ocjena, 1) },
    { key: 'objektivna', header: 'Objektivna kat.', align: 'center', sortable: true, render: (r) => <SemaforBadge kategorija={r.objektivna} /> },
    { key: 'voditelj', header: 'Ocjena voditelja', align: 'center', render: (r) => <SemaforBadge kategorija={r.voditelj} razina="prigusena" /> },
    { key: 'rizik', header: 'Rizik odlaska', render: (r) => <SemaforBadge stanje={r.rizik} varijanta="tekst" /> },
    { key: 'nasljednik', header: 'Nasljednik', render: (r) => (r.nasljednik ? <Tag variant="akcent">Spreman</Tag> : <Tag>Nema</Tag>) },
  ];

  const max = Math.max(...fluktuacija.map((f) => f.udio));

  return (
    <ThemeProvider theme={tema}>
      <AppShell
        appName="HR analitika"
        brand={tema === 'smg' ? 'SMGrupa' : DRUSTVA[tema as Drustvo]}
        nav={
          <>
            <NavItem active>Pregled</NavItem>
            <NavItem>Fluktuacija</NavItem>
            <NavItem>Kritične uloge</NavItem>
            <NavSection>Postavke</NavSection>
            <NavItem>Izvori podataka</NavItem>
          </>
        }
        footer={`SMGrupa UI ${verzija}`}
        header={
          <>
            <span className="smg-muted">Ažurirano {formatDatum(new Date(2026, 9, 26))}</span>
            <div style={{ width: 200 }}>
              <Select size="sm" aria-label="Tema (društvo)" value={tema} onChange={(e) => setTema(e.target.value as ThemeId)}
                options={THEMES.map((t) => ({ value: t.id, label: `Tema: ${t.name}` }))} />
            </div>
          </>
        }
      >
        <PageHeader
          eyebrow="HR analitika · Q3 2026."
          title="Fluktuacija je pala treći kvartal zaredom"
          description="Pregled ključnih pokazatelja i kritičnih uloga po društvima Grupe."
          actions={<><Button variant="secondary">Izvezi u Excel</Button><Button>Novi izvještaj</Button></>}
        />

        <div className="smg-stack">
          <Alert tip="info" title="Predložak s ilustrativnim podacima">Zamijeni datoteku src/data/primjer.ts stvarnim izvorom.</Alert>

          <KpiGrid>
            <KpiCard label="Zaposleni u Grupi" value={formatBroj(1842)} delta="+3,1 % g/g" ocjena="neutralno" />
            <KpiCard label="Fluktuacija, zadnjih 12 mj." value={formatPostotak(0.124)} delta={formatPromjenaPB(-1.8)} ocjena="bolje" istaknuto />
            <KpiCard label="Kritične uloge s nasljednikom" value={formatPostotak(0.62, 0)} delta={formatPromjenaPB(-4, 0)} ocjena="losije" />
            <KpiCard label="Prosječna ocjena učinka" value={formatBroj(3.6, 1)} note="Ljestvica 1–5" />
          </KpiGrid>

          <Tabs tabs={[{ id: 'uloge', label: 'Kritične uloge' }, { id: 'drustva', label: 'Po društvima' }]} value={tab} onChange={setTab} />

          {tab === 'uloge' ? (
            <Card title="Kritične uloge" subtitle="Puna boja = objektivna kategorija · prigušena = ocjena voditelja">
              <Toolbar>
                <Field label="Društvo">
                  <Select value={drustvo} onChange={(e) => setDrustvo(e.target.value)} placeholder="Sva društva"
                    options={Object.entries(DRUSTVA).map(([value, label]) => ({ value, label }))} />
                </Field>
                <Field label="Pretraga">
                  <Input value={trazi} onChange={(e) => setTrazi(e.target.value)} placeholder="Naziv pozicije" />
                </Field>
              </Toolbar>
              <DataTable columns={stupci} rows={redovi} rowKey={(r) => r.id} caption="Kritične uloge" source="Izvor: ilustrativni podaci predloška, 26. 10. 2026." />
            </Card>
          ) : (
            <Card title="Fluktuacija po društvima" subtitle="Zadnjih 12 mjeseci" footer="Izvor: ilustrativni podaci predloška, 26. 10. 2026.">
              <div className="smg-stack" style={{ gap: 12 }}>
                {fluktuacija.map((f) => (
                  <div key={f.drustvo} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 64px', alignItems: 'center', gap: 12 }}>
                    <CompanyTag drustvo={f.drustvo} />
                    <div style={{ background: 'var(--surface-alt)', height: 16 }}>
                      <div style={{ width: `${(f.udio / max) * 100}%`, height: '100%', background: 'var(--data-1)' }} />
                    </div>
                    <span style={{ textAlign: 'right' }}>{formatPostotak(f.udio)}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </AppShell>
    </ThemeProvider>
  );
}
