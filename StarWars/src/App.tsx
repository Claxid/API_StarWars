import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import Home from './pages/Home.tsx'
import Characters from './pages/Characters.tsx'
import NotFound from './pages/NotFound.tsx'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App