import { createSlice } from '@reduxjs/toolkit';

// Initial state for authentication, based on localStorage
const initialState = {
  isAuthenticated: localStorage.getItem('auth') === 'true',
};

// Slice to manage authentication state and actions
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true; // Set authentication to true
      localStorage.setItem('auth', 'true'); // Persist authentication state
    },
    logout: (state) => {
      state.isAuthenticated = false; // Set authentication to false
      localStorage.removeItem('auth'); // Clear authentication state from localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
