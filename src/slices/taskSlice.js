import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ ...action.payload, completed: false }); // Add `completed` property
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed; // Toggle completion status
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
  },
});

export const { addTask, deleteTask, toggleTaskCompletion } = taskSlice.actions;
export default taskSlice.reducer;
