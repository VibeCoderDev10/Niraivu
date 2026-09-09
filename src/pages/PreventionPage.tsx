import React, { useState } from 'react'
import {
  ShieldCheck,
  GraduationCap,
  Users,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  AlertCircle,
  Lightbulb,
} from 'lucide-react'
import { ScenarioSimulator } from '../components/prevention/ScenarioSimulator'

export const PreventionPage: React.FC = () => {
  const [activePlaybook, setActivePlaybook] = useState<'students' | 'parents' | 'friends'>('students')

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Proactive Prevention Framework</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Prevention Starts Before the First Step
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Arming students, parents, and peer groups with actionable refusal tactics, behavioral checklists, and compassionate communication guides.
        </p>

        {/* Playbook Switcher */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActivePlaybook('students')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activePlaybook === 'students'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/30'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Playbook for Students</span>
          </button>

          <button
            onClick={() => setActivePlaybook('parents')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activePlaybook === 'parents'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/30'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Playbook for Parents</span>
          </button>

          <button
            onClick={() => setActivePlaybook('friends')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activePlaybook === 'friends'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/30'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Playbook for Friends</span>
          </button>
        </div>
      </div>

      {/* Playbook Content Area */}
      {activePlaybook === 'students' && (
        <section className="bg-[#0b132b] rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in-50 duration-200">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              Student Action Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Mastering Campus Pressure & Protecting Your Future
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              College and hostel life bring freedom, but also risky situations. Use these proven strategies to stay in control.
            </p>
          </div>

          {/* CLEAR Framework Card */}
          <div className="bg-gradient-to-r from-teal-950/40 via-slate-900 to-teal-950/40 p-6 rounded-2xl border border-teal-500/30 space-y-4">
            <div className="flex items-center gap-2 text-teal-300 font-extrabold text-sm uppercase tracking-wider">
              <Lightbulb className="w-5 h-5 text-teal-400" />
              <span>The CLEAR Refusal Technique (Memorize This)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <p className="font-bold text-teal-400 text-base mb-1">C</p>
                <p className="font-bold text-white mb-1">Calm & Direct</p>
                <p className="text-slate-400">Maintain steady eye contact. Do not hesitate or apologize.</p>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <p className="font-bold text-teal-400 text-base mb-1">L</p>
                <p className="font-bold text-white mb-1">Look for Exit</p>
                <p className="text-slate-400">Position yourself near an open door or a sober peer group.</p>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <p className="font-bold text-teal-400 text-base mb-1">E</p>
                <p className="font-bold text-white mb-1">Emphatic 'No'</p>
                <p className="text-slate-400">“No thanks, I don’t touch that stuff.” Short and unchallengeable.</p>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <p className="font-bold text-teal-400 text-base mb-1">A</p>
                <p className="font-bold text-white mb-1">Alternative</p>
                <p className="text-slate-400">Suggest tea, food, or sports to divert the peer focus.</p>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <p className="font-bold text-teal-400 text-base mb-1">R</p>
                <p className="font-bold text-white mb-1">Remove</p>
                <p className="text-slate-400">If pressure continues, walk away without hesitation.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Build High-Dopamine Natural Routines</span>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Gym workouts, college hackathons, sports leagues, music, and trekking stimulate authentic dopamine without tolerance or crashes.
              </p>
            </div>

            <div className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Choose Your Inner Circle Carefully</span>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Surround yourself with at least one peer who shares your values. A refusal delivered with a partner is 5x more resistant to mockery.
              </p>
            </div>
          </div>
        </section>
      )}

      {activePlaybook === 'parents' && (
        <section className="bg-[#0b132b] rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in-50 duration-200">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Parental Guidance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Leading With Love Instead of Panic
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              When parents discover substance use, instinctual reactions like fury or denial often drive teenagers into deeper isolation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">1</span>
                <span>Notice Shifts Without Panicking</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Look for clusters of signs: sudden academic slumps, extreme defensiveness over personal items, locked doors, missing money, and drastic sleep reversal. Keep a calm mental record before speaking.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">2</span>
                <span>Communicate Without Shaming</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Replace: “You ruined our family honor” with: “We love you and we are terrified for your safety. We are going to get through this together with clinical help.”
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">3</span>
                <span>Set Firm, Loving Boundaries</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Do not provide unmonitored cash or make excuses to colleges or police for their substance absences. Love them unconditionally, but do not finance the addiction.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">4</span>
                <span>Enlist Professional De-Addiction Early</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Do not attempt forced cold-turkey lock-ins at home, which can cause lethal withdrawal seizures. Consult the nearest medical college hospital or call 104 / 14446.
              </p>
            </div>
          </div>
        </section>
      )}

      {activePlaybook === 'friends' && (
        <section className="bg-[#0b132b] rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in-50 duration-200">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Friend & Peer Support
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Being a Real Lifeline For a Friend in Trouble
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Friends are almost always the first to witness substance misuse. What you say and do can alter the course of their life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">1. Listen Patiently</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Let them vent about stress, family trouble, or heartbreak. Often drugs are used to numb unaddressed emotional pain.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">2. Never Shame or Mock</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Mocking them as an addict or exposing them on social media forces them underground. Treat it as a health crisis.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">3. Accompany Them</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Offer to walk with them to the student counseling cell or call 14446 together on speakerphone. Shared action conquers fear.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">4. Stay Connected</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                When someone enters treatment, stay in touch. Continued friendship during recovery prevents relapse isolation.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Interactive Scenario Simulator */}
      <div className="pt-6">
        <ScenarioSimulator />
      </div>
    </div>
  )
}
