export default function Input({ label, error, hint, id, ...props }) {
  return (
    <div>
      {label && <label htmlFor={id} className="field-label">{label}</label>}
      <input id={id} className="field-input" {...props} />
      {hint && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
      {error && <p className="mt-1.5 text-xs font-medium text-rose-600">{error}</p>}
    </div>
  )
}
