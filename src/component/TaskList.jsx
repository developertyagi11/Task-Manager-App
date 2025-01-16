import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function TaskList({ tasks, deleteTask, toggleComplete, editTask }) {
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')

  const handleEdit = (task) => {
    setEditingId(task.id)
    setEditTitle(task.title)
  }

  const handleSave = (task) => {
    editTask(task.id, { title: editTitle })
    setEditingId(null)
  }

  return (
    <ul className="space-y-3">
      {tasks.map(task => (
        <li key={task.id} className="flex items-center justify-between p-3 bg-gray-50 border rounded-lg">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              className="mr-2"
            />
            {editingId === task.id ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border rounded p-1"
              />
            ) : (
              <Link to={`/task/${task.id}`} className="text-blue-500 hover:underline">
                {task.title}
              </Link>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              Priority: {task.priority}
            </span>
            {task.date && (
              <span className="text-sm text-gray-500">
                Date: {task.date}
              </span>
            )}
            {editingId === task.id ? (
              <button onClick={() => handleSave(task)} className="text-green-500">Save</button>
            ) : (
              <button onClick={() => handleEdit(task)} className="text-blue-500">Edit</button>
            )}
            <button onClick={() => deleteTask(task.id)} className="text-red-500">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  )
}

