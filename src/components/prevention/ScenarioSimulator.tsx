import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import {
  HelpCircle,
  CheckCircle,
  XCircle,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Award,
  Users,
} from 'lucide-react'
import { PREVENTION_SCENARIOS } from '../../data/scenariosData'
import { PreventionScenario, ScenarioOption } from '../../types'

export const ScenarioSimulator: React.FC = () => {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState<ScenarioOption | null>(null)
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([])

  const currentScenario: PreventionScenario = PREVENTION_SCENARIOS[activeScenarioIdx]

  const handleSelectOption = (option: ScenarioOption) => {
    setSelectedOption(option)
    if (option.isRecommended && !completedScenarios.includes(activeScenarioIdx)) {
      setCompletedScenarios((prev) => [...prev, activeScenarioIdx])
      // Trigger subtle celebration confetti
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#0d9488', '#06b6d4', '#38bdf8', '#34d399'],
        })
      } catch (e) {
        // Fallback gracefully
      }
    }
  }

  const handleNextScenario = () => {
    setSelectedOption(null)
    if (activeScenarioIdx < PREVENTION_SCENARIOS.length - 1) {
      setActiveScenarioIdx((prev) => prev + 1)
    } else {
      setActiveScenarioIdx(0)
    }
  }

  const handleResetScenario = () => {
    setSelectedOption(null)
  }

  return (
    <div className="bg-[#0b132b] rounded-2xl border border-slate-800 p-5 sm:p-8 shadow-2xl space-y-6">
      {/* Top Banner & Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Decision Lab</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            “What Would You Do?” Scenario Challenge
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Test your real-world response to peer pressure, warning signs, and social dilemmas.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {PREVENTION_SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => {
                setActiveScenarioIdx(idx)
                setSelectedOption(null)
              }}
              className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                activeScenarioIdx === idx
                  ? 'bg-gradient-to-tr from-teal-500 to-cyan-400 text-slate-950 ring-2 ring-teal-400/50 shadow-md'
                  : completedScenarios.includes(idx)
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-900 text-slate-500 border border-slate-800 hover:text-slate-300'
              }`}
            >
              {completedScenarios.includes(idx) ? '✓' : idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Card */}
      <div className="bg-slate-900/60 rounded-xl p-5 border border-slate-800/80 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-teal-300 border border-slate-700">
            Target Audience: {currentScenario.audience}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Scenario {activeScenarioIdx + 1} of {PREVENTION_SCENARIOS.length}
          </span>
        </div>

        <h4 className="text-lg font-bold text-white tracking-tight">
          {currentScenario.title}
        </h4>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#080e22] p-4 rounded-xl border border-slate-800/70">
          <strong className="text-teal-400">Context: </strong>
          {currentScenario.context}
        </p>

        <p className="text-sm sm:text-base font-semibold text-slate-100 mt-2">
          {currentScenario.situation}
        </p>
      </div>

      {/* Choices Grid */}
      <div className="space-y-3">
        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          Select Your Course of Action:
        </h5>

        <div className="grid grid-cols-1 gap-3">
          {currentScenario.options.map((option, oIdx) => {
            const isSelected = selectedOption?.id === option.id

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 relative group flex items-start gap-3.5 ${
                  isSelected
                    ? option.isRecommended
                      ? 'bg-emerald-950/40 border-emerald-500/70 text-emerald-100 shadow-md shadow-emerald-950/50'
                      : 'bg-rose-950/40 border-rose-500/70 text-rose-100 shadow-md shadow-rose-950/50'
                    : 'bg-slate-900/80 hover:bg-slate-900 text-slate-200 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center font-bold text-xs transition-colors mt-0.5 ${
                    isSelected
                      ? option.isRecommended
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-rose-500 text-white'
                      : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                  }`}
                >
                  {String.fromCharCode(65 + oIdx)}
                </div>

                <div className="flex-1 text-sm font-medium leading-relaxed">
                  {option.text}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Result & Pedagogical Feedback */}
      {selectedOption && (
        <div
          className={`p-5 rounded-xl border animate-in fade-in-50 duration-300 ${
            selectedOption.isRecommended
              ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-100'
              : 'bg-rose-950/50 border-rose-500/50 text-rose-100'
          }`}
        >
          <div className="flex items-start gap-3">
            {selectedOption.isRecommended ? (
              <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            )}

            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm uppercase tracking-wider">
                  {selectedOption.isRecommended
                    ? 'Recommended Safe Choice'
                    : 'High Risk / Ineffective Choice'}
                </span>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed">
                <strong>Outcome: </strong>
                {selectedOption.outcome}
              </p>

              <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                <strong>Why this matters: </strong>
                {selectedOption.rationale}
              </p>

              {/* Skills Tags */}
              <div className="pt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-semibold opacity-80 mr-1">Skills Highlight:</span>
                {selectedOption.skillsTaught.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-black/30 border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Next Button */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              onClick={handleResetScenario}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/30 hover:bg-black/50 text-slate-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Try Another Choice</span>
            </button>
            <button
              onClick={handleNextScenario}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-950 hover:bg-slate-200 transition-colors shadow"
            >
              <span>Next Scenario</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
