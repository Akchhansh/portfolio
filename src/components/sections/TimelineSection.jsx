import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  {
    year: 'Year 1',
    label: 'The Spark',
    description: 'Discovered programming through Python. Learned variables, loops, and the thrill of seeing code run for the first time.',
    emoji: '🌟',
    color: '#ffd700',
  },
  {
    year: 'Year 2',
    label: 'DSA & Problem Solving',
    description: 'Dived into Data Structures & Algorithms. Arrays, stacks, trees — every problem was a new puzzle to crack.',
    emoji: '🧩',
    color: '#c084fc',
  },
  {
    year: 'Year 3',
    label: 'Real Projects',
    description: 'Built actual projects — data analysis, AI assistants, gesture systems. Turned theory into things that work in the real world.',
    emoji: '🚀',
    color: '#60a5fa',
  },
  {
    year: 'Now',
    label: 'Growing Up',
    description: 'Exploring ML, web development, and open-source. The path keeps extending — and I keep walking forward.',
    emoji: '🌸',
    color: '#f7c6d9',
  },
]

export default function TimelineSection() {
  const sectionRef = useRef(null)
  const pathRef = useRef(null)

  useGSAP(() => {
    // Animate path drawing
    gsap.fromTo('.timeline-svg-path',
      { strokeDashoffset: 1200 },
      {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reset',
        },
      }
    )

    // Milestone cards appear
    gsap.from('.milestone-card', {
      opacity: 0,
      x: (i) => (i % 2 === 0 ? -60 : 60),
      duration: 0.8,
      stagger: 0.25,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reset',
      },
    })

    // Signboard dots
    gsap.from('.milestone-dot', {
      scale: 0,
      duration: 0.5,
      stagger: 0.25,
      ease: 'back.out(2)',
      delay: 0.3,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reset',
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="timeline"
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
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <p style={{ color: '#e9d5ff', fontFamily: 'var(--font-script)', fontSize: '1.3rem', marginBottom: 8, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            道標 — Signposts along the journey…
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
            The Journey
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
          {/* SVG path line */}
          <svg
            ref={pathRef}
            className="timeline-line-svg"
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              transform: 'translateX(-50%)',
              width: 4,
              height: '100%',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            <line
              className="timeline-svg-path"
              x1="2" y1="0" x2="2" y2="100%"
              stroke="url(#timelineGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="1200"
              strokeDashoffset="1200"
            />
            <defs>
              <linearGradient id="timelineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffd700" />
                <stop offset="33%" stopColor="#c084fc" />
                <stop offset="66%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#f7c6d9" />
              </linearGradient>
            </defs>
          </svg>

          {/* Milestones */}
          {milestones.map((m, i) => (
            <div
              key={i}
              className="timeline-row"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 20,
                marginBottom: 60,
                flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                position: 'relative',
              }}
            >
              {/* Card */}
              <div
                className="clay-card milestone-card"
                style={{
                  '--timeline-color': m.color,
                  flex: 1,
                  background: 'rgba(255,255,255,0.92)',
                  borderTop: `3px solid ${m.color}88`,
                  textAlign: i % 2 === 0 ? 'right' : 'left',
                }}
              >
                {/* Signboard header */}
                <div className="milestone-header" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start',
                  marginBottom: 8,
                }}>
                  <span style={{ fontSize: '1.5rem' }}>{m.emoji}</span>
                  <div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: m.color,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                    }}>{m.year}</div>
                    <div style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      fontWeight: 900,
                      color: '#111827',
                    }}>{m.label}</div>
                  </div>
                </div>
                <p style={{ color: '#374151', fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.75 }}>
                  {m.description}
                </p>
              </div>

              {/* Center dot (signboard post) */}
              <div
                className="milestone-dot"
                style={{
                  flex: '0 0 44px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0,
                  zIndex: 2,
                  marginTop: 12,
                }}
              >
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${m.color}, ${m.color}88)`,
                  border: '4px solid white',
                  boxShadow: `0 0 16px ${m.color}66, 0 4px 12px rgba(0,0,0,0.1)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                }}>
                  {m.emoji}
                </div>
              </div>

              {/* Spacer */}
              <div className="timeline-spacer" style={{ flex: 1 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
