import { useState } from 'react'

import './App.css'
import DinoGame from './components/DinoGame'

function App() {
  const [count, setCount] = useState(0)

  return <DinoGame />
}

export default App
