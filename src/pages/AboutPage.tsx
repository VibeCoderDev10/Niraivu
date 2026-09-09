import React from 'react'
import {
  ShieldCheck,
  HeartHandshake,
  Target,
  Sparkles,
  Award,
  Users,
  Compass,
  Code2,
  CheckCircle2,
} from 'lucide-react'

export const AboutPage: React.FC = () => {
  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Hero Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Our Ethos & Origin</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          About NIRAIVU
        </h1>
        <p className="text-base sm:text-lg text-teal-300 font-semibold">
          “Awareness. Prevention. Recovery.” — Towards a Drug-Free Tamil Nadu.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
          NIRAIVU (நிறைவு — meaning wholeness, fulfillment, and complete wellness) is a technology-driven social impact platform engineered to break the silence around substance use through digital empathy and verified care.
        </p>
      </div>

      {/* Mission & Vision Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#0b132b] rounded-3xl border border-teal-500/30 p-8 sm:p-10 space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Target className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
            Our Mission
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight">
            “Make reliable drug-awareness information easier to understand and easier to access.”
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            By transforming dry medical clinical research into relatable student playbooks, real-world refusal simulations, and conversational AI guidance, we eliminate the intimidation barrier that keeps young people from learning the truth about chemical dependency.
          </p>
        </div>

        <div className="bg-[#0b132b] rounded-3xl border border-cyan-500/30 p-8 sm:p-10 space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Compass className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
            Our Vision
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight">
            “A Tamil Nadu where awareness, early intervention and accessible support prevent abuse.”
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We envision a progressive state where students in universities and schools are resilient against peer pressure, where families replace punitive panic with clinical empathy, and where every citizen can locate a certified de-addiction facility within minutes.
          </p>
        </div>
      </div>

      {/* Core Principles */}
      <section className="bg-slate-900/60 rounded-3xl border border-slate-800 p-8 sm:p-10 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
            Our Guiding Pillars
          </span>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            The Philosophy Behind NIRAIVU
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="space-y-2">
            <h4 className="font-bold text-teal-300 text-base">1. Dignity Over Stigma</h4>
            <p className="text-slate-300 leading-relaxed">
              Substance abuse is a complex neurobiological health issue. Stigmatizing, shaming, or criminalizing users drives them underground. Healing requires respect and medical science.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-teal-300 text-base">2. Actionable Scenarios</h4>
            <p className="text-slate-300 leading-relaxed">
              Vague advice like "Just say no" fails in real college hostels. Teaching structured techniques like the CLEAR refusal framework prepares youth for real social pressure.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-teal-300 text-base">3. Tamil Nadu Centricity</h4>
            <p className="text-slate-300 leading-relaxed">
              Connecting users to real, verified public healthcare infrastructure: IMH Kilpauk, TTK Hospital, Government Medical Colleges, 108 Emergency, and 14446 Tele-MANAS.
            </p>
          </div>
        </div>
      </section>

      {/* Hackathon Showcase Notice */}
      <section className="bg-gradient-to-r from-teal-950/40 via-slate-900 to-teal-950/40 rounded-3xl border border-teal-500/30 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-teal-400" />
            <span className="font-extrabold text-sm text-white uppercase tracking-wider">
              Hackathon Demonstration Mode
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            This platform is architected with React, TypeScript, Tailwind CSS, Leaflet OpenStreetMap, and an embedded local NLP engine. It is designed to function seamlessly offline with realistic conversational behaviors during judging, with full compatibility for live Vercel AI SDK / LLM endpoints.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-mono font-bold">
            v1.0.0 • Hackathon Edition
          </div>
        </div>
      </section>
    </div>
  )
}
