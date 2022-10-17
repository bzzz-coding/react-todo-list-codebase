import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { useState, useEffect } from "react"
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import TaskDetails from './components/TaskDetails'




const App = () => {
  // state is immutable, passed down one-way
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks:
  const fetchTasks = async () => {
    const res = await fetch(`http://localhost:5000/tasks`)
    const data = await res.json()
    // console.log(data)
    return data
  }

  // Fetch a single task:
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }


  // Add Task:
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })


    // new task
    const data = await res.json()

    // add new task to list
    setTasks([...tasks, data])

    // // console.log(task)
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  // Detele Task: changing state, list is immutable
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    // console.log('detele', id)

    // filter only tasks that doesn't match id
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)

    // Set the reminder property of dbclicked task to the opposite
    const updatedTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    // updatedTask
    const data = await res.json()

    // console.log(id)
    // loop through task list, find matching id, set the reminder value to updatedTask reminder
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  }

  return (
    <Router>
      <div className='container'>
        {/* passing down onAdd and showAddTask(true/false) value */}
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {/* AddTask form, && is a short ternary for no else condition */}
                {showAddTask && <AddTask onAdd={addTask} />}
                {/* pass in props: tasks, onDelete */}
                {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No task to display'}
              </>
            }
          />
          <Route path='/about' element={<About />} />
          <Route path='/task/:id' element={<TaskDetails />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  )
}

export default App;


// // ==== example using class ========

// import React from 'react'
// class App extends React.Component {
//   render() {
//     return <h1>Hello from a class</h1>
//   }
// }
// export default App;