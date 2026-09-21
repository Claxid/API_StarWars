import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home..tsx'

function App() {
  return (
    <>
      <h1>StarWars 1</h1>
      <button>Home</button>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}

export default App