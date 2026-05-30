export default function TypingIndicator() {
  return (
    <div className="msg-row msg-row--ai animate-message-in">
      {/* AI avatar */}
      <div
        className="msg-avatar"
        style={{ background: 'linear-gradient(135deg, var(--color-accent-500), var(--color-accent-400))' }}
      >
        <svg
          style={{ width: 16, height: 16, color: '#fff' }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>

      {/* Typing bubble */}
      <div className="msg-bubble msg-bubble--ai" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', gap: 4 }}>
          <span className="typing-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-accent-400)', display: 'inline-block' }} />
          <span className="typing-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-accent-400)', display: 'inline-block' }} />
          <span className="typing-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-accent-400)', display: 'inline-block' }} />
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginLeft: 4 }}>AI is thinking…</span>
      </div>
    </div>
  )
}
