# 🏋️ FitAI – Personalized AI Fitness Assistant

FitAI is an AI-powered fitness assistant that provides personalized workout, nutrition, and lifestyle recommendations through an interactive chatbot. Unlike traditional fitness applications that offer generic advice, FitAI first collects essential user information and then generates customized guidance based on the individual's profile and fitness goals.

## 🚀 Project Overview

The goal of FitAI is to make personalized fitness coaching accessible to everyone by leveraging Artificial Intelligence and modern web technologies. The application interacts with users through a conversational interface, gathers relevant information such as age, gender, height, weight, activity level, fitness experience, dietary preferences, and fitness goals, and then produces tailored recommendations.

This project demonstrates the integration of frontend development, workflow automation, and Large Language Models (LLMs) to build a real-world AI-powered application.

---

## ✨ Key Features

* 🤖 AI-powered conversational fitness chatbot
* 📋 Guided assessment before generating recommendations
* 🎯 Personalized workout and diet plans
* 🥗 Lifestyle and nutrition suggestions
* 💬 Multi-line chat input with dedicated Send button
* 📱 Fully responsive design for desktop, tablet, and mobile
* ⚡ Real-time AI-generated responses
* ☁️ Cloud-hosted and accessible through the web

---

## 🛠️ Technology Stack

| Category        | Technology          |
| --------------- | ------------------- |
| Frontend        | React.js, Vite, CSS |
| Automation      | Make.com            |
| AI Engine       | Groq API            |
| LLM             | Llama 3.3 70B       |
| Deployment      | Netlify             |
| Version Control | Git, GitHub         |

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │        User          │
                    └──────────┬───────────┘
                               │
                               ▼
                 ┌──────────────────────────┐
                 │   React + Vite Frontend  │
                 │      (FitAI Chat UI)     │
                 └──────────┬───────────────┘
                            │
                            ▼
                 ┌──────────────────────────┐
                 │   Assessment Workflow     │
                 │ Collect User Information  │
                 └──────────┬───────────────┘
                            │
                            ▼
                 ┌──────────────────────────┐
                 │     Make.com Webhook      │
                 └──────────┬───────────────┘
                            │
                            ▼
                 ┌──────────────────────────┐
                 │       Groq API           │
                 │   Llama 3.3 70B Model    │
                 └──────────┬───────────────┘
                            │
                            ▼
                 ┌──────────────────────────┐
                 │ Personalized AI Response │
                 └──────────┬───────────────┘
                            │
                            ▼
                 ┌──────────────────────────┐
                 │  Response Shown in Chat  │
                 └──────────────────────────┘
```

---

# 🔄 Complete Workflow

### Step 1 – User Starts Conversation

The user enters a fitness-related goal such as:

* "I want to reduce belly fat."
* "Help me gain muscle."
* "Create a weight loss plan."

---

### Step 2 – Assessment Begins

Instead of immediately generating a response, FitAI asks follow-up questions to collect:

* Gender
* Age
* Height
* Weight
* Activity Level
* Fitness Experience
* Dietary Preference

This ensures recommendations are personalized rather than generic.

---

### Step 3 – Build Structured User Profile

After collecting all required information, FitAI compiles a structured profile containing:

* User Goal
* Physical Information
* Lifestyle Details
* Fitness Background
* Dietary Preferences

---

### Step 4 – Send Request to Make.com

The frontend sends the structured request to a Make.com webhook, which acts as the orchestration layer between the application and the AI model.

---

### Step 5 – AI Processing

Make.com forwards the request to the Groq API using the Llama 3.3 70B language model. The AI analyzes the complete user profile and generates personalized fitness guidance.

---

### Step 6 – Generate Recommendations

The AI creates customized outputs, including:

* Workout recommendations
* Diet suggestions
* Lifestyle improvements
* General fitness guidance

---

### Step 7 – Display Response

The generated response is returned to the frontend and displayed through the chatbot interface in real time.

---

# 📂 Project Structure

```text
FitAI/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── package.json
├── vite.config.js
└── README.md
```

---

# 🌟 Highlights

* Personalized AI recommendations instead of generic advice
* Interactive assessment-driven conversation flow
* Responsive design across all devices
* Real-time AI responses using Groq
* End-to-end integration with Make.com automation
* Cloud deployment through Netlify

---

# 🔮 Future Improvements

* User authentication
* Conversation memory
* Progress tracking dashboard
* BMI and calorie calculator
* Workout scheduler
* Diet analytics
* Voice interaction
* Fitness progress visualization

---

# 👨‍💻 Author

**Jayashankar Vatti**

Developed as an AI-powered fitness assistant project demonstrating practical skills in React development, workflow automation, API integration, cloud deployment, and Large Language Model (LLM) applications.

---

## 📜 License

This project is intended for educational, learning, and demonstration purposes. Feel free to explore and build upon it with appropriate attribution.
