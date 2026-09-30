import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, HeartPulse, UserPlus } from 'lucide-react'
import Input from '../components/common/Input'
import Select from '../components/common/Select'
import Button from '../components/common/Button'
import ErrorState from '../components/common/ErrorState'

export default function Signup() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '', level: 'Undergraduate Student' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function update(key, value) { setForm((prev) => ({ ...prev, [key]: value })) }
  function submit(e) {
    e.preventDefault()
    if (form.fullName.trim().length < 2) return setError('Enter your full name.')
    if (!form.email.includes('@')) return setError('Enter a valid email address.')
    if (form.password.length < 6) return setError('Password must contain at least 6 characters.')
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.')
    localStorage.setItem('healthAIAuth', 'true')
    localStorage.setItem('healthAIUser', JSON.stringify({ name: form.fullName.split(' ')[0], fullName: form.fullName, email: form.email, level: form.level }))
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-xl">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"><ArrowLeft size={16} /> Back to home</Link>
        <div className="surface-card p-6 sm:p-8">
          <div className="flex items-center gap-2.5"><div className="rounded-lg bg-health-700 p-2 text-white"><HeartPulse size={18} /></div><div><p className="font-bold">HealthAI</p><p className="text-xs text-slate-500">Create a demo profile</p></div></div>
          <div className="mt-7"><h1 className="text-2xl font-bold tracking-tight">Get started</h1><p className="mt-2 text-sm text-slate-500">Your account is stored only in this browser for the frontend demonstration.</p></div>
          {error && <div className="mt-5"><ErrorState message={error} /></div>}
          <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={submit}>
            <div className="sm:col-span-2"><Input id="fullName" label="Full Name" autoComplete="name" placeholder="Your full name" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} /></div>
            <Input id="signupEmail" type="email" label="Email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={(e) => update('email', e.target.value)} />
            <Select id="level" label="Academic / Occupation Level" value={form.level} onChange={(e) => update('level', e.target.value)} options={[{ value: 'Undergraduate Student', label: 'Undergraduate Student' }, { value: 'Postgraduate Student', label: 'Postgraduate Student' }, { value: 'Working Professional', label: 'Working Professional' }, { value: 'Other', label: 'Other' }]} />
            <Input id="signupPassword" type="password" label="Password" autoComplete="new-password" placeholder="Minimum 6 characters" value={form.password} onChange={(e) => update('password', e.target.value)} />
            <Input id="confirmPassword" type="password" label="Confirm Password" autoComplete="new-password" placeholder="Repeat password" value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} />
            <div className="sm:col-span-2 rounded-lg border border-health-200 bg-health-50 p-3 text-xs leading-5 text-health-900"><div className="flex gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0" /> Mock auth stores a boolean session and demo profile in localStorage. Real identity services are intentionally deferred to Part 2.</div></div>
            <div className="sm:col-span-2"><Button type="submit" className="w-full"><UserPlus size={17} /> Create Mock Account</Button></div>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">Already have access? <Link to="/login" className="font-semibold text-health-700">Login</Link></p>
        </div>
      </div>
    </div>
  )
}
