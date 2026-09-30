export default function Select({ label, id, options, ...props }) {
  return (
    <div>
      {label && <label htmlFor={id} className="field-label">{label}</label>}
      <select id={id} className="field-input" {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}
