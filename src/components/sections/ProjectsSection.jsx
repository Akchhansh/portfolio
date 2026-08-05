import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import ProjectModal from '../ui/ProjectModal'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    emoji: '📊',
    title: 'Zomato Data Analysis',
    tagline: 'Uncovering patterns in restaurant data',
    description:
      'A comprehensive exploratory data analysis of Zomato\'s restaurant dataset. Discovered key patterns in cuisine preferences, pricing trends, and rating distributions across cities. Visualized insights using Matplotlib, Seaborn, and Plotly for interactive dashboards.',
    tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly', 'Jupyter'],
    highlights: [
      'Cleaned and processed 10,000+ restaurant records',
      'Identified top-performing restaurant categories by city',
      'Revealed correlation between price range and customer ratings',
      'Built interactive visualizations for business insights',
    ],
    github: '#',
    demo: null,
    color: '#059669',
    bg: 'linear-gradient(135deg, rgba(5,150,105,0.15), rgba(5,150,105,0.05))',
  },
  {
    id: 2,
    emoji: '🤖',
    title: 'AI Assistant',
    tagline: 'Your intelligent conversational companion',
    description:
      'A Python-powered AI assistant that can answer questions, set reminders, control system functions, and engage in natural conversation. Built around the Google Gemini API with a clean command-line and GUI interface, supporting voice input/output.',
    tech: ['Python', 'Google Gemini API', 'SpeechRecognition', 'pyttsx3', 'tkinter'],
    highlights: [
      'Integrated Gemini AI for natural language understanding',
      'Voice-to-text and text-to-speech capabilities',
      'System control: open apps, play music, set alarms',
      'Persistent conversation memory within sessions',
    ],
    github: '#',
    demo: null,
    color: '#9333ea',
    bg: 'linear-gradient(135deg, rgba(147,51,234,0.15), rgba(147,51,234,0.05))',
  },
  {
    id: 3,
    emoji: '🖐️',
    title: 'Hand Gesture System',
    tagline: 'Control your computer with gestures',
    description:
      'A real-time hand gesture recognition system using computer vision that lets you control your desktop through hand movements. Supports custom gesture mapping for volume control, mouse movement, media playback, and more.',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI', 'NumPy'],
    highlights: [
      'Real-time hand landmark detection at 30fps',
      'Custom gesture mapping for 10+ system actions',
      'Volume and brightness control via finger distance',
      'Mouse movement tracking using index finger',
    ],
    github: '#',
    demo: null,
    color: '#e34c26',
    bg: 'linear-gradient(135deg, rgba(227,76,38,0.15), rgba(227,76,38,0.05))',
  },
]

function MemorySpot({ project, index, onOpen }) {
  const cardRef = useRef(null)

  return (
    <div
      ref={cardRef}
      className={`clay-card project-card project-card-${index}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: 'rgba(255,255,255,0.92)',
        cursor: 'none',
        position: 'relative',
        overflow: 'hidden',
        borderTop: `3px solid ${project.color}88`,
      }}
      onClick={() => onOpen(project)}
    >
      <div className="card-shine" />

      {/* Memory spot marker */}
      <div style={{
        position: 'absolute',
        top: 20,
        right: 20,
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: project.bg,
        border: `2px solid ${project.color}55`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
      }}>
        {project.emoji}
      </div>

      {/* Card number */}
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '3rem',
        fontWeight: 900,
        color: `${project.color}18`,
        marginBottom: 4,
        lineHeight: 1,
      }}>0{index + 1}</div>

      <h3 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.4rem',
        fontWeight: 900,
        color: '#111827',
        marginBottom: 8,
      }}>{project.title}</h3>

      <p style={{
        color: project.color,
        fontSize: '0.9rem',
        fontWeight: 800,
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
      }}>{project.tagline}</p>

      <p style={{
        color: '#374151',
        fontSize: '0.95rem',
        fontWeight: 500,
        lineHeight: 1.7,
        marginBottom: 20,
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>{project.description}</p>

      {/* Tech pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
        {project.tech.slice(0, 3).map(t => (
          <span key={t} style={{
            padding: '3px 10px',
            borderRadius: 12,
            background: `${project.color}15`,
            border: `1px solid ${project.color}33`,
            fontSize: '0.75rem',
            color: project.color,
            fontWeight: 600,
          }}>{t}</span>
        ))}
        {project.tech.length > 3 && (
          <span style={{
            padding: '3px 10px',
            borderRadius: 12,
            background: 'rgba(147,51,234,0.1)',
            border: '1px solid rgba(147,51,234,0.2)',
            fontSize: '0.75rem',
            color: '#9333ea',
            fontWeight: 600,
          }}>+{project.tech.length - 3} more</span>
        )}
      </div>

      {/* CTA */}
      <div style={{
        marginTop: 'auto',
        padding: '10px 20px',
        borderRadius: 12,
        background: `linear-gradient(135deg, ${project.color}22, ${project.color}11)`,
        border: `1px solid ${project.color}33`,
        color: project.color,
        fontSize: '0.85rem',
        fontWeight: 600,
        textAlign: 'center',
        transition: 'background 0.3s ease',
      }}>
        View Details →
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const sectionRef = useRef(null)
  const [activeProject, setActiveProject] = useState(null)

  useGSAP(() => {
    projects.forEach((_, i) => {
      gsap.from(`.project-card-${i}`, {
        opacity: 0,
        y: 80,
        scale: 0.9,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: `.project-card-${i}`,
          start: 'top 80%',
          toggleActions: 'play none none reset',
        },
      })
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="projects"
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
            記憶の場所 — Places of memory along the path…
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
            Projects
          </h2>
          <p style={{ color: '#f3f4f6', marginTop: 12, fontSize: '1.05rem', fontWeight: 500, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            Click any card to explore the full story 🗺️
          </p>
        </div>

        {/* Project grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 28,
        }}>
          {projects.map((project, i) => (
            <MemorySpot
              key={project.id}
              project={project}
              index={i}
              onOpen={setActiveProject}
            />
          ))}
        </div>

        {/* More coming soon */}
        <div style={{
          textAlign: 'center',
          marginTop: 48,
          color: '#aaa',
          fontSize: '0.9rem',
        }}>
          <span style={{
            display: 'inline-block',
            padding: '10px 24px',
            borderRadius: 20,
            border: '1.5px dashed rgba(233,213,255,0.8)',
            color: '#e9d5ff',
            fontWeight: 600,
            background: 'rgba(0,0,0,0.2)',
          }}>
            ✨ More projects coming along the road…
          </span>
        </div>
      </div>

      {/* Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  )
}
