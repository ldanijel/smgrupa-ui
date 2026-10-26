import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'md' | 'sm';
  loading?: boolean;
  icon?: ReactNode;
}

/** Pill gumb. Jedan `primary` po ekranu; natpis glagolom, 2–3 riječi. */
export function Button({ variant = 'primary', size = 'md', loading, icon, children, className = '', disabled, type = 'button', ...rest }: ButtonProps) {
  const cls = ['smg-btn', `smg-btn--${variant}`, size === 'sm' && 'smg-btn--sm', className].filter(Boolean).join(' ');
  return (
    <button type={type} className={cls} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading ? <span className="smg-btn__spinner" aria-hidden="true" /> : icon}
      {children}
    </button>
  );
}
