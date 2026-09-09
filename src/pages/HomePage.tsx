import React from 'react'
import { HeroSection } from '../components/home/HeroSection'
import { WhyItMatters } from '../components/home/WhyItMatters'
import { SubstancesOverview } from '../components/home/SubstancesOverview'
import { ScenarioSimulator } from '../components/prevention/ScenarioSimulator'
import { RecoveryPathway } from '../components/home/RecoveryPathway'
import { StoriesSection } from '../components/home/StoriesSection'
import { AlertCircle, PhoneCall, HeartPulse, Compass, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'

interface HomePageProps {
  onNavigate: (route: string) => void
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <HeroSection
        onNavigate={onNavigate}
        onOpenChat={() => onNavigate('chat')}
      />

      {/* Section 1: Why It Matters */}
      <WhyItMatters />

      {/* Section 2: Know What You're Facing / Substances Overview */}
      <SubstancesOverview onNavigate={onNavigate} />

      {/* Section 3: Interactive Prevention Simulator Teaser */}
      <section className="py-16 border-t border-slate-800/80 bg-[#060b19]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>Interactive Decision Lab</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Prevention Starts Before the First Step
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2">
              Practice saying no, recognizing warning signs, and de-escalating peer pressure in real-world scenarios.
            </p>
          </div>

          <ScenarioSimulator />
        </div>
      </section>

      {/* Section 4: Recovery Pathway */}
      <RecoveryPathway />

      {/* Section 5: Prominent Emergency Callout Card */}
      <section className="py-12 bg-gradient-to-r from-rose-950/40 via-slate-900 to-rose-950/40 border-y border-rose-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0b132b] rounded-3xl border border-rose-500/40 p-6 sm:p-10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Urgent Crisis Response</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Someone May Be In Immediate Danger?
              </h3>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                If someone is unconscious, having trouble breathing, experiencing seizures, or appears critically unwell, seek emergency medical help immediately. Do not leave them alone.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="tel:108"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-xl shadow-rose-950 transition-all active:scale-95"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call 108 Ambulance</span>
              </a>

              <a
                href="tel:14446"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-teal-600/90 hover:bg-teal-500 text-white font-bold text-sm shadow-lg shadow-teal-950 transition-all active:scale-95"
              >
                <HeartPulse className="w-4 h-4" />
                <span>14446 Tele-MANAS</span>
              </a>

              <button
                onClick={() => onNavigate('find-help')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
              >
                <Compass className="w-4 h-4 text-teal-400" />
                <span>Nearby Centers</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Illustrative Stories */}
      <StoriesSection />

      {/* Bottom Mission CTA */}
      <section className="py-20 text-center relative overflow-hidden bg-gradient-to-b from-[#080e22] to-[#040813]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-400 p-0.5 mx-auto mb-6 shadow-xl shadow-teal-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-teal-300" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Building a Drug-Free Tamil Nadu, Together.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed max-w-2xl mx-auto">
            Whether you are a student facing exams, a concerned parent, or someone seeking confidential guidance, NIRAIVU is here to stand with you.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('chat')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-300 shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 active:scale-95 transition-all text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Confidential Chat with NIRA</span>
            </button>

            <button
              onClick={() => onNavigate('find-help')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-slate-200 bg-slate-900 border border-slate-700 hover:border-teal-500/40 text-sm transition-all"
            >
              <Compass className="w-4 h-4 text-teal-400" />
              <span>Locate Rehabilitation Centers</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
