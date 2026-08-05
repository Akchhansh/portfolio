import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null)
  const cardRef = useRef(null)
  const progressFillRef = useRef(null)
  const sakuraRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        if (onComplete) onComplete()
      }
    })

    // 1. Entrance and initial progress
    tl.to(progressFillRef.current, { width: '40%', duration: 1, ease: 'power2.out' })
    
    // (Rotation removed as requested)

    // 2. Complete progress bar up to 100% over 1.5s
    tl.to(progressFillRef.current, { width: '100%', duration: 1.5, ease: 'power2.inOut' })

    // 3. Fade out text and progress bar slightly before card exit
    tl.to([textRef.current, progressFillRef.current?.parentElement], { opacity: 0, y: -10, duration: 0.4 }, '+=0.2')

    // 4. Slide card up and fade screen
    tl.to(cardRef.current, { y: -50, opacity: 0, duration: 0.6, ease: 'power3.in' }, '+=0.1')
      .to(containerRef.current, { opacity: 0, duration: 0.5 }, '-=0.2')

    return () => {
      document.body.style.overflow = ''
      tl.kill()
    }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(254, 249, 239, 0.8)', // Cream theme frosted glass
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div 
        ref={cardRef}
        className="clay-card" 
        style={{ 
          maxWidth: 400, 
          width: '90%', 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px'
        }}
      >
        <div
          ref={sakuraRef}
          style={{
            fontSize: '3rem',
            color: '#f7c6d9',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          桜
        </div>
        
        <div ref={textRef}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            color: '#7c3aed',
            fontSize: '1.5rem',
            marginBottom: '8px'
          }}>
            Entering the Journey...
          </h2>
        </div>

        <div className="progress-bar-track" style={{ width: '80%' }}>
          <div 
            ref={progressFillRef}
            className="progress-bar-fill" 
            style={{ 
              width: '0%', 
              background: 'linear-gradient(90deg, #f7c6d9, #cdb4db)' 
            }} 
          />
        </div>
      </div>
    </div>
  )
}
