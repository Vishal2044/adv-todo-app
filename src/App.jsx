import React from 'react'; // Add this line
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import { Provider } from 'react-redux';
import { store } from './store';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </Router>
    </Provider>
  );
}
