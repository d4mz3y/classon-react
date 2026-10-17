// Speech comes from the browser's own voices and the tunes are generated here with
// the Web Audio API, so the app ships no recorded audio.

export function speak(text) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return Promise.resolve()
  return new Promise((resolve) => {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.rate = 0.8
    u.pitch = 1.15
    u.onend = resolve
    u.onerror = resolve
    window.speechSynthesis.speak(u)
    setTimeout(resolve, 4000)
  })
}

const NOTE = { C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0 }
// First phrase of a public-domain nursery melody
export const TUNE = ['C4', 'C4', 'G4', 'G4', 'A4', 'A4', 'G4', 'F4', 'F4']

let ctx
export function playNotes(names, step = 0.5, onStep) {
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return Promise.resolve()
  ctx = ctx || new AC()
  if (ctx.state === 'suspended') ctx.resume()
  const t0 = ctx.currentTime + 0.05
  names.forEach((n, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.value = NOTE[n]
    const start = t0 + i * step
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(0.35, start + 0.04)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + step * 0.9)
    osc.connect(gain).connect(ctx.destination)
    osc.start(start)
    osc.stop(start + step)
    if (onStep) setTimeout(() => onStep(i), (start - ctx.currentTime) * 1000)
  })
  return new Promise((resolve) => setTimeout(resolve, names.length * step * 1000 + 100))
}
