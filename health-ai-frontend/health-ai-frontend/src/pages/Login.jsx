import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, HeartPulse, LockKeyhole, Mail } from 'lucide-react'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import ErrorState from '../components/common/ErrorState'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function login(demo = false) {
    if (!demo && (!email.includes('@') || password.length < 6)) {
      setError('Enter a valid email and a password with at least 6 characters.')
      return
    }
    localStorage.setItem('healthAIAuth', 'true')
    if (remember || demo) localStorage.setItem('healthAIRemember', 'true')
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"><ArrowLeft size={16} /> Back to home</Link>
        <div className="surface-card p-6 sm:p-8">
          <div className="flex items-center gap-2.5"><div className="rounded-lg bg-health-700 p-2 text-white"><HeartPulse size={18} /></div><div><p className="font-bold">HealthAI</p><p className="text-xs text-slate-500">Mock authentication</p></div></div>
          <div className="mt-7"><h1 className="text-2xl font-bold tracking-tight">Welcome back</h1><p className="mt-2 text-sm text-slate-500">Sign in to view your preventive wellness workspace.</p></div>
          {error && <div className="mt-5"><ErrorState message={error} /></div>}
          <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); login() }}>
            <Input id="email" type="email" label="Email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input id="password" type="password" label="Password" autoComplete="current-password" placeholder="Minimum 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-health-700 focus:ring-health-500" /> Remember me</label>
            <Button type="submit" className="w-full"><LockKeyhole size={17} /> Login</Button>
          </form>
          <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wide text-slate-400"><span className="h-px flex-1 bg-slate-200" /> or <span className="h-px flex-1 bg-slate-200" /></div>
          <Button variant="secondary" className="w-full" onClick={() => login(true)}><Mail size={17} /> Demo Login</Button>
          <p className="mt-6 text-center text-sm text-slate-500">No account? <Link to="/signup" className="font-semibold text-health-700 hover:text-health-800">Create one</Link></p>
          <p className="mt-4 text-center text-xs leading-5 text-slate-400">Frontend only. No JWT, database, or API is used in Part 1.</p>
        </div>
      </div>
    </div>
  )
}
