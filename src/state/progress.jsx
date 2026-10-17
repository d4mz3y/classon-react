import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { SUBJECTS } from '../data/curriculum.js'

// Progress lives in this browser only (localStorage). There is no backend and no account system.
const KEY = 'classon-v2-progress'
const EMPTY = { kid: null, done: {}, days: [] }

const Ctx = createContext(null)

const load = () => {
  try {
    return { ...EMPTY, ...(JSON.parse(localStorage.getItem(KEY)) || {}) }
  } catch {
    return EMPTY
  }
}

export function ProgressProvider({ children }) {
  const [state, setState] = useState(load)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* storage unavailable */ }
  }, [state])

  const api = useMemo(() => {
    const isDone = (lesson, activity) => Boolean(state.done[lesson]?.[activity])
    const lessonComplete = (subjectId, lessonId) => {
      const subject = SUBJECTS.find((s) => s.id === subjectId)
      return subject.activities.every((a) => isDone(`${subjectId}:${lessonId}`, a))
    }
    return {
      kid: state.kid,
      days: state.days,
      done: state.done,
      isDone,
      lessonComplete,
      signIn: (kid) => setState((s) => ({ ...s, kid })),
      signOut: () => setState((s) => ({ ...s, kid: null })),
      reset: () => setState(EMPTY),
      complete: (lesson, activity) =>
        setState((s) => {
          if (s.done[lesson]?.[activity]) return s
          const today = new Date().toISOString().slice(0, 10)
          return {
            ...s,
            done: { ...s.done, [lesson]: { ...s.done[lesson], [activity]: true } },
            days: s.days.includes(today) ? s.days : [...s.days, today],
          }
        }),
    }
  }, [state])

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export const useProgress = () => useContext(Ctx)
