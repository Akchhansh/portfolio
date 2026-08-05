import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const aboutCards = [
  {
    emoji: '🌱',
    title: 'Where it began',
    text: 'Started with curiosity at 14 — wrote my first Python script and never looked back. What began as tinkering became a genuine obsession with how things work.',
  },
  {
    emoji: '💻',
    title: 'Fell in love with code',
    text: 'From automating boring tasks to building AI assistants, I discovered that code is the closest thing to magic. Every bug fixed is a lesson, every project a story.',
  },
  {
    emoji: '🚀',
    title: 'Building the future',
    text: 'Now I\'m turning that passion into real-world projects — data pipelines, ML models, and web experiences that solve actual problems and spark genuine delight.',
  },
]

export default function AboutSection() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from('.about-card', {
      opacity: 0,
      y: 60,
      scale: 0.92,
      stagger: 0.2,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reset',
      },
    })

    gsap.from('.about-heading', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reset',
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="about"
      className="story-section"
      style={{
        minHeight: '100vh',
        position: 'relative',
        zIndex: 10,
        paddingTop: 100,
        paddingBottom: 100,
      }}
    >
      <div className="section-content">
        {/* Heading */}
        <div className="about-heading" style={{ textAlign: 'center', marginBottom: 60 }}>
          <p style={{ color: '#e9d5ff', fontFamily: 'var(--font-script)', fontSize: '1.3rem', marginBottom: 8, textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
            歩み始める — The boy starts walking…
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #f3e8ff, #d8b4fe, #f7c6d9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.4))',
          }}>
            About Me
          </h2>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 28,
        }}>
          {aboutCards.map((card, i) => (
            <div
              key={i}
              className="clay-card about-card"
              style={{
                animation: `floatSlow ${5 + i * 0.7}s ease-in-out infinite ${i * 0.3}s`,
                background: i === 1
                  ? 'rgba(247,198,217,0.85)'
                  : i === 2
                    ? 'rgba(205,180,219,0.85)'
                    : 'rgba(255,255,255,0.92)',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>{card.emoji}</div>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                fontWeight: 900,
                color: '#111827',
                marginBottom: 12,
              }}>
                {card.title}
              </h3>
              <p style={{ color: '#374151', lineHeight: 1.75, fontSize: '0.97rem', fontWeight: 500 }}>
                {card.text}
              </p>
            </div>
          ))}
        </div>

        {/* Fun stats row */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(20px, 4vw, 60px)',
          marginTop: 60,
          flexWrap: 'wrap',
        }}>
          {[
            { value: '3+', label: 'Years Coding' },
            { value: '10+', label: 'Projects Built' },
            { value: '∞', label: 'Curiosity' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #f3e8ff, #d8b4fe, #f7c6d9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.4))',
              }}>{s.value}</div>
              <div style={{ color: '#e2e8f0', fontSize: '0.95rem', fontWeight: 600, marginTop: 4, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
