import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const kanji1Ref = useRef(null)
  const kanji2Ref = useRef(null)
  const arrowRef = useRef(null)
  const typingDoneRef = useRef(false)

  useGSAP(() => {
    // Entrance animation
    const tl = gsap.timeline({ delay: 0.5 })
    tl.from(kanji1Ref.current, { opacity: 0, y: 30, duration: 1.2, ease: 'power3.out' })
      .from(kanji2Ref.current, { opacity: 0, y: 30, duration: 1.2, ease: 'power3.out' }, '-=0.8')
      .from(titleRef.current, { opacity: 0, y: 40, duration: 1, ease: 'power3.out' }, '-=0.6')
      .from(subtitleRef.current, { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out' }, '-=0.4')
      .from(arrowRef.current, { opacity: 0, duration: 0.6 }, '-=0.2')
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="story-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Floating kanji decoration */}
      <div
        ref={kanji1Ref}
        style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          color: 'rgba(247,198,217,0.35)',
          userSelect: 'none',
          animation: 'floatSlow 6s ease-in-out infinite',
          fontWeight: 900,
        }}
      >
        桜
      </div>
      <div
        ref={kanji2Ref}
        style={{
          position: 'absolute',
          top: '15%',
          right: '6%',
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          color: 'rgba(205,180,219,0.3)',
          userSelect: 'none',
          animation: 'floatSlow 8s ease-in-out infinite reverse',
          fontWeight: 900,
        }}
      >
        道
      </div>

      {/* Main hero card */}
      <div className="clay-card" style={{
        maxWidth: 640,
        width: '90%',
        textAlign: 'center',
        background: 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(20px)',
        padding: '48px 40px',
      }}>
        {/* Small greeting */}
        <p style={{
          fontFamily: 'var(--font-script)',
          fontSize: '1.3rem',
          color: '#c084fc',
          marginBottom: 12,
          letterSpacing: 1,
        }}>
          こんにちは、世界 ✿
        </p>

        {/* Name */}
        <h1
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 6vw, 4rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #9333ea, #c084fc, #f7c6d9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          Hi, I'm Akchhansh
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: '#7c3aed',
            fontWeight: 500,
            letterSpacing: 0.5,
            marginBottom: 28,
          }}
        >
          CSE Student&nbsp;&nbsp;✦&nbsp;&nbsp;Python Developer&nbsp;&nbsp;✦&nbsp;&nbsp;Builder
        </p>

        {/* Tag pills */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
          {['🐍 Python', '🌐 Web Dev', '🤖 AI/ML', '📊 Data'].map(tag => (
            <span key={tag} style={{
              padding: '6px 18px',
              borderRadius: 20,
              background: 'linear-gradient(135deg, rgba(247,198,217,0.5), rgba(205,180,219,0.5))',
              border: '1px solid rgba(247,198,217,0.8)',
              fontSize: '0.85rem',
              color: '#7c3aed',
              fontWeight: 500,
            }}>{tag}</span>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#about"
          style={{
            display: 'inline-block',
            padding: '14px 36px',
            borderRadius: 50,
            background: 'rgba(255, 255, 255, 0.45)',
            backdropFilter: 'blur(12px)',
            border: '1.5px solid rgba(205, 180, 219, 0.5)',
            color: '#6b21a8',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '1.05rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
            transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.04)'
            e.currentTarget.style.boxShadow = '0 16px 40px rgba(205, 180, 219, 0.35)'
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.85)'
            e.currentTarget.style.borderColor = 'rgba(205, 180, 219, 0.9)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.04)'
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.45)'
            e.currentTarget.style.borderColor = 'rgba(205, 180, 219, 0.5)'
          }}
          onClick={e => {
            e.preventDefault()
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          Begin the Journey 🌸
        </a>
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <div
          ref={arrowRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            animation: 'scrollBounce 2s ease-in-out infinite',
            color: 'rgba(147,51,234,0.6)',
          }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: 2, textTransform: 'uppercase' }}>
            Scroll to explore
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </div>
    </section>
  )
}
