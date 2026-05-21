import { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import ChatArea from './components/ChatArea'
import ChatInput from './components/ChatInput'
import LandingPage from './components/LandingPage'

const WEBHOOK_URL = "https://hook.eu1.make.com/0dpy57gnnzcro9m0gk1r4b641jdc7w9y"

export default function App() {
  const [view, setView] = useState('landing') // 'landing' | 'chat'
  const [chatVisible, setChatVisible] = useState(false)

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! 💪 I'm your AI Fitness Assistant. Ask me anything about workouts, nutrition, recovery, or reaching your fitness goals. Let's get started!",
      sender: 'ai',
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleOpenChat = () => {
    setView('chat')
    setTimeout(() => setChatVisible(true), 20)
  }

  const handleSend = async (text) => {
    if (!text.trim() || isTyping) return

    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim() }),
      })

      const data = await response.text()
      console.log(data)

      const aiMessage = {
        id: Date.now() + 1,
        text: data,
        sender: 'ai',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error communicating with AI:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Sorry, I'm having trouble connecting right now. Please try again later.",
          sender: 'ai',
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  // Landing page
  if (view === 'landing') {
    return <LandingPage onOpen={handleOpenChat} />
  }

  // Chat interface with entrance animation
  return (
    <div className={`flex flex-col h-full bg-dark-900 ${chatVisible ? 'animate-chat-open' : 'opacity-0'}`}>
      <Header />
      <div className="flex-1 flex flex-col items-center min-h-0 w-full">
        <div className="flex flex-col flex-1 w-full max-w-2xl min-h-0">
          <ChatArea messages={messages} isTyping={isTyping} chatEndRef={chatEndRef} />
          <ChatInput onSend={handleSend} isTyping={isTyping} />
        </div>
      </div>
    </div>
  )
}
