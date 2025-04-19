import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("users"));

  if (!user || user.email !== "muidao156@gmail.com") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
