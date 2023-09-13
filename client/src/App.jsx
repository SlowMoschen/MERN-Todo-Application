// Dependencies Import
import { useState, useEffect } from 'react'
import './App.css'
import FetchWrapper from './Fetchwrapper'

// Setup for Fetchwrapper to make API Fetches easier - have look in the Fetchwrapper.js for more infos
const fetchAPI = new FetchWrapper('http://localhost:3001/api')

// Main Function that renders the App
function App() {
  
  // States to save all existing Todos and save the State for the Add Modal
  const [allTodos, setAllTodos] = useState([])
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    getTodos()
  }, [])

// Function to get all exsting Todos - saves all Todos in allTodos useState
  const getTodos = async () => {
    try {
      const data = await fetchAPI.get()
      setAllTodos(data)
    } catch (error) { 
      console.error(error)
    }
  }

  // Function handles the submit from the Add-Todo Form
  const handleFormSubmit = (e) => {
    e.preventDefault()
    // Dependencies for Todo and Error handling
    const input = e.target.elements['todo-input']
    
    // Error handling - if the Input is submited empty it send an Error and returns the Function 
    const setError = (message) => {
      const errorBox = document.querySelector('#error-message')
      
      errorBox.innerHTML = message
      
      setTimeout(() => {
        errorBox.innerHTML = ''
      }, 2000)
      
    }
    
    // Cheks if Input is empty - if so it sets an Error and returns the Function
    if(!input.value) {
      setError('Please enter a Task.')
      return
    }

    // Function to add the Todo to the Database and allTodo useState
    const addTodo = async () => {
      const body = {
        "text": input.value
      }
      try {

        const data = await fetchAPI.post('' , body)
        setAllTodos((prevTodos) => [...prevTodos, data])
        input.value = ''
        return;
      } catch (error) { 
        console.error(error)
      }
    }
    addTodo()
    // Closes the Add Modal after correct submit
    setIsActive(false)
  }
  
  // Function for changing the isCompleted state for the clicked Todo - saves the changes to the Database and allTodo useState
  const completeTodo = async (id, element) => {
    const todoStatus = element.classList.contains('is-complete') ? false : true
    try {
      const data = await fetchAPI.patch(`/${id}`, {"isCompleted": todoStatus})
      console.log(data);
      // Calling getTodos to update allTodo useState Array and with it the UI
      await getTodos()
      return;
    } catch (error) { 
      console.error(error)
    }
  }
  
  // Function to delete the clicked Todo from the Database
  const deleteTodo = async (id) => {
    try {
      const data = await fetchAPI.delete(`/${id}`)
      console.log(data);
      // Calling getTodos again to update allTodo useState Array
      await getTodos()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
    {/* Renders whole App */}
    <div className='app'>
      <header>
        <h1>Welcome User</h1>
      </header>
      <main>
        <h4>Your Tasks</h4>
        <ul>
          {/* Ternery operator to check If allTodos Array is empty a div with instructions is renderd - else the existing Todos */}
          {(allTodos.length === 0) 
          ? <div className='text'>Enter a Task by clicking on the button in the  bottom right corner.</div> 
          : allTodos.map(todo => {
            return <li className={'todo ' + (todo.isCompleted ? 'is-complete' : '')} key={todo._id}>
              <div className='checkbox' onClick={(e) => { completeTodo(todo._id, e.currentTarget.parentElement) }}>
                {/* Ternery Operator to check if Todo is complete or not - returns the correct icon */}
                <span className="material-symbols-outlined">{todo.isCompleted 
                ? 'check_box' 
                : 'check_box_outline_blank'}
                </span>
              </div>
              <div className='text'>{todo.text}</div>
              <div className='delete-todo' onClick={() => { deleteTodo(todo._id) }}>
                <span className="material-symbols-outlined">close</span>
              </div>
            </li>
          })}
          
        </ul>
      </main>
      <button className='open-modal' onClick={() => { setIsActive(true)} }>
        <span className="material-symbols-outlined">add</span>
      </button>
      {/* Ternery operator to check if the useState is active - if active renders Add-Modal */}
        { isActive 
        ? (
        <div className='add-modal'>
          <div className='close-modal-btn' onClick={() => { setIsActive(false) }}>
            <span className="material-symbols-outlined">close</span>
          </div>
          <form id='add-form' onSubmit={(e) => { handleFormSubmit(e) }}>
            <label htmlFor="todo-input">Add task</label>
            <input type="text" id='todo-input'autoFocus/>
            <button type='submit'>
              Create Task
            </button>
            <div id='error-message' className='error'></div>
          </form>
        </div>
        ) 
        : ''}
    </div>
    </>
  )

}

export default App
