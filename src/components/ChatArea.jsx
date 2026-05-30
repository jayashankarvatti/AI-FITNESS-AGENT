import ChatBubble from './ChatBubble'
import TypingIndicator from './TypingIndicator'

export default function ChatArea({ messages, isTyping, chatEndRef }) {
  return (
    <main className="chat-area" id="chat-area">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={chatEndRef} />
      </div>
    </main>
  )
}
