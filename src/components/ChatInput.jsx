import { useState } from 'react'

export default function ChatInput({ onSend, isTyping }) {
  const [text, setText] = useState('')

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

  return (
    <footer className="shrink-0 border-t border-white/[0.06] bg-dark-800/80 backdrop-blur-md px-5 py-3">
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2.5"
        id="chat-form"
      >
        <div className="relative flex-1">
          <textarea
            id="chat-input"
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isTyping ? 'Wait for AI response...' : 'Ask about workouts, nutrition, recovery...'}
            disabled={isTyping}
            className="w-full resize-none rounded-xl bg-dark-700 border border-white/[0.06] text-sm text-text-primary placeholder:text-text-muted px-4 py-3 pr-4 focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed max-h-32 overflow-y-auto"
            style={{ minHeight: '46px' }}
          />
        </div>

        <button
          type="submit"
          id="send-button"
          disabled={!text.trim() || isTyping}
          className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-accent-500 to-accent-400 text-white hover:from-accent-400 hover:to-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/50 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:from-accent-500 disabled:hover:to-accent-400 shadow-lg shadow-accent-500/20 active:scale-95"
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
