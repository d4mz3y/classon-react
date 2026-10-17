import { LETTERS, NUMBERS, SUBJECTS } from '../data/curriculum.js'

export const itemsFor = (subjectId) =>
  subjectId === 'diction'
    ? LETTERS.map((x) => ({ id: x.l, ...x }))
    : NUMBERS.map((x) => ({ id: String(x.n), ...x }))

export const countDone = (api, subjectId) => itemsFor(subjectId).filter((i) => api.lessonComplete(subjectId, i.id)).length

// A lesson is open when it is the first, or the one before it is complete.
export const isUnlocked = (api, subjectId, index) => {
  if (index === 0) return true
  const prev = itemsFor(subjectId)[index - 1]
  return api.lessonComplete(subjectId, prev.id)
}

export const activitiesDone = (api) =>
  SUBJECTS.filter((s) => !s.soon).reduce(
    (sum, s) => sum + itemsFor(s.id).reduce((n, i) => n + s.activities.filter((a) => api.isDone(`${s.id}:${i.id}`, a)).length, 0),
    0,
  )
