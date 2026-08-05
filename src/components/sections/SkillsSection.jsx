import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  { name: 'Python', emoji: '🐍', level: 88, color: '#3776ab' },
  { name: 'SQL', emoji: '🗄️', level: 78, color: '#f29517' },
  { name: 'Web Dev', emoji: '🌐', level: 72, color: '#e34c26' },
  { name: 'React', emoji: '⚛️', level: 65, color: '#61dafb' },
  { name: 'Git', emoji: '🌿', level: 80, color: '#f05032' },
  { name: 'AI / ML', emoji: '🤖', level: 60, color: '#9333ea' },
  { name: 'Data Analysis', emoji: '📊', level: 82, color: '#059669' },
  { name: 'Linux', emoji: '🐧', level: 70, color: '#fbbf24' },
]

function LanternSkill({ skill, index }) {
  const lanternRef = useRef(null)

  return (
    <div
      ref={lanternRef}
      className="skill-lantern"
      style={{
        animation: `floatSlow ${4 + index * 0.4}s ease-in-out infinite ${index * 0.2}s`,
      }}
    >
      {/* Lantern SVG */}
      <svg width="60" height="90" viewBox="0 0 60 90" className="lantern-body"
        style={{ filter: `drop-shadow(0 0 8px ${skill.color}55)`, transition: 'filter 0.3s ease, transform 0.3s ease' }}
        onMouseEnter={e => {
          e.currentTarget.style.filter = `drop-shadow(0 0 20px ${skill.color}cc)`
          e.currentTarget.style.transform = 'scale(1.15)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.filter = `drop-shadow(0 0 8px ${skill.color}55)`
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        {/* String */}
        <line x1="30" y1="0" x2="30" y2="14" stroke="#8B6914" strokeWidth="2"/>
        {/* Top cap */}
        <ellipse cx="30" cy="15" rx="12" ry="5" fill="#8B6914" />
        {/* Body */}
        <path d="M18,15 Q10,40 18,65 Q30,72 42,65 Q50,40 42,15 Z"
          fill={`${skill.color}22`}
          stroke={skill.color}
          strokeWidth="1.5"
        />
        {/* Inner glow */}
        <ellipse cx="30" cy="40" rx="14" ry="20"
          fill={skill.color}
          opacity="0.3"
        />
        {/* Emoji */}
        <text x="30" y="45" textAnchor="middle" fontSize="18">{skill.emoji}</text>
        {/* Bottom cap */}
        <ellipse cx="30" cy="65" rx="12" ry="5" fill="#8B6914" />
        {/* Tassel */}
        <line x1="30" y1="70" x2="30" y2="82" stroke="#8B6914" strokeWidth="1.5"/>
        <ellipse cx="30" cy="84" rx="4" ry="3" fill="#8B6914" />
      </svg>

      {/* Skill name */}
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.8rem',
        fontWeight: 600,
        color: '#6b21a8',
        marginTop: 4,
      }}>{skill.name}</span>

      {/* Progress bar */}
      <div style={{ width: '80px' }}>
        <div className="progress-bar-track">
          <div
            className={`progress-bar-fill skill-bar-${index}`}
            style={{ background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})` }}
          />
        </div>
        <div style={{ textAlign: 'right', fontSize: '0.7rem', color: '#888', marginTop: 2 }}>
          {skill.level}%
        </div>
      </div>
    </div>
  )
}

export default function SkillsSection() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    // Entrance anim for lanterns
    gsap.from('.skill-lantern', {
      opacity: 0,
      y: -40,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 65%',
        toggleActions: 'play none none reset',
      },
    })

    // Progress bars fill on scroll
    skills.forEach((skill, i) => {
      const bar = document.querySelector(`.skill-bar-${i}`)
      if (!bar) return
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        onEnter: () => {
          gsap.to(bar, {
            width: `${skill.level}%`,
            duration: 1.5,
            delay: 0.1 * i,
            ease: 'power2.out',
          })
        },
        onLeave: () => { bar.style.width = '0%' },
        onEnterBack: () => {
          gsap.to(bar, { width: `${skill.level}%`, duration: 1.2, ease: 'power2.out' })
        },
        onLeaveBack: () => { bar.style.width = '0%' },
      })
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="skills"
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
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ color: '#e9d5ff', fontFamily: 'var(--font-script)', fontSize: '1.3rem', marginBottom: 8, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            提灯が光る — Lanterns light the way…
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
            Skills & Tools
          </h2>
        </div>

        {/* Lantern grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '40px 24px',
          justifyItems: 'center',
        }}>
          {skills.map((skill, i) => (
            <LanternSkill key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        {/* Quote (Neumorphic) */}
        <div style={{
          marginTop: 60,
          textAlign: 'center',
          background: '#e9e0f6',
          boxShadow: '8px 8px 16px rgba(186, 172, 202, 0.6), -8px -8px 16px rgba(255, 255, 255, 0.7)',
          maxWidth: 500,
          margin: '60px auto 0',
          padding: '32px 40px',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.4)',
        }}>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.15rem',
            color: '#111827',
            lineHeight: 1.8,
            fontStyle: 'italic',
            fontWeight: 700,
          }}>
            "The expert in anything was once a beginner who refused to give up."
          </p>
          <p style={{ color: '#4b5563', marginTop: 10, fontSize: '0.9rem', fontWeight: 600 }}>
            — Still learning, always growing 🌱
          </p>
        </div>
      </div>
    </section>
  )
}
