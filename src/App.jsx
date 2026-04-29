import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-6 p-6">
      
      <h1 className="text-[var(--text-h)]">
        SIPERU 🚀
      </h1>

      <p className="text-[var(--text)] max-w-xl">
        Sistem Peminjaman Ruang berbasis React + Tailwind
      </p>

      <button className="px-6 py-2 rounded-xl bg-[var(--accent)] text-white hover:opacity-90 transition">
        Mulai
      </button>

      <code>React + Vite + Tailwind v4</code>

    </div>
  )
}


export default App
