import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sky from '../components/Sky.jsx'

export default function Landing() {
  return (
    <Sky>
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl sm:text-8xl font-bold tracking-[0.12em] text-brand-600 drop-shadow-[0_4px_0_rgba(255,255,255,0.8)]"
        >
          CLASSON
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mt-4 mb-10 text-xl text-brand-700 max-w-md"
        >
          Letters, numbers, songs and tracing, made for little learners.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/sign-in" className="btn text-lg">Start learning</Link>
          <Link to="/parent" className="btn-soft text-lg">I'm a parent</Link>
        </motion.div>
      </div>
    </Sky>
  )
}
