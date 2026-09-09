import React, { useState, useEffect } from 'react'
import { Sparkles, Menu, X, Shield, HeartHandshake, Compass, BookOpen, Users, Info } from 'lucide-react'

interface NavbarProps {
  currentRoute: string
  onNavigate: (route: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { id: 'home', label: 'Home', icon: Shield },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'prevention', label: 'Prevention', icon: HeartHandshake },
    { id: 'find-help', label: 'Find Help', icon: Compass },
    { id: 'resources', label: 'Resources', icon: Users },
    { id: 'about', label: 'About', icon: Info },
  ]

  const handleLinkClick = (route: string) => {
    onNavigate(route)
    setIsMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080e22]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/20 py-3'
          : 'bg-[#080e22]/70 backdrop-blur-md border-b border-slate-800/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 p-0.5 shadow-md shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-shadow">
            <div className="w-full h-full bg-[#0a1128] rounded-[10px] flex items-center justify-center">
              <span className="text-xl font-black bg-gradient-to-tr from-teal-400 to-cyan-300 bg-clip-text text-transparent">
                ந
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-teal-300 transition-colors">
                NIRAIVU
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/30 px-1.5 py-0.5 rounded">
                TN
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-wide font-medium">
              Awareness • Prevention • Recovery
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-full border border-slate-800">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = currentRoute === link.id
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleLinkClick('chat')}
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm text-slate-900 bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-400 bg-size-200 hover:bg-right transition-all duration-300 shadow-md shadow-teal-500/25 hover:shadow-lg hover:shadow-teal-500/40 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-teal-900 group-hover:rotate-12 transition-transform duration-300" />
            <span>Talk to NIRA</span>
            <span className="font-mono text-xs opacity-75">→</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => handleLinkClick('chat')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-teal-400 text-slate-950"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>NIRA</span>
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0a1128]/95 border-b border-slate-800 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = currentRoute === link.id
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </button>
            )
          })}
          <div className="pt-2">
            <button
              onClick={() => handleLinkClick('chat')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-300 shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Talk to NIRA AI</span>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
