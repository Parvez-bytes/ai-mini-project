import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/common/Card'
import ProgressBar from '../components/common/ProgressBar'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Select from '../components/common/Select'
import { mockHealthProfile } from '../data/mockData'

const sections = ['Personal Information', 'Lifestyle', 'Sleep', 'Physical Activity', 'Nutrition/Hydration', 'Daily Habits']

export default function HealthAssessment() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(() => ({ ...mockHealthProfile }))
  const progress = Math.round(((step + 1) / sections.length) * 100)
  const section = sections[step]
  const update = (key, value) => setAnswers((prev) => ({ ...prev, [key]: value }))
  const summary = useMemo(() => `${answers.sleepHours} h sleep • ${answers.physicalActivity} activity sessions/week • ${answers.waterLitres} L water/day`, [answers])

  function analyze() {
    localStorage.setItem('healthAIProfile', JSON.stringify(answers))
    localStorage.setItem('healthAIAssessmentCompleted', 'true')
    navigate('/analysis')
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6"><div><h1 className="text-2xl font-bold tracking-tight">Health Assessment</h1><p className="mt-2 text-sm leading-6 text-slate-500">Complete each section to create the mock input used by the frontend analysis experience.</p></div>
      <Card className="p-5"><ProgressBar value={progress} label={`Section ${step + 1} of ${sections.length}: ${section}`} /></Card>
      <Card className="p-6 sm:p-8"><div className="flex items-start gap-3"><div className="rounded-lg bg-health-50 p-2 text-health-700"><CheckCircle2 size={19} /></div><div><h2 className="text-xl font-semibold">{section}</h2><p className="mt-1 text-sm text-slate-500">{step === 0 && 'Basic context for this demo profile.'}{step === 1 && 'General lifestyle inputs.'}{step === 2 && 'Sleep pattern used by the mock rules.'}{step === 3 && 'Movement and activity routine.'}{step === 4 && 'Hydration and nutrition context.'}{step === 5 && 'Daily habits that affect the prototype profile.'}</p></div></div>
        <div className="mt-7">{step === 0 && <div className="grid gap-4 sm:grid-cols-3"><Input id="aAge" type="number" label="Age" value={answers.age} onChange={(e) => update('age', Number(e.target.value))} /><Input id="aHeight" type="number" label="Height (cm)" value={answers.heightCm} onChange={(e) => update('heightCm', Number(e.target.value))} /><Input id="aWeight" type="number" label="Weight (kg)" value={answers.weightKg} onChange={(e) => update('weightKg', Number(e.target.value))} /></div>}
          {step === 1 && <div className="grid gap-4 sm:grid-cols-2"><Select id="aSmoking" label="Smoking" value={answers.smoking} onChange={(e) => update('smoking', e.target.value)} options={[{ value: 'No', label: 'No' }, { value: 'Yes', label: 'Yes' }]} /><Select id="aAlcohol" label="Alcohol" value={answers.alcohol} onChange={(e) => update('alcohol', e.target.value)} options={[{ value: 'No', label: 'No' }, { value: 'Occasionally', label: 'Occasionally' }, { value: 'Frequently', label: 'Frequently' }]} /><Input id="aScreen" type="number" label="Screen time (hours/day)" value={answers.screenTimeHours} onChange={(e) => update('screenTimeHours', Number(e.target.value))} /><Input id="aRoutine" label="Existing routine note" value={answers.routine || 'College study routine'} onChange={(e) => update('routine', e.target.value)} /></div>}
          {step === 2 && <div className="grid gap-4 sm:grid-cols-2"><Input id="aSleep" type="number" step="0.1" label="Average sleep hours" value={answers.sleepHours} onChange={(e) => update('sleepHours', Number(e.target.value))} /><Select id="aSleepConsistency" label="Sleep consistency" value={answers.sleepConsistency || 'Sometimes inconsistent'} onChange={(e) => update('sleepConsistency', e.target.value)} options={[{ value: 'Consistent', label: 'Consistent' }, { value: 'Sometimes inconsistent', label: 'Sometimes inconsistent' }, { value: 'Usually inconsistent', label: 'Usually inconsistent' }]} /></div>}
          {step === 3 && <div className="grid gap-4 sm:grid-cols-2"><Input id="aActivity" type="number" label="Activity sessions/week" value={answers.physicalActivity} onChange={(e) => update('physicalActivity', Number(e.target.value))} /><Select id="aActivityType" label="Typical activity" value={answers.activityType || 'Walking / mixed routine'} onChange={(e) => update('activityType', e.target.value)} options={[{ value: 'Walking / mixed routine', label: 'Walking / mixed routine' }, { value: 'Gym / structured exercise', label: 'Gym / structured exercise' }, { value: 'Sports', label: 'Sports' }, { value: 'Mostly sedentary', label: 'Mostly sedentary' }]} /></div>}
          {step === 4 && <div className="grid gap-4 sm:grid-cols-2"><Input id="aWater" type="number" step="0.1" label="Water intake (litres/day)" value={answers.waterLitres} onChange={(e) => update('waterLitres', Number(e.target.value))} /><Select id="aMeals" label="Meal routine" value={answers.mealRoutine || 'Mostly regular'} onChange={(e) => update('mealRoutine', e.target.value)} options={[{ value: 'Mostly regular', label: 'Mostly regular' }, { value: 'Irregular', label: 'Irregular' }, { value: 'Varies by schedule', label: 'Varies by schedule' }]} /></div>}
          {step === 5 && <div className="grid gap-4 sm:grid-cols-2"><Select id="aBreaks" label="Screen/study breaks" value={answers.breaks || 'Occasional'} onChange={(e) => update('breaks', e.target.value)} options={[{ value: 'Frequent', label: 'Frequent' }, { value: 'Occasional', label: 'Occasional' }, { value: 'Rare', label: 'Rare' }]} /><Select id="aWeekend" label="Weekend routine" value={answers.weekendRoutine || 'Similar to weekdays'} onChange={(e) => update('weekendRoutine', e.target.value)} options={[{ value: 'Similar to weekdays', label: 'Similar to weekdays' }, { value: 'More relaxed', label: 'More relaxed' }, { value: 'Unstructured', label: 'Unstructured' }]} /></div>}
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-between"><Button variant="secondary" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0}><ArrowLeft size={16} /> Previous</Button>{step < sections.length - 1 ? <Button onClick={() => setStep((value) => Math.min(sections.length - 1, value + 1))}>Next section <ArrowRight size={16} /></Button> : <Button onClick={analyze}><Sparkles size={17} /> Analyze My Health Profile</Button>}</div>
      </Card>
      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">Current mock summary: <span className="font-medium text-slate-800">{summary}</span></div>
      <p className="text-xs leading-5 text-slate-500">The final action routes to a realistic mock analysis. No backend, AI service, external API, diagnosis, or medical prediction is performed.</p>
    </div>
  )
}
