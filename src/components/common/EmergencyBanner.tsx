import React from 'react'
import { AlertCircle, PhoneCall, HeartPulse } from 'lucide-react'

export const EmergencyBanner: React.FC = () => {
  return (
    <aside aria-label="Emergency Crisis Helplines" className="bg-gradient-to-r from-rose-950/90 via-slate-900 to-rose-950/90 border-b border-rose-500/30 text-rose-100 text-xs sm:text-sm py-2 px-3 sm:px-6 relative z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span className="font-semibold text-white tracking-wide">
            Immediate Crisis or Overdose?
          </span>
          <span className="hidden md:inline text-rose-200/80">
            Emergency medical help is available 24/7 across Tamil Nadu:
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          <a
            href="tel:108"
            className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold px-2.5 py-1 rounded-full text-xs transition-colors shadow-sm shadow-rose-900/50"
            title="Dial 108 Free Emergency Ambulance"
          >
            <PhoneCall className="w-3 h-3" />
            <span>108 Ambulance</span>
          </a>

          <a
            href="tel:14446"
            className="inline-flex items-center gap-1.5 bg-teal-600/90 hover:bg-teal-500 text-white font-medium px-2.5 py-1 rounded-full text-xs transition-colors"
            title="Tele-MANAS Mental Health Support"
          >
            <HeartPulse className="w-3 h-3" />
            <span>14446 Tele-MANAS</span>
          </a>

          <a
            href="tel:104"
            className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-full text-xs transition-colors"
            title="Tamil Nadu Health Helpline"
          >
            <span>TN 104 Health</span>
          </a>
        </div>
      </div>
    </aside>
  )
}
