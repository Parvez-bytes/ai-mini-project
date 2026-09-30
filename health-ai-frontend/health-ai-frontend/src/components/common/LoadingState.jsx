import { LoaderCircle } from 'lucide-react'

export default function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-8">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <LoaderCircle className="animate-spin" size={18} aria-hidden="true" />
        {message}
      </div>
    </div>
  )
}
