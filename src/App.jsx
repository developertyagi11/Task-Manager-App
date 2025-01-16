import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditTaskPage from './pages/EditTaskPage';
import TaskDetailsPage from './pages/TaskDetailsPage';


export default function Home() {
  const [tasks, setTasks] = useState([])
  const [sortBy, setSortBy] = useState('date')

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (title, priority, date) => {
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false,
      priority: priority,
      date: date,
      createdAt: new Date().toISOString()
    }
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const editTask = (id, updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    ))
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt) - new Date(a.createdAt)
    } else {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    }
  })

  return (
    <Router>
      <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={
            <HomePage 
              tasks={sortedTasks} 
              addTask={addTask} 
              deleteTask={deleteTask} 
              toggleComplete={toggleComplete}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          } />
          <Route path="/edit/:id" element={<EditTaskPage tasks={tasks} editTask={editTask} />} />
          <Route path="/task/:id" element={<TaskDetailsPage tasks={tasks} />} />
        </Routes>
      </div>
    </Router>
  )
}

