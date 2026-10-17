import React from 'react'
import { motion } from 'framer-motion'

// Original SVG scene: drifting clouds, hills and a sun. No imported artwork.
function Cloud({ className, delay = 0, duration = 40 }) {
  return (
    <motion.svg
      viewBox="0 0 200 80"
      className={`absolute ${className}`}
      initial={{ x: -40 }}
      animate={{ x: 40 }}
      transition={{ repeat: Infinity, repeatType: 'reverse', duration, delay, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <g fill="white" opacity="0.95">
        <ellipse cx="60" cy="50" rx="50" ry="26" />
        <ellipse cx="105" cy="38" rx="42" ry="28" />
        <ellipse cx="145" cy="52" rx="45" ry="24" />
      </g>
    </motion.svg>
  )
}

export default function Sky({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#9fc4ff] via-[#cfe0ff] to-[#f4f8ff]">
      <motion.div
        className="absolute top-10 right-12 w-24 h-24 rounded-full bg-sun shadow-[0_0_80px_20px_rgba(255,200,61,0.45)]"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <Cloud className="top-16 left-[8%] w-56 opacity-90" duration={38} />
      <Cloud className="top-40 right-[18%] w-44" delay={3} duration={46} />
      <Cloud className="top-[55%] left-[30%] w-64 opacity-70" delay={6} duration={52} />
      <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-[34vh]" aria-hidden="true">
        <path fill="#bfe3c8" d="M0,200 C240,120 420,260 720,190 C1000,125 1200,230 1440,170 L1440,320 L0,320 Z" />
        <path fill="#8fd0a8" d="M0,260 C300,190 520,300 820,240 C1100,185 1260,270 1440,230 L1440,320 L0,320 Z" />
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
