import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import Home from './pages/Home.tsx'
import Characters from './pages/Characters.tsx'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
      </Routes>
    </>
  )
}

export default App