import { useMemo, useState } from 'react'
import Card from '../components/common/Card'
import Select from '../components/common/Select'
import RecommendationCard from '../components/common/RecommendationCard'
import Badge from '../components/common/Badge'
import { goalRecommendations, mockActionPlan } from '../data/mockData'

const goals = Object.keys(goalRecommendations)

export default function Recommendations() {
  const [goal, setGoal] = useState('General Preventive Wellness')
  const list = useMemo(() => goalRecommendations[goal], [goal])
  return (
    <div className="space-y-6"><div><h1 className="text-2xl font-bold tracking-tight">Recommendations</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">Personalized preventive lifestyle suggestions generated from mock frontend rules. They are general wellness ideas, not medical treatment.</p></div>
      <Card className="p-5"><div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end"><div><Select id="goal" label="Recommendation goal" value={goal} onChange={(e) => setGoal(e.target.value)} options={goals.map((item) => ({ value: item, label: item }))} /><p className="mt-2 text-xs text-slate-500">Change the goal to swap the mock recommendation set.</p></div><Badge tone="teal">{list.length} suggestions</Badge></div></Card>
      <section><div className="mb-3"><h2 className="section-title">{goal}</h2><p className="muted mt-1">Current mock recommendations for the selected goal.</p></div><div className="grid gap-4 lg:grid-cols-3">{list.map((item, index) => <RecommendationCard key={`${goal}-${item.title}`} recommendation={{ ...item, id: `${goal}-${index}` }} />)}</div></section>
      <section><div className="mb-3"><h2 className="section-title">7-Day Preventive Action Plan</h2><p className="muted mt-1">A lightweight demo plan for practicing general lifestyle habits.</p></div><div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">{mockActionPlan.map((item, index) => <Card key={item.day} className={`p-4 ${index === 6 ? 'md:col-span-2 lg:col-span-1' : ''}`}><div className="flex items-center justify-between"><Badge tone={index < 3 ? 'teal' : 'slate'}>{item.day}</Badge></div><p className="mt-3 text-sm font-medium leading-6 text-slate-700">{item.action}</p></Card>)}</div></section>
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">These recommendations are general lifestyle suggestions for an educational prototype. They are not medical treatment or individualized clinical advice.</div>
    </div>
  )
}
