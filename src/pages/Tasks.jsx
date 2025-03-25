import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import Weather from "../components/Weather";
import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const [username, setUsername] = useState("User");
  const navigate = useNavigate();

  // Load username from session storage on component mount
  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Handle user logout and redirect to login page
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="container main">
      <button onClick={handleLogout} className="flex bg-white items-center text-red-500">
        <CiLogout size={20} />
      </button>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-center">Welcome, {username}!</h1>
      </div>
      <div className="row">
        <div className="text-center">
          <Weather />
          <TaskInput />
          <TaskList />
        </div>
      </div>
    </div>
  );
}
