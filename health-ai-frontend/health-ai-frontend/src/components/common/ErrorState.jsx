import { TriangleAlert } from 'lucide-react'

export default function ErrorState({ message = 'Something went wrong. Please try again.' }) {
  return (
    <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
      <div className="flex gap-3">
        <TriangleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
        <span>{message}</span>
      </div>
    </div>
  )
}
