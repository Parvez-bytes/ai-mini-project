import { useState } from 'react'
import { Bot, Info, Send, UserRound } from 'lucide-react'
import Card from '../components/common/Card'
import Button from '../components/common/Button'

const cannedReplies = [
  { match: 'recommendation', response: 'Based on your entered profile, lower sleep duration and physical activity contributed to this recommendation in the prototype rules.' },
  { match: 'score', response: 'The Prototype Wellness Score is a project-defined indicator calculated from entered lifestyle values. It is not a medical score.' },
  { match: 'bmi', response: 'Your BMI is calculated locally from height and weight. BMI is a basic screening metric and not a diagnosis.' },
  { match: 'simulation', response: 'The What-If Simulator changes lifestyle inputs and compares the resulting mock profile group and project-defined wellness score.' },
]

export default function Assistant() {
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'Hi! I’m the frontend mock assistant. Ask me why a prototype recommendation or profile result appeared.' }])
  const [input, setInput] = useState('')

  function send() {
    const text = input.trim()
    if (!text) return
    const lower = text.toLowerCase()
    const reply = cannedReplies.find((item) => lower.includes(item.match))?.response || 'This is a frontend mock response. In Part 2, a context-aware assistant can use your stored profile and real backend services.'
    setMessages((prev) => [...prev, { role: 'user', text }, { role: 'assistant', text: reply }])
    setInput('')
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6"><div><h1 className="text-2xl font-bold tracking-tight">Health Assistant</h1><p className="mt-2 text-sm leading-6 text-slate-500">Basic chat UI for a future context-aware health assistant. Responses are hardcoded mock behavior for Part 1.</p></div><Card className="overflow-hidden"><div className="flex items-center gap-3 border-b border-slate-200 p-4"><div className="rounded-lg bg-health-50 p-2.5 text-health-700"><Bot size={19} /></div><div><p className="text-sm font-semibold">Preventive Wellness Assistant</p><p className="text-xs text-slate-500">Mock mode • No OpenAI, Gemini, or external API connection</p></div></div><div className="min-h-[420px] space-y-4 bg-slate-50 p-4 sm:p-6" aria-live="polite">{messages.map((message, index) => <div className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`} key={`${message.role}-${index}`}><div className={`flex max-w-[85%] gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}><div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${message.role === 'user' ? 'bg-slate-800 text-white' : 'bg-health-100 text-health-800'}`}>{message.role === 'user' ? <UserRound size={16} /> : <Bot size={16} />}</div><div className={`rounded-xl px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'bg-slate-800 text-white' : 'border border-slate-200 bg-white text-slate-700'}`}>{message.text}</div></div></div>)}</div><div className="border-t border-slate-200 bg-white p-4"><label htmlFor="assistantInput" className="sr-only">Message</label><div className="flex gap-2"><input id="assistantInput" className="field-input" placeholder="Ask: Why did I get this recommendation?" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') send() }} /><Button onClick={send}><Send size={16} /> Send</Button></div></div></Card><div className="flex gap-2 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-900"><Info size={18} className="mt-0.5 shrink-0" /> This assistant is a UI placeholder for future AI integration and should not be used for medical guidance.</div></div>
  )
}
