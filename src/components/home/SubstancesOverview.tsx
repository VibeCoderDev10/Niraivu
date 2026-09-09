import React, { useState } from 'react'
import {
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Shield,
  HeartPulse,
  Brain,
  HelpCircle,
  Eye,
  Activity,
} from 'lucide-react'
import { SUBSTANCES_DATA } from '../../data/substancesData'
import { SubstanceInfo } from '../../types'
import { Modal } from '../common/Modal'

interface SubstancesOverviewProps {
  onNavigate?: (route: string) => void
}

export const SubstancesOverview: React.FC<SubstancesOverviewProps> = ({ onNavigate }) => {
  const [selectedSubstance, setSelectedSubstance] = useState<SubstanceInfo | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const filteredList = SUBSTANCES_DATA

  return (
    <section className="py-16 border-t border-slate-800/80 bg-[#080e22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-semibold uppercase tracking-wider mb-2">
              <Brain className="w-3.5 h-3.5" />
              <span>Know What You’re Facing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Substance Classifications & Risks
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
              Understand the biological mechanisms, physical warning signs, and severe risks associated with various substance categories without sensationalism.
            </p>
          </div>

          {onNavigate && (
            <button
              onClick={() => onNavigate('learn')}
              className="inline-flex items-center gap-2 text-sm font-bold text-teal-400 hover:text-teal-300 transition-colors"
            >
              <span>Explore Complete Clinical Guide</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Substances Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredList.map((substance) => {
            const isCritical = substance.riskLevel === 'Critical'
            const isVeryHigh = substance.riskLevel === 'Very High'

            return (
              <div
                key={substance.id}
                className="bg-[#0b132b] rounded-2xl border border-slate-800 hover:border-teal-500/40 p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-lg group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        isCritical
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          : isVeryHigh
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-teal-500/10 text-teal-400 border-teal-500/30'
                      }`}
                    >
                      {substance.riskLevel} Risk
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {substance.categoryName.split('/')[0]}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors mb-2">
                    {substance.name}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                    {substance.description}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    <p className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                      Key Warning Signs:
                    </p>
                    <ul className="text-xs text-slate-400 space-y-1">
                      {substance.physicalSigns.slice(0, 2).map((sign, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-teal-400 text-xs mt-0.5">•</span>
                          <span className="line-clamp-1">{sign}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSubstance(substance)}
                  className="w-full mt-2 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-200 bg-slate-900 hover:bg-teal-500/20 hover:text-teal-300 border border-slate-700 hover:border-teal-500/40 transition-all flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>View Complete Profile</span>
                </button>
              </div>
            )
          })}
        </div>

        {/* Detailed Substance Modal */}
        {selectedSubstance && (
          <Modal
            isOpen={!!selectedSubstance}
            onClose={() => setSelectedSubstance(null)}
            title={`${selectedSubstance.name} — Clinical & Risk Profile`}
            maxWidth="max-w-3xl"
          >
            <div className="space-y-6 text-slate-200">
              {/* Category & Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-slate-800 text-teal-300 border border-teal-500/30">
                  {selectedSubstance.categoryName}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-rose-500/10 text-rose-400 border border-rose-500/30">
                  Severity: {selectedSubstance.riskLevel}
                </span>
              </div>

              {/* Tagline & Overview */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <p className="text-xs text-teal-300 font-semibold uppercase tracking-wider mb-1">
                  Summary:
                </p>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {selectedSubstance.description}
                </p>
              </div>

              {/* Grid of Signs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Physical Signs */}
                <div className="bg-[#091024] p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2.5 flex items-center gap-1.5">
                    <Activity className="w-4 h-4" />
                    <span>Physical Warning Signs</span>
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-2">
                    {selectedSubstance.physicalSigns.map((sign, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-teal-400 font-bold">•</span>
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Psychological Signs */}
                <div className="bg-[#091024] p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2.5 flex items-center gap-1.5">
                    <Brain className="w-4 h-4" />
                    <span>Behavioral & Mental Signs</span>
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-2">
                    {selectedSubstance.psychologicalSigns.map((sign, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Long-term Health Risks */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Long-Term Biological & Neurological Risks</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedSubstance.healthRisks.map((risk, idx) => (
                    <div
                      key={idx}
                      className="text-xs bg-rose-950/20 text-rose-200 border border-rose-500/20 p-2.5 rounded-lg flex items-start gap-2"
                    >
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{risk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Triggers */}
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-100">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-rose-300 mb-2 flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-rose-400" />
                  <span>When to Call Emergency Services (108 Immediately):</span>
                </h4>
                <ul className="text-xs space-y-1.5">
                  {selectedSubstance.emergencyTriggers.map((trig, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">!</span>
                      <span>{trig}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Myths vs Facts */}
              {selectedSubstance.myths.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-teal-400" />
                    <span>Common Misconceptions Debunked</span>
                  </h4>
                  <div className="space-y-3">
                    {selectedSubstance.myths.map((m, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5"
                      >
                        <p className="text-rose-300 font-semibold">
                          ❌ <strong>Myth:</strong> “{m.myth}”
                        </p>
                        <p className="text-emerald-300 font-medium">
                          ✓ <strong>Fact:</strong> {m.fact}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedSubstance(null)}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </section>
  )
}
