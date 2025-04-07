import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, toggleTaskCompletion } from '../slices/taskSlice';
import { RiDeleteBin2Line } from "react-icons/ri";
import { useState } from 'react';

export default function TaskList() {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('None');

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-500 font-bold';
      case 'Medium':
        return 'text-green-500 font-bold';
      case 'Low':
        return 'text-yellow-500 font-bold';
      default:
        return 'text-gray-700';
    }
  };

  const filteredTasks = tasks.filter(task => 
    filter === 'All' || task.priority === filter
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOrder === 'High to Low') {
      return b.priority.localeCompare(a.priority);
    }
    if (sortOrder === 'Low to High') {
      return a.priority.localeCompare(b.priority);
    }
    return 0;
  });

  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="mt-4">
      <div className="flex justify-between gap-2 mb-3">
        <select
          className="w-1/2 mr-2 p-2 border rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          className="w-1/2 p-2 border rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="None">None</option>
          <option value="High to Low">High to Low</option>
          <option value="Low to High">Low to High</option>
        </select>
      </div>
      <div className="shadow rounded mb-4">
        <div className="bg-yellow-300 text-black text-center font-bold p-2">
          Task List
        </div>
        <ul className="divide-y">
          {sortedTasks
            .filter(task => !task.completed)
            .map(task => (
              <li key={task.id} className="flex justify-between items-center p-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => dispatch(toggleTaskCompletion(task.id))}
                  />
                  <span
                    className={`${getPriorityClass(task.priority)} ${
                      task.completed ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {task.text}
                  </span>
                </div>
                <button
                  className="text-red-500 bg-white hover:text-red-700"
                  onClick={() => dispatch(deleteTask(task.id))}
                >
                  <RiDeleteBin2Line size={20} />
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div className="shadow rounded">
        <div className="bg-green-300 text-black text-center font-bold p-2">
          Completed Tasks
        </div>
        <ul className="divide-y">
          {completedTasks.map(task => (
            <li key={task.id} className="flex justify-between items-center p-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => dispatch(toggleTaskCompletion(task.id))}
                />
                <span className="line-through text-gray-500">
                  {task.text}
                </span>
              </div>
              <button
                className="text-red-500 bg-white hover:text-red-700"
                onClick={() => dispatch(deleteTask(task.id))}
              >
                <RiDeleteBin2Line size={20} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
