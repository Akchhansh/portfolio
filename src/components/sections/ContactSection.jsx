import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const contacts = [
  {
    label: 'GitHub',
    emoji: '🐙',
    href: 'https://github.com/Akchhansh',
    color: '#333',
    bg: 'rgba(51,51,51,0.1)',
    description: 'Projects',
  },
  {
    label: 'LinkedIn',
    emoji: '💼',
    href: 'https://linkedin.com/in/akchhansh-608238291',
    color: '#0077b5',
    bg: 'rgba(0,119,181,0.1)',
    description: 'Akchhansh',
  },
  {
    label: 'Email',
    emoji: '📧',
    href: 'mailto:akchhanshakchhansh@gmail.com',
    color: '#9333ea',
    bg: 'rgba(147,51,234,0.1)',
    description: 'Connect with me',
  },
]

export default function ContactSection() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from('.contact-card-wrapper', {
      opacity: 0,
      y: 50,
      scale: 0.9,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reset',
      },
    })

    gsap.from('.contact-heading', {
      opacity: 0,
      y: 40,
      duration: 0.9,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reset',
      },
    })

    gsap.from('.boy-stars', {
      opacity: 0,
      duration: 2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reset',
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="story-section"
      style={{
        minHeight: '100vh',
        position: 'relative',
        zIndex: 10,
        paddingTop: 120,
        paddingBottom: 80,
        background: 'transparent',
      }}
    >
      {/* Night overlay for this section */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, transparent 0%, rgba(10,10,30,0.5) 40%, rgba(10,10,30,0.75) 100%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <div className="section-content" style={{ position: 'relative', zIndex: 2 }}>
        {/* Boy looking at stars illustration text */}
        <div className="boy-stars" style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{
            fontSize: 'clamp(3rem, 10vw, 6rem)',
            lineHeight: 1,
            filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))',
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
          }}>
            <span style={{ animation: 'starTwinkle 2s ease-in-out infinite' }}>⭐</span>
            <span style={{ animation: 'starTwinkle 2.5s ease-in-out infinite 0.3s' }}>🌙</span>
            <span style={{ animation: 'starTwinkle 3s ease-in-out infinite 0.6s' }}>⭐</span>
          </div>
        </div>

        {/* Heading */}
        <div className="contact-heading" style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{
            color: '#cdb4db',
            fontFamily: 'var(--font-script)',
            fontSize: '1.2rem',
            marginBottom: 8,
          }}>
            旅の終わり — The boy stops and looks up…
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 900,
            color: 'white',
            marginBottom: 16,
            textShadow: '0 0 30px rgba(205,180,219,0.5)',
          }}>
            Let's Connect
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.75,
            fontSize: '0.97rem',
          }}>
            The journey continues together. Whether you have an opportunity, a question,
            or just want to say hi — I'd love to hear from you 🌸
          </p>
        </div>

        {/* Contact cards */}
        <div style={{
          display: 'flex',
          gap: 24,
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: 60,
        }}>
          {contacts.map((c, i) => (
            <div key={i} className="contact-card-wrapper" style={{ perspective: 1000 }}>
              <a
                href={c.href}
                className="clay-card-dark"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 220,
                  height: 220,
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  textDecoration: 'none',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1.5px solid rgba(255,255,255,0.15)',
                }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: 12,
                  display: 'block',
                  filter: `drop-shadow(0 0 12px ${c.color}88)`,
                  animation: `lanternGlow ${2 + i * 0.5}s ease-in-out infinite`,
                }}>
                  {c.emoji}
                </div>
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'white',
                  marginBottom: 6,
                }}>{c.label}</div>
                <div style={{
                  fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.5)',
                }}>{c.description}</div>
              </a>
            </div>
          ))}
        </div>

        {/* Lantern row */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(16px, 4vw, 40px)',
          marginBottom: 48,
        }}>
          {['🏮', '🏮', '🏮', '🏮', '🏮'].map((l, i) => (
            <span
              key={i}
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                animation: `lanternGlow ${1.5 + i * 0.3}s ease-in-out infinite`,
                filter: 'drop-shadow(0 0 12px rgba(255,160,40,0.7))',
                animationDelay: `${i * 0.2}s`,
              }}
            >
              {l}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>
          <p style={{ marginBottom: 6 }}>
            Built with ❤️ by Akchhansh
          </p>
          <p>
            © {new Date().getFullYear()} Akchhansh — All rights reserved
          </p>
        </div>
      </div>
    </section>
  )
}
