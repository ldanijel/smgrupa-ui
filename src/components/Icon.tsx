import type { SVGProps } from 'react';

/** Mali ugrađeni set linijskih ikona (1,5 px) za komponente. U aplikacijama koristi lucide-react. */
const paths = {
  info: 'M12 16v-5m0-3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  uspjeh: 'm8 12.5 2.5 2.5L16 9.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  upozorenje: 'M12 9v4m0 3h.01M10.3 3.9 2.4 17.5A2 2 0 0 0 4.1 20.5h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z',
  greska: 'm15 9-6 6m0-6 6 6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  gore: 'm6 15 6-6 6 6',
  dolje: 'm6 9 6 6 6-6',
  sort: 'm8 9 4-4 4 4m0 6-4 4-4-4',
} as const;
export type IconName = keyof typeof paths;

export function Icon({ name, size = 20, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      <path d={paths[name]} />
    </svg>
  );
}
