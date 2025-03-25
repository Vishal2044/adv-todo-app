import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const username = sessionStorage.getItem("username");
  const location = useLocation();

  // Redirect to login page with error state if user is not authenticated
  if (!username) {
    const errorState = location.state ? {} : { state: { error: "Access denied. Please log in first." } };
    return <Navigate to="/" {...errorState} />;
  }

  return children;
}
