import React from "react";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../slices/taskSlice';
import { v4 as uuidv4 } from 'uuid';
import { IoIosAdd } from "react-icons/io";

export default function TaskInput() {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask({ id: uuidv4(), text: task, priority }));
      setTask('');
      setPriority('Medium');
      setError('');
    } else {
      setError('Task cannot be empty');
    }
  };

  return (
    <div className="mt-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <input
          className="p-2 border rounded shadow"
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <select
          className="p-2 border rounded shadow"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High" className="text-red-500">High</option>
          <option value="Medium" className="text-green-500">Medium</option>
          <option value="Low" className="text-yellow-500">Low</option>
        </select>
      </div>
      <div className="mt-3">
        {error && (
          <div className="text-red-500 mb-2">
            {error}
          </div>
        )}
        <div className="text-center">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-600"
            onClick={handleAddTask}
          >
            Add Task <IoIosAdd size={25} className="inline" />
          </button>
        </div>
      </div>
    </div>
  );
}