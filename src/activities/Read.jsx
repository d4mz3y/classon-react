import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Read({ item, onDone }) {
  const pages = [
    (
      <div key="p1" className="text-center">
        <div className="text-[10rem] leading-none font-bold text-berry">{item.l}</div>
        <div className="text-5xl mt-2 text-brand-700">{item.l.toLowerCase()}</div>
      </div>
    ),
    (
      <div key="p2" className="text-center">
        <div className="text-[9rem] leading-none" aria-hidden="true">{item.emoji}</div>
        <div className="text-4xl mt-4 font-semibold">{item.word}</div>
      </div>
    ),
    (
      <div key="p3" className="text-center px-4">
        <div className="text-7xl mb-6" aria-hidden="true">{item.emoji}</div>
        <p className="text-4xl font-semibold leading-snug">
          <span className="text-berry">{item.l}</span> is for <span className="text-brand-600">{item.word}</span>.
        </p>
        <p className="text-xl text-brand-500 mt-4">Can you find the letter {item.l} in this sentence?</p>
      </div>
    ),
  ]

  const [page, setPage] = useState(0)
  const [dir, setDir] = useState(1)

  const go = (d) => {
    const next = Math.min(pages.length - 1, Math.max(0, page + d))
    if (next === page) return
    setDir(d)
    setPage(next)
    if (next === pages.length - 1) onDone()
  }

  return (
    <div className="card p-6 sm:p-8 text-center">
      <div className="relative mx-auto max-w-md h-[22rem] [perspective:1200px]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={page}
            custom={dir}
            variants={{
              enter: (d) => ({ rotateY: d > 0 ? 80 : -80, opacity: 0 }),
              center: { rotateY: 0, opacity: 1 },
              exit: (d) => ({ rotateY: d > 0 ? -80 : 80, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35 }}
            className="absolute inset-0 flex items-center justify-center rounded-3xl bg-brand-50 border-2 border-brand-100"
            style={{ transformOrigin: dir > 0 ? 'left center' : 'right center' }}
          >
            {pages[page]}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-center gap-4 mt-6">
        <button className="btn-soft" onClick={() => go(-1)} disabled={page === 0} aria-label="Previous page">←</button>
        <span className="text-brand-500 font-medium">Page {page + 1} of {pages.length}</span>
        <button className="btn" onClick={() => go(1)} disabled={page === pages.length - 1} aria-label="Next page">→</button>
      </div>
    </div>
  )
}
