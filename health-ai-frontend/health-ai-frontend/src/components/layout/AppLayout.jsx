import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const titles = {
  '/dashboard': 'Dashboard',
  '/profile': 'Health Profile',
  '/health-assessment': 'Health Assessment',
  '/analysis': 'AI Analysis',
  '/recommendations': 'Recommendations',
  '/simulator': 'What-If Simulator',
  '/health-journey': 'Health Journey',
  '/history': 'Assessment History',
  '/assistant': 'Health Assistant',
}

export default function AppLayout() {
  const location = useLocation()
  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Header title={titles[location.pathname] || 'HealthAI'} />
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
