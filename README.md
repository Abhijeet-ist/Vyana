# 🌿 Vyana: Intelligent Mental Wellness Ecosystem

Vyana is an advanced, data-driven mental wellness platform designed to provide a deeply personalized and empathetic user experience. By integrating real-time emotional tracking, AI-powered recommendations, and a Retrieval-Augmented Generation (RAG) chatbot, Vyana transforms the mental health journey into a proactive, "Clarity"-focused path.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi)

---

## 🚀 Core Features

### 1. Adaptive Emotional Intelligence
The platform begins with a sophisticated emotional check-in. Users select their current state—ranging from *Overwhelmed* to *Hopeful*—which instantly recalibrates the entire application's logic, UI themes, and support suggestions.

### 2. AI-Powered Chatbot (RAG System)
Vyana features a specialized mental health chatbot built on a **Retrieval-Augmented Generation (RAG)** architecture.
- **Contextual Awareness:** Uses specialized datasets to provide evidence-based support.
- **Hybrid Backend:** Leverages **Groq SDK** for ultra-fast LLM responses and **LangChain** for complex orchestration.
- **Knowledge Base:** Vectorized clinical and wellness data stored in **FAISS** for precise retrieval.

### 3. Smart Recommendation Engine
A multi-dimensional matching engine that utilizes vector similarity to suggest therapeutic content:
- **🎵 Dynamic Spotify Integration:** Real-time playlist generation based on energy, valence, and acousticness profiles.
- **📚 Curated Literature:** Book recommendations mapped to the user's specific cognitive and stress markers.
- **⚖️ Advanced Scoring:** Utilizes **Cosine Similarity** and **Weighted Euclidean Distance** with a 35-40% weight on profile matching.
- **📉 Confidence & Diversity:** Features a confidence scoring system based on assessment consistency and diversity injection to prevent content fatigue.

> For a deep dive into the mathematical models and datasets, see [ML_RECOMMENDATIONS.md](./ML_RECOMMENDATIONS.md).

### 4. Emotional Visualization
Interactive "Bubble Visualizations" translate abstract mental states into tangible, organic shapes. This allows users to track their **Emotional Steadiness Score** and observe shifts in their stress profiles over time.

### 5. Crisis & Grounding Tools
Immediate intervention modules including a `Crisis FAB` and guided breathing exercises designed to provide instant relief during high-stress moments.

---

## 📂 Project Structure

```text
Vyana/
├── app/                  # Next.js App Router (Frontend & API routes)
│   ├── api/              # Backend endpoints (Chat, Auth, Reflections)
│   ├── assessment/       # Dynamic wellness questionnaires
│   ├── chatbot/          # AI Chat interface
│   └── ...               # Functional modules (Mood, Settings, Resources)
├── components/           # Reusable UI components (Shadcn/UI + Custom)
│   ├── ui/               # Atomic UI elements
│   └── ...               # Layout & Feature components
├── lib/                  # Core logic and services
│   ├── rag/              # Python-based RAG service (FastAPI, LangChain)
│   ├── ml-recommendations.ts # Similarity matching logic
│   └── spotify-service.ts    # Spotify Web API integration
├── store/                # State management (Zustand)
├── public/               # Static assets and placeholders
└── styles/               # Global styling and Tailwind configurations
```

---

## 🛠 Tech Stack

### Frontend & Orchestration
- **Framework:** Next.js 15 (App Router)
- **State:** Zustand
- **Animations:** Framer Motion (Organic transitions)
- **Styling:** Tailwind CSS + Shadcn/UI
- **Forms:** React Hook Form + Zod

### Artificial Intelligence & ML
- **LLM Engine:** Groq (Llama-3 models)
- **Framework:** LangChain & FastAPI
- **Vector DB:** FAISS
- **Embeddings:** Sentence-Transformers (HuggingFace)
- **Logic:** Weighted Similarity (Cosine & Euclidean)

### Data & Backend
- **Database:** MongoDB (User data & reflections)
- **Auth:** Firebase Authentication
- **External APIs:** Spotify Web API

---

## 🛠 Installation & Setup

### 1. Prerequisites
- Node.js 18.x+
- Python 3.10+
- MongoDB instance
- Spotify Developer Account

### 2. Frontend Setup
```bash
git clone https://github.com/Abhijeet-ist/Vyana.git
cd Vyana
npm install
```

### 3. RAG Service Setup (Python)
```bash
cd lib/rag
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python api.py  # Starts the FastAPI server
```

### 4. Environment Variables
Create a `.env.local` in the root and add:
```env
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=...
NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=...
MONGODB_URI=...
GROQ_API_KEY=...
FIREBASE_CONFIG=...
```

---

## 🎨 Design Philosophy

Vyana follows a **Biophilic Design** approach:
- **Color Palette:** Sage greens, warm wheats, and soft lavenders to minimize cognitive load.
- **Glassmorphism:** Using depth and blur to maintain focus on primary actions.
- **Human-Centric Motion:** Animations are timed (400ms-700ms) to mirror natural human respiratory rhythms.

---

*Vyana: Harmonizing technology and empathy for a clearer mind.*
