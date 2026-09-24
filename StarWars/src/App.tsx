import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import Home from './pages/Home.tsx'
import Characters from './pages/Characters.tsx'
import CharacterDetail from './pages/CharacterDetail.tsx'
import NotFound from './pages/NotFound.tsx'
import AddCharacters from './pages/AddCharacter.tsx'
import Selection from './pages/Selection.tsx'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:id" element={<CharacterDetail />} />
        <Route path="/selection" element={<Selection />} />
        <Route path="/add-character" element={<AddCharacters />} />
        <Route path="/add-character/:id" element={<AddCharacters />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App