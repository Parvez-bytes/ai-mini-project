import { useEffect, useMemo, useState } from 'react'
import { Save, RotateCcw } from 'lucide-react'
import Input from '../components/common/Input'
import Select from '../components/common/Select'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import Badge from '../components/common/Badge'
import { calculateBmi, getBmiCategory, mockHealthProfile } from '../data/mockData'

const initial = JSON.parse(localStorage.getItem('healthAIProfile') || 'null') || mockHealthProfile

export default function Profile() {
  const [profile, setProfile] = useState(initial)
  const [saved, setSaved] = useState(false)
  const bmi = useMemo(() => calculateBmi(profile.heightCm, profile.weightKg), [profile.heightCm, profile.weightKg])

  useEffect(() => { if (saved) { const timer = setTimeout(() => setSaved(false), 2500); return () => clearTimeout(timer) } }, [saved])
  function update(key, value) { setProfile((prev) => ({ ...prev, [key]: value })) }
  function save() { localStorage.setItem('healthAIProfile', JSON.stringify(profile)); setSaved(true) }
  function reset() { setProfile(mockHealthProfile); localStorage.setItem('healthAIProfile', JSON.stringify(mockHealthProfile)); setSaved(true) }

  return (
    <div className="space-y-6"><div><h1 className="text-2xl font-bold tracking-tight">Health & Lifestyle Profile</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">Enter the information used by the mock rules. Optional health fields are treated as user-provided context only and are not interpreted as a diagnosis.</p></div>
      <div className="grid gap-6 lg:grid-cols-[1fr_330px]">
        <Card className="p-5 sm:p-6"><form className="space-y-7" onSubmit={(e) => { e.preventDefault(); save() }}>
          <section><h2 className="section-title">Basic Information</h2><div className="mt-4 grid gap-4 sm:grid-cols-3"><Input id="age" type="number" min="1" max="120" label="Age" value={profile.age} onChange={(e) => update('age', Number(e.target.value))} /><Input id="height" type="number" min="50" max="250" label="Height (cm)" value={profile.heightCm} onChange={(e) => update('heightCm', Number(e.target.value))} /><Input id="weight" type="number" min="20" max="300" step="0.1" label="Weight (kg)" value={profile.weightKg} onChange={(e) => update('weightKg', Number(e.target.value))} /></div></section>
          <section><h2 className="section-title">Lifestyle</h2><div className="mt-4 grid gap-4 sm:grid-cols-2"><Input id="sleep" type="number" min="0" max="24" step="0.1" label="Sleep hours" value={profile.sleepHours} onChange={(e) => update('sleepHours', Number(e.target.value))} /><Input id="activity" type="number" min="0" max="21" label="Physical activity (sessions/week)" value={profile.physicalActivity} onChange={(e) => update('physicalActivity', Number(e.target.value))} /><Input id="water" type="number" min="0" max="10" step="0.1" label="Water intake (litres/day)" value={profile.waterLitres} onChange={(e) => update('waterLitres', Number(e.target.value))} /><Input id="screen" type="number" min="0" max="24" step="0.1" label="Screen time (hours/day)" value={profile.screenTimeHours} onChange={(e) => update('screenTimeHours', Number(e.target.value))} /></div></section>
          <section><h2 className="section-title">Lifestyle Habits</h2><div className="mt-4 grid gap-4 sm:grid-cols-2"><Select id="smoking" label="Smoking" value={profile.smoking} onChange={(e) => update('smoking', e.target.value)} options={[{ value: 'No', label: 'No' }, { value: 'Yes', label: 'Yes' }, { value: 'Prefer not to say', label: 'Prefer not to say' }]} /><Select id="alcohol" label="Alcohol" value={profile.alcohol} onChange={(e) => update('alcohol', e.target.value)} options={[{ value: 'No', label: 'No' }, { value: 'Occasionally', label: 'Occasionally' }, { value: 'Frequently', label: 'Frequently' }, { value: 'Prefer not to say', label: 'Prefer not to say' }]} /></div></section>
          <section><h2 className="section-title">Optional Health Context</h2><div className="mt-4 grid gap-4 sm:grid-cols-2"><Input id="bp" label="Blood pressure" placeholder="e.g. 118/76" value={profile.bloodPressure} onChange={(e) => update('bloodPressure', e.target.value)} /><Input id="glucose" label="Blood glucose" placeholder="Optional" value={profile.bloodGlucose} onChange={(e) => update('bloodGlucose', e.target.value)} /><div className="sm:col-span-2"><label htmlFor="concerns" className="field-label">Existing health concerns</label><textarea id="concerns" className="field-input min-h-24 resize-y" placeholder="Optional notes" value={profile.existingConcerns} onChange={(e) => update('existingConcerns', e.target.value)} /></div></div></section>
          <div className="flex flex-col gap-2 border-t border-slate-200 pt-5 sm:flex-row"><Button type="submit"><Save size={17} /> Save Profile</Button><Button variant="secondary" type="button" onClick={reset}><RotateCcw size={17} /> Reset sample data</Button>{saved && <span className="self-center text-sm font-medium text-health-700">Saved to this browser.</span>}</div>
        </form></Card>

        <div className="space-y-4"><Card className="p-5"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Live BMI calculation</p><p className="mt-2 text-4xl font-bold tracking-tight text-slate-900">{bmi ? bmi.toFixed(1) : '—'}</p><div className="mt-2"><Badge tone="teal">{getBmiCategory(bmi)}</Badge></div><p className="mt-4 text-sm leading-6 text-slate-500">BMI is a basic screening metric derived from height and weight. It is not a medical diagnosis and should not be treated as one.</p></Card><Card className="p-5"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Storage</p><p className="mt-2 text-sm leading-6 text-slate-600">Part 1 saves the editable profile to <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">localStorage</code>. This isolated mock layer can later be replaced by real application data services.</p></Card></div>
      </div>
    </div>
  )
}
