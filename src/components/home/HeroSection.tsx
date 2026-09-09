import React from 'react'
import { Sparkles, MapPin, ArrowRight, ShieldCheck, HeartHandshake, Award, Activity } from 'lucide-react'

interface HeroSectionProps {
  onNavigate: (route: string) => void
  onOpenChat: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenChat }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-teal-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[250px] bg-cyan-500/10 blur-[110px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Mission Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              <span>Drug-Free Tamil Nadu Initiative • போதையில்லா தமிழ்நாடு</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              A Drug-Free <span className="bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">Tamil Nadu</span> Starts With Awareness.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Learn. Prevent. Recover. Get trusted evidence-based information, confidential guidance through our AI assistant, and verified help when you or someone you care about needs it.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onNavigate('chat')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-400 hover:from-teal-300 hover:to-cyan-200 shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 active:scale-95 transition-all text-sm sm:text-base group"
              >
                <Sparkles className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
                <span>Talk to NIRA</span>
                <span className="font-mono text-sm opacity-80 group-hover:translate-x-0.5 transition-transform">→</span>
              </button>

              <button
                onClick={() => onNavigate('find-help')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-teal-500/40 text-sm sm:text-base transition-all shadow-md active:scale-95"
              >
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>Find Help Near Me</span>
              </button>
            </div>

            {/* Trust Pill Indicators */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">100% Confidential</p>
                  <p className="text-[11px] text-slate-400">Zero judgment support</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">24/7 Helpline Link</p>
                  <p className="text-[11px] text-slate-400">108 & 14446 Tele-MANAS</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">38 Districts Covered</p>
                  <p className="text-[11px] text-slate-400">TN Health Network</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Abstract Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Visual Glass Container */}
            <div className="relative w-full max-w-[440px] aspect-square rounded-3xl bg-gradient-to-br from-slate-900/80 to-[#0c1634]/90 p-6 border border-teal-500/20 shadow-2xl backdrop-blur-xl flex flex-col justify-between overflow-hidden">
              {/* Decorative Geometric Rings */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-teal-500/20 pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full border border-cyan-500/20 pointer-events-none" />

              {/* Top Card Badge */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-[11px] font-semibold text-slate-300">Live Support System</span>
                </div>
                <span className="text-[11px] font-mono text-teal-400 font-bold">NIRAIVU AI</span>
              </div>

              {/* Central Abstract Illustration (SVG Shield + Tamil Nadu Growth Petals + Community Rings) */}
              <div className="my-auto py-6 flex items-center justify-center relative z-10">
                <svg className="w-48 h-48 drop-shadow-[0_10px_25px_rgba(13,148,136,0.35)]" viewBox="0 0 200 200" fill="none">
                  {/* Outer Circuit Nodes */}
                  <circle cx="100" cy="100" r="85" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="6 6" />
                  <circle cx="100" cy="100" r="65" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="1.5" />
                  
                  {/* Glowing Node Points */}
                  <circle cx="100" cy="15" r="4" fill="#06b6d4" />
                  <circle cx="185" cy="100" r="4" fill="#14b8a6" />
                  <circle cx="100" cy="185" r="4" fill="#38bdf8" />
                  <circle cx="15" cy="100" r="4" fill="#0d9488" />

                  {/* Shield of Protection */}
                  <path
                    d="M100 35C130 35 155 50 155 85C155 125 100 165 100 165C100 165 45 125 45 85C45 50 70 35 100 35Z"
                    fill="url(#shieldHeroGrad)"
                    stroke="#14b8a6"
                    strokeWidth="2"
                  />

                  {/* Inner Lotus / Recovery Flame */}
                  <path
                    d="M100 60C100 60 82 85 82 105C82 116 90 125 100 125C110 125 118 116 118 105C118 85 100 60 100 60Z"
                    fill="url(#flameGrad)"
                  />
                  <path
                    d="M78 85C78 85 68 100 70 112C72 120 80 126 88 123C84 114 82 105 84 96C85 91 78 85 78 85Z"
                    fill="#38bdf8"
                    opacity="0.8"
                  />
                  <path
                    d="M122 85C122 85 132 100 130 112C128 120 120 126 112 123C116 114 118 105 116 96C115 91 122 85 122 85Z"
                    fill="#2dd4bf"
                    opacity="0.8"
                  />

                  {/* Gradients */}
                  <defs>
                    <linearGradient id="shieldHeroGrad" x1="45" y1="35" x2="155" y2="165" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#0f172a" />
                      <stop offset="1" stopColor="#091829" />
                    </linearGradient>
                    <linearGradient id="flameGrad" x1="100" y1="60" x2="100" y2="125" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#22d3ee" />
                      <stop offset="1" stopColor="#0d9488" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Bottom Interactive Prompt Preview */}
              <div className="z-10 bg-slate-900/90 rounded-2xl p-3.5 border border-slate-800 shadow-lg">
                <p className="text-[11px] text-teal-400 font-semibold mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Ask NIRA right now:</span>
                </p>
                <button
                  onClick={() => onNavigate('chat')}
                  className="w-full text-left text-xs text-slate-200 hover:text-white bg-slate-950 p-2.5 rounded-xl border border-slate-800 hover:border-teal-500/40 transition-colors flex items-center justify-between"
                >
                  <span className="truncate">“How can I help a friend who may be using drugs?”</span>
                  <span className="text-teal-400 font-mono font-bold text-xs ml-2">Ask →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
