import React, { useState, useEffect } from 'react'
import { EmergencyBanner } from './components/common/EmergencyBanner'
import { Navbar } from './components/common/Navbar'
import { Footer } from './components/common/Footer'
import { FloatingChatButton } from './components/chat/FloatingChatButton'
import { HomePage } from './pages/HomePage'
import { LearnPage } from './pages/LearnPage'
import { PreventionPage } from './pages/PreventionPage'
import { FindHelpPage } from './pages/FindHelpPage'
import { ChatPage } from './pages/ChatPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { AboutPage } from './pages/AboutPage'

export function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('home')

  // Listen to hash changes if user navigates via direct links or browser back
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (['home', 'learn', 'prevention', 'find-help', 'chat', 'resources', 'about'].includes(hash)) {
        setCurrentRoute(hash)
      }
    }

    if (window.location.hash) {
      handleHashChange()
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleNavigate = (route: string) => {
    setCurrentRoute(route)
    window.location.hash = route
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderActivePage = () => {
    switch (currentRoute) {
      case 'learn':
        return <LearnPage />
      case 'prevention':
        return <PreventionPage />
      case 'find-help':
        return <FindHelpPage />
      case 'chat':
        return <ChatPage />
      case 'resources':
        return <ResourcesPage />
      case 'about':
        return <AboutPage />
      case 'home':
      default:
        return <HomePage onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#080e22] text-slate-100 selection:bg-teal-500 selection:text-white font-sans">
      {/* 24/7 Top Emergency Banner */}
      <EmergencyBanner />

      {/* Sticky Glassmorphic Navbar */}
      <Navbar currentRoute={currentRoute} onNavigate={handleNavigate} />

      {/* Main Page Content */}
      <main className="flex-1">{renderActivePage()}</main>

      {/* Persistent Floating NIRA AI Assistant Button */}
      <FloatingChatButton />

      {/* Structured Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  )
}

export default App
