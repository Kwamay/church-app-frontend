import { Navigate, useLocation } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // Parse user stored in localStorage
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  // Admin flag saved as "statues-A"
  const isAdmin = user?.["statues-A"] === true;

  // 1️⃣ Not logged in → redirect to SIGNIN
  if (!token) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  // 2️⃣ Logged in but not admin → go to 404
  if (!isAdmin) {
    return <Navigate to="/404" replace />;
  }

  // 3️⃣ Admin user → allow access
  return children;
};

export default AdminProtectedRoute;
