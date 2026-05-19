import ChatBubble from './ChatBubble'
import TypingIndicator from './TypingIndicator'

export default function ChatArea({ messages, isTyping, chatEndRef }) {
  return (
    <main className="flex-1 overflow-y-auto px-5 py-6" id="chat-area">
      <div className="w-full space-y-1">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={chatEndRef} />
      </div>
    </main>
  )
}
