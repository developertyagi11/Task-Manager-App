import { useParams, Link } from 'react-router-dom'

export default function TaskDetailsPage({ tasks }) {
  const { id } = useParams()
  const task = tasks.find(t => t.id === parseInt(id))

  if (!task) {
    return <div className="text-center">Task not found</div>
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Task Details</h2>
      <div className="mb-4">
        <p className="text-gray-700 text-sm font-bold mb-2">Title</p>
        <p className="text-gray-700">{task.title}</p>
      </div>
      <div className="mb-4">
        <p className="text-gray-700 text-sm font-bold mb-2">Priority</p>
        <p className="text-gray-700">{task.priority}</p>
      </div>
      <div className="mb-4">
        <p className="text-gray-700 text-sm font-bold mb-2">Date</p>
        <p className="text-gray-700">{task.date || 'Not set'}</p>
      </div>
      <div className="mb-4">
        <p className="text-gray-700 text-sm font-bold mb-2">Status</p>
        <p className="text-gray-700">{task.completed ? 'Completed' : 'Incomplete'}</p>
      </div>
      <div className="flex items-center justify-between">
        <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Back to Home
        </Link>
        <Link to={`/edit/${task.id}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Edit Task
        </Link>
      </div>
    </div>
  )
}

