import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SUBJECTS } from '../data/curriculum.js'
import { countDone, isUnlocked, itemsFor } from '../lib/stats.js'
import { useProgress } from '../state/progress.jsx'

export default function Subject() {
  const { subject: id } = useParams()
  const api = useProgress()
  const subject = SUBJECTS.find((s) => s.id === id && !s.soon)
  if (!subject) return <Navigate to="/home" replace />

  const items = itemsFor(id)
  const done = countDone(api, id)

  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-bold mb-2">{subject.title}</h1>
      <p className="text-xl text-brand-500 mb-8">
        {done} of {items.length} finished. Finish each one to unlock the next.
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
        {items.map((it, i) => {
          const unlocked = isUnlocked(api, id, i)
          const complete = api.lessonComplete(id, it.id)
          const doneCount = subject.activities.filter((a) => api.isDone(`${id}:${it.id}`, a)).length
          const inner = (
            <>
              <span className={`text-6xl font-bold ${complete ? 'text-leaf' : 'text-brand-600'}`}>{id === 'diction' ? it.l : it.n}</span>
              <span className="text-sm mt-1 h-5">
                {!unlocked ? '🔒' : complete ? '✓ Done' : doneCount ? `${doneCount}/${subject.activities.length}` : 'New'}
              </span>
            </>
          )
          return (
            <motion.div key={it.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: Math.min(i * 0.02, 0.4) }}>
              {unlocked ? (
                <Link to={`/learn/${id}/${it.id}`} className="card aspect-square flex flex-col items-center justify-center hover:-translate-y-1 transition-transform" aria-label={`Lesson ${it.id}`}>
                  {inner}
                </Link>
              ) : (
                <div className="card aspect-square flex flex-col items-center justify-center opacity-45" aria-label={`Lesson ${it.id} is locked`}>{inner}</div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
