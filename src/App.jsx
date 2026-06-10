import { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import ChatArea from './components/ChatArea'
import ChatInput from './components/ChatInput'

const WEBHOOK_URL = "https://hook.eu1.make.com/0dpy57gnnzcro9m0gk1r4b641jdc7w9y"

// ---------------------------------------------------------------------------
// Goal detection — keywords that trigger Assessment Mode
// ---------------------------------------------------------------------------
const GOAL_TRIGGERS = [
  'lose weight', 'weight loss', 'reduce belly', 'belly fat', 'burn fat',
  'gain muscle', 'build muscle', 'muscle gain', 'gain weight', 'weight gain',
  'diet plan', 'meal plan', 'nutrition plan',
  'six pack', 'six-pack', 'abs', 'six pack abs',
  'improve stamina', 'stamina', 'endurance',
  'improve fitness', 'overall fitness', 'get fit', 'get in shape',
  'workout plan', 'workout routine', 'exercise plan', 'fitness plan',
  'lose fat', 'fat loss', 'slim down', 'tone up',
]

function isGoalRequest(text) {
  const lower = text.toLowerCase()
  return GOAL_TRIGGERS.some((kw) => lower.includes(kw))
}

// ---------------------------------------------------------------------------
// Assessment steps — each step has a key, question, and placeholder hint
// ---------------------------------------------------------------------------
const ASSESSMENT_STEPS = [
  {
    key: 'gender',
    question: '👤 What is your gender? *(Male / Female / Other)*',
    placeholder: 'e.g. Male, Female, Other…',
  },
  {
    key: 'age',
    question: '🎂 How old are you?',
    placeholder: 'e.g. 25',
  },
  {
    key: 'height',
    question: '📏 What is your height? *(e.g. 5\'10" or 178 cm)*',
    placeholder: 'e.g. 5\'10" or 178 cm',
  },
  {
    key: 'weight',
    question: '⚖️ What is your current weight? *(e.g. 75 kg or 165 lbs)*',
    placeholder: 'e.g. 75 kg or 165 lbs',
  },
  {
    key: 'activityLevel',
    question:
      '🏃 How active are you currently?\n\n• Sedentary – little or no exercise\n• Lightly Active – light exercise 1–3 days/week\n• Moderately Active – moderate exercise 3–5 days/week\n• Very Active – hard exercise 6–7 days/week\n• Extremely Active – very hard exercise & physical job',
    placeholder: 'e.g. Sedentary, Lightly Active, Moderately Active…',
  },
  {
    key: 'fitnessExperience',
    question:
      '💪 What is your fitness experience level?\n\n• Beginner – just starting out\n• Intermediate – training for 6+ months\n• Advanced – training for 2+ years',
    placeholder: 'e.g. Beginner, Intermediate, Advanced',
  },
  {
    key: 'dietaryPreference',
    question:
      '🥗 What is your dietary preference?\n\n• Vegetarian\n• Non-Vegetarian\n• Vegan\n• Eggetarian\n• No preference',
    placeholder: 'e.g. Vegetarian, Non-Vegetarian, Vegan…',
  },
]

// ---------------------------------------------------------------------------
// Build the structured prompt sent to the Make.com webhook
// ---------------------------------------------------------------------------
function buildStructuredPrompt(goal, answers) {
  return `Please create a detailed, personalized fitness plan based on the following user profile:

**User Goal:** ${goal}
**Gender:** ${answers.gender}
**Age:** ${answers.age}
**Height:** ${answers.height}
**Weight:** ${answers.weight}
**Activity Level:** ${answers.activityLevel}
**Fitness Experience:** ${answers.fitnessExperience}
**Dietary Preference:** ${answers.dietaryPreference}

Please provide a comprehensive plan including workout routine, diet recommendations, and lifestyle tips tailored specifically to this user's profile and goal.`
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
export default function App() {
  // Chat messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! 💪 I'm your AI Fitness Assistant. Ask me anything about workouts, nutrition, recovery, or tell me your fitness goal to get a personalized plan!",
      sender: 'ai',
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)

  // Assessment Mode state
  const [assessmentMode, setAssessmentMode] = useState(false)
  const [assessmentGoal, setAssessmentGoal] = useState('')
  const [assessmentStep, setAssessmentStep] = useState(0)
  const [assessmentAnswers, setAssessmentAnswers] = useState({})

  const chatEndRef = useRef(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Add an AI message to the chat
  const addAiMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), text, sender: 'ai', timestamp: new Date() },
    ])
  }

  // Call the Make.com webhook and display the response
  const callWebhook = async (messageText) => {
    setIsTyping(true)
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      })
      const data = await response.text()
      addAiMessage(data)
    } catch (error) {
      console.error('Error communicating with AI:', error)
      addAiMessage("Sorry, I'm having trouble connecting right now. Please try again later.")
    } finally {
      setIsTyping(false)
    }
  }

  // Main send handler — preserves line breaks from multi-line input
  const handleSend = async (text) => {
    if (!text.trim() || isTyping) return

    // Trim leading/trailing whitespace but keep internal newlines intact
    const cleanText = text.replace(/^\s+|\s+$/g, '')

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: cleanText, sender: 'user', timestamp: new Date() },
    ])

    // --- ASSESSMENT MODE: collect answers step-by-step ---
    if (assessmentMode) {
      const currentStep = ASSESSMENT_STEPS[assessmentStep]
      const updatedAnswers = { ...assessmentAnswers, [currentStep.key]: cleanText }
      setAssessmentAnswers(updatedAnswers)

      const nextStep = assessmentStep + 1

      if (nextStep < ASSESSMENT_STEPS.length) {
        setAssessmentStep(nextStep)
        const nextQ = ASSESSMENT_STEPS[nextStep]
        setTimeout(() => addAiMessage(nextQ.question), 400)
      } else {
        setAssessmentMode(false)
        setAssessmentStep(0)
        setAssessmentAnswers({})

        const structuredPrompt = buildStructuredPrompt(assessmentGoal, updatedAnswers)

        setTimeout(() => {
          addAiMessage(
            "✅ Perfect! I've collected all the information I need. Generating your personalized fitness plan now — this may take a moment… 🚀"
          )
          callWebhook(structuredPrompt)
        }, 400)
      }
      return
    }

    // --- NORMAL MODE: check if goal-oriented ---
    if (isGoalRequest(cleanText)) {
      setAssessmentGoal(cleanText)
      setAssessmentMode(true)
      setAssessmentStep(0)
      setAssessmentAnswers({})

      setTimeout(() => {
        addAiMessage(
          `🎯 Great goal! To build a personalized plan just for you, I need to ask a few quick questions.\n\nLet's start — ${ASSESSMENT_STEPS[0].question}`
        )
      }, 400)
      return
    }

    // --- NORMAL MODE: general question → webhook ---
    callWebhook(cleanText)
  }

  const currentPlaceholder = assessmentMode
    ? ASSESSMENT_STEPS[assessmentStep]?.placeholder
    : undefined

  // Chat is shown immediately — no landing page
  return (
    <div
      className="animate-chat-open"
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--color-dark-900)' }}
    >
      <Header
        assessmentMode={assessmentMode}
        assessmentStep={assessmentStep}
        totalSteps={ASSESSMENT_STEPS.length}
      />

      {/* Centred column — expands to fill remaining height */}
      <div style={{ flex: '1 1 0%', display: 'flex', flexDirection: 'column', minHeight: 0, alignItems: 'center' }}>
        <div className="chat-column">
          <ChatArea messages={messages} isTyping={isTyping} chatEndRef={chatEndRef} />
          <ChatInput
            onSend={handleSend}
            isTyping={isTyping}
            assessmentMode={assessmentMode}
            placeholder={currentPlaceholder}
          />
        </div>
      </div>
    </div>
  )
}
