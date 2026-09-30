export default function Button({ variant = 'primary', type = 'button', className = '', children, ...props }) {
  const base = variant === 'secondary' ? 'btn-secondary' : 'btn-primary'
  return (
    <button type={type} className={`${base} ${className}`} {...props}>
      {children}
    </button>
  )
}
