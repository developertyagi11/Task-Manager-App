export default function FilterSort({ filter, setFilter, sortBy, setSortBy }) {
    return (
      <div className="mb-4 flex gap-2">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="date">Sort by Creation Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="dueDate">Sort by Due Date</option>
        </select>
      </div>
    )
  }
  
  