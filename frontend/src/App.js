import React, {useEffect} from "react";
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
import "./css/app.css";
import { useDispatch } from "react-redux";
import { logout } from "./redaux/slices/authSlice";

function App() {
  const location = useLocation();
  const hideSidebarPaths = ["/", "/signin", "/signup", "/forgot-password"];

const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenExpiry = () => {
      const expiry = localStorage.getItem('tokenExpiry');
      if (expiry && new Date().getTime() > expiry) {
        dispatch(logout());
        alert("Session expired! Please log in again.");
      }
    };

    checkTokenExpiry();
    const interval = setInterval(checkTokenExpiry, 60 * 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="app-container">
      <div>{!hideSidebarPaths.includes(location.pathname) && <Sidebar />}</div>
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
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
          } />
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
