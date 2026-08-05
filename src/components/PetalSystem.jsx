import { useEffect, useRef } from 'react'

const PETAL_COLORS = [
  'rgba(247,198,217,0.85)',
  'rgba(255,182,193,0.9)',
  'rgba(255,209,220,0.8)',
  'rgba(205,180,219,0.75)',
  'rgba(255,220,230,0.85)',
  'rgba(248,180,200,0.8)',
]

export default function PetalSystem({ intensity = 1, windStrength = 0 }) {
  const containerRef = useRef(null)
  const petalsRef = useRef([])
  const rafRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const COUNT = Math.floor(22 * intensity)

    // Create petals
    const petals = Array.from({ length: COUNT }, (_, i) => {
      const el = document.createElement('div')
      const color = PETAL_COLORS[i % PETAL_COLORS.length]
      const size = 8 + Math.random() * 8
      const startX = Math.random() * 110 - 5
      const delay = Math.random() * 5
      const duration = 12 + Math.random() * 15 // Slower, 12-27 seconds
      const phase = Math.random() * Math.PI * 2
      const phase2 = Math.random() * Math.PI * 2
      const amplitude = 60 + Math.random() * 100 // Broader swaying
      const amplitude2 = 30 + Math.random() * 50
      const rotSpeed = (Math.random() - 0.5) * 120

      el.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size * 0.75}px;
        left: ${startX}%;
        top: -20px;
        border-radius: 50% 0 50% 0;
        background: ${color};
        pointer-events: none;
        will-change: transform;
      `
      container.appendChild(el)

      return {
        el,
        x: startX,
        y: -50 - Math.random() * 200,
        speed: (window.innerHeight + 200) / (duration * 1000), // Fix speed calculation for dt in ms
        phase,
        phase2,
        amplitude,
        amplitude2,
        rotSpeed,
        rot: Math.random() * 360,
        delay: delay * 1000, // delay in ms
        elapsed: 0,
      }
    })
    petalsRef.current = petals

    let lastTime = null
    const animate = (time) => {
      if (!lastTime) lastTime = time
      const dt = Math.min(time - lastTime, 50)
      lastTime = time

      petals.forEach((p) => {
        if (p.delay > 0) { p.delay -= dt; return }
        p.elapsed += dt * 0.001

        p.y += p.speed * dt
        p.rot += p.rotSpeed * dt * 0.001
        
        // Combine two sine waves for more erratic, floating leaf motion
        const xOffset = Math.sin(p.elapsed * 0.8 + p.phase) * p.amplitude + 
                        Math.sin(p.elapsed * 1.7 + p.phase2) * p.amplitude2
        
        const wind = windStrength * 2

        if (p.y > window.innerHeight + 30) {
          p.y = -50
          p.x = Math.random() * 110 - 5
          p.elapsed = 0
          p.phase = Math.random() * Math.PI * 2
          p.phase2 = Math.random() * Math.PI * 2
        }

        p.el.style.transform = `translate(${xOffset + wind}px, ${p.y}px) rotate(${p.rot}deg)`
      })

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      petals.forEach(p => p.el.remove())
    }
  }, [intensity, windStrength])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  )
}
