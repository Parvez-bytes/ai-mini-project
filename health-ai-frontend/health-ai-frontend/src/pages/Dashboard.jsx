import { useNavigate } from 'react-router-dom'
import { Activity, ArrowRight, Droplets, Moon, ScanHeart, Sparkles, Target, TrendingUp } from 'lucide-react'
import Card from '../components/common/Card'
import StatCard from '../components/common/StatCard'
import Badge from '../components/common/Badge'
import Button from '../components/common/Button'
import RecommendationCard from '../components/common/RecommendationCard'
import { calculateBmi, calculatePrototypeWellnessScore, getBmiCategory, getProfileGroup, mockAnalysis, mockHealthProfile, mockRecommendations, mockTrends, mockUser } from '../data/mockData'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const navigate = useNavigate()
  const savedProfile = JSON.parse(localStorage.getItem('healthAIProfile') || 'null') || mockHealthProfile
  const bmi = calculateBmi(savedProfile.heightCm, savedProfile.weightKg)
  const score = calculatePrototypeWellnessScore(savedProfile)
  const group = getProfileGroup(savedProfile)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-medium text-health-700">Wednesday, September 30, 2026</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Good morning, {mockUser.name}</h1><p className="mt-2 max-w-2xl text-sm text-slate-500">Here’s a snapshot of the lifestyle data currently stored in your mock profile.</p></div><Badge tone="teal">Frontend mock workspace</Badge></div>

      <section><div className="mb-3"><h2 className="section-title">Health Overview</h2><p className="muted mt-1">Recorded lifestyle metrics and project-defined indicators.</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><StatCard icon={ScanHeart} label="BMI" value={bmi ? bmi.toFixed(1) : '—'} subtext={getBmiCategory(bmi)} tone="teal" /><StatCard icon={Moon} label="Sleep" value={`${savedProfile.sleepHours} h`} subtext="Entered nightly average" tone="blue" /><StatCard icon={Activity} label="Physical Activity" value={`${savedProfile.physicalActivity}/wk`} subtext="Sessions recorded" tone="teal" /><StatCard icon={Droplets} label="Water Intake" value={`${savedProfile.waterLitres} L`} subtext="Entered daily estimate" tone="blue" /></div></section>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="p-5"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="section-title">Current Profile</h2><p className="muted mt-1">Your current prototype classification.</p></div><Badge tone="blue">{group}</Badge></div><div className="mt-5 grid gap-5 sm:grid-cols-2"><div className="rounded-lg border border-slate-200 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Profile Group</p><p className="mt-2 text-base font-semibold text-slate-900">{mockAnalysis.profileGroup}</p><p className="mt-2 text-sm leading-6 text-slate-500">{mockAnalysis.classificationNote}</p></div><div className="rounded-lg border border-slate-200 p-4"><div className="flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Prototype Wellness Score</p><p className="mt-2 text-3xl font-bold text-slate-900">{score}<span className="text-sm font-medium text-slate-400">/100</span></p></div><TrendingUp className="text-health-700" size={22} /></div><div className="mt-3 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-health-600" style={{ width: `${score}%` }} /></div><p className="mt-2 text-xs text-slate-500">Project-defined indicator based on entered lifestyle data; not a medical score.</p></div></div></Card>
        <Card className="p-5"><div className="flex items-center justify-between"><div><h2 className="section-title">Quick Actions</h2><p className="muted mt-1">Jump into the next workflow.</p></div><Target className="text-health-700" size={20} /></div><div className="mt-5 space-y-2"><Button variant="secondary" className="w-full justify-between" onClick={() => navigate('/health-assessment')}>Complete Assessment <ArrowRight size={16} /></Button><Button variant="secondary" className="w-full justify-between" onClick={() => navigate('/analysis')}>View AI Analysis <Sparkles size={16} /></Button><Button variant="secondary" className="w-full justify-between" onClick={() => navigate('/simulator')}>Run What-If Simulation <ArrowRight size={16} /></Button></div></Card>
      </div>

      <section><div className="mb-3 flex items-end justify-between"><div><h2 className="section-title">Top Preventive Recommendations</h2><p className="muted mt-1">General lifestyle suggestions for the demo profile.</p></div><Button variant="secondary" className="hidden sm:inline-flex" onClick={() => navigate('/recommendations')}>View all</Button></div><div className="grid gap-4 lg:grid-cols-3">{mockRecommendations.slice(0, 3).map((item) => <RecommendationCard key={item.id} recommendation={item} />)}</div></section>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"><Card className="p-5"><div><h2 className="section-title">Health Trend</h2><p className="muted mt-1">Recorded profile trends from mock check-ins.</p></div><div className="mt-5 h-72"><ResponsiveContainer width="100%" height="100%"><LineChart data={mockTrends}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="label" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} /><Tooltip /><Line type="monotone" dataKey="sleep" stroke="#0f766e" strokeWidth={2} dot={false} name="Sleep hours" /></LineChart></ResponsiveContainer></div></Card><Card className="p-5"><h2 className="section-title">Recent Analysis</h2><div className="mt-4 space-y-3">{mockAnalysis.keyFactors.slice(0, 3).map((factor) => <div className="rounded-lg border border-slate-200 p-3" key={factor.label}><div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold text-slate-800">{factor.label}</p><span className="text-sm font-bold text-slate-900">{factor.value}</span></div><p className="mt-1 text-xs text-slate-500">{factor.note}</p></div>)}</div><Button variant="secondary" className="mt-4 w-full" onClick={() => navigate('/analysis')}>Open analysis <ArrowRight size={16} /></Button></Card></div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"><strong>Safety note:</strong> This dashboard is an educational preventive-health prototype. It does not diagnose medical conditions or predict real medical outcomes.</div>
    </div>
  )
}
