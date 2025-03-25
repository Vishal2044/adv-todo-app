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

  // Handle adding a new task
  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask({ id: uuidv4(), text: task, priority })); // Dispatch new task
      setTask('');
      setPriority('Medium');
      setError(''); // Clear error if task is valid
    } else {
      setError('Task cannot be empty'); // Set error message
    }
  };

  return (
    <div className="container mt-3">
      <div className="row g-2">
        <div className="col-12 col-md-6">
          <input
            className="form-control shadow-sm"
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}            
          />
        </div>
        <div className="col-12 col-md-6">
          <select
            className="form-select shadow-sm"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High" className="text-danger">High</option>
            <option value="Medium" className="text-success">Medium</option>
            <option value="Low" className="text-warning">Low</option>
          </select>
        </div>
      </div>
      <div className="row mt-3">
        {error && (
          <div className="col-12 text-danger mb-2">
            {error}
          </div>
        )}
        <div className="col-12 text-center">
          <button className="font-bold button w-50 w-md-50" onClick={handleAddTask}>
            Add Task <IoIosAdd size={25} className='plus-icon'/>
          </button>
        </div>
      </div>
    </div>
  );
}
