import React, { useState } from 'react'
import {
  FileText,
  Search,
  ExternalLink,
  Phone,
  Bookmark,
  ShieldCheck,
  Download,
  Filter,
} from 'lucide-react'
import { RESOURCES_DATA } from '../data/resourcesData'

export const ResourcesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const categories = [
    'All',
    'Official Helplines',
    'Student Guides',
    'Parental Support',
    'Clinical & Medical',
    'Policy & Law',
  ]

  const filteredResources = RESOURCES_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Top Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-bold uppercase tracking-wider">
          <Bookmark className="w-3.5 h-3.5" />
          <span>Verified Repository</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Educational Resources & Helplines
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Curated collection of official government advisories, clinical guidelines from NIMHANS, and youth support networks.
        </p>

        {/* Search & Category Filter */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources, helplines..."
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-teal-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-[#0b132b] rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-teal-500/40 transition-all shadow-lg group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30">
                  {res.badge}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {res.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors leading-snug">
                {res.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                {res.description}
              </p>

              <div className="pt-2 border-t border-slate-800/80">
                <p className="text-[11px] text-slate-400">
                  <strong className="text-slate-300">Authority:</strong> {res.source}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between">
              {res.isDirectCall ? (
                <a
                  href={`tel:${res.phoneOrLink}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 font-bold text-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Helpline ({res.phoneOrLink})</span>
                </a>
              ) : (
                <a
                  href={res.phoneOrLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors"
                >
                  <span>Open Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
