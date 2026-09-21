import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.tsx'
import Characters from './pages/Characters.tsx'

function App() {
  return (
    <>
      <h1>StarWars 1</h1>
      <button>Home</button>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
      </Routes>
    </>
  )
}

export default App