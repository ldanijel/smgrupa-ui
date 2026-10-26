import { useId, cloneElement, isValidElement, type ReactElement, type ReactNode, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';

export interface FieldProps {
  label: string;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  /** Jedna kontrola: <Input/>, <Select/> ili <Textarea/>. Field joj dodaje id i aria atribute. */
  children: ReactElement<Record<string, unknown>>;
}

/** Oznaka + kontrola + opis ili greška. Greška zamjenjuje opis. */
export function Field({ label, hint, error, required, children }: FieldProps) {
  const id = useId();
  const descId = `${id}-opis`;
  const control = isValidElement(children)
    ? cloneElement(children, {
        id,
        required,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': error || hint ? descId : undefined,
      })
    : children;
  return (
    <div className="smg-field">
      <label className="smg-field__label" htmlFor={id}>
        {label}
        {required && <span className="smg-field__req" aria-hidden="true">*</span>}
      </label>
      {control}
      {error ? <span id={descId} className="smg-field__error">{error}</span> : hint ? <span id={descId} className="smg-field__hint">{hint}</span> : null}
    </div>
  );
}

type Size = { size?: 'md' | 'sm' };

export function Input({ size = 'md', className = '', ...rest }: Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & Size) {
  return <input className={`smg-input ${size === 'sm' ? 'smg-input--sm' : ''} ${className}`.trim()} {...rest} />;
}

export interface SelectOption { value: string; label: string }

export function Select({ options, placeholder, size = 'md', className = '', ...rest }: Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> & Size & { options: SelectOption[]; placeholder?: string }) {
  return (
    <select className={`smg-select ${size === 'sm' ? 'smg-select--sm' : ''} ${className}`.trim()} {...rest}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

export function Textarea({ className = '', ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`smg-textarea ${className}`.trim()} {...rest} />;
}

export function Checkbox({ label, ...rest }: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { label: ReactNode }) {
  return (
    <label className="smg-check">
      <input type="checkbox" {...rest} />
      <span>{label}</span>
    </label>
  );
}

/** Red filtera iznad tablice ili dashboarda. */
export function Toolbar({ children }: { children: ReactNode }) {
  return <div className="smg-toolbar" role="group" aria-label="Filtri">{children}</div>;
}
