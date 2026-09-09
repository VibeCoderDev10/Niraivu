import React, { useState } from 'react'
import {
  Brain,
  Activity,
  HeartCrack,
  GraduationCap,
  HelpCircle,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  BookOpen,
} from 'lucide-react'
import { SubstancesOverview } from '../components/home/SubstancesOverview'
import { SUBSTANCES_DATA } from '../data/substancesData'

export const LearnPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'categories' | 'neurobiology' | 'effects' | 'myths'>('categories')

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Educational Knowledge Center</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Know What You’re Facing
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Comprehensive, evidence-based knowledge to demystify addiction, understand chemical risks, and empower students and communities with facts.
        </p>

        {/* Tab switcher */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'categories'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/30'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            Substance Classes (8)
          </button>
          <button
            onClick={() => setActiveTab('neurobiology')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'neurobiology'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/30'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            Neurobiology of Addiction
          </button>
          <button
            onClick={() => setActiveTab('effects')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'effects'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/30'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            Real-Life Impacts
          </button>
          <button
            onClick={() => setActiveTab('myths')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'myths'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/30'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            Myths vs. Facts
          </button>
        </div>
      </div>

      {/* Tab 1: Substances Overview */}
      {activeTab === 'categories' && <SubstancesOverview />}

      {/* Tab 2: Neurobiology of Dopamine Hijack */}
      {activeTab === 'neurobiology' && (
        <section className="bg-[#0b132b] rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              Science of the Mind
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Why Addiction Happens: The Dopamine Hijack
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Addiction is not a lack of willpower or moral weakness. It is a biological reconfiguration of the brain's reward and survival pathways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold">
                1
              </div>
              <h3 className="text-base font-bold text-white">The Natural Reward Circuit</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Normally, healthy achievements (cracking an exam, sports, music, healthy meals) release measured pulses of dopamine, teaching the brain to repeat constructive life habits.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
                2
              </div>
              <h3 className="text-base font-bold text-white">The Chemical Flooding</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Addictive substances flood the nucleus accumbens with up to 10x the dopamine of natural pleasures. The brain registers the substance as essential for survival, like water or oxygen.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-bold">
                3
              </div>
              <h3 className="text-base font-bold text-white">Tolerance & Dependence</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                To protect itself, the brain dials back dopamine receptors (downregulation). Natural pleasures no longer register (anhedonia). The person now needs the drug merely to avoid severe physical agony.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-teal-950/30 border border-teal-500/30 text-xs sm:text-sm text-teal-200 flex items-center gap-3">
            <Brain className="w-6 h-6 text-teal-400 shrink-0" />
            <span>
              <strong>The Power of Neuroplasticity:</strong> Because the brain adapts to chemical presence, it can also adapt back when substances are eliminated with medically supervised detox and counseling. Healing is biologically real.
            </span>
          </div>
        </section>
      )}

      {/* Tab 3: Real Life Impacts */}
      {activeTab === 'effects' && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Physical Effects */}
            <div className="bg-[#0b132b] rounded-2xl border border-slate-800 p-6 space-y-3">
              <div className="flex items-center gap-2.5 text-teal-400">
                <Activity className="w-5 h-5" />
                <h3 className="text-lg font-bold text-white">Physical & Physiological Damage</h3>
              </div>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
                <li>• <strong>Cardiovascular:</strong> Severe arrhythmia, coronary vasospasms, accelerated atherosclerosis, and early heart attacks.</li>
                <li>• <strong>Neurological:</strong> Neurotoxic cell death, reduced cerebral cortex density, memory impairment, and tremors.</li>
                <li>• <strong>Hepatic & Renal:</strong> Toxic liver cirrhosis, acute hepatitis, and rhabdomyolysis causing kidney failure.</li>
                <li>• <strong>Immune Suppression:</strong> Heightened susceptibility to pneumonia, sepsis, and infectious diseases.</li>
              </ul>
            </div>

            {/* Mental & Emotional Effects */}
            <div className="bg-[#0b132b] rounded-2xl border border-slate-800 p-6 space-y-3">
              <div className="flex items-center gap-2.5 text-cyan-400">
                <Brain className="w-5 h-5" />
                <h3 className="text-lg font-bold text-white">Mental & Emotional Health</h3>
              </div>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
                <li>• <strong>Substance-Induced Psychosis:</strong> Persecutory paranoia, visual and auditory hallucinations that can persist for months.</li>
                <li>• <strong>Major Depressive Disorder:</strong> Severe dopamine depletion causing chronic apathy, emptiness, and acute suicidal thoughts.</li>
                <li>• <strong>Panic & Anxiety:</strong> Severe panic attacks during withdrawal and hypervigilant paranoia.</li>
                <li>• <strong>Emotional Blunting:</strong> Inability to feel warmth, love, or empathy for parents and partners.</li>
              </ul>
            </div>

            {/* Effects on Family & Relationships */}
            <div className="bg-[#0b132b] rounded-2xl border border-slate-800 p-6 space-y-3">
              <div className="flex items-center gap-2.5 text-rose-400">
                <HeartCrack className="w-5 h-5" />
                <h3 className="text-lg font-bold text-white">Family & Relationships</h3>
              </div>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
                <li>• <strong>Erosion of Trust:</strong> Deception, secretiveness, missing family heirlooms or finances.</li>
                <li>• <strong>Emotional Trauma:</strong> Relatives experience immense anxiety, chronic shame, sleep deprivation, and helplessness.</li>
                <li>• <strong>Domestic Strain:</strong> Frequent explosive arguments, communication breakdown, and social isolation from community events.</li>
              </ul>
            </div>

            {/* Effects on Education & Career */}
            <div className="bg-[#0b132b] rounded-2xl border border-slate-800 p-6 space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <GraduationCap className="w-5 h-5" />
                <h3 className="text-lg font-bold text-white">Education & Career Trajectory</h3>
              </div>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
                <li>• <strong>Academic Disruption:</strong> Attendance falling below mandatory exam cut-offs, failed semesters, expelled from college hostels.</li>
                <li>• <strong>Lost Cognitive Retention:</strong> Inability to grasp mathematical, engineering, or conceptual topics during lectures.</li>
                <li>• <strong>Career Derailment:</strong> Job terminations due to erratic attendance, missed project milestones, and legal liabilities under the NDPS Act.</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Tab 4: Myths vs Facts */}
      {activeTab === 'myths' && (
        <section className="bg-[#0b132b] rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="max-w-3xl space-y-2 mb-6">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              Truth in Science
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Debunking Common Myths Around Substance Use
            </h2>
            <p className="text-sm text-slate-300">
              Myths spread through campus hostels, movies, and internet forums often normalize dangerous substances. Here are the clinical facts.
            </p>
          </div>

          <div className="space-y-4">
            {SUBSTANCES_DATA.flatMap((s) => s.myths).map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2"
              >
                <div className="flex items-start gap-2 text-rose-400 font-bold text-sm">
                  <span>❌ Myth:</span>
                  <span className="text-slate-200">“{item.myth}”</span>
                </div>
                <div className="flex items-start gap-2 text-emerald-400 font-medium text-xs sm:text-sm pl-4 border-l-2 border-teal-500/40">
                  <span className="shrink-0 font-bold">✓ Clinical Reality:</span>
                  <span className="text-slate-300">{item.fact}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
