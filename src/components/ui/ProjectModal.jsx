import { useEffect } from 'react'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!project) return null

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{ animation: 'nightFall 0.3s ease forwards' }}
    >
      <div
        className="modal-content"
        style={{ animation: 'float 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 20, right: 20,
            width: 40, height: 40, borderRadius: '50%',
            border: '2px solid #f7c6d9', background: 'rgba(247,198,217,0.2)',
            cursor: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, color: '#c084fc', fontWeight: 700,
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={e => e.target.style.background = '#f7c6d9'}
          onMouseLeave={e => e.target.style.background = 'rgba(247,198,217,0.2)'}
        >
          ✕
        </button>

        {/* Emoji header */}
        <div style={{ fontSize: 48, marginBottom: 12 }}>{project.emoji}</div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: '1.8rem',
          color: '#6b21a8', marginBottom: 8
        }}>{project.title}</h2>

        <p style={{ color: '#7c3aed', marginBottom: 20, fontWeight: 500 }}>
          {project.tagline}
        </p>

        <p style={{ color: '#555', lineHeight: 1.7, marginBottom: 24 }}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', color: '#6b21a8', marginBottom: 12 }}>
            🛠 Tech Stack
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {project.tech.map(t => (
              <span key={t} style={{
                padding: '4px 14px', borderRadius: 20,
                background: 'linear-gradient(135deg, rgba(247,198,217,0.5), rgba(205,180,219,0.5))',
                border: '1px solid rgba(247,198,217,0.7)',
                fontSize: '0.85rem', color: '#6b21a8', fontWeight: 500
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div style={{ marginBottom: 28 }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', color: '#6b21a8', marginBottom: 12 }}>
            ✨ Highlights
          </h3>
          <ul style={{ paddingLeft: 20, color: '#555', lineHeight: 2 }}>
            {project.highlights.map(h => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 12 }}>
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            style={{
              flex: 1, padding: '12px 20px', borderRadius: 16,
              background: 'linear-gradient(135deg, #6b21a8, #9333ea)',
              color: 'white', textAlign: 'center', textDecoration: 'none',
              fontWeight: 600, fontSize: '0.9rem',
              boxShadow: '0 4px 16px rgba(107,33,168,0.3)',
              transition: 'transform 0.3s ease',
            }}>
            GitHub →
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              style={{
                flex: 1, padding: '12px 20px', borderRadius: 16,
                background: 'linear-gradient(135deg, #f7c6d9, #cdb4db)',
                color: '#6b21a8', textAlign: 'center', textDecoration: 'none',
                fontWeight: 600, fontSize: '0.9rem',
                boxShadow: '0 4px 16px rgba(247,198,217,0.4)',
                transition: 'transform 0.3s ease',
              }}>
              Live Demo →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
