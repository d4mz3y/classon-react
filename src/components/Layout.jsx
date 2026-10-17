import React from 'react'
import { Link, NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useProgress } from '../state/progress.jsx'

const LINKS = [
  { to: '/home', label: 'Home', icon: '🏠' },
  { to: '/learn/diction', label: 'Diction', icon: '🔤' },
  { to: '/learn/numeracy', label: 'Numeracy', icon: '🔢' },
  { to: '/parent', label: 'Parents', icon: '👪' },
]

export default function Layout() {
  const { kid, signOut } = useProgress()
  const navigate = useNavigate()
  if (!kid) return <Navigate to="/sign-in" replace />

  return (
    <div className="min-h-screen md:flex">
      <aside className="md:w-60 md:min-h-screen bg-white/85 backdrop-blur border-b-2 md:border-b-0 md:border-r-2 border-brand-100 p-4 md:p-6 flex md:flex-col gap-2 items-center md:items-stretch overflow-x-auto">
        <Link to="/home" className="text-2xl font-bold tracking-widest text-brand-600 md:mb-8 mr-3 md:mr-0">
          CLASSON
        </Link>
        <nav className="flex md:flex-col gap-1">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-2xl font-medium whitespace-nowrap transition-colors ${isActive ? 'bg-brand-600 text-white' : 'text-brand-700 hover:bg-brand-50'}`
              }
            >
              <span aria-hidden="true">{l.icon}</span> {l.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={() => { signOut(); navigate('/') }}
          className="md:mt-auto ml-auto md:ml-0 text-sm text-brand-500 hover:text-brand-700 px-4 py-2 whitespace-nowrap"
        >
          Sign out ({kid})
        </button>
      </aside>
      <main className="flex-1 p-5 md:p-10 max-w-5xl w-full">
        <Outlet />
      </main>
    </div>
  )
}
