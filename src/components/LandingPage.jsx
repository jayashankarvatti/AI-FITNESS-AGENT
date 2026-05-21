import { useState, useEffect } from 'react'

const SPEECH_MESSAGES = [
  "Need fitness guidance? 💪",
  "Ask me about workouts!",
  "Want exercise suggestions? 🏋️",
  "Need help reaching your goals?",
]

export default function LandingPage({ onOpen }) {
  const [msgIndex, setMsgIndex] = useState(0)
  const [fadeClass, setFadeClass] = useState('animate-bubble-in')
  const [hovered, setHovered] = useState(false)

  // Rotate speech bubble message every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass('animate-bubble-out')
      setTimeout(() => {
        setMsgIndex((i) => (i + 1) % SPEECH_MESSAGES.length)
        setFadeClass('animate-bubble-in')
      }, 400)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-dark-900">

      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-500/5 blur-3xl" />
      </div>

      {/* Grid lines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(108,99,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,99,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Center text content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-500/30 bg-accent-500/10 mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-flex" />
          <span className="text-xs font-medium text-accent-400 tracking-wide uppercase">AI-Powered • Available 24/7</span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight animate-fade-in mb-4" style={{ letterSpacing: '-0.02em' }}>
          AI Fitness{' '}
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #6c63ff 0%, #4fc3f7 100%)' }}>
            Assistant
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-text-secondary animate-fade-in-delay mb-5 font-light">
          Your personal AI-powered fitness coach available 24/7
        </p>

        <p className="text-sm text-text-muted animate-fade-in-delay-2 leading-relaxed max-w-lg mx-auto">
          Get workout guidance, exercise suggestions, fitness advice, and healthy lifestyle recommendations — instantly, anytime you need it.
        </p>

      </div>

      {/* AI Avatar — Bottom Right */}
      <div className="fixed bottom-8 right-8 z-20 flex flex-col items-end gap-3">

        {/* Speech Bubble */}
        <div
          key={msgIndex}
          className={`${fadeClass} relative bg-dark-700 border border-white/10 text-text-primary text-sm px-4 py-2.5 rounded-2xl rounded-br-sm shadow-xl max-w-[220px] text-right`}
        >
          {SPEECH_MESSAGES[msgIndex]}
          {/* Tail */}
          <span className="absolute -bottom-2 right-5 w-3 h-3 bg-dark-700 border-r border-b border-white/10 rotate-45" />
        </div>

        {/* Avatar Button */}
        <button
          onClick={onOpen}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label="Open AI Fitness Assistant"
          className={`
            animate-avatar-float
            ${hovered ? 'animate-neon-glow-strong scale-110' : 'animate-neon-glow scale-100'}
            w-20 h-20 rounded-full overflow-hidden border-2 border-blue-400/60
            transition-transform duration-300 cursor-pointer focus:outline-none
            flex items-center justify-center
          `}
          style={{
            background: 'radial-gradient(circle at 35% 35%, #1e3a5f, #0a1628)',
          }}
        >
          {/* AI Avatar face */}
          <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
            {/* Body/helmet */}
            <ellipse cx="40" cy="45" rx="26" ry="22" fill="#0d2137" />
            {/* Helmet visor frame */}
            <ellipse cx="40" cy="34" rx="23" ry="25" fill="#122d4a" />
            {/* Visor glass */}
            <ellipse cx="40" cy="33" rx="18" ry="20" fill="#0a1628" opacity="0.9"/>
            {/* Visor glow */}
            <ellipse cx="40" cy="33" rx="18" ry="20" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.7"/>
            {/* Eyes / HUD */}
            <ellipse cx="32" cy="32" rx="5" ry="4" fill="#3b82f6" opacity="0.9"/>
            <ellipse cx="48" cy="32" rx="5" ry="4" fill="#3b82f6" opacity="0.9"/>
            {/* Eye glow center */}
            <ellipse cx="32" cy="32" rx="2.5" ry="2" fill="#93c5fd"/>
            <ellipse cx="48" cy="32" rx="2.5" ry="2" fill="#93c5fd"/>
            {/* Nose indicator */}
            <line x1="40" y1="37" x2="40" y2="41" stroke="#3b82f6" strokeWidth="1" opacity="0.5"/>
            {/* Mouth / status bar */}
            <rect x="31" y="42" width="18" height="3" rx="1.5" fill="#1e40af" opacity="0.8"/>
            <rect x="31" y="42" width="10" height="3" rx="1.5" fill="#3b82f6" opacity="0.9"/>
            {/* Side accents */}
            <rect x="15" y="28" width="4" height="8" rx="2" fill="#1e3a5f"/>
            <rect x="61" y="28" width="4" height="8" rx="2" fill="#1e3a5f"/>
            <line x1="17" y1="32" x2="17" y2="32" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
            <line x1="63" y1="32" x2="63" y2="32" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
            {/* Top antenna */}
            <line x1="40" y1="9" x2="40" y2="18" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6"/>
            <circle cx="40" cy="8" r="2.5" fill="#3b82f6" opacity="0.8"/>
          </svg>
        </button>
      </div>

      {/* Feature chips */}
      <div className="relative z-10 flex flex-wrap justify-center gap-3 mt-14 px-6 animate-fade-in-delay-2">
        {['🏋️ Workout Plans', '🥗 Nutrition Tips', '💤 Recovery', '📈 Progress Tracking'].map((chip) => (
          <span
            key={chip}
            className="px-4 py-2 rounded-full text-xs font-medium text-text-secondary bg-dark-700 border border-white/[0.06]"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  )
}
