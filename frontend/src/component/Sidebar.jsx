import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaLayerGroup,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
  FaSignOutAlt,
} from "react-icons/fa";
import chLogo from "../images/ch-logo.png";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../css/sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redaux/actions/action";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/signin", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuItem = [
    { path: "/dashboard", name: "Dashboard", icon: <FaTh /> },
    { path: "/members", name: "Members", icon: <FaUserAlt /> },
    { path: "/groups", name: "Groups", icon: <FaLayerGroup /> },
    { path: "/comment", name: "Comment", icon: <FaCommentAlt /> },
    { path: "/product", name: "Product", icon: <FaShoppingBag /> },
    { path: "/productList", name: "Product List", icon: <FaThList /> },

    // 🔥 Special logout item
    { type: "logout", name: "Logout", icon: <FaSignOutAlt /> },
  ];

  return (
    <div className="sidebar-container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        {/* TOP SECTION */}
        <div className="top_section">
          <img
            src={chLogo}
            alt="Logo"
            style={{ display: isOpen ? "block" : "none" }}
            className="logo"
          />
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>

        {/* USER INFO */}
        {isOpen && user && (
          <div className="user-info">
            <p className="user-name">
              {user.name || user.username || user.email}
            </p>
          </div>
        )}

        {/* MENU ITEMS */}
        {menuItem.map((item, index) => {
          if (item.type === "logout") {
            return (
              <button
                key={index}
                onClick={handleLogout}
                className="link logout-btn"
              >
                <div className="icon">{item.icon}</div>
                {isOpen && <div className="link_text">{item.name}</div>}
              </button>
            );
          }

          return (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) => (isActive ? "link active" : "link")}
            >
              <div className="icon">{item.icon}</div>
              {isOpen && <div className="link_text">{item.name}</div>}
            </NavLink>
          );
        })}
      </div>

      <main>{children}</main>
      <Outlet />
    </div>
  );
};

export default Sidebar;
