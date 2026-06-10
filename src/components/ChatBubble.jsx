// Render text with newline support and basic **bold** markdown
function renderText(text) {
  return text.split('\n').map((line, lineIdx, arr) => {
    // Split on **bold** markers
    const parts = line.split(/(\*\*[^*]+\*\*)/g)
    const rendered = parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>
      }
      // Replace *italic* single-star markers used as bullet hints
      if (part.startsWith('*(') || part.startsWith('* ')) {
        return <span key={i} style={{ color: 'rgba(252,211,77,0.75)', fontSize: '0.8em' }}>{part}</span>
      }
      return part
    })
    return (
      <span key={lineIdx}>
        {rendered}
        {lineIdx < arr.length - 1 && <br />}
      </span>
    )
  })
}

export default function ChatBubble({ message }) {
  const isUser = message.sender === 'user'

  const time = message.timestamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className={`msg-row animate-message-in ${isUser ? 'msg-row--user' : 'msg-row--ai'}`}>

      {/* AI avatar — left side */}
      {!isUser && (
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
      )}

      {/* Bubble + timestamp column */}
      <div className="msg-col">
        <div className={`msg-bubble ${isUser ? 'msg-bubble--user' : 'msg-bubble--ai'}`}>
          {renderText(message.text)}
        </div>
        <p className={`msg-time ${isUser ? 'msg-time--user' : 'msg-time--ai'}`}>
          {time}
        </p>
      </div>

      {/* User avatar — right side */}
      {isUser && (
        <div
          className="msg-avatar"
          style={{
            background: 'var(--color-dark-500)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <svg
            style={{ width: 16, height: 16, color: 'var(--color-text-secondary)' }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      )}
    </div>
  )
}
