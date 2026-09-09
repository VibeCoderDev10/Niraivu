import React from 'react'
import { ChatInterface } from '../components/chat/ChatInterface'
import { Sparkles, ShieldCheck, Heart, AlertCircle, Phone, Info } from 'lucide-react'

export const ChatPage: React.FC = () => {
  return (
    <div className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0b132b] rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 via-cyan-400 to-blue-500 p-0.5 shadow-lg shadow-teal-500/25 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-teal-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                NIRA AI Guide
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30">
                Confidential
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Your confidential awareness & support guide for a Drug-Free Tamil Nadu.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Zero Judgment</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <Heart className="w-4 h-4 text-cyan-400" />
            <span>Empathetic Guidance</span>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Chat Window */}
        <div className="lg:col-span-8">
          <ChatInterface isStandalonePage={true} />
        </div>

        {/* Sidebar Info & Safety Principles */}
        <div className="lg:col-span-4 space-y-4">
          {/* Emergency Box */}
          <div className="bg-rose-950/40 border border-rose-500/40 rounded-2xl p-5 text-rose-100 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-white uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>In Immediate Crisis?</span>
            </div>
            <p className="text-xs text-rose-200/90 leading-relaxed">
              If someone is unconscious, experiencing seizures, or unable to breathe, call emergency medical services immediately.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="tel:108"
                className="w-full text-center py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow"
              >
                Call 108 Emergency Ambulance
              </a>
              <a
                href="tel:14446"
                className="w-full text-center py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-teal-300 border border-slate-700 font-bold text-xs"
              >
                14446 Tele-MANAS (24/7 Support)
              </a>
            </div>
          </div>

          {/* Assistant Safety Principles */}
          <div className="bg-[#0b132b] rounded-2xl border border-slate-800 p-5 space-y-3 text-xs text-slate-300">
            <div className="flex items-center gap-2 font-bold text-sm text-white uppercase tracking-wider">
              <Info className="w-4 h-4 text-teal-400" />
              <span>NIRA Safeguards & Ethics</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              NIRA adheres to strict ethical and public health guidelines:
            </p>
            <ul className="space-y-1.5 text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-teal-400">✓</span>
                <span>Provides evidence-based substance information & prevention strategies.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-teal-400">✓</span>
                <span>Encourages early connection with qualified doctors and counselors.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400">✕</span>
                <span>Never advises on drug sourcing, manufacturing, or concealment.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400">✕</span>
                <span>Does not pretend to be a doctor or replace clinical treatment.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
