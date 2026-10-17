import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TUNE, playNotes } from '../lib/sound.js'

export default function Sing({ item, onDone }) {
  const tokens = [item.l, 'is', 'for', ...item.syl]
  const notes = TUNE.slice(0, tokens.length)
  const [active, setActive] = useState(-1)
  const [playing, setPlaying] = useState(false)

  const sing = async () => {
    setPlaying(true)
    await playNotes(notes, 0.55, setActive)
    setActive(-1)
    setPlaying(false)
    onDone()
  }

  return (
    <div className="card p-8 text-center">
      <p className="text-brand-500 mb-6">Tap sing, then follow the bouncing words.</p>
      <div className="flex flex-wrap justify-center gap-3 mb-8 min-h-[5rem]">
        {tokens.map((t, i) => (
          <motion.span
            key={i}
            animate={{ scale: active === i ? 1.35 : 1, y: active === i ? -10 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 14 }}
            className={`px-5 py-3 rounded-2xl text-3xl font-semibold ${active === i ? 'bg-sun text-brand-900' : 'bg-brand-50 text-brand-700'}`}
          >
            {t}
          </motion.span>
        ))}
      </div>
      <div className="text-7xl mb-6" aria-hidden="true">{item.emoji}</div>
      <button className="btn" onClick={sing} disabled={playing}>
        {playing ? '🎵 Singing…' : '🎤 Sing along'}
      </button>
    </div>
  )
}
