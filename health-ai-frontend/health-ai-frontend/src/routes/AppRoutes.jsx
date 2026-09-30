import { Navigate, Route, Routes } from 'react-router-dom'
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import About from '../pages/About'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import HealthAssessment from '../pages/HealthAssessment'
import Analysis from '../pages/Analysis'
import Recommendations from '../pages/Recommendations'
import Simulator from '../pages/Simulator'
import HealthJourney from '../pages/HealthJourney'
import History from '../pages/History'
import Assistant from '../pages/Assistant'
import ProtectedRoute from '../components/layout/ProtectedRoute'
import AppLayout from '../components/layout/AppLayout'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/health-assessment" element={<HealthAssessment />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/health-journey" element={<HealthJourney />} />
          <Route path="/history" element={<History />} />
          <Route path="/assistant" element={<Assistant />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
