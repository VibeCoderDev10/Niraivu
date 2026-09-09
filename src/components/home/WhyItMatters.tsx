import React from 'react'
import { ShieldCheck, Heart, Sparkles, Users, ArrowUpRight, CheckCircle2, FileText } from 'lucide-react'

export const WhyItMatters: React.FC = () => {
  const cards = [
    {
      title: 'Early Awareness Prevents Dependency',
      tagline: 'Education Before First Exposure',
      description:
        'Substance abuse frequently begins during transitional periods—entering college, exam pressure, or moving to hostel life. Recognizing peer pressure mechanics and chemical risks beforehand equips youth to establish unbreakable boundaries.',
      icon: ShieldCheck,
      color: 'from-teal-500/20 to-teal-900/10 border-teal-500/30 text-teal-400',
    },
    {
      title: 'Asking for Help Is a Strength',
      tagline: 'De-Stigmatizing Early Intervention',
      description:
        'Addiction is a complex neurobiological health issue, not a moral deficiency. Stepping forward early to consult a doctor or counselor prevents severe physical dependence and avoids legal consequences.',
      icon: Sparkles,
      color: 'from-cyan-500/20 to-cyan-900/10 border-cyan-500/30 text-cyan-400',
    },
    {
      title: 'Recovery Is Proven and Possible',
      tagline: 'Neuroplasticity & Healing',
      description:
        'With structured medical detoxification, psychological counseling, and peer support, brain chemistry resets and individuals successfully resume education, careers, and family life.',
      icon: Heart,
      color: 'from-blue-500/20 to-blue-900/10 border-blue-500/30 text-blue-400',
    },
    {
      title: 'Support Systems Change Outcomes',
      tagline: 'Family & Peer Solidarity',
      description:
        'When parents, roommates, and educators replace blame with informed medical guidance, treatment completion rates jump significantly. No one should have to walk the journey alone.',
      icon: Users,
      color: 'from-emerald-500/20 to-emerald-900/10 border-emerald-500/30 text-emerald-400',
    },
  ]

  return (
    <section className="py-16 border-t border-slate-800/80 bg-[#060b19]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Why Awareness Matters</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Awareness Can Change a Life
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Every conversation about substance risks breaks down social stigma and empowers someone to choose health, safety, and a meaningful future.
          </p>
        </div>

        {/* 4 Core Qualitative Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon
            return (
              <div
                key={idx}
                className={`bg-gradient-to-b ${card.color} p-6 rounded-2xl border backdrop-blur-sm hover:scale-[1.02] transition-transform duration-200 flex flex-col justify-between`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    {card.tagline}
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Explicit Small Source & Verification Footer */}
        <div className="mt-10 p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-400 shrink-0" />
            <span>
              <strong>Scientific & Public Health Reference:</strong> Principles synthesized from National Drug Dependence Treatment Centre (NDDTC) AIIMS reports, Ministry of Social Justice & Empowerment guidelines, and Tamil Nadu Health Department mental health directives.
            </span>
          </div>
          <span className="text-teal-400/80 font-mono text-[11px] shrink-0">
            Verified Educational Data
          </span>
        </div>
      </div>
    </section>
  )
}
