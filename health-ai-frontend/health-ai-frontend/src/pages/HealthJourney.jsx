import { CalendarDays, TrendingUp } from 'lucide-react'
import Card from '../components/common/Card'
import Badge from '../components/common/Badge'
import { mockTrends } from '../data/mockData'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const assessmentPoints = [
  { date: 'Jun 25, 2026', label: 'Assessment 1', description: 'Initial lifestyle snapshot' },
  { date: 'Jul 28, 2026', label: 'Assessment 2', description: 'Early consistency check' },
  { date: 'Aug 29, 2026', label: 'Assessment 3', description: 'Lifestyle check-in' },
  { date: 'Sep 30, 2026', label: 'Current', description: 'Latest recorded profile' },
]

export default function HealthJourney() {
  return (
    <div className="space-y-6"><div><div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600"><CalendarDays size={14} /> Recorded Profile Trends</div><h1 className="mt-3 text-2xl font-bold tracking-tight">Health Journey</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">A visual timeline of mock profile check-ins. These charts show recorded inputs and should not be interpreted as proof of medical improvement.</p></div>
      <Card className="p-5 sm:p-6"><h2 className="section-title">Assessment Timeline</h2><div className="mt-6 grid gap-0 md:grid-cols-4">{assessmentPoints.map((point, index) => <div className="relative pb-7 md:pb-0 md:pr-5" key={point.label}><div className="flex items-start gap-3 md:block"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-health-200 bg-health-50 text-xs font-bold text-health-800">0{index + 1}</div><div className="md:mt-3"><p className="text-sm font-semibold text-slate-800">{point.label}</p><p className="mt-1 text-xs text-slate-500">{point.date}</p><p className="mt-2 text-sm leading-5 text-slate-600">{point.description}</p></div></div>{index < assessmentPoints.length - 1 && <div className="absolute left-4 top-9 h-full w-px bg-slate-200 md:left-auto md:right-2 md:top-4 md:h-px md:w-5" />}</div>)}</div></Card>
      <div className="grid gap-6 lg:grid-cols-2"><TrendCard title="Recorded BMI Trend" dataKey="bmi" unit="BMI" /><TrendCard title="Recorded Sleep Trend" dataKey="sleep" unit="Hours" /><TrendCard title="Recorded Physical Activity Trend" dataKey="activity" unit="Sessions/week" /><TrendCard title="Recorded Water Intake Trend" dataKey="water" unit="Litres/day" /></div>
      <Card className="p-5"><div className="flex gap-3"><TrendingUp className="mt-0.5 shrink-0 text-health-700" size={19} /><p className="text-sm leading-6 text-slate-600">The journey page is a visualization layer for user-entered records. In Part 2, real persisted assessments can be connected here without changing the page-level structure.</p></div></Card>
    </div>
  )
}

function TrendCard({ title, dataKey, unit }) {
  return <Card className="p-5"><h2 className="text-base font-semibold">{title}</h2><p className="mt-1 text-xs text-slate-500">{unit} • mock recorded values</p><div className="mt-4 h-56"><ResponsiveContainer width="100%" height="100%"><LineChart data={mockTrends}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="label" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} /><Tooltip /><Line type="monotone" dataKey={dataKey} stroke="#0f766e" strokeWidth={2} dot={{ r: 3 }} /></LineChart></ResponsiveContainer></div></Card>
}
