import { createSlice } from '@reduxjs/toolkit';

// Initial state for tasks, loaded from localStorage if available
const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
};

// Slice to manage task-related actions and state
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload); // Add new task
      localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Persist tasks to localStorage
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload); // Remove task by ID
      localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Update localStorage
    },
  },
});

export const { addTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
