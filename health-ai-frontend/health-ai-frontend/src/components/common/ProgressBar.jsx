export default function ProgressBar({ value, label, showValue = true }) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0))
  return (
    <div>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
          <span>{label}</span>
          {showValue && <span className="font-semibold text-slate-700">{safeValue}%</span>}
        </div>
      )}
      <div className="h-2 overflow-hidden rounded-full bg-slate-100" aria-label={`${safeValue}% complete`}>
        <div className="h-full rounded-full bg-health-600 transition-all" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  )
}
