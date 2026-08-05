# 🌸 Anime & Sakura-Themed Interactive Portfolio

A visually stunning, interactive, and story-driven **Anime & Sakura-themed Portfolio** built with **React 19**, **Vite**, **GSAP**, and **TailwindCSS**. 

Featuring custom parallax scroll mechanics, canvas-rendered cherry blossom (Sakura) physics, ambient background sound, dynamic custom cursor glow, glassmorphism UI components, and rich interactive sections.

---

## ✨ Features

- 🌸 **Sakura Particle Engine**: Custom HTML5 Canvas particle system rendering floating cherry blossom petals with realistic wind and floating physics.
- 🖼️ **Parallax Scrolling**: Multi-layered background parallax driven by **GSAP ScrollTrigger**, dynamically adjusting zoom, position, and atmosphere based on scroll depth.
- 🏃 **Animated Avatar Sprite**: Animated character sprite walking through scenic Japanese landscapes as you scroll.
- 🎵 **Ambient Audio Toggle**: Integrated ambient music control with a dynamic HTML5 Audio / Web Audio API synthesizer fallback.
- ✨ **Custom Anime Cursor Glow**: Smooth, desktop-optimized glowing pointer trailing interactive elements.
- 🛠️ **Gamified Skills Section**: Interactive skill cards with mastery progress bars, filters, and element tags (⚡ Code, 🌊 Design, 🔥 Tools).
- 📂 **Project Showcase & Modal**: Interactive project cards with detail modal popups, tech tags, live links, and repository access.
- 🗺️ **Quest Timeline (Journey Map)**: Storybook timeline mapping out career milestones, education, and side quests.
- ✉️ **Interactive Contact Shrine**: Anime-styled contact form with interactive inputs and direct social links.
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile screens.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [JavaScript (ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Animations**: [GSAP 3](https://greensock.com/gsap/) (`ScrollTrigger`, `@gsap/react`)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/), Glassmorphism CSS design system
- **Icons & Graphics**: Custom SVG illustrations, SVG sprites, canvas graphics

---

## 📁 Directory Structure

```text
portfolio-animated/
├── public/                  # Static assets (character sprites, backgrounds, audio)
│   ├── boy-stand.png
│   ├── boy-walk.png
│   ├── japan-scene.png
│   ├── sakura-bg.png
│   └── icons.svg
├── src/
│   ├── assets/              # SVGs and static visual assets
│   ├── components/
│   │   ├── sections/        # Main section components
│   │   │   ├── HeroSection.jsx
│   │   │   ├── AboutSection.jsx
│   │   │   ├── SkillsSection.jsx
│   │   │   ├── ProjectsSection.jsx
│   │   │   ├── TimelineSection.jsx
│   │   │   └── ContactSection.jsx
│   │   ├── ui/              # Interactive UI widgets & overlays
│   │   │   ├── AudioToggle.jsx
│   │   │   ├── CursorGlow.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   ├── ProjectModal.jsx
│   │   │   └── ScrollProgress.jsx
│   │   ├── ParallaxScene.jsx # Fixed parallax layered canvas/scene
│   │   └── PetalSystem.jsx   # HTML5 Canvas Sakura petal physics
│   ├── App.jsx              # Main App entry with scroll listener & navigation
│   ├── index.css            # Base Tailwind & custom CSS variables/animations
│   └── main.jsx             # React DOM root render
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- `npm` or `yarn` / `pnpm`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Akchhansh/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

To preview the built application locally:

```bash
npm run preview
```

---

## 🎨 Customization

- **Personal Information & Data**: Update content within `src/components/sections/` (`AboutSection.jsx`, `ProjectsSection.jsx`, `SkillsSection.jsx`, `TimelineSection.jsx`, `ContactSection.jsx`).
- **Styling & Colors**: Modify theme tokens and glassmorphic utility styles in `src/index.css`.
- **Character / Visual Assets**: Replace image files in `public/` (e.g., `boy-stand.png`, `boy-walk.png`, `japan-scene.png`).

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
