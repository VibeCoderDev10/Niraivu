import React, { useState, useRef, useEffect } from 'react'
import {
  Sparkles,
  Send,
  Trash2,
  Copy,
  Check,
  AlertTriangle,
  PhoneCall,
  Info,
  User,
  Bot,
  Settings,
  X,
  Key,
  ExternalLink,
  MapPin,
  Activity,
  BookOpen,
  ArrowRight,
} from 'lucide-react'
import { ChatMessage } from '../../types'
import { generateNiraResponse } from '../../services/niraAiService'

interface ChatInterfaceProps {
  initialPrompt?: string
  isStandalonePage?: boolean
}

/**
 * Inline markdown parser supporting [label](url), **bold**, *italic*, and phone calls
 */
const renderInlineTokens = (text: string, onNavigate: (route: string) => void) => {
  const parts: React.ReactNode[] = []
  const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }

    if (match[1]) {
      // Markdown link: match[2] is label, match[3] is url
      const label = match[2]
      const url = match[3]

      if (url.startsWith('#')) {
        const route = url.replace('#', '')
        parts.push(
          <button
            key={match.index}
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onNavigate(route)
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 mx-1 my-0.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/35 text-teal-200 border border-teal-500/40 text-xs font-semibold shadow-sm transition-all hover:scale-[1.02] active:scale-95 cursor-pointer text-left"
          >
            <span>{label}</span>
            <ExternalLink className="w-3 h-3 text-teal-300 shrink-0" />
          </button>
        )
      } else if (url.startsWith('tel:')) {
        parts.push(
          <a
            key={match.index}
            href={url}
            className="inline-flex items-center gap-1 px-2 py-0.5 mx-1 my-0.5 rounded-md bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 text-xs font-bold transition-all"
          >
            <PhoneCall className="w-3 h-3 text-rose-300" />
            <span>{label}</span>
          </a>
        )
      } else {
        parts.push(
          <a
            key={match.index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 underline font-medium"
          >
            <span>{label}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )
      }
    } else if (match[4]) {
      // Bold: match[5]
      parts.push(
        <strong key={match.index} className="font-bold text-white">
          {match[5]}
        </strong>
      )
    } else if (match[6]) {
      // Italic: match[7]
      parts.push(
        <em key={match.index} className="italic text-slate-300">
          {match[7]}
        </em>
      )
    }

    lastIndex = tokenRegex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return parts
}

/**
 * Structured markdown message formatter for rich AI responses
 */
const FormattedMessage: React.FC<{ content: string; onNavigate: (route: string) => void }> = ({
  content,
  onNavigate,
}) => {
  const lines = content.split('\n')

  return (
    <div className="space-y-1.5 leading-relaxed text-sm">
      {lines.map((line, idx) => {
        const trimmed = line.trim()
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />
        }

        // Horizontal Divider
        if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
          return <hr key={idx} className="border-slate-800/80 my-2.5" />
        }

        // Heading ### or ## or #
        if (trimmed.startsWith('### ')) {
          return (
            <h4
              key={idx}
              className="text-sm font-bold text-teal-300 pt-2 pb-0.5 border-b border-slate-800/80 flex items-center gap-1.5"
            >
              <span>{trimmed.replace(/^###\s+/, '')}</span>
            </h4>
          )
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h3
              key={idx}
              className="text-base font-extrabold text-cyan-300 pt-2.5 pb-1 border-b border-slate-800"
            >
              {trimmed.replace(/^##\s+/, '')}
            </h3>
          )
        }

        // Bullet points
        if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const bulletContent = trimmed.replace(/^([•*-]\s+)/, '')
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0 mt-2"></span>
              <div className="flex-1 text-slate-200">
                {renderInlineTokens(bulletContent, onNavigate)}
              </div>
            </div>
          )
        }

        // Numbered list
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/)
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 py-0.5">
              <span className="text-xs font-bold text-teal-400 shrink-0 mt-0.5 font-mono">
                {numMatch[1]}.
              </span>
              <div className="flex-1 text-slate-200">
                {renderInlineTokens(numMatch[2], onNavigate)}
              </div>
            </div>
          )
        }

        // Regular paragraph
        return (
          <p key={idx} className="text-slate-200">
            {renderInlineTokens(line, onNavigate)}
          </p>
        )
      })}
    </div>
  )
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  initialPrompt,
  isStandalonePage = true,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Vanakkam! I'm **NIRA** 👋 

Think of me as a safe, confidential guide for a **Drug-Free Tamil Nadu**. I am deeply integrated with all resources on this website:
• **[🗺️ Interactive Rehab Map & GPS Locator](#find-help)**: Calculates exact driving distance in km to 12 verified Tamil Nadu hospitals
• **[🧪 What Would You Do? Scenario Lab](#prevention)**: Real-time refusal practice with the CLEAR framework
• **[📚 Substance Profiles & Science](#learn)**: Clinical facts and neurobiology without the hype
• **24/7 Helplines**: Free Tele-MANAS (14446) & Emergency Ambulance (108)

How are things going today? How can I support you?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'Find nearest rehab centers in Tamil Nadu',
        'Show verified de-addiction centers data',
        'How can I help a friend who may be using drugs?',
        'I feel pressured by my friends. What should I do?',
        'What are the 24/7 emergency helplines?',
      ],
    },
  ])

  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [apiKeyInput, setApiKeyInput] = useState(
    localStorage.getItem('nira_gemini_api_key') || ''
  )
  const [isLiveAiActive, setIsLiveAiActive] = useState(
    Boolean(localStorage.getItem('nira_gemini_api_key') || import.meta.env.VITE_AI_API_KEY)
  )

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Process initial prompt if passed
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim() !== '') {
      handleSendMessage(initialPrompt)
    }
  }, [initialPrompt])

  const handleNavigate = (route: string) => {
    window.location.hash = route
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSaveApiKey = () => {
    if (apiKeyInput.trim()) {
      localStorage.setItem('nira_gemini_api_key', apiKeyInput.trim())
      setIsLiveAiActive(true)
    } else {
      localStorage.removeItem('nira_gemini_api_key')
      setIsLiveAiActive(false)
    }
    setShowSettings(false)
  }

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim()
    if (!messageContent || isTyping) return

    const userMessageId = `user-${Date.now()}`
    const newUserMessage: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    const updatedHistory = [...messages, newUserMessage]
    setMessages(updatedHistory)
    setInput('')
    setIsTyping(true)

    try {
      const assistantMessageId = `assistant-${Date.now()}`

      // Pass full conversation history and live streaming callback
      const response = await generateNiraResponse(
        messageContent,
        updatedHistory,
        (streamedText) => {
          setMessages((prev) => {
            const exists = prev.some((m) => m.id === assistantMessageId)
            if (exists) {
              return prev.map((m) =>
                m.id === assistantMessageId ? { ...m, content: streamedText } : m
              )
            } else {
              return [
                ...prev,
                {
                  id: assistantMessageId,
                  role: 'assistant',
                  content: streamedText,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
              ]
            }
          })
        }
      )

      // Finalize the response with suggestions and emergency flags immediately
      setMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== assistantMessageId)
        return [
          ...filtered,
          {
            id: assistantMessageId,
            role: 'assistant',
            content: response.content,
            isEmergency: response.isEmergency,
            suggestions: response.suggestions,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]
      })
      setIsTyping(false)
    } catch (error) {
      setIsTyping(false)
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content:
          'I apologize, but I had a momentary connection glitch. If this is an urgent crisis, please call **108** (Tamil Nadu Ambulance) or **14446** (Tele-MANAS) right away.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, errorMessage])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: `reset-${Date.now()}`,
        role: 'assistant',
        content: `Chat session refreshed. What would you like to talk about today? I'm right here with full website resources.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          'Find nearest rehab centers in Tamil Nadu',
          'Show verified de-addiction centers data',
          'How can I help a friend who may be using drugs?',
          'I feel pressured by my friends. What should I do?',
        ],
      },
    ])
  }

  return (
    <div
      className={`flex flex-col bg-[#0b132b] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden ${
        isStandalonePage ? 'h-[calc(88vh-80px)] min-h-[520px] sm:min-h-[580px]' : 'h-[500px]'
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 bg-slate-900/90 border-b border-slate-800/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 via-cyan-400 to-blue-500 p-0.5 flex items-center justify-center shadow-md shadow-teal-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-teal-300 animate-pulse" />
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                NIRA Assistant
              </h2>
              <span
                className={`text-[9px] sm:text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${
                  isLiveAiActive
                    ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/40'
                    : 'bg-teal-500/10 text-teal-400 border-teal-500/30'
                }`}
              >
                {isLiveAiActive ? 'Live Gemini 3.5 AI' : 'Trained Conversational Model'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Grounded Support & Tamil Nadu Resource Guide
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors border border-slate-800 flex items-center gap-1.5 cursor-pointer"
            title="Configure AI Model or API Key"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden md:inline">AI Config</span>
          </button>

          <button
            onClick={handleClearChat}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors border border-slate-800 cursor-pointer"
            title="Clear current conversation"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* AI Settings Overlay Drawer */}
      {showSettings && (
        <div className="bg-slate-900 border-b border-slate-800 p-4 animate-in slide-in-from-top-3 duration-200 text-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold">
              <Key className="w-4 h-4 text-teal-400" />
              <span>AI Engine Configuration</span>
            </div>
            <button
              onClick={() => setShowSettings(false)}
              className="p-1 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-slate-400 leading-relaxed">
            NIRA is grounded with verified Tamil Nadu hospitals, official helplines (108, 14446), and website tools. You can customize the Google Gemini API Key below:
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="Paste Google Gemini API Key"
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-teal-400 font-mono text-xs"
            />
            <button
              onClick={handleSaveApiKey}
              className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow cursor-pointer"
            >
              Save & Apply
            </button>
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((message) => {
          const isUser = message.role === 'user'

          // Contextual action checks
          const mentionsRehab =
            !isUser &&
            (message.content.includes('#find-help') ||
              message.content.toLowerCase().includes('rehab') ||
              message.content.toLowerCase().includes('hospital') ||
              message.content.toLowerCase().includes('center') ||
              message.content.toLowerCase().includes('locator') ||
              message.content.toLowerCase().includes('kilpauk') ||
              message.content.toLowerCase().includes('ttk'))

          const mentionsPrevention =
            !isUser &&
            (message.content.includes('#prevention') ||
              message.content.toLowerCase().includes('clear') ||
              message.content.toLowerCase().includes('scenario') ||
              message.content.toLowerCase().includes('peer pressure') ||
              message.content.toLowerCase().includes('say no'))

          const mentionsLearn =
            !isUser &&
            (message.content.includes('#learn') ||
              message.content.toLowerCase().includes('dopamine') ||
              message.content.toLowerCase().includes('substance') ||
              message.content.toLowerCase().includes('myth'))

          return (
            <div
              key={message.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-2`}
            >
              <div
                className={`flex gap-3 max-w-[94%] sm:max-w-[85%] ${
                  isUser ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                    isUser
                      ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/30'
                      : 'bg-slate-800 text-teal-300 border border-teal-500/30'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble */}
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed transition-all shadow-md ${
                    isUser
                      ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-tr-none'
                      : message.isEmergency
                      ? 'bg-rose-950/80 border border-rose-500/50 text-rose-100 rounded-tl-none shadow-rose-950/40'
                      : 'bg-slate-900/90 text-slate-100 border border-slate-800 rounded-tl-none'
                  }`}
                >
                  {/* Emergency Alert Header inside bubble */}
                  {message.isEmergency && (
                    <div className="mb-3 p-2.5 rounded-lg bg-rose-900/60 border border-rose-500/40 flex items-start gap-2.5">
                      <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white text-xs uppercase tracking-wider">
                          Urgent Medical Alert
                        </p>
                        <p className="text-[11px] text-rose-200">
                          If someone is unconscious or struggling to breathe, do not wait. Call emergency medical dispatch right away.
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <a
                            href="tel:108"
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded shadow"
                          >
                            <PhoneCall className="w-3 h-3" />
                            <span>Dial 108</span>
                          </a>
                          <a
                            href="tel:14446"
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-medium rounded border border-slate-700"
                          >
                            <span>Tele-MANAS: 14446</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Formatted Content */}
                  {isUser ? (
                    <div className="whitespace-pre-wrap font-normal text-white">{message.content}</div>
                  ) : (
                    <FormattedMessage content={message.content} onNavigate={handleNavigate} />
                  )}

                  {/* Contextual Smart Action Badges */}
                  {!isUser && (mentionsRehab || mentionsPrevention || mentionsLearn) && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap gap-2">
                      {mentionsRehab && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleNavigate('find-help')}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                          >
                            <MapPin className="w-3.5 h-3.5 text-teal-400" />
                            <span>Open Rehab Map & GPS Locator</span>
                            <ArrowRight className="w-3 h-3 text-teal-400/80" />
                          </button>
                          <a
                            href="tel:14446"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium transition-all shadow-sm"
                          >
                            <PhoneCall className="w-3 h-3 text-teal-400" />
                            <span>Call Tele-MANAS (14446)</span>
                          </a>
                        </>
                      )}
                      {mentionsPrevention && (
                        <button
                          type="button"
                          onClick={() => handleNavigate('prevention')}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                        >
                          <Activity className="w-3.5 h-3.5 text-purple-400" />
                          <span>Try Refusal Scenario Simulator</span>
                          <ArrowRight className="w-3 h-3 text-purple-400/80" />
                        </button>
                      )}
                      {mentionsLearn && (
                        <button
                          type="button"
                          onClick={() => handleNavigate('learn')}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                          <span>Explore Substance Profiles</span>
                          <ArrowRight className="w-3 h-3 text-blue-400/80" />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Timestamp & Copy */}
                  <div
                    className={`mt-2 pt-1.5 flex items-center justify-between text-[11px] border-t ${
                      isUser
                        ? 'border-teal-400/30 text-teal-100/80'
                        : 'border-slate-800 text-slate-400'
                    }`}
                  >
                    <span>{message.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleCopy(message.content, message.id)}
                        className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                        title="Copy message"
                      >
                        {copiedId === message.id ? (
                          <>
                            <Check className="w-3 h-3 text-teal-400" />
                            <span className="text-teal-400 text-[10px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="text-[10px]">Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Follow-up Chips */}
              {!isUser && message.suggestions && message.suggestions.length > 0 && (
                <div className="ml-11 flex flex-wrap gap-1.5 pt-1 max-w-[88%]">
                  {message.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(suggestion)}
                      className="text-xs bg-slate-900/80 hover:bg-teal-950 hover:text-teal-300 hover:border-teal-500/40 text-slate-300 px-3 py-1.5 rounded-full border border-slate-800 transition-all active:scale-95 cursor-pointer"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-teal-500/30 flex items-center justify-center text-teal-300">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none px-4 py-2.5 flex items-center gap-1.5">
              <span className="text-xs text-teal-400 font-medium mr-1">NIRA is typing</span>
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 sm:p-4 bg-slate-900/90 border-t border-slate-800/90">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="relative flex items-end gap-2 bg-slate-950 rounded-xl border border-slate-800 p-2 focus-within:border-teal-500/70 focus-within:ring-1 focus-within:ring-teal-500/50 transition-all"
        >
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything... (e.g. 'find me nearest rehab' or 'how to handle peer pressure')"
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 resize-none px-2 py-1.5 focus:outline-none max-h-24"
          />

          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 hover:from-teal-400 hover:to-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md shadow-teal-500/20 active:scale-95 cursor-pointer"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Disclaimer Footer */}
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 px-1">
          <div className="flex items-center gap-1.5">
            <Info className="w-3 h-3 text-teal-400/80" />
            <span>Confidential awareness guide • In emergency, call 108</span>
          </div>
          <span className="hidden sm:inline text-teal-400/60 font-mono text-[10px]">
            {isLiveAiActive ? 'Gemini 3.5 Flash Connected' : 'Trained Conversational Model'}
          </span>
        </div>
      </div>
    </div>
  )
}

