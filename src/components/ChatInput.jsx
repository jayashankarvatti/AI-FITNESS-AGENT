import { useState, useEffect, useRef } from 'react'

export default function ChatInput({ onSend, isTyping, assessmentMode, placeholder }) {
  const [text, setText] = useState('')
  const textareaRef = useRef(null)

  // Auto-focus when entering assessment mode so user can type immediately
  useEffect(() => {
    if (assessmentMode) {
      textareaRef.current?.focus()
    }
  }, [assessmentMode, placeholder])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim() || isTyping) return
    onSend(text)
    setText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  // Determine placeholder text
  const inputPlaceholder = isTyping
    ? 'Wait for AI response…'
    : assessmentMode && placeholder
    ? placeholder
    : 'Ask about workouts, nutrition, or tell me your fitness goal…'

  return (
    <footer className="shrink-0 border-t border-white/[0.06] bg-dark-800/80 backdrop-blur-md px-5 py-3">

      {/* Assessment mode hint bar */}
      {assessmentMode && (
        <div className="animate-assessment-hint flex items-center gap-2 mb-3 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-400/20">
          <svg className="w-3.5 h-3.5 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
          <p className="text-[11px] text-amber-300/90 leading-snug">
            <span className="font-semibold">Assessment in progress</span> — answer each question to receive your personalized plan.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end gap-2.5" id="chat-form">
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            id="chat-input"
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={inputPlaceholder}
            disabled={isTyping}
            className={`
              w-full resize-none rounded-xl text-sm text-text-primary placeholder:text-text-muted
              px-4 py-3 pr-4 focus:outline-none focus:ring-2 transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed max-h-32 overflow-y-auto
              ${assessmentMode
                ? 'bg-dark-700 border border-amber-400/30 focus:ring-amber-400/40 focus:border-amber-400/50'
                : 'bg-dark-700 border border-white/[0.06] focus:ring-accent-500/50 focus:border-accent-500/50'
              }
            `}
            style={{ minHeight: '46px' }}
          />
        </div>

        <button
          type="submit"
          id="send-button"
          disabled={!text.trim() || isTyping}
          className={`
            flex items-center justify-center w-11 h-11 rounded-xl text-white
            focus:outline-none focus:ring-2 transition-all duration-200
            disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 shadow-lg
            ${assessmentMode
              ? 'bg-gradient-to-br from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 focus:ring-amber-400/50 shadow-amber-500/20'
              : 'bg-gradient-to-br from-accent-500 to-accent-400 hover:from-accent-400 hover:to-accent-500 focus:ring-accent-500/50 shadow-accent-500/20 disabled:hover:from-accent-500 disabled:hover:to-accent-400'
            }
          `}
          aria-label="Send message"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </form>

      <p className="text-center text-[10px] text-text-muted/60 mt-2">
        FitAI may not always be accurate. Consult a professional for medical advice.
      </p>
    </footer>
  )
}
