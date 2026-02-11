# 🌿 Vyana: Intelligent Mental Wellness

Vyana is a data-driven, empathetic mental wellness platform designed to provide a personalized, calming experience. Unlike generic wellness apps, Vyana adapts its assessments and recommendations based on your real-time emotional state, providing a unique "Clarity" journey for every user.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.1-FF69B4?style=flat-square&logo=framer-motion)

---

## ✨ Key Features

### 1. **Adaptive Emotional Check-in**
Start your journey by selecting your current emotional state (e.g., *Overwhelmed, Burned Out, Hopeful, Lonely*). The entire application's logic pivots based on this selection to provide relevant support.

### 2. **Personalized Mental Health Assessments**
Dynamic questionnaires that change based on your mood. We use these inputs to calculate a multi-dimensional **Stress Profile** covering:
- **Cognitive State**
- **Stress Levels**
- **Behavioral Patterns**
- **Overall Wellbeing**

### 3. **AI-Powered Recommendation Engine**
A sophisticated backend matching engine that utilizes **Cosine Similarity** and **Euclidean Distance** to suggest:
- **📚 Curated Books:** Hand-picked literature that matches your emotional needs.
- **🎵 Dynamic Spotify Playlists:** Real-time music recommendations fetched via the Spotify API, filtered by energy, valence, and acousticness.

### 4. **Immersive Visualization**
Watch your mental state come to life through a generative "Bubble Visualization" that represents your emotional steadiness score and profile dimensions in a fluid, organic way.

### 5. **Breathing & Mindfulness**
A dedicated breathing intro and crisis intervention modal (`Crisis FAB`) provide immediate grounding techniques when things get tough.

---

## 🛠 Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Shadcn/UI](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **State Management:** [Zustand](https://docs.pmnd.rs/zustand/)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Visualization:** [Recharts](https://recharts.org/)
- **API Integration:** [Spotify Web API](https://developer.spotify.com/documentation/web-api)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm / pnpm / yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abhijeet-ist/Vyana.git
   cd Vyana
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env.local` file in the root directory and add your Spotify credentials:
   ```env
   NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_client_id
   NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=your_client_secret
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## 🧠 The ML Recommendation Logic

Vyana uses a custom **Weighted Similarity Engine** to ensure recommendations are scientifically relevant to your state:

- **Vector Mapping:** We map books and songs to a 3D coordinate system (Stress, Cognitive, Behavior).
- **Weighted Adjustments:** If a user is "Burned Out," the engine gives a 2x weight to "Stress Reduction" items.
- **Diversity Filtering:** Ensures that the top 3 recommendations are distinct in genre and mood to prevent content fatigue.

---

## 🎨 Design Philosophy

- **Serenity:** Use of sage greens, warm wheats, and soft lavenders to reduce ocular strain and promote calm.
- **Glassmorphism:** Translucent surfaces and blur effects create a sense of depth and focus.
- **Organic Motion:** Slow-timed transitions (400ms-700ms) mirror natural human breathing patterns.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Vyana was built with ❤️ for anyone navigating the complexities of the human mind.*