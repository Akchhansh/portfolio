import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import PetalSystem from './PetalSystem'

gsap.registerPlugin(ScrollTrigger)

// SVG layers for the scene
function SkyLayer({ scrollProgress }) {
  const dayColors = ['#ffd6a5', '#ffb347', '#ff8c69', '#e8a0bf', '#bde0fe']
  const nightColors = ['#1a1a2e', '#16213e', '#0f3460', '#1a1a2e', '#0d0d1a']

  const lerp = (a, b, t) => a + (b - a) * t
  const lerpColor = (c1, c2, t) => {
    const h = (hex) => [
      parseInt(hex.slice(1,3),16),
      parseInt(hex.slice(3,5),16),
      parseInt(hex.slice(5,7),16)
    ]
    const toHex = (n) => Math.round(n).toString(16).padStart(2,'0')
    const [r1,g1,b1] = h(c1)
    const [r2,g2,b2] = h(c2)
    return `#${toHex(lerp(r1,r2,t))}${toHex(lerp(g1,g2,t))}${toHex(lerp(b1,b2,t))}`
  }

  const t = scrollProgress
  const stops = dayColors.map((c,i) => lerpColor(c, nightColors[i], t))

  return (
    <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          {stops.map((c,i) => (
            <stop key={i} offset={`${i*25}%`} stopColor={c} />
          ))}
        </linearGradient>

        {/* Sun/Moon */}
        <radialGradient id="sunGrad">
          <stop offset="0%" stopColor="#fff9c4" />
          <stop offset="50%" stopColor="#ffdb58" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffa500" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="moonGrad">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#e8e8e8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#b0b0b0" stopOpacity="0" />
        </radialGradient>

        {/* Global Claymorphism 3D Filter */}
        <filter id="clayBg" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="alphaBlur" />
          <feOffset dx="-3" dy="-3" in="alphaBlur" result="highlightOffset" />
          <feComposite operator="out" in="SourceAlpha" in2="highlightOffset" result="highlightMask" />
          <feFlood floodColor="white" floodOpacity="0.6" result="highlightColor" />
          <feComposite operator="in" in="highlightColor" in2="highlightMask" result="highlight" />
          
          <feOffset dx="4" dy="6" in="alphaBlur" result="shadowOffset" />
          <feComposite operator="out" in="SourceAlpha" in2="shadowOffset" result="shadowMask" />
          <feFlood floodColor="black" floodOpacity="0.15" result="shadowColor" />
          <feComposite operator="in" in="shadowColor" in2="shadowMask" result="shadow" />
          
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="highlight" />
            <feMergeNode in="shadow" />
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#skyGrad)" />
      {/* Sun bouncing smoothly into sky */}
      <circle
        cx="75%"
        cy={`${22 + t * 50}%`}
        r="60"
        fill="url(#sunGrad)"
        opacity={Math.max(0, 1 - t * 2.5)}
        style={{ transition: 'all 0.5s ease-out' }}
      />
      {/* Moon rising with a soft curve */}
      <circle
        cx={`${70 + t * 5}%`}
        cy={`${40 - t * 22}%`}
        r="40"
        fill="url(#moonGrad)"
        opacity={Math.max(0, t * 2 - 0.8)}
        style={{ transition: 'all 0.5s ease-out' }}
      />
    </svg>
  )
}

function MountainLayer() {
  return (
    <svg
      viewBox="0 0 1440 300"
      preserveAspectRatio="xMidYMax meet"
      style={{ position: 'absolute', bottom: '38%', left: 0, width: '160%', minWidth: 1440 }}
    >
      <path
        d="M0,300 L0,200 Q80,140 160,190 Q220,120 300,160 Q380,80 460,150 Q540,60 620,120 Q700,40 780,110 Q860,50 940,120 Q1020,70 1100,130 Q1180,50 1260,110 L1440,180 L1440,300 Z"
        fill="rgba(205,180,219,0.55)"
        filter="url(#clayBg)"
      />
      <path
        d="M0,300 L0,230 Q100,190 200,230 Q280,170 360,220 Q440,150 520,200 Q600,120 680,180 Q760,140 840,190 Q920,110 1000,170 Q1080,140 1160,190 Q1240,120 1320,180 L1440,220 L1440,300 Z"
        fill="rgba(189,158,209,0.5)"
        filter="url(#clayBg)"
      />
    </svg>
  )
}

function HousesLayer() {
  return (
    <svg
      viewBox="0 0 1440 200"
      preserveAspectRatio="xMidYMax meet"
      style={{ position: 'absolute', bottom: '15%', left: 0, width: '150%', minWidth: 1440 }}
    >
      {/* House 1 */}
      <g transform="translate(80, 40)">
        <path d="M0,80 Q70,-10 140,80 Z" fill="#9d7252" filter="url(#clayBg)" />
        <rect x="15" y="80" width="110" height="120" rx="16" fill="#e6bf98" filter="url(#clayBg)" />
        <rect x="45" y="110" width="30" height="90" rx="8" fill="#6d4930" filter="url(#clayBg)" />
        <rect x="25" y="95" width="20" height="20" rx="6" fill="rgba(255,200,50,0.6)" filter="url(#clayBg)" />
        <rect x="95" y="95" width="20" height="20" rx="6" fill="rgba(255,200,50,0.6)" filter="url(#clayBg)" />
        {/* Lantern */}
        <ellipse cx="70" cy="75" rx="8" ry="12" fill="rgba(255,160,40,0.8)" />
        <rect x="67" y="63" width="6" height="4" rx="2" fill="#5C3A1E" />
      </g>
      {/* Cherry tree */}
      <g transform="translate(270, 10)">
        <rect x="22" y="80" width="6" height="90" rx="3" fill="#6d4930" filter="url(#clayBg)" />
        <ellipse cx="25" cy="55" rx="35" ry="45" fill="rgba(247,198,217,0.8)" filter="url(#clayBg)" />
        <ellipse cx="5" cy="75" rx="22" ry="28" fill="rgba(238,172,197,0.8)" filter="url(#clayBg)" />
        <ellipse cx="45" cy="70" rx="20" ry="26" fill="rgba(238,172,197,0.8)" filter="url(#clayBg)" />
      </g>
      {/* House 2 */}
      <g transform="translate(360, 30)">
        <path d="M0,90 Q80,0 160,90 Z" fill="#8c603f" filter="url(#clayBg)" />
        <rect x="20" y="90" width="120" height="110" rx="14" fill="#d7a974" filter="url(#clayBg)" />
        <rect x="55" y="115" width="36" height="85" rx="8" fill="#583c21" filter="url(#clayBg)" />
        <rect x="25" y="100" width="24" height="22" rx="6" fill="rgba(255,200,50,0.55)" filter="url(#clayBg)" />
        <rect x="110" y="100" width="24" height="22" rx="6" fill="rgba(255,200,50,0.55)" filter="url(#clayBg)" />
      </g>
      {/* Fence */}
      {[550,570,590,610,630,650,670,690,710,730,750,770,790,810].map(x => (
        <rect key={x} x={x} y="155" width="8" height="30" rx="4" fill="#9d7a26" filter="url(#clayBg)" />
      ))}
      <rect x="548" y="163" width="275" height="6" rx="3" fill="#9d7a26" filter="url(#clayBg)" />
      <rect x="548" y="175" width="275" height="6" rx="3" fill="#9d7a26" filter="url(#clayBg)" />
      {/* House 3 */}
      <g transform="translate(870, 20)">
        <path d="M0,100 Q90,0 180,100 Z" fill="#7d5433" filter="url(#clayBg)" />
        <rect x="20" y="100" width="140" height="100" rx="12" fill="#c98f5d" filter="url(#clayBg)" />
        <rect x="60" y="125" width="40" height="75" rx="8" fill="#4d301f" filter="url(#clayBg)" />
        <rect x="30" y="110" width="24" height="24" rx="8" fill="rgba(255,200,50,0.6)" filter="url(#clayBg)" />
        <rect x="115" y="110" width="24" height="24" rx="8" fill="rgba(255,200,50,0.6)" filter="url(#clayBg)" />
        <ellipse cx="90" cy="95" rx="9" ry="13" fill="rgba(255,160,40,0.85)" />
        <rect x="87" y="82" width="6" height="4" rx="2" fill="#4d301f" />
      </g>
      {/* Another cherry tree */}
      <g transform="translate(1100, 0)">
        <rect x="22" y="90" width="6" height="90" rx="3" fill="#6d4930" filter="url(#clayBg)" />
        <ellipse cx="25" cy="60" rx="40" ry="50" fill="rgba(247,198,217,0.8)" filter="url(#clayBg)" />
        <ellipse cx="0" cy="85" rx="25" ry="32" fill="rgba(238,172,197,0.8)" filter="url(#clayBg)" />
        <ellipse cx="52" cy="80" rx="22" ry="28" fill="rgba(238,172,197,0.8)" filter="url(#clayBg)" />
      </g>
      {/* House 4 */}
      <g transform="translate(1200, 50)">
        <path d="M0,70 Q60,-10 120,70 Z" fill="#9d7252" filter="url(#clayBg)" />
        <rect x="15" y="70" width="90" height="110" rx="12" fill="#e6bf98" filter="url(#clayBg)" />
        <rect x="35" y="95" width="30" height="85" rx="8" fill="#6d4930" filter="url(#clayBg)" />
        <rect x="18" y="80" width="16" height="18" rx="6" fill="rgba(255,200,50,0.6)" filter="url(#clayBg)" />
        <rect x="83" y="80" width="16" height="18" rx="6" fill="rgba(255,200,50,0.6)" filter="url(#clayBg)" />
      </g>
    </svg>
  )
}

function RoadLayer() {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="xMidYMax meet"
      style={{ position: 'absolute', bottom: 0, left: 0, width: '150%', minWidth: 1440 }}
    >
      {/* Ground */}
      <rect y="60" width="1440" height="60" fill="#9c8365" filter="url(#clayBg)" />
      {/* Road path */}
      <rect y="65" width="1440" height="40" fill="#b09f7a" filter="url(#clayBg)" />
      {/* Road stones */}
      {Array.from({length: 30}, (_,i) => (
        <ellipse key={i} cx={i * 50 + 15} cy="85" rx="18" ry="8" fill="rgba(255,255,255,0.2)" filter="url(#clayBg)" />
      ))}
      {/* Grass */}
      <rect y="108" width="1440" height="12" rx="6" fill="#8ab68a" filter="url(#clayBg)" />
      {/* Grass tufts */}
      {Array.from({length: 40}, (_,i) => (
        <g key={i} transform={`translate(${i * 38 + Math.sin(i)*10}, 108)`}>
          <path d="M0,0 Q4,-16 8,0 Z" fill="#6db16d" opacity="0.8" />
          <path d="M6,0 Q10,-12 14,0 Z" fill="#7dc27d" opacity="0.7" />
        </g>
      ))}
    </svg>
  )
}

function BoyCharacter({ isWalking, isNight }) {
  const containerRef = useRef(null)
  const boyRef = useRef(null)
  const legRef1 = useRef(null)
  const legRef2 = useRef(null)
  const armRef1 = useRef(null)
  const armRef2 = useRef(null)
  const frameRef = useRef(0)
  const rafRef = useRef(null)
  
  // Track active scrolling
  const [isActivelyScrolling, setIsActivelyScrolling] = useState(false)
  const scrollTimeout = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsActivelyScrolling(true)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      scrollTimeout.current = setTimeout(() => {
        setIsActivelyScrolling(false)
      }, 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    }
  }, [])

  useEffect(() => {
    if (!isWalking || !isActivelyScrolling) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (boyRef.current) boyRef.current.style.transform = `translateY(0px) rotate(0deg)`
      if (legRef1.current) legRef1.current.style.transform = 'rotate(0deg) translateY(0px)'
      if (legRef2.current) legRef2.current.style.transform = 'rotate(0deg) translateY(0px)'
      if (armRef1.current) armRef1.current.style.transform = 'rotate(0deg)'
      if (armRef2.current) armRef2.current.style.transform = 'rotate(0deg)'
      return
    }

    const animate = () => {
      frameRef.current++
      const t = frameRef.current * 0.12 // Smoother, slightly faster
      
      const legSwing = Math.sin(t) * 22
      const legLift1 = Math.max(0, Math.sin(t) * 8)
      const legLift2 = Math.max(0, Math.sin(t + Math.PI) * 8)
      const armSwing = Math.sin(t) * 18
      const bob = Math.abs(Math.sin(t)) * 3.5
      const bodyRot = Math.sin(t * 2) * 1.5

      if (boyRef.current) boyRef.current.style.transform = `translateY(${-bob}px) rotate(${bodyRot}deg)`
      if (legRef1.current) legRef1.current.style.transform = `rotate(${legSwing}deg) translateY(${-legLift1}px)`
      if (legRef2.current) legRef2.current.style.transform = `rotate(${-legSwing}deg) translateY(${-legLift2}px)`
      if (armRef1.current) armRef1.current.style.transform = `rotate(${-armSwing}deg)`
      if (armRef2.current) armRef2.current.style.transform = `rotate(${armSwing}deg)`
      
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isWalking, isActivelyScrolling])

  // NEW COLORS 
  const skinColor = '#ffcdb2'
  const hairColor = '#1c3d5a' // Dark Blue Hair
  const hoodieColor = '#cbd5e1' // Grey Hoodie
  const jacketColor = '#3b5998' // Blue Jacket
  const pantsColor = '#1f2937' // Dark Grey/Black Pants
  const shoeColor = '#8b4513' // Brown Shoes

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        bottom: '9%',
        left: '22%',
        zIndex: 10,
        filter: isNight ? 'brightness(0.5) saturate(0.8)' : 'drop-shadow(0 15px 15px rgba(0,0,0,0.1))',
        transition: 'filter 2s ease, transform 0.3s ease',
      }}
    >
      <svg width="100" height="150" viewBox="0 0 100 150">
        <defs>
          {/* Claymorphism 3D Filter */}
          <filter id="clay" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="alphaBlur" />
            <feOffset dx="-2" dy="-2" in="alphaBlur" result="highlightOffset" />
            <feComposite operator="out" in="SourceAlpha" in2="highlightOffset" result="highlightMask" />
            <feFlood floodColor="white" floodOpacity="0.7" result="highlightColor" />
            <feComposite operator="in" in="highlightColor" in2="highlightMask" result="highlight" />
            
            <feOffset dx="3" dy="4" in="alphaBlur" result="shadowOffset" />
            <feComposite operator="out" in="SourceAlpha" in2="shadowOffset" result="shadowMask" />
            <feFlood floodColor="black" floodOpacity="0.25" result="shadowColor" />
            <feComposite operator="in" in="shadowColor" in2="shadowMask" result="shadow" />
            
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="highlight" />
              <feMergeNode in="shadow" />
            </feMerge>
          </filter>
        </defs>

        {/* Base Shadow */}
        <ellipse cx="50" cy="142" rx="26" ry="8" fill="rgba(80,50,30,0.2)" style={{ transition: 'all 0.3s' }} />

        <g ref={boyRef} style={{ transformOrigin: '50px 75px' }}>
          
          {/* Left Arm (Background) */}
          <g ref={armRef2} style={{ transformOrigin: '66px 62px' }}>
            <rect x="60" y="60" width="14" height="34" rx="7" fill={skinColor} filter="url(#clay)" />
            {/* Background Sleeve */}
            <rect x="59" y="58" width="16" height="24" rx="6" fill={jacketColor} filter="url(#clay)" />
          </g>

          {/* Left Leg (Background) */}
          <g ref={legRef2} style={{ transformOrigin: '58px 105px' }}>
            <rect x="50" y="102" width="16" height="34" rx="8" fill={pantsColor} filter="url(#clay)" />
            <rect x="50" y="128" width="24" height="12" rx="6" fill={shoeColor} filter="url(#clay)" />
            <rect x="50" y="136" width="24" height="4" rx="2" fill="white" />
          </g>

          {/* Right Leg (Foreground) */}
          <g ref={legRef1} style={{ transformOrigin: '42px 105px' }}>
            <rect x="34" y="102" width="16" height="36" rx="8" fill={pantsColor} filter="url(#clay)" />
            <rect x="34" y="130" width="24" height="12" rx="6" fill={shoeColor} filter="url(#clay)" />
            <rect x="34" y="138" width="24" height="4" rx="2" fill="white" />
          </g>

          {/* Torso */}
          {/* Hoodie inner layer */}
          <rect x="36" y="56" width="32" height="48" rx="14" fill={hoodieColor} filter="url(#clay)" />
          
          {/* Jacket */}
          <path d="M34 56 Q34 76 34 100 C40 100 68 100 68 100 L68 56 Z" fill={jacketColor} filter="url(#clay)" />
          
          {/* Jacket opening revealing hoodie */}
          <path d="M42 56 L54 56 L54 100 L42 100 Z" fill={hoodieColor} />
          
          {/* Hoodie strings */}
          <path d="M46 62 L46 72" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M50 62 L50 72" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          {/* Hoodie top bump */}
          <rect x="38" y="52" width="28" height="10" rx="4" fill={hoodieColor} filter="url(#clay)" />

          {/* Right Arm (Foreground) */}
          <g ref={armRef1} style={{ transformOrigin: '36px 62px' }}>
            <rect x="30" y="60" width="16" height="38" rx="8" fill={skinColor} filter="url(#clay)" />
            {/* Foreground Sleeve */}
            <rect x="29" y="58" width="18" height="26" rx="6" fill={jacketColor} filter="url(#clay)" />
          </g>

          {/* Head & Neck */}
          <rect x="44" y="44" width="12" height="16" rx="6" fill={skinColor} filter="url(#clay)" />
          <ellipse cx="50" cy="36" rx="26" ry="28" fill={skinColor} filter="url(#clay)" />

          {/* Hair Base */}
          <ellipse cx="50" cy="18" rx="28" ry="16" fill={hairColor} filter="url(#clay)" />
          <ellipse cx="26" cy="24" rx="14" ry="16" fill={hairColor} filter="url(#clay)" />
          <ellipse cx="74" cy="24" rx="14" ry="16" fill={hairColor} filter="url(#clay)" />
          
          {/* Messy spikes (from image) */}
          <path d="M30 14 L34 32 L40 16" fill={hairColor} />
          <path d="M40 10 L48 34 L54 14" fill={hairColor} />
          <path d="M52 14 L58 32 L64 16" fill={hairColor} />
          <path d="M62 16 L68 34 L76 16" fill={hairColor} />

          {/* Eyes */}
          <ellipse cx="40" cy="38" rx="5" ry="6" fill="white" />
          <ellipse cx="60" cy="38" rx="5" ry="6" fill="white" />
          <circle cx="42" cy="39" r="3" fill="#1c3d5a" />
          <circle cx="62" cy="39" r="3" fill="#1c3d5a" />
          <circle cx="43" cy="38" r="1.5" fill="white" />
          <circle cx="63" cy="38" r="1.5" fill="white" />

          {/* Glasses */}
          <rect x="33" y="32" width="14" height="12" rx="3" fill="none" stroke="#2c3e50" strokeWidth="2.5" />
          <rect x="53" y="32" width="14" height="12" rx="3" fill="none" stroke="#2c3e50" strokeWidth="2.5" />
          {/* Glasses bridge */}
          <path d="M47 36 L53 36" stroke="#2c3e50" strokeWidth="2.5" />
          {/* Glasses arms */}
          <path d="M33 36 L24 34" stroke="#2c3e50" strokeWidth="2.5" />
          <path d="M67 36 L76 34" stroke="#2c3e50" strokeWidth="2.5" />

          {/* Blush */}
          <ellipse cx="32" cy="46" rx="6" ry="4" fill="rgba(255,140,140,0.4)" filter="blur(1px)" />
          <ellipse cx="68" cy="46" rx="6" ry="4" fill="rgba(255,140,140,0.4)" filter="blur(1px)" />

          {/* Small Smile */}
          <path d="M46 51 Q50 54 54 51" stroke="#d47f66" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  )
}

function Stars({ opacity }) {
  const positions = Array.from({ length: 50 }, (_, i) => ({
    x: (i * 37 + 17) % 100,
    y: (i * 23 + 11) % 55,
    delay: (i * 0.3) % 3,
    size: i % 3 === 0 ? 2 : 1.5,
  }))

  return (
    <div style={{ position: 'absolute', inset: 0, opacity, transition: 'opacity 2s ease', pointerEvents: 'none' }}>
      {positions.map((s, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${2 + Math.random()}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function ParallaxScene({ scrollProgress = 0 }) {
  const containerRef = useRef(null)
  const bgRef = useRef(null)
  const mountainRef = useRef(null)
  const housesRef = useRef(null)
  const roadRef = useRef(null)

  const isNight = scrollProgress > 0.75
  const isWalking = scrollProgress > 0.05 && scrollProgress < 0.95

  // Parallax x-offsets
  const mountainX = -scrollProgress * 180
  const housesX = -scrollProgress * 350
  const roadX = -scrollProgress * 500

  return (
    <div
      ref={containerRef}
      className="parallax-scene"
      style={{ zIndex: 0 }}
    >
      {/* SKY */}
      <SkyLayer scrollProgress={Math.min(scrollProgress * 1.4, 1)} />

      {/* Stars (night) */}
      <Stars opacity={Math.max(0, (scrollProgress - 0.6) * 4)} />

      {/* MOUNTAINS — slowest parallax */}
      <div
        ref={mountainRef}
        style={{ transform: `translateX(${mountainX}px)`, position: 'absolute', inset: 0 }}
      >
        <MountainLayer />
      </div>

      {/* BG Scene image */}
      <div
        style={{
          position: 'absolute',
          bottom: '18%',
          left: 0,
          width: '160%',
          transform: `translateX(${housesX * 0.5}px)`,
          opacity: Math.max(0, 1 - scrollProgress * 1.8),
        }}
      >
        <img
          src="/sakura-bg.png"
          alt="Japanese landscape"
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </div>

      {/* HOUSES — medium parallax */}
      <div
        ref={housesRef}
        style={{ transform: `translateX(${housesX}px)`, position: 'absolute', inset: 0 }}
      >
        <HousesLayer />
      </div>

      {/* ROAD — faster parallax */}
      <div
        ref={roadRef}
        style={{ transform: `translateX(${roadX}px)`, position: 'absolute', inset: 0 }}
      >
        <RoadLayer />
      </div>

      {/* BOY CHARACTER */}
      <BoyCharacter isWalking={isWalking} isNight={isNight} />

      {/* PETALS */}
      <PetalSystem
        intensity={isNight ? 0.3 : 1}
        windStrength={0}
      />

      {/* FIREFLIES (night) */}
      {isNight && Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          className="firefly-dot"
          style={{
            left: `${(i * 41 + 10) % 90}%`,
            top: `${(i * 27 + 20) % 70}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${4 + i * 0.3}s`,
            opacity: Math.max(0, (scrollProgress - 0.75) * 4),
          }}
        />
      ))}

      {/* Lantern glow overlay at night */}
      {isNight && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 60% 40%, rgba(255,160,40,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
      )}
    </div>
  )
}
