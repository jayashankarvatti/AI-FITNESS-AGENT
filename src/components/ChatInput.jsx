import { useState, useEffect, useRef } from 'react'

export default function ChatInput({ onSend, isTyping, assessmentMode, placeholder }) {
  const [text, setText] = useState('')
  const textareaRef = useRef(null)

  // Auto-focus when entering assessment mode
  useEffect(() => {
    if (assessmentMode) {
      textareaRef.current?.focus()
    }
  }, [assessmentMode, placeholder])

  // Auto-resize textarea as content grows
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 160) + 'px'
  }, [text])

  const handleSendClick = () => {
    if (!text.trim() || isTyping) return
    onSend(text)
    setText('')
    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  // Enter = new line only (no submit on keypress)
  const handleKeyDown = (e) => {
    // Intentionally do nothing on Enter — just let the browser insert a newline
    // Only block Shift+Enter since it's redundant; plain Enter already creates a new line naturally
  }

  const inputPlaceholder = isTyping
    ? 'Wait for AI response…'
    : assessmentMode && placeholder
    ? placeholder
    : 'Ask about workouts, nutrition, or tell me your fitness goal…'

  return (
    <footer className="chat-footer">

      {/* Assessment hint bar */}
      {assessmentMode && (
        <div className="assessment-hint-bar animate-assessment-hint">
          <svg
            style={{ width: 14, height: 14, color: '#fbbf24', flexShrink: 0 }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
          <p>
            <strong>Assessment in progress</strong> — answer each question to receive your personalized plan.
          </p>
        </div>
      )}

      {/* Use div instead of form to prevent any accidental Enter-key submission */}
      <div className="chat-footer__form" id="chat-form">

        {/* Textarea — Enter creates new line, no keyboard-send */}
        <textarea
          ref={textareaRef}
          id="chat-input"
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={inputPlaceholder}
          disabled={isTyping}
          className={`chat-footer__textarea ${
            assessmentMode
              ? 'chat-footer__textarea--assessment'
              : 'chat-footer__textarea--normal'
          }`}
        />

        {/* Send button — only way to submit */}
        <button
          type="button"
          id="send-button"
          onClick={handleSendClick}
          disabled={!text.trim() || isTyping}
          aria-label="Send message"
          className={`chat-footer__send ${
            assessmentMode
              ? 'chat-footer__send--assessment'
              : 'chat-footer__send--normal'
          }`}
        >
          <svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>

      </div>

      <p className="chat-footer__hint">
        FitAI may not always be accurate. Consult a professional for medical advice.
      </p>
    </footer>
  )
}
