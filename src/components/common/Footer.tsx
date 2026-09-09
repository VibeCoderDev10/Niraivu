import React from 'react'
import { ShieldCheck, Heart, Phone, ExternalLink } from 'lucide-react'

interface FooterProps {
  onNavigate: (route: string) => void
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#050915] border-t border-slate-800/80 text-slate-400 text-sm mt-20">
      {/* Top Advisory Banner */}
      <div className="border-b border-slate-800/60 bg-gradient-to-r from-teal-950/30 via-slate-900 to-teal-950/30 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-200">
                A Statewide Initiative for Drug-Free Tamil Nadu
              </p>
              <p className="text-xs text-slate-400">
                Empowering students, families, and communities with confidential guidance and verified resources.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="tel:14446"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 font-medium text-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>National Tele-MANAS: 14446</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center font-bold text-slate-950 text-lg shadow-md">
                ந
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">NIRAIVU</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-300">“Awareness. Prevention. Recovery.”</strong>
              <br />
              <span className="text-teal-400">“Towards a Drug-Free Tamil Nadu.”</span>
              <br />
              An evidence-based, compassionate digital ecosystem supporting youth, educational institutions, and healthcare providers across Tamil Nadu.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-teal-300 transition-colors"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('learn')}
                  className="hover:text-teal-300 transition-colors"
                >
                  Substance Knowledge Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('prevention')}
                  className="hover:text-teal-300 transition-colors"
                >
                  Prevention & Scenarios
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('find-help')}
                  className="hover:text-teal-300 transition-colors"
                >
                  Tamil Nadu Center Locator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('chat')}
                  className="hover:text-teal-300 transition-colors"
                >
                  Talk to NIRA AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('resources')}
                  className="hover:text-teal-300 transition-colors"
                >
                  Verified Guides & Helplines
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-teal-300 transition-colors"
                >
                  About the Initiative
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency Lines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Emergency & Helplines</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
                <span>108 Medical Ambulance</span>
                <a href="tel:108" className="text-rose-400 font-bold hover:underline">
                  Dial 108
                </a>
              </li>
              <li className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
                <span>Tele-MANAS Tamil Nadu</span>
                <a href="tel:14446" className="text-teal-400 font-bold hover:underline">
                  14446
                </a>
              </li>
              <li className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
                <span>TN Health Advisory</span>
                <a href="tel:104" className="text-cyan-400 font-bold hover:underline">
                  104
                </a>
              </li>
              <li className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
                <span>National Emergency</span>
                <a href="tel:112" className="text-blue-400 font-bold hover:underline">
                  112
                </a>
              </li>
              <li className="flex items-center justify-between">
                <span>NCB Anti-Narcotics Line</span>
                <a href="tel:1933" className="text-amber-400 font-bold hover:underline">
                  1933
                </a>
              </li>
            </ul>
          </div>

          {/* Clinical Disclaimer */}
          <div className="space-y-3 md:col-span-1 bg-slate-900/40 p-4 rounded-xl border border-slate-800/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400/90">
              Important Medical Disclaimer
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              This platform provides general awareness information and does not replace professional medical advice, clinical diagnosis, or emergency psychiatric evaluation.
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              If someone is unresponsive, experiencing seizures, or in immediate distress, please call <strong className="text-white">108</strong> immediately.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} NIRAIVU. Built with purpose for Drug-Free Tamil Nadu (போதையில்லா தமிழ்நாடு).</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Social Impact & Student Well-being</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
