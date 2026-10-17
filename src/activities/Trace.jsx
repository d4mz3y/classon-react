import React, { useCallback, useEffect, useRef, useState } from 'react'

const SIZE = 320
const COVERAGE_NEEDED = 0.5 // share of the letter that must be covered
const PRECISION_NEEDED = 0.55 // share of the drawing that must stay on the letter

const glyph = (ctx, char) => {
  ctx.font = '700 250px Fredoka, system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(char, SIZE / 2, SIZE / 2 + 12)
}

export default function Trace({ item, onDone }) {
  const guideRef = useRef(null)
  const inkRef = useRef(null)
  const mask = useRef(null)
  const drawing = useRef(false)
  const last = useRef(null)
  const finished = useRef(false)
  const [score, setScore] = useState({ cover: 0, precise: 1 })
  const [ok, setOk] = useState(false)

  const clear = useCallback(() => {
    inkRef.current.getContext('2d').clearRect(0, 0, SIZE, SIZE)
    setScore({ cover: 0, precise: 1 })
  }, [])

  useEffect(() => {
    let cancelled = false
    const paint = () => {
      if (cancelled) return
      const g = guideRef.current.getContext('2d')
      g.clearRect(0, 0, SIZE, SIZE)
      g.fillStyle = '#dbe2ff'
      glyph(g, item.l)
      const alpha = g.getImageData(0, 0, SIZE, SIZE).data
      const m = new Uint8Array(SIZE * SIZE)
      for (let i = 0; i < m.length; i++) m[i] = alpha[i * 4 + 3] > 40 ? 1 : 0
      mask.current = m
      g.setLineDash([9, 9])
      g.lineWidth = 3
      g.strokeStyle = '#8fa0ef'
      g.font = '700 250px Fredoka, system-ui, sans-serif'
      g.strokeText(item.l, SIZE / 2, SIZE / 2 + 12)
    }
    clear()
    finished.current = false
    setOk(false)
    document.fonts.ready.then(paint)
    return () => { cancelled = true }
  }, [item.l, clear])

  const evaluate = () => {
    const ink = inkRef.current.getContext('2d').getImageData(0, 0, SIZE, SIZE).data
    const m = mask.current
    let inked = 0, inkedOnLetter = 0, letter = 0, covered = 0
    for (let i = 0; i < m.length; i++) {
      const has = ink[i * 4 + 3] > 40
      if (m[i]) { letter++; if (has) covered++ }
      if (has) { inked++; if (m[i]) inkedOnLetter++ }
    }
    const cover = letter ? covered / letter : 0
    const precise = inked ? inkedOnLetter / inked : 1
    setScore({ cover, precise })
    if (!finished.current && cover >= COVERAGE_NEEDED && precise >= PRECISION_NEEDED) {
      finished.current = true
      setOk(true)
      onDone()
    }
  }

  const point = (e) => {
    const r = inkRef.current.getBoundingClientRect()
    return { x: ((e.clientX - r.left) / r.width) * SIZE, y: ((e.clientY - r.top) / r.height) * SIZE }
  }

  const down = (e) => {
    drawing.current = true
    last.current = point(e)
    inkRef.current.setPointerCapture(e.pointerId)
    move(e)
  }
  const move = (e) => {
    if (!drawing.current) return
    const p = point(e)
    const c = inkRef.current.getContext('2d')
    c.strokeStyle = '#ec5aa5'
    c.lineWidth = 24
    c.lineCap = 'round'
    c.lineJoin = 'round'
    c.beginPath()
    c.moveTo(last.current.x, last.current.y)
    c.lineTo(p.x + 0.01, p.y + 0.01)
    c.stroke()
    last.current = p
  }
  const up = () => {
    if (!drawing.current) return
    drawing.current = false
    evaluate()
  }

  const pct = Math.min(100, Math.round((score.cover / COVERAGE_NEEDED) * 100))

  return (
    <div className="card p-6 sm:p-8 text-center">
      <p className="text-brand-500 mb-4">Trace the letter with your finger or mouse.</p>
      <div className="relative mx-auto w-full max-w-[320px] aspect-square rounded-3xl bg-brand-50 border-2 border-brand-100 overflow-hidden">
        <canvas ref={guideRef} width={SIZE} height={SIZE} className="absolute inset-0 w-full h-full" />
        <canvas
          ref={inkRef}
          width={SIZE}
          height={SIZE}
          className="absolute inset-0 w-full h-full touch-none cursor-crosshair"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          aria-label={`Tracing area for the letter ${item.l}`}
        />
      </div>
      <div className="mx-auto mt-5 max-w-[320px] h-3 rounded-full bg-brand-100 overflow-hidden">
        <div className="h-full bg-leaf transition-all duration-300" style={{ width: `${ok ? 100 : pct}%` }} />
      </div>
      <p className="mt-3 min-h-[1.5rem] font-medium text-brand-700" data-testid="trace-status">
        {ok
          ? 'Brilliant tracing! ⭐'
          : score.precise < PRECISION_NEEDED
            ? 'Stay on the letter, you can clear and try again.'
            : 'Keep going, cover the whole letter.'}
      </p>
      <button className="btn-soft mt-3" onClick={clear}>Clear</button>
    </div>
  )
}
