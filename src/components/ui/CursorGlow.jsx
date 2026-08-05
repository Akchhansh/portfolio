import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const dotRef = useRef(null)
  const glowRef = useRef(null)
  const rippleRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const glow = glowRef.current
    const ripple = rippleRef.current

    let mouseX = 0, mouseY = 0
    let glowX = 0, glowY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dot) {
        dot.style.left = mouseX + 'px'
        dot.style.top = mouseY + 'px'
      }
    }

    const onClick = (e) => {
      if (!ripple) return
      ripple.style.left = e.clientX + 'px'
      ripple.style.top = e.clientY + 'px'
      ripple.style.opacity = '1'
      ripple.style.transform = 'translate(-50%, -50%) scale(1)'
      ripple.style.transition = 'none'
      setTimeout(() => {
        ripple.style.transition = 'transform 0.5s ease, opacity 0.5s ease'
        ripple.style.transform = 'translate(-50%, -50%) scale(4)'
        ripple.style.opacity = '0'
      }, 10)
    }

    let raf
    const animate = () => {
      glowX += (mouseX - glowX) * 0.08
      glowY += (mouseY - glowY) * 0.08
      if (glow) {
        glow.style.left = glowX + 'px'
        glow.style.top = glowY + 'px'
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('mousemove', onMove)
    window.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={glowRef} className="cursor-glow" />
      <div ref={rippleRef} className="cursor-ripple" />
    </>
  )
}
