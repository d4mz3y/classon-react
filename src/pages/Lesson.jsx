import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { SUBJECTS } from '../data/curriculum.js'
import { isUnlocked, itemsFor } from '../lib/stats.js'
import { useProgress } from '../state/progress.jsx'
import Watch from '../activities/Watch.jsx'
import Sing from '../activities/Sing.jsx'
import Trace from '../activities/Trace.jsx'
import Read from '../activities/Read.jsx'
import Count from '../activities/Count.jsx'
import Quiz from '../activities/Quiz.jsx'

const ACTIVITY = {
  watch: { label: 'Watch', icon: '👀', View: Watch },
  sing: { label: 'Sing', icon: '🎤', View: Sing },
  trace: { label: 'Trace', icon: '✏️', View: Trace },
  read: { label: 'Read', icon: '📖', View: Read },
  count: { label: 'Count', icon: '🔢', View: Count },
  quiz: { label: 'Quiz', icon: '❓', View: Quiz },
}

export default function Lesson() {
  const { subject: sid, id } = useParams()
  const api = useProgress()
  const subject = SUBJECTS.find((s) => s.id === sid && !s.soon)
  const items = subject ? itemsFor(sid) : []
  const index = items.findIndex((i) => i.id === id)
  const [tab, setTab] = useState(subject?.activities[0])

  useEffect(() => {
    if (subject) setTab(subject.activities[0])
  }, [sid, id]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!subject || index < 0 || !isUnlocked(api, sid, index)) return <Navigate to={subject ? `/learn/${sid}` : '/home'} replace />

  const item = items[index]
  const key = `${sid}:${item.id}`
  const complete = api.lessonComplete(sid, item.id)
  const next = items[index + 1]
  const { View } = ACTIVITY[tab]

  return (
    <div>
      <Link to={`/learn/${sid}`} className="text-brand-500 hover:text-brand-700 font-medium">← All {subject.title.toLowerCase()}</Link>
      <h1 className="text-3xl sm:text-4xl font-bold mt-3 mb-6">
        {sid === 'diction' ? `Letter ${item.l}` : `Number ${item.n}`}
        <span className="text-brand-300 font-medium"> · {sid === 'diction' ? item.word : item.name}</span>
      </h1>

      <div className="flex flex-wrap gap-2 mb-6" role="tablist">
        {subject.activities.map((a) => {
          const done = api.isDone(key, a)
          return (
            <button
              key={a}
              role="tab"
              aria-selected={tab === a}
              onClick={() => setTab(a)}
              className={`px-5 py-2.5 rounded-full font-semibold border-2 transition-colors ${tab === a ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-brand-700 border-brand-100 hover:border-brand-300'}`}
            >
              {ACTIVITY[a].icon} {ACTIVITY[a].label} {done && <span aria-label="done">✓</span>}
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={`${id}-${tab}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <View item={item} onDone={() => api.complete(key, tab)} />
        </motion.div>
      </AnimatePresence>

      {complete && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card p-6 mt-8 text-center bg-sun/20" data-testid="lesson-complete">
          <p className="text-3xl font-bold mb-3">🎉 Lesson complete!</p>
          {next ? (
            <Link to={`/learn/${sid}/${next.id}`} className="btn">Next: {sid === 'diction' ? `Letter ${next.l}` : `Number ${next.n}`} →</Link>
          ) : (
            <Link to="/home" className="btn">You finished {subject.title}! Back home</Link>
          )}
        </motion.div>
      )}
    </div>
  )
}
