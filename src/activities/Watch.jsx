import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { speak } from '../lib/sound.js'

export default function Watch({ item, onDone }) {
  const [busy, setBusy] = useState(false)
  const hear = async () => {
    setBusy(true)
    await speak(`${item.l}. ${item.l} is for ${item.word}`)
    setBusy(false)
    onDone()
  }

  return (
    <div className="card p-8 text-center">
      <div className="flex items-center justify-center gap-8 sm:gap-14 mb-6">
        <motion.div
          key={item.l}
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 12 }}
          className="text-[9rem] sm:text-[11rem] leading-none font-bold text-brand-600"
        >
          {item.l}
        </motion.div>
        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          className="text-[7rem] sm:text-[8rem] leading-none"
          aria-hidden="true"
        >
          {item.emoji}
        </motion.div>
      </div>
      <motion.p
        className="text-4xl font-semibold mb-8"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } } }}
      >
        {item.l} is for{' '}
        {item.word.split('').map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block text-berry"
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        ))}
      </motion.p>
      <button className="btn" onClick={hear} disabled={busy}>
        {busy ? 'Listen…' : '🔊 Hear it'}
      </button>
    </div>
  )
}
