import { useState } from 'react'
import './App.css'
import FormStudent from './components/FormStudent'
import TableInfo from './components/TableInfo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container my-10 mx-auto">
        <FormStudent />
        <TableInfo />
      </div>
    </>
  )
}

export default App
