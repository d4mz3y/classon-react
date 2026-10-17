import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Landing from './pages/Landing.jsx'
import SignIn from './pages/SignIn.jsx'
import Home from './pages/Home.jsx'
import Subject from './pages/Subject.jsx'
import Lesson from './pages/Lesson.jsx'
import Parent from './pages/Parent.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/parent" element={<Parent />} />
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/learn/:subject" element={<Subject />} />
        <Route path="/learn/:subject/:id" element={<Lesson />} />
      </Route>
      <Route path="*" element={<Landing />} />
    </Routes>
  )
}
