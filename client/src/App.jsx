import { useState, useEffect } from 'react'
import './App.css'
import FetchWrapper from './Fetchwrapper'

const fetchAPI = new FetchWrapper('http://localhost:3001/api')

function App() {
  
  const [allTodos, setAllTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = async () => {
    try {
      const data = await fetchAPI.get()
      setAllTodos(data)
      console.log(allTodos);
    } catch (error) { 
      console.error(error)
    }
  }

}

export default App
