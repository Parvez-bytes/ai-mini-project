import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Bot, CheckCircle2, ClipboardCheck, HeartPulse, Lightbulb, ShieldCheck, SlidersHorizontal, UserRound } from 'lucide-react'

const features = [
  ['Health Profile', 'Capture structured lifestyle inputs in one place.', UserRound],
  ['AI Analysis', 'Explore mock model-based observations and contributing factors.', Bot],
  ['Personalized Recommendations', 'Turn profile inputs into practical preventive actions.', Lightbulb],
  ['Explainable Insights', 'See why the prototype rules surface a particular result.', ShieldCheck],
  ['What-If Simulator', 'Change lifestyle values and compare mock scenarios.', SlidersHorizontal],
  ['Health Journey', 'Review recorded profile trends over time.', BarChart3],
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#home" className="flex items-center gap-2.5" aria-label="HealthAI home">
            <div className="rounded-lg bg-health-700 p-2 text-white"><HeartPulse size={19} /></div>
            <div><p className="font-bold leading-none">HealthAI</p><p className="mt-0.5 text-[10px] uppercase tracking-widest text-slate-500">Preventive Wellness</p></div>
          </a>
          <div className="hidden items-center gap-7 text-sm text-slate-600 md:flex">
            <a href="#home" className="hover:text-slate-900">Home</a>
            <a href="#about" className="hover:text-slate-900">About</a>
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#how-it-works" className="hover:text-slate-900">How It Works</a>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden px-3 py-2 text-sm font-semibold text-slate-700 sm:inline-flex">Login</Link>
            <Link to="/signup" className="btn-primary">Get Started <ArrowRight size={16} /></Link>
          </div>
        </div>
      </nav>

      <main id="home">
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-health-200 bg-health-50 px-3 py-1.5 text-xs font-semibold text-health-800"><ShieldCheck size={14} /> College AI Healthcare Prototype</div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">AI-Powered Preventive Healthcare</h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">A focused frontend prototype that organizes lifestyle and health-related inputs into preventive wellness insights, explainable profile observations, and practical everyday recommendations.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/signup" className="btn-primary px-5 py-3">Get Started <ArrowRight size={17} /></Link>
                <a href="#features" className="btn-secondary px-5 py-3">Explore Features</a>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2"><CheckCircle2 size={15} className="text-health-700" /> Mock data only</span>
                <span className="inline-flex items-center gap-2"><CheckCircle2 size={15} className="text-health-700" /> No API keys</span>
                <span className="inline-flex items-center gap-2"><CheckCircle2 size={15} className="text-health-700" /> Responsive UI</span>
              </div>
            </div>
            <div className="surface-card overflow-hidden bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div><p className="text-sm font-semibold">Preventive Overview</p><p className="text-xs text-slate-500">Sample workspace</p></div>
                <span className="rounded-lg bg-health-50 p-2 text-health-700"><HeartPulse size={18} /></span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  ['BMI', '22.9', 'Within reference range'],
                  ['Sleep', '6.2 h', 'Below preferred range'],
                  ['Activity', '3 / wk', 'Low-to-moderate'],
                  ['Water', '2.1 L', 'Moderate'],
                ].map(([label, value, note]) => <div className="rounded-lg border border-slate-200 p-4" key={label}><p className="text-xs text-slate-500">{label}</p><p className="mt-1 text-lg font-bold text-slate-900">{value}</p><p className="mt-1 text-[11px] leading-4 text-slate-500">{note}</p></div>)}
              </div>
              <div className="mt-4 rounded-lg bg-slate-50 p-4"><div className="flex justify-between text-xs"><span className="font-semibold text-slate-700">Prototype Wellness Score</span><span className="font-bold text-health-700">72 / 100</span></div><div className="mt-2 h-2 rounded-full bg-slate-200"><div className="h-2 w-[72%] rounded-full bg-health-600" /></div><p className="mt-2 text-[11px] text-slate-500">Project-defined indicator based on entered lifestyle data.</p></div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-widest text-health-700">About the prototype</p><h2 className="mt-2 text-3xl font-bold tracking-tight">Built to demonstrate preventive-health workflows, not medical diagnosis.</h2><p className="mt-4 leading-7 text-slate-600">The interface is structured so future backend services can replace the mock layer without redesigning the user journey. Each page uses shared components, centralized sample data, and local storage for demonstration state.</p></div>
        </section>

        <section id="features" className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="mb-9 max-w-2xl"><p className="text-xs font-bold uppercase tracking-widest text-health-700">Core features</p><h2 className="mt-2 text-3xl font-bold tracking-tight">A complete student-demo dashboard experience</h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{features.map(([title, body, Icon]) => <article key={title} className="rounded-xl border border-slate-200 bg-white p-5"><div className="inline-flex rounded-lg bg-health-50 p-2.5 text-health-700"><Icon size={20} /></div><h3 className="mt-4 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{body}</p></article>)}</div></div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><p className="text-xs font-bold uppercase tracking-widest text-health-700">How it works</p><div className="mt-6 grid gap-4 md:grid-cols-5">{['Profile', 'Assessment', 'AI Analysis', 'Recommendations', 'Tracking'].map((step, index) => <div key={step} className="relative rounded-xl border border-slate-200 bg-white p-5"><span className="text-xs font-bold text-health-700">0{index + 1}</span><h3 className="mt-2 font-semibold">{step}</h3>{index < 4 && <span className="absolute -right-3 top-1/2 hidden h-px w-6 bg-slate-300 md:block" />}</div>)}</div></section>

        <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8"><div className="rounded-xl border border-amber-200 bg-amber-50 p-5"><div className="flex items-start gap-3"><ShieldCheck size={20} className="mt-0.5 shrink-0 text-amber-700" /><div><h2 className="font-semibold text-amber-950">Safety disclaimer</h2><p className="mt-1 text-sm leading-6 text-amber-900">This platform is an educational preventive-health prototype. It does not diagnose medical conditions or replace professional medical advice.</p></div></div></div></section>
      </main>

      <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8"><p>© 2026 HealthAI Preventive Wellness — Frontend Part 1</p><p>Educational prototype • Mock data • No external APIs</p></div></footer>
    </div>
  )
}
