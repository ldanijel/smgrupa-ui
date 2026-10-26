import type { ReactNode, MouseEventHandler } from 'react';

export interface AppShellProps {
  /** Naziv aplikacije ispod imena grupe/društva, npr. „HR analitika”. */
  appName: string;
  /** Ime izdavatelja: „SMGrupa” ili društvo. */
  brand?: string;
  nav: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

/** Okvir aplikacije: bočni izbornik + zaglavlje + sadržaj. */
export function AppShell({ appName, brand = 'SMGrupa', nav, header, footer, children }: AppShellProps) {
  return (
    <div className="smg-shell">
      <aside className="smg-sidebar" aria-label="Glavni izbornik">
        <div className="smg-sidebar__brand">
          <span className="smg-sidebar__mark" aria-hidden="true" />
          <div>
            <div className="smg-sidebar__name">{brand}</div>
            <div className="smg-sidebar__app">{appName}</div>
          </div>
        </div>
        <nav className="smg-sidebar__nav">{nav}</nav>
        {footer && <div className="smg-sidebar__foot">{footer}</div>}
      </aside>
      <div className="smg-main">
        {header && <header className="smg-header">{header}</header>}
        <main className="smg-content">{children}</main>
      </div>
    </div>
  );
}

export function NavSection({ children }: { children: ReactNode }) {
  return <div className="smg-sidebar__section">{children}</div>;
}

export interface NavItemProps {
  children: ReactNode;
  icon?: ReactNode;
  active?: boolean;
  href?: string;
  onClick?: MouseEventHandler;
}

export function NavItem({ children, icon, active, href, onClick }: NavItemProps) {
  const props = { className: 'smg-nav-item', 'aria-current': active ? ('page' as const) : undefined, onClick };
  return href ? <a href={href} {...props}>{icon}{children}</a> : <button type="button" {...props}>{icon}{children}</button>;
}

export interface PageHeaderProps {
  title: string;
  eyebrow?: string;
  description?: ReactNode;
  actions?: ReactNode;
}

/** Naslov stranice. Naslov je zaključak ili jasna tema; opis jedna rečenica. */
export function PageHeader({ title, eyebrow, description, actions }: PageHeaderProps) {
  return (
    <div className="smg-page-header">
      <div>
        {eyebrow && <p className="smg-page-header__eyebrow">{eyebrow}</p>}
        <h1 className="smg-page-header__title">{title}</h1>
        {description && <p className="smg-page-header__desc">{description}</p>}
      </div>
      {actions && <div className="smg-page-header__actions">{actions}</div>}
    </div>
  );
}
