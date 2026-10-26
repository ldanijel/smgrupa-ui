// ILUSTRATIVNI PODACI za predložak — zamijeniti stvarnim izvorom. Nisu stvarni podaci društava.
import type { Drustvo, Kategorija, Stanje3 } from '@smgrupa/ui';

export interface Uloga {
  id: string;
  pozicija: string;
  drustvo: Drustvo;
  ocjena: number | null;
  objektivna: Kategorija;
  voditelj: Kategorija;
  rizik: Stanje3;
  nasljednik: boolean;
}

export const uloge: Uloga[] = [
  { id: '1', pozicija: 'Direktor prodaje', drustvo: 'msan', ocjena: 4.2, objektivna: 'A', voditelj: 'A', rizik: 'dobro', nasljednik: true },
  { id: '2', pozicija: 'Voditelj nabave', drustvo: 'msan', ocjena: 3.6, objektivna: 'B', voditelj: 'A', rizik: 'oprez', nasljednik: true },
  { id: '3', pozicija: 'Voditelj razvoja', drustvo: 'king', ocjena: 3.9, objektivna: 'B', voditelj: 'B', rizik: 'dobro', nasljednik: false },
  { id: '4', pozicija: 'Voditelj logistike', drustvo: 'ekupi', ocjena: 3.1, objektivna: 'C', voditelj: 'B', rizik: 'oprez', nasljednik: false },
  { id: '5', pozicija: 'Product manager', drustvo: 'abysalto', ocjena: 2.4, objektivna: 'D', voditelj: 'C', rizik: 'lose', nasljednik: false },
  { id: '6', pozicija: 'Voditelj farme', drustvo: 'aig', ocjena: 3.8, objektivna: 'B', voditelj: 'B', rizik: 'dobro', nasljednik: true },
  { id: '7', pozicija: 'Key account manager', drustvo: 'king', ocjena: null, objektivna: null, voditelj: 'B', rizik: 'oprez', nasljednik: false },
];

export const fluktuacija: { drustvo: Drustvo; udio: number }[] = [
  { drustvo: 'msan', udio: 0.118 },
  { drustvo: 'king', udio: 0.142 },
  { drustvo: 'abysalto', udio: 0.167 },
  { drustvo: 'aig', udio: 0.081 },
  { drustvo: 'ekupi', udio: 0.153 },
];
