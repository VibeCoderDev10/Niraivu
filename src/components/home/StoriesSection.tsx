import React from 'react'
import { Quote, Sparkles, MapPin, Heart, ArrowRight } from 'lucide-react'
import { ILLUSTRATIVE_STORIES } from '../../data/resourcesData'

export const StoriesSection: React.FC = () => {
  return (
    <section className="py-16 border-t border-slate-800/80 bg-[#080e22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real Voices of Resilience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Every Conversation Can Be a Turning Point
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            These composite narratives reflect the real emotional courage of individuals and families who overcame substance abuse in Tamil Nadu.
          </p>
          <div className="inline-block mt-3 bg-slate-900 px-3 py-1 rounded-md border border-slate-800 text-[11px] text-amber-400/90 font-medium">
            ⚠️ <strong>Notice:</strong> Clear illustrative stories compiled for educational and de-stigmatization purposes.
          </div>
        </div>

        {/* 3 Story Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ILLUSTRATIVE_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-[#0b132b] rounded-2xl border border-slate-800 p-6 sm:p-7 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-teal-500/40 transition-colors"
            >
              {/* Top Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30">
                  Illustrative Story
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{story.location}</span>
                </span>
              </div>

              {/* Story Content */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {story.title}
                </h3>

                <p className="text-xs font-semibold text-slate-400">
                  {story.personName} • {story.ageGroup}
                </p>

                <div className="text-xs text-slate-300 space-y-2 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <p>
                    <strong className="text-slate-200">The Challenge:</strong> {story.background}
                  </p>
                  <p>
                    <strong className="text-teal-400">The Turning Point:</strong> {story.turningPoint}
                  </p>
                  <p>
                    <strong className="text-emerald-400">Recovery:</strong> {story.recoveryJourney}
                  </p>
                </div>
              </div>

              {/* Quote & Lesson */}
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <p className="text-xs italic text-teal-200 font-medium leading-relaxed">
                  {story.lesson}
                </p>
                <p className="text-[11px] text-slate-400 mt-2 font-semibold flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span>{story.currentStatus}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
