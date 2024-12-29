import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Signup from "./component/Signup";
import Signin from "./component/Signin";
import ForgotPassword from "./component/ForgotPassword";
import "./css/signin.css";
import Sidebar from "./component/Sidebar";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import AddMembers from "./pages/Addmembers";
import Groups from "./pages/Groups";
import "./css/app.css";

function App() {
  const location = useLocation();
  const hideSidebarPaths = ['/', '/signup', '/forgot-password'];

  return (
    <div className="app-container">
      <div>
      {!hideSidebarPaths.includes(location.pathname) && <Sidebar />}
      </div>
      <div className="app-content">
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/members" element={<Members />} />
        <Route path="/addmembers" element={<AddMembers />} />
        <Route path="/groups" element={<Groups />} />
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
