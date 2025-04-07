import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.state?.error) {
      setError(location.state.error);
    }
  }, [location.state]);

  const handleLogin = () => {
    if (!username.trim()) {
      setError("Username is required!");
      return;
    }
    setError("");
    sessionStorage.setItem("username", username);
    dispatch(login());
    navigate("/tasks", { state: { username } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          👋 Welcome to{" "}
          <span className="text-purple-600">Advance To-Do App</span>
        </h2>
        <input
          type="text"
          className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {error && (
          <div className="flex items-center text-red-600 bg-red-100 border border-red-300 rounded-full px-3 py-2 mb-3 text-sm">
            <AlertTriangle size={16} className="mr-2" />
            {error}
          </div>
        )}
        <button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-full transition duration-200 shadow-md"
          onClick={handleLogin}
        >
          🚀 Add Your Tasks Now
        </button>
      </div>
    </div>
  );
}
