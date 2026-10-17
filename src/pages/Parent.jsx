import React from 'react'
import { Link } from 'react-router-dom'
import { SUBJECTS } from '../data/curriculum.js'
import { activitiesDone, countDone } from '../lib/stats.js'
import { useProgress } from '../state/progress.jsx'
import Ring from '../components/Ring.jsx'

function Calendar({ days }) {
  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth()
  const first = new Date(y, m, 1).getDay()
  const total = new Date(y, m + 1, 0).getDate()
  const cells = [...Array(first).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)]
  const iso = (d) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  return (
    <div>
      <p className="font-semibold mb-3">{now.toLocaleString('en-GB', { month: 'long', year: 'numeric' })}</p>
      <div className="grid grid-cols-7 gap-1.5 text-center text-sm">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <span key={i} className="text-brand-300 font-medium">{d}</span>)}
        {cells.map((d, i) =>
          d ? (
            <span key={i} className={`aspect-square flex items-center justify-center rounded-xl ${days.includes(iso(d)) ? 'bg-leaf text-white font-semibold' : 'bg-brand-50 text-brand-500'}`}>{d}</span>
          ) : <span key={i} />,
        )}
      </div>
    </div>
  )
}

export default function Parent() {
  const api = useProgress()
  const subjects = SUBJECTS.filter((s) => !s.soon)
  const letters = countDone(api, 'diction')
  const numbers = countDone(api, 'numeracy')

  return (
    <div className="min-h-screen p-5 md:p-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Link to={api.kid ? '/home' : '/'} className="text-2xl font-bold tracking-widest text-brand-600">CLASSON</Link>
        <span className="text-brand-500 font-medium">Parents' view</span>
      </div>

      {!api.kid && api.days.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-2xl font-semibold mb-2">No learner yet</p>
          <p className="text-brand-500 mb-5">Progress appears here once a child has started a lesson on this device.</p>
          <Link to="/sign-in" className="btn">Start a learner</Link>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-1">{api.kid ? `${api.kid}'s progress` : 'Progress'}</h1>
          <p className="text-brand-500 mb-8">Everything below is counted from real activity in the app. It is stored on this device only.</p>

          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            <div className="card p-6"><p className="text-brand-500">Letters finished</p><p className="text-5xl font-bold mt-1" data-testid="stat-letters">{letters}<span className="text-2xl text-brand-300">/26</span></p></div>
            <div className="card p-6"><p className="text-brand-500">Numbers finished</p><p className="text-5xl font-bold mt-1" data-testid="stat-numbers">{numbers}<span className="text-2xl text-brand-300">/10</span></p></div>
            <div className="card p-6"><p className="text-brand-500">Activities done</p><p className="text-5xl font-bold mt-1" data-testid="stat-activities">{activitiesDone(api)}</p></div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="card p-6">
              <p className="font-semibold mb-4">By subject</p>
              <div className="space-y-5">
                {subjects.map((s) => (
                  <div key={s.id} className="flex items-center gap-4">
                    <Ring value={countDone(api, s.id)} total={s.total} size={64} color={s.id === 'diction' ? '#ec5aa5' : '#e5a800'} />
                    <div>
                      <p className="font-semibold">{s.title}</p>
                      <p className="text-sm text-brand-500">{s.blurb}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <Calendar days={api.days} />
              <p className="text-sm text-brand-500 mt-4">Green days are days with at least one finished activity.</p>
            </div>
          </div>

          <div className="mt-8 text-right">
            <button
              className="text-sm text-brand-500 hover:text-brand-700 underline"
              onClick={() => { if (window.confirm('Clear all progress on this device?')) api.reset() }}
            >
              Reset progress
            </button>
          </div>
        </>
      )}
    </div>
  )
}
