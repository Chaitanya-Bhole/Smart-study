<div align="center">
  <h1>📚 Smart Study</h1>
  <p><strong>All-in-One Personalized Learning Platform — TSOC 2026</strong></p>
  <p>Empowers students from 10th grade to higher degrees with structured roadmaps, study trackers, and AI tools — <em>distraction-free.</em></p>
  
  <p>
    <a href="https://smart-study-1oax.bolt.host"><strong>🌐 Live Demo Website »</strong></a>
  </p>
</div>

---

## Live Application

🚀 **Live Link:** [https://smart-study-1oax.bolt.host](https://smart-study-1oax.bolt.host)

---

## Supported Academic Paths

| Stream / Level | Courses Covered | Theme | API Needed |
|---|---|---|---|
| High School (10th) | CBSE, SSC | 🟢 Green & White | ❌ Built-in |
| Junior College (12th) | CBSE, HSC | 🟢 Green & White | ❌ Built-in |
| Engineering Degrees | B.Tech, BE | 🟠 Orange & Black | ❌ Built-in |
| Computer Applications | BCA | 🟠 Orange & Black | ❌ Built-in |
| Commerce & Science | B.Com, B.Sc | 🟠 Orange & Black | ❌ Built-in |

---

## Features

### 🗺️ Built-in Academic Roadmaps
Complete step-by-step guidance for school and college degree paths. Embedded directly in the application code — **no external API dependencies required.**

### 📝 Personal Study Tracker & Notes
Write, edit, and manage your daily notes and academic progress.
- Filter by degree and subject.
- Automatically persisted in your browser so data is never lost.

### 📺 Distraction-Free YouTube Connector
A focused study search engine:
- Type any academic topic (e.g., *"12th Physics Chapter 1"*).
- Redirects or embeds refined educational search results directly without recommendation rabbit holes.

### 🤖 AI Doubt Solver (with Fallback)
Ask any study question instantly:
- Enter your own Gemini/Groq/OpenAI API key (saved locally).
- **Smart Fallback:** If no API key is provided, 1-click guidance cards let you search your query directly on Google or ChatGPT.

### 🎨 Dynamic Themes & Interactive UI
- **Netflix-Style Red & Black Landing Page:** Premium dark-mode UI with an interactive glowing star particle canvas that responds to your cursor.
- **Dedicated Sub-Page Themes:** Seamless full-screen transitions between green (10th/12th) and orange (degrees).

---

## Privacy & Storage

- **Local Persistence:** All your login sessions, custom notes, and API keys are stored locally on your device in `localStorage`.
- **Privacy First:** Password credentials and personal notes are never shared with external tracking servers.
- **Stateless Queries:** AI requests are handled client-side directly using your provided API keys.

---


## Setup & Installation (Local Execution)

To run this project on your local environment, run the following commands:

1. **Clone this repository:**
   ```bash
   git clone [https://github.com/your-username/smart-study.git](https://github.com/your-username/smart-study.git)
   cd smart-study
## Project Structure
├── index.html                                                                     
├── package.json                   
├── vite.config.ts        
├── tsconfig.json              
├── tsconfig.app.json            
├── tsconfig.node.json         
├── tailwind.config.js        
├── postcss.config.js            
├── eslint.config.js            
├── .gitignore                 
└── src/                  
├── main.tsx                 
├── App.tsx                  
├── index.css              
├── types.ts                 
├── vite-env.d.ts                 
├── components/              
│   ├── StarCursor.tsx                      
│   ├── AuthModal.tsx                         
│   ├── LandingPage.tsx                  
│   ├── CoursePage.tsx              
│   ├── StudyTracker.tsx                    
│   ├── YouTubeSearch.tsx             
│   └── AiDoubtSolver.tsx               
├── data/                            
│   └── roadmaps.ts                  
└── lib/                           
└── storage.ts             
                         
