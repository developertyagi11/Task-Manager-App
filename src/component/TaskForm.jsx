import { useState } from 'react'

export default function TaskForm({ addTask }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [date, setDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title) {
      addTask(title, priority, date)
      setTitle('')
      setPriority('medium')
      setDate('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="flex-grow border rounded p-2"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border rounded p-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded p-2"
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
    </form>
  )
}

