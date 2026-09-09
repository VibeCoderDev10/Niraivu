import React, { useState } from 'react'
import { Sparkles, X, MessageSquareHeart } from 'lucide-react'
import { ChatInterface } from './ChatInterface'

export const FloatingChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group flex items-center gap-2.5 px-4 py-3 rounded-full font-bold text-sm shadow-2xl transition-all duration-300 active:scale-95 ${
            isOpen
              ? 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700'
              : 'bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 text-slate-950 shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-105'
          }`}
          aria-label="Open NIRA AI Assistant"
        >
          {isOpen ? (
            <>
              <X className="w-5 h-5 text-slate-300" />
              <span>Close NIRA</span>
            </>
          ) : (
            <>
              <div className="relative">
                <Sparkles className="w-5 h-5 text-slate-950 animate-pulse" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>
              <span className="tracking-tight font-extrabold">Ask NIRA AI</span>
            </>
          )}
        </button>
      </div>

      {/* Floating Popup Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[420px] z-50 shadow-2xl shadow-black/80 rounded-2xl border border-teal-500/40 overflow-hidden animate-in slide-in-from-bottom-6 duration-300">
          <ChatInterface isStandalonePage={false} />
        </div>
      )}
    </>
  )
}
