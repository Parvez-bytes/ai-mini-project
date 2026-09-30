import { useMemo, useState } from 'react'
import { ArrowRight, Calculator, GitCompareArrows, RefreshCcw } from 'lucide-react'
import Card from '../components/common/Card'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Badge from '../components/common/Badge'
import { calculateBmi, calculatePrototypeWellnessScore, getBmiCategory, getProfileGroup, mockHealthProfile, mockRecommendations, simulatorDefaults } from '../data/mockData'

function scenarioRecommendations(profile) {
  const changes = []
  if (profile.sleepHours >= 7) changes.push('Sleep-related priority becomes lower in the prototype rules.')
  else changes.push('Sleep-focused actions remain a high-visibility suggestion.')
  if (profile.physicalActivity >= 5) changes.push('Movement recommendations become less prominent.')
  else changes.push('Movement recommendations remain relevant.')
  if (profile.waterLitres >= 2.5) changes.push('Hydration is represented as more consistent in this scenario.')
  else changes.push('Hydration suggestions remain available.')
  if (profile.screenTimeHours <= 4) changes.push('Screen-time suggestions become less prominent.')
  else changes.push('Screen-time transition suggestions remain relevant.')
  return changes
}

export default function Simulator() {
  const [values, setValues] = useState(simulatorDefaults)
  const current = mockHealthProfile
  const simulated = useMemo(() => ({ ...current, ...values }), [values])
  const currentBmi = calculateBmi(current.heightCm, current.weightKg)
  const simulatedBmi = calculateBmi(current.heightCm, values.weightKg)
  const currentScore = calculatePrototypeWellnessScore(current)
  const simulatedScore = calculatePrototypeWellnessScore(simulated)
  const currentGroup = getProfileGroup(current)
  const simulatedGroup = getProfileGroup(simulated)
  const scenarioChanges = scenarioRecommendations(simulated)

  function reset() { setValues(simulatorDefaults) }
  function update(key, value) { setValues((prev) => ({ ...prev, [key]: Number(value) })) }

  return (
    <div className="space-y-6"><div><div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"><Calculator size={14} /> Frontend calculation only</div><h1 className="mt-3 text-2xl font-bold tracking-tight">What-If Health Simulator</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">Change lifestyle values and see how the prototype analysis changes. This is a model-based scenario tool for educational demonstration.</p></div>
      <Card className="p-5 sm:p-6"><div className="flex items-center justify-between"><div><h2 className="section-title">Simulated Inputs</h2><p className="muted mt-1">The prototype compares these values with your current mock profile.</p></div><Button variant="secondary" onClick={reset}><RefreshCcw size={16} /> Reset</Button></div><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"><Input id="simSleep" type="number" min="0" max="24" step="0.1" label="Sleep Hours" value={values.sleepHours} onChange={(e) => update('sleepHours', e.target.value)} /><Input id="simActivity" type="number" min="0" max="21" label="Physical Activity" value={values.physicalActivity} onChange={(e) => update('physicalActivity', e.target.value)} /><Input id="simWater" type="number" min="0" max="10" step="0.1" label="Water Intake (L)" value={values.waterLitres} onChange={(e) => update('waterLitres', e.target.value)} /><Input id="simScreen" type="number" min="0" max="24" step="0.1" label="Screen Time" value={values.screenTimeHours} onChange={(e) => update('screenTimeHours', e.target.value)} /><Input id="simWeight" type="number" min="20" max="300" step="0.1" label="Weight (kg)" value={values.weightKg} onChange={(e) => update('weightKg', e.target.value)} /></div></Card>

      <div className="grid gap-6 lg:grid-cols-2"><Card className="p-5"><div className="flex items-center justify-between"><h2 className="section-title">Current Profile</h2><Badge tone="slate">Baseline</Badge></div><div className="mt-5 grid gap-3 sm:grid-cols-3"><Metric label="BMI" value={currentBmi?.toFixed(1)} note={getBmiCategory(currentBmi)} /><Metric label="Profile Group" value={currentGroup} /><Metric label="Prototype Wellness Score" value={`${currentScore}/100`} /></div></Card><Card className="border-health-200 p-5"><div className="flex items-center justify-between"><h2 className="section-title">Simulated Profile</h2><Badge tone="teal">Scenario</Badge></div><div className="mt-5 grid gap-3 sm:grid-cols-3"><Metric label="BMI" value={simulatedBmi?.toFixed(1)} note={getBmiCategory(simulatedBmi)} /><Metric label="Profile Group" value={simulatedGroup} /><Metric label="Prototype Wellness Score" value={`${simulatedScore}/100`} /></div></Card></div>

      <Card className="p-5 sm:p-6"><div className="flex items-center gap-2"><GitCompareArrows size={19} className="text-health-700" /><h2 className="section-title">Scenario Comparison</h2></div><div className="mt-5 grid gap-4 lg:grid-cols-2"><div className="rounded-lg border border-slate-200 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Input changes</p><div className="mt-3 space-y-2">{[['Sleep Hours', current.sleepHours, values.sleepHours], ['Physical Activity', current.physicalActivity, values.physicalActivity], ['Water Intake', current.waterLitres, values.waterLitres], ['Screen Time', current.screenTimeHours, values.screenTimeHours], ['Weight', current.weightKg, values.weightKg]].map(([label, before, after]) => <div key={label} className="flex items-center justify-between border-b border-slate-100 py-2 text-sm last:border-0"><span className="text-slate-500">{label}</span><span className="font-semibold text-slate-800">{before} → {after}</span></div>)}</div></div><div className="rounded-lg bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Recommendation changes</p><div className="mt-3 space-y-3">{scenarioChanges.map((change) => <div className="flex gap-2 text-sm leading-6 text-slate-600" key={change}><ArrowRight size={16} className="mt-1 shrink-0 text-health-700" />{change}</div>)}</div></div></div><p className="mt-5 text-xs leading-5 text-slate-500">Reference set: {mockRecommendations.length} baseline recommendation cards are available in the main Recommendations page.</p></Card>
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"><strong>Simulation safety:</strong> Results are model-based scenarios for educational purposes and do not predict real medical outcomes.</div>
    </div>
  )
}

function Metric({ label, value, note }) {
  return <div className="rounded-lg border border-slate-200 bg-white p-4"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 break-words text-lg font-bold text-slate-900">{value}</p>{note && <p className="mt-1 text-xs leading-5 text-slate-500">{note}</p>}</div>
}
