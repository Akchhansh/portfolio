import { useEffect, useRef, useState } from 'react'

const notes = {
    A4: 440,
    C5: 523.25,
    D5: 587.33,
    E5: 659.25,
    G5: 783.99
};

const sequence = [
    { note: notes.A4, time: 0, dur: 0.8 },
    { note: notes.C5, time: 1, dur: 0.8 },
    { note: notes.D5, time: 2, dur: 1.0 },
    { note: notes.E5, time: 3.5, dur: 1.2 },
    { note: notes.D5, time: 5, dur: 1.0 },
    { note: notes.C5, time: 6.5, dur: 0.8 },
    { note: notes.A4, time: 7.5, dur: 1.5 },
    // emotional rise
    { note: notes.G5, time: 9.5, dur: 1.2 },
    { note: notes.E5, time: 11, dur: 1.0 },
    { note: notes.D5, time: 12.5, dur: 1.2 },
    { note: notes.A4, time: 14, dur: 2.0 }
];

const MELODY_DURATION = 16; // loops every 16 seconds

export default function AudioToggle() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef({
    context: null,
    playing: false,
    nodes: [],
    loopTimeout: null,
    globalGain: null
  })

  useEffect(() => {
    return () => {
      const audio = audioRef.current
      if (audio.loopTimeout) clearTimeout(audio.loopTimeout)
      if (audio.context && audio.context.state !== 'closed') audio.context.close()
    }
  }, [])

  const toggleAudio = () => {
    const audio = audioRef.current

    if (!playing) {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        audio.context = ctx
        
        const globalGain = ctx.createGain()
        globalGain.gain.setValueAtTime(0, ctx.currentTime)
        globalGain.gain.linearRampToValueAtTime(1, ctx.currentTime + 1) // Fade in broadly
        globalGain.connect(ctx.destination)
        audio.globalGain = globalGain

        const playMelody = () => {
          if (!audio.playing) return
          const now = ctx.currentTime

          sequence.forEach(n => {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()

            osc.type = "sine"
            osc.frequency.setValueAtTime(n.note, now + n.time)

            // Smooth volume envelope (fade in/out) as requested
            gain.gain.setValueAtTime(0, now + n.time)
            // Reach peak volume (0.2 is soothing) shortly after start
            gain.gain.linearRampToValueAtTime(0.2, now + n.time + 0.1)
            // Fade out smoothly until duration ends
            gain.gain.linearRampToValueAtTime(0, now + n.time + n.dur)

            osc.connect(gain)
            gain.connect(globalGain)

            osc.start(now + n.time)
            osc.stop(now + n.time + n.dur)

            audio.nodes.push(osc)
            
            osc.onended = () => {
              // Clean up memory
              audio.nodes = audio.nodes.filter(o => o !== osc)
            }
          })

          // Schedule next loop
          audio.loopTimeout = setTimeout(() => {
            if (audio.playing) playMelody()
          }, MELODY_DURATION * 1000)
        }

        audio.playing = true
        setPlaying(true)
        playMelody()
        
        // Let's also add one very soft background ambiance drone to fill the silence
        const droneOsc = ctx.createOscillator()
        const droneGain = ctx.createGain()
        droneOsc.type = 'triangle'
        droneOsc.frequency.setValueAtTime(110, ctx.currentTime) // Deep A2 drone
        droneGain.gain.setValueAtTime(0, ctx.currentTime)
        droneGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 2)
        droneOsc.connect(droneGain)
        droneGain.connect(globalGain)
        droneOsc.start()
        audio.nodes.push(droneOsc)

      } catch (e) {
        console.log('Audio not supported', e)
      }
    } else {
      audio.playing = false
      setPlaying(false)
      if (audio.loopTimeout) {
        clearTimeout(audio.loopTimeout)
      }
      
      if (audio.globalGain && audio.context) {
        // Fade out everything smoothly over 1s before destroying
        audio.globalGain.gain.linearRampToValueAtTime(0, audio.context.currentTime + 1)
        setTimeout(() => {
          audio.nodes.forEach(osc => { try { osc.stop() } catch(e) {} })
          audio.nodes = []
          if (audio.context.state !== 'closed') audio.context.close()
        }, 1100)
      }
    }
  }

  return (
    <button
      id="audio-toggle"
      className="audio-btn clay-btn"
      onClick={toggleAudio}
      title={playing ? 'Mute ambient music' : 'Play ambient music'}
      style={{ width: 52, height: 52, padding: 0 }}
    >
      {playing ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
        </svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <line x1="23" y1="9" x2="17" y2="15"/>
          <line x1="17" y1="9" x2="23" y2="15"/>
        </svg>
      )}
    </button>
  )
}
