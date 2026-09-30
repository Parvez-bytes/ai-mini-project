import Card from './Card'

export default function StatCard({ icon: Icon, label, value, subtext, tone = 'teal' }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-500">{subtext}</p>
        </div>
        <div className={`rounded-lg p-2.5 ${tone === 'blue' ? 'bg-blue-50 text-blue-700' : tone === 'amber' ? 'bg-amber-50 text-amber-700' : 'bg-health-50 text-health-700'}`}>
          <Icon size={20} aria-hidden="true" />
        </div>
      </div>
    </Card>
  )
}
