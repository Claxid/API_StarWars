import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section className="hero">
        <img src={heroImg} className="base" width="170" height="179" alt="" />
      </section>
    </>
  )
}

export default App
