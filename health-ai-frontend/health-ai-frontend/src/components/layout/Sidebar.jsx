import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  Activity,
  Bot,
  CalendarRange,
  ClipboardCheck,
  Clock3,
  FileClock,
  Gauge,
  HeartPulse,
  LogOut,
  Menu,
  PanelLeftClose,
  Settings,
  UserRound,
  WandSparkles,
  X,
} from 'lucide-react'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: Gauge },
  { to: '/profile', label: 'Profile', icon: UserRound },
  { to: '/health-assessment', label: 'Health Assessment', icon: ClipboardCheck },
  { to: '/analysis', label: 'AI Analysis', icon: Bot },
  { to: '/recommendations', label: 'Recommendations', icon: WandSparkles },
  { to: '/simulator', label: 'What-If Simulator', icon: Activity },
  { to: '/health-journey', label: 'Health Journey', icon: CalendarRange },
  { to: '/history', label: 'History', icon: FileClock },
  { to: '/assistant', label: 'Assistant', icon: HeartPulse },
]

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem('healthAIAuth')
    navigate('/login', { replace: true })
  }

  return (
    <>
      <button
        className="fixed left-4 top-4 z-50 rounded-lg border border-slate-200 bg-white p-2 text-slate-700 shadow md:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation menu"
      >
        <Menu size={20} />
      </button>

      {mobileOpen && (
        <button
          className="fixed inset-0 z-40 bg-slate-950/30 md:hidden"
          aria-label="Close navigation menu"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform md:static md:z-auto md:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <NavLink to="/dashboard" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
            <div className="rounded-lg bg-health-700 p-2 text-white"><HeartPulse size={18} aria-hidden="true" /></div>
            <div>
              <p className="text-sm font-bold text-slate-900">HealthAI</p>
              <p className="text-[11px] text-slate-500">Preventive Wellness</p>
            </div>
          </NavLink>
          <button className="p-2 text-slate-500 md:hidden" onClick={() => setMobileOpen(false)} aria-label="Close navigation menu"><X size={18} /></button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Main navigation">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive ? 'bg-health-50 text-health-800' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-3">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50" onClick={() => alert('Settings are part of the frontend demonstration scope.')}> 
            <Settings size={18} aria-hidden="true" />
            Settings
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50" onClick={logout}>
            <LogOut size={18} aria-hidden="true" />
            Logout
          </button>
          <div className="mt-2 flex items-center gap-2 px-3 pt-2 text-xs text-slate-400">
            <PanelLeftClose size={14} />
            <span>Frontend Part 1</span>
          </div>
        </div>
      </aside>
    </>
  )
}
