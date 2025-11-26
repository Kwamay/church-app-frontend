import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Signup from "./component/Signup";
import Signin from "./component/Signin";
import ForgotPassword from "./component/ForgotPassword";
import "./css/signin.css";
import Sidebar from "./component/Sidebar";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import AddMembers from "./pages/Addmembers";
import Comment from "./pages/Comment";
import Landingpage from "./pages/landingpage/Landingpage";
import ProtectedRoute from "./component/ProtectedRoute";
import NotFound from "./component/NotFounfd";
import GuestRoute from "./component/GuestRoute";
import AdminProtectedRoute from "./component/AdminProtectedRoute";

import "./css/app.css";
import { useDispatch } from "react-redux";
import { logout } from "./redaux/slices/authSlice";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  // SHOW SIDEBAR ONLY ON INTERNAL LOGGED-IN ROUTES
  const sidebarVisiblePaths = [
    "/dashboard",
    "/members",
    "/addmembers",
    "/comment",
  ];

  // Check for token expiration
  useEffect(() => {
    const checkTokenExpiry = () => {
      const expiry = localStorage.getItem("tokenExpiry");
      if (expiry && new Date().getTime() > expiry) {
        dispatch(logout());
        alert("Session expired! Please log in again.");
      }
    };

    checkTokenExpiry();
    const interval = setInterval(checkTokenExpiry, 60000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="app-container">
      {/* Sidebar only shows on selected paths */}
      {sidebarVisiblePaths.includes(location.pathname) && <Sidebar />}

      <div className="app-content">
        <Routes>
          {/* Public pages */}
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

          {/* Protected pages */}
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
            path="/comment"
            element={
              <ProtectedRoute>
                <Comment />
              </ProtectedRoute>
            }
          />

          {/* 404 Page */}
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
