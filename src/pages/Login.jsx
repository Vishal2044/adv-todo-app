import { useDispatch } from 'react-redux';
import { login } from '../slices/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  // Display error message from navigation state if present
  useEffect(() => {
    if (location.state?.error) {
      setError(location.state.error);
    }
  }, [location.state]);

  // Handle login logic and navigation to tasks page
  const handleLogin = () => {
    if (!username.trim()) {
      setError('Username is required!');
      return;
    }
    setError('');
    sessionStorage.setItem('username', username);
    dispatch(login());
    navigate('/tasks', { state: { username } });
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <h2 className="text-black font-bold mb-4 text-center">Welcome to Advance To-Do App</h2>
      <input
        type="text"
        className="form-control mb-3 w-50"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {error && (
        <div className="text-danger mb-2">
          {error}
        </div>
      )}
      <button className="font-bold button w-50 w-md-50" onClick={handleLogin}>
        Add Your Tasks Now
      </button>
    </div>
  );
}
