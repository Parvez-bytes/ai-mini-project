import { Bell } from 'lucide-react'
import { mockUser } from '../../data/mockData'

export default function Header({ title }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="pl-12 md:pl-0">
          <p className="text-base font-semibold text-slate-900">{title}</p>
          <p className="hidden text-xs text-slate-500 sm:block">Preventive wellness workspace</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="View notifications" onClick={() => alert('No new notifications in the mock workspace.')}>
            <Bell size={19} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-health-600" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-2.5 border-l border-slate-200 pl-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">{mockUser.initials}</div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">{mockUser.name}</p>
              <p className="text-[11px] text-slate-500">{mockUser.level}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
