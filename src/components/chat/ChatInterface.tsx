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
  RefreshCw,
} from 'lucide-react'
import { ChatMessage } from '../../types'
import { generateNiraResponse } from '../../services/niraAiService'

interface ChatInterfaceProps {
  initialPrompt?: string
  isStandalonePage?: boolean
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  initialPrompt,
  isStandalonePage = true,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Vanakkam! I am **NIRA**, your confidential awareness and support guide for **Drug-Free Tamil Nadu**.

I’m here to provide non-judgmental information on substance abuse risks, evidence-based prevention strategies, how to support friends or family, and locating verified de-addiction centers across Tamil Nadu.

*How can I support you today?*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'How can I help a friend who may be using drugs?',
        'I feel pressured by my friends. What should I do?',
        'Find rehabilitation centers near me.',
        'What are signs that someone may need help?',
        'What should I do in an emergency?',
        'Can you explain the effects of drug abuse?',
      ],
    },
  ])

  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
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

    setMessages((prev) => [...prev, newUserMessage])
    setInput('')
    setIsTyping(true)

    try {
      // Simulate realistic streaming delay
      const response = await generateNiraResponse(messageContent, messages)

      setTimeout(() => {
        const assistantMessageId = `assistant-${Date.now()}`
        const newAssistantMessage: ChatMessage = {
          id: assistantMessageId,
          role: 'assistant',
          content: response.content,
          isEmergency: response.isEmergency,
          suggestions: response.suggestions,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }

        setMessages((prev) => [...prev, newAssistantMessage])
        setIsTyping(false)
      }, 700)
    } catch (error) {
      setIsTyping(false)
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content:
          'I apologize, but I encountered a momentary connection glitch. If you are facing an urgent emergency, please call **108** (Tamil Nadu Ambulance) or **14446** (Tele-MANAS) right away.',
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
        content: `Chat session refreshed. How can I assist you with drug awareness, prevention, or recovery support today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          'How can I help a friend who may be using drugs?',
          'Find rehabilitation centers near me.',
          'What are signs that someone may need help?',
        ],
      },
    ])
  }

  return (
    <div
      className={`flex flex-col bg-[#0b132b] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden ${
        isStandalonePage ? 'h-[calc(88vh-80px)] min-h-[580px]' : 'h-[500px]'
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-slate-800/90 backdrop-blur-md">
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
              <h2 className="text-base font-bold text-white tracking-tight">NIRA Assistant</h2>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30">
                Confidential Guide
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Awareness • Prevention • Tamil Nadu Care
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClearChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors border border-slate-800"
            title="Clear current conversation"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((message) => {
          const isUser = message.role === 'user'

          return (
            <div
              key={message.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-2`}
            >
              <div
                className={`flex gap-3 max-w-[90%] sm:max-w-[82%] ${
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
                  {/* Emergency Banner inside bubble if detected */}
                  {message.isEmergency && (
                    <div className="mb-3 p-2.5 rounded-lg bg-rose-900/60 border border-rose-500/40 flex items-start gap-2.5">
                      <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white text-xs uppercase tracking-wider">
                          Urgent Medical Alert Detected
                        </p>
                        <p className="text-[11px] text-rose-200">
                          If someone is unconscious or struggling to breathe, do not wait. Call emergency services immediately.
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

                  {/* Message Content Rendered */}
                  <div className="whitespace-pre-wrap space-y-2 font-normal">
                    {message.content}
                  </div>

                  {/* Message Meta & Action */}
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
                        className="flex items-center gap-1 hover:text-white transition-colors"
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

              {/* Prompt suggestions if assistant attached them */}
              {!isUser && message.suggestions && message.suggestions.length > 0 && (
                <div className="ml-11 flex flex-wrap gap-1.5 pt-1 max-w-[85%]">
                  {message.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(suggestion)}
                      className="text-xs bg-slate-900/80 hover:bg-teal-950 hover:text-teal-300 hover:border-teal-500/40 text-slate-300 px-3 py-1.5 rounded-full border border-slate-800 transition-all active:scale-95"
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
              <span className="text-xs text-teal-400 font-medium mr-1">NIRA is thinking</span>
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
            placeholder="Ask anything confidentially... (e.g. 'How can I help a friend who may be using drugs?')"
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 resize-none px-2 py-1.5 focus:outline-none max-h-24"
          />

          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 hover:from-teal-400 hover:to-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md shadow-teal-500/20 active:scale-95"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Disclaimer Footer */}
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 px-1">
          <div className="flex items-center gap-1.5">
            <Info className="w-3 h-3 text-teal-400/80" />
            <span>Confidential educational guidance • In emergency, call 108</span>
          </div>
          <span className="hidden sm:inline text-teal-400/60 font-mono text-[10px]">
            Demo NLP Engine Active
          </span>
        </div>
      </div>
    </div>
  )
}
