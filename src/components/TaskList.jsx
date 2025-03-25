import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../slices/taskSlice';
import { RiDeleteBin2Line } from "react-icons/ri";
import { useState } from 'react';
import '../styles.css';

export default function TaskList() {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('None');

  // Determine CSS class for task priority
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-danger fw-bold';
      case 'Medium':
        return 'text-success fw-bold';
      case 'Low':
        return 'text-warning fw-bold';
      default:
        return 'text-dark';
    }
  };

  // Filter tasks based on selected priority
  const filteredTasks = tasks.filter(task => 
    filter === 'All' || task.priority === filter
  );

  // Sort tasks based on selected order
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOrder === 'High to Low') {
      return b.priority.localeCompare(a.priority);
    }
    if (sortOrder === 'Low to High') {
      return a.priority.localeCompare(b.priority);
    }
    return 0;
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <select
          className="form-select w-50 me-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          className="form-select w-50"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="None">None</option>
          <option value="High to Low">High to Low</option>
          <option value="Low to High">Low to High</option>
        </select>
      </div>
      <div className="card shadow-sm">
        <div className="card-header bg-warning text-black text-center fw-bold">
          Task List
        </div>
        <ul className="list-group list-group-flush">
          {sortedTasks.map(task => (
            <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span className={getPriorityClass(task.priority)}>
                {task.text}
              </span>
              <button className="btn btn-outline-danger btn-sm" onClick={() => dispatch(deleteTask(task.id))}>
                <RiDeleteBin2Line size={15} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
