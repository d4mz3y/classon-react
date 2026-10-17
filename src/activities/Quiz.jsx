import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { NUMBERS } from '../data/curriculum.js'

export default function Quiz({ item, onDone }) {
  const options = useMemo(() => {
    const others = NUMBERS.filter((x) => x.n !== item.n)
    // deterministic distractors so the choices don't reshuffle on re-render
    const picks = [others[(item.n * 3) % others.length], others[(item.n * 5 + 1) % others.length]]
    const unique = [...new Map([item, ...picks].map((x) => [x.n, x])).values()]
    while (unique.length < 3) unique.push(others.find((o) => !unique.includes(o)))
    return unique.sort((a, b) => ((a.n * 7 + item.n) % 5) - ((b.n * 7 + item.n) % 5))
  }, [item])

  const [state, setState] = useState('idle')

  const choose = (n) => {
    if (n === item.n) {
      setState('right')
      onDone()
    } else {
      setState('wrong')
    }
  }

  return (
    <div className="card p-8 text-center">
      <p className="text-brand-500 mb-4">How many {item.emoji} are there?</p>
      <div className="flex flex-wrap justify-center gap-2 text-4xl mb-8 max-w-sm mx-auto" aria-hidden="true">
        {Array.from({ length: item.n }).map((_, i) => <span key={i}>{item.emoji}</span>)}
      </div>
      <div className="flex justify-center gap-4 mb-6">
        {options.map((o) => (
          <motion.button
            key={o.n}
            whileTap={{ scale: 0.9 }}
            onClick={() => choose(o.n)}
            className="w-24 h-24 rounded-3xl bg-brand-50 border-2 border-brand-100 hover:border-brand-500 text-5xl font-bold text-brand-700"
          >
            {o.n}
          </motion.button>
        ))}
      </div>
      <p className="text-2xl font-semibold min-h-[2rem]" data-testid="quiz-status">
        {state === 'right' && 'Yes! That is right! 🌟'}
        {state === 'wrong' && 'Not quite. Count again and try another!'}
      </p>
    </div>
  )
}
