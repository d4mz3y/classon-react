import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { speak } from '../lib/sound.js'

export default function Count({ item, onDone }) {
  const [tapped, setTapped] = useState([])

  const tap = (i) => {
    if (tapped.includes(i)) return
    const next = [...tapped, i]
    setTapped(next)
    speak(String(next.length))
    if (next.length === item.n) onDone()
  }

  const finished = tapped.length === item.n

  return (
    <div className="card p-8 text-center">
      <p className="text-brand-500 mb-6">Tap each one to count them all.</p>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {Array.from({ length: item.n }).map((_, i) => {
          const hit = tapped.includes(i)
          return (
            <motion.button
              key={i}
              whileTap={{ scale: 0.8 }}
              animate={{ scale: hit ? 1.15 : 1, opacity: hit ? 1 : 0.55 }}
              onClick={() => tap(i)}
              className={`relative w-20 h-20 rounded-3xl text-5xl flex items-center justify-center border-2 ${hit ? 'bg-sun/30 border-sun' : 'bg-brand-50 border-brand-100'}`}
              aria-label={`Item ${i + 1}`}
            >
              {item.emoji}
              {hit && (
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-brand-600 text-white text-base font-semibold flex items-center justify-center">
                  {tapped.indexOf(i) + 1}
                </span>
              )}
            </motion.button>
          )
        })}
      </div>
      <p className="text-3xl font-semibold min-h-[2.5rem]" data-testid="count-status">
        {finished ? `You counted ${item.n}! 🎉` : tapped.length ? `${tapped.length}…` : ''}
      </p>
    </div>
  )
}
