import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SUBJECTS } from '../data/curriculum.js'
import { countDone } from '../lib/stats.js'
import { useProgress } from '../state/progress.jsx'
import Ring from '../components/Ring.jsx'

export default function Home() {
  const api = useProgress()

  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-bold mb-2">Hi, {api.kid}! 👋</h1>
      <p className="text-xl text-brand-500 mb-10">What shall we learn today?</p>
      <div className="grid sm:grid-cols-2 gap-6">
        {SUBJECTS.map((s, i) => {
          const done = s.soon ? 0 : countDone(api, s.id)
          const body = (
            <>
              <div className={`${s.color} w-24 h-24 rounded-3xl flex items-center justify-center text-4xl font-bold text-white shrink-0`}>
                {s.glyph}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold">{s.title}</h2>
                <p className="text-brand-500">{s.blurb}</p>
              </div>
              {!s.soon && <Ring value={done} total={s.total} />}
            </>
          )
          return (
            <motion.div key={s.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              {s.soon ? (
                <div className="card p-5 flex items-center gap-5 opacity-60" aria-disabled="true">{body}</div>
              ) : (
                <Link to={s.to} className="card p-5 flex items-center gap-5 hover:-translate-y-1 transition-transform">{body}</Link>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
