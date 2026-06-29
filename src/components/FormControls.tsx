import type {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

type FieldProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode
  error?: string
  hint?: string
  label: string
}

export function Field({
  children,
  className = '',
  error,
  hint,
  label,
  ...props
}: FieldProps) {
  const fieldClassName = ['form-field', className].filter(Boolean).join(' ')

  return (
    <label className={fieldClassName} {...props}>
      <span className="form-field__label">{label}</span>
      {children}
      {hint ? <span className="form-field__hint">{hint}</span> : null}
      {error ? (
        <span className="form-field__error" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  )
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="form-control" {...props} />
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className="form-control form-control--textarea" {...props} />
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className="form-control" {...props} />
}

export function Checkbox({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="choice-control">
      <input type="checkbox" {...props} />
      <span>{label}</span>
    </label>
  )
}

export function Radio({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="choice-control">
      <input type="radio" {...props} />
      <span>{label}</span>
    </label>
  )
}

export function Toggle({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="toggle-control">
      <input type="checkbox" {...props} />
      <span aria-hidden="true" className="toggle-control__track">
        <span className="toggle-control__thumb" />
      </span>
      <span>{label}</span>
    </label>
  )
}
