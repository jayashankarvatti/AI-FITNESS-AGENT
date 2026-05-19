export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3 animate-message-in">
      {/* AI avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-accent-500 to-accent-400 flex items-center justify-center mr-2.5 mt-1">
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>

      <div className="bg-dark-600 rounded-2xl rounded-bl-md border border-white/[0.04] px-5 py-3.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="typing-dot w-2 h-2 rounded-full bg-accent-400 inline-block"></span>
            <span className="typing-dot w-2 h-2 rounded-full bg-accent-400 inline-block"></span>
            <span className="typing-dot w-2 h-2 rounded-full bg-accent-400 inline-block"></span>
          </div>
          <span className="text-xs text-text-muted ml-1">AI is thinking...</span>
        </div>
      </div>
    </div>
  )
}
