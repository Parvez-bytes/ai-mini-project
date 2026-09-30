import { Inbox } from 'lucide-react'

export default function EmptyState({ title = 'No data available', message = 'There is nothing to show here yet.' }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <Inbox className="text-slate-400" size={28} aria-hidden="true" />
      <h3 className="mt-3 font-semibold text-slate-800">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-slate-500">{message}</p>
    </div>
  )
}
