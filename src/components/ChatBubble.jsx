export default function ChatBubble({ message }) {
  const isUser = message.sender === 'user'

  const time = message.timestamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div
      className={`flex animate-message-in ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
    >
      {/* AI avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-accent-500 to-accent-400 flex items-center justify-center mr-2.5 mt-1">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      )}

      <div className={`max-w-[85%] ${isUser ? 'order-1' : ''}`}>
        {/* Bubble */}
        <div
          className={`
            px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words
            ${
              isUser
                ? 'bg-gradient-to-br from-accent-500 to-accent-400 text-white rounded-2xl rounded-br-md shadow-lg shadow-accent-500/20'
                : 'bg-dark-600 text-text-primary rounded-2xl rounded-bl-md border border-white/[0.04]'
            }
          `}
        >
          {message.text}
        </div>

        {/* Timestamp */}
        <p
          className={`text-[10px] text-text-muted mt-1 px-1 ${
            isUser ? 'text-right' : 'text-left'
          }`}
        >
          {time}
        </p>
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-dark-500 border border-white/10 flex items-center justify-center ml-2.5 mt-1">
          <svg className="w-4 h-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      )}
    </div>
  )
}
