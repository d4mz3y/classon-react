import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sky from '../components/Sky.jsx'
import { useProgress } from '../state/progress.jsx'

export default function SignIn() {
  const { kid, signIn } = useProgress()
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const start = (e) => {
    e.preventDefault()
    const clean = name.trim().slice(0, 20)
    if (!clean) return
    signIn(clean)
    navigate('/home')
  }

  return (
    <Sky>
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="card p-8 w-full max-w-md text-center">
          <Link to="/" className="text-3xl font-bold tracking-widest text-brand-600">CLASSON</Link>
          {kid && (
            <button
              onClick={() => navigate('/home')}
              className="btn w-full mt-6"
            >
              Continue as {kid}
            </button>
          )}
          <form onSubmit={start} className="mt-6 text-left">
            <label htmlFor="kid-name" className="block font-medium mb-2">{kid ? 'Or start as someone new' : "What's your name?"}</label>
            <input
              id="kid-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              placeholder="Type your name"
              className="w-full rounded-2xl border-2 border-brand-100 focus:border-brand-500 outline-none px-4 py-3 text-lg"
            />
            <button className="btn w-full mt-4" disabled={!name.trim()}>Let's go!</button>
          </form>
          <p className="mt-5 text-sm text-brand-500">Your progress is saved on this device only.</p>
          <Link to="/parent" className="mt-3 inline-block text-sm text-brand-600 underline">Parents: see progress</Link>
        </motion.div>
      </div>
    </Sky>
  )
}
