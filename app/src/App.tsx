import { Routes, Route, Link } from 'react-router'
import Home from './pages/Home'
import SaveTheCat from './pages/SaveTheCat'

export default function App() {
  return (
    <div>
      <nav className="sticky top-0 z-10 border-b border-stone-200 bg-white/90 px-6 py-2 text-xs backdrop-blur">
        <div className="mx-auto flex max-w-4xl gap-4">
          <Link to="/" className="font-semibold text-slate-700 hover:text-slate-900">节拍板</Link>
          <Link to="/save-the-cat" className="font-semibold text-slate-700 hover:text-slate-900">救猫咪 · 15 节拍表</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/save-the-cat" element={<SaveTheCat />} />
      </Routes>
    </div>
  )
}
