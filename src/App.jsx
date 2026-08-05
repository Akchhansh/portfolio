import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import ParallaxScene from './components/ParallaxScene'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import SkillsSection from './components/sections/SkillsSection'
import ProjectsSection from './components/sections/ProjectsSection'
import TimelineSection from './components/sections/TimelineSection'
import ContactSection from './components/sections/ContactSection'
import CursorGlow from './components/ui/CursorGlow'
import AudioToggle from './components/ui/AudioToggle'
import ScrollProgress from './components/ui/ScrollProgress'
import LoadingScreen from './components/ui/LoadingScreen'

gsap.registerPlugin(ScrollTrigger)

// Nav items
const NAV_ITEMS = [
  { id: 'hero', label: '🏠' },
  { id: 'about', label: '🌱' },
  { id: 'skills', label: '🏮' },
  { id: 'projects', label: '🛠' },
  { id: 'timeline', label: '🗺️' },
  { id: 'contact', label: '🌙' },
]

function FloatingNav({ activeSection }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav style={{
      position: 'fixed',
      right: 24,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 500,
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      background: 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(20px)',
      borderRadius: 50,
      padding: '12px 6px',
      border: '1.5px solid rgba(255,255,255,0.9)',
      boxShadow: '0 8px 32px rgba(247,198,217,0.4), 0 2px 8px rgba(0,0,0,0.08)',
    }}>
      {NAV_ITEMS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          title={id}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: 'none',
            background: activeSection === id
              ? 'linear-gradient(135deg, #f7c6d9, #cdb4db)'
              : 'transparent',
            fontSize: '1rem',
            cursor: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            transform: activeSection === id ? 'scale(1.2)' : 'scale(1)',
            boxShadow: activeSection === id
              ? '0 4px 12px rgba(247,198,217,0.6)'
              : 'none',
          }}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const totalHeight = document.body.scrollHeight - window.innerHeight

    const onScroll = () => {
      const progress = Math.min(window.scrollY / totalHeight, 1)
      setScrollProgress(progress)

      // Detect active section
      const sections = ['hero', 'about', 'skills', 'projects', 'timeline', 'contact']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight * 0.5) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // Recalculate on resize
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Update scroll progress after content loads
  useEffect(() => {
    const timer = setTimeout(() => {
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const progress = Math.min(window.scrollY / totalHeight, 1)
      setScrollProgress(progress)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Custom cursor (desktop only) */}
      <CursorGlow />

      {/* Fixed parallax background scene */}
      <ParallaxScene scrollProgress={scrollProgress} />

      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Audio toggle */}
      <AudioToggle />

      {/* Floating nav */}
      <FloatingNav activeSection={activeSection} />

      {/* Scroll content */}
      <main style={{ position: 'relative', zIndex: 5 }}>
        {/* Subtle frosted backdrop for readability in story sections */}
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(255,249,239,0.15)',
          backdropFilter: 'blur(0px)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TimelineSection />
        <ContactSection />
      </main>
    </>
  )
}
