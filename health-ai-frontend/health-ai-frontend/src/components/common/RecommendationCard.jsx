import { ArrowRight, Lightbulb } from 'lucide-react'
import Badge from './Badge'
import Card from './Card'

const priorityTone = { High: 'red', Medium: 'amber', Low: 'teal' }

export default function RecommendationCard({ recommendation }) {
  return (
    <Card className="h-full p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-health-700">
          <Lightbulb size={18} aria-hidden="true" />
          <span className="text-sm font-semibold">{recommendation.category}</span>
        </div>
        <Badge tone={priorityTone[recommendation.priority] || 'slate'}>{recommendation.priority} priority</Badge>
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900">{recommendation.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600"><span className="font-semibold text-slate-800">Reason:</span> {recommendation.reason}</p>
      <div className="mt-4 rounded-lg bg-slate-50 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Action</p>
        <p className="mt-1 text-sm leading-6 text-slate-700">{recommendation.action}</p>
      </div>
      <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-health-700">
        View in your action plan <ArrowRight size={14} aria-hidden="true" />
      </div>
    </Card>
  )
}
