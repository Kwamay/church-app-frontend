import axios from "axios";
import { useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Signup from "./component/Signup";
import Signin from "./component/Signin";
import ForgotPassword from "./component/ForgotPassword";
import Sidebar from "./component/Sidebar";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import AddMembers from "./pages/Addmembers";
import Comment from "./pages/Comment";
import Groups from "./pages/Groups";
import Creategroup from "./pages/Creategroup";
import Landingpage from "./pages/landingpage/Landingpage";
import ProtectedRoute from "./component/ProtectedRoute";
import NotFound from "./component/NotFounfd";
import GuestRoute from "./component/GuestRoute";
import AdminProtectedRoute from "./component/AdminProtectedRoute";

import "./css/signin.css";
import "./css/app.css";

function App() {
  const location = useLocation();

  // SHOW SIDEBAR ONLY ON INTERNAL LOGGED-IN ROUTES
  const sidebarVisiblePaths = [
    "/dashboard",
    "/members",
    "/addmembers",
    "/groups",
    "/creategroup",
    "/comment",
  ];

  // 🔐 CHECK TOKEN ON APP LOAD
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token"); // must match login key
      if (!token) return; // do not send request if no token

      try {
        const response = await axios.get("http://localhost:8000/auth/check/", {
          headers: { Authorization: `Token ${token}` },
        });
        return response;
      } catch (err) {
        if (err.response?.status === 401) {
          console.log("Token invalid or expired. Clearing token.");
          localStorage.removeItem("token");
          window.location.href = "/signin";
        }
      }
    };

    checkToken();
  }, []);

  return (
    <div className="app-container">
      {/* Sidebar only shows on selected paths */}
      {sidebarVisiblePaths.includes(location.pathname) && <Sidebar />}

      <div className="app-content">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landingpage />} />

          <Route
            path="/signin"
            element={
              <GuestRoute>
                <Signin />
              </GuestRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <GuestRoute>
                <Signup />
              </GuestRoute>
            }
          />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <AdminProtectedRoute>
                <Dashboard />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/members"
            element={
              <ProtectedRoute>
                <Members />
              </ProtectedRoute>
            }
          />

          <Route
            path="/addmembers"
            element={
              <ProtectedRoute>
                <AddMembers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/groups"
            element={
              <ProtectedRoute>
                <Groups />
              </ProtectedRoute>
            }
          />

          <Route
            path="/creategroup"
            element={
              <ProtectedRoute>
                <Creategroup />
              </ProtectedRoute>
            }
          />

          <Route
            path="/comment"
            element={
              <ProtectedRoute>
                <Comment />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Root;
