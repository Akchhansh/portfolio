import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const fillRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const trackTop = window.innerHeight / 2 - 100

    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      const pct = Math.min(scrolled / total, 1)

      if (fillRef.current) fillRef.current.style.height = (pct * 100) + '%'
      if (dotRef.current) {
        const pos = trackTop + pct * 200
        dotRef.current.style.top = pos + 'px'
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="scroll-progress-track">
        <div ref={fillRef} className="scroll-progress-fill" />
      </div>
      <div ref={dotRef} className="scroll-progress-dot" style={{ top: `calc(50% - 100px)` }} />
    </>
  )
}
