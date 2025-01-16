import { useState } from "react";
import { Link } from "react-router-dom";
import TaskForm from "../component/TaskForm";

export default function HomePage({
  tasks,
  addTask,
  deleteTask,
  toggleComplete,
  sortBy,
  setSortBy,
}) {
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Task Management
      </h1>
      <TaskForm addTask={addTask} />
      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="mr-2 text-gray-700">Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded p-1"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
        <div>
          <label className="mr-2 text-gray-700">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded p-1"
          >
            <option value="date">Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>
      <ul className="space-y-3">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between p-3 bg-gray-50 border rounded-lg"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="mr-2"
              />
              <span
                className={task.completed ? "line-through text-gray-500" : ""}
              >
                {task.title}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                to={`/task/${task.id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
              <Link
                to={`/edit/${task.id}`}
                className="text-green-500 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
