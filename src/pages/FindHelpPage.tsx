import React from 'react'
import { MapLocator } from '../components/locator/MapLocator'
import { EMERGENCY_NUMBERS } from '../data/centersData'
import { ShieldAlert, PhoneCall, CheckCircle2, Hospital, HeartHandshake, Compass } from 'lucide-react'

export const FindHelpPage: React.FC = () => {
  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Top Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" />
          <span>Tamil Nadu Care Network</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Help Is Closer Than You Think
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Access verified government medical college de-addiction wards, District Mental Health Programme (DMHP) units, and recognized residential centers across Tamil Nadu.
        </p>
      </div>

      {/* Interactive Map & List Locator */}
      <MapLocator />

      {/* Emergency Hotlines Grid */}
      <section className="bg-[#0b132b] rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-xl space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block mb-1">
            24/7 Verified Helplines
          </span>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Direct Access to Emergency Care & Tele-Counseling
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            These numbers are officially operated by government public health and disaster response systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EMERGENCY_NUMBERS.map((emergency, idx) => (
            <div
              key={idx}
              className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between space-y-4 hover:border-teal-500/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-teal-300 border border-slate-700">
                    {emergency.badge}
                  </span>
                  <span className="text-xl font-mono font-black text-white">
                    {emergency.number}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-100">{emergency.name}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {emergency.description}
                </p>
              </div>

              <a
                href={`tel:${emergency.number}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 hover:from-teal-400 hover:to-cyan-400 transition-all shadow-md active:scale-95"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call {emergency.number} Directly</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* What to Expect at a Government Center in Tamil Nadu */}
      <section className="bg-gradient-to-br from-slate-900 via-[#0a1430] to-slate-900 rounded-3xl border border-teal-500/30 p-6 sm:p-10 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
            Patient Rights & Dignity
          </span>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            What Happens When You Visit a De-Addiction Center?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Knowing the clinical procedure removes fear and demystifies seeking help.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-teal-300 text-sm">1. Confidential Registration</h4>
            <p className="text-slate-300 leading-relaxed">
              Medical consultations are strictly private. Doctors evaluate vitals and medical history without judgment or police involvement.
            </p>
          </div>

          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-teal-300 text-sm">2. Medical Detoxification</h4>
            <p className="text-slate-300 leading-relaxed">
              Under medical supervision, safe medications neutralize painful withdrawal symptoms (shakes, nausea, insomnia) to restore balance.
            </p>
          </div>

          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-teal-300 text-sm">3. Psychological Therapy</h4>
            <p className="text-slate-300 leading-relaxed">
              Clinical psychologists work with patients using Cognitive Behavioral Therapy (CBT) to understand emotional triggers and cravings.
            </p>
          </div>

          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-teal-300 text-sm">4. Family & Aftercare Followup</h4>
            <p className="text-slate-300 leading-relaxed">
              Family members receive counseling to rebuild trust, and regular outpatient check-ins protect against relapse.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
